import type { HomeContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "From Medical Records to Informed Decisions" — the five stages of a case
 * review, as cards whose progress bars fill one after another.
 *
 * ⚠️  NOT RENDERED THROUGH `ProcessPanels`. That is the expanding image
 * accordion used for the treatment approach further down: it is built around
 * one photograph per stage and shows one stage at a time. These five have no
 * imagery in the supplied copy, and the point of the section is that there
 * IS an order, which a reader should take in at once.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * SIXTH LAYOUT. The first four were five columns side by side in different
 * paint and were rejected each time; the fifth was a full-width ledger, one
 * row per stage, which fixed the cramping but was asked to be boxed with the
 * sequence actually animating.
 *
 * ⚠️  THREE ACROSS, NOT FIVE, AND THAT IS THE LESSON FROM LAYOUTS 1-4. Five
 * cards in this container are about 246px each: every title wraps to three
 * lines, every description to six, and the type has to shrink to fit — which
 * is what made five stages read as five captions. At three they are about
 * 424px and the copy sits on one or two lines. Five into three leaves one
 * cell short, so the last card stretches to close the row, the same fix as
 * `LabelledList`.
 *
 * THE PROGRESS IS THE POINT, AND IT COSTS NO NEW CSS. Each card carries a
 * track with an accent fill marked `.rule-draw` — an existing utility that
 * holds `scaleX(0)` until an ancestor gains `data-revealed`, then grows from
 * its left edge. `--reveal-delay` is a custom property and therefore
 * inherits, so a bar inside a staggered card already waits its turn; each
 * bar overrides it with a slightly longer delay so the fill lands just after
 * its own card has settled. Stage one fills, then two, then three.
 *
 * ⚠️  NO CONNECTOR BETWEEN THE CARDS, and that is still not coming back.
 * Twice it was drawn as one span behind the whole sequence and twice it
 * overshot, because the last marker is not at the sequence's edge: `right-5`
 * ran 213px past it at 1440 and `bottom-5` ran 89px down the side of the
 * final paragraph. A bar per card cannot overshoot anything, and it survives
 * the cards wrapping to two rows and stacking on a phone, which a connector
 * drawn between columns does not.
 */
export function CaseReviewSection({
  content,
}: {
  content: HomeContent['caseReview']
}) {
  const steps = content.steps

  return (
    <section className="bg-primary-subtle py-(--spacing-section)">
      <Container>
        <Reveal className="max-w-4xl">
          <p className="text-eyebrow uppercase text-primary-dark">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-h2 font-bold tracking-[-0.02em] text-text">
            {content.title}
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1

            return (
              <Reveal
                as="li"
                key={step.title}
                direction="up"
                /* Wide enough apart to read as one-after-another rather
                   than as a single block arriving slightly unevenly. */
                delay={index * 180}
                className={`flex ${isLast ? 'sm:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="flex w-full flex-col rounded-(--radius-card) border border-border-brand bg-surface p-6 shadow-(--shadow-card) transition duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) sm:p-7">
                  {/* The track is always visible so the row reads as five
                      equal stages before anything animates; the fill is
                      what moves. `aria-hidden` because the <ol> already
                      carries the order for assistive technology. */}
                  <span
                    aria-hidden
                    className="block h-1 w-full overflow-hidden rounded-full bg-border-brand"
                  >
                    <span
                      className="rule-draw block h-full w-full rounded-full bg-accent"
                      /* Its own delay rather than the inherited one, so the
                         fill starts just after its card has settled instead
                         of racing it. */
                      style={
                        {
                          '--reveal-delay': `${index * 180 + 160}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </span>

                  <span
                    aria-hidden
                    className="mt-6 block bg-linear-to-br from-accent-dark to-brand-teal-400 bg-clip-text font-display text-4xl font-bold leading-none tracking-[-0.03em] text-transparent"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-text">
                    {step.title}
                  </h3>

                  {/* The stretched card drops the measure cap, the same
                      as a stretched card in `LabelledList`: it has already
                      been widened to close the row, and holding its text
                      to 65ch only moves the empty space from outside the
                      card to inside it. */}
                  <p
                    className={`mt-2.5 text-sm leading-relaxed text-neutral-700 ${
                      isLast ? '' : 'max-w-(--measure)'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
