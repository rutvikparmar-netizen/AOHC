import type { FaqItem } from '@/types'
import { faqSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { FaqList } from '@/components/ui/FaqList'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Cta } from '@/components/home/Cta'

/**
 * The questions people ask before they write.
 *
 * SITS DIRECTLY ABOVE THE ENQUIRY FORM, which is the whole point of it. Most
 * of these are the things someone would otherwise put in the message box and
 * then wait days to have answered — where the centre is, whether they can be
 * seen from abroad, whether to attach their scans. Answering them here costs
 * the reader nothing and saves a round trip.
 *
 * THE HEADING COLUMN STAYS PUT WHILE THE ANSWERS SCROLL, on screens tall
 * enough for that to mean anything. The accordion is long; a heading that
 * leaves the screen takes the context with it.
 *
 * THE ACCORDION IS `FaqList`, which is native `<details>`/`<summary>` — no
 * client component, no hydration, and every answer present in the HTML
 * whether or not JavaScript ran. For a page answering a frightened person's
 * questions, content that only exists after hydration is the wrong trade.
 *
 * IT ALSO EMITS `FAQPage` JSON-LD from the same array that renders the list,
 * so the two cannot disagree. Google will not show a rich result for an
 * answer it cannot find on the page, and this makes that impossible by
 * construction.
 */
export function FaqSection({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string
  title: string
  intro: string
  items: FaqItem[]
}) {
  if (items.length === 0) return null

  return (
    <section className="py-(--spacing-section)">
      <JsonLd nodes={[faqSchema(items)]} />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal direction="left" className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

            {/* The answer to "my question is not here" is a person, not a
                longer list. */}
            <p className="mt-8 text-base font-bold text-text">
              Not the question you had?
            </p>
            <p className="mt-2 max-w-(--measure) text-sm leading-relaxed text-neutral-700">
              Send it to the care team and someone will write back.
            </p>
            <Cta kind="expert" className="mt-5" />
          </Reveal>

          <Reveal direction="right" delay={100}>
            <FaqList items={items} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
