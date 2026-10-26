'use client'

import { useState, useTransition } from 'react'
import type { LeadStatus } from '@/types'
import { saveLeadNotes, updateLeadStatus } from '@/app/actions/admin/leads'
import { cn } from '@/lib/utils'

/**
 * Status buttons and the internal notes box.
 *
 * A client component because it reports back whether a save succeeded. The
 * actions it calls re-check the admin session on the server — this component
 * being client-side gives it no authority, and could not.
 *
 * `useTransition` rather than `useActionState`: there are two independent
 * actions here and each needs its own pending and result state, which one
 * form-state hook cannot express.
 */

const STATUSES: Array<{ value: LeadStatus; label: string; hint: string }> = [
  { value: 'new', label: 'New', hint: 'Nobody has replied yet' },
  { value: 'contacted', label: 'Contacted', hint: 'We have replied' },
  { value: 'consulting', label: 'Consulting', hint: 'Review or appointment under way' },
  { value: 'closed', label: 'Closed', hint: 'Nothing further needed' },
]

export function LeadControls({
  id,
  status,
  notes,
}: {
  id: string
  status: LeadStatus
  notes: string
}) {
  const [current, setCurrent] = useState(status)
  const [noteText, setNoteText] = useState(notes)
  const [statusPending, startStatus] = useTransition()
  const [notesPending, startNotes] = useTransition()
  const [error, setError] = useState<string>()
  const [notesSaved, setNotesSaved] = useState(false)

  const changeStatus = (next: LeadStatus) => {
    setError(undefined)
    // Optimistic: the button reflects the choice immediately, and is put back
    // if the server refuses.
    const previous = current
    setCurrent(next)

    startStatus(async () => {
      const form = new FormData()
      form.set('id', id)
      form.set('status', next)

      const result = await updateLeadStatus(form)
      if (!result.ok) {
        setCurrent(previous)
        setError(result.message ?? 'Could not update the status.')
      }
    })
  }

  const saveNotes = () => {
    setError(undefined)
    setNotesSaved(false)

    startNotes(async () => {
      const form = new FormData()
      form.set('id', id)
      form.set('notes', noteText)

      const result = await saveLeadNotes(form)
      if (result.ok) setNotesSaved(true)
      else setError(result.message ?? 'Could not save the notes.')
    })
  }

  return (
    <>
      <section className="admin-card p-5">
        <h2 className="text-h6 mb-3">Status</h2>

        <ul className="space-y-2">
          {STATUSES.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => changeStatus(option.value)}
                disabled={statusPending}
                aria-pressed={current === option.value}
                className={cn(
                  'w-full rounded-(--radius-button) border px-3 py-2.5 text-left disabled:opacity-60',
                  current === option.value
                    ? 'border-primary bg-primary-subtle'
                    : 'border-border-strong bg-surface hover:border-primary',
                )}
              >
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="block text-xs text-text-muted">{option.hint}</span>
              </button>
            </li>
          ))}
        </ul>

        {error ? (
          <p role="status" className="mt-3 text-sm font-medium text-danger">
            {error}
          </p>
        ) : null}
      </section>

      <section className="admin-card p-5">
        <h2 className="text-h6 mb-1">Internal notes</h2>
        <p className="mb-3 text-xs text-text-muted">
          Never shown to the patient. Keep clinical opinions out of here unless a
          clinician wrote them.
        </p>

        <label htmlFor="lead-notes" className="sr-only">
          Internal notes
        </label>
        <textarea
          id="lead-notes"
          value={noteText}
          onChange={(event) => {
            setNoteText(event.target.value)
            setNotesSaved(false)
          }}
          rows={6}
          className="w-full resize-y rounded-(--radius-input) border border-border-strong bg-surface p-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={saveNotes}
            disabled={notesPending}
            className="min-h-10 rounded-(--radius-button) bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {notesPending ? 'Saving…' : 'Save notes'}
          </button>

          {notesSaved ? (
            <p role="status" className="text-sm font-medium text-success">
              Saved
            </p>
          ) : null}
        </div>
      </section>
    </>
  )
}
