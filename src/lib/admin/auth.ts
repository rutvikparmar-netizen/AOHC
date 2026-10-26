import { NextResponse } from 'next/server'
import { secretsMatch } from '@/lib/auth/crypto'

/**
 * ADMIN API AUTHENTICATION
 * ----------------------------------------------------------------------------
 * SERVER TO SERVER ONLY. This is how an external dashboard reads this site's
 * enquiries without a human signing in twice.
 *
 * THE MODEL, AND WHY IT IS NOT A SHARED COOKIE. A browser sends a cookie only
 * to the domain that set it, so a dashboard on another domain can never reuse
 * this site's session. Instead the DASHBOARD'S OWN SERVER holds a long-lived
 * key and calls these endpoints on the admin's behalf.
 *
 * CALL IT FROM THE DASHBOARD'S SERVER, NEVER FROM ITS BROWSER. These endpoints
 * return patient names, phone numbers and what people have written about their
 * diagnosis. Putting the key in client-side code would publish it, and there
 * are deliberately NO CORS HEADERS here so a browser on another origin cannot
 * call them even with the key.
 *
 * DISABLED UNTIL CONFIGURED. With no `ADMIN_API_KEY` set, every endpoint
 * refuses. An admin API that is open because somebody forgot a variable is
 * worse than no admin API.
 */

/** Minimum key length. A short key is a guessable key. */
const MIN_KEY_LENGTH = 32

export function isAdminApiConfigured(): boolean {
  const key = process.env.ADMIN_API_KEY
  return Boolean(key && key.length >= MIN_KEY_LENGTH)
}

export interface AdminAuthFailure {
  response: NextResponse
}

/**
 * Verifies the caller, returning a response to send back on failure.
 *
 * Usage in a route handler:
 *
 *     const denied = requireAdmin(request)
 *     if (denied) return denied.response
 *
 * Every failure answers 401 with the same body and no detail about WHY. A
 * distinct "malformed header" versus "wrong key" reply tells an attacker
 * whether the format was right, which is free information.
 */
export function requireAdmin(request: Request): AdminAuthFailure | null {
  const deny = (): AdminAuthFailure => ({
    response: NextResponse.json(
      { error: 'unauthorized' },
      {
        status: 401,
        headers: {
          // Signals the scheme without hinting at the key.
          'www-authenticate': 'Bearer realm="admin"',
          'cache-control': 'no-store',
        },
      },
    ),
  })

  const expected = process.env.ADMIN_API_KEY
  if (!expected || expected.length < MIN_KEY_LENGTH) {
    console.error(
      '[admin-api] refused: ADMIN_API_KEY is not set, or is shorter than 32 characters.',
    )
    return deny()
  }

  const header = request.headers.get('authorization')
  if (!header?.startsWith('Bearer ')) return deny()

  const provided = header.slice('Bearer '.length).trim()
  if (!provided) return deny()

  return secretsMatch(provided, expected) ? null : deny()
}

/**
 * JSON response with caching disabled.
 *
 * Every one of these payloads is patient data. `no-store, private` keeps it
 * out of any CDN, proxy or browser cache between this server and the caller.
 */
export function adminJson(data: unknown, status = 200): NextResponse {
  return NextResponse.json(data, {
    status,
    headers: { 'cache-control': 'no-store, private' },
  })
}

/** Clamps a `?limit=` parameter into a sane range. */
export function readLimit(url: URL, fallback = 50, max = 200): number {
  const raw = Number(url.searchParams.get('limit'))
  if (!Number.isFinite(raw) || raw <= 0) return fallback
  return Math.min(Math.floor(raw), max)
}
