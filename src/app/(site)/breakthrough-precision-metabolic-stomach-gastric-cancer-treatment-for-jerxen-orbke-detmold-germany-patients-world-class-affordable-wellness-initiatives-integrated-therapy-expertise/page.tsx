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

const PATH = '/breakthrough-precision-metabolic-stomach-gastric-cancer-treatment-for-jerxen-orbke-detmold-germany-patients-world-class-affordable-wellness-initiatives-integrated-therapy-expertise'
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
