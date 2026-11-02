import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { privacyPolicy } from '@/data/privacy-policy'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/shared/PageHero'
import { LegalDocument } from '@/components/shared/LegalDocument'

/**
 * Privacy Policy — `/privacy-policy`
 *
 * THE ROUTE ALREADY EXISTED and was linked from the footer of every page,
 * so this was a 404 reachable from the whole site.
 *
 * ⚠️  NOT LEGALLY REVIEWED, AND NOT FINISHED. The supplied draft is written
 * in the conditional and carries sentences addressed to whoever completes
 * it, plus placeholders for the legal entity and address. What renders is
 * the substantive copy; every omission and every outstanding item is
 * listed at the top of `src/data/privacy-policy.ts`. Read that before this page
 * is treated as final.
 *
 * ⚠️  NO CLOSING PANEL AND NO CALL TO ACTION. Every other page ends by
 * asking for an enquiry. A policy page is read by someone checking what
 * they are agreeing to, and a "Request an Appointment" button under it
 * reads as an attempt to move them along.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Privacy Policy' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Art of Healing Cancer may collect, use, store and share personal information from website visitors and enquiries, including medical information provided for a consultation request.',
  canonicalPath: routes.privacy,
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />
      <PageHero content={privacyPolicy.hero} trail={trail} />
      <LegalDocument sections={privacyPolicy.sections} />
    </>
  )
}