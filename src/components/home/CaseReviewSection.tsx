import type { HomeContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "From Medical Records to Informed Decisions" — the five stages of a case
 * review, carried by the numbers.
 *
 * ⚠️  NOT RENDERED THROUGH `ProcessPanels`. That is the expanding image
 * accordion used for the treatment approach further down: it is built around
 * one photograph per stage and shows one stage at a time. These five have no
 * imagery in the supplied copy, and the point of the section is that there
 * IS an order, which a reader should take in at once. Two accordions on one
 * page would also read as the same section twice.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * FOURTH LAYOUT.
 *
 *   1. Five pale badges on a hairline. Thin and unfinished — 14px numbers on
 *      `primary-subtle`, a rule that all but vanished, baselines out.
 *   2. Five bordered cards. Legible, but five more rectangles on a page that
 *      had become wall-to-wall rectangles.
 *   3. Ruled columns with a 2px accent rule and a 48px numeral. Clean, and
 *      still five identical columns of small grey text.
 *
 * The content is five short paragraphs and nothing else — no imagery, no
 * sub-points, no call to action. There is no arrangement of five grey
 * paragraphs that is interesting, so THE NUMBERS DO THE WORK: set at 7xl in
 * the display serif, in solid brand teal rather than a tint, with the stage
 * title tucked against them. At that size they stop being labels and become
 * the thing you see, which is what a stage sequence should be.
 *
 * THE BAND IS A FLAT TINT, not a container. It separates the section from
 * the warm page without putting a border round anything, and it is what the
 * oversized numerals need to sit on — on flat `background` they floated. It
 * was a vertical gradient fading to the page colour at both ends first, and
 * that was so faint the section did not register as a section at all.
 *
 * ⚠️  NO CONNECTING RULE BETWEEN THE STAGES, and it is not coming back.
 * Twice it was drawn as one span behind the whole row and twice that was
 * wrong, because the last marker is not at the sequence's edge: `right-5`
 * overshot it by 213px at 1440, and `bottom-5` ran 89px down the side of the
 * final paragraph. Five numerals in a row already read as a sequence.
 */
export function CaseReviewSection({
  content,
}: {
  content: HomeContent['caseReview']
}) {
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

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {content.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              direction="up"
              delay={index * 70}
              className="group"
            >
              {/* `leading-[0.78]` crops the numeral's own leading so the
                  title sits against the digits rather than a line-box below
                  them — at 72px the default leading leaves 20px of dead
                  space that reads as a mistake.

                  The gradient is painted through the glyphs with
                  `bg-clip-text`, which needs `text-transparent` to show and
                  therefore needs `aria-hidden` to stay honest: the stage
                  number is decoration, and the ordered list already carries
                  the order for assistive technology. */}
              <span
                aria-hidden
                className="block bg-linear-to-br from-accent-dark to-brand-teal-400 bg-clip-text font-display text-7xl font-bold leading-[0.78] tracking-[-0.03em] text-transparent"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Two lines of this heading. Four of the five titles wrap and
                  "Review and adapt" does not, so without a floor its
                  description started 23px above the other four. */}
              <h3 className="mt-6 text-base font-bold leading-snug text-text lg:min-h-12">
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
