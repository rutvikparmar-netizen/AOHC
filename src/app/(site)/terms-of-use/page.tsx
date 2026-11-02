import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { termsOfUse } from '@/data/terms-of-use'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/shared/PageHero'
import { LegalDocument } from '@/components/shared/LegalDocument'

/**
 * Terms of Use — `/terms-of-use`
 *
 * THE ROUTE ALREADY EXISTED and was linked from the footer of every page,
 * so this was a 404 reachable from the whole site.
 *
 * ⚠️  NOT LEGALLY REVIEWED, AND NOT FINISHED. The supplied draft is written
 * in the conditional and carries sentences addressed to whoever completes
 * it, plus placeholders for the legal entity and address. What renders is
 * the substantive copy; every omission and every outstanding item is
 * listed at the top of `src/data/terms-of-use.ts`. Read that before this page
 * is treated as final.
 *
 * ⚠️  NO CLOSING PANEL AND NO CALL TO ACTION. Every other page ends by
 * asking for an enquiry. A policy page is read by someone checking what
 * they are agreeing to, and a "Request an Appointment" button under it
 * reads as an attempt to move them along.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Terms of Use' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'The terms that apply to using the Art of Healing Cancer website, including that website use does not establish a doctor-patient relationship and is not an emergency service.',
  canonicalPath: routes.terms,
})

export default function TermsOfUsePage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />
      <PageHero content={termsOfUse.hero} trail={trail} />
      <LegalDocument sections={termsOfUse.sections} />
    </>
  )
}