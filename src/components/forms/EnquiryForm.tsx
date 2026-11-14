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
import { FormTextContext } from './FormText'

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

/**
 * ⚠️  THE LABEL IS A PROP WITH A DEFAULT, NOT A CONSTANT. The consultation
 * page's draft specifies its own words for this button — "Submit
 * Consultation Enquiry" — and the home page keeps "Schedule Meeting". The
 * pending state is not overridable: "Sending…" is a status, not a label,
 * and it should read the same wherever the form is used.
 */
function SubmitButton({ label, sending }: { label: string; sending: string }) {
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
      {pending ? sending : label}
    </Button>
  )
}

export function EnquiryForm({
  source = 'contact-page',
  captcha,
  submitLabel = 'Schedule Meeting',
  dict,
}: {
  source?: LeadSource
  /** Server-generated challenge: the two addends and a signed token. */
  captcha: { a: number; b: number; token: string }
  /**
   * The words on the submit button. The consultation page's draft
   * specifies its own — "Submit Consultation Enquiry" — and the home page
   * keeps the default.
   */
  submitLabel?: string
  /**
   * Translations, English → this page's language (see `src/i18n`). Every
   * visible string, the select labels and the server's error messages go
   * through it; the VALUES sent (country, heard-from) stay English so the
   * team's records are uniform. Absent on English pages.
   */
  dict?: Record<string, string>
}) {
  const [state, formAction] = useActionState(submitEnquiry, initialEnquiryState)
  const tr = (text?: string) => (text ? (dict?.[text] ?? text) : text) as string
  const options = (list: { value: string; label: string }[]) => list.map((o) => ({ ...o, label: tr(o.label) }))

  /* Success. The form is replaced rather than cleared, so nobody re-submits. */
  if (state.status === 'success') {
    return (
      <div className="rounded-(--radius-panel) border border-border-brand bg-primary-subtle p-6 sm:p-8">
        <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary text-white">
          <Icon name="check" className="size-6" />
        </span>

        <h3 className="text-h3 mb-2">{tr('Your enquiry has been received')}</h3>

        <p className="mb-4 text-neutral-700">
          {tr('Your reference is')}{' '}
          <strong className="font-bold text-text">{state.reference}</strong>.{' '}
          {tr('Please quote it if you write again.')}
        </p>

        {/**
         * The email status is stated, not assumed. "Check your inbox" when no
         * acknowledgement was sent leaves someone watching a mailbox that will
         * never receive anything — and doubting the enquiry arrived at all.
         */}
        {state.emailSent ? (
          <p className="mb-5 text-neutral-700">
            {tr('A confirmation has been emailed to you. If it has not arrived in a few minutes, please check your spam folder.')}
          </p>
        ) : (
          <p className="mb-5 text-neutral-700">
            {tr('Your enquiry is safely with the care team, but we could not send you a confirmation email. Please keep the reference above — it is the only copy.')}
          </p>
        )}

        <Callout tone="warning" title={tr('If things change before we reach you')}>
          {tr('Contact your treating hospital or your nearest emergency department. This mailbox is not monitored around the clock.')}
        </Callout>
      </div>
    )
  }

  return (
    <FormTextContext.Provider value={(s) => tr(s)}>
    <form action={formAction} className="@container space-y-5" noValidate>
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="captchaToken" value={captcha.token} />

      {state.status === 'error' && state.message ? (
        <Callout tone="warning" title={tr('Your enquiry was not sent')}>
          {tr(state.message)}
        </Callout>
      ) : null}

      <TextField
        name="name"
        label={tr('Full Name')}
        placeholder={tr('Enter name')}
        required
        autoComplete="name"
        error={tr(state.errors?.name)}
        defaultValue={state.values?.name}
      />

      {/* EMAIL AND PHONE SHARE A ROW, half each, from `sm` up. They stack on
          phones: the phone group is itself two controls, and splitting a
          320px column in two leaves a dial-code picker about 140px wide
          beside a number field that cannot show a number. */}
      <div className="grid gap-5 @md:grid-cols-2">
        <TextField
          name="email"
          label={tr('Email')}
          type="email"
          inputMode="email"
          placeholder={tr('Enter Email')}
          required
          autoComplete="email"
          error={tr(state.errors?.email)}
          defaultValue={state.values?.email}
        />

        {/* Dial code and number are separate controls so the code can be
            picked rather than typed — but they are one labelled group, or a
            screen reader announces two unrelated fields. */}
        <fieldset className="min-w-0">
          <legend className="mb-1.5 text-sm font-bold text-text">
            {tr('Phone')}
            <span aria-hidden className="ml-1 text-accent-dark">
              *
            </span>
            <span className="sr-only"> ({tr('required')})</span>
          </legend>

          {/* `minmax(0,…)` rather than a fixed column: inside half a row the
              picker has to be able to shrink, and a grid track's automatic
              minimum would otherwise hold it at the width of the longest
              country name. 7.5rem, because the old 11rem left the number
              field 94px at the 640px breakpoint — too narrow to show a phone
              number. The picker truncates the country name instead, which
              costs nothing once it has been chosen. */}
          <div className="grid gap-3 @md:grid-cols-[minmax(0,7.5rem)_1fr]">
            <SelectField
              name="dialCode"
              label={tr('Country code')}
              labelHidden
              options={dialCodes}
              defaultValue={state.values?.dialCode ?? '+91'}
            />
            <TextField
              name="phone"
              label={tr('Phone number')}
              labelHidden
              type="tel"
              inputMode="tel"
              placeholder="(201) 555-0123"
              required
              autoComplete="tel"
              error={tr(state.errors?.phone)}
              defaultValue={state.values?.phone}
            />
          </div>
        </fieldset>
      </div>

      <div className="grid gap-5 @xl:grid-cols-3">
        <SelectField
          name="country"
          label={tr('Country')}
          options={options(COUNTRIES)}
          required
          error={tr(state.errors?.country)}
          defaultValue={state.values?.country}
        />
        <TextField
          name="state"
          label={tr('State')}
          placeholder={tr('Enter State')}
          optional
          autoComplete="address-level1"
          defaultValue={state.values?.state}
        />
        <TextField
          name="city"
          label={tr('City')}
          placeholder={tr('Enter City')}
          optional
          autoComplete="address-level2"
          defaultValue={state.values?.city}
        />
      </div>

      <SelectField
        name="heardFrom"
        label={tr('How did you hear about us?')}
        options={options(HEARD_FROM)}
        defaultValue={state.values?.heardFrom}
      />

      <TextArea
        name="message"
        label={tr('Message')}
        required
        rows={5}
        hint={tr('What you have been told so far, and what you would like to know.')}
        error={tr(state.errors?.message)}
        defaultValue={state.values?.message}
      />

      {/* Single-digit addition. This form is filled in by people who are
          unwell, often elderly, often not first-language English speakers —
          a captcha that turns away a real patient has done more damage than
          the spam it prevented. */}
      <TextField
        name="captcha"
        label={tr('Verification: what is {a} + {b}?').replace('{a}', String(captcha.a)).replace('{b}', String(captcha.b))}
        inputMode="numeric"
        required
        autoComplete="off"
        placeholder={tr('Enter the answer')}
        error={tr(state.errors?.captcha)}
        className="sm:max-w-xs"
      />

      <CheckboxField name="consent" error={tr(state.errors?.consent)}>
        {tr('I agree that Art of Healing Cancer may contact me about this enquiry, and may store the details I have given here in order to do so.')}
      </CheckboxField>

      <SubmitButton label={tr(submitLabel)} sending={tr('Sending…')} />
    </form>
    </FormTextContext.Provider>
  )
}
