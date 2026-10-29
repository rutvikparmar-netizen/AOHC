import type { LabelledItem } from '@/types'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'

/**
 * A list of label-and-explanation pairs, ruled rather than boxed.
 *
 * USED TWICE on the about page — "What May Be Considered?" and "Our
 * Commitment to Patients and Families" — because they are the same thing:
 * a short bold label and a sentence saying what it means. One component
 * rather than two near-identical grids.
 *
 * NO CARDS. A rule above each item groups it for one line where a border,
 * fill and shadow would take four, and it leaves the page colour running
 * through the grid.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE LAST ITEM STRETCHES TO CLOSE THE ROW, AND THAT IS THE WHOLE POINT
 * OF THIS COMPONENT'S SECOND VERSION.
 *
 * Neither list divides by its column count: five items in two columns left
 * the entire right-hand half of the final two rows empty, and seven in three
 * columns left two thirds of the last row empty. Both read as a section that
 * had failed to load rather than as a deliberate ragged edge — which is what
 * "looks weird" meant.
 *
 * `lastSpan` closes it by widening the final item to fill whatever is left,
 * computed per breakpoint because the column count changes. It is a no-op
 * when the items happen to divide evenly, so adding or removing one from
 * `src/data/about.ts` cannot reopen the hole.
 *
 * THE SPANS MUST BE WRITTEN OUT AS WHOLE CLASS NAMES. Tailwind scans source
 * text, so `lg:col-span-${n}` compiles to nothing at all and the grid
 * silently falls back to one column per item.
 *
 * THE ICON IS A CHIP NOW, not a bare 20px glyph beside the label. At that
 * size against a bold label it read as a speck of visual noise; at 40px in
 * a tinted disc it gives each item something to start on and the grid an
 * alignment to hold, which is most of why the old version looked thin.
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
}: {
  items: LabelledItem[]
  /** Columns at `lg`. Below that it is always two, then one. */
  columns?: 2 | 3
}) {
  const sm = lastSpan(items.length, 2)
  const lg = lastSpan(items.length, columns)

  return (
    <ul
      className={`grid gap-x-10 gap-y-10 sm:grid-cols-2 ${
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
            className={`border-t border-border pt-6 ${
              isLast
                ? `${SM_SPAN[sm] ?? ''} ${columns === 3 ? (LG_SPAN[lg] ?? '') : ''}`
                : ''
            }`}
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-accent-subtle text-accent-dark">
              <Icon name={item.icon as IconName} className="size-5" />
            </span>

            {/* A STRETCHED ITEM TURNS SIDEWAYS SO IT ACTUALLY OCCUPIES THE
                ROW IT JUST CLOSED. Widening the cell alone was only half a
                fix: "Respect and Dignity" is the seventh of seven, so it
                spans all three columns, and left stacked it was a short
                paragraph sitting under a rule two thirds of which had
                nothing beneath it — the same hole as before, one row
                shorter. Label and sentence side by side fill it.

                Baseline-aligned rather than top-aligned: these are two runs
                of text that should sit on the same line, and `items-start`
                hangs the sentence a couple of pixels high against the
                heavier label. */}
            <div className={stretched ? 'lg:flex lg:items-baseline lg:gap-12' : ''}>
              <h3
                className={`mt-4 text-base font-bold leading-snug text-text ${
                  stretched ? 'lg:w-80 lg:shrink-0' : ''
                }`}
              >
                {item.label}
              </h3>

              {/* Capped at the reading measure even when stretched — a wide
                  cell should give the sentence air, not run it to 900px. */}
              <p
                className={`mt-2 max-w-(--measure) text-sm leading-relaxed text-neutral-700 ${
                  stretched ? 'lg:mt-4' : ''
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
