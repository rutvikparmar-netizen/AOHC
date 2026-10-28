import Image from 'next/image'
import type { ClosingPanel } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * "Your Medical History Matters" — the last word before the footer.
 *
 * ⚠️  THIS IS THE SECOND LAYOUT. The first was centred copy inside a pale
 * tinted box, and it was the weakest thing on the page: a 1360×580 panel of
 * `primary-subtle` holding four short centred lines, with the page's final
 * call to action floating in the middle of it. Washed out, and nothing about
 * it said "this is the end of the argument".
 *
 * It is a split panel now — photograph on one side, the ask on the other —
 * which is the same shape as the contact block further up and gives the
 * closing action something to stand on. The picture is the only frame in the
 * repo nothing else was using; see the note on `closing.image`.
 *
 * STILL LIGHT, NOT BRAND-DARK. The note in `src/data/home.ts` describing this
 * panel on brand colour predates the current footer, which is
 * `brand-teal-950`: a dark panel here would hand off to a dark footer and the
 * two would merge into one block with a seam through it.
 *
 * TWO BUTTONS, WHICH THE REST OF THE PAGE DOES NOT DO. `Cta` enforces one
 * action per section and the reasoning holds — three side by side read as a
 * menu. This is the exception the supplied copy asks for by name, and the one
 * place it is right: a reader who has reached the foot of the page and is not
 * ready to send an enquiry needs somewhere to go other than back up.
 *
 * ⚠️  THE NOTE UNDER THE BUTTONS IS NOT DECORATIVE. "A consultation request
 * does not establish a doctor–patient relationship or guarantee acceptance
 * for treatment" is the last thing someone reads before acting, which is
 * exactly where it belongs. It must not be dropped to tidy the panel up.
 */
export function ClosingSection({
  content,
}: {
  content: ClosingPanel
}) {
  return (
    <section className="py-(--spacing-section)">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-(--radius-3xl) border border-border bg-surface lg:grid lg:grid-cols-[5fr_7fr]">
            {/* `fill` needs a positioned parent with a definite height. On a
                phone that is `min-h-64`; from `lg` the stretched grid row
                gives the column the height of the copy beside it, so the
                picture is always exactly as tall as the panel. */}
            <div className="relative min-h-64 lg:min-h-full">
              {content.image ? (
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="p-8 sm:p-10 lg:p-14">
              <SectionHeader eyebrow={content.eyebrow} title={content.title} />

              <div className="mt-6 max-w-(--measure) space-y-4">
                {content.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-base leading-relaxed text-neutral-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Button
                  href={content.primaryCta.href}
                  variant="accent"
                  size="lg"
                  icon="calendar"
                  iconPosition="start"
                  className="rounded-(--radius-pill)"
                >
                  {content.primaryCta.label}
                </Button>

                <Button
                  href={content.secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  icon="mail"
                  iconPosition="start"
                  className="rounded-(--radius-pill)"
                >
                  {content.secondaryCta.label}
                </Button>
              </div>

              {content.note ? (
                <p className="mt-8 flex max-w-(--measure) gap-3 border-t border-border pt-6 text-sm leading-relaxed text-text-muted">
                  <Icon
                    name="info"
                    className="mt-0.5 size-4 shrink-0 text-primary-dark"
                  />
                  {content.note}
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
