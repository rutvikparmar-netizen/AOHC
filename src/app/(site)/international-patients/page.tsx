import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { internationalPatients as content } from '@/data/international-patients'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { ClosingSection } from '@/components/home/ClosingSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/shared/PageHero'
import { Passage } from '@/components/shared/Passage'
import { ChecklistSection } from '@/components/home/ChecklistSection'
import { RegionBand } from '@/components/international/RegionBand'
import { JourneySteps } from '@/components/international/JourneySteps'

/**
 * INTERNATIONAL PATIENTS — `/international-patients`
 *
 * ORDER, which is the supplied document's own: hero → where enquiries come
 * from → how the process works → considerations before travelling → support
 * for families and caregivers → closing.
 *
 * THIS MAKES THE NAV LABEL RESOLVE. `primaryNav` has carried an
 * "International Patients" group since the header was built, and the label
 * itself links here — it has been a 404 the whole time, with seven child
 * links behind it that still are.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  NOTHING ON THIS PAGE IS CONFIRMED, AND THE HERO'S NOTE SAYS SO:
 * "acceptance for consultation or treatment depends on clinical assessment,
 * service availability, travel feasibility, and applicable requirements."
 * One sentence of the supplied document is deliberately not rendered because
 * it is an instruction to AOHC about what it may describe as available — it
 * is quoted in full at the top of `src/data/international-patients.ts`, and
 * it is the rule that keeps the seven child pages unwritten rather than
 * guessed at.
 *
 * ⚠️  DO NOT LINK THE SEVEN CHILD PAGES FROM HERE. Payments, accommodation,
 * India phone SIM, cash to carry, sightseeing, airport pickup and medical
 * visa all exist in `routes.ts` and the header already lists them; not one
 * is written. Step 5 names visas, accommodation and interpretation as things
 * to ask the team about, which is the honest form of that link until the
 * pages exist.
 *
 * ⚠️  NO MEDICAL DISCLAIMER SECTION HERE, unlike the three clinical pages.
 * This one is logistics: records, consultations, travel, follow-up. Where it
 * touches clinical ground it says so in place and more usefully than a
 * footer would — the travel-safety sentence opens the considerations section,
 * "AOHC cannot guarantee visa approval, travel eligibility, treatment
 * availability, or a particular outcome" closes it, and two stages carry
 * their own caution panels. Putting the standard notice on every page turns
 * it into furniture. If a reviewer disagrees, it is the same two strings from
 * `lib/site.ts` used on the other pages.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'International Patients' },
]

export const metadata: Metadata = buildMetadata({
  title: 'International Patients',
  description:
    'How an enquiry from outside India is handled — initial contact, medical records, preliminary review, consultation, planning a visit and follow-up — and what to consider before travelling for cancer care.',
  canonicalPath: routes.international,
})

export default function InternationalPatientsPage() {
  const { closing } = content

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={content.hero} trail={trail} />

      {/* ── 1. Where enquiries come from ────────────────────────────
          A strip rather than a section — effectively the hero's third
          paragraph. See the component: the labels are not a coverage
          map and "Other regions" must stay. */}
      <RegionBand content={content.regions} />

      {/* ── 2. How the process works ───────────────────────────────
          The spine of the page. Six stacked cards; two of them carry a
          caution panel that must not be moved out of its step. */}
      <JourneySteps content={content.process} />

      {/* ── 3. Important considerations before travelling ───────────
          A `ListSection`, so it renders through the home page's
          component. ⚠️  The travel-safety sentence is the first thing in
          `intro`, NOT in `warning` — `ChecklistSection` renders `warning`
          below `outro` at the foot of the section, and a patient whose
          disease makes flying unsafe needs that before the list, not
          after it. See the note in the data file. */}
      <ChecklistSection content={content.considerations} surface />

      {/* ── 4. Support for families and caregivers ───────────────── */}
      <Passage content={content.caregivers} />

      {/* ── Closing ─────────────────────────────────────────────────
          The shared panel, same as every other page. Only a heading and
          one action are supplied for this one; the lead paragraphs, the
          second action and the note under the buttons render when AOHC
          sends copy for them. */}
      <ClosingSection
        content={{ title: closing.title, primaryCta: closing.cta }}
      />
    </>
  )
}
