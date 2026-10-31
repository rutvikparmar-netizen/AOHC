import Image from 'next/image'
import type { AboutContent, Breadcrumb } from '@/types'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * About page hero.
 *
 * ⚠️  IT HAS TO BE DARK, AND THAT IS NOT A STYLE CHOICE. The site layout
 * renders `<Header variant="overlay" />` for every page: the bar is
 * transparent until you scroll, with a white wordmark and white nav. On the
 * warm page colour all of that disappears. `(site)/layout.tsx` says the
 * alternative is passing a solid header from the page — but the layout owns
 * the header, so the page cannot, and a dark opening panel is the right
 * answer for this page anyway.
 *
 * ⚠️  THE TOP PADDING CLEARS THE FIXED BAR AND IS NOT THE SAME AT EVERY
 * WIDTH, BECAUSE THE BAR IS NOT. On a phone the header is 64px and sits
 * flush at the top, so `pt-24` leaves 32px of air above the breadcrumb.
 * From `lg` the bar also drops by `--gutter` at rest, which is why it needs
 * `pt-44`.
 *
 * It was `pt-36` at every width: 144px against a 64px header, so this page
 * opened on 80px of nothing. These numbers are shared with `PageHero`, which
 * every other inner page uses — change one and change the other, or the
 * about page sits lower than its siblings.
 *
 * FULL BLEED, NOT AN INSET CARD. The home hero is a rounded card floating on
 * the page colour because it holds video; this one holds type, and running it
 * edge to edge keeps the page from opening on a second framed box.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE PHOTOGRAPH IS THE BACKGROUND NOW, NOT A PANEL BESIDE THE TYPE.
 *
 * It used to sit in the right five columns as a 4:5 portrait, which on a
 * phone meant a tall block of building under the standfirst and a hero
 * twice the height it needed to be. Behind the type it matches the six
 * other inner pages, which all take their frame the same way.
 *
 * ⚠️  THIS ONE IS BRIGHTER THAN THE OTHER SIX AND SITS AT A LOWER OPACITY
 * BECAUSE OF IT. The commissioned frames were briefed dark and cool and run
 * at 45 per cent; this is a daylit facade — cream stone, pale wood, white
 * sky — and at 45 it washed the teal out and took the body copy close to
 * the floor. Contrast was measured, not estimated; the figure is in the
 * commit. Re-measure before changing the number or the picture.
 *
 * ⚠️  THE SOURCE IS PORTRAIT (1122x1402) AND THE HERO IS WIDE, so `object-
 * cover` keeps a horizontal band through the middle of the facade. The AOHC
 * sign is not in that band. That is acceptable here only because the same
 * photograph is still shown whole on the home page, where the sign is
 * legible and the building is the subject rather than the backdrop.
 */
export function AboutHero({
  content,
  trail,
}: {
  content: AboutContent['hero']
  trail: Breadcrumb[]
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-teal-950 pb-14 pt-24 text-white lg:flex lg:min-h-[45.5rem] lg:flex-col lg:justify-center lg:pb-24 lg:pt-44">
      {/* ⚠️  DECORATION — `alt=""` and `aria-hidden`. The alt on the record
          stays accurate for a reviewer; the page does not announce it,
          because at this opacity it is texture rather than a picture of
          anything. Same rule as `PageHero`. */}
      <Image
        aria-hidden
        src={content.image.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-25"
      />

      {/* The ramp that keeps the type legible over a daylit facade:
          heaviest on the left under the headline, clearing to the right
          where there is no text on wide screens. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-brand-teal-950 via-brand-teal-950/85 to-brand-teal-950/55"
      />

      {/* A single soft light behind the type, the same device the reach
          section uses, so the flat dark does not read as a block of ink. */}
      <div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-brand-teal-800/40 blur-3xl"
      />

      <Container>
        <Reveal>
          {/* ⚠️  NO EYEBROW ABOVE THE HEADLINE, ON REQUEST, AND THE
              BREADCRUMB IS WHY. "Home › About Us" over an eyebrow reading
              "About us" was the same words twice, 4px apart. Matches
              `PageHero`, which the other six inner pages use. */}
          <Breadcrumbs trail={trail} onDark className="mb-8" />

          <h1 className="max-w-5xl font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
            {content.title}
          </h1>
        </Reveal>

        {/* Under a rule, the same as `PageHero` — with the photograph gone
            from the right columns the standfirst would otherwise float in
            the middle of a very wide, empty row. */}
        <Reveal delay={80} className="mt-10 max-w-3xl border-t border-white/15 pt-8">
          <p className="text-base leading-relaxed text-brand-teal-100 lg:text-lg">
            {content.standfirst}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
