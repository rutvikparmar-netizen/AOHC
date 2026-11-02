import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { ivVitaminC } from '@/data/articles/iv-vitamin-c'
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
  { label: "IV Vitamin C" },
]

export const metadata: Metadata = buildMetadata({
  title: "High-Dose Intravenous Vitamin C for Cancer",
  description: "How high-dose IV vitamin C is metabolised and the mechanisms proposed for its effect on cancer cells — oxygen sensing, pro-oxidant activity, collagen and EMT, and immunomodulation.",
  canonicalPath: "/iv-vitamin-c",
})

export default function IvVitaminCPage() {
  return <ArticleShell content={ivVitaminC} trail={trail} />
}
