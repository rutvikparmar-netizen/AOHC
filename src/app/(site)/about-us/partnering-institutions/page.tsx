import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { partneringInstitutions as content } from '@/data/partnering-institutions'
import { home } from '@/data/home'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { ClosingSection } from '@/components/home/ClosingSection'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { PartnerLogoGrid } from '@/components/shared/PartnerLogoGrid'

/**
 * PARTNERING INSTITUTIONS — `/about-us/partnering-institutions`
 *
 * THE ROUTE ALREADY EXISTED AND WAS ALREADY LINKED FROM EVERY PAGE.
 * `routes.partners` is in the About Us menu and the footer, so this was a
 * 404 reachable from all nine pages until now.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE LIST IS `home.network.items`, NOT `home.partners.items`, AND THE
 * DIFFERENCE IS THE WHOLE POINT OF THIS PAGE.
 *
 * It was built against `partners.items` first and AOHC corrected it: those
 * three — CK Birla, RGCC, NABH — are AFFILIATIONS AND ACCREDITATIONS, and
 * they belong to the home page's "Certified. Accredited. Globally
 * Connected." section. The partnering institutions are the ten
 * organisations in the care network, the logos running along the home
 * page's own strip. The two lists overlap (CK Birla and RGCC appear in
 * both) and are not the same list. Do not merge them, and do not point
 * this page back at `partners.items`.
 *
 * Still not duplicated into this page's data file: it is the same array
 * the home page's strip renders, shown as a grid instead of a marquee.
 *
 * ⚠️  THE SUPPLIED COPY SAYS "HOSPITALS", AND THE LIST IS BROADER THAN
 * THAT. The ten include hospitals, a genetics laboratory, an imaging
 * unit, a hyperbaric-oxygen provider and a non-profit foundation. Left as
 * written because the words are AOHC's, and flagged here and in the data
 * file so a reviewer sees it.
 *
 * ⚠️  §7 OF THE DRAFT GOVERNS THIS PAGE MORE THAN ANY OTHER: "a referral
 * relationship must not be described as a formal partnership unless that
 * relationship exists". Each card states its own relationship and they are
 * not synonyms for one another. Nothing may be added to the list that AOHC
 * has not confirmed.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'About Us', href: routes.about },
  { label: 'Partnering Institutions' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Partnering Institutions',
  description:
    'The hospitals, laboratories and accredited networks Art of Healing Cancer works with, and the nature of each relationship.',
  canonicalPath: routes.partners,
})

export default function PartneringInstitutionsPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={content.hero} trail={trail} />

      {/* ── The institutions ────────────────────────────────────────────
          The supplied lead-in sits over the list it introduces — its
          colon only makes sense immediately above the entries.

          `partners.intro` is rendered under it because it carries the one
          sentence on the site that says patients are told which clinician
          is responsible, which facility is involved and what the
          follow-up is. On a page about where treatment happens, that is
          the accountability line, not decoration. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeader
              title={content.listTitle}
              intro={home.partners.intro}
            />
          </Reveal>

          <PartnerLogoGrid items={home.network.items} className="mt-10 lg:mt-12" />
        </Container>
      </section>

      {/* ── Closing ─────────────────────────────────────────────────────
          The shared panel, same as every other page. The heading is
          borrowed from the home page's own section for this content —
          see the note in the data file. */}
      <ClosingSection
        content={{ title: content.closing.title, primaryCta: content.closing.cta }}
      />
    </>
  )
}
