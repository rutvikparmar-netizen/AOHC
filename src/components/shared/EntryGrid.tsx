import type { NamedEntry } from '@/types'
import { slugify } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * A two-column index of named entries, each a heading and one or two
 * paragraphs.
 *
 * SHARED BY `/cancer-types` AND `/treatments-and-therapies`, which list the
 * same shape of thing: ten diagnoses a review may consider, and six
 * conventional treatments a discussion may cover. It started as
 * `TypeIndex` on the cancer-types page and was generalised rather than
 * copied when the second page needed it.
 *
 * ⚠️  NOT LINKS, AND NOT CARDS, ON EITHER PAGE. Both drafts say a topic
 * becomes a service page only after AOHC confirms it accepts and assesses
 * that cancer type, or that the treatment is available — and a link
 * implies that confirmation has happened. The full text of every entry is
 * already here, so a reader is not being kept from anything. See the notes
 * at the top of `src/data/cancer-types.ts` and `src/data/treatments.ts`.
 *
 * TWO COLUMNS, WHICH BOTH COUNTS DIVIDE INTO. Ten and six both come out
 * even, so there is no ragged tail to close. Two also gives each entry
 * about 640px, so the forty-word paragraphs run three or four lines
 * instead of seven.
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
   * Cards with a tinted icon chip instead of ruled rows, three across.
   *
   * ⚠️  THE CARDS STILL CARRY THE WHOLE ENTRY, AND THAT IS NOT NEGOTIABLE.
   * The reference layout this was taken from puts a name and a "Learn
   * more" in each box and keeps the substance on a per-topic page. Those
   * pages do not exist — `routes.cancerType(slug)` resolves for all ten
   * and not one is written — so a "Learn more" here would be ten dead
   * ends, which is exactly what the hero's cancer-type chips turned out to
   * be. Keeping the text in the card means nothing is promised and nothing
   * is lost.
   *
   * THREE ACROSS, NOT FOUR, for the same reason. Four columns is right for
   * a box holding two words; these hold two paragraphs, and at four the
   * 40-word entries run eleven lines in a 300px column. When the per-topic
   * pages exist this can become the compact four-across index the
   * reference shows, with the prose moving behind the link.
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
              /* ⚠️  THE ID IS A LINK TARGET, NOT DECORATION. The Cancer Care
                 menu builds every one of its entries as `#${slugify(name)}`
                 against this same helper — change how the id is derived and
                 the menu scrolls nowhere, silently. `scroll-mt-28` clears
                 the fixed header, which would otherwise sit on top of the
                 heading the reader was sent to. */
              className={`scroll-mt-28 ${
                boxed
                  ? 'flex flex-col rounded-(--radius-card) border border-border bg-surface p-6 shadow-(--shadow-card) transition duration-300 hover:-translate-y-0.5 hover:border-border-brand hover:shadow-(--shadow-card-hover)'
                  : 'border-t border-border pt-6'
              }`}
            >
              {/* ⚠️  THE ICON IS ALWAYS BESIDE THE NAME, NEVER INSTEAD OF
                  IT. It is there so someone scanning for their own
                  diagnosis can find the row without reading every
                  heading; it is not an illustration of the organ and is
                  not accurate enough to be read as one. See the block
                  comment above the cancer-type markers in `Icon.tsx`.

                  `shrink-0` on the chip and `min-w-0` on the heading:
                  "Liver Cancer and Cancer Involving the Liver" is long
                  enough to squash a flex sibling allowed to shrink. */}
              {/* Boxed: the chip sits on its own line above the name, which
                  is the reference's arrangement and the only one that works
                  in a 360px card — inline, "Liver Cancer and Cancer
                  Involving the Liver" wraps to three lines beside it. Ruled:
                  the chip stays beside the name, because a row that starts
                  with a 44px disc on its own line reads as a card that has
                  lost its border. */}
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
