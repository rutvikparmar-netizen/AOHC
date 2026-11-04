import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { lungCancerAyurvedaBhilwara, lungCancerHindiMeta } from '@/data/articles/lung-cancer-ayurveda-hindi'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. The English
 * version of the Hindi lung-cancer template; the copy, and what in it
 * needs review, lives in `src/data/articles/lung-cancer-ayurveda-hindi.ts`.
 */

const PATH = '/empower-your-journey-lung-cancer-ayurvedic-healing-r-k-colony-bhilwara-rajasthan-india'
const meta = lungCancerHindiMeta.bhilwara

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: "Lung Cancer Ayurvedic Care — R.K. Colony, Bhilwara" },
]

export const metadata: Metadata = buildMetadata({
  title: `${meta.title} | Art of Healing Cancer`,
  description: meta.description,
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function LungCancerBhilwaraPage() {
  return <ArticleShell content={lungCancerAyurvedaBhilwara} trail={trail} />
}
