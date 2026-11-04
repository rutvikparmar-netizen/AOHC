import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { cityGhoradongri, cityPages } from '@/data/articles/city-pages'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. One of
 * eight city landing pages; the copy, and what in it needs review, is in
 * `src/data/articles/city-pages.ts`.
 */

const PATH = '/revitalizing-ayurvedic-approach-to-cancer-treatment-ghoradongri-betul-madhya-pradesh-india'
const page = cityPages.find((p) => p.content === cityGhoradongri)!

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: "Ayurvedic Cancer Care — Ghoradongri, Betul" },
]

export const metadata: Metadata = buildMetadata({
  title: `${page.title} | Art of Healing Cancer`,
  description: page.description,
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function CityPage() {
  return <ArticleShell content={cityGhoradongri} trail={trail} />
}
