import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { faqsPage } from '@/data/faqs-page'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { ClosingSection } from '@/components/home/ClosingSection'
import { Container } from '@/components/ui/Container'
import { FaqList } from '@/components/ui/FaqList'
import { Icon } from '@/components/ui/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'

/**
 * FREQUENTLY ASKED QUESTIONS — `/faqs`
 *
 * THE ROUTE ALREADY EXISTED. `routes.faqs` has been declared since the
 * routes file was written and resolved to a 404 until now.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE EMERGENCY ANSWER IS NOT IN AN ACCORDION. Every other question on
 * this page is a `<details>` row that opens on a tap, which is right for
 * twenty questions and wrong for exactly one of them: "what should I do if
 * my condition suddenly worsens" is the only instruction on this site that
 * someone may need to act on within the hour, and a reader in that state is
 * not opening rows to look for it. It is lifted out of its group and set
 * above the lot, in the same accent panel the safety warnings use
 * elsewhere. Its answer still appears in the Safety group below, so the
 * structured data and the group stay complete.
 *
 * ⚠️  GROUPED, NOT ONE LONG LIST. Twenty rows in a single accordion is a
 * list nobody reads to the end of. The five headings are the draft's own.
 *
 * `FaqList` is `<details>`/`<summary>` with no JavaScript, so every answer
 * is in the HTML whether or not the page hydrated — searchable with Ctrl-F,
 * printable, and readable by a crawler. For a page whose job is answering a
 * frightened person's questions, content that only exists after hydration
 * is the wrong trade.
 *
 * ⚠️  THE `FAQPage` NODE CARRIES EVERY QUESTION, FLATTENED. Google shows
 * these as a rich result, so an answer that drifts from the page drifts in
 * the search listing too — edit the data file, never one or the other.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'FAQs' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Questions people ask about Art of Healing Cancer — what integrative cancer care means, what a review can and cannot promise, which medical records are needed, travelling for treatment, and when to seek urgent care instead.',
  canonicalPath: routes.faqs,
})

/** The one answer that is lifted out of its accordion. */
const EMERGENCY_QUESTION = 'What should I do if my condition suddenly worsens?'

export default function FaqsPage() {
  const { groups, closing } = faqsPage

  /* Flattened for the rich result: one `FAQPage` node for the whole page,
     in the draft's order. */
  const allItems = groups.flatMap((group) => group.items)
  const emergency = allItems.find((i) => i.question === EMERGENCY_QUESTION)

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail), faqSchema(allItems)]} />

      <PageHero content={faqsPage.hero} trail={trail} />

      <section className="py-(--spacing-section)">
        <Container>
          {/* ── The emergency answer, out in the open ──────────────────
              See the note at the top of this file. If the question is
              ever renamed in the data, `EMERGENCY_QUESTION` stops
              matching and this panel simply disappears — the answer is
              still in its group below, so the page degrades to "no
              emphasis" rather than to a crash or a blank. */}
          {emergency ? (
            <Reveal>
              <div className="flex items-start gap-4 rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-6 sm:gap-5 sm:p-7">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Icon name="alert-triangle" className="size-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold leading-snug text-text">
                    {emergency.question}
                  </h2>
                  <p className="mt-2 text-base font-bold leading-relaxed text-text">
                    {emergency.answer}
                  </p>
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* ── The groups ─────────────────────────────────────────────
              Each heading is a real `<h2>` above its own accordion, so
              the page has an outline a screen reader can jump through
              rather than twenty sibling rows. */}
          <div className="mt-12 space-y-12 lg:mt-14 lg:space-y-14">
            {groups.map((group, index) => (
              <Reveal key={group.title} delay={index * 60}>
                <h2 className="font-display text-h3 font-bold tracking-[-0.02em] text-text">
                  {group.title}
                </h2>
                <FaqList items={group.items} className="mt-5" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingSection
        content={{ title: closing.title, primaryCta: closing.cta }}
      />
    </>
  )
}
