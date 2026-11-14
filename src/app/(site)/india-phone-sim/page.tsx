import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { indiaPhoneSim } from '@/data/articles/international-guides'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. The copy,
 * and every change made to it, is in `src/data/articles/international-guides.ts`.
 * Title and description come from `src/data/seo-meta.ts`.
 */

const PATH = '/india-phone-sim'

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'International Patients', href: routes.international },
  { label: "Local Phone SIM" },
]

export const metadata: Metadata = buildMetadata({
  title: "Local Phone SIM",
  description: indiaPhoneSim.hero.body[0] ?? '',
  canonicalPath: PATH,
})

export default function IndiaPhoneSimPage() {
  return <ArticleShell content={indiaPhoneSim} trail={trail} />
}
