import type { DataSource, Id, ImageAsset, IsoDate, Slug } from './common'

/**
 * A patient story.
 *
 * THE RULES AROUND THIS TYPE ARE NOT STYLE PREFERENCES.
 *
 * `consent` is required, and the UI will not render a story without it. A
 * named person's cancer treatment is sensitive medical information, and
 * publishing it without recorded permission is a straightforward harm to
 * them, whatever the marketing value.
 *
 * `outcomeDisclaimer` is also required. One person's result does not predict
 * anyone else's, and a story page without that sentence reads as an implied
 * promise to a frightened reader.
 */
export interface PatientStory {
  id: Id
  slug: Slug
  /** As the patient wishes to be known. May be a first name or initials. */
  patientName: string
  /** Omitted when the patient asked not to be identifiable. */
  age?: number
  location?: string

  /** Diagnosis in plain words, e.g. 'Stage 3 liver cancer (HCC)'. */
  diagnosis: string
  /** Treatment slugs received. */
  treatmentSlugs: Slug[]

  /** Pull quote for cards and carousels. */
  quote: string
  /** The full story, blank lines between paragraphs. */
  story: string

  photo?: ImageAsset
  treatedAt?: IsoDate
  publishedAt: IsoDate

  /** Recorded permission to publish. REQUIRED. */
  consent: {
    /** True only when written permission is on file. */
    obtained: boolean
    obtainedAt: IsoDate
    /** What they agreed to: full name, first name only, or anonymous. */
    identify: 'full-name' | 'first-name' | 'anonymous'
  }

  /** The "results vary" sentence shown with every story. REQUIRED. */
  outcomeDisclaimer: string

  featured?: boolean
  source: DataSource
}

export interface StoryQuery {
  treatmentSlug?: Slug
  diagnosis?: string
  featured?: boolean
  excludeSlugs?: Slug[]
  limit?: number
}
