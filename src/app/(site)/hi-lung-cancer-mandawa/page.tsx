import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { lungCancerAyurvedaMandawa, lungCancerHindiMeta } from '@/data/articles/lung-cancer-ayurveda-hindi'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL, which is
 * Devanagari: '/आयुर्वेदिक-उपचार-से-फेफड-6'.
 *
 * ⚠️  THE FOLDER IS ASCII ON PURPOSE. Next does not route a folder named in
 * Devanagari (it 404s), so this page lives here and `next.config.ts`
 * rewrites the Hindi URL to it. The canonical is the Hindi URL.
 * The copy, and every note on what in it needs a Hindi speaker's review,
 * lives in `src/data/articles/lung-cancer-ayurveda-hindi.ts`.
 */

const PATH = '/आयुर्वेदिक-उपचार-से-फेफड-6'
const meta = lungCancerHindiMeta.mandawa

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: "फेफड़ों के कैंसर का आयुर्वेदिक इलाज — मंडावा" },
]

export const metadata: Metadata = buildMetadata({
  title: `${meta.title} | Art of Healing Cancer`,
  description: meta.description,
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function LungCancerMandawaPage() {
  return <ArticleShell content={lungCancerAyurvedaMandawa} trail={trail} />
}
