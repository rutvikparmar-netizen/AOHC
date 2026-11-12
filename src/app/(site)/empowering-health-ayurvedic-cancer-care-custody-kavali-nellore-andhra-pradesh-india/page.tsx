import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { cityPages4 } from '@/data/articles/city-pages-4'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL — one of the fourth batch of city landing pages.
 * The copy, and what was dropped or needs review, is in
 * `src/data/articles/city-pages-4.ts`.
 */

const PATH = '/empowering-health-ayurvedic-cancer-care-custody-kavali-nellore-andhra-pradesh-india'
const page = cityPages4.find((p) => p.slug === PATH.slice(1))!

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
