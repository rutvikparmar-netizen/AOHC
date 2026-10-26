import type { Filter } from 'mongodb'
import { collections, getDb, stripId } from '@/lib/db/mongo'
import type { PatientStory, StoryQuery } from '@/types'
import type { StoryRepository } from '../contracts'

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * THE CONSENT GATE, as a query clause.
 *
 * Every read in this file starts from this filter. A story whose consent has
 * not been recorded — or has been withdrawn in the console — is not reachable
 * through any method here, including a direct slug lookup.
 *
 * Written as a base filter that the others spread, rather than remembered per
 * method, because the failure mode of forgetting it once is publishing
 * somebody's medical history without permission.
 */
const CONSENTED: Filter<PatientStory> = { 'consent.obtained': true }

function toFilter(query: StoryQuery): Filter<PatientStory> {
  const filter: Filter<PatientStory> = { ...CONSENTED }

  if (query.featured !== undefined) filter.featured = query.featured
  if (query.treatmentSlug) filter.treatmentSlugs = query.treatmentSlug
  if (query.excludeSlugs?.length) filter.slug = { $nin: query.excludeSlugs }
  if (query.diagnosis) {
    filter.diagnosis = { $regex: new RegExp(escapeRegex(query.diagnosis), 'i') }
  }

  return filter
}

async function collection() {
  return (await getDb()).collection<PatientStory>(collections.stories)
}

async function select(query: StoryQuery = {}): Promise<PatientStory[]> {
  const cursor = (await collection()).find(toFilter(query)).sort({ publishedAt: -1 })
  if (query.limit) cursor.limit(query.limit)
  return (await cursor.toArray()).map(stripId)
}

/** MongoDB implementation of `StoryRepository`. */
export const mongoStoryRepository: StoryRepository = {
  async getStories(query) {
    return select(query)
  },

  async getStoryBySlug(slug) {
    const doc = await (await collection()).findOne({ ...CONSENTED, slug })
    return doc ? stripId(doc) : null
  },

  async getFeaturedStories(limit = 3) {
    return select({ featured: true, limit })
  },

  async getAllStorySlugs() {
    const docs = await (await collection())
      .find(CONSENTED, { projection: { slug: 1, _id: 0 } })
      .toArray()
    return docs.map((doc) => doc.slug)
  },
}
