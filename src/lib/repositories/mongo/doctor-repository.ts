import type { Filter } from 'mongodb'
import { collections, getDb, stripId } from '@/lib/db/mongo'
import type { Doctor, DoctorQuery } from '@/types'
import type { DoctorRepository } from '../contracts'

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function toFilter(query: DoctorQuery): Filter<Doctor> {
  const filter: Filter<Doctor> = {}

  if (query.featured !== undefined) filter.featured = query.featured
  if (query.treatmentSlug) filter.treatmentSlugs = query.treatmentSlug
  if (query.speciality) {
    filter.specialities = { $regex: new RegExp(escapeRegex(query.speciality), 'i') }
  }

  const search = query.search?.trim()
  if (search) {
    const pattern = new RegExp(escapeRegex(search), 'i')
    filter.$or = [
      { name: pattern },
      { role: pattern },
      { specialities: pattern },
    ] as Filter<Doctor>[]
  }

  return filter
}

async function collection() {
  return (await getDb()).collection<Doctor>(collections.doctors)
}

async function select(query: DoctorQuery = {}): Promise<Doctor[]> {
  const cursor = (await collection()).find(toFilter(query)).sort({ order: 1, name: 1 })
  if (query.limit) cursor.limit(query.limit)
  return (await cursor.toArray()).map(stripId)
}

/** MongoDB implementation of `DoctorRepository`. */
export const mongoDoctorRepository: DoctorRepository = {
  async getDoctors(query) {
    return select(query)
  },

  async getDoctorBySlug(slug) {
    const doc = await (await collection()).findOne({ slug })
    return doc ? stripId(doc) : null
  },

  async getDoctorsBySlugs(slugs) {
    if (slugs.length === 0) return []

    const docs = await (await collection()).find({ slug: { $in: slugs } }).toArray()

    /**
     * Reordered to match the slug list.
     *
     * `$in` returns documents in storage order, not the order of the array.
     * A treatment page lists the lead proceduralist first, and that ordering
     * is editorial — the database must not reshuffle it.
     */
    const bySlug = new Map(docs.map((doc) => [doc.slug, stripId(doc)]))
    return slugs
      .map((slug) => bySlug.get(slug))
      .filter((doc): doc is Doctor => Boolean(doc))
  },

  async getFeaturedDoctors(limit = 3) {
    return select({ featured: true, limit })
  },

  async getAllDoctorSlugs() {
    const docs = await (await collection())
      .find({}, { projection: { slug: 1, _id: 0 } })
      .toArray()
    return docs.map((doc) => doc.slug)
  },
}
