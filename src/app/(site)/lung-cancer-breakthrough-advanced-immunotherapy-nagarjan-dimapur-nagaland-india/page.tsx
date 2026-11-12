import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { lungLocationPages } from '@/data/articles/lung-cancer-locations'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL — one of the lung-cancer location pages on the Bhilwara template.
 * The copy, and what was dropped or needs review, is in
 * `src/data/articles/lung-cancer-locations.ts`.
 */

const PATH = '/lung-cancer-breakthrough-advanced-immunotherapy-nagarjan-dimapur-nagaland-india'
const page = lungLocationPages.find((p) => p.slug === PATH.slice(1))!

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: page.crumb },
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
