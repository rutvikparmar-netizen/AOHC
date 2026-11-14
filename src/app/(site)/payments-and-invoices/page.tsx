import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { paymentsAndInvoices } from '@/data/articles/international-guides'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ArticleShell } from '@/components/shared/ArticleShell'

/**
 * Migrated from the WordPress site and KEPT AT ITS ORIGINAL URL. The copy,
 * and every change made to it, is in `src/data/articles/international-guides.ts`.
 * Title and description come from `src/data/seo-meta.ts`.
 */

const PATH = '/payments-and-invoices'

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'International Patients', href: routes.international },
  { label: "Invoicing & Payments" },
]

export const metadata: Metadata = buildMetadata({
  title: "Invoicing & Payments",
  description: paymentsAndInvoices.hero.body[0] ?? '',
  canonicalPath: PATH,
})

export default function PaymentsAndInvoicesPage() {
  return <ArticleShell content={paymentsAndInvoices} trail={trail} />
}
