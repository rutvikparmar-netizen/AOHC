/**
 * Primitives shared across every domain model.
 *
 * These types describe OUR domain, not any backend's response shape. If
 * content later arrives from WordPress or a CMS it is mapped into these at the
 * repository boundary, so no component ever sees a foreign field name.
 */

export type Id = string

/** URL-safe identifier used for routing (`/treatments/tace`). */
export type Slug = string

/** ISO-8601 date, e.g. `2026-02-14`. Stored as a string so it stays
 *  serialisable across the server/client boundary without hydration drift. */
export type IsoDate = string

/** ISO-8601 instant in UTC, e.g. `2026-08-22T14:00:00.000Z`. */
export type IsoDateTime = string

/**
 * Every image carries its intrinsic dimensions and alt text so `next/image`
 * can reserve layout space and screen readers get a description.
 */
export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  /** Optional base64 LQIP for `placeholder="blur"`. */
  blurDataUrl?: string
}

/** A link used in navigation, footers and breadcrumbs. */
export interface NavLink {
  label: string
  href: string
  /** Small coloured tag rendered beside the label, e.g. "NEW". */
  tag?: string
  description?: string
}

export interface NavGroup {
  label: string
  href?: string
  links: NavLink[]
}

export interface Breadcrumb {
  label: string
  href?: string
}

/** Generic page-level SEO fields consumed by `lib/seo.ts`. */
export interface SeoMeta {
  title: string
  description: string
  canonicalPath?: string
  ogImage?: ImageAsset
  noIndex?: boolean
}

/** Envelope returned by any list query that supports pagination. */
export interface Paginated<T> {
  items: T[]
  page: number
  perPage: number
  total: number
  totalPages: number
}

/**
 * Marks placeholder content so it is trivially greppable and can be swapped
 * for clinically reviewed copy later.
 *
 * THIS IS NOT COSMETIC BOOKKEEPING ON A SITE LIKE THIS ONE. Treatment pages
 * describe cancer procedures to people deciding what to do next. Anything
 * still marked `demo` has not been checked by a clinician, and the UI says so
 * on the page rather than letting a visitor assume otherwise.
 */
export type DataSource = 'demo' | 'reviewed'

/** Who signed off on clinical copy, and when. */
export interface MedicalReview {
  /** Name of the reviewing clinician, e.g. 'Dr. Abhishek Bansal'. */
  reviewedBy: string
  reviewedAt: IsoDate
}
