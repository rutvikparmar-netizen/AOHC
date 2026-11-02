import type { LegalSection } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * A numbered legal document — the privacy policy and the terms of use.
 *
 * ⚠️  NUMBERED FROM THE INDEX, NOT FROM THE DATA. The drafts number their
 * own sections 1–12 and 1–10, and transcribing those numbers into the
 * content would mean renumbering by hand the moment a section is inserted
 * or removed — in a document where a cross-reference to "section 6" has
 * to stay true. The `<ol>` supplies them.
 *
 * ⚠️  THE SECTIONS ARE `<h2>` INSIDE AN `<ol>`, which is deliberate and
 * slightly unusual. A legal document is read by jumping between clauses,
 * so each one needs to be a real heading a screen reader can land on; the
 * list supplies the numbering and the relationship between them. A `<div>`
 * stack would read as continuous prose.
 *
 * ⚠️  NO ACCORDIONS HERE, unlike the FAQ page. A policy that hides its own
 * clauses behind taps is a policy nobody has read, and "I had to expand
 * eight panels to find the retention period" is the opposite of what these
 * two pages are for. Everything is open, in order, printable.
 *
 * READING MEASURE, NOT FULL WIDTH. The notice panels elsewhere on the site
 * fill their boxes because they are one or two sentences; this is long-form
 * prose, where a 150-character line is genuinely hard to track. The two
 * rules do not conflict — they apply to different kinds of text.
 */
export function LegalDocument({ sections }: { sections: LegalSection[] }) {
  return (
    <section className="py-(--spacing-section)">
      <Container>
        <ol className="max-w-4xl space-y-12 lg:space-y-14">
          {sections.map((section, index) => (
            <Reveal as="li" key={section.title} delay={Math.min(index, 4) * 50}>
              <h2 className="font-display text-h3 font-bold leading-snug tracking-[-0.02em] text-text">
                <span aria-hidden className="mr-3 text-accent">
                  {index + 1}.
                </span>
                {section.title}
              </h2>

              {section.body?.length ? (
                <div className="mt-4 max-w-(--measure) space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-base leading-relaxed text-neutral-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {section.items?.length ? (
                <ul className="mt-5 max-w-(--measure) space-y-2.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-relaxed text-neutral-700"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.outro?.length ? (
                <div className="mt-5 max-w-(--measure) space-y-4">
                  {section.outro.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-base leading-relaxed text-neutral-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
