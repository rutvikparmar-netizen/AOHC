import type { AboutContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * "Integrative, Individualised, and Patient-Centred" — the three principles.
 *
 * FULL-WIDTH RULED ROWS, NOT THREE COLUMNS. Each principle runs to three
 * paragraphs; side by side that is a wall of small type in three narrow
 * measures. As rows the number and title hold the left of the page and the
 * argument runs at a readable width on the right, which is how a numbered
 * clause in a document is set and exactly what these are.
 *
 * The rule above each row and the numeral do the grouping, so there is no
 * border, fill or shadow anywhere in the section.
 */
export function PrinciplesSection({
  content,
}: {
  content: AboutContent['philosophy']
}) {
  return (
    <section className="bg-surface py-(--spacing-section)">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <SectionHeader eyebrow={content.eyebrow} title={content.title} />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5 lg:self-end">
            <p className="max-w-(--measure) text-base leading-relaxed text-neutral-700">
              {content.intro}
            </p>
          </Reveal>
        </div>

        <ol className="mt-14">
          {content.principles.map((principle, index) => (
            <Reveal
              as="li"
              key={principle.title}
              direction="up"
              delay={index * 70}
              className="grid gap-5 border-t-2 border-accent pt-7 lg:grid-cols-12 lg:gap-14 [&+li]:mt-12"
            >
              <div className="lg:col-span-4">
                <span
                  aria-hidden
                  className="block font-display text-5xl font-bold leading-none text-brand-teal-300"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-h3 font-bold leading-snug text-text">
                  {principle.title}
                </h3>
              </div>

              <div className="max-w-(--measure) space-y-4 lg:col-span-8">
                {principle.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-base leading-relaxed text-neutral-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
