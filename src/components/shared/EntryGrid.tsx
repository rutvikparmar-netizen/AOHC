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
 * plain ruled variant: two columns, a rule above each entry. `/cancer-types`
 * passes `boxed` and gets the same entries as cards with an icon chip.
 * Either way each entry is rendered ONCE.
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
 * ⚠️  EVERY ENTRY CARRIES AN `id`, AND THE CANCER CARE MENU DEPENDS ON IT.
 * That menu builds each of its entries as `#${slugify(name)}` from the same
 * records and the same helper. Change how the id is derived, or render an
 * entry without one, and the menu scrolls nowhere — silently.
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
   * Cards with a tinted icon chip, three across, instead of ruled rows.
   *
   * ⚠️  THE DESCRIPTION LIVES IN THE CARD. AN EARLIER VERSION SPLIT THIS
   * INTO AN INDEX AND A DETAIL LIST — compact cards with a "Learn more"
   * above the same ten entries written out in full — and every name and
   * every box appeared twice on one page. One rendering per entry.
   *
   * ⚠️  THERE IS NO "LEARN MORE", AND THAT FOLLOWS FROM THE ABOVE. With the
   * description in the card there is nothing further on the page to send a
   * reader to, and `/cancer-types/<slug>` does not exist for any of the ten
   * — a button that 404s is worse than no button. When those pages are
   * written, a link to `routes.cancerType(slug)` belongs at the foot of
   * each card.
   *
   * THREE ACROSS, NOT FOUR. Four columns is right for a box holding two
   * words; these hold two paragraphs, and at four a 40-word entry runs
   * eleven lines in a 300px column.
   */
  boxed?: boolean
}) {
  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        <Reveal className="max-w-4xl">
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>

        <ul
          className={
            boxed
              ? 'mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
              : 'mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2'
          }
        >
          {entries.map((entry, index) => (
            <Reveal
              as="li"
              key={entry.name}
              id={slugify(entry.name)}
              direction="up"
              delay={(index % (boxed ? 3 : 2)) * 60}
              /* `scroll-mt-28` clears the fixed header, which would
                 otherwise sit on top of the heading a menu link sent the
                 reader to. */
              className={`scroll-mt-28 ${
                boxed
                  ? 'flex flex-col rounded-(--radius-card) border border-border bg-surface p-6 shadow-(--shadow-card) transition duration-300 hover:-translate-y-0.5 hover:border-border-brand hover:shadow-(--shadow-card-hover)'
                  : 'border-t border-border pt-6'
              }`}
            >
              {/* ⚠️  THE ICON IS ALWAYS BESIDE OR ABOVE THE NAME, NEVER
                  INSTEAD OF IT. It is there so someone scanning for their
                  own diagnosis can find the entry without reading every
                  heading; it is not an illustration of the organ and is
                  not accurate enough to be read as one. See the block
                  comment above the cancer-type markers in `Icon.tsx`.

                  Boxed: the chip takes its own line, which is the
                  reference's arrangement and the only one that works in a
                  360px card — inline, a long entry name wraps to three
                  lines beside it. The case that forced this was "Liver
                  Cancer and Cancer Involving the Liver", since shortened
                  to "Liver Cancer"; the constraint still holds for the
                  next long name, which is why it has not been relaxed.
                  Ruled: the
                  chip stays beside the name, because a row that opens with
                  a 44px disc on its own line reads as a card that has lost
                  its border.

                  `shrink-0` on the chip and `min-w-0` on the heading: that
                  same long name will squash a flex sibling allowed to
                  shrink. */}
              {entry.icon ? (
                boxed ? (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-(--radius-md) bg-accent-subtle text-accent-dark">
                      <Icon name={entry.icon as IconName} className="size-5.5" />
                    </span>

                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-text">
                      {entry.name}
                    </h3>
                  </>
                ) : (
                  <div className="flex items-center gap-3.5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent-dark">
                      <Icon name={entry.icon as IconName} className="size-5.5" />
                    </span>

                    <h3 className="min-w-0 font-display text-xl font-bold leading-snug text-text">
                      {entry.name}
                    </h3>
                  </div>
                )
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
      </Container>
    </section>
  )
}
