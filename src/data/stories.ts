import type { PatientStory } from '@/types'

/**
 * PATIENT STORIES
 * ----------------------------------------------------------------------------
 * Empty. Read by `lib/repositories/demo/story-repository.ts`.
 *
 * BEFORE ADDING ONE, note that both repository implementations filter on
 * `consent.obtained`. A record with it set to `false` is unreachable from
 * every page, every related-content block and the sitemap — that gate is in
 * the data layer precisely so a new page inherits it instead of having to
 * remember it.
 *
 * So the order is: written permission from the patient first, recording what
 * they agreed to (`identify`: full name, first name only, or anonymous) and
 * the date; clinical details checked; then the record, with
 * `consent.obtained: true` and the real `obtainedAt`.
 *
 * `outcomeDisclaimer` is required by the type and rendered with every story.
 * One person's result does not predict anyone else's.
 */
export const patientStories: PatientStory[] = []
