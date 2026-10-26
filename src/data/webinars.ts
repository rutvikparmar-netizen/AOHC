import type { Webinar } from '@/types'

/**
 * WEBINAR CONTENT
 * ----------------------------------------------------------------------------
 * Empty, awaiting the real thing. Read by
 * `lib/repositories/demo/webinar-repository.ts`.
 *
 * `startsAt` and `endsAt` are ISO-8601 instants IN UTC. Store the instant, not
 * a local time plus a label — `lib/format.ts` renders it in IST for display,
 * and the calendar links in the confirmation email depend on the instant being
 * unambiguous.
 *
 * The join link does NOT belong in a record here. It lives in
 * `WEBINAR_JOIN_URL` and is emailed to registrants, because a Zoom link on a
 * public page is an open door.
 */
export const webinars: Webinar[] = []
