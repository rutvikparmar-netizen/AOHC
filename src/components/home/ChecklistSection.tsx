import Image from 'next/image'
import type { ListSection } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * A `ListSection`: eyebrow, heading, lead paragraphs, the factors that bear on
 * the question, and the sentence that qualifies all of it.
 *
 * ONE COMPONENT FOR TWO SECTIONS, because they are the same shape in the
 * content draft. "One Diagnosis Does Not Tell the Whole Story" and "When the
 * Next Step Is Not Clear" both pose a question, list what bears on it, and
 * close by saying what the list does not promise.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THIS IS THE SECOND LAYOUT. The first one put everything in a 7-of-12
 * column with the image beside it, and it read as a Word document: the copy
 * ran down the left half, the right half was empty from the bottom of a short
 * 4:3 photograph to the end of the section — on the no-image variant the
 * entire right half was blank — and the factors were a flat run of
 * check-bullets with the qualifying sentence hung off a hairline rule like an
 * afterthought. Three structural changes:
 *
 *   1. THE HEADER ROW ALWAYS FILLS THE WIDTH. With a photograph the heading
 *      and lead take 7 columns and the picture takes 5; without one the
 *      heading takes 6 and the lead paragraphs move into the other 6, set to
 *      the bottom of the row so they sit on the heading's baseline. Neither
 *      arrangement leaves half a row of nothing.
 *
 *   2. THE IMAGE IS SIZED BY THE ROW, NOT BY A RATIO. `h-full` against the
 *      stretched grid row makes it a wide banner the height of the heading
 *      beside it, so it can never again finish 400px before the column it
 *      shares a row with.
 *
 *   3. THE FACTORS ARE CARDS, three across. As bullets they were the plainest
 *      thing on a page whose every other list is a card grid; as cards they
 *      match "Who we serve" directly above them in the visual order.
 *
 * ⚠️  THE OUTRO IS NOT SMALL PRINT. It is the sentence that qualifies
 * everything above it — "Recommendations depend on the available evidence…",
 * "A consultation cannot guarantee…". It now sits in a brand-tinted panel
 * with an icon, at body size, because §7 of the content draft and checklist
 * item 30 are about exactly these two sentences and a reader who skips them
 * has read the list as a promise.
 */
export function ChecklistSection({
  content,
  surface = false,
}: {
  content: ListSection
  /** `true` puts the section on white rather than the warm page colour. */
  surface?: boolean
}) {
  const { eyebrow, title, intro, items, outro, cta, image } = content

  /* Cards invert against whatever the section is standing on, or they
     disappear into it. */
  const card = surface ? 'bg-background' : 'bg-surface'

  const leadParagraphs = (
    <div className="max-w-(--measure) space-y-4">
      {intro.map((paragraph) => (
        <p
          key={paragraph.slice(0, 32)}
          className="text-base leading-relaxed text-neutral-700"
        >
          {paragraph}
        </p>
      ))}
    </div>
  )

  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal
            direction="left"
            className={image ? 'lg:col-span-7' : 'lg:col-span-6'}
          >
            <SectionHeader eyebrow={eyebrow} title={title} />
            {image ? <div className="mt-6">{leadParagraphs}</div> : null}
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
          ) : (
            <Reveal
              direction="right"
              delay={80}
              className="lg:col-span-6 lg:self-end"
            >
              {leadParagraphs}
            </Reveal>
          )}
        </div>

        {/* Tighter on phones, where these stack: as cards rather than
            bullets the list is taller, and the padding is the part of that
            which buys the least. */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal as="li" key={item} direction="up" delay={index * 60}>
              <div
                className={`flex h-full gap-3.5 rounded-(--radius-2xl) border border-border ${card} p-4 transition-colors duration-300 hover:border-border-brand sm:p-5`}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-(--radius-md) bg-primary-subtle text-primary-dark">
                  <Icon name="check" className="size-4" />
                </span>
                <span className="text-sm leading-relaxed text-neutral-700">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        {outro ? (
          <Reveal>
            <div className="mt-8 flex gap-4 rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-6 sm:gap-5 sm:p-7">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary-dark">
                <Icon name="info" className="size-5" />
              </span>
              {/* Wider than `--measure`. One short paragraph set to 65ch in
                  a full-width panel left a third of the panel empty to its
                  right, which read as a mistake rather than as a measure. */}
              <p className="max-w-5xl self-center text-base leading-relaxed text-neutral-700">
                {outro}
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
