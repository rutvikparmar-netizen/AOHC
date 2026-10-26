import type { Filter } from 'mongodb'
import { collections, getDb, stripId } from '@/lib/db/mongo'
import type { Treatment, TreatmentCategory, TreatmentQuery } from '@/types'
import type { TreatmentRepository } from '../contracts'

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function toFilter(query: TreatmentQuery): Filter<Treatment> {
  const filter: Filter<Treatment> = {}

  if (query.category) filter.category = query.category
  if (query.featured !== undefined) filter.featured = query.featured
  if (query.excludeSlugs?.length) filter.slug = { $nin: query.excludeSlugs }
  if (query.treats) {
    filter.treats = { $regex: new RegExp(escapeRegex(query.treats), 'i') }
  }

  const search = query.search?.trim()
  if (search) {
    const pattern = new RegExp(escapeRegex(search), 'i')
    filter.$or = [
      { name: pattern },
      { fullName: pattern },
      { summary: pattern },
      { treats: pattern },
    ] as Filter<Treatment>[]
  }

  return filter
}

async function collection() {
  return (await getDb()).collection<Treatment>(collections.treatments)
}

async function select(query: TreatmentQuery = {}): Promise<Treatment[]> {
  const cursor = (await collection())
    .find(toFilter(query))
    .sort({ order: 1, name: 1 })

  if (query.limit) cursor.limit(query.limit)

  return (await cursor.toArray()).map(stripId)
}

/** MongoDB implementation of `TreatmentRepository`. */
export const mongoTreatmentRepository: TreatmentRepository = {
  async getTreatments(query) {
    return select(query)
  },

  async getTreatmentBySlug(slug) {
    const doc = await (await collection()).findOne({ slug })
    return doc ? stripId(doc) : null
  },

  async getFeaturedTreatments(limit = 3) {
    return select({ featured: true, limit })
  },

  async getRelatedTreatments(slug, limit = 3) {
    const treatment = await (await collection()).findOne({ slug })
    if (!treatment) return []

    // An editorial `relatedSlugs` list wins over a category match.
    if (treatment.relatedSlugs?.length) {
      const docs = await (await collection())
        .find({ slug: { $in: treatment.relatedSlugs } })
        .toArray()

      if (docs.length) {
        // `$in` does not preserve the order of the list given, so reorder.
        const bySlug = new Map(docs.map((doc) => [doc.slug, stripId(doc)]))
        return treatment.relatedSlugs
          .map((related) => bySlug.get(related))
          .filter((doc): doc is Treatment => Boolean(doc))
          .slice(0, limit)
      }
    }

    return select({ category: treatment.category, excludeSlugs: [slug], limit })
  },

  async getTreatmentsByDoctor(doctorSlug) {
    const docs = await (await collection())
      .find({ specialistSlugs: doctorSlug })
      .sort({ order: 1, name: 1 })
      .toArray()
    return docs.map(stripId)
  },

  async getTreatmentCategories() {
    // `distinct` rather than pulling every treatment and de-duplicating.
    const values = await (await collection()).distinct('category')
    return (values as TreatmentCategory[]).sort()
  },

  async getAllTreatmentSlugs() {
    const docs = await (await collection())
      .find({}, { projection: { slug: 1, _id: 0 } })
      .toArray()
    return docs.map((doc) => doc.slug)
  },
}
