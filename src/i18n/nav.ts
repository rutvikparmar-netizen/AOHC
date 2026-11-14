import { localizedPath } from './locales'
import { getLocale, localize } from './request'

/**
 * A menu in the current language: labels translated, and links to pages that
 * exist in this language (only "/" so far) pointed at that language's version.
 * Every other link still goes to the English page — it is the only one there is.
 */
export function localizeNav<T>(nav: T): T {
  const locale = getLocale()
  const fix = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(fix)
    if (v && typeof v === 'object') {
      const out: Record<string, unknown> = {}
      for (const [k, x] of Object.entries(v)) out[k] = k === 'href' && x === '/' ? localizedPath('/', locale) : fix(x)
      return out
    }
    return v
  }
  return fix(localize(nav)) as T
}
