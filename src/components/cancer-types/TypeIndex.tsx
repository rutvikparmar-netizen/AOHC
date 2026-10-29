import type { CancerTypesContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "Cancer Types We May Be Asked to Review" — the ten entries.
 *
 * ⚠️  NOT LINKS, AND NOT CARDS. `routes.cancerType(slug)` exists and every
 * one of those pages 404s, so linking ten entries from here would break ten
 * links; worse, the supplied draft says a cancer type becomes a clinical
 * service page "only after confirming that the team accepts and assesses
 * that cancer type", and a link implies that confirmation. The full text of
 * each entry is already here, so a reader is not being kept from anything.
 * See the notes at the top of `src/data/cancer-types.ts`.
 *
 * TWO COLUMNS, WHICH TEN DIVIDES INTO EXACTLY. That is the reason for two
 * rather than three: ten in a three-column grid leaves a third of the last
 * row empty, which is the ragged-tail problem `LabelledList` had to be
 * rebuilt to fix. Two also gives each entry about 640px, so these
 * forty-word paragraphs run three or four lines instead of seven.
 *
 * THE NAME IS SET IN THE DISPLAY FACE AT `text-xl`, not as a bold label.
 * Ten entries of body-sized bold over body-sized regular is a wall of
 * grey — the shift of face and size is what lets a reader scan for their
 * own diagnosis, which is the only way anyone uses this section.
 *
 * ENTRIES ARE NOT ALL THE SAME LENGTH. Blood Cancers and Other Cancer Types
 * have one paragraph where the rest have two, so nothing here may assume a
 * fixed count or set a fixed height.
 */
export function TypeIndex({
  content,
}: {
  content: CancerTypesContent['index']
}) {
  return (
    <section className="bg-surface py-(--spacing-section)">
      <Container>
        <Reveal className="max-w-4xl">
          <SectionHeader eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <ul className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {content.types.map((type, index) => (
            <Reveal
              as="li"
              key={type.name}
              direction="up"
              delay={(index % 2) * 60}
              className="border-t border-border pt-6"
            >
              <h3 className="font-display text-xl font-bold leading-snug text-text">
                {type.name}
              </h3>

              <div className="mt-3 space-y-3">
                {type.body.map((paragraph) => (
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
