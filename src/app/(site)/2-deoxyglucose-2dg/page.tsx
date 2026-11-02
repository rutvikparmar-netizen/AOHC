import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { deoxyglucose2dg } from '@/data/articles/deoxyglucose-2dg'
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
  { label: "2-Deoxyglucose (2DG)" },
]

export const metadata: Metadata = buildMetadata({
  title: "2-Deoxyglucose (2DG) and the Warburg Effect",
  description: "Why cancer cells consume more glucose than normal cells, and how 2-deoxyglucose — a glucose analogue — inhibits glycolysis, interferes with protein folding and induces cell death.",
  canonicalPath: "/2-deoxyglucose-2dg",
})

export default function Deoxyglucose2dgPage() {
  return <ArticleShell content={deoxyglucose2dg} trail={trail} />
}
