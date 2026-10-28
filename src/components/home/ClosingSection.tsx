import type { HomeContent } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * "Your Medical History Matters" — the last word before the footer.
 *
 * LIGHT, NOT BRAND-DARK. The note on `closing` in `src/data/home.ts` describes
 * this panel running on brand colour, which was written before the footer
 * existed in its current form. The footer is `brand-teal-950`, so a dark panel
 * here would hand off to a dark footer and the two would merge into one block
 * with a seam through it. A brand-tinted card on the page colour keeps the
 * closing action a distinct object and gives the dark footer an edge to start
 * against.
 *
 * TWO BUTTONS HERE, WHICH THE REST OF THE PAGE DOES NOT DO. `Cta` enforces one
 * action per section and the reasoning holds: three side by side read as a
 * menu. This is the exception the supplied copy asks for by name — a primary
 * and a secondary — and it is the one place on the page where that is right,
 * because a reader who has got this far and is not ready to send an enquiry
 * should have somewhere to go other than back up.
 *
 * The weighting does the work: accent for the consultation request, outlined
 * for the quieter route.
 *
 * ⚠️  THE NOTE UNDER THE BUTTONS IS NOT DECORATIVE. "A consultation request
 * does not establish a doctor–patient relationship or guarantee acceptance for
 * treatment" is the last thing someone reads before acting, which is exactly
 * where it belongs. It must not be dropped to tidy the panel up.
 */
export function ClosingSection({
  content,
}: {
  content: HomeContent['closing']
}) {
  return (
    <section className="py-(--spacing-section)">
      <Container>
        <Reveal>
          <div className="rounded-(--radius-3xl) border border-border-brand bg-primary-subtle px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
            <SectionHeader
              eyebrow={content.eyebrow}
              title={content.title}
              align="center"
              className="max-w-3xl"
            />

            <div className="mx-auto mt-6 max-w-(--measure) space-y-4 text-center">
              {content.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-base leading-relaxed text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
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
              <p className="mx-auto mt-8 max-w-(--measure) border-t border-border-brand pt-6 text-center text-sm leading-relaxed text-text-muted">
                {content.note}
              </p>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
