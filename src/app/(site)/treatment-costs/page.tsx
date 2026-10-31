import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { treatmentCosts } from '@/data/treatment-costs'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { ClosingSection } from '@/components/home/ClosingSection'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { Passage } from '@/components/shared/Passage'
import { ChecklistSection } from '@/components/home/ChecklistSection'

/**
 * TREATMENT COSTS — `/treatment-costs`
 *
 * ORDER, which is the supplied document's own: hero → what can affect the
 * cost → individualized estimates → questions to ask → no treatment
 * guarantees → closing.
 *
 * THE ROUTE ALREADY EXISTED. `routes.costs` has been declared since the
 * routes file was written and resolved to a 404 until now.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  NO FIGURE APPEARS ON THIS PAGE AND NONE MAY BE ADDED. Not a price, a
 * range, a "from", a currency symbol or a worked example. None is supplied,
 * and a number here is a quotation the reader will hold AOHC to. The rest
 * of the rules for editing this content are at the top of
 * `src/data/treatment-costs.ts`; read them before touching the copy.
 *
 * ⚠️  "No Treatment Guarantees" IS THE POINT OF THE PAGE, not its small
 * print, which is why it is the last thing before the call to action rather
 * than a footnote under one of the lists. A reader who has just been told
 * what things may cost is exactly the reader who needs to be told that
 * paying does not buy an outcome.
 *
 * TWO `ChecklistSection`S ON ONE PAGE, which nothing else does. They carry
 * different kinds of list and are set apart by their surfaces: the cost
 * factors are things that may apply to you, the questions are things you
 * may put to the team. Both are genuinely lists of short phrases under a
 * lead sentence, which is what that component is for; writing a second
 * component to make them look different would be decoration.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Treatment Costs' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Treatment Costs and Financial Planning',
  description:
    'What can affect the cost of cancer care, what an individualized written estimate should cover, the questions to ask before proceeding, and why paying for treatment does not guarantee an outcome.',
  canonicalPath: routes.costs,
})

export default function TreatmentCostsPage() {
  const { factors, estimates, questions, guarantees, closing } = treatmentCosts

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={treatmentCosts.hero} trail={trail} />

      {/* ── 1. What can affect the cost? ───────────────────────────────
          A `ListSection`. Its outro — "Not every patient will require
          every item" — is what keeps the nine lines a set of
          possibilities rather than an itemised bill. */}
      <ChecklistSection content={factors} />

      {/* ── 2. Individualized cost estimates ───────────────────────────
          Through the shared passage component — heading beside the prose
          rather than above it, because three paragraphs at a reading
          measure under a full-width heading leave the right half of the
          row empty. */}
      <Passage content={estimates} surface />

      {/* ── 3. Questions to ask ────────────────────────────────────────
          ⚠️  THESE ARE THE READER'S QUESTIONS, NOT AOHC'S ANSWERS. The
          page does not answer any of them, and it should not start to:
          the answers depend on a case nobody has seen yet. Seven items,
          so the three-column grid leaves one on the last row — fewer
          would be a worse list. */}
      <ChecklistSection content={questions} />

      {/* ── 4. No treatment guarantees ─────────────────────────────────
          ⚠️  THE EMPHASISED LINE IS A PATIENT-PROTECTION STATEMENT AND
          GETS ITS OWN PANEL. "Treatment decisions should be based on
          clinical appropriateness and informed consent, not financial
          pressure" is the only sentence on the page addressed to someone
          being sold to, and a reader in that position is skimming.
          Folded into the paragraph above it, it reads as more process
          description. It must not be shortened, softened, or moved below
          the call to action.

          The same panel and icon as the consent statement on
          `/patient-journey`, deliberately: the two sentences do the same
          job on two pages and should be recognisable as one device. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-5">
              <SectionHeader
                eyebrow={guarantees.eyebrow}
                title={guarantees.title}
              />
            </Reveal>

            <Reveal direction="right" delay={80} className="lg:col-span-7">
              <div className="max-w-(--measure) space-y-5">
                {guarantees.body.map((paragraph) => (
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
                  {guarantees.emphasis}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Closing ─────────────────────────────────────────────────────
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
