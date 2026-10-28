import Image from 'next/image'
import type { ListSection } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * A `ListSection`: eyebrow, heading, lead paragraphs, a checklist, then the
 * sentence that qualifies all of it.
 *
 * ONE COMPONENT FOR TWO SECTIONS, because they are the same shape in the
 * content draft. "One Diagnosis Does Not Tell the Whole Story" and "When the
 * Next Step Is Not Clear" both pose a question, list the factors that bear on
 * it, and close by saying what the list does not promise. They differ only in
 * whether a photograph was supplied, so the image column is optional rather
 * than there being two near-identical files to keep in step.
 *
 * ⚠️  THE OUTRO IS NOT SMALL PRINT. On both sections it is the sentence that
 * qualifies everything above it — "Recommendations depend on the available
 * evidence, the patient's condition, and the assessment of the treating
 * clinical team", and "A consultation cannot guarantee that another treatment
 * will be available or effective". It is set at body size against a brand
 * rule, not shrunk into a footnote: §7 of the content draft and checklist item
 * 30 are about exactly these two sentences, and a reader who misses them has
 * read the list as a promise.
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

  return (
    <section
      className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}
    >
      <Container>
        <div className={image ? 'grid gap-10 lg:grid-cols-12 lg:gap-14' : ''}>
          <Reveal direction="left" className={image ? 'lg:col-span-7' : ''}>
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

            {/* TWO COLUMNS ONLY WHERE THERE IS NO IMAGE BESIDE THE LIST. In a
                7-of-12 column, splitting these again would set each bullet to
                roughly 30 characters a line, which is a column of fragments
                rather than a list of sentences. */}
            <ul
              className={`mt-7 grid gap-x-10 gap-y-3.5 ${
                image ? '' : 'sm:grid-cols-2'
              }`}
            >
              {items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon
                    name="check"
                    className="mt-1 size-4 shrink-0 text-accent-dark"
                  />
                  <span className="text-base leading-relaxed text-neutral-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {outro ? (
              <p className="mt-8 max-w-(--measure) border-l-2 border-border-brand pl-5 text-base leading-relaxed text-neutral-700">
                {outro}
              </p>
            ) : null}

            {cta ? (
              <Button
                href={cta.href}
                variant="secondary"
                icon="arrow-right"
                className="mt-8 rounded-(--radius-pill)"
              >
                {cta.label}
              </Button>
            ) : null}
          </Reveal>

          {image ? (
            /* STICKY, AND NOT CROPPED TO PORTRAIT. The copy column runs
               well past the height of a 4:3 frame, and stretching a 16:9
               photograph to fill it would mean throwing away a third of
               the picture. Sticky makes the shorter column read as
               deliberate instead of unfinished. */
            <Reveal
              direction="right"
              delay={100}
              className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
            >
              <div className="overflow-hidden rounded-(--radius-3xl) bg-surface-subtle">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="aspect-4/3 size-full object-cover"
                />
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
