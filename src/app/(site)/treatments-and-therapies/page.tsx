import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
/**
 * ⚠️  `treatments-page`, NOT `treatments`. `src/data/treatments.ts` is a
 * deliberately empty `Treatment[]` that the demo repository imports, and
 * this page's copy was briefly written over the top of it. Two different
 * things with one obvious name; the page copy is the one that moved.
 */
import { treatmentsPage as treatments } from '@/data/treatments-page'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER } from '@/lib/site'
import { ClosingSection } from '@/components/home/ClosingSection'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { EntryGrid } from '@/components/shared/EntryGrid'
import { Passage } from '@/components/shared/Passage'
import { CautionBand } from '@/components/treatments/CautionBand'

/**
 * TREATMENTS AND THERAPIES — `/treatments-and-therapies`
 *
 * ORDER, which is the supplied document's own: hero → conventional
 * treatments → molecular and biomarker-guided discussions →
 * investigational and metabolic approaches → local procedures →
 * supportive therapies → how options are evaluated → safety → closing →
 * disclaimer.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  NOTHING ON THIS PAGE IS AN OFFER, and the hero's note says so: the
 * treatments are "categories that may be relevant to cancer care" whose
 * "availability through AOHC must be confirmed individually". One sentence
 * of the supplied document is deliberately not rendered because it is an
 * instruction to AOHC rather than copy for a patient — it is quoted in full
 * at the top of `src/data/treatments.ts`.
 *
 * ⚠️  THE SAFETY PANEL COMES BEFORE THE CALL TO ACTION, NOT AFTER IT. It is
 * the only place on the site that tells a patient outright not to change
 * treatment on the strength of something they have read, and a reader who
 * acts on this page acts at the CTA. Moving it below would put it past the
 * point it exists to catch.
 *
 * THE RUNNING ORDER IS AN ARGUMENT. Conventional treatments come first and
 * the investigational and metabolic approaches sit behind a dark warning
 * band in the middle, so a reader who stops halfway has read "standard
 * options, carefully matched" and not a menu of experimental ones.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Treatments and Therapies' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Treatments and Therapies',
  description:
    'The treatment categories a clinical discussion may cover, how molecular findings and investigational approaches are weighed, and how options are evaluated against an individual case.',
  canonicalPath: routes.treatments,
})

export default function TreatmentsPage() {
  const { evaluation, safety, closing } = treatments

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={treatments.hero} trail={trail} />

      {/* ── 1. Conventional cancer treatments ───────────────────────
          Six entries through the shared grid. No icons — see the note on
          `conventional.entries` in the data file. */}
      <EntryGrid
        eyebrow={treatments.conventional.eyebrow}
        title={treatments.conventional.title}
        entries={treatments.conventional.entries}
        surface
      />

      {/* ── 2. Molecular and biomarker-guided discussions ───────────── */}
      <Passage content={treatments.molecular} />

      {/* ── 3. Investigational and metabolic approaches ─────────────
          The one dark band in the body of the page. See the component —
          these are warnings, not services. */}
      <CautionBand content={treatments.caution} />

      {/* ── 4. Local and interventional procedures ─────────────────── */}
      <Passage content={treatments.procedures} surface />

      {/* ── 5. Supportive and integrative therapies ────────────────── */}
      <Passage content={treatments.supportive} />

      {/* ── 6. How treatment options are evaluated ──────────────────
          Numbered because the source numbers them. Seven into three
          leaves two cells short, so the last item stretches to close the
          row — the same fix as `LabelledList` and the case-review
          stages. */}
      <section className="bg-primary-subtle py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-4xl">
            <SectionHeader
              eyebrow={evaluation.eyebrow}
              title={evaluation.title}
            />
            <p className="mt-5 text-base leading-relaxed text-neutral-700">
              {evaluation.intro}
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {evaluation.items.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                direction="up"
                delay={index * 60}
                className={`flex gap-4 border-t border-border-brand pt-5 ${
                  index === evaluation.items.length - 1
                    ? 'sm:col-span-2 lg:col-span-3'
                    : ''
                }`}
              >
                {/* `aria-hidden` because the ordered list already carries
                    the sequence for assistive technology — the numeral is
                    repeating what <ol> says. */}
                <span
                  aria-hidden
                  className="font-display text-xl font-bold leading-none text-accent-dark"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="max-w-(--measure) text-base leading-relaxed text-neutral-700">
                  {item}
                </span>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── 7. Important safety information ─────────────────────────
          ⚠️  ITS OWN PANEL, AND BEFORE THE CALL TO ACTION. This is the
          only place on the site that tells a patient outright not to act
          on what they have read. It must not be shortened, softened,
          folded into another section, or moved below the CTA. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal>
            <div className="flex gap-5 rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-7 sm:gap-6 sm:p-9">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Icon name="alert-triangle" className="size-5" />
              </span>

              <div>
                <h2 className="font-display text-xl font-bold leading-snug text-text">
                  {safety.title}
                </h2>
                <p className="mt-3 max-w-4xl text-base font-bold leading-relaxed text-text">
                  {safety.body}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Closing ─────────────────────────────────────────────────
          The shared panel, same as every other page. Only a heading and
          one action are supplied for this one; the lead paragraphs, the
          second action and the note under the buttons render when AOHC
          sends copy for them. */}
      <ClosingSection
        content={{ title: closing.title, primaryCta: closing.cta }}
      />

      {/* ── Medical disclaimer ────────────────────────────────────────
          ⚠️  LAST, AND NOT OPTIONAL. Quiet by design — a legal notice
          rather than something to sell — but it must not be dropped or
          shortened to tidy the foot of the page. Both strings come from
          `lib/site.ts` so they stay identical everywhere they appear. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal className="border-t border-border pt-8">
            <h2 className="text-base font-bold text-text">Medical Disclaimer</h2>
            <div className="mt-3 max-w-4xl space-y-3">
              <p className="text-sm leading-relaxed text-text-muted">
                {MEDICAL_DISCLAIMER}
              </p>
              <p className="text-sm leading-relaxed text-text-muted">
                {EMERGENCY_NOTICE}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
