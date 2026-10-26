import { webinars } from '@/data/webinars'
import type { Webinar, WebinarQuery } from '@/types'
import type { WebinarRepository } from '../contracts'

/** Soonest first for upcoming sessions, most recent first for past ones. */
const bySoonest = (a: Webinar, b: Webinar) => a.startsAt.localeCompare(b.startsAt)
const byMostRecent = (a: Webinar, b: Webinar) => b.startsAt.localeCompare(a.startsAt)

/**
 * A session counts as upcoming until it ENDS, not until it starts.
 *
 * Comparing against `startsAt` would move a live webinar into the past
 * archive the moment it began — exactly when someone arriving late needs the
 * registration page.
 */
function isUpcoming(webinar: Webinar, now: number): boolean {
  return new Date(webinar.endsAt).getTime() > now
}

function select(query: WebinarQuery = {}): Webinar[] {
  const now = Date.now()
  const when = query.when ?? 'all'

  let filtered = webinars.filter((webinar) => {
    if (query.topic && webinar.topic !== query.topic) return false
    if (query.excludeSlugs?.includes(webinar.slug)) return false
    if (when === 'upcoming') return isUpcoming(webinar, now)
    if (when === 'past') return !isUpcoming(webinar, now)
    return true
  })

  filtered = [...filtered].sort(when === 'upcoming' ? bySoonest : byMostRecent)
  return query.limit ? filtered.slice(0, query.limit) : filtered
}

/** Demo implementation backed by `src/data/webinars.ts`. */
export const demoWebinarRepository: WebinarRepository = {
  async getWebinars(query) {
    return select(query)
  },

  async getWebinarBySlug(slug) {
    return webinars.find((webinar) => webinar.slug === slug) ?? null
  },

  async getNextWebinar() {
    return select({ when: 'upcoming', limit: 1 })[0] ?? null
  },

  async getAllWebinarSlugs() {
    return webinars.map((webinar) => webinar.slug)
  },
}
