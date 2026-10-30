import Link from 'next/link'
import type { NamedEntry } from '@/types'
import { slugify } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * An index of named entries, each a heading and one or two paragraphs.
 *
 * SHARED BY `/cancer-types` AND `/treatments-and-therapies`, which list the
 * same shape of thing: ten diagnoses a review may consider, and six
 * conventional treatments a discussion may cover. It started as `TypeIndex`
 * on the cancer-types page and was generalised rather than copied when the
 * second page needed it.
 *
 * TWO LAYOUTS, ONE SET OF RECORDS. `/treatments-and-therapies` uses the
 * plain ruled variant: two columns, a rule above each entry, the whole text
 * in place. `/cancer-types` passes `boxed` and gets the supplied
 * reference's arrangement instead — a grid of icon cards with a "Learn
 * more" on each, over the same entries set out in full beneath them.
 *
 * ⚠️  NOTHING HERE LINKS OFF THE PAGE, AND THAT IS NOT A STYLING CHOICE.
 * Both drafts say a topic becomes a service page only after AOHC confirms
 * it accepts and assesses that cancer type, or that the treatment is
 * available. `routes.cancerType(slug)` and `routes.treatment(slug)` resolve
 * for every entry and not one of those pages is written; the hero's nine
 * cancer-type chips pointed at exactly those and were nine dead links until
 * they were removed. See the notes at the top of `src/data/cancer-types.ts`
 * and `src/data/treatments-page.ts`.
 *
 * THE NAME IS SET IN THE DISPLAY FACE AT `text-xl`, not as a bold label.
 * A dozen entries of body-sized bold over body-sized regular is a wall of
 * grey — the shift of face and size is what lets a reader scan for their
 * own diagnosis or a named treatment, which is the only way anyone uses
 * these sections.
 *
 * ENTRIES ARE NOT ALL THE SAME LENGTH, and `icon` is optional: the cancer
 * types each carry one, the treatments do not, because only two of the six
 * had an honest match in the icon set and a half-iconed grid reads as a
 * mistake. Nothing here may assume either is present.
 */
export function EntryGrid({
  eyebrow,
  title,
  entries,
  surface = false,
  boxed = false,
}: {
  eyebrow: string
  title: string
  entries: NamedEntry[]
  /** `true` puts the section on white rather than the warm page colour. */
  surface?: boolean
  /**
   * The supplied reference's arrangement: a grid of icon cards carrying a
   * name and a "Learn more", with every entry set out in full below them.
   *
   * ⚠️  "LEARN MORE" GOES TO THE ENTRY FURTHER DOWN THIS PAGE, NOT TO A
   * PAGE OF ITS OWN. There is no page of its own — see the warning above —
   * and a button that 404s is worse than no button. Anchoring it keeps the
   * reference's shape, gives the reader the thing the button promises, and
   * leaves exactly one line to change when the per-topic pages exist:
   * swap `#${slugify(entry.name)}` for `routes.cancerType(slug)`.
   *
   * THE CARDS CARRY NO PROSE, WHICH IS WHY THEY CAN RUN FOUR ACROSS. An
   * earlier version put the whole entry in the card and had to drop to
   * three columns, because a 40-word paragraph runs eleven lines in a
   * 300px box. Splitting the index from the detail is what buys both the
   * four-up grid and the full text.
   */
  boxed?: boolean
}) {
  /* Shared by both layouts so the two can never disagree about where a
     "Learn more" points or what the menu's anchors have to match. */
  const anchor = (entry: NamedEntry) => slugify(entry.name)

  const detail = (
    <ul
      className={`grid gap-x-14 gap-y-10 sm:grid-cols-2 ${boxed ? 'mt-14' : 'mt-12'}`}
    >
      {entries.map((entry, index) => (
        <Reveal
          as="li"
          key={entry.name}
          id={anchor(entry)}
          direction="up"
          delay={(index % 2) * 60}
          /* ⚠️  THE ID IS A LINK TARGET, NOT DECORATION. The Cancer Care
             menu builds every one of its entries as `#${slugify(name)}`
             against this same helper, and so does the card above it —
             change how the id is derived and both scroll nowhere,
             silently. `scroll-mt-28` clears the fixed header, which would
             otherwise sit on top of the heading the reader was sent to. */
          className="scroll-mt-28 border-t border-border pt-6"
        >
          {/* ⚠️  THE ICON IS ALWAYS BESIDE THE NAME, NEVER INSTEAD OF IT.
              It is there so someone scanning for their own diagnosis can
              find the row without reading every heading; it is not an
              illustration of the organ and is not accurate enough to be
              read as one. See the block comment above the cancer-type
              markers in `Icon.tsx`.

              `shrink-0` on the chip and `min-w-0` on the heading: "Liver
              Cancer and Cancer Involving the Liver" is long enough to
              squash a flex sibling allowed to shrink. */}
          {entry.icon ? (
            <div className="flex items-center gap-3.5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent-dark">
                <Icon name={entry.icon as IconName} className="size-5.5" />
              </span>

              <h3 className="min-w-0 font-display text-xl font-bold leading-snug text-text">
                {entry.name}
              </h3>
            </div>
          ) : (
            <h3 className="font-display text-xl font-bold leading-snug text-text">
              {entry.name}
            </h3>
          )}

          <div className="mt-3 space-y-3">
            {entry.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-sm leading-relaxed text-neutral-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      ))}
    </ul>
  )

  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        <Reveal className="max-w-4xl">
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>

        {/* ── The card index, `boxed` only ───────────────────────────
            Four across at `xl`. Ten entries leave a ragged last row of
            two, which is what an index of short cards should do —
            stretching the tail to close the row would make two of them
            twice the width of the rest for no reason. */}
        {boxed ? (
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {entries.map((entry, index) => (
              <Reveal
                as="li"
                key={entry.name}
                direction="up"
                delay={(index % 4) * 60}
                className="flex"
              >
                {/* The whole card is the link, so the target is the card
                    and not a 90px strip of text at the bottom of it. */}
                <Link
                  href={`#${anchor(entry)}`}
                  className="group flex w-full flex-col rounded-(--radius-card) border border-border bg-surface p-6 shadow-(--shadow-card) transition duration-300 hover:-translate-y-0.5 hover:border-border-brand hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {entry.icon ? (
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-(--radius-md) bg-accent-subtle text-accent-dark">
                      <Icon name={entry.icon as IconName} className="size-5.5" />
                    </span>
                  ) : null}

                  <h3
                    className={`font-display text-lg font-bold leading-snug text-text ${
                      entry.icon ? 'mt-4' : ''
                    }`}
                  >
                    {entry.name}
                  </h3>

                  {/* `mt-auto` pins this to the floor of the card, so the
                      row of "Learn more" lines up across cards whose
                      names run to one line or three. */}
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-accent-dark">
                    Learn more
                    <Icon
                      name="chevron-right"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : null}

        {detail}
      </Container>
    </section>
  )
}
