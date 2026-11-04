import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { inLovingMemory, landingPagesMeta } from '@/data/articles/landing-pages'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. The copy,
 * and every change made to it, is in `src/data/articles/landing-pages.ts`.
 */

const PATH = '/in-the-loving-memory'
const meta = landingPagesMeta.memory

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "In The Loving Memory" },
]

export const metadata: Metadata = buildMetadata({
  title: `${meta.title} | Art of Healing Cancer`,
  description: meta.description,
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function InLovingMemoryPage() {
  return <ArticleShell content={inLovingMemory} trail={trail} />
}
