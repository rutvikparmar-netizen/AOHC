import Image from 'next/image'
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
        {/* ⚠️  A PICTURE IN THE HEADER ROW, because what follows it is the
            longest unbroken run of prose on the page: three principles of
            three paragraphs each, with no border, fill or shadow anywhere
            in the section by design. That restraint is right for the rows
            and was wrong for the section as a whole — AOHC's note was that
            the page is all text, and this was the worst of it.

            The frame is stock and should be replaced when AOHC sends one
            of their own. It is reused here rather than retired: it was
            freed when they asked for their own photograph to take its
            place in "Why a personalised approach matters". */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <SectionHeader eyebrow={content.eyebrow} title={content.title} />
            <p className="mt-6 max-w-(--measure) text-base leading-relaxed text-neutral-700">
              {content.intro}
            </p>
          </Reveal>

          <Reveal direction="right" delay={80} className="lg:col-span-5">
            {/* A declared ratio rather than `lg:h-full`: the row's other
                column is a heading and one sentence, so a stretched slot
                has nothing to measure against and falls back to whatever
                proportions the file happens to have. */}
            <div className="aspect-16/10 overflow-hidden rounded-(--radius-3xl) bg-surface-subtle lg:aspect-4/3">
              <Image
                src="/images/scan-discussion.jpg"
                alt="A patient seated at a desk while a scan is displayed on a laptop beside them"
                width={1400}
                height={788}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="size-full object-cover"
              />
            </div>
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
