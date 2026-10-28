import type { HomeContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * "From Medical Records to Informed Decisions" — the five stages of a case
 * review, as a row of cards led by their numbers.
 *
 * ⚠️  NOT RENDERED THROUGH `ProcessPanels`. That component is the expanding
 * image accordion used for the treatment approach further down: it is built
 * around one photograph per stage and shows one stage at a time. These five
 * have no imagery in the supplied copy, and the point of the section is that
 * there IS an order, which a reader should take in at once. Two accordions on
 * one page would also read as the same section twice.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THIS IS THE SECOND LAYOUT, AND THE CONNECTING RULE IS GONE ON PURPOSE.
 *
 * The first version set five small pale badges on a hairline. It read as
 * thin and unfinished: the numbers were barely legible at 14px on
 * `primary-subtle`, the hairline all but vanished, the one-line and two-line
 * headings threw the baselines out, and the columns ended at five different
 * heights with nothing containing them.
 *
 * The rule was also the single most fragile thing in this file. Twice it was
 * drawn as one span behind the whole sequence and twice that was wrong,
 * because the last badge is not at the sequence's edge: `right-5` measured
 * 20px from the ROW's right edge and overshot the final badge by 213px at
 * 1440, and `bottom-5` measured from the end of the last STAGE and ran 89px
 * down the side of its paragraph. Per-stage segments fixed it, at the cost of
 * two more absolutely positioned elements per card whose offsets had to stay
 * in lockstep with the grid gaps.
 *
 * Cards carry the sequence better than a line did — the numerals are set
 * large in the display face and read as a count — and they give every stage
 * the same height, a border, and a hover state that matches the rest of the
 * page. There is nothing left to misalign.
 */
export function CaseReviewSection({
  content,
}: {
  content: HomeContent['caseReview']
}) {
  return (
    <section className="py-(--spacing-section)">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        {/* The fifth card spans both columns at `sm`, where five items would
            otherwise leave a half-empty final row. */}
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {content.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              direction="up"
              delay={index * 70}
              className="sm:last:col-span-2 lg:last:col-span-1"
            >
              <div className="flex h-full flex-col rounded-(--radius-2xl) border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-(--shadow-card-hover)">
                <span
                  aria-hidden
                  className="font-display text-4xl font-bold leading-none text-brand-teal-200"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* `lg:min-h-12` is two lines of this heading. Four of the
                    five titles wrap and "Review and adapt" does not, so
                    without a floor its description started 23px above the
                    other four and the row read as misaligned. */}
                <h3 className="mt-5 text-base font-bold leading-snug text-text lg:min-h-12">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-neutral-700">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
