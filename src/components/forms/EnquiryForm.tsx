'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import type { LeadSource } from '@/types'
import { submitEnquiry } from '@/app/actions/enquiry'
import { initialEnquiryState } from '@/lib/forms/state'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'
import { Icon } from '@/components/ui/Icon'
import { dialCodes } from '@/data/dial-codes'
import { CheckboxField, SelectField, TextArea, TextField } from './Field'

/**
 * The patient enquiry form.
 *
 * A CLIENT COMPONENT, because `useActionState` holds the per-field errors and
 * the success state across the round trip. The action itself runs on the
 * server — nothing here touches the database, and all it receives back is a
 * result object with no patient data in it.
 *
 * `useFormStatus` drives the pending state from a CHILD of the form, which is
 * the only place it works. Disabling the button during submit is not cosmetic:
 * a double submission stores the same enquiry twice and the team calls
 * somebody twice about it.
 *
 * THE CAPTCHA CHALLENGE IS GENERATED ON THE SERVER and passed in. The answer
 * never reaches the browser — only an HMAC of it — so the field cannot be
 * read out of the markup. See `lib/forms/captcha.ts`.
 */

const COUNTRIES = [
  { value: '', label: 'Select country' },
  { value: 'India', label: 'India' },
  { value: 'United States', label: 'United States' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Other', label: 'Other' },
]

const HEARD_FROM = [
  { value: '', label: 'Select an option' },
  { value: 'Google Search', label: 'Google Search' },
  { value: 'Facebook Groups', label: 'Facebook Groups' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Referred by a doctor', label: 'Referred by a doctor' },
  { value: 'Friend or family', label: 'Friend or family' },
  { value: 'News article', label: 'News article' },
  { value: 'Other', label: 'Other' },
]

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      variant="accent"
      size="lg"
      disabled={pending}
      icon={pending ? undefined : 'arrow-right'}
      className="w-full rounded-(--radius-pill) sm:w-auto"
    >
      {pending ? 'Sending…' : 'Schedule Meeting'}
    </Button>
  )
}

export function EnquiryForm({
  source = 'contact-page',
  captcha,
}: {
  source?: LeadSource
  /** Server-generated challenge: the two addends and a signed token. */
  captcha: { a: number; b: number; token: string }
}) {
  const [state, formAction] = useActionState(submitEnquiry, initialEnquiryState)

  /* Success. The form is replaced rather than cleared, so nobody re-submits. */
  if (state.status === 'success') {
    return (
      <div className="rounded-(--radius-panel) border border-border-brand bg-primary-subtle p-6 sm:p-8">
        <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary text-white">
          <Icon name="check" className="size-6" />
        </span>

        <h3 className="text-h3 mb-2">Your enquiry has been received</h3>

        <p className="mb-4 text-neutral-700">
          Your reference is{' '}
          <strong className="font-bold text-text">{state.reference}</strong>. Please
          quote it if you write again.
        </p>

        {/**
         * The email status is stated, not assumed. "Check your inbox" when no
         * acknowledgement was sent leaves someone watching a mailbox that will
         * never receive anything — and doubting the enquiry arrived at all.
         */}
        {state.emailSent ? (
          <p className="mb-5 text-neutral-700">
            A confirmation has been emailed to you. If it has not arrived in a few
            minutes, please check your spam folder.
          </p>
        ) : (
          <p className="mb-5 text-neutral-700">
            Your enquiry is safely with the care team, but we could not send you a
            confirmation email. Please keep the reference above — it is the only copy.
          </p>
        )}

        <Callout tone="warning" title="If things change before we reach you">
          Contact your treating hospital or your nearest emergency department. This
          mailbox is not monitored around the clock.
        </Callout>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="captchaToken" value={captcha.token} />

      {state.status === 'error' && state.message ? (
        <Callout tone="warning" title="Your enquiry was not sent">
          {state.message}
        </Callout>
      ) : null}

      <TextField
        name="name"
        label="Full Name"
        placeholder="Enter name"
        required
        autoComplete="name"
        error={state.errors?.name}
        defaultValue={state.values?.name}
      />

      {/* EMAIL AND PHONE SHARE A ROW, half each, from `sm` up. They stack on
          phones: the phone group is itself two controls, and splitting a
          320px column in two leaves a dial-code picker about 140px wide
          beside a number field that cannot show a number. */}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          placeholder="Enter Email"
          required
          autoComplete="email"
          error={state.errors?.email}
          defaultValue={state.values?.email}
        />

        {/* Dial code and number are separate controls so the code can be
            picked rather than typed — but they are one labelled group, or a
            screen reader announces two unrelated fields. */}
        <fieldset className="min-w-0">
          <legend className="mb-1.5 text-sm font-bold text-text">
            Phone
            <span aria-hidden className="ml-1 text-accent-dark">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </legend>

          {/* `minmax(0,…)` rather than a fixed column: inside half a row the
              picker has to be able to shrink, and a grid track's automatic
              minimum would otherwise hold it at the width of the longest
              country name. 7.5rem, because the old 11rem left the number
              field 94px at the 640px breakpoint — too narrow to show a phone
              number. The picker truncates the country name instead, which
              costs nothing once it has been chosen. */}
          <div className="grid gap-3 sm:grid-cols-[minmax(0,7.5rem)_1fr]">
            <SelectField
              name="dialCode"
              label="Country code"
              labelHidden
              options={dialCodes}
              defaultValue={state.values?.dialCode ?? '+91'}
            />
            <TextField
              name="phone"
              label="Phone number"
              labelHidden
              type="tel"
              inputMode="tel"
              placeholder="(201) 555-0123"
              required
              autoComplete="tel"
              error={state.errors?.phone}
              defaultValue={state.values?.phone}
            />
          </div>
        </fieldset>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <SelectField
          name="country"
          label="Country"
          options={COUNTRIES}
          required
          error={state.errors?.country}
          defaultValue={state.values?.country}
        />
        <TextField
          name="state"
          label="State"
          placeholder="Enter State"
          optional
          autoComplete="address-level1"
          defaultValue={state.values?.state}
        />
        <TextField
          name="city"
          label="City"
          placeholder="Enter City"
          optional
          autoComplete="address-level2"
          defaultValue={state.values?.city}
        />
      </div>

      <SelectField
        name="heardFrom"
        label="How did you hear about us?"
        options={HEARD_FROM}
        defaultValue={state.values?.heardFrom}
      />

      <TextArea
        name="message"
        label="Message"
        required
        rows={5}
        hint="What you have been told so far, and what you would like to know."
        error={state.errors?.message}
        defaultValue={state.values?.message}
      />

      {/* Single-digit addition. This form is filled in by people who are
          unwell, often elderly, often not first-language English speakers —
          a captcha that turns away a real patient has done more damage than
          the spam it prevented. */}
      <TextField
        name="captcha"
        label={`Verification: what is ${captcha.a} + ${captcha.b}?`}
        inputMode="numeric"
        required
        autoComplete="off"
        placeholder="Enter the answer"
        error={state.errors?.captcha}
        className="sm:max-w-xs"
      />

      <CheckboxField name="consent" error={state.errors?.consent}>
        I agree that Art of Healing Cancer may contact me about this enquiry, and may
        store the details I have given here in order to do so.
      </CheckboxField>

      <p className="rounded-(--radius-md) border border-border bg-surface-subtle p-4 text-sm text-neutral-700">
        Please do not send scans or reports through this form. If a review is needed,
        the team will tell you how to share them securely.
      </p>

      <SubmitButton />
    </form>
  )
}
