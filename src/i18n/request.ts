import { cache } from 'react'
import { DEFAULT_LOCALE, type Locale } from './locales'
import { DICTIONARIES, type Dictionary } from './dictionaries'

/**
 * THE CURRENT REQUEST'S LANGUAGE, AND TRANSLATING BY SOURCE TEXT
 * ----------------------------------------------------------------------------
 * SERVER ONLY. `cache` gives one store per request, so a translated route
 * calls `setLocale('fr')` at the top of its layout AND its page (they can
 * render in parallel), and every server component under them can call
 * `t()` / `localize()` without the language being passed down as a prop.
 * English routes never call it and get English.
 *
 * WHY THE KEY IS THE ENGLISH TEXT ITSELF. The dictionaries map English →
 * translation. A translator reviews pairs of sentences, not ids; content in
 * `data/home.ts` stays exactly as it is; and anything not translated yet
 * falls back to English instead of rendering a key or a blank.
 */
const store = cache(() => ({ locale: DEFAULT_LOCALE as Locale }))

export function setLocale(locale: Locale) {
  store().locale = locale
}

export function getLocale(): Locale {
  return store().locale
}

export function getDictionary(locale: Locale = getLocale()): Dictionary {
  return DICTIONARIES[locale] ?? {}
}

/** One string in the current language (English if there is no translation). */
export function t(text: string): string {
  if (!text) return text
  return getDictionary()[text] ?? text
}

/**
 * A whole content object in the current language: every string value that
 * has a translation is replaced; everything else (URLs, image paths, ids,
 * numbers) passes through untouched, because no dictionary contains them.
 */
export function localize<T>(value: T, dict: Dictionary = getDictionary()): T {
  if (typeof value === 'string') return (dict[value] ?? value) as T
  if (Array.isArray(value)) return value.map((v) => localize(v, dict)) as T
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = localize(v, dict)
    return out as T
  }
  return value
}
