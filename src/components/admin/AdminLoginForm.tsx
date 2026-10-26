'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signInAdmin } from '@/app/actions/admin/auth'
import { initialAdminLoginState } from '@/lib/forms/state'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'
import { TextField } from '@/components/forms/Field'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? 'Signing in…' : 'Sign in'}
    </Button>
  )
}

export function AdminLoginForm() {
  const [state, formAction] = useActionState(signInAdmin, initialAdminLoginState)

  return (
    <form action={formAction} className="space-y-4">
      {state.status === 'error' && state.message ? (
        <Callout tone="warning">{state.message}</Callout>
      ) : null}

      <TextField
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="username"
        defaultValue={state.email}
      />

      {/**
       * `type="password"` with `autoComplete="current-password"`, so a password
       * manager fills it. The field is not rendered through `TextField`
       * because that component's union does not include a password type —
       * keeping passwords off the shared text-input path means no future
       * change to it can accidentally start echoing one back as a
       * `defaultValue`, which is exactly what `TextField` does for every
       * other field after a failed submit.
       */}
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-(--radius-input) border border-border-strong bg-surface px-3.5 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      </div>

      <SubmitButton />
    </form>
  )
}
