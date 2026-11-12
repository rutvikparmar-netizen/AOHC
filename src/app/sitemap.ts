import type { MetadataRoute } from 'next'
import { migratedArticles } from '@/data/articles'
import { routes } from '@/lib/routes'
import { absoluteUrl } from '@/lib/site'

/**
 * sitemap.xml — every public page.
 *
 * The main pages are listed here; every migrated article and location page
 * comes from the blog index, so a page added there is in the sitemap with
 * nothing else to update. Devanagari URLs are percent-encoded, as the
 * sitemap protocol requires.
 *
 * ⚠️  ONLY PAGES THAT EXIST. `routes.documents` and the other declared
 * routes with no page behind them are deliberately absent — a sitemap that
 * lists 404s tells Google the site is badly maintained.
 */
const MAIN: { path: string; priority: number }[] = [
  { path: routes.home, priority: 1 },
  { path: routes.contact, priority: 0.9 },
  { path: '/request-a-consultation', priority: 0.9 },
  { path: '/about-us', priority: 0.7 },
  { path: '/about-us/partnering-institutions', priority: 0.5 },
  { path: '/who-we-are', priority: 0.7 },
  { path: '/our-doctors', priority: 0.8 },
  { path: routes.memorial, priority: 0.4 },
  { path: routes.testimonials, priority: 0.7 },
  { path: routes.videos, priority: 0.6 },
  { path: routes.media, priority: 0.5 },
  { path: routes.research, priority: 0.5 },
  { path: '/international-patients', priority: 0.8 },
  { path: '/patient-journey', priority: 0.6 },
  { path: '/treatment-costs', priority: 0.7 },
  { path: '/treatments-and-therapies', priority: 0.8 },
  { path: '/integrative-cancer-care', priority: 0.8 },
  { path: '/cancer-types', priority: 0.8 },
  { path: '/faqs', priority: 0.6 },
  { path: '/knowledge', priority: 0.5 },
  { path: routes.blogs, priority: 0.7 },
  { path: '/blogs/category/dosing-calculator', priority: 0.6 },
  { path: '/blogs/fenbendazole-dosage-calculator', priority: 0.7 },
  { path: '/blogs/ivermectin-dosing-calculator', priority: 0.6 },
  { path: '/blogs/aohc-breast-cancer-chemotherapy-dosage-calculator', priority: 0.6 },
  { path: '/glioblastoma', priority: 0.6 },
  { path: '/privacy-policy', priority: 0.2 },
  { path: '/terms-of-use', priority: 0.2 },
  { path: '/medical-disclaimer', priority: 0.2 },
  { path: '/cancellation-and-refund-policy', priority: 0.2 },
]

const encode = (path: string) => path.split('/').map(encodeURIComponent).join('/')

export default function sitemap(): MetadataRoute.Sitemap {
  const seen = new Set<string>()
  const out: MetadataRoute.Sitemap = []
  const add = (path: string, priority: number) => {
    const url = absoluteUrl(encode(path))
    if (seen.has(url)) return
    seen.add(url)
    out.push({ url, changeFrequency: 'monthly', priority })
  }
  for (const m of MAIN) add(m.path, m.priority)
  for (const a of migratedArticles) add(a.href, 0.6)
  return out
}
