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
import { InstitutionGrid } from '@/components/shared/InstitutionGrid'

/**
 * PARTNERING INSTITUTIONS — `/about-us/partnering-institutions`
 *
 * THE ROUTE ALREADY EXISTED AND WAS ALREADY LINKED FROM EVERY PAGE.
 * `routes.partners` is in the About Us menu and the footer, so this was a
 * 404 reachable from all nine pages until now.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE LIST COMES FROM `home.partners.items`, NOT FROM THIS PAGE'S DATA
 * FILE. The home page's affiliations section renders the same three
 * organisations, and `InstitutionGrid` is the same component in both
 * places. One list, two views: duplicating three named institutions and
 * their trademarks into a second file is how the two copies start to
 * disagree in public about who AOHC works with.
 *
 * ⚠️  TWO THINGS IN THE SUPPLIED COPY THAT THE DATA DOES NOT BEAR OUT, left
 * as written because the words are AOHC's, and flagged here and in the data
 * file so a reviewer sees them:
 *
 *   1. It says "hospitals", and one of the three is a hospital. CK Birla is
 *      a hospital; RGCC is a laboratory in Greece; the NABH entry is an
 *      accreditation network rather than a named institution.
 *   2. The heading ends in a colon and promises a list. Three entries
 *      follow, which is the whole set the site has.
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

          <InstitutionGrid items={home.partners.items} className="mt-10 lg:mt-12" />
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
