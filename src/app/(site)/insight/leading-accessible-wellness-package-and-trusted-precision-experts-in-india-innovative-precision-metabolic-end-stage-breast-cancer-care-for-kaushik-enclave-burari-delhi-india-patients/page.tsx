import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { breastCancerBurari, landingPagesMeta } from '@/data/articles/landing-pages'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. The copy,
 * and every change made to it, is in `src/data/articles/landing-pages.ts`.
 */

const PATH = '/insight/leading-accessible-wellness-package-and-trusted-precision-experts-in-india-innovative-precision-metabolic-end-stage-breast-cancer-care-for-kaushik-enclave-burari-delhi-india-patients'
const meta = landingPagesMeta.burari

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: "Blogs", href: routes.blogs },
  { label: "Breast Cancer Care — Kaushik Enclave, Burari" },
]

export const metadata: Metadata = buildMetadata({
  title: `${meta.title} | Art of Healing Cancer`,
  description: meta.description,
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function BreastCancerBurariPage() {
  return <ArticleShell content={breastCancerBurari} trail={trail} />
}
