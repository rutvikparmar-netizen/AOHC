import type { TreatmentsContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "Investigational and Off-Label Approaches" and "Metabolic or
 * Repurposed-Medicine Approaches", on one dark band.
 *
 * ⚠️  TWO WARNINGS, NOT TWO SERVICES. Neither topic names a treatment AOHC
 * provides and neither promises anything. Anyone adding a medicine name, a
 * price, a photograph or a call to action here will have turned the most
 * cautious passage on the page into an advertisement for exactly what it
 * warns about — the same rule as `CautionSection` on the integrative-care
 * page, which this is the sibling of.
 *
 * THEY SHARE A BAND BECAUSE THEY ARE THE SAME KIND OF WARNING, and a
 * reader who has reached either is usually weighing a specific proposal
 * someone has already made to them. On dark, and deliberately the heaviest
 * thing on a page that is otherwise warm and light.
 *
 * TWO COLUMNS AT `lg`, so the pair reads as one statement rather than as a
 * section that goes on twice as long as the others. Below that they stack,
 * which is also the order they are written in.
 */
export function CautionBand({
  content,
}: {
  content: TreatmentsContent['caution']
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-teal-950 py-(--spacing-section) text-white">
      <div
        aria-hidden
        className="absolute -left-40 bottom-0 -z-10 size-[40rem] rounded-full bg-brand-teal-800/35 blur-3xl"
      />

      <Container>
        <Reveal>
          <span className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-teal-200">
            <Icon name="alert-triangle" className="size-5" />
          </span>

          <p className="mt-7 text-eyebrow uppercase text-brand-teal-300">
            {content.eyebrow}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {content.topics.map((topic, index) => (
            <Reveal
              key={topic.title}
              direction="up"
              delay={index * 90}
              /* A rule per topic rather than one between them: a divider
                 drawn down the middle disappears the moment the columns
                 stack, and these two have to stay visibly separate on a
                 phone as well. */
              className="border-t border-white/15 pt-7"
            >
              <h2 className="font-display text-2xl font-bold leading-snug tracking-[-0.01em] text-white lg:text-3xl">
                {topic.title}
              </h2>

              {topic.subtitle ? (
                <p className="mt-3 text-base font-bold text-brand-teal-300">
                  {topic.subtitle}
                </p>
              ) : null}

              <div className="mt-5 max-w-(--measure) space-y-4">
                {topic.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-base leading-relaxed text-brand-teal-100"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
