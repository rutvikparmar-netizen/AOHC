import type { ArticleReference, ArticleSection } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Long-form article body — the seven pages migrated from the WordPress site.
 *
 * ⚠️  READING MEASURE, NOT FULL WIDTH, for the same reason `LegalDocument`
 * is measured: these are three thousand words of clinical prose, and a
 * 150-character line is genuinely hard to track. The site's rule that
 * notice panels run full width applies to one- and two-sentence panels,
 * not to this.
 *
 * ⚠️  HEADINGS CARRY NO NUMBERS AND NO EYEBROWS. `LegalDocument` numbers
 * its clauses from the index because a policy is read by jumping between
 * them; an article is read top to bottom, and numbering it would invent a
 * structure the source pages do not have.
 *
 * ⚠️  THE REFERENCE LIST IS AN `<ol>` AND ITS NUMBERS COME FROM THE LIST,
 * never from the data — same reasoning as the legal pages. The G6PD
 * article's prose cites "(15–17)" against its own numbering, so the order
 * of that array is load-bearing: reordering it silently breaks every
 * inline citation on the page. Append, never insert.
 */
/** `On this page` anchors — lower-cased, punctuation dropped, spaces hyphenated. */
function anchorId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function Article({
  lead,
  sections,
  references,
}: {
  lead?: string[]
  sections: ArticleSection[]
  references?: ArticleReference[]
}) {
  /**
   * ⚠️  THE CONTENTS RAIL IS EARNED, NOT DECORATION. Below three top-level
   * headings there is nothing to navigate and the rail becomes furniture;
   * `/ecct` has one section and gets none. Above it, a measured column of
   * prose leaves a third of a 1440 viewport empty, which is the same
   * emptiness the contact page's sidebar was rebuilt to fix.
   */
  const contents = sections.filter((s) => s.title && s.level !== 3)
  const showRail = contents.length >= 3

  return (
    <section className="py-(--spacing-section)">
      <Container>
        <div
          className={
            showRail
              ? 'grid gap-10 lg:grid-cols-12 lg:gap-14'
              : 'max-w-4xl'
          }
        >
          <div className={showRail ? 'min-w-0 lg:col-span-8' : ''}>
          {lead?.length ? (
            <Reveal className="max-w-(--measure) space-y-5">
              {lead.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  /* The lead is set a step larger than the body so the
                     article opens with something, these pages having no
                     standfirst, pull quote or byline to open with. */
                  className="text-lg leading-relaxed text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ) : null}

          <div className="space-y-10 lg:space-y-12">
            {sections.map((section, index) => (
              <Reveal
                key={section.title ?? `section-${index}`}
                delay={Math.min(index, 4) * 50}
                className={lead?.length || index > 0 ? 'mt-10 lg:mt-12' : ''}
              >
                {section.title ? (
                  section.level === 3 ? (
                    <h3 className="font-display text-h4 font-bold leading-snug text-text">
                      {section.title}
                    </h3>
                  ) : (
                    /* `scroll-mt-32` clears the fixed header when the rail
                       jumps here. The site-wide `:target` rule does the
                       same job, but only for the heading that was actually
                       requested — this one is hit repeatedly. */
                    <h2
                      id={anchorId(section.title)}
                      className="scroll-mt-32 font-display text-h3 font-bold leading-snug tracking-[-0.02em] text-text"
                    >
                      {section.title}
                    </h2>
                  )
                ) : null}

                {section.body?.length ? (
                  <div
                    className={`max-w-(--measure) space-y-4 ${section.title ? 'mt-4' : ''}`}
                  >
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
                        key={item.slice(0, 32)}
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
          </div>

          {references?.length ? (
            <Reveal className="mt-14 border-t border-border pt-10 lg:mt-16">
              <h2
                id="references"
                className="scroll-mt-32 font-display text-h4 font-bold leading-snug text-text"
              >
                References
              </h2>

              {/* `break-words` because a bare NCBI URL is one unbreakable
                  token wide enough to push the page sideways on a phone —
                  the same failure the contact page's email caused. */}
              <ol className="mt-5 space-y-3">
                {references.map((reference, index) => (
                  <li
                    key={reference.text.slice(0, 48)}
                    className="flex gap-3 text-sm leading-relaxed text-text-muted"
                  >
                    <span
                      aria-hidden
                      className="w-6 shrink-0 text-right font-semibold tabular-nums text-text-subtle"
                    >
                      {index + 1}.
                    </span>
                    <span className="min-w-0 break-words">
                      {reference.href ? (
                        <a
                          href={reference.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-accent-dark"
                        >
                          {reference.text}
                        </a>
                      ) : (
                        reference.text
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}
          </div>

          {/* ── On this page ───────────────────────────────────────────
              ⚠️  `hidden lg:block`, AND IT IS SECOND IN SOURCE ORDER ON
              PURPOSE. Columns stack in source order, so on a phone this
              would arrive AFTER the article it indexes — a contents list
              you reach by scrolling past everything it lists. There is
              no good place for it on a narrow screen, so it is not
              rendered there at all. Nothing is lost: the headings are
              still headings, and a screen reader lands on them directly.

              It is `aria-hidden` for the same reason — every link in it
              duplicates a heading that assistive technology already
              offers in its own landmarks list. */}
          {showRail ? (
            <aside
              aria-hidden
              className="hidden min-w-0 lg:col-span-4 lg:block"
            >
              <div className="lg:sticky lg:top-28">
                <h2 className="text-eyebrow uppercase text-primary-dark">
                  On this page
                </h2>
                <ul className="mt-4 space-y-px border-l-2 border-border">
                  {contents.map((section) => (
                    <li key={section.title}>
                      <a
                        href={`#${anchorId(section.title as string)}`}
                        className="-ml-0.5 block border-l-2 border-transparent py-2 pl-4 text-sm leading-snug text-text-muted transition-colors hover:border-accent hover:text-accent-dark"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                  {references?.length ? (
                    <li>
                      <a
                        href="#references"
                        className="-ml-0.5 block border-l-2 border-transparent py-2 pl-4 text-sm leading-snug text-text-muted transition-colors hover:border-accent hover:text-accent-dark"
                      >
                        References
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </aside>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
