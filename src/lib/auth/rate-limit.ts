import { headers } from 'next/headers'
import { collections, getDb } from '@/lib/db/mongo'

/**
 * RATE LIMITING
 * ----------------------------------------------------------------------------
 * SERVER ONLY.
 *
 * WHY THIS IS NOT OPTIONAL. The enquiry form and the webinar registration are
 * public endpoints that write to the database and make the server send email.
 * Without a limit, one script can:
 *
 *   - burn the mailbox's daily quota in a minute,
 *   - get the sending domain classified as a spam source, which is slow and
 *     painful to undo,
 *   - use the site to mail-bomb a third party, because the attacker chooses
 *     the recipient address,
 *   - and bury real enquiries under thousands of fake ones, which on this site
 *     means a patient's message goes unanswered.
 *
 * FIXED WINDOW, NOT A TOKEN BUCKET. A fixed window lets a caller spend a whole
 * window's budget at the boundary and again immediately after — in theory
 * double the rate for one instant. For "5 enquiries an hour" that is
 * irrelevant, and the fixed window is one atomic `$inc` where a bucket needs
 * read-modify-write and therefore a transaction. Simple and atomic beats
 * clever and racy.
 *
 * MongoDB rather than in-memory: a serverless deployment runs many isolated
 * instances, and an in-memory counter would give an attacker one full budget
 * per instance.
 */

export interface RateLimitRule {
  /** Requests permitted per window. */
  limit: number
  /** Window length in milliseconds. */
  windowMs: number
}

export const RATE_LIMITS = {
  /** Enquiries from one email address. */
  enquiryEmail: { limit: 5, windowMs: 60 * 60 * 1000 },
  /**
   * Enquiries from one network. Deliberately loose: a hospital, a hostel or a
   * shared mobile gateway puts many genuinely different people behind one
   * address, and a frightened family submitting twice must not be blocked.
   */
  enquiryIp: { limit: 20, windowMs: 60 * 60 * 1000 },
  /** Webinar registrations per email and per network. */
  registerEmail: { limit: 4, windowMs: 60 * 60 * 1000 },
  registerIp: { limit: 30, windowMs: 60 * 60 * 1000 },
  /** Admin password attempts from one network. This one is tight. */
  adminLoginIp: { limit: 10, windowMs: 15 * 60 * 1000 },
} as const satisfies Record<string, RateLimitRule>

let indexReady: Promise<void> | undefined

async function collection() {
  const db = await getDb()
  // Expired counters are removed by MongoDB itself, so nothing accumulates.
  indexReady ??= db
    .collection(collections.rateLimits)
    .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
    .then(() => undefined)
  await indexReady
  return db.collection(collections.rateLimits)
}

export interface RateLimitResult {
  allowed: boolean
  /** Requests left in this window; 0 when blocked. */
  remaining: number
  /** Seconds until the window resets. */
  retryAfter: number
}

/**
 * Counts one request against `key` and reports whether it is allowed.
 *
 * ATOMIC. The upsert-and-increment is a single operation, so two simultaneous
 * requests cannot both read "1 used" and both proceed. A read-then-write would
 * let a burst through exactly when a burst is the thing being defended
 * against.
 */
export async function consumeRateLimit(
  key: string,
  rule: RateLimitRule,
): Promise<RateLimitResult> {
  try {
    const limits = await collection()
    const now = Date.now()

    const current = await limits.findOne<{ count: number; expiresAt: Date }>({
      _id: key as never,
    })

    // No window, or the previous one has lapsed: start a fresh one.
    if (!current || current.expiresAt.getTime() <= now) {
      await limits.replaceOne(
        { _id: key as never },
        { count: 1, expiresAt: new Date(now + rule.windowMs) } as never,
        { upsert: true },
      )
      return { allowed: true, remaining: rule.limit - 1, retryAfter: 0 }
    }

    const updated = await limits.findOneAndUpdate(
      { _id: key as never },
      { $inc: { count: 1 } },
      { returnDocument: 'after' },
    )

    const count = (updated as { count?: number } | null)?.count ?? rule.limit + 1
    const retryAfter = Math.max(
      1,
      Math.ceil((current.expiresAt.getTime() - now) / 1000),
    )

    return {
      allowed: count <= rule.limit,
      remaining: Math.max(0, rule.limit - count),
      retryAfter,
    }
  } catch (error) {
    /**
     * FAIL OPEN, DELIBERATELY, and only on the public forms.
     *
     * If the limiter's own storage is unreachable, refusing every enquiry
     * would turn a minor database blip into a site where no patient can reach
     * the team. The downside is a window with no throttle; the alternative is
     * a silent wall in front of the one thing this site exists to do.
     *
     * The admin sign-in does NOT rely on this behaviour: its own storage
     * failure already fails the sign-in, because the session cannot be
     * written either.
     */
    console.error('[rate-limit] check failed, allowing request', error)
    return { allowed: true, remaining: 0, retryAfter: 0 }
  }
}

/**
 * The caller's IP address.
 *
 * `x-forwarded-for` is a client-controllable header, so this is a best-effort
 * signal, not an identity — which is exactly why the per-EMAIL limits above
 * are the tight ones and the per-IP limits are the loose backstop. Behind
 * Vercel or any sane proxy the leftmost entry is the real client.
 */
export async function callerIp(): Promise<string> {
  const store = await headers()

  const forwarded = store.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }

  return store.get('x-real-ip')?.trim() || 'unknown'
}

/** Formats `retryAfter` as something a person can read. */
export function describeRetry(seconds: number): string {
  if (seconds < 90) return 'in a minute'
  const minutes = Math.ceil(seconds / 60)
  if (minutes < 60) return `in ${minutes} minutes`
  const hours = Math.ceil(minutes / 60)
  return `in ${hours} ${hours === 1 ? 'hour' : 'hours'}`
}
