import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { ayurvedicCancerCareGopala } from '@/data/articles/ayurvedic-cancer-care-gopala'
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
  { label: "Ayurvedic Cancer Care" },
]

export const metadata: Metadata = buildMetadata({
  title: "Ayurvedic Cancer Care | Gopala, Shimoga, Karnataka, India",
  description: "Ayurvedic approaches in cancer care — Panchakarma, herbal formulations and dietary change — and how Art of Healing Cancer combines them with conventional oncology.",
  canonicalPath: "/discover-the-healing-power-of-ayurvedic-cancer-care-gopala-shimoga-karnataka-india",
  /* The location is the point of this page, so the title keeps it and
     drops the appended brand instead — templated it ran to 82 characters
     and Google would have cut it mid-place-name. */
  absoluteTitle: true,
})

export default function AyurvedicCancerCareGopalaPage() {
  return <ArticleShell content={ayurvedicCancerCareGopala} trail={trail} />
}
