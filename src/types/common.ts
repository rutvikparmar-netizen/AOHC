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

/**
 * A nav link that may have children of its own.
 *
 * Only the expertise menu goes three deep — "Centre of Excellence" holds
 * "Hematological (Blood) Malignancies", which holds "Leukemia". Nothing
 * else on the site nests past two, so this stays out of `NavLink`.
 */
export interface MegaNavLink extends NavLink {
  links?: NavLink[]
}

/** One column of a full-width menu panel. */
export interface MegaNavColumn {
  label: string
  href?: string
  links: MegaNavLink[]
  /**
   * The `label` of the column this one sits beneath, instead of taking a
   * column of its own.
   *
   * The expertise panel has more columns than it is wide, and the extras
   * are stacked under a named neighbour rather than wrapped to a second
   * grid row — a row is as tall as its tallest cell, which left the short
   * columns with a large gap above whatever followed them.
   *
   * ⚠️  IT NAMES ITS PARENT RATHER THAN RELYING ON ARRAY ORDER. The first
   * version worked out placement by index, which made the order of the
   * array load-bearing in a way nothing could check: moving two entries
   * put each under the wrong heading and still compiled. A column whose
   * `stackUnder` matches nothing falls back to a column of its own, so a
   * typo here costs the layout rather than the link.
   */
  stackUnder?: string
}

export interface NavGroup {
  label: string
  href?: string
  links: NavLink[]
  /**
   * When present the header renders a full-width panel of columns instead
   * of the narrow dropdown, and the mobile drawer renders the columns as
   * sections rather than a flat list. `links` should stay empty on a group
   * that has this.
   */
  mega?: MegaNavColumn[]
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
