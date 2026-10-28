import type { AboutContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * "Understand. Review. Discuss. Plan." — the four steps, on brand dark.
 *
 * THE ONE DARK BAND IN THE MIDDLE OF THE PAGE. About is long and almost all
 * of it is reading; without a break somewhere near the centre the warm and
 * white sections run together into one undifferentiated column. The steps
 * are the right thing to put there because they are the shortest and most
 * scannable block on the page — a reader who has been reading for a while
 * gets four short lines and some air.
 *
 * Same ruled-and-numbered device as the principles above and the home page's
 * case review, inverted for dark: a `brand-teal-400` rule, the numeral in
 * the display face, no container. Repeating one device across a page is what
 * makes it read as a system rather than as a sequence of ideas.
 */
export function StepsBand({ content }: { content: AboutContent['process'] }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-teal-950 py-(--spacing-section) text-white">
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 -z-10 size-[36rem] rounded-full bg-brand-teal-800/35 blur-3xl"
      />

      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <SectionHeader
              onDark
              eyebrow={content.eyebrow}
              title={content.title}
            />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5 lg:self-end">
            <p className="max-w-(--measure) text-base leading-relaxed text-brand-teal-100">
              {content.intro}
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              direction="up"
              delay={index * 70}
              className="border-t-2 border-brand-teal-400 pt-5"
            >
              <span
                aria-hidden
                className="block font-display text-5xl font-bold leading-none text-brand-teal-400"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Two lines of this heading, so the four descriptions start on
                  one baseline whether the title wraps or not. */}
              <h3 className="mt-5 font-display text-xl font-bold leading-snug text-white lg:min-h-14">
                {step.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-brand-teal-100">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="mt-12 flex max-w-(--measure) gap-3 border-t border-white/15 pt-6 text-sm leading-relaxed text-brand-teal-100">
            <Icon
              name="info"
              className="mt-0.5 size-4 shrink-0 text-brand-teal-300"
            />
            {content.note}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
