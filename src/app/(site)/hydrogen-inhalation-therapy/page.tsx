import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { hydrogenInhalationTherapy } from '@/data/articles/hydrogen-inhalation-therapy'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL — see the
 * warning in `src/data/articles/index.ts`. The copy, and every note about
 * what in it needs review, lives in the data file.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: "Hydrogen Inhalation Therapy" },
]

export const metadata: Metadata = buildMetadata({
  title: "Hydrogen Inhalation Therapy",
  description: "What Art of Healing Cancer has published about molecular hydrogen in cancer care — the proposed mechanism against reactive oxygen species, and its use after chemotherapy and radiotherapy.",
  canonicalPath: "/hydrogen-inhalation-therapy",
})

export default function HydrogenInhalationTherapyPage() {
  return <ArticleShell content={hydrogenInhalationTherapy} trail={trail} />
}
