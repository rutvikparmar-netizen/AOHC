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
 * through the grid. The icon is a quiet marker at the head of the row, not
 * a filled disc — seven filled discs in a grid is just a card by another
 * route.
 *
 * `columns` is 2 or 3. Three suits short labels and two suits long ones;
 * both lists here read better at two, where the sentence gets a proper
 * measure instead of breaking after four words.
 */
export function LabelledList({
  items,
  columns = 2,
}: {
  items: LabelledItem[]
  columns?: 2 | 3
}) {
  return (
    <ul
      className={`grid gap-x-12 gap-y-8 sm:grid-cols-2 ${
        columns === 3 ? 'lg:grid-cols-3' : ''
      }`}
    >
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.label}
          direction="up"
          delay={index * 60}
          className="border-t border-border pt-5"
        >
          <div className="flex items-center gap-3">
            <Icon
              name={item.icon as IconName}
              className="size-5 shrink-0 text-accent"
            />
            <h3 className="text-base font-bold leading-snug text-text">
              {item.label}
            </h3>
          </div>

          <p className="mt-2.5 max-w-(--measure) text-sm leading-relaxed text-neutral-700">
            {item.description}
          </p>
        </Reveal>
      ))}
    </ul>
  )
}
