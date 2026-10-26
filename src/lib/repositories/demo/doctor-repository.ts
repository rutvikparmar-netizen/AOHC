import { doctors } from '@/data/doctors'
import type { Doctor, DoctorQuery } from '@/types'
import type { DoctorRepository } from '../contracts'

const byOrder = (a: Doctor, b: Doctor) =>
  (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name)

function matches(doctor: Doctor, query: DoctorQuery): boolean {
  if (query.featured !== undefined && Boolean(doctor.featured) !== query.featured) {
    return false
  }
  if (query.treatmentSlug && !doctor.treatmentSlugs.includes(query.treatmentSlug)) {
    return false
  }
  if (query.speciality) {
    const needle = query.speciality.toLowerCase()
    const hit = doctor.specialities.some((item) => item.toLowerCase().includes(needle))
    if (!hit) return false
  }
  if (query.search) {
    const needle = query.search.trim().toLowerCase()
    const haystack = `${doctor.name} ${doctor.role} ${doctor.specialities.join(' ')}`
    if (!haystack.toLowerCase().includes(needle)) return false
  }
  return true
}

function select(query: DoctorQuery = {}): Doctor[] {
  const filtered = doctors.filter((doctor) => matches(doctor, query))
  const sorted = [...filtered].sort(byOrder)
  return query.limit ? sorted.slice(0, query.limit) : sorted
}

/** Demo implementation backed by `src/data/doctors.ts`. */
export const demoDoctorRepository: DoctorRepository = {
  async getDoctors(query) {
    return select(query)
  },

  async getDoctorBySlug(slug) {
    return doctors.find((doctor) => doctor.slug === slug) ?? null
  },

  async getDoctorsBySlugs(slugs) {
    /**
     * Ordered by the slug list, not by the data file.
     *
     * A treatment page lists its specialists in a deliberate order — the lead
     * proceduralist first. Returning them in data-file order would silently
     * reshuffle that.
     */
    return slugs
      .map((slug) => doctors.find((doctor) => doctor.slug === slug))
      .filter((doctor): doctor is Doctor => Boolean(doctor))
  },

  async getFeaturedDoctors(limit = 3) {
    return select({ featured: true, limit })
  },

  async getAllDoctorSlugs() {
    return doctors.map((doctor) => doctor.slug)
  },
}
