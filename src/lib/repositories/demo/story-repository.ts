import { patientStories } from '@/data/stories'
import type { PatientStory, StoryQuery } from '@/types'
import type { StoryRepository } from '../contracts'

const byNewest = (a: PatientStory, b: PatientStory) =>
  b.publishedAt.localeCompare(a.publishedAt)

/**
 * THE CONSENT GATE.
 *
 * Every read goes through this, in both implementations, so a story without
 * recorded permission cannot reach a page by any route — not through a
 * related-content block, not through the sitemap, not through a direct URL.
 *
 * Filtering here rather than in each page is the whole point: a new page added
 * later inherits the rule instead of having to remember it.
 */
function publishable(story: PatientStory): boolean {
  return story.consent.obtained
}

function matches(story: PatientStory, query: StoryQuery): boolean {
  if (query.featured !== undefined && Boolean(story.featured) !== query.featured) {
    return false
  }
  if (query.treatmentSlug && !story.treatmentSlugs.includes(query.treatmentSlug)) {
    return false
  }
  if (query.diagnosis) {
    const needle = query.diagnosis.toLowerCase()
    if (!story.diagnosis.toLowerCase().includes(needle)) return false
  }
  if (query.excludeSlugs?.includes(story.slug)) return false
  return true
}

function select(query: StoryQuery = {}): PatientStory[] {
  const filtered = patientStories
    .filter(publishable)
    .filter((story) => matches(story, query))
  const sorted = [...filtered].sort(byNewest)
  return query.limit ? sorted.slice(0, query.limit) : sorted
}

/** Demo implementation backed by `src/data/stories.ts`. */
export const demoStoryRepository: StoryRepository = {
  async getStories(query) {
    return select(query)
  },

  async getStoryBySlug(slug) {
    const story = patientStories.find((candidate) => candidate.slug === slug)
    // A story whose consent was withdrawn returns null, so the page 404s
    // rather than rendering it.
    return story && publishable(story) ? story : null
  },

  async getFeaturedStories(limit = 3) {
    return select({ featured: true, limit })
  },

  async getAllStorySlugs() {
    return patientStories.filter(publishable).map((story) => story.slug)
  },
}
