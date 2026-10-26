import type { Webinar } from '@/types'

/**
 * Is this session still worth registering for?
 *
 * COMPARED AGAINST `endsAt`, NOT `startsAt`. A live session must stay
 * "upcoming" while it is running — flipping it to the archive the moment it
 * begins hides the registration page from anyone arriving a few minutes late.
 *
 * It lives here, outside any component, for a reason beyond tidiness: reading
 * the clock during a component's render is impure, and on a prerendered page
 * it is worse than impure — the value would be frozen at build time, so a
 * finished webinar would advertise itself as upcoming until the next deploy.
 * Pages that call this must therefore either render dynamically or revalidate.
 */
export function isWebinarUpcoming(webinar: Webinar, now = Date.now()): boolean {
  return new Date(webinar.endsAt).getTime() > now
}

/** Upcoming, and not closed by hand. */
export function canRegisterFor(webinar: Webinar, now = Date.now()): boolean {
  return isWebinarUpcoming(webinar, now) && !webinar.registrationClosed
}
