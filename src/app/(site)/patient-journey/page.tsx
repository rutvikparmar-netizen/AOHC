import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { patientJourney as journey } from '@/data/patient-journey'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { ChecklistSection } from '@/components/home/ChecklistSection'
import { JourneyDeck } from '@/components/journey/JourneyDeck'

/**
 * YOUR PATIENT JOURNEY — `/patient-journey`
 *
 * ORDER, which is the supplied document's own: hero → the seven stages →
 * how to prepare → you remain part of every decision → closing.
 *
 * THE ROUTE ALREADY EXISTED AND WAS ALREADY LINKED. `routes.patientJourney`
 * is pointed at from two places on the home page; both were 404s until now.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE WHOLE PAGE IS CONDITIONAL AND MUST STAY THERE. Every stage says
 * what MAY happen — "the clinical team may consider", "if a treatment plan
 * is proposed", "additional testing is not automatically required". It
 * describes a process, not a promise about what a given patient will be
 * offered. See the note at the top of `src/data/patient-journey.ts`.
 *
 * ⚠️  NO HERO BACKGROUND YET. The other five pages built on `PageHero` each
 * carry a commissioned frame; none was generated for this one, and reusing
 * another page's would undo the point of having one per page. The hero is
 * perfectly good without it — `image` is optional — and this is the only
 * thing missing from the page.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Your Patient Journey' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Your Patient Journey',
  description:
    'The seven stages of an AOHC review — enquiry, sharing records securely, review of your medical history, identifying gaps, discussing options, agreeing next steps and follow-up — and how to prepare for a consultation.',
  canonicalPath: routes.patientJourney,
})

export default function PatientJourneyPage() {
  const { consent, closing } = journey

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={journey.hero} trail={trail} />

      {/* ── 1. The seven stages ─────────────────────────────────────
          A pinned, receding deck. The sequence is the content here, and
          the effect is how it is carried — see the component. */}
      <JourneyDeck content={journey.stages} />

      {/* ── 2. What you can do to prepare ──────────────────────────
          A `ListSection`, so it renders through the home page's
          component. Six items, which divides evenly into both the two-
          and three-column grids it uses. */}
      <ChecklistSection content={journey.prepare} surface />

      {/* ── 3. You remain part of every decision ───────────────────
          ⚠️  THE EMPHASISED LINE IS A PATIENT-RIGHTS STATEMENT AND GETS
          ITS OWN PANEL. "You should never feel pressured to proceed with
          a test, treatment, or procedure you do not understand" is the
          only sentence on the page addressed to someone being pushed
          into something, and a reader in that position is skimming.
          Folded into the paragraph above it, it reads as more process
          description. It must not be shortened, softened, or moved below
          the call to action. */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-5">
              <SectionHeader eyebrow={consent.eyebrow} title={consent.title} />
            </Reveal>

            <Reveal direction="right" delay={80} className="lg:col-span-7">
              <div className="max-w-(--measure) space-y-5">
                {consent.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-base leading-relaxed text-neutral-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-7 flex gap-4 rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-6 sm:gap-5 sm:p-7">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Icon name="shield-check" className="size-5" />
                </span>
                <p className="max-w-(--measure) self-center text-base font-bold leading-relaxed text-text">
                  {consent.emphasis}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 4. Closing ─────────────────────────────────────────────
          Thin, like the other pages built from this draft: the supplied
          copy is a heading and one button. */}
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
