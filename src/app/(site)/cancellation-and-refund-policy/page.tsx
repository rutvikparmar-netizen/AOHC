import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { refundPolicy } from '@/data/refund-policy'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/shared/PageHero'
import { LegalDocument } from '@/components/shared/LegalDocument'

/**
 * Cancellation and Refund Policy — `/cancellation-and-refund-policy`
 *
 * THE ROUTE ALREADY EXISTED and was in the footer's legal row on every
 * page of the site, beside Privacy Policy and Terms of Use. It was a 404.
 *
 * ⚠️  NOT LEGALLY REVIEWED. It is AOHC's own published text, migrated
 * verbatim, which is not the same as text a lawyer has approved — and it
 * carries no effective date. What a reviewer needs to look at is listed
 * at the top of `src/data/refund-policy.ts`.
 *
 * No closing CTA, for the same reason as the privacy policy: a
 * "Request an Appointment" button under a refund policy reads as an
 * attempt to move someone along who is working out what they signed up
 * for.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Cancellation and Refund Policy' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Cancellation and Refund Policy',
  description:
    'How to cancel a service or request a refund from Art of Healing Cancer — notice periods, eligibility, rescheduling, and how a refund is initiated and processed.',
  canonicalPath: routes.refunds,
})

export default function RefundPolicyPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />
      <PageHero content={refundPolicy.hero} trail={trail} />
      <LegalDocument sections={refundPolicy.sections} />
    </>
  )
}
