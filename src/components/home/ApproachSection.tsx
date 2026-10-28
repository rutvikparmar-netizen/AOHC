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
 * ──────────────────────────────────────────────────────────────────────────
 * THIRD LAYOUT, AND THE FIRST WITHOUT A CARD.
 *
 *   1. Bordered cards with a 3:2 photograph on top and an icon on its own
 *      row beneath it. 700px tall each, and the icon said nothing the
 *      picture had not.
 *   2. The same cards with a fixed image band and the icon moved up beside
 *      the title. Shorter, but still four bordered rectangles on a page that
 *      had become wall-to-wall bordered rectangles.
 *
 * THE PICTURE IS THE CARD NOW. Each strand is a photograph with a teal scrim
 * running up from its foot, the icon in a frosted disc and the title set over
 * it in the display serif — the hero's own language, which is the most
 * confident thing on the site and was being used in exactly one place. The
 * description sits on the page below it with no border, no fill and no
 * shadow, so the section reads as four images rather than four containers.
 *
 * ⚠️  THE IMAGE IS NO LONGER OPTIONAL FURNITURE. The title is set over it, so
 * hiding the picture below `sm` — which the previous layout did, to save
 * ~800px on a phone — would now hide the heading with it. It is short on
 * phones instead: `h-44` rising to `h-64`. That costs a phone roughly 640px
 * against the version that dropped them, which is the price of the strand
 * being legible as one object at every width.
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
        {/* Title and lead share a row rather than stacking, so the heading
            never sits alone against an empty right half. */}
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

        <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-14">
          {content.pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.title} direction="up" delay={index * 70}>
              <Link
                href={pillar.href ?? '#'}
                className="group block rounded-(--radius-2xl) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <div className="relative overflow-hidden rounded-(--radius-2xl) bg-surface-subtle">
                  {pillar.image ? (
                    <Image
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      width={pillar.image.width}
                      height={pillar.image.height}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-44 w-full object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-105 sm:h-52 lg:h-64"
                    />
                  ) : null}

                  {/* Heavy at the foot where the words are, clear at the top
                      so the photograph still reads as a photograph. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-brand-teal-950/92 via-brand-teal-950/35 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-3.5 p-5 sm:p-6">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-colors group-hover:bg-accent group-hover:border-accent">
                      <Icon name={pillar.icon as IconName} className="size-5" />
                    </span>
                    <h3 className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-5 max-w-(--measure) text-base leading-relaxed text-neutral-700">
                  {pillar.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark">
                  Learn more
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* The §7 / checklist-item-30 sentence, in the same panel the other
            two sections use. "Not every treatment or test is appropriate for
            every patient" is the most important line here and the one a
            reader is most likely to skip. */}
        <Reveal>
          <div className="mt-14 flex gap-4 rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-6 sm:gap-5 sm:p-7">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary-dark">
              <Icon name="info" className="size-5" />
            </span>
            <p className="max-w-5xl self-center text-base leading-relaxed text-neutral-700">
              {content.outro}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
