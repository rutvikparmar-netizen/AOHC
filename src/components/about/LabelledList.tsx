import type { LabelledItem } from '@/types'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'

/**
 * A grid of label-and-explanation cards.
 *
 * USED TWICE on the about page — "What May Be Considered?" and "Our
 * Commitment to Patients and Families" — because they are the same thing:
 * a short bold label and a sentence saying what it means. One component
 * rather than two near-identical grids.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THIRD VERSION, AND THE FIRST THAT IS BOXED. The first was a plain grid of
 * ruled rows; the second kept the rules and added an icon chip. Both were
 * rejected as looking like content with no design on it, and both were
 * right to be — a hairline rule over body text is the least a section can
 * do, and on a page that is otherwise prose these two lists had nothing to
 * tell a reader they were a different kind of thing.
 *
 * ⚠️  BOXES HERE DO NOT CONTRADICT "NO BOXES" ON THE HOME PAGE. That
 * instruction was about the home page, where four separate sections had
 * become grids of bordered rectangles and the page read as a catalogue.
 * These are two lists on a long prose page, and they were explicitly asked
 * to be boxed. Do not take this as licence to put cards back on the home
 * page.
 *
 * THE FILL DEPENDS ON WHAT IS BEHIND IT, which is what `onSurface` is for.
 * "What May Be Considered?" sits on the warm page colour, so its cards are
 * white and lift off it. "Our Commitment" sits on a white section, where a
 * white card is invisible and the cards are the warm tint instead. Getting
 * this backwards does not break anything — it just produces a grid of
 * cards you cannot see.
 *
 * ⚠️  THE LAST CARD STILL STRETCHES TO CLOSE ITS ROW. Neither list divides
 * by its column count: five items in three columns leaves one cell empty
 * and seven leaves two. `lastSpan` widens the final card to fill whatever
 * is left, computed per breakpoint and a no-op when the items happen to
 * divide evenly, so adding one to `src/data/about.ts` cannot reopen the
 * hole. A stretched card also turns sideways so it occupies the row it
 * just closed rather than sitting in it as a short paragraph.
 *
 * THE SPANS MUST BE WRITTEN OUT AS WHOLE CLASS NAMES. Tailwind scans source
 * text, so `lg:col-span-${n}` compiles to nothing at all and the grid
 * silently falls back to one column per item.
 */

/** Keyed by how many columns the item must cover. */
const SM_SPAN: Record<number, string> = { 1: '', 2: 'sm:col-span-2' }
const LG_SPAN: Record<number, string> = {
  1: '',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
}

/** How far the final item has to stretch to reach the end of its row. */
function lastSpan(count: number, columns: number): number {
  const remainder = count % columns
  return remainder === 0 ? 1 : columns - remainder + 1
}

export function LabelledList({
  items,
  columns = 3,
  onSurface = false,
}: {
  items: LabelledItem[]
  /** Columns at `lg`. Below that it is always two, then one. */
  columns?: 2 | 3
  /** `true` when the section behind the cards is white rather than warm. */
  onSurface?: boolean
}) {
  const sm = lastSpan(items.length, 2)
  const lg = lastSpan(items.length, columns)

  const card = onSurface
    ? 'border-border bg-surface-subtle'
    : 'border-border bg-surface'

  return (
    <ul
      className={`grid gap-5 sm:grid-cols-2 ${
        columns === 3 ? 'lg:grid-cols-3' : ''
      }`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        /* Only meaningful at `lg`, where the stretch actually happens. */
        const stretched = isLast && columns === 3 && lg > 1

        return (
          <Reveal
            as="li"
            key={item.label}
            direction="up"
            delay={index * 60}
            className={`flex ${
              isLast
                ? `${SM_SPAN[sm] ?? ''} ${columns === 3 ? (LG_SPAN[lg] ?? '') : ''}`
                : ''
            }`}
          >
            {/* `w-full` and a flex column rather than `h-full`: the row
                already stretches every cell to its tallest card, and this
                is what makes the card fill the cell it was given.

                The lift on hover is small on purpose. These are not links
                and nothing happens when you click them, so anything more
                would promise an action that does not exist. */}
            <div
              className={`flex w-full flex-col rounded-(--radius-card) border p-6 shadow-(--shadow-card) transition duration-300 hover:-translate-y-0.5 hover:border-border-brand hover:shadow-(--shadow-card-hover) sm:p-7 ${card}`}
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-accent-subtle text-accent-dark">
                <Icon name={item.icon as IconName} className="size-5" />
              </span>

              <h3 className="mt-5 text-base font-bold leading-snug text-text">
                {item.label}
              </h3>

              {/* ⚠️  A STRETCHED CARD DROPS THE MEASURE CAP, which is the
                  one place on the site where that is right. Everywhere
                  else a sentence capped at `--measure` is the point; here
                  the card has already been widened to close its row, and
                  holding the text to 65ch inside it just moves the empty
                  space from outside the card to inside it.

                  An earlier version set the label and the sentence side by
                  side instead. That filled the width too, but with a
                  128px gutter between a four-word label and its own
                  description, which read as a table row that had wandered
                  into a card. Uncapped, these sentences run to a single
                  line across the card and need no gutter at all. */}
              <p
                className={`mt-2 text-sm leading-relaxed text-neutral-700 ${
                  stretched ? '' : 'max-w-(--measure)'
                }`}
              >
                {item.description}
              </p>
            </div>
          </Reveal>
        )
      })}
    </ul>
  )
}
