import { treatments } from '@/data/treatments'
import type { Treatment, TreatmentCategory, TreatmentQuery } from '@/types'
import type { TreatmentRepository } from '../contracts'

const byOrder = (a: Treatment, b: Treatment) =>
  (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name)

function matches(treatment: Treatment, query: TreatmentQuery): boolean {
  if (query.category && treatment.category !== query.category) return false
  if (query.featured !== undefined && Boolean(treatment.featured) !== query.featured) {
    return false
  }
  if (query.excludeSlugs?.includes(treatment.slug)) return false

  if (query.treats) {
    const needle = query.treats.toLowerCase()
    const hit = treatment.treats.some((item) => item.toLowerCase().includes(needle))
    if (!hit) return false
  }

  if (query.search) {
    const needle = query.search.trim().toLowerCase()
    const haystack = `${treatment.name} ${treatment.fullName} ${treatment.summary} ${treatment.treats.join(' ')}`
    if (!haystack.toLowerCase().includes(needle)) return false
  }

  return true
}

function select(query: TreatmentQuery = {}): Treatment[] {
  const filtered = treatments.filter((treatment) => matches(treatment, query))
  const sorted = [...filtered].sort(byOrder)
  return query.limit ? sorted.slice(0, query.limit) : sorted
}

/** Demo implementation backed by `src/data/treatments.ts`. */
export const demoTreatmentRepository: TreatmentRepository = {
  async getTreatments(query) {
    return select(query)
  },

  async getTreatmentBySlug(slug) {
    return treatments.find((treatment) => treatment.slug === slug) ?? null
  },

  async getFeaturedTreatments(limit = 3) {
    return select({ featured: true, limit })
  },

  async getRelatedTreatments(slug, limit = 3) {
    const treatment = treatments.find((candidate) => candidate.slug === slug)
    if (!treatment) return []

    // An explicit `relatedSlugs` list wins over a category match: it is an
    // editorial decision, and guessing from the category would quietly
    // override it.
    if (treatment.relatedSlugs?.length) {
      const picked = treatment.relatedSlugs
        .map((related) => treatments.find((candidate) => candidate.slug === related))
        .filter((candidate): candidate is Treatment => Boolean(candidate))
      if (picked.length) return picked.slice(0, limit)
    }

    return select({ category: treatment.category, excludeSlugs: [slug], limit })
  },

  async getTreatmentsByDoctor(doctorSlug) {
    return select().filter((treatment) =>
      treatment.specialistSlugs.includes(doctorSlug),
    )
  },

  async getTreatmentCategories() {
    const present = new Set<TreatmentCategory>(
      treatments.map((treatment) => treatment.category),
    )
    return [...present].sort()
  },

  async getAllTreatmentSlugs() {
    return treatments.map((treatment) => treatment.slug)
  },
}
