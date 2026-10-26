/**
 * REPOSITORY CONTRACTS
 * ----------------------------------------------------------------------------
 * The seam between the UI and wherever data actually lives.
 *
 * The UI depends ONLY on these interfaces. On demo content they are satisfied
 * by `demo/` reading from `src/data/*`; against Atlas the `mongo/` folder
 * satisfies the exact same interfaces and the factory in `index.ts` flips over
 * — no component, page or type changes.
 *
 * Two rules keep this seam honest:
 *   1. Every method is `async` even though the demo data is synchronous. If it
 *      were sync, the UI would be written without `await` and would need
 *      rewriting the moment a real network call appears.
 *   2. Methods return OUR domain types (`Treatment`, `Doctor`, …) — never a
 *      backend's response shape. Mapping happens inside the implementation.
 */

import type {
  BlogPost,
  BlogQuery,
  Doctor,
  DoctorQuery,
  Paginated,
  PatientStory,
  Slug,
  StoryQuery,
  Treatment,
  TreatmentCategory,
  TreatmentQuery,
  Webinar,
  WebinarQuery,
} from '@/types'

export interface TreatmentRepository {
  getTreatments(query?: TreatmentQuery): Promise<Treatment[]>
  getTreatmentBySlug(slug: Slug): Promise<Treatment | null>
  getFeaturedTreatments(limit?: number): Promise<Treatment[]>
  getRelatedTreatments(slug: Slug, limit?: number): Promise<Treatment[]>
  /** Treatments performed by one specialist, for their profile page. */
  getTreatmentsByDoctor(doctorSlug: Slug): Promise<Treatment[]>
  /** Distinct categories actually present, for the index filter. */
  getTreatmentCategories(): Promise<TreatmentCategory[]>
  /** Every slug, for `generateStaticParams` and the sitemap. */
  getAllTreatmentSlugs(): Promise<Slug[]>
}

export interface DoctorRepository {
  getDoctors(query?: DoctorQuery): Promise<Doctor[]>
  getDoctorBySlug(slug: Slug): Promise<Doctor | null>
  /** Resolves a list of slugs, preserving the order given — used where a
   *  treatment or webinar names its specialists explicitly. */
  getDoctorsBySlugs(slugs: Slug[]): Promise<Doctor[]>
  getFeaturedDoctors(limit?: number): Promise<Doctor[]>
  getAllDoctorSlugs(): Promise<Slug[]>
}

export interface WebinarRepository {
  getWebinars(query?: WebinarQuery): Promise<Webinar[]>
  getWebinarBySlug(slug: Slug): Promise<Webinar | null>
  /** The soonest upcoming session, or null. Drives the site-wide banner. */
  getNextWebinar(): Promise<Webinar | null>
  getAllWebinarSlugs(): Promise<Slug[]>
}

export interface StoryRepository {
  getStories(query?: StoryQuery): Promise<PatientStory[]>
  getStoryBySlug(slug: Slug): Promise<PatientStory | null>
  getFeaturedStories(limit?: number): Promise<PatientStory[]>
  getAllStorySlugs(): Promise<Slug[]>
}

export interface BlogRepository {
  getPosts(query?: BlogQuery): Promise<BlogPost[]>
  getPostsPage(query?: BlogQuery): Promise<Paginated<BlogPost>>
  getPostBySlug(slug: Slug): Promise<BlogPost | null>
  getLatestPosts(limit?: number): Promise<BlogPost[]>
  getRelatedPosts(slug: Slug, limit?: number): Promise<BlogPost[]>
  getPostCategories(): Promise<string[]>
  getAllPostSlugs(): Promise<Slug[]>
}

/** The full data layer, assembled by the factory in `index.ts`. */
export interface DataSourceBundle {
  treatments: TreatmentRepository
  doctors: DoctorRepository
  webinars: WebinarRepository
  stories: StoryRepository
  blog: BlogRepository
}
