import { createHmac, randomInt, timingSafeEqual } from 'node:crypto'

/**
 * ARITHMETIC CAPTCHA
 * ----------------------------------------------------------------------------
 * SERVER ONLY.
 *
 * A sum shown to the visitor, with the expected answer never sent to the
 * browser. The form carries an opaque token instead; the action recomputes
 * the HMAC from the submitted answer and compares.
 *
 * WHY NOT PUT THE ANSWER IN A HIDDEN FIELD: anyone can read it. Why not keep
 * it in a session: it would need storage and a lifetime, and this does not.
 * The token IS the state, and it is unforgeable without the secret.
 *
 * WHAT THIS IS AND IS NOT. It stops naive form-spam bots that POST without
 * rendering the page. It will not stop a determined scripted attack, and it
 * is not the main defence — the per-email and per-IP rate limits in
 * `lib/auth/rate-limit.ts` are. Treat it as one layer, not the wall.
 *
 * The challenge deliberately uses single digits and addition only. This form
 * is filled in by people who are unwell, often elderly, often not first-
 * language English speakers. A captcha that turns away a real patient has
 * done more damage than the spam it prevented.
 */

/** Falls back to a build constant so a missing env var cannot crash a form. */
function secret(): string {
  return process.env.CAPTCHA_SECRET ?? 'aohc-captcha-fallback-secret'
}

function sign(answer: number): string {
  return createHmac('sha256', secret()).update(String(answer)).digest('hex')
}

export interface Captcha {
  a: number
  b: number
  /** HMAC of the expected answer. Goes into a hidden field. */
  token: string
}

/** Builds a fresh challenge. Call per render, never cache. */
export function makeCaptcha(): Captcha {
  const a = randomInt(1, 10)
  const b = randomInt(1, 10)
  return { a, b, token: sign(a + b) }
}

/** True when `answer` matches the token. Never throws. */
export function verifyCaptcha(answer: string, token: string): boolean {
  const parsed = Number(answer.trim())
  if (!Number.isInteger(parsed)) return false

  try {
    const expected = Buffer.from(sign(parsed), 'hex')
    const provided = Buffer.from(token, 'hex')
    // `timingSafeEqual` throws on a length mismatch, so guard first.
    if (expected.length !== provided.length) return false
    return timingSafeEqual(expected, provided)
  } catch {
    return false
  }
}
