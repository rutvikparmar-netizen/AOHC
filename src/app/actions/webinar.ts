'use server'

import type { EnquiryRelation } from '@/types'
import { isDatabaseConfigured } from '@/lib/db/mongo'
import { createRegistration, markConfirmationSent } from '@/lib/leads/store'
import { getWebinarBySlug } from '@/lib/repositories'
import { isMailConfigured, sendMail } from '@/lib/mail/mailer'
import { registrationConfirmation } from '@/lib/mail/templates'
import {
  RATE_LIMITS,
  callerIp,
  consumeRateLimit,
  describeRetry,
} from '@/lib/auth/rate-limit'
import { normaliseEmail } from '@/lib/auth/crypto'
import type { RegistrationFormState } from '@/lib/forms/state'

/**
 * WEBINAR REGISTRATION
 * ----------------------------------------------------------------------------
 * Same shape as the enquiry action, with three differences that matter.
 *
 * 1. THE EMAIL IS NOT OPTIONAL IN THE SAME WAY. A confirmation carries the
 *    join link, so a registration stored without one leaves someone with a
 *    calendar entry and no way in. The result therefore reports delivery
 *    honestly, and `confirmationSent` is persisted so the team can chase the
 *    ones that failed instead of guessing which they were.
 *
 * 2. A DUPLICATE IS A SUCCESS. Someone who taps twice, or registers again
 *    because the first confirmation went to spam, is registered either way.
 *    The unique index does the work and this action reports it calmly.
 *
 * 3. IT REFUSES TO REGISTER ANYONE FOR A SESSION THAT HAS ENDED. The form is
 *    not rendered on a past webinar, but an action is a plain POST endpoint —
 *    whatever the page shows, this check is the one that holds.
 */

const RELATIONS: EnquiryRelation[] = ['self', 'family', 'caregiver', 'doctor', 'other']

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

function looksLikePhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export async function registerForWebinar(
  _previous: RegistrationFormState,
  formData: FormData,
): Promise<RegistrationFormState> {
  const read = (key: string) => (formData.get(key) ?? '').toString().trim()

  // Unannotated so inference gives exact keys — see the note in `enquiry.ts`.
  const values = {
    name: read('name'),
    email: read('email'),
    phone: read('phone'),
    city: read('city'),
    country: read('country'),
    relation: read('relation'),
    question: read('question'),
    webinarSlug: read('webinarSlug'),
  }

  if (!isDatabaseConfigured()) {
    return {
      status: 'error',
      values,
      message:
        'Registration is not connected yet, so this form cannot hold your place. Please contact the care team to register. (Technical note for the site owner: set DATA_SOURCE=mongodb and MONGODB_URI.)',
    }
  }

  /* The webinar has to exist, and has to be in the future. ---------------- */
  const webinar = values.webinarSlug ? await getWebinarBySlug(values.webinarSlug) : null

  if (!webinar) {
    return {
      status: 'error',
      values,
      message: 'That session could not be found. Please go back and try again.',
    }
  }

  if (new Date(webinar.endsAt).getTime() <= Date.now()) {
    return {
      status: 'error',
      values,
      message:
        'This session has already taken place. If a recording is published it will appear on this page.',
    }
  }

  if (webinar.registrationClosed) {
    return {
      status: 'error',
      values,
      message: 'Registration for this session is closed.',
    }
  }

  /* Validate. ------------------------------------------------------------- */
  const errors: Record<string, string> = {}

  if (values.name.length < 2) errors.name = 'Please enter your name.'
  if (!looksLikeEmail(values.email)) {
    errors.email = 'We need a working email address — the join link is sent there.'
  }
  if (!looksLikePhone(values.phone)) {
    errors.phone = 'Please enter a phone number, including the country code.'
  }
  if (values.question.length > 2000) {
    errors.question = 'Please keep your question under 2,000 characters.'
  }

  const consent = formData.get('consent') === 'on'
  if (!consent) {
    errors.consent = 'Please confirm we may email you about this session.'
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      errors,
      values,
      message: 'Please check the highlighted fields.',
    }
  }

  const email = normaliseEmail(values.email)

  /* Rate limit. ----------------------------------------------------------- */
  const ip = await callerIp()
  const [byEmail, byIp] = await Promise.all([
    consumeRateLimit(`register:email:${email}`, RATE_LIMITS.registerEmail),
    consumeRateLimit(`register:ip:${ip}`, RATE_LIMITS.registerIp),
  ])

  if (!byEmail.allowed || !byIp.allowed) {
    const retry = Math.max(byEmail.retryAfter, byIp.retryAfter)
    return {
      status: 'error',
      values,
      message: `Too many registration attempts. Please try again ${describeRetry(retry)}.`,
    }
  }

  /* Store, then confirm. -------------------------------------------------- */
  try {
    const { registration, duplicate } = await createRegistration({
      webinarSlug: webinar.slug,
      name: values.name,
      email,
      phone: values.phone,
      city: values.city || undefined,
      country: values.country || undefined,
      question: values.question || undefined,
      relation: (RELATIONS as string[]).includes(values.relation)
        ? (values.relation as EnquiryRelation)
        : 'self',
      consentToContact: true,
    })

    let emailSent = registration.confirmationSent

    /**
     * A duplicate still gets a fresh confirmation.
     *
     * The most common reason someone registers twice is that the first email
     * never arrived. Declining to resend it would leave them exactly where
     * they started.
     */
    if (isMailConfigured()) {
      const result = await sendMail(
        registrationConfirmation(registration, webinar),
      ).catch((error) => {
        console.error('[webinar] confirmation failed', error)
        return { delivered: false } as const
      })

      emailSent = result.delivered

      // Recorded so the team can see who never received a join link.
      await markConfirmationSent(registration.id, emailSent).catch((error) => {
        console.error('[webinar] could not record confirmation state', error)
      })
    }

    return {
      status: 'success',
      reference: registration.reference,
      emailSent,
      alreadyRegistered: duplicate,
      message: duplicate ? 'You were already registered.' : 'Your place is confirmed.',
    }
  } catch (error) {
    console.error('[webinar] registration could not be stored', error)
    return {
      status: 'error',
      values,
      message:
        'Something went wrong on our side and your registration was not saved. Please try again in a moment.',
    }
  }
}
