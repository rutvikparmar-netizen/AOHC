import type {
  DataSource,
  Id,
  ImageAsset,
  MedicalReview,
  Slug,
} from './common'

/**
 * A treatment or procedure offered — TACE, TARE, RFA, microwave ablation,
 * targeted therapy, and so on.
 */

/** Broad grouping used by the treatments index and the nav. */
export type TreatmentCategory =
  | 'interventional-oncology'
  | 'systemic-therapy'
  | 'radiation-therapy'
  | 'supportive-care'
  | 'diagnostics'

/** One step in the "what happens" sequence on a treatment page. */
export interface TreatmentStep {
  title: string
  description: string
  /** Rough duration of this step, in plain words: '30–90 minutes'. */
  duration?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Treatment {
  id: Id
  slug: Slug
  /** Short public name, e.g. 'TACE'. */
  name: string
  /** Expanded name, e.g. 'Transarterial Chemoembolization'. */
  fullName: string
  category: TreatmentCategory

  /** One sentence, used on cards and in meta descriptions. */
  summary: string
  /** Long-form body. Markdown-ish plain text; the renderer is swapped once
   *  real CMS content arrives, without touching the model. */
  content: string

  image: ImageAsset

  /** Cancers this is used for, as plain labels: 'Liver cancer (HCC)'. */
  treats: string[]
  /** Who it may suit. Phrased as considerations, never as a promise. */
  candidacy: string[]
  benefits: string[]
  /**
   * Risks and side effects.
   *
   * REQUIRED, and the UI renders it with the same weight as the benefits.
   * A page that lists only upsides is advertising, not patient information.
   */
  risks: string[]

  steps: TreatmentStep[]
  faqs: FaqItem[]

  /** Typical inpatient stay or recovery window, in plain words. */
  recovery?: string
  /** Slugs of specialists who perform it — resolved by the doctor repository. */
  specialistSlugs: Slug[]
  /** Related treatments, by slug. */
  relatedSlugs?: Slug[]

  featured?: boolean
  /** Ordering on the index page; lower sorts first. */
  order?: number

  source: DataSource
  review?: MedicalReview
}

export interface TreatmentQuery {
  category?: TreatmentCategory
  /** Matches against `treats`, e.g. all treatments for liver cancer. */
  treats?: string
  search?: string
  featured?: boolean
  excludeSlugs?: Slug[]
  limit?: number
}
