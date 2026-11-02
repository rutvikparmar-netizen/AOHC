import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { integrativeOncologyBadiDhaulpur } from '@/data/articles/integrative-oncology-badi-dhaulpur'
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
  { label: "Integrative Oncology — Badi, Dhaulpur" },
]

export const metadata: Metadata = buildMetadata({
  title: "Integrative Oncology Treatment | Badi, Dhaulpur, Rajasthan",
  description: "Integrative oncology blends conventional cancer treatment with evidence-based complementary therapies — the approach, its reported benefits, and the therapies Art of Healing Cancer offers.",
  canonicalPath: "/empowering-integrative-oncology-treatment-hub-badi-dhaulpur-rajasthan-india",
  /* The location is the point of this page, so the title keeps it and
     drops the appended brand, which would have run it past 60 chars. */
  absoluteTitle: true,
})

export default function IntegrativeOncologyBadiDhaulpurPage() {
  return <ArticleShell content={integrativeOncologyBadiDhaulpur} trail={trail} />
}
