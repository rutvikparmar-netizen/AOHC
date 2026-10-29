import type { TitledPassage } from '@/types'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * A titled run of prose: heading on the left, paragraphs on the right.
 *
 * HEADING BESIDE THE PROSE RATHER THAN ABOVE IT, which is the whole reason
 * this exists as a component. Two or three paragraphs held to a reading
 * measure under a full-width heading leave the right half of the row empty —
 * the same failure `PageHero` and the home page's opening statement were
 * rebuilt to fix. Split across a 5/7 grid, the measure is what the column is
 * rather than a cap inside a wider one.
 *
 * SHARED BY FOUR SECTIONS ACROSS THREE PAGES: the molecular, procedures and
 * supportive passages on `/treatments-and-therapies`, clinical
 * responsibility on `/about-us/our-doctors`, and support for caregivers on
 * `/international-patients`. It was a local helper on the treatments page and
 * a hand-copy of the same JSX on the doctors page; the third use is what
 * moved it here, the same way `TypeIndex` became `EntryGrid`.
 *
 * `subtitle` is the supplied sub-heading where a draft has one — only the
 * treatments page's molecular and investigational sections do.
 */
export function Passage({
  content,
  surface = false,
}: {
  content: TitledPassage
  /** `true` puts the section on white rather than the warm page colour. */
  surface?: boolean
}) {
  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="lg:col-span-5">
            <SectionHeader eyebrow={content.eyebrow} title={content.title} />
          </Reveal>

          <Reveal direction="right" delay={80} className="lg:col-span-7">
            {content.subtitle ? (
              <h3 className="font-display text-xl font-bold leading-snug text-text">
                {content.subtitle}
              </h3>
            ) : null}

            <div
              className={`max-w-(--measure) space-y-5 ${content.subtitle ? 'mt-5' : ''}`}
            >
              {content.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-base leading-relaxed text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
