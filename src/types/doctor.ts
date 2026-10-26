import type { DataSource, Id, ImageAsset, Slug } from './common'

/** A specialist on the team. */
export interface Doctor {
  id: Id
  slug: Slug
  /** Full name WITHOUT an honorific — the UI adds `prefix`. */
  name: string
  /** 'Dr.', 'Prof.', or '' for non-clinical team members. */
  prefix: string
  /** Primary title, e.g. 'Interventional Radiologist'. */
  role: string
  /** Where they practise, e.g. 'New Delhi'. */
  location?: string

  photo: ImageAsset
  /** One sentence for cards. */
  summary: string
  /** Long-form biography, blank lines between paragraphs. */
  bio: string

  /** Post-nominals, e.g. ['MBBS', 'MD Radiodiagnosis', 'FVIR']. */
  qualifications: string[]
  specialities: string[]
  /** Slugs of treatments they perform. */
  treatmentSlugs: Slug[]
  /** Whole years. Omitted rather than estimated. */
  experienceYears?: number
  languages?: string[]

  /** Registration number with the relevant medical council. Shown on the
   *  profile so a visitor can verify the person independently. */
  registration?: string

  featured?: boolean
  order?: number

  source: DataSource
}

export interface DoctorQuery {
  speciality?: string
  treatmentSlug?: Slug
  search?: string
  featured?: boolean
  limit?: number
}
