import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { localSightseeing } from '@/data/articles/international-guides'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. The copy,
 * and every change made to it, is in `src/data/articles/international-guides.ts`.
 * Title and description come from `src/data/seo-meta.ts`.
 */

const PATH = '/insight/local-sight-seeing-shopping'

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'International Patients', href: routes.international },
  { label: "Local Sightseeing" },
]

export const metadata: Metadata = buildMetadata({
  title: "Local Sightseeing",
  description: localSightseeing.hero.body[0] ?? '',
  canonicalPath: PATH,
})

export default function LocalSightseeingPage() {
  return <ArticleShell content={localSightseeing} trail={trail} />
}
