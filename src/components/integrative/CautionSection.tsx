import type { IntegrativeCareContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "A Careful Approach to Emerging or Non-Standard Therapies".
 *
 * ⚠️  THIS IS A WARNING SECTION, NOT A SERVICE SECTION. It names no therapy
 * AOHC provides and promises nothing. Anyone adding a treatment name, a
 * price, a photograph or a call to action here has turned the most cautious
 * passage on the site into an advertisement for exactly the thing it is
 * warning about. The seven items are questions a clinician should ask, not
 * steps in a process AOHC runs.
 *
 * ON DARK, AND DELIBERATELY THE HEAVIEST THING ON THE PAGE. A reader who has
 * come this far is someone actively considering a non-standard therapy, and
 * the surrounding sections are warm and light. The band stops the page.
 *
 * THE LEAD IS QUOTED, NOT MOVED. "The existence of a biological rationale,
 * laboratory result, or early study does not establish that a treatment is
 * safe or effective for a particular patient" is the single most important
 * sentence on the page, so it is set large — and it is still in `body`
 * where the supplied copy puts it, so the prose reads whole. Same device as
 * the about page's "what we do not promise".
 *
 * THE ITEMS ARE NUMBERED, which the supplied copy does not do. They are a
 * checklist a clinician works through rather than a set of equal bullets,
 * and numbering them is the one thing that makes seven short lines look
 * like an assessment instead of a feature list.
 */
export function CautionSection({
  content,
}: {
  content: IntegrativeCareContent['caution']
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-teal-950 py-(--spacing-section) text-white">
      <div
        aria-hidden
        className="absolute -left-40 bottom-0 -z-10 size-[40rem] rounded-full bg-brand-teal-800/35 blur-3xl"
      />

      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="lg:col-span-5">
            <span className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-teal-200">
              <Icon name="alert-triangle" className="size-5" />
            </span>

            <p className="mt-7 text-eyebrow uppercase text-brand-teal-300">
              {content.eyebrow}
            </p>

            <h2 className="mt-4 font-display text-h2 font-bold tracking-[-0.02em] text-white">
              {content.title}
            </h2>
          </Reveal>

          <Reveal direction="right" delay={80} className="lg:col-span-7">
            <div className="max-w-(--measure) space-y-5">
              {content.body.map((paragraph) =>
                paragraph === content.lead ? (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="border-l-2 border-brand-teal-400 pl-5 font-display text-xl font-bold leading-snug text-white"
                  >
                    {paragraph}
                  </p>
                ) : (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-base leading-relaxed text-brand-teal-100"
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <p className="text-base font-bold leading-snug text-white">
            {content.itemsIntro}
          </p>
        </Reveal>

        {/* Seven into three leaves two cells empty on the last row, so the
            last item stretches to close it — the same fix as `LabelledList`,
            and for the same reason: a ragged tail here reads as a section
            that failed to load. */}
        <ol className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              direction="up"
              delay={index * 60}
              className={`flex gap-4 border-t border-white/15 pt-5 ${
                index === content.items.length - 1
                  ? 'sm:col-span-2 lg:col-span-3'
                  : ''
              }`}
            >
              <span
                aria-hidden
                className="font-display text-xl font-bold leading-none text-brand-teal-400"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="max-w-(--measure) text-base leading-relaxed text-brand-teal-100">
                {item}
              </span>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="mt-12 flex max-w-4xl gap-4 border-t border-white/15 pt-7 text-base leading-relaxed text-brand-teal-100">
            <Icon name="info" className="mt-1 size-5 shrink-0 text-brand-teal-300" />
            {content.outro}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
