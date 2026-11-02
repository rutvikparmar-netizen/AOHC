import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { vitaminCG6pd } from '@/data/articles/vitamin-c-g6pd'
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
  { label: "Vitamin C and G6PD Deficiency" },
]

export const metadata: Metadata = buildMetadata({
  title: "High-Dose IV Vitamin C and G6PD Deficiency: Risks Explained",
  description: "Why high-dose intravenous vitamin C is contraindicated in G6PD deficiency — the enzyme’s role in protecting red blood cells, the mechanism of haemolysis, and four reported cases.",
  canonicalPath: "/vitamin-c-infusion-and-g6pd-deficiency",
})

export default function VitaminCG6pdPage() {
  return <ArticleShell content={vitaminCG6pd} trail={trail} />
}
