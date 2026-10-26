import { collections, getDb } from '@/lib/db/mongo'
import { referenceBytes } from '@/lib/auth/crypto'
import { makeReference } from '@/lib/utils'
import type {
  Enquiry,
  LeadMetrics,
  LeadQuery,
  LeadStatus,
  Paginated,
  WebinarRegistration,
} from '@/types'

/**
 * ENQUIRY AND REGISTRATION STORAGE
 * ----------------------------------------------------------------------------
 * SERVER ONLY. This module is the only writer of patient data in the
 * application, and the only reader outside the admin console.
 *
 * THERE IS NO DEMO IMPLEMENTATION OF THIS, UNLIKE THE CONTENT REPOSITORIES,
 * AND THAT IS THE POINT. A demo enquiry store would have to either drop
 * submissions on the floor or keep them in memory until the next deploy. Both
 * end the same way: someone with a new diagnosis writes to the team, sees a
 * thank-you screen, and is never contacted.
 *
 * So the forms check `isDatabaseConfigured()` FIRST and, with no database,
 * tell the visitor plainly to phone or email instead. An honest dead end beats
 * a convincing one.
 */

const DEFAULT_PER_PAGE = 25

let indexesReady: Promise<void> | undefined

async function ensureIndexes(): Promise<void> {
  const db = await getDb()

  indexesReady ??= Promise.all([
    // The console lists newest first; this is the index behind that sort.
    db.collection(collections.enquiries).createIndex({ createdAt: -1 }),
    db.collection(collections.enquiries).createIndex({ status: 1, createdAt: -1 }),
    db.collection(collections.enquiries).createIndex({ reference: 1 }, { unique: true }),
    db.collection(collections.registrations).createIndex({ createdAt: -1 }),
    /**
     * One registration per email per webinar.
     *
     * A unique compound index rather than a check-then-insert: two taps on a
     * slow connection fire two submissions, and the duplicate would otherwise
     * land between the read and the write. The action catches the duplicate
     * key error and treats it as success, because from the registrant's point
     * of view it is — they are registered.
     */
    db
      .collection(collections.registrations)
      .createIndex({ webinarSlug: 1, email: 1 }, { unique: true }),
  ]).then(() => undefined)

  await indexesReady
}

async function enquiryCollection() {
  await ensureIndexes()
  return (await getDb()).collection<Enquiry>(collections.enquiries)
}

async function registrationCollection() {
  await ensureIndexes()
  return (await getDb()).collection<WebinarRegistration>(collections.registrations)
}

/** A fresh, unique-enough reference. */
function nextReference(): string {
  return makeReference(referenceBytes())
}

/* ==========================================================================
   WRITES
   ========================================================================== */

export type NewEnquiry = Omit<Enquiry, 'id' | 'reference' | 'status' | 'createdAt'>

/** Stores an enquiry and returns its reference for the thank-you screen. */
export async function createEnquiry(input: NewEnquiry): Promise<Enquiry> {
  const enquiries = await enquiryCollection()

  const record: Enquiry = {
    ...input,
    id: crypto.randomUUID(),
    reference: nextReference(),
    status: 'new',
    createdAt: new Date().toISOString(),
  }

  await enquiries.insertOne({ _id: record.id as never, ...record })
  return record
}

export type NewRegistration = Omit<
  WebinarRegistration,
  'id' | 'reference' | 'createdAt' | 'confirmationSent'
> & { confirmationSent?: boolean }

export interface RegistrationResult {
  registration: WebinarRegistration
  /** True when this email was already registered for this webinar. */
  duplicate: boolean
}

/** Registers someone for a webinar. Idempotent per (webinar, email). */
export async function createRegistration(
  input: NewRegistration,
): Promise<RegistrationResult> {
  const registrations = await registrationCollection()

  const record: WebinarRegistration = {
    ...input,
    confirmationSent: input.confirmationSent ?? false,
    id: crypto.randomUUID(),
    reference: nextReference(),
    createdAt: new Date().toISOString(),
  }

  try {
    await registrations.insertOne({ _id: record.id as never, ...record })
    return { registration: record, duplicate: false }
  } catch (error) {
    // Duplicate key: already registered. Return the existing record so the
    // confirmation screen can quote the original reference.
    if (isDuplicateKeyError(error)) {
      const existing = await registrations.findOne({
        webinarSlug: input.webinarSlug,
        email: input.email,
      })
      if (existing) {
        const { _id, ...rest } = existing as WebinarRegistration & { _id?: unknown }
        void _id
        return { registration: rest as WebinarRegistration, duplicate: true }
      }
    }
    throw error
  }
}

function isDuplicateKeyError(error: unknown): boolean {
  return Boolean(error && typeof error === 'object' && 'code' in error && error.code === 11000)
}

/** Records whether the confirmation email actually went out. */
export async function markConfirmationSent(id: string, sent: boolean): Promise<void> {
  const registrations = await registrationCollection()
  await registrations.updateOne({ id }, { $set: { confirmationSent: sent } })
}

/** Console action: move an enquiry along the pipeline. */
export async function setEnquiryStatus(id: string, status: LeadStatus): Promise<void> {
  const enquiries = await enquiryCollection()
  await enquiries.updateOne(
    { id },
    {
      $set: {
        status,
        // Stamped the first time someone picks it up, so "how long did this
        // patient wait for a reply" is answerable later.
        ...(status !== 'new' ? { handledAt: new Date().toISOString() } : {}),
      },
    },
  )
}

/** Console action: save an internal note. */
export async function setEnquiryNotes(id: string, notes: string): Promise<void> {
  const enquiries = await enquiryCollection()
  await enquiries.updateOne({ id }, { $set: { notes } })
}

/* ==========================================================================
   READS — admin console and admin API only
   ========================================================================== */

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function getEnquiriesPage(
  query: LeadQuery = {},
): Promise<Paginated<Enquiry>> {
  const enquiries = await enquiryCollection()

  const filter: Record<string, unknown> = {}
  if (query.status) filter.status = query.status
  if (query.source) filter.source = query.source
  if (query.treatmentSlug) filter.treatmentSlug = query.treatmentSlug

  const search = query.search?.trim()
  if (search) {
    const pattern = new RegExp(escapeRegex(search), 'i')
    filter.$or = [
      { name: pattern },
      { email: pattern },
      { phone: pattern },
      { reference: pattern },
    ]
  }

  const perPage = query.perPage ?? DEFAULT_PER_PAGE
  const total = await enquiries.countDocuments(filter)
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const page = Math.min(Math.max(1, query.page ?? 1), totalPages)

  const items = await enquiries
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .toArray()

  return {
    items: items.map((doc) => {
      const { _id, ...rest } = doc as Enquiry & { _id?: unknown }
      void _id
      return rest as Enquiry
    }),
    page,
    perPage,
    total,
    totalPages,
  }
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const enquiries = await enquiryCollection()
  const doc = await enquiries.findOne({ id })
  if (!doc) return null
  const { _id, ...rest } = doc as Enquiry & { _id?: unknown }
  void _id
  return rest as Enquiry
}

export async function getRegistrations(
  webinarSlug?: string,
  limit = 200,
): Promise<WebinarRegistration[]> {
  const registrations = await registrationCollection()
  const docs = await registrations
    .find(webinarSlug ? { webinarSlug } : {})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()

  return docs.map((doc) => {
    const { _id, ...rest } = doc as WebinarRegistration & { _id?: unknown }
    void _id
    return rest as WebinarRegistration
  })
}

/** Counts behind the console dashboard. */
export async function getLeadMetrics(): Promise<LeadMetrics> {
  const enquiries = await enquiryCollection()
  const registrations = await registrationCollection()

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  /**
   * One aggregation for the status breakdown rather than five
   * `countDocuments` round trips — the dashboard renders on every page view.
   */
  const [byStatus, total, lastSevenDays, registrationCount] = await Promise.all([
    enquiries
      .aggregate<{ _id: LeadStatus; count: number }>([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ])
      .toArray(),
    enquiries.countDocuments({}),
    enquiries.countDocuments({ createdAt: { $gte: weekAgo } }),
    registrations.countDocuments({}),
  ])

  const counts = new Map(byStatus.map((row) => [row._id, row.count]))

  return {
    total,
    new: counts.get('new') ?? 0,
    contacted: counts.get('contacted') ?? 0,
    consulting: counts.get('consulting') ?? 0,
    closed: counts.get('closed') ?? 0,
    lastSevenDays,
    registrations: registrationCount,
  }
}
