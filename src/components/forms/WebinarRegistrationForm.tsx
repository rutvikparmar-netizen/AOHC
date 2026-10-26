'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { registerForWebinar } from '@/app/actions/webinar'
import { initialRegistrationState } from '@/lib/forms/state'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'
import { Icon } from '@/components/ui/Icon'
import { CheckboxField, SelectField, TextArea, TextField } from './Field'

const RELATION_OPTIONS = [
  { value: 'self', label: 'I am the patient' },
  { value: 'family', label: 'A family member' },
  { value: 'caregiver', label: 'Someone I care for' },
  { value: 'doctor', label: 'I am a clinician' },
  { value: 'other', label: 'Other' },
]

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? 'Registering…' : 'Register for this session'}
    </Button>
  )
}

export function WebinarRegistrationForm({
  webinarSlug,
  webinarTitle,
}: {
  webinarSlug: string
  webinarTitle: string
}) {
  const [state, formAction] = useActionState(
    registerForWebinar,
    initialRegistrationState,
  )

  if (state.status === 'success') {
    return (
      <div className="rounded-(--radius-panel) border border-border-brand bg-primary-subtle p-6">
        <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary text-white">
          <Icon name="check" className="size-6" />
        </span>

        <h3 className="text-h4 mb-2">
          {state.alreadyRegistered ? 'You were already registered' : 'Your place is confirmed'}
        </h3>

        <p className="mb-4 text-neutral-700">
          For <strong className="text-text">{webinarTitle}</strong>. Your reference is{' '}
          <strong className="text-text">{state.reference}</strong>.
        </p>

        {state.emailSent ? (
          <p className="text-neutral-700">
            The joining details have been emailed to you. If nothing arrives within a few
            minutes, check your spam folder.
          </p>
        ) : (
          /**
           * The failure that matters most on this form.
           *
           * The join link travels by email. Saying "you are registered" and
           * stopping there would leave someone expecting a link that was never
           * sent — so the fallback asks them to make contact instead.
           */
          <Callout tone="warning" title="We could not email your joining link">
            You are registered, but the confirmation email did not go out. Please contact
            the care team quoting the reference above so they can send you the link
            before the session.
          </Callout>
        )}
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="webinarSlug" value={webinarSlug} />

      {state.status === 'error' && state.message ? (
        <Callout tone="warning" title="You are not registered yet">
          {state.message}
        </Callout>
      ) : null}

      <TextField
        name="name"
        label="Your name"
        required
        autoComplete="name"
        error={state.errors?.name}
        defaultValue={state.values?.name}
      />

      <TextField
        name="email"
        label="Email"
        type="email"
        inputMode="email"
        required
        autoComplete="email"
        hint="The joining link is sent here."
        error={state.errors?.email}
        defaultValue={state.values?.email}
      />

      <TextField
        name="phone"
        label="Phone"
        type="tel"
        inputMode="tel"
        required
        autoComplete="tel"
        error={state.errors?.phone}
        defaultValue={state.values?.phone}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          name="city"
          label="City"
          optional
          autoComplete="address-level2"
          defaultValue={state.values?.city}
        />
        <TextField
          name="country"
          label="Country"
          optional
          autoComplete="country-name"
          defaultValue={state.values?.country}
        />
      </div>

      <SelectField
        name="relation"
        label="You are attending as"
        options={RELATION_OPTIONS}
        defaultValue={state.values?.relation ?? 'self'}
      />

      <TextArea
        name="question"
        label="A question for the speakers"
        optional
        rows={4}
        hint="Sessions are built around the questions sent in advance."
        error={state.errors?.question}
        defaultValue={state.values?.question}
      />

      <CheckboxField name="consent" error={state.errors?.consent}>
        I agree to receive the joining link and a reminder about this session by email.
      </CheckboxField>

      <p className="text-sm text-text-muted">
        This is an educational session, not a consultation. The speakers cannot discuss
        an individual case during it.
      </p>

      <SubmitButton />
    </form>
  )
}
