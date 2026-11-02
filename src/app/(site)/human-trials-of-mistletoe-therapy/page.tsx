import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { mistletoeHumanTrials } from '@/data/articles/mistletoe-human-trials'
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
  { label: "Human Trials of Mistletoe Therapy" },
]

export const metadata: Metadata = buildMetadata({
  title: "Human Trials of Mistletoe Therapy",
  description: "Reported clinical trials of mistletoe extract across breast, ovarian, pancreatic, colorectal, bladder, kidney, throat, skin, prostate, lung and uterine cancer.",
  canonicalPath: "/human-trials-of-mistletoe-therapy",
})

export default function MistletoeHumanTrialsPage() {
  return <ArticleShell content={mistletoeHumanTrials} trail={trail} />
}
