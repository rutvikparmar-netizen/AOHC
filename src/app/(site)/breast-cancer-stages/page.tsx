import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { breastCancerStagesHindi } from '@/data/articles/breast-cancer-stages-hindi'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL — see the
 * warning in `src/data/articles/index.ts`. The copy, and every note about
 * what in it needs review, lives in the data file.
 *
 * ⚠️  THIS PAGE IS IN HINDI. The breadcrumb and the metadata are too; the
 * title, description and crumb are the page's own language rather than
 * English labels on Hindi content. `content.lang` puts `lang="hi"` on
 * the body — see `ArticleShell`.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: "स्तन कैंसर स्टेजिंग" },
]

export const metadata: Metadata = buildMetadata({
  title: "स्तन कैंसर ग्रेडिंग और स्टेजिंग | Art of Healing Cancer",
  description: "स्तन कैंसर के ग्रेड और चरण का क्या अर्थ है — पैथोलॉजिस्ट की ग्रेडिंग, DCIS, TNM प्रणाली और चरण 0 से 4 तक की व्याख्या।",
  canonicalPath: "/breast-cancer-stages",
  absoluteTitle: true,
})

export default function BreastCancerStagesHindiPage() {
  return <ArticleShell content={breastCancerStagesHindi} trail={trail} />
}
