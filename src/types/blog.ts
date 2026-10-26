import type {
  DataSource,
  Id,
  ImageAsset,
  IsoDate,
  MedicalReview,
  Slug,
} from './common'

export interface Author {
  name: string
  role?: string
  avatar?: ImageAsset
  /** Links the byline to a specialist profile when the author is on the team. */
  doctorSlug?: Slug
}

export interface BlogPost {
  id: Id
  slug: Slug
  title: string
  excerpt: string
  /** Long-form body. Markdown-ish plain text; the renderer is swapped once
   *  real CMS content arrives, without touching the model. */
  content: string
  image: ImageAsset
  /** Editorial category, e.g. 'Treatment explained'. */
  category: string
  author: Author
  publishedAt: IsoDate
  /** Whole minutes, precomputed so cards do not run text analysis at render. */
  readingTime: number

  tags?: string[]
  featured?: boolean

  /** Related treatment, when the article explains one. Drives the inline
   *  "read about this treatment" link and the related-content block. */
  treatmentSlug?: Slug

  source: DataSource
  /** Who checked the clinical content. Shown in the byline when present, and
   *  its ABSENCE is shown too — see `MedicalReview`. */
  review?: MedicalReview
}

export interface BlogQuery {
  category?: string
  tag?: string
  search?: string
  page?: number
  perPage?: number
  excludeSlugs?: Slug[]
  limit?: number
}
