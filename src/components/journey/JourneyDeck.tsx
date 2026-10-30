import type { PatientJourneyContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The seven stages, as a deck of cards that pin and recede as you scroll.
 *
 * ⚠️  THE SEQUENCE IS THE POINT OF THE SECTION, AND THE EFFECT IS HOW IT IS
 * CARRIED. Seven stages in a plain list are seven headings a reader scrolls
 * past; pinned, each one holds the screen on its own, and the one before it
 * is still visible behind — tilted back and dimmed — so "this is the third
 * thing, and these two already happened" is legible without counting. The
 * numerals are there as well, because the depth cue alone is not an
 * accessible way to convey order.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * HOW IT WORKS, AND WHY THERE IS NO JAVASCRIPT.
 *
 * Each card is `position: sticky` at an offset that grows by stage, so card
 * two pins 14px below card one, three 28px below, and so on. That alone
 * produces the stack and works in every browser back to the ones that
 * shipped sticky.
 *
 * The depth comes from `.deck` and `.deck-card` in `globals.css`, which were
 * written for exactly this and were sitting unused: a `perspective` on the
 * container and a `deck-recede` keyframe driven by `animation-timeline:
 * view()`. That is a scroll-driven animation handled on the compositor —
 * no scroll listener, nothing on the main thread, no layout thrash on a
 * long page. A browser without it gets the plain sticky stack: the same
 * layout, flatter.
 *
 * ⚠️  REDUCED MOTION IS HANDLED GLOBALLY AND MUST NOT BE RE-IMPLEMENTED
 * HERE. `globals.css` switches `.deck-card` off outright for anyone who has
 * asked for less motion — a scroll-driven animation has no duration to
 * collapse, so the usual `animation-duration: 0.01ms` would apply the full
 * transform instantly and leave the deck looking broken. The note is in that
 * file next to the rule.
 *
 * ⚠️  THE CARDS ARE OPAQUE, AND THAT IS LOAD-BEARING. They pin on top of one
 * another; a translucent card would show the previous stage's text through
 * the current one, which on a page of clinical instructions is worse than
 * ugly.
 *
 * `scroll-mt` is not needed: nothing links to a stage.
 */
export function JourneyDeck({
  content,
}: {
  content: PatientJourneyContent['stages']
}) {
  const stages = content.items

  return (
    <section className="py-(--spacing-section)">
      <Container>
        <Reveal className="max-w-4xl">
          <SectionHeader eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        {/* `deck` carries the perspective. The bottom padding is what gives
            the last card room to pin before the section ends — without it
            the deck unsticks the moment the final card arrives and the
            whole effect stops one stage early. */}
        <ol className="deck mt-12 pb-[40vh] lg:mt-16">
          {stages.map((stage, index) => (
            <li
              key={stage.title}
              /* The pin offset grows per card so the stack fans rather than
                 hiding each previous card completely. `top` clears the
                 fixed header.

                 ⚠️  `lg:sticky`, NOT `sticky`, AND THAT IS A MEASUREMENT.
                 A sticky element taller than the room below its `top`
                 offset pins with its own bottom below the fold and holds
                 it there — the reader can never reach it. Measured, the
                 tallest card here is 615px on a 360x800 phone against
                 618px of room: a 3px margin, and negative on any shorter
                 handset. At `lg` the cards are 209-240px against 704-788px.
                 Below `lg` this is a plain stacked list, and `globals.css`
                 gates the recede to the same 64rem so the two cannot
                 disagree. */
              className="deck-card mt-5 first:mt-0 lg:sticky"
              style={{
                top: `calc(7rem + ${index * 14}px)`,
                zIndex: index + 1,
              }}
            >
              <article className="rounded-(--radius-2xl) border border-border-brand bg-surface p-7 shadow-(--shadow-card) sm:p-9 lg:p-10">
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    {/* The same gradient numeral as the home page's case
                        review and the international enquiry steps, so the
                        three sequences read as one device. `aria-hidden`
                        because the <ol> already carries the order. */}
                    <span
                      aria-hidden
                      className="block bg-linear-to-br from-accent-dark to-brand-teal-400 bg-clip-text font-display text-5xl font-bold leading-none tracking-[-0.03em] text-transparent"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <p className="mt-4 text-eyebrow uppercase text-primary-dark">
                      Stage {index + 1}
                    </p>

                    <h3 className="mt-2 font-display text-2xl font-bold leading-snug text-text">
                      {stage.title}
                    </h3>
                  </div>

                  <div className="max-w-(--measure) space-y-4 lg:col-span-8">
                    {stage.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="text-base leading-relaxed text-neutral-700"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
