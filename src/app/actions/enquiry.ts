'use server'

import type { LeadSource } from '@/types'
import { isDatabaseConfigured } from '@/lib/db/mongo'
import { createEnquiry } from '@/lib/leads/store'
import { isMailConfigured, sendMail } from '@/lib/mail/mailer'
import { enquiryAcknowledgement, enquiryNotification } from '@/lib/mail/templates'
import {
  RATE_LIMITS,
  callerIp,
  consumeRateLimit,
  describeRetry,
} from '@/lib/auth/rate-limit'
import { normaliseEmail } from '@/lib/auth/crypto'
import { verifyCaptcha } from '@/lib/forms/captcha'
import type { EnquiryFormState } from '@/lib/forms/state'

/**
 * PATIENT ENQUIRY SUBMISSION
 * ----------------------------------------------------------------------------
 * The one place on the public site that writes patient data.
 *
 * THE ORDER OF OPERATIONS IS THE DESIGN:
 *
 *   1. Refuse outright if there is nowhere to store the enquiry. A thank-you
 *      screen over a dropped submission is the worst outcome this file can
 *      produce — someone with a new diagnosis believes they have reached the
 *      team and waits.
 *   2. Captcha, then validation, returning field errors with the submitted
 *      values intact.
 *   3. Rate limit, per email and per network.
 *   4. STORE IT. This is the step that must succeed, and if it throws the
 *      person is told the truth.
 *   5. Email, best effort. A failed email does not fail the submission,
 *      because the enquiry is already safe — but the result says whether the
 *      acknowledgement actually went out rather than claiming it did.
 */

const SOURCES: LeadSource[] = [
  'contact-page',
  'treatment-page',
  'doctor-page',
  'webinar-page',
  'story-page',
  'home-hero',
]

/**
 * Deliberately permissive. The job is to catch a typo, not to adjudicate what
 * a valid address looks like — RFC-complete validation rejects real
 * addresses, and a patient turned away by a regex cannot appeal to it.
 */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

/**
 * Digit count only. Visitors write +91 98765 43210, 098765-43210, or a
 * landline with an STD code. Any pattern strict enough to normalise those
 * rejects somebody's real number.
 */
function looksLikePhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export async function submitEnquiry(
  _previous: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const read = (key: string) => (formData.get(key) ?? '').toString().trim()

  // Unannotated, so inference gives exact keys — `noUncheckedIndexedAccess`
  // would make every read from an annotated record `string | undefined`.
  const values = {
    name: read('name'),
    email: read('email'),
    phone: read('phone'),
    dialCode: read('dialCode'),
    country: read('country'),
    state: read('state'),
    city: read('city'),
    heardFrom: read('heardFrom'),
    message: read('message'),
    source: read('source'),
  }

  /* 1. Nowhere to put it. ------------------------------------------------- */
  if (!isDatabaseConfigured()) {
    return {
      status: 'error',
      values,
      message:
        'This form is not connected to a mailbox yet, so your message would not reach anyone. Please email the care team directly — the address is on this page. (Technical note for the site owner: set DATA_SOURCE=mongodb and MONGODB_URI.)',
    }
  }

  /* 2. Captcha, then the fields. ------------------------------------------ */
  const errors: Record<string, string> = {}

  if (!verifyCaptcha(read('captcha'), read('captchaToken'))) {
    errors.captcha = 'That answer was not right. Please try the sum again.'
  }

  if (values.name.length < 2) errors.name = 'Please enter your full name.'
  if (!looksLikeEmail(values.email)) {
    errors.email = 'Please enter an email address we can reply to.'
  }
  if (!looksLikePhone(values.phone)) {
    errors.phone = 'Please enter a phone number we can reach you on.'
  }
  if (!values.country) errors.country = 'Please select your country.'
  if (values.message.length < 10) {
    errors.message =
      'Please tell us a little about what you need, so we can reply usefully.'
  }
  if (values.message.length > 5000) {
    errors.message = 'Please keep this under 5,000 characters.'
  }

  /**
   * Consent is required, not assumed. Without an explicit tick there is no
   * record that the person agreed to be contacted about a medical matter.
   */
  const consent = formData.get('consent') === 'on'
  if (!consent) {
    errors.consent = 'Please confirm we may contact you about this enquiry.'
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
  /* The dial code is a separate control, so store the dialable number. */
  const phone = `${values.dialCode} ${values.phone}`.trim()

  /* 3. Rate limit. -------------------------------------------------------- */
  const ip = await callerIp()
  const [byEmail, byIp] = await Promise.all([
    consumeRateLimit(`enquiry:email:${email}`, RATE_LIMITS.enquiryEmail),
    consumeRateLimit(`enquiry:ip:${ip}`, RATE_LIMITS.enquiryIp),
  ])

  if (!byEmail.allowed || !byIp.allowed) {
    const retry = Math.max(byEmail.retryAfter, byIp.retryAfter)
    return {
      status: 'error',
      values,
      message: `We have already received several enquiries from you. If something has changed, please email the care team rather than waiting — otherwise try again ${describeRetry(retry)}.`,
    }
  }

  /* 4. Store it. This is the step that counts. ---------------------------- */
  try {
    const enquiry = await createEnquiry({
      name: values.name,
      email,
      phone,
      city: values.city || undefined,
      state: values.state || undefined,
      country: values.country || undefined,
      heardFrom: values.heardFrom || undefined,
      message: values.message,
      consentToContact: true,
      source: (SOURCES as string[]).includes(values.source)
        ? (values.source as LeadSource)
        : 'contact-page',
    })

    /* 5. Email, best effort. --------------------------------------------- */
    let emailSent = false

    if (isMailConfigured()) {
      const notifyTo = process.env.ENQUIRY_NOTIFY_TO

      /**
       * Neither message is allowed to throw. The enquiry is already stored,
       * so a mail outage must not turn a successful submission into an error
       * the person will retry — a retry would store it twice and still not
       * send the email.
       */
      const [acknowledgement] = await Promise.all([
        sendMail(enquiryAcknowledgement({ ...enquiry })).catch((error) => {
          console.error('[enquiry] acknowledgement failed', error)
          return { delivered: false } as const
        }),
        notifyTo
          ? sendMail(enquiryNotification({ ...enquiry }, notifyTo)).catch((error) => {
              console.error('[enquiry] team notification failed', error)
              return { delivered: false } as const
            })
          : Promise.resolve({ delivered: false } as const),
      ])

      emailSent = acknowledgement.delivered
    }

    return {
      status: 'success',
      reference: enquiry.reference,
      emailSent,
      message: 'Your enquiry has been received.',
    }
  } catch (error) {
    /**
     * The storage write failed, so nothing was saved. The detail is logged
     * and withheld: a Mongo error string can carry the cluster host and the
     * username.
     */
    console.error('[enquiry] could not be stored', error)
    return {
      status: 'error',
      values,
      message:
        'Something went wrong on our side and your message was not saved. Please try again, or email the care team directly.',
    }
  }
}
