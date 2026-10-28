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
 * `pt-36` is what clears the fixed bar, which also drops by `--gutter` at
 * rest on desktop. Change one and check the other.
 *
 * FULL BLEED, NOT AN INSET CARD. The home hero is a rounded card floating on
 * the page colour because it holds video; this one holds type, and running it
 * edge to edge keeps the page from opening on a second framed box.
 */
export function AboutHero({
  content,
  trail,
}: {
  content: AboutContent['hero']
  trail: Breadcrumb[]
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-teal-950 pb-16 pt-36 text-white lg:pb-24 lg:pt-44">
      {/* A single soft light behind the type, the same device the reach
          section uses, so the flat dark does not read as a block of ink. */}
      <div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-brand-teal-800/40 blur-3xl"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="lg:col-span-7">
            <Breadcrumbs trail={trail} onDark className="mb-8" />

            <p className="text-eyebrow uppercase text-brand-teal-300">
              {content.eyebrow}
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              {content.title}
            </h1>

            <p className="mt-7 max-w-(--measure) text-lg leading-relaxed text-brand-teal-100">
              {content.standfirst}
            </p>
          </Reveal>

          <Reveal direction="right" delay={100} className="lg:col-span-5">
            {/* `aspect-4/5` on the one photograph in the repo that is
                actually of AOHC rather than a stock model. */}
            <div className="aspect-4/5 overflow-hidden rounded-(--radius-3xl) bg-brand-teal-900">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={content.image.width}
                height={content.image.height}
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
