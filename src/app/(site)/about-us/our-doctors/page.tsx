import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { doctorsPage } from '@/data/doctors-page'
import { home } from '@/data/home'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { Passage } from '@/components/shared/Passage'
import { ChecklistSection } from '@/components/home/ChecklistSection'
import { DoctorDirectory } from '@/components/doctors/DoctorDirectory'

/**
 * DOCTORS AND SPECIALISTS — `/about-us/our-doctors`
 *
 * ORDER, which is the supplied document's own: hero → a multidisciplinary
 * perspective → the team → clinical responsibility → closing.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE ROSTER COMES FROM `home.team.members`, NOT FROM THIS PAGE'S DATA
 * FILE. It is the transcription of artofhealingcancer.com/our-doctors, and
 * the home page already renders the first seven of it as a rail whose
 * "Meet the full team" link points here — a link that was dead until this
 * page existed. One list, two views; duplicating fifteen real people's
 * credentials into a second file is how the two copies start to disagree.
 *
 * ⚠️  THE DRAFT'S "MEET OUR TEAM" IS A TEMPLATE AND IS NOT RENDERED. It is
 * a set of square-bracket placeholders — name, qualifications, biography,
 * areas of focus, registration, availability — reproduced in full at the
 * top of `src/data/doctors-page.ts`, where it serves as the spec for the
 * four fields the roster still lacks. Only the doctor or AOHC may supply
 * them.
 *
 * ⚠️  NO MEDICAL DISCLAIMER SECTION HERE, unlike the three clinical pages.
 * This one gives no clinical information to act on — it lists people and
 * says who is responsible for what — and the supplied copy carries its own
 * governance in "Clinical Responsibility and Collaboration", which is the
 * last thing read before the call to action. Putting the notice on every
 * page turns it into furniture. If a reviewer disagrees, it is the same
 * two strings from `lib/site.ts` used on the other pages.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'About Us', href: routes.about },
  { label: 'Our Doctors' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Doctors and Specialists',
  description:
    'The medical disciplines a cancer review may involve, the specialists who make up the AOHC team, and how clinical responsibility is shared with a patient’s existing oncologist.',
  canonicalPath: routes.doctors,
})

export default function DoctorsPage() {
  const { responsibility, closing } = doctorsPage

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={doctorsPage.hero} trail={trail} />

      {/* ── 1. A multidisciplinary perspective ──────────────────────
          A `ListSection`, so it renders through the home page's
          component. Its outro — "not all disciplines may be available
          through AOHC directly" — is what keeps the ten specialties a
          description rather than a roster of staffed services. */}
      <ChecklistSection content={doctorsPage.disciplines} />

      {/* ── 2. The team ─────────────────────────────────────────────
          Fifteen real people, searchable and filterable by discipline.
          See the component before changing any field: every one renders
          only when present, on purpose — and read the note there on why
          there is no city filter before adding one.

          IT STAYS DIRECTLY BELOW THE MULTIDISCIPLINARY SECTION, which is
          both the supplied document's order and the one that reads: that
          section names the disciplines a case may involve, and this one
          is who covers them. Nothing goes between the question and the
          answer. */}
      <DoctorDirectory
        eyebrow={doctorsPage.team.eyebrow}
        title={doctorsPage.team.title}
        intro={doctorsPage.team.intro}
        members={home.team.members}
        cta={doctorsPage.team.cta}
        surface
      />

      {/* ── 3. Clinical responsibility and collaboration ───────────
          Through the shared passage component — heading beside the prose
          rather than above it, because two paragraphs at a reading
          measure under a full-width heading leave the right half of the
          row empty. */}
      <Passage content={responsibility} />

      {/* ── 4. Closing ─────────────────────────────────────────────
          Thin, like the other pages built from this draft: the supplied
          copy is a heading and one button, and `ClosingPanel` would need
          lead paragraphs, a second action and a note inventing. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-h2 font-bold tracking-[-0.02em] text-text">
              {closing.title}
            </h2>

            <Button
              href={closing.cta.href}
              icon="arrow-right"
              className="mt-8 rounded-(--radius-pill)"
            >
              {closing.cta.label}
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
