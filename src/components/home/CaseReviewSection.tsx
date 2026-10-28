import type { HomeContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * "From Medical Records to Informed Decisions" — the five stages of a case
 * review, as a numbered sequence on a rule.
 *
 * ⚠️  NOT RENDERED THROUGH `ProcessPanels`, and not by accident. That
 * component is the expanding image accordion used for the treatment approach
 * further down the page: it is built around one photograph per stage and
 * shows one stage at a time. These five stages have no imagery in the
 * supplied copy, and they are a sequence a reader needs to take in at once —
 * the point of the section is that there IS an order. Two accordions on one
 * page would also read as the same section twice.
 *
 * ⚠️  THE CONNECTING RULE IS ONE SEGMENT PER STAGE, NOT ONE SPAN BEHIND THE
 * WHOLE SEQUENCE — and the obvious single span is wrong in both directions.
 * Measured, before this was fixed:
 *
 *   - Horizontally, inset `left-5 right-5`. `right-5` is 20px from the ROW's
 *     right edge, but the last badge sits at the LEFT of the last column, so
 *     at 1440 the rule ran to x=1380 while the badge it was meant to stop at
 *     was centred on x=1167. 213px of line trailing into nothing.
 *
 *   - Vertically, inset `top-5 bottom-5`. `bottom-5` is 20px above the end of
 *     the LAST STAGE, not above its badge, and the badge sits at the top of a
 *     three-line description — so the spine ran 89px past the final marker and
 *     down the side of its text.
 *
 * Each stage therefore draws its own segment and the last stage draws none,
 * which is what makes the rule stop where the sequence does. The offsets are
 * the grid gaps, so each segment lands exactly on the next badge: `-right-6`
 * for `lg:gap-6` across, `-bottom-8` for `gap-8` down. Change a gap and these
 * change with it or the rule breaks again.
 *
 * `ring-4 ring-background` IS WHAT PUNCHES THE RULE OUT behind each badge, so
 * this section has to stay on the page colour. On `bg-surface` the rings would
 * show as five off-white discs on a white band.
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

        <ol className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-6">
          {content.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              direction="up"
              delay={index * 70}
              className="relative flex gap-5 lg:block"
            >
              {/* Both segments come BEFORE the badge in the DOM, so the badge
                  and its ring paint over them rather than under. */}
              {index < content.steps.length - 1 ? (
                <>
                  <span
                    aria-hidden
                    className="absolute -bottom-8 left-5 top-5 border-l border-border lg:hidden"
                  />
                  <span
                    aria-hidden
                    className="absolute -right-6 left-5 top-5 hidden border-t border-border lg:block"
                  />
                </>
              ) : null}

              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-subtle font-display text-sm font-bold text-primary-dark ring-4 ring-background">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="lg:mt-5">
                <h3 className="text-base font-bold leading-snug text-text">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-(--measure) text-sm leading-relaxed text-neutral-700">
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
