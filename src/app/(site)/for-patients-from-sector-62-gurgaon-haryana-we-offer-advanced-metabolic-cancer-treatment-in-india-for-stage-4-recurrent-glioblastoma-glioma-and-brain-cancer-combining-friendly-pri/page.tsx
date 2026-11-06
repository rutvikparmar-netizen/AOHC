import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { batch4Pages } from '@/data/articles/wordpress-batch-4'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL — one of nineteen articles and landing pages migrated in one pass.
 * The copy, and what was dropped or needs review, is in
 * `src/data/articles/wordpress-batch-4.ts`.
 */

const PATH = '/for-patients-from-sector-62-gurgaon-haryana-we-offer-advanced-metabolic-cancer-treatment-in-india-for-stage-4-recurrent-glioblastoma-glioma-and-brain-cancer-combining-friendly-pri'
const page = batch4Pages.find((p) => p.slug === PATH.slice(1))!

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
