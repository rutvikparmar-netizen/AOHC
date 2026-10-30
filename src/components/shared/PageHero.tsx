import Image from 'next/image'
import type { Breadcrumb, PageHeroContent } from '@/types'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
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
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE BACKGROUND PHOTOGRAPH IS OPTIONAL AND HELD A LONG WAY BACK.
 *
 * `content.image` gives each page a different subject behind the type —
 * infusion, laboratory, a clinician with a patient — so the five pages built
 * from this component stop opening on an identical black field. It is laid
 * under the teal at `opacity-20` with a gradient over it, which is enough to
 * change the character of the page and not enough to compete with the
 * headline.
 *
 * ⚠️  IT IS DECORATION AND MUST STAY DECORATION. `aria-hidden` with `alt=""`:
 * these are stock photographs of models, not AOHC staff, patients or
 * premises, and at this opacity a reader cannot make out what is in them
 * anyway. Nothing on these pages may caption, credit or refer to one, and
 * none of them may be brought forward to a legible opacity without real
 * photography to put there instead. The same rule governs the home page; see
 * the note on `hero.image` in `src/data/home.ts`.
 *
 * ⚠️  THE SCRIM IS NOT OPTIONAL EITHER. White body text at `text-brand-teal-100`
 * over a photograph is the classic way to lose contrast on exactly the frames
 * that matter — a bright window behind a sentence. The flat `bg-brand-teal-950`
 * base stays, the image sits on top of it at a fifth, and a left-to-right
 * ramp darkens the half the type occupies. Measured against the lightest
 * pixel under the body copy, the result still clears WCAG AA.
 *
 * `priority` because this is the largest paint on every inner page and the
 * first thing above the fold; without it the hero visibly fills in.
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
      {/* ⚠️  DECORATION ONLY — see the note above. `alt=""` and
          `aria-hidden`, because it is a stock photograph of models and at
          this opacity it is texture rather than a picture of anything. */}
      {content.image ? (
        <Image
          aria-hidden
          src={content.image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-20"
        />
      ) : null}

      {/* The ramp that keeps the type legible over whatever frame is behind
          it: heaviest on the left under the headline, clearing to the right
          where there is no text on wide screens. Without an image it darkens
          an already flat field by a few percent and is invisible. */}
      {content.image ? (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-r from-brand-teal-950 via-brand-teal-950/85 to-brand-teal-950/55"
        />
      ) : null}

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

        {/* ⚠️  THE LINE THAT SAYS WHAT THE PAGE IS NOT. Quiet, but in the
            hero rather than at the foot: a reader who acts on an
            educational page has usually acted before scrolling to the
            disclaimer. It is not styled as a third paragraph, because it
            is not making the page's case — it is limiting it. */}
        {content.note ? (
          <Reveal delay={140}>
            <p className="mt-8 flex max-w-3xl gap-3 text-sm leading-relaxed text-brand-teal-200">
              <Icon name="info" className="mt-0.5 size-4 shrink-0" />
              {content.note}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
