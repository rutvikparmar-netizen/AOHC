/**
 * Joins class names, dropping anything falsy.
 *
 * Hand-written rather than pulling in `clsx` and `tailwind-merge`: this
 * project has no conditional-variant components complex enough to need
 * conflict resolution, and two dependencies for twelve lines is a poor trade.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Converts a title into a URL-safe slug. Used by the admin console. */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    // Strip combining marks so 'à' becomes 'a' rather than vanishing.
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * A short, human-quotable reference: `AOHC-7F3K2P`.
 *
 * The alphabet omits I, O, 0 and 1. These references are read down a phone to
 * someone who has just been given a cancer diagnosis, and a character they
 * cannot distinguish by ear is a failed callback.
 */
const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function makeReference(randomBytes: Uint8Array): string {
  let out = ''
  for (const byte of randomBytes.slice(0, 6)) {
    out += REFERENCE_ALPHABET[byte % REFERENCE_ALPHABET.length]
  }
  return `AOHC-${out}`
}

/** Truncates to a whole word, appending an ellipsis only if it cut. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}
