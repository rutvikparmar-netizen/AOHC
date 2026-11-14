import type { ReactNode } from 'react'
import Image from 'next/image'
import type { ArticleReference, ArticleSection, ImageAsset } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { TableOfContents, type TocEntry } from '@/components/shared/TableOfContents'

/**
 * Long-form article body — the migrated WordPress articles.
 *
 * LAYOUT, ON AOHC'S BRIEF: a table-of-contents sidebar, and in the main
 * column the featured image (centred, where the article has one), then a
 * short overview, then the whole article.
 *
 * THE MAIN COLUMN FILLS THE SPACE BESIDE THE SIDEBAR (on request). It was
 * capped at 48rem with the sidebar pushed to the far edge, which left a
 * wide empty gutter between them on large screens. Image, overview and
 * prose still share one width so their edges line up. With the 1280px
 * container and a 22rem sidebar the column tops out near 55rem, about 95
 * characters a line — longer than the classic 75, short enough to track.
 *
 * ⚠️  THE REFERENCE LIST IS AN `<ol>` AND ITS NUMBERS COME FROM THE LIST.
 * The G6PD article's prose cites "(15–17)" against its own numbering, so
 * the order of that array is load-bearing: append, never insert.
 */

/**
 * Stable, unique anchor ids for every titled section.
 *
 * ⚠️  TWO CASES BROKE THE NAIVE VERSION, BOTH REAL:
 *   • Hindi headings slug to an empty string, because the slug keeps only
 *     a–z and 0–9 — every heading on the Hindi page got the same id.
 *     They fall back to `section-<n>`.
 *   • The mistletoe article has two headings with identical text (the
 *     second "cancer of the throat" is really about testicular cancer —
 *     see its data file). Duplicates get `-2`, `-3`.
 * Two links to one id means one heading can never be reached from the
 * table of contents.
 */
function anchorIds(sections: ArticleSection[]): (string | null)[] {
  const used = new Map<string, number>()
  return sections.map((s, i) => {
    if (!s.title) return null
    let base = s.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    if (!base) base = `section-${i + 1}`
    const n = (used.get(base) ?? 0) + 1
    used.set(base, n)
    return n === 1 ? base : `${base}-${n}`
  })
}

export function Article({
  lead,
  sections,
  references,
  image,
  overview,
  enquiry,
}: {
  lead?: string[]
  sections: ArticleSection[]
  references?: ArticleReference[]
  image?: ImageAsset
  overview?: string[]
  /**
   * The enquiry form. Desktop: the top of the sidebar, above the sticky
   * table of contents — not sticky itself, because it is taller than the
   * viewport and a sticky block that tall would hide focused fields.
   * Mobile and pages without a table of contents: after the article.
   * Rendered once and placed by the grid, so field ids never repeat.
   */
  enquiry?: ReactNode
}) {
  const ids = anchorIds(sections)

  const toc: TocEntry[] = sections.flatMap((s, i) => {
    const id = ids[i]
    return s.title && id ? [{ id, title: s.title, level: s.level === 3 ? 3 : 2 } as const] : []
  })
  if (references?.length) toc.push({ id: 'references', title: 'References', level: 2 })

  /* One entry is not a table of contents. `/ecct` has a single section
     and gets the full-width column instead. */
  const showToc = toc.length >= 2

  const body = (
    <>
      {/* ── Featured image ─────────────────────────────────────────── */}
      {image ? (
        <Reveal className="overflow-hidden rounded-(--radius-2xl) border border-border bg-surface">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="mx-auto h-auto w-full"
          />
        </Reveal>
      ) : null}

      {/* ── Short overview ─────────────────────────────────────────── */}
      {overview?.length ? (
        <Reveal
          className={`rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-6 sm:p-7 ${
            image ? 'mt-8' : ''
          }`}
        >
          <h2 className="flex items-center gap-2.5 font-display text-h4 font-bold leading-snug text-text">
            <Icon name="info" className="size-5 shrink-0 text-primary-dark" />
            Overview
          </h2>
          <div className="mt-3 space-y-3">
            {overview.map((p) => (
              <p key={p.slice(0, 32)} className="text-base leading-relaxed text-text">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* ── Table of contents on a phone ───────────────────────────────
          The sidebar does not exist below `lg`, and a contents list you
          reach by scrolling past everything it lists is useless — so on
          a phone it sits here, closed, and opens on a tap. */}
      {showToc ? (
        <details className="group/toc mt-8 rounded-(--radius-2xl) border border-border bg-surface lg:hidden">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 font-display text-lg font-bold text-text">
            Table of Contents
            <Icon
              name="chevron-down"
              className="size-5 text-text-subtle transition-transform group-open/toc:rotate-180"
            />
          </summary>
          <div className="border-t border-border px-2 py-3">
            <TableOfContents entries={toc} />
          </div>
        </details>
      ) : null}

      {/* ── The article ────────────────────────────────────────────── */}
      {lead?.length ? (
        <Reveal className="mt-10 space-y-5">
          {lead.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="break-words text-lg leading-relaxed text-neutral-700">
              {paragraph}
            </p>
          ))}
        </Reveal>
      ) : null}

      {sections.map((section, index) => {
        const id = ids[index] ?? undefined
        return (
          <Reveal
            key={id ?? `section-${index}`}
            delay={Math.min(index, 4) * 50}
            className="mt-10 lg:mt-12"
          >
            {section.title ? (
              section.level === 3 ? (
                <h3
                  id={id}
                  lang={section.titleLang}
                  className="scroll-mt-32 font-display text-h4 font-bold leading-snug text-text"
                >
                  {section.title}
                </h3>
              ) : (
                <h2
                  id={id}
                  lang={section.titleLang}
                  className="scroll-mt-32 font-display text-h3 font-bold leading-snug tracking-[-0.02em] text-text"
                >
                  {section.title}
                </h2>
              )
            ) : null}

            <div lang={section.lang} className="break-words">
            {section.body?.length ? (
              <div className={`space-y-4 ${section.title ? 'mt-4' : ''}`}>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-neutral-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {section.figures?.length ? (
              <div
                className={
                  section.figureStyle === 'logo'
                    ? 'mt-6 flex flex-wrap gap-6'
                    : 'mt-6 grid gap-4 sm:grid-cols-2'
                }
              >
                {section.figures.map((f) => (
                  <figure key={f.image.src} className={section.figureStyle === 'logo' ? 'w-28 text-center' : 'min-w-0'}>
                    <Image
                      src={f.image.src}
                      alt={f.image.alt}
                      width={f.image.width}
                      height={f.image.height}
                      sizes={section.figureStyle === 'logo' ? '112px' : '(min-width: 640px) 360px, 100vw'}
                      className={
                        section.figureStyle === 'logo'
                          ? 'mx-auto size-20 rounded-(--radius-xl) object-contain'
                          : 'aspect-[3/2] w-full rounded-(--radius-2xl) object-cover'
                      }
                    />
                    {f.caption ? (
                      <figcaption className="mt-2 text-sm font-semibold text-text">{f.caption}</figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ) : null}

            {section.items?.length ? (
              <ul className="mt-5 space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.slice(0, 32)} className="flex gap-3 text-base leading-relaxed text-neutral-700">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Scrolls inside its own box on a phone rather than widening
                the page. */}
            {section.table ? (
              <div className="mt-6 overflow-x-auto rounded-(--radius-2xl) border border-border">
                <table className="w-full min-w-[32rem] border-collapse text-left text-sm leading-relaxed">
                  <thead className="bg-primary-subtle text-text">
                    <tr>
                      {section.table.head.map((h, i) => (
                        <th key={i} scope="col" className="px-4 py-3 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, r) => (
                      <tr key={r} className="border-t border-border align-top">
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={c} scope="row" className="px-4 py-3 font-semibold text-text">{cell}</th>
                          ) : (
                            <td key={c} className="px-4 py-3 text-neutral-700">{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {section.outro?.length ? (
              <div className="mt-5 space-y-4">
                {section.outro.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-neutral-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
            </div>
          </Reveal>
        )
      })}

      {references?.length ? (
        <Reveal className="mt-14 border-t border-border pt-10 lg:mt-16">
          <h2 id="references" className="scroll-mt-32 font-display text-h4 font-bold leading-snug text-text">
            References
          </h2>
          {/* `break-words` because a bare NCBI URL is one unbreakable token
              wide enough to push the page sideways on a phone. */}
          <ol className="mt-5 space-y-3">
            {references.map((reference, index) => (
              <li key={reference.text.slice(0, 48)} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                <span aria-hidden className="w-6 shrink-0 text-right font-semibold tabular-nums text-text-subtle">
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
    </>
  )

  return (
    <section className="py-(--spacing-section)">
      <Container>
        {showToc ? (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8">
            <div className="min-w-0 lg:row-span-2">{body}</div>

            {enquiry ? <div className="min-w-0 lg:col-start-2 lg:row-start-1">{enquiry}</div> : null}

            {/* ── Sidebar: table of contents ───────────────────────── */}
            <aside className="hidden min-w-0 lg:col-start-2 lg:row-start-2 lg:block">
              <nav
                aria-label="Table of contents"
                className="sticky top-28 rounded-(--radius-2xl) border border-border bg-surface p-5 shadow-(--shadow-xs)"
              >
                <h2 className="px-1 font-display text-lg font-bold text-text">Table of Contents</h2>
                <div className="mt-3">
                  <TableOfContents entries={toc} />
                </div>
              </nav>
            </aside>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            {body}
            {enquiry ? <div className="mt-12">{enquiry}</div> : null}
          </div>
        )}
      </Container>
    </section>
  )
}
