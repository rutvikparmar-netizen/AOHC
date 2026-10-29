import Image from 'next/image'
import Link from 'next/link'
import type { HomeContent, PillarItem } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "Connecting Different Perspectives Around One Patient" — the four strands
 * of the integrative approach, as a bento of full-bleed image tiles.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * FOURTH LAYOUT. The first three were variations on the same idea and all of
 * them were rejected, which is the signal that the idea was the problem:
 *
 *   1. Bordered cards, image on top, icon on its own row. 700px each.
 *   2. The same cards with a fixed image band and the icon beside the title.
 *   3. No card: the image with the title over it, the description below on
 *      the bare page. Cleaner, still four identical rectangles in a 2x2.
 *
 * Each of those put the picture and the words in separate boxes stacked one
 * above the other, four times, in a regular grid. THE TILE IS THE PICTURE
 * NOW — the whole strand lives inside one frame, with the copy set over a
 * scrim at its foot — and the four tiles are different sizes, so the eye
 * moves through them instead of scanning a table.
 *
 * ON DARK, which is what makes glass read as glass. The frosted icon chip,
 * the hairline borders and the scrims all need something behind them; over
 * white they were grey smudges. It also gives the long warm middle of this
 * page a break, and it is the hero's own treatment — the most confident
 * thing on the site, previously used in exactly one place.
 *
 * THE BENTO IS 3+2 THEN 2+3 at `lg`, which is the smallest asymmetry that
 * reads as deliberate. Equal halves read as a table; a single huge tile plus
 * three small ones makes three of the four strands look like footnotes, and
 * these four are of equal clinical weight.
 *
 * ⚠️  THE IMAGES ARE DETAIL SHOTS, NOT TREATMENT PHOTOGRAPHS, and that is a
 * decision rather than what the stock library happened to have. See the note
 * on `approach.pillars` in `src/data/home.ts`: literal pictures of people
 * receiving cancer treatment are confronting for the audience most likely to
 * be reading this, and the available sets of them carry visible NIH/NCI
 * branding that would imply an affiliation AOHC does not have.
 *
 * THE FOUR IMAGES ARE NOW AOHC'S OWN AND ARE ONE SET. They replaced four
 * unrelated stock shots that a tone layer in `StrandTile` had been holding
 * together; that layer is gone with them, and the note where it used to sit
 * explains why it must not be reinstated over the current images.
 */

/** `span` is the tile's share of the 5-column bento row at `lg`. */
function StrandTile({ pillar, span }: { pillar: PillarItem; span: string }) {
  return (
    <Link
      href={pillar.href ?? '#'}
      className={`group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-(--radius-3xl) border border-white/10 p-7 transition-colors hover:border-white/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-8 lg:min-h-[27rem] ${span}`}
    >
      {pillar.image ? (
        <Image
          src={pillar.image.src}
          alt={pillar.image.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="-z-20 object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-105"
        />
      ) : null}

      {/* ⚠️  THERE IS NO TONE LAYER HERE ANY MORE, AND IT SHOULD NOT COME
          BACK WHILE THE CURRENT IMAGES ARE IN PLACE.

          One used to sit between the photograph and the scrim: a teal
          `mix-blend-color` at 55% with the image desaturated under it. It
          was never a styling flourish — the four photographs were then
          four unrelated stock shots in four colour worlds (an ice-blue
          infusion line, a magenta pipette on navy, an orange cardigan,
          lime-green nails on hospital blue) and the filter was the only
          thing making them read as one set.

          AOHC has since supplied four images that already share a palette,
          so the filter would now tint an already-blue set twice and flatten
          what little colour they have. If someone later swaps one tile's
          image for something from elsewhere, the mismatch returns — and the
          fix then is to match the set or replace all four, not to put the
          filter back over the top. */}

      {/* Nearly solid at the foot where the copy is, clearing by the top so
          the photograph still reads as a photograph. Two stops are not
          enough — a linear ramp over this much text greys the middle of the
          picture out. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-teal-950 from-20% via-brand-teal-950/75 via-60% to-brand-teal-950/15"
      />

      <span className="mb-5 flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-colors group-hover:border-accent group-hover:bg-accent">
        <Icon name={pillar.icon as IconName} className="size-5" />
      </span>

      <h3 className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
        {pillar.title}
      </h3>

      <p className="mt-3 max-w-prose text-sm leading-relaxed text-brand-teal-100 sm:text-base">
        {pillar.description}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
        Learn more
        <Icon
          name="arrow-right"
          className="size-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}

/* 3+2 on the first row, 2+3 on the second. */
const SPANS = ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3']

export function ApproachSection({
  content,
}: {
  content: HomeContent['approach']
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-teal-950 py-(--spacing-section) text-white">
      {/* One soft light, so the flat dark does not read as a block of ink. */}
      <div
        aria-hidden
        className="absolute -right-32 top-0 -z-10 size-[44rem] rounded-full bg-brand-teal-800/40 blur-3xl"
      />

      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="text-eyebrow uppercase text-brand-teal-300">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-h2 font-bold tracking-[-0.02em] text-white">
              {content.title}
            </h2>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-5 lg:self-end">
            <p className="max-w-(--measure) text-base leading-relaxed text-brand-teal-100">
              {content.intro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-5">
          {content.pillars.map((pillar, index) => (
            <Reveal
              as="li"
              key={pillar.title}
              direction="up"
              delay={index * 70}
              className={`flex ${SPANS[index] ?? 'lg:col-span-5'}`}
            >
              <StrandTile pillar={pillar} span="w-full" />
            </Reveal>
          ))}
        </ul>

        {/* The §7 / checklist-item-30 sentence. "Not every treatment or test
            is appropriate for every patient" is the most important line in
            this section and the one a reader is most likely to skip, so it
            is set on a rule rather than dropped into small print. */}
        <Reveal>
          <p className="mt-12 flex max-w-4xl gap-4 border-t border-white/15 pt-7 text-base leading-relaxed text-brand-teal-100">
            <Icon
              name="info"
              className="mt-1 size-5 shrink-0 text-brand-teal-300"
            />
            {content.outro}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
