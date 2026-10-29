import type { Breadcrumb, PageHeroContent } from '@/types'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The dark, type-only hero at the top of an inner page.
 *
 * ⚠️  IT HAS TO BE DARK, AND THAT IS NOT A STYLE CHOICE. `(site)/layout.tsx`
 * renders `<Header variant="overlay" />` for every route: the bar is
 * transparent until you scroll, with a white wordmark and white nav. On the
 * warm page colour all of that disappears. The layout's own note says the
 * alternative is passing a solid header from the page — but the layout owns
 * the header, so the page cannot.
 *
 * `pt-36` is what clears the fixed bar, which also drops by `--gutter` at
 * rest on desktop. Change one and check the other.
 *
 * NO PHOTOGRAPH, WHICH IS WHY THE BODY IS TWO COLUMNS. `AboutHero` puts a
 * picture in the right five columns; this one has nothing to put there, and
 * a headline over a single measured paragraph leaves the right half of the
 * row empty — the exact failure the home page's opening statement was
 * rebuilt to fix. Running the title wide and setting the body as columns
 * under a rule uses the width instead.
 *
 * It takes two paragraphs for that reason. One makes the row look short and
 * three turn the hero into a wall of text before the reader has arrived.
 */
export function PageHero({
  content,
  trail,
}: {
  content: PageHeroContent
  trail: Breadcrumb[]
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-teal-950 pb-16 pt-36 text-white lg:pb-20 lg:pt-44">
      {/* One soft light, the same device the about hero and the approach
          bento use, so the flat dark does not read as a block of ink. */}
      <div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-brand-teal-800/40 blur-3xl"
      />

      <Container>
        <Reveal>
          <Breadcrumbs trail={trail} onDark className="mb-8" />

          <p className="text-eyebrow uppercase text-brand-teal-300">
            {content.eyebrow}
          </p>

          <h1 className="mt-4 max-w-5xl font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
            {content.title}
          </h1>
        </Reveal>

        <Reveal
          delay={80}
          className="mt-10 grid gap-x-14 gap-y-5 border-t border-white/15 pt-8 lg:grid-cols-2"
        >
          {content.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-base leading-relaxed text-brand-teal-100 lg:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
