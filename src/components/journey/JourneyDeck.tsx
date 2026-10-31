import type { PatientJourneyContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The seven stages, as a timeline.
 *
 * ⚠️  THIS REPLACED A STICKY CARD DECK, AND THE DECK MUST NOT COME BACK.
 * It was built for an explicit request — "showing the journey like a 3D
 * effect so the user is able to understand this is first, this is second" —
 * and the intent was right while the device was wrong. What it actually did,
 * measured and screenshotted:
 *
 *   • EACH CARD SLICED THE ONE BEFORE IT. The pin offsets grew 14px per
 *     stage, so mid-scroll the incoming card cut the outgoing one through
 *     the middle of a sentence. Stage 2's numeral and first line sat
 *     permanently bisected by stage 3. On a page of clinical instructions
 *     that reads as a rendering fault, not as depth.
 *   • `pb-[40vh]` LEFT A FULL EMPTY SCREEN after the last stage, which it
 *     needed so the final card had room to pin.
 *   • THE PAGE RAN 5.9 SCREENS for seven stages of two short paragraphs,
 *     because pinning spends scroll distance to show one card at a time.
 *   • THE CARDS WERE MOSTLY EMPTY — a title in four columns next to two
 *     short paragraphs in eight, inside 40px of card padding.
 *
 * A deck hides what came before behind a sliver; a timeline shows the whole
 * sequence at once with the order drawn down the side of it, which is what
 * the request was asking for. The rail and the numbered nodes carry "first,
 * second, third" without the reader counting, and nothing is occluded.
 *
 * THE ROW SHAPE IS `PrinciplesSection`'S, deliberately. That component sets
 * numbered clauses with multi-paragraph bodies — the same shape as these —
 * as ruled rows with the number and title in four columns and the prose in
 * eight. Reusing it means the two sequences on the site read as one device,
 * and it is also the layout that does not leave 40 per cent of a card
 * empty.
 *
 * ⚠️  THE MOTION IS `direction="tilt"`, WHICH IS WHERE THE 3D REQUEST
 * SURVIVES. `globals.css` defines it as a card lying back in space and
 * rising to flat — a real perspective transform, applied once as each stage
 * arrives rather than held for the length of a scroll. Reduced motion is
 * handled globally for `[data-reveal]`; do not re-implement it here.
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

        <ol className="mt-12 lg:mt-16">
          {stages.map((stage, index) => (
            <Reveal
              as="li"
              key={stage.title}
              direction="tilt"
              delay={index * 60}
              className="relative pb-10 pl-14 last:pb-0 sm:pl-20"
            >
              {/* ⚠️  THE RAIL IS DRAWN PER STAGE AND OMITTED ON THE LAST,
                  not as one line down the whole list. A single absolute
                  rail is less markup and was what this had — but it spans
                  the list, so it ran on past stage seven's node and down
                  the side of its paragraphs, trailing off into nothing. A
                  connector that belongs to the stage ABOVE it stops the
                  sequence exactly where the sequence stops.

                  Decoration, so hidden from the accessibility tree: the
                  <ol> and the "Stage n" label already state the order, and
                  a line cannot be read aloud. It starts at the node's
                  bottom edge — `top-10` against `size-10`, `sm:top-12`
                  against `sm:size-12` — so the two never overlap. */}
              {index < stages.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-5 top-10 w-px bg-border-brand sm:left-6 sm:top-12"
                />
              ) : null}

              {/* The node sits on the rail: `size-10` centred at `left-5`
                  means the circle starts at 0 and its centre is exactly
                  where the connector runs. */}
              <span
                aria-hidden
                className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-primary-subtle font-display text-sm font-bold text-accent-dark sm:size-12 sm:text-base"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="grid gap-4 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <p className="text-eyebrow uppercase text-primary-dark">
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
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
