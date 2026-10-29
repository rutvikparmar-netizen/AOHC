import type { NamedEntry } from '@/types'
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
}: {
  eyebrow: string
  title: string
  entries: NamedEntry[]
  /** `true` puts the section on white rather than the warm page colour. */
  surface?: boolean
}) {
  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        <Reveal className="max-w-4xl">
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>

        <ul className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {entries.map((entry, index) => (
            <Reveal
              as="li"
              key={entry.name}
              direction="up"
              delay={(index % 2) * 60}
              className="border-t border-border pt-6"
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
      </Container>
    </section>
  )
}
