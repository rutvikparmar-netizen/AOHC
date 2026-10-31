import type { InternationalPatientsContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "How the Process Works" — the six stages of an international enquiry.
 *
 * ⚠️  THE NUMBER IS THE ARRAY INDEX, NOT A STORED LABEL. The supplied copy
 * writes "Step 1: Initial Enquiry", but holding the numeral in the data as
 * well as the order is how a page comes to show "Step 4" twice after someone
 * inserts a stage. See `EnquiryStep` in `src/types/content.ts`.
 *
 * ⚠️  THE CAUTIONS ARE NOT STYLING. Two of the six stages carry one, and both
 * are instructions a reader can be harmed by missing — do not email a full
 * oncology record before the team has given you a secure route, and do not
 * travel without a confirmed plan. They are accent-bordered, bold and inside
 * the step they belong to rather than collected at the foot of the section,
 * because the foot is past the point each one exists to catch. The limiting
 * sentences on steps 3 and 4 are ordinary paragraphs on purpose: four
 * callouts in six cards and none of them reads as one.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ONE FULL-WIDTH CARD PER STAGE, NOT A GRID OF SIX. The stages are wildly
 * uneven — step 5 is a single sentence and step 2 carries a seven-document
 * list — and in a three-across grid that is one tall cell beside two
 * near-empty ones, repeatedly. Stacked, each card is as tall as its own
 * content and nothing has to be padded to match a neighbour. It is also the
 * order a reader actually moves through: this is a sequence to follow, not a
 * set of options to compare.
 *
 * THE NUMERAL AND TITLE TAKE FOUR OF TWELVE COLUMNS, the prose takes eight.
 * A heading above the body inside a card this wide leaves the whole right
 * half of the first row empty, which is the same failure `Passage` and
 * `PageHero` were built around.
 *
 * ⚠️  NO CONNECTOR BETWEEN THE CARDS, and no progress bars either. The home
 * page's case-review stages animate a fill per card because they are five
 * short, equal stages read at a glance; these are six paragraphs of
 * instructions read one at a time as they scroll in, and the scrolling IS the
 * progression. A line drawn down the 20px gap between two shadowed white
 * cards reads as a seam in the page, not as a sequence — and the connector
 * drawn behind a row of stages overshot its last marker twice on the home
 * page before it was abandoned there too.
 *
 * NO STAGGER ON THE REVEAL. Full-width cards enter the viewport one at a
 * time, so each already arrives on its own; an `index * 90` delay would mean
 * the sixth card waits half a second after it is already on screen.
 */
export function JourneySteps({
  content,
}: {
  content: InternationalPatientsContent['process']
}) {
  return (
    <section className="py-(--spacing-section)">
      <Container>
        <Reveal className="max-w-4xl">
          <SectionHeader eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <ol className="mt-12 space-y-5 lg:mt-14">
          {content.steps.map((step, index) => (
            <Reveal as="li" key={step.title} direction="up">
              <article className="rounded-(--radius-card) border border-border-brand bg-surface p-6 shadow-(--shadow-card) transition duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) sm:p-8">
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    {/* The same gradient numeral as the home page's case
                        review stages, so the two sequences read as the same
                        device. `aria-hidden` because the <ol> already carries
                        the order for assistive technology. */}
                    <span
                      aria-hidden
                      className="block bg-linear-to-br from-accent-dark to-brand-teal-400 bg-clip-text font-display text-4xl font-bold leading-none tracking-[-0.03em] text-transparent"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-text">
                      {step.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="max-w-(--measure) space-y-4">
                      {step.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 32)}
                          className="text-base leading-relaxed text-neutral-700"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Only step 2 has a list. Two columns inside an
                        eight-column card gives each document name a line of
                        its own without running the short ones across half
                        the page. */}
                    {step.items?.length ? (
                      <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {step.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <Icon
                              name="check"
                              className="mt-1 size-4.5 shrink-0 text-accent"
                            />
                            <span className="text-sm leading-relaxed text-neutral-700">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {/* ⚠️  AFTER THE LIST, NEVER BEFORE IT. This is the
                        sentence that turns seven required documents back
                        into a guide — "the required documents depend on the
                        case" — and it only does that work once the reader
                        has seen the list and started counting what they do
                        not have. */}
                    {step.outro ? (
                      <p className="mt-5 max-w-(--measure) text-base leading-relaxed text-neutral-700">
                        {step.outro}
                      </p>
                    ) : null}

                    {/* ⚠️  THE SAFETY PANEL. Accent teal rather than amber or
                        red because there is no warning colour in the token
                        set and inventing one here would put a colour on this
                        site that means nothing anywhere else — the icon and
                        the weight carry the register, exactly as in
                        `ChecklistSection`. It must not be shortened,
                        unbolded, or moved out of its step. */}
                    {step.caution ? (
                      <div className="mt-6 flex gap-3.5 rounded-(--radius-xl) border border-accent bg-accent-subtle p-4 sm:gap-4 sm:p-5">
                        <Icon
                          name="alert-triangle"
                          className="mt-0.5 size-5 shrink-0 text-accent-dark"
                        />
                        {/* Full width: a notice in a box of its own does
                            not take the reading measure — see
                            `ChecklistSection`. */}
                        <p className="text-sm font-bold leading-relaxed text-text">
                          {step.caution}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
