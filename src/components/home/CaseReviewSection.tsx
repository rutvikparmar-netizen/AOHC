import type { HomeContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * "From Medical Records to Informed Decisions" — the five stages of a case
 * review, set as an editorial sequence.
 *
 * ⚠️  NOT RENDERED THROUGH `ProcessPanels`. That component is the expanding
 * image accordion used for the treatment approach further down: it is built
 * around one photograph per stage and shows one stage at a time. These five
 * have no imagery in the supplied copy, and the point of the section is that
 * there IS an order, which a reader should take in at once.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THIRD LAYOUT, AND THE FIRST WITH NO BOX AROUND ANYTHING.
 *
 *   1. Five pale badges on a hairline. Thin and unfinished: numbers barely
 *      legible at 14px on `primary-subtle`, the rule all but invisible,
 *      one- and two-line headings throwing the baselines out.
 *   2. Five bordered cards. Legible, but by then the page was wall-to-wall
 *      bordered rectangles and this was five more of them.
 *
 * What carries the sequence now is a rule and a numeral per column — a
 * 2px accent rule across the top, the stage number set large in the display
 * serif beneath it. No border, no fill, no shadow. It reads as a sequence
 * because five ruled columns in a row read as a sequence, which is how a
 * newspaper has always done it, and it costs nothing to align.
 *
 * ⚠️  THE RULE IS A `border-t` ON EACH COLUMN, never one span behind the row.
 * Twice it was drawn that way and twice it was wrong, because the last badge
 * is not at the sequence's edge: `right-5` overshot the final marker by 213px
 * at 1440, and `bottom-5` ran 89px down the side of the last paragraph. A
 * border on the element that owns it cannot be misaligned.
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

        <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {content.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              direction="up"
              delay={index * 70}
              className="border-t-2 border-accent pt-5"
            >
              <span
                aria-hidden
                className="block font-display text-5xl font-bold leading-none text-brand-teal-300"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* `lg:min-h-12` is two lines of this heading. Four of the five
                  titles wrap and "Review and adapt" does not, so without a
                  floor its description started 23px above the other four. */}
              <h3 className="mt-5 text-base font-bold leading-snug text-text lg:min-h-12">
                {step.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-neutral-700">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
