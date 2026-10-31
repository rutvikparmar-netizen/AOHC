import Image from 'next/image'
import type { ListSection } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * A `ListSection`: eyebrow, heading, lead paragraphs, the factors that bear
 * on the question, and the sentence that qualifies all of it.
 *
 * ONE COMPONENT FOR NINE SECTIONS, because they are the same shape in the
 * content draft: a question, what bears on it, and what the list does not
 * promise.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THIS IS THE THIRD LAYOUT, AND AOHC REJECTED THE SECOND. Worth having
 * the faults written down, because the previous version looked orderly in
 * isolation and only showed itself in use:
 *
 *   1. THE LEAD-IN WAS ORPHANED BESIDE THE HEADING. The header row put the
 *      title in six columns and the lead paragraphs in the other six, set
 *      to the heading's baseline. That is fine for a paragraph and absurd
 *      for a fragment: "Depending on the case, expenses may include:" ends
 *      in a colon, introduces the list, and was sitting a column away from
 *      it, looking like a caption that had come loose. The lead now sits
 *      directly above what it introduces, every time.
 *
 *   2. THE OUTRO PANEL WAS MOSTLY EMPTY. A full-width tinted box holding
 *      one short sentence left two-thirds of itself blank, which reads as
 *      a mistake rather than as emphasis. It is part of the list's own
 *      panel now — a tinted strip across its foot — so the qualifier
 *      belongs to the thing it qualifies instead of floating after it.
 *
 *   3. THE ITEMS WERE THE PLAINEST THING ON THE PAGE: three columns of
 *      hairline-topped rows. Nothing was wrong with any single row; there
 *      was simply no object there, just text in a grid.
 *
 * SO THE LIST IS ONE PANEL NOW, not three stacked bands. The cells are
 * separated by real hairlines and the qualifier closes it off, which gives
 * the section a single shape to recognise instead of a heading, a grid and
 * a box that happen to be near each other.
 *
 * ⚠️  THE HAIRLINES ARE `gap-px` OVER A `bg-border` PARENT, NOT BORDERS ON
 * THE CELLS. Per-cell borders double up where two cells meet and need
 * nth-child rules to strip the outer edges, which then disagree with
 * themselves at every breakpoint. The gap technique draws exactly one line
 * between any two cells at any column count, and none at the panel's edge.
 *
 * ⚠️  AN ODD LAST ITEM SPANS THE ROW. The grid is two columns; with an odd
 * count the final cell would otherwise leave a half-row of bare parent —
 * which, since the parent is the border colour, is a grey block, not
 * whitespace. Spanning it reads as deliberate and fills the panel.
 */
export function ChecklistSection({
  content,
  surface = false,
}: {
  content: ListSection
  /** `true` puts the section on white rather than the warm page colour. */
  surface?: boolean
}) {
  const { eyebrow, title, intro, items, outro, warning, cta, image } = content

  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        {/* ── Header ──────────────────────────────────────────────────
            The lead paragraphs sit under the heading, not beside it. A
            photograph, where one is supplied, takes the other column. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className={image ? 'lg:col-span-7' : 'lg:col-span-8'}>
            <SectionHeader eyebrow={eyebrow} title={title} />

            <div className="mt-6 max-w-(--measure) space-y-4">
              {intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-base leading-relaxed text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {image ? (
            <Reveal direction="right" delay={80} className="lg:col-span-5">
              <div className="aspect-16/10 overflow-hidden rounded-(--radius-3xl) bg-surface-subtle lg:aspect-auto lg:h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* ── The list, as one panel ──────────────────────────────────
            `bg-border` on the grid parent plus `gap-px` is what draws the
            hairlines; the cells are `bg-surface` (or the page colour when
            the section is already on white, so the panel still reads as
            an object rather than dissolving into the band). */}
        <Reveal className="mt-10 lg:mt-12">
          <div className="overflow-hidden rounded-(--radius-3xl) border border-border">
            <ul className="grid gap-px bg-border sm:grid-cols-2">
              {items.map((item, index) => {
                const lastAndOdd =
                  items.length % 2 === 1 && index === items.length - 1

                return (
                  <li
                    key={item}
                    className={`flex items-start gap-4 p-5 sm:p-6 ${
                      surface ? 'bg-background' : 'bg-surface'
                    } ${lastAndOdd ? 'sm:col-span-2' : ''}`}
                  >
                    <span
                      aria-hidden
                      className="flex size-7 shrink-0 items-center justify-center rounded-(--radius-md) bg-primary-subtle text-accent-dark"
                    >
                      <Icon name="check" className="size-4" />
                    </span>
                    <span className="min-w-0 text-base leading-relaxed text-neutral-700">
                      {item}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* ⚠️  THE OUTRO IS NOT SMALL PRINT. It is the sentence that
                qualifies everything above it — "Not every patient will
                require every item", "A consultation cannot guarantee…".
                §7 of the content draft and checklist item 30 are about
                exactly these sentences, and a reader who skips one has
                read the list as a promise. Inside the panel and set at
                body size, it is the list's last line rather than a
                footnote after it. */}
            {outro ? (
              <div className="flex items-start gap-4 border-t border-border bg-primary-subtle p-5 sm:gap-5 sm:p-6">
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface text-primary-dark"
                >
                  <Icon name="info" className="size-4" />
                </span>
                <p className="max-w-(--measure) text-base leading-relaxed text-text">
                  {outro}
                </p>
              </div>
            ) : null}
          </div>
        </Reveal>

        {/* ⚠️  LOUDER THAN THE OUTRO, ON PURPOSE, AND KEPT OUTSIDE THE
            PANEL. `warning` carries the sentences that could harm someone
            if they were skimmed past — not delaying standard treatment,
            and supplements interacting with cancer medicines. Folded into
            the panel it would read as the list's own small print, which is
            the opposite of what it is for.

            Accent teal rather than amber or red because there is no
            warning colour in the token set, and inventing one for a single
            panel would put a colour on this site that means nothing
            anywhere else. The icon and the weight carry the register. */}
        {warning ? (
          <Reveal>
            <div className="mt-5 flex items-start gap-4 rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-6 sm:gap-5 sm:p-7">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Icon name="alert-triangle" className="size-5" />
              </span>
              <p className="max-w-(--measure) self-center text-base font-bold leading-relaxed text-text">
                {warning}
              </p>
            </div>
          </Reveal>
        ) : null}

        {cta ? (
          <Reveal>
            <Button
              href={cta.href}
              variant="secondary"
              icon="arrow-right"
              className="mt-8 rounded-(--radius-pill)"
            >
              {cta.label}
            </Button>
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
