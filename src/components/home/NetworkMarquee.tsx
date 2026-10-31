import Image from 'next/image'
import type { HomeContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "Our care network" — the partner marks, on a strip that runs continuously.
 *
 * ⚠️  EVERY MARK HERE IS A PUBLIC CLAIM THAT THE TWO ORGANISATIONS WORK
 * TOGETHER. They were supplied by AOHC and are reproduced exactly as given:
 * a third party's trademark is the one asset on this site that must never
 * be recoloured, redrawn or regenerated, and nothing may be added that AOHC
 * has not confirmed a relationship with. See `NetworkPartner` in
 * `src/types/content.ts`.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * IT REUSES THE PRESS STRIP'S CSS RATHER THAN ITS COMPONENT. `.marquee` and
 * `.marquee-track` in `globals.css` already solve the seamless loop — the
 * track holds its contents twice and travels exactly half its own width —
 * and already carry the pause on hover, the pause on focus-within and the
 * hold until the section is scrolled to. All of that comes for free.
 *
 * `PressMarquee` itself does not fit: those are mastheads sized by height
 * against the warm page with `mix-blend-multiply`, half of them linking to
 * articles. These are ten logos of wildly different shapes that need a card
 * each, and none of them links anywhere.
 *
 * ⚠️  THE CARD IS WHAT MAKES TEN SHAPES LOOK LIKE ONE SET. The press strip
 * sizes by height and needed a hand-declared `stacked` flag the moment a
 * three-line lockup arrived. Here every mark is centred by `object-contain`
 * inside a fixed box, so a circle, a wide wordmark and a stacked lockup all
 * occupy the same footprint with no per-logo tuning — which is also why the
 * supplied set being a uniform 252x126 canvas costs nothing either way.
 *
 * NO LINKS, DELIBERATELY. A logo that goes nowhere is honest; a logo
 * linking to a partner's home page invites a reader mid-decision to leave
 * the site, and linking some but not others reads as a ranking.
 */
export function NetworkMarquee({
  content,
}: {
  content: HomeContent['network']
}) {
  const lap = (duplicate: boolean) =>
    content.items.map((partner) => (
      <li
        key={`${partner.name}-${duplicate ? 'b' : 'a'}`}
        /* The duplicate lap is scenery: the first already named every
           organisation, and a screen reader should hear each once. */
        aria-hidden={duplicate || undefined}
        className="flex shrink-0 items-center"
      >
        {/* The lift pairs with `.marquee:hover`, which already stops the
            strip — so pointing at a card holds it still and raises it,
            rather than raising something that keeps sliding away. Same
            card hover as the rest of the site. */}
        <span className="flex h-24 w-44 items-center justify-center rounded-(--radius-xl) border border-border bg-surface p-5 shadow-(--shadow-xs) transition duration-300 hover:-translate-y-0.5 hover:border-border-brand hover:shadow-(--shadow-card-hover) sm:h-28 sm:w-52">
          <Image
            src={partner.logo.src}
            alt={duplicate ? '' : partner.logo.alt}
            width={partner.logo.width}
            height={partner.logo.height}
            className="max-h-full w-auto object-contain"
          />
        </span>
      </li>
    ))

  return (
    <section className="bg-background py-(--spacing-section)">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            intro={content.intro}
            align="center"
          />
        </Reveal>
      </Container>

      {/* ⚠️  INSIDE THE CONTAINER, ON REQUEST — the strip is the same width
          as the heading above it and every other section on the page, not
          bled to the window. `.marquee` is `overflow: hidden`, so it now
          clips at the container's edge instead of the viewport's and the
          fade masks land on the gutter. */}
      <Container>
        <Reveal className="mt-10 lg:mt-12">
          <div className="marquee">
            <ul className="marquee-track items-center gap-x-5 sm:gap-x-6">
              {lap(false)}
              {lap(true)}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
