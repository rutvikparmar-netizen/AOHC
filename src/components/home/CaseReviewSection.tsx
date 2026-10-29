import type { HomeContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "From Medical Records to Informed Decisions" — the five stages of a case
 * review, as a full-width ledger.
 *
 * ⚠️  NOT RENDERED THROUGH `ProcessPanels`. That is the expanding image
 * accordion used for the treatment approach further down: it is built around
 * one photograph per stage and shows one stage at a time. These five have no
 * imagery in the supplied copy, and the point of the section is that there
 * IS an order, which a reader should take in at once. Two accordions on one
 * page would also read as the same section twice.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * FIFTH LAYOUT, AND THE FIRST ONE THAT IS NOT FIVE COLUMNS SIDE BY SIDE.
 *
 *   1. Five pale badges on a hairline. Thin and unfinished — 14px numbers on
 *      `primary-subtle`, a rule that all but vanished, baselines out.
 *   2. Five bordered cards. Legible, but five more rectangles on a page that
 *      had become wall-to-wall rectangles.
 *   3. Ruled columns with a 2px accent rule and a 48px numeral. Clean, and
 *      still five identical columns of small grey text.
 *   4. 72px numerals with a gradient painted through them, on a flat tint.
 *      The numerals were good. Everything under them was not.
 *
 * All four were the same idea with different paint, and all four were
 * rejected, so the idea was the problem. Five columns forces every stage
 * into a sixth of the page: the titles wrapped to two lines, the
 * descriptions ran four or five lines at about forty characters, and the
 * type had to shrink to `text-base` headings over `text-sm` body to fit. At
 * that size five stages read as five captions.
 *
 * A ROW PER STAGE GIVES EACH ONE THE FULL WIDTH. The numeral anchors the
 * left margin, the title sits up at `text-2xl` in the display face instead
 * of being the same weight as a label, and the description gets a real
 * measure on one or two lines. It also reads top to bottom, which is how a
 * sequence is read — the five-column version asked the eye to travel left to
 * right across a page whose every other section runs downward.
 *
 * THE NUMERALS KEPT THEIR GRADIENT from layout four. It was the one part of
 * that attempt worth carrying forward.
 *
 * ⚠️  NO CONNECTING SPINE DOWN THE LEFT, and it is not coming back. Twice it
 * was drawn as one span behind the whole sequence and twice that was wrong,
 * because the last marker is not at the sequence's edge: `right-5` overshot
 * it by 213px at 1440, and `bottom-5` ran 89px down the side of the final
 * paragraph. Each row rules its own top edge, which cannot overshoot
 * anything.
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

        <ol className="mt-12 lg:mt-16">
          {content.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              direction="up"
              delay={index * 70}
              /* The first rule is the heavier one so the sequence has a
                 top edge rather than appearing to continue from the
                 heading above it. */
              className={`grid gap-x-10 gap-y-2 py-7 lg:grid-cols-12 lg:items-baseline lg:gap-y-0 lg:py-9 ${
                index === 0
                  ? 'border-t-2 border-accent'
                  : 'border-t border-border-brand'
              }`}
            >
              {/* `aria-hidden` because the gradient needs `text-transparent`
                  to show through `bg-clip-text`, and because the ordered
                  list already carries the order for assistive technology —
                  the numeral is decoration repeating what <ol> says. */}
              <span
                aria-hidden
                className="block bg-linear-to-br from-accent-dark to-brand-teal-400 bg-clip-text font-display text-5xl font-bold leading-none tracking-[-0.03em] text-transparent lg:col-span-2 lg:text-6xl"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="font-display text-xl font-bold leading-snug text-text lg:col-span-4 lg:text-2xl">
                {step.title}
              </h3>

              <p className="max-w-(--measure) text-base leading-relaxed text-neutral-700 lg:col-span-6">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
