import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { cityBhiwadi, cityPages2 as cityPages } from '@/data/articles/city-pages-2'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. One of
 * the second batch of city landing pages; the copy, and what in it needs
 * review, is in
 * `src/data/articles/city-pages-2.ts`.
 */

const PATH = '/renewed-hope-ayurvedic-healing-for-cancer-patients-ashiana-village-bhiwadi-rajasthan-india'
const page = cityPages.find((p) => p.content === cityBhiwadi)!

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: "Ayurvedic Cancer Care — Ashiana Village, Bhiwadi" },
]

export const metadata: Metadata = buildMetadata({
  title: `${page.title} | Art of Healing Cancer`,
  description: page.description,
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function CityPage() {
  return <ArticleShell content={cityBhiwadi} trail={trail} />
}
