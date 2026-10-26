import type { Filter } from 'mongodb'
import { collections, getDb, stripId } from '@/lib/db/mongo'
import type { Webinar, WebinarQuery } from '@/types'
import type { WebinarRepository } from '../contracts'

function toFilter(query: WebinarQuery): Filter<Webinar> {
  const filter: Filter<Webinar> = {}

  if (query.topic) filter.topic = query.topic
  if (query.excludeSlugs?.length) filter.slug = { $nin: query.excludeSlugs }

  /**
   * Compared against `endsAt`, not `startsAt`.
   *
   * A live session must stay in "upcoming" while it is running — moving it to
   * the archive the moment it starts hides the registration page from anyone
   * arriving a few minutes late.
   *
   * The comparison is a string comparison, which is sound here because the
   * model stores ISO-8601 instants in UTC: they sort lexicographically.
   */
  const now = new Date().toISOString()
  if (query.when === 'upcoming') filter.endsAt = { $gt: now }
  if (query.when === 'past') filter.endsAt = { $lte: now }

  return filter
}

async function collection() {
  return (await getDb()).collection<Webinar>(collections.webinars)
}

/** MongoDB implementation of `WebinarRepository`. */
export const mongoWebinarRepository: WebinarRepository = {
  async getWebinars(query = {}) {
    const cursor = (await collection())
      .find(toFilter(query))
      // Soonest first for upcoming; most recent first for everything else.
      .sort({ startsAt: query.when === 'upcoming' ? 1 : -1 })

    if (query.limit) cursor.limit(query.limit)
    return (await cursor.toArray()).map(stripId)
  },

  async getWebinarBySlug(slug) {
    const doc = await (await collection()).findOne({ slug })
    return doc ? stripId(doc) : null
  },

  async getNextWebinar() {
    const doc = await (await collection()).findOne(toFilter({ when: 'upcoming' }), {
      sort: { startsAt: 1 },
    })
    return doc ? stripId(doc) : null
  },

  async getAllWebinarSlugs() {
    const docs = await (await collection())
      .find({}, { projection: { slug: 1, _id: 0 } })
      .toArray()
    return docs.map((doc) => doc.slug)
  },
}
