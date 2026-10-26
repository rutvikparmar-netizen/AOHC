import type { Treatment } from '@/types'

/**
 * TREATMENT CONTENT
 * ----------------------------------------------------------------------------
 * Empty, awaiting the real thing.
 *
 * The file itself has to exist: `lib/repositories/demo/treatment-repository.ts`
 * imports this array, and that is what `DATA_SOURCE=demo` reads. An empty
 * array is a working data source with nothing in it — every page renders its
 * empty state rather than throwing.
 *
 * WHEN YOU ADD RECORDS, the type will tell you what is required. Two fields
 * are worth knowing about before you start:
 *
 *   risks   — required, and the UI gives it the same weight as `benefits`.
 *   source  — 'demo' until a clinician has read the page, which makes it
 *             render an "unreviewed" banner. Set it to 'reviewed' and add a
 *             `review` block once someone has actually signed off.
 */
export const treatments: Treatment[] = []
