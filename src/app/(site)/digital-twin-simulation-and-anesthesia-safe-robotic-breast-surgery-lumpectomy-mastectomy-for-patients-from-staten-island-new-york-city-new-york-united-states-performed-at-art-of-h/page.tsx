import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { roboticBreastSurgeryStatenIsland, batch3Pages } from '@/data/articles/wordpress-batch-3'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. The copy,
 * and what was dropped or moved, is in `src/data/articles/wordpress-batch-3.ts`.
 */

const PATH = '/digital-twin-simulation-and-anesthesia-safe-robotic-breast-surgery-lumpectomy-mastectomy-for-patients-from-staten-island-new-york-city-new-york-united-states-performed-at-art-of-h'
const page = batch3Pages.find((p) => p.content === roboticBreastSurgeryStatenIsland)!

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: page.crumb },
]

export const metadata: Metadata = buildMetadata({
  title: `${page.title} | Art of Healing Cancer`,
  description: page.description,
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function RoboticBreastSurgeryStatenIslandPage() {
  return <ArticleShell content={roboticBreastSurgeryStatenIsland} trail={trail} />
}
