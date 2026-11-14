/* Writes one review sheet per language to docs/translations/<lang>.csv:
   id, English, translation — for a translator to check in Excel / Google
   Sheets. Corrections go back into src/i18n/dictionaries/<lang>.ts by id.
   Run: npx tsx --tsconfig tsconfig.json scripts/i18n-review.ts */
import { mkdirSync, writeFileSync } from 'node:fs'
import { SOURCE } from '@/i18n/source'
import { fr } from '@/i18n/dictionaries/fr'
import { es } from '@/i18n/dictionaries/es'
import { ru } from '@/i18n/dictionaries/ru'
import { ar } from '@/i18n/dictionaries/ar'

const LANGS = { fr, es, ru, ar } as const
const cell = (s: string) => `"${s.replace(/"/g, '""')}"`

mkdirSync('docs/translations', { recursive: true })
for (const [lang, dict] of Object.entries(LANGS)) {
  const rows = [['id', 'English', lang.toUpperCase(), 'Reviewer comment'].map(cell).join(',')]
  let missing = 0
  for (const [id, english] of Object.entries(SOURCE)) {
    const translated = (dict as Record<string, string | undefined>)[id] ?? ''
    if (!translated) missing++
    rows.push([id, english, translated, ''].map(cell).join(','))
  }
  /* UTF-8 with BOM so Excel shows Cyrillic and Arabic correctly. */
  writeFileSync(`docs/translations/${lang}.csv`, '﻿' + rows.join('\r\n'), 'utf8')
  console.log(`${lang}: ${rows.length - 1} strings, ${missing} untranslated`)
}
