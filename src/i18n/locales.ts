/**
 * THE SITE'S LANGUAGES
 * ----------------------------------------------------------------------------
 * English is the default and lives at the existing URLs, unprefixed — those
 * are the URLs with the search rankings, and they do not move. Every other
 * language lives under its own prefix: /fr, /es, /ru, /ar.
 *
 * ⚠️  ONLY THE HOME PAGE IS TRANSLATED SO FAR. `TRANSLATED_PATHS` is the list
 * of English paths that have a version in every other language; the
 * language switcher and the hreflang tags only point at those. Add a path
 * here when its translations exist, not before — an hreflang pointing at a
 * page that is not there is worse than none.
 */
export const LOCALES = ['en', 'fr', 'es', 'ru', 'ar'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'
export const OTHER_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE) as Exclude<Locale, 'en'>[]

export const LOCALE_INFO: Record<Locale, { name: string; english: string; dir: 'ltr' | 'rtl'; ogLocale: string }> = {
  en: { name: 'English', english: 'English', dir: 'ltr', ogLocale: 'en_IN' },
  fr: { name: 'Français', english: 'French', dir: 'ltr', ogLocale: 'fr_FR' },
  es: { name: 'Español', english: 'Spanish', dir: 'ltr', ogLocale: 'es_ES' },
  ru: { name: 'Русский', english: 'Russian', dir: 'ltr', ogLocale: 'ru_RU' },
  ar: { name: 'العربية', english: 'Arabic', dir: 'rtl', ogLocale: 'ar_AR' },
}

export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v)

/** English paths that exist in every language. */
export const TRANSLATED_PATHS = ['/'] as const

/** The URL of an English path in a given language. */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

/** hreflang map for a translated path, for `metadata.alternates.languages`. */
export function hreflangFor(path: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const l of LOCALES) out[l] = localizedPath(path, l)
  out['x-default'] = path
  return out
}
