import Image from 'next/image'
import Link from 'next/link'
import type { HomeContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * "Connecting Different Perspectives Around One Patient" — the four strands
 * of the integrative approach.
 *
 * TWO COLUMNS, NOT FOUR. These descriptions run to about forty words each;
 * four across would set them to roughly twenty-five characters a line and the
 * section would read as a specification table. Two wide cards give each one a
 * proper measure, and the 2×2 block says "these are considered together"
 * rather than "these happen in order", which a row of four implies.
 *
 * THE SECOND COLUMN ARRIVES AT `md`, NOT `lg`. At `lg` this section measured
 * 3287px on a 768px tablet — four full-width cards with their pictures back,
 * stacked. Two 332px columns there carry a forty-word description comfortably
 * and halve the section.
 *
 * THE WHOLE CARD IS THE LINK. Each strand has somewhere to go, and a reader
 * who has just read forty words about supportive care should not then have to
 * find a 14px "Learn more" to act on it. The visible affordance stays, because
 * a card that is silently clickable is a card nobody clicks.
 *
 * ⚠️  THE IMAGES ARE DETAIL SHOTS, NOT TREATMENT PHOTOGRAPHS, and that is a
 * decision rather than what the stock library happened to have. See the note
 * on `approach.pillars` in `src/data/home.ts`: literal pictures of people
 * receiving cancer treatment are confronting for the audience most likely to
 * be reading this, and the available sets of them carry visible NIH/NCI
 * branding that would imply an affiliation AOHC does not have.
 */
export function ApproachSection({
  content,
}: {
  content: HomeContent['approach']
}) {
  return (
    <section className="bg-surface py-(--spacing-section)">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            intro={content.intro}
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {content.pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.title} direction="up" delay={index * 70}>
              <Link
                href={pillar.href ?? '#'}
                className="group flex h-full flex-col overflow-hidden rounded-(--radius-2xl) border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {/* ⚠️  NO IMAGE ON PHONES, AND THE REASON IS MEASURED. With
                    all four shown this section ran 2921px on a 390px screen —
                    three and a half screens, of which roughly 800px was
                    decorative photography the reader has to scroll past to
                    reach the next section. The same audit is why the hero came
                    down from 1163px. From `sm` up there is width to make the
                    pictures worth their height, so they return.

                    They are decorative, so nothing is lost: the alt text
                    describes a scene, never the strand of care it sits above.
                    Delete `hidden sm:block` to show them everywhere. */}
                {pillar.image ? (
                  <div className="hidden overflow-hidden bg-surface-subtle sm:block">

                    <Image
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      width={pillar.image.width}
                      height={pillar.image.height}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="aspect-16/9 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary-subtle text-primary-dark transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon name={pillar.icon as IconName} className="size-5" />
                  </span>

                  <h3 className="text-lg font-bold text-text">{pillar.title}</h3>

                  <p className="text-sm leading-relaxed text-neutral-700">
                    {pillar.description}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-accent-dark">
                    Learn more
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* THE SAME TREATMENT AS THE OTHER QUALIFYING SENTENCES on this page —
            body size, against a brand rule. "Not every treatment or test is
            appropriate for every patient" is the most important sentence in
            this section and the one a reader is most likely to skip. */}
        <Reveal>
          <p className="mt-10 max-w-(--measure) border-l-2 border-border-brand pl-5 text-base leading-relaxed text-neutral-700">
            {content.outro}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
