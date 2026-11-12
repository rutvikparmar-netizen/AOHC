/* Checks every search title/description in data/seo-meta.ts: length limits,
   superlatives, duplicates, and pages with no entry.
   Run: npx tsx --tsconfig tsconfig.json scripts/seo-audit.ts */
import { allSeoEntries } from '@/data/seo-meta'
import { migratedArticles } from '@/data/articles'
const e = allSeoEntries()
const bad = /\b(best|top|cure|cures|guaranteed|no\.? 1)\b/i
let n = 0
for (const [p, s] of e) {
  const issues = [] as string[]
  if (s.title && s.title.length > 60) issues.push(`title ${s.title.length}`)
  if (s.description.length > 155) issues.push(`desc ${s.description.length}`)
  if (s.description.length < 70) issues.push(`desc short ${s.description.length}`)
  if ((s.title && bad.test(s.title)) || bad.test(s.description)) issues.push('superlative')
  if (issues.length) { n++; console.log(issues.join(', '), '|', p.slice(0, 70), '|', s.title) }
}
const missing = migratedArticles.filter((a) => !e.find(([p]) => p === a.href))
console.log(`${e.length} entries, ${n} with issues, ${missing.length} pages without an entry`)
for (const m of missing) console.log('  MISSING', m.href.slice(0, 90), '|', m.title.slice(0, 80))
const titles = new Map<string, number>(); for (const [, s] of e) if (s.title) titles.set(s.title, (titles.get(s.title) ?? 0) + 1)
for (const [t, c] of titles) if (c > 1) console.log('  DUP x' + c, t)
