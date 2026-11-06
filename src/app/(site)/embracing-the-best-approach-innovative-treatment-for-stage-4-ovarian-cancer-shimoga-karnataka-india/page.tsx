import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { cityPages3 } from '@/data/articles/city-pages-3'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL — one of the third batch of city landing pages.
 * The copy, and what was dropped or needs review, is in
 * `src/data/articles/city-pages-3.ts`.
 */

const PATH = '/embracing-the-best-approach-innovative-treatment-for-stage-4-ovarian-cancer-shimoga-karnataka-india'
const page = cityPages3.find((p) => p.slug === PATH.slice(1))!

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: 'Stage 4 Ovarian Cancer — Shimoga' },
]

export const metadata: Metadata = buildMetadata({
  title: `${page.title} | Art of Healing Cancer`,
  description: page.description,
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function MigratedPage() {
  return <ArticleShell content={page.content} trail={trail} />
}
