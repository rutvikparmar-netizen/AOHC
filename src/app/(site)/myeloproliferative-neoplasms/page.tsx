import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { myeloproliferativeNeoplasms } from '@/data/articles/myeloproliferative-neoplasms'
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
  { label: "Myeloproliferative Neoplasms" },
]

export const metadata: Metadata = buildMetadata({
  title: "Myeloproliferative Neoplasms: Types, Symptoms and Treatment",
  description: "The main types of myeloproliferative neoplasm — myelofibrosis, polycythemia vera, essential thrombocythemia, HES and systemic mastocytosis — with their risk factors, symptoms, diagnosis and treatment.",
  canonicalPath: "/myeloproliferative-neoplasms",
})

export default function MyeloproliferativeNeoplasmsPage() {
  return <ArticleShell content={myeloproliferativeNeoplasms} trail={trail} />
}
