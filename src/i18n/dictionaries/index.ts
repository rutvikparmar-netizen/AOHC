import type { Locale } from '../locales'
import { SOURCE, type SourceId } from '../source'
import { fr } from './fr'
import { es } from './es'
import { ru } from './ru'
import { ar } from './ar'

/** English text → translation, which is what `t()` and `localize()` look up. */
export type Dictionary = Record<string, string>

/** A language file: a translation for each source id (missing ones stay English). */
export type Translations = Partial<Record<SourceId, string>>

function pair(translations: Translations): Dictionary {
  const out: Dictionary = {}
  for (const [id, english] of Object.entries(SOURCE)) {
    const translated = translations[id as SourceId]
    if (translated) out[english] = translated
  }
  return out
}

export const DICTIONARIES: Partial<Record<Locale, Dictionary>> = {
  fr: pair(fr),
  es: pair(es),
  ru: pair(ru),
  ar: pair(ar),
}
