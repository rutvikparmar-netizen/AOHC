/**
 * A marker for content that still has to come from the client.
 *
 * ⚠️  IT RENDERS NOTHING. The amber "to do" notices were removed from the page
 * on request, but the markers themselves were deliberately left in the markup
 * rather than deleted, because each one records a real gap — a missing phone
 * number, an absent press logo, a video still that has words baked into it.
 * Deleting the calls would have thrown away the list of what is outstanding.
 *
 * So this is now a no-op that keeps that list greppable:
 *
 *     grep -rn "<Todo" src/
 *
 * To see them on the page again during a content review, return the element
 * below instead of `null` — the styles are in git history, or any dashed amber
 * chip will do. Nothing else has to change.
 *
 * `children` is accepted and ignored on purpose: the words are the record.
 */
interface TodoProps {
  children: React.ReactNode
  className?: string
  as?: 'span' | 'p' | 'div'
}

/* Typed through `FC` rather than as a parameter, so the props stay declared —
   every existing call site still type-checks — without an unused binding. */
export const Todo: React.FC<TodoProps> = () => null
