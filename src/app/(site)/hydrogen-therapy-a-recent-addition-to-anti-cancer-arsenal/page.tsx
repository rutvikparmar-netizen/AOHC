import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { hydrogenTherapyAntiCancerArsenal } from '@/data/articles/hydrogen-therapy-anti-cancer-arsenal'
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
  { label: "Hydrogen Therapy" },
]

export const metadata: Metadata = buildMetadata({
  title: "Hydrogen Therapy: A Recent Addition to the Anti-Cancer Arsenal",
  description: "Molecular hydrogen in cancer care — the three routes of administration, the balance between reactive oxygen species and antioxidants, and what has been reported in cell lines, animal models and case reports.",
  canonicalPath: "/hydrogen-therapy-a-recent-addition-to-anti-cancer-arsenal",
})

export default function HydrogenTherapyArsenalPage() {
  return <ArticleShell content={hydrogenTherapyAntiCancerArsenal} trail={trail} />
}
