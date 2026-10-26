import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * SESSION AND REFERENCE PRIMITIVES
 * ----------------------------------------------------------------------------
 * SERVER ONLY. Never import from a `'use client'` component.
 *
 * There is no password hashing here, and that is not an omission: this site
 * has no customer accounts. The only credential is the single admin password,
 * which is compared against an environment variable rather than stored. If
 * patient logins are ever added, scrypt from `node:crypto` is the tool — no
 * native dependency needed.
 */

/** An unguessable identifier for a session. */
export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString('base64url')
}

/**
 * Session tokens are stored hashed.
 *
 * A leaked database dump then yields no usable cookies: the value a browser
 * presents cannot be reconstructed from what is stored.
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

/**
 * Constant-time secret comparison, safe for unequal lengths.
 *
 * Both sides are hashed first so `timingSafeEqual` always receives
 * equal-length buffers — it throws on a length mismatch, and catching that
 * would itself leak the secret's length through which branch ran.
 */
export function secretsMatch(provided: string, expected: string): boolean {
  const a = createHash('sha256').update(provided).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

/** Random bytes for a human-quotable reference. See `makeReference`. */
export function referenceBytes(): Uint8Array {
  return randomBytes(6)
}

/** Normalises an email for storage and lookup: trimmed and lowercased. */
export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase()
}
