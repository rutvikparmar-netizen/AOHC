import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { breastCancerDiagnosis } from '@/data/articles/breast-cancer-diagnosis'
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
  { label: "Breast Cancer Diagnosis" },
]

export const metadata: Metadata = buildMetadata({
  title: "Radiology Methods for Breast Cancer Diagnosis",
  description: "The role of mammogram, ultrasound and MRI in diagnosing breast cancer, when each is advised, and how the BIRADS score is reached.",
  canonicalPath: "/breast-cancer-diagnosis",
})

export default function BreastCancerDiagnosisPage() {
  return <ArticleShell content={breastCancerDiagnosis} trail={trail} />
}
