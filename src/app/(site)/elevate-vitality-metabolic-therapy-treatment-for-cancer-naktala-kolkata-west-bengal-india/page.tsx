import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { cityNaktala, cityPages2 as cityPages } from '@/data/articles/city-pages-2'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. One of
 * the second batch of city landing pages; the copy, and what in it needs
 * review, is in
 * `src/data/articles/city-pages-2.ts`.
 */

const PATH = '/elevate-vitality-metabolic-therapy-treatment-for-cancer-naktala-kolkata-west-bengal-india'
const page = cityPages.find((p) => p.content === cityNaktala)!

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: "Metabolic Therapy — Naktala, Kolkata" },
]

export const metadata: Metadata = buildMetadata({
  title: `${page.title} | Art of Healing Cancer`,
  description: page.description,
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function CityPage() {
  return <ArticleShell content={cityNaktala} trail={trail} />
}
