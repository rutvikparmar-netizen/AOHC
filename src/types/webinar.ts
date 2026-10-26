import type {
  DataSource,
  Id,
  ImageAsset,
  IsoDateTime,
  Slug,
} from './common'

/**
 * A live or recorded patient-education webinar.
 *
 * TIMES ARE STORED IN UTC, ALWAYS. The audience is largely in India but not
 * only — storing a local time and a label ('7:30 pm IST') means every
 * calculation downstream has to guess an offset, and the 'Add to calendar'
 * link gets it wrong for anyone travelling. One instant, formatted per
 * viewer, is the only version that cannot drift.
 */
export interface Webinar {
  id: Id
  slug: Slug
  title: string
  /** Topic line shown under the title, e.g. 'Liver cancer'. */
  topic: string
  summary: string
  /** Long-form description, blank lines between paragraphs. */
  description: string

  image: ImageAsset

  startsAt: IsoDateTime
  endsAt: IsoDateTime

  /** Speaker slugs, resolved against the doctor repository. */
  speakerSlugs: Slug[]
  /** Names of speakers who are not on the team and have no profile page. */
  guestSpeakers?: string[]

  /** What someone will take away. Rendered as a checklist. */
  takeaways: string[]

  /**
   * Where it happens, for the calendar entry. The JOIN LINK IS NOT HERE: it
   * lives in `WEBINAR_JOIN_URL` and is sent by email to registrants only.
   * A Zoom link on a public page is an open door.
   */
  platform: string

  /** Set once the recording is public. Its presence is what makes a past
   *  webinar useful rather than an expired page. */
  recordingUrl?: string

  /** Closed early, or full. Registration is refused with an explanation. */
  registrationClosed?: boolean

  featured?: boolean
  source: DataSource
}

export interface WebinarQuery {
  /** `upcoming` compares `startsAt` against now; `past` is everything else. */
  when?: 'upcoming' | 'past' | 'all'
  topic?: string
  excludeSlugs?: Slug[]
  limit?: number
}
