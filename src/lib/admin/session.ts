import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { collections, getDb } from '@/lib/db/mongo'
import { generateToken, hashToken, secretsMatch } from '@/lib/auth/crypto'

/**
 * ADMIN CONSOLE SESSIONS
 * ----------------------------------------------------------------------------
 * SERVER ONLY.
 *
 * The console has exactly one identity, configured in the environment:
 *
 *   ADMIN_EMAIL     the login name
 *   ADMIN_PASSWORD  the password
 *
 * With either unset the console refuses every sign-in, so a deploy that forgot
 * the variables is locked, not open.
 *
 * SINGLE FACTOR. The password is the only thing standing between the internet
 * and every patient enquiry in this database, so make it a long, unique one
 * and keep it in a password manager. The per-network rate limit on the sign-in
 * action is what makes guessing impractical.
 *
 * STORAGE. A session is the SHA-256 of a random cookie token, never the token
 * itself, and expires through a TTL index. The cookie is httpOnly,
 * `sameSite: strict` and scoped to `/admin`, so it is never sent to a public
 * page at all.
 */

const SESSION_COOKIE = 'aohc_admin_session'
const COOKIE_PATH = '/admin'

/**
 * Twelve hours.
 *
 * Shorter than a typical web session on purpose: this console shows patient
 * records, and a laptop left open in a clinic should not still be signed in
 * the next morning.
 */
export const ADMIN_SESSION_TTL_MS = 12 * 60 * 60 * 1000

/** Minimum password length accepted from the environment. */
const MIN_PASSWORD_LENGTH = 10

interface SessionDoc {
  tokenHash: string
  email: string
  createdAt: Date
  expiresAt: Date
}

export interface AdminIdentity {
  email: string
}

let indexesReady: Promise<void> | undefined

async function sessions() {
  const db = await getDb()
  indexesReady ??= Promise.all([
    db
      .collection(collections.adminSessions)
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    db
      .collection(collections.adminSessions)
      .createIndex({ tokenHash: 1 }, { unique: true }),
  ]).then(() => undefined)
  await indexesReady
  return db.collection<SessionDoc>(collections.adminSessions)
}

/** The configured admin email, lowercased, or '' when unset. */
export function adminEmail(): string {
  return (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase()
}

export function isAdminConfigured(): boolean {
  return Boolean(
    adminEmail() && (process.env.ADMIN_PASSWORD ?? '').length >= MIN_PASSWORD_LENGTH,
  )
}

/**
 * Checks the credentials.
 *
 * Both fields are always compared, so a wrong email and a wrong password take
 * the same time and give the same answer — the sign-in page must not become an
 * oracle for whether an address is the admin's.
 */
export function verifyAdminCredentials(email: string, password: string): boolean {
  if (!isAdminConfigured()) return false
  const emailOk = secretsMatch(email.trim().toLowerCase(), adminEmail())
  const passwordOk = secretsMatch(password, process.env.ADMIN_PASSWORD ?? '')
  return emailOk && passwordOk
}

/** Issues a console session and sets the cookie. Call only after verifying. */
export async function startAdminSession(): Promise<void> {
  const token = generateToken(32)

  await (await sessions()).insertOne({
    tokenHash: hashToken(token),
    email: adminEmail(),
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + ADMIN_SESSION_TTL_MS),
  })

  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    // Unreadable from JavaScript, so an XSS cannot exfiltrate the session.
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: COOKIE_PATH,
    maxAge: Math.floor(ADMIN_SESSION_TTL_MS / 1000),
  })
}

/** The signed-in admin, or null. Never throws. */
export async function getAdminSession(): Promise<AdminIdentity | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    const doc = await (await sessions()).findOne({ tokenHash: hashToken(token) })
    if (!doc || doc.expiresAt.getTime() <= Date.now()) return null
    // A session minted for a previous ADMIN_EMAIL dies when the variable changes.
    if (doc.email !== adminEmail()) return null
    return { email: doc.email }
  } catch (error) {
    console.error('[admin] session lookup failed', error)
    return null
  }
}

/**
 * For pages and layouts: the admin, or a redirect to the sign-in page.
 *
 * EVERY CONSOLE PAGE CALLS THIS ITSELF rather than trusting the layout, and
 * every server action calls `getAdminSession()`. A layout check alone is not a
 * boundary: server actions are plain POST endpoints that do not run the
 * layout, so an action protected only by its parent layout is not protected.
 */
export async function requireAdminSession(): Promise<AdminIdentity> {
  const admin = await getAdminSession()
  if (!admin) redirect('/admin/login')
  return admin
}

export async function endAdminSession(): Promise<void> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (token) {
    await (await sessions())
      .deleteOne({ tokenHash: hashToken(token) })
      .catch((error) => {
        console.error('[admin] session delete failed', error)
      })
  }
  store.delete({ name: SESSION_COOKIE, path: COOKIE_PATH })
}
