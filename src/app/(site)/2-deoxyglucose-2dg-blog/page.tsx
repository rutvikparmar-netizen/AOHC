import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { deoxyglucose2dgBlog } from '@/data/articles/deoxyglucose-2dg-blog'
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
  title: "2-Deoxyglucose (2DG): Mechanisms and Lysosomal Recycling",
  description: "How 2DG inhibits glycolysis, interferes with protein folding, and blocks the lysosomal recycling route cancer cells use to survive endoplasmic reticulum stress.",
  canonicalPath: "/2-deoxyglucose-2dg-blog",
})

export default function Deoxyglucose2dgBlogPage() {
  return <ArticleShell content={deoxyglucose2dgBlog} trail={trail} />
}
