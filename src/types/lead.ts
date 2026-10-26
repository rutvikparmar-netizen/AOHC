import type { Id, IsoDateTime, Slug } from './common'

/**
 * PATIENT ENQUIRIES AND WEBINAR REGISTRATIONS
 * ----------------------------------------------------------------------------
 * The most sensitive data this application holds. A single record can contain
 * someone's name, phone number, city, diagnosis and what they have written
 * about their own prognosis.
 *
 * Consequences that follow, and are enforced elsewhere in the code:
 *   - These types never cross into a `'use client'` module. Forms submit
 *     through server actions and receive back only a result message.
 *   - `/admin` sends `Cache-Control: no-store, private` and
 *     `X-Robots-Tag: noindex` (see `next.config.ts`).
 *   - The admin API returns these only to a bearer token, server to server,
 *     with no CORS headers.
 */

/** Where the enquiry came from, for follow-up context. */
export type LeadSource =
  | 'contact-page'
  | 'treatment-page'
  | 'doctor-page'
  | 'webinar-page'
  | 'story-page'
  | 'home-hero'

export type LeadStatus = 'new' | 'contacted' | 'consulting' | 'closed'

/** Who is actually writing. Changes how the team should respond. */
export type EnquiryRelation = 'self' | 'family' | 'caregiver' | 'doctor' | 'other'

export interface Enquiry {
  id: Id
  /** Short human-quotable reference, e.g. `AOHC-7F3K2P`. Given to the person
   *  on the thank-you screen so a follow-up call has something to cite. */
  reference: string

  name: string
  email: string
  phone: string
  /** Free text — 'New Delhi', 'Dubai'. Not validated against a list. */
  city?: string
  state?: string
  country?: string
  /** "How did you hear about us?" — a marketing attribution field. */
  heardFrom?: string

  /**
   * Kept optional. The form no longer asks who is writing or what the
   * diagnosis is — the field list was cut back on request — but existing
   * stored enquiries still carry both, so the type must still describe them.
   */
  relation?: EnquiryRelation
  /** What they say the diagnosis is. Their words, never normalised. */
  diagnosis?: string
  /** The treatment page they were on, when they came from one. */
  treatmentSlug?: Slug
  message: string

  /** Explicit tick on the form. Without it the submission is refused. */
  consentToContact: boolean

  source: LeadSource
  status: LeadStatus
  createdAt: IsoDateTime
  /** Set by the console when someone picks the enquiry up. */
  handledAt?: IsoDateTime
  /** Internal notes. Never shown to the patient. */
  notes?: string
}

export interface WebinarRegistration {
  id: Id
  reference: string
  webinarSlug: Slug

  name: string
  email: string
  phone: string
  city?: string
  country?: string

  /** Optional question submitted ahead of the session. */
  question?: string
  relation: EnquiryRelation

  consentToContact: boolean
  createdAt: IsoDateTime
  /** Whether the confirmation email actually went out. Stored because a
   *  registration with no email sent needs chasing, and guessing which ones
   *  those were after the fact is impossible. */
  confirmationSent: boolean
  attended?: boolean
}

export interface LeadQuery {
  status?: LeadStatus
  source?: LeadSource
  treatmentSlug?: Slug
  search?: string
  page?: number
  perPage?: number
  limit?: number
}

/** Counts behind the console dashboard. */
export interface LeadMetrics
  extends Record<'total' | 'new' | 'contacted' | 'consulting' | 'closed', number> {
  /** Enquiries created in the last 7 days. */
  lastSevenDays: number
  registrations: number
}
