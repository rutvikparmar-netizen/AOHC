import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { ecct } from '@/data/articles/ecct'
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
  { label: "ECCT" },
]

export const metadata: Metadata = buildMetadata({
  title: "What Is ECCT? Electro-Capacitive Cancer Therapy",
  description: "Electro-Capacitive Cancer Therapy uses non-contact capacitive electrodes to generate a low-frequency, low-intensity electric field intended to interfere with cell division.",
  canonicalPath: "/ecct",
})

export default function EcctPage() {
  return <ArticleShell content={ecct} trail={trail} />
}
