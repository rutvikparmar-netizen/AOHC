import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { consultationPage } from '@/data/consultation-page'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { makeCaptcha } from '@/lib/forms/captcha'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import Link from 'next/link'

/**
 * REQUEST A CONSULTATION — `/request-a-consultation`
 *
 * THE ROUTE WAS A PLACEHOLDER UNTIL NOW. `routes.consultation` pointed at
 * the home page's enquiry form anchor, with a note in `routes.ts` saying to
 * swap it back when this page shipped. It has been swapped, which moves
 * every "Request an Appointment" button on the site to this page.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE REAL FORM, NOT THE DRAFT'S FIELD LIST. The supplied copy includes
 * "Suggested Enquiry Form Fields" — eighteen fields across three groups.
 * That is a specification. Rendering it would show a reader a description
 * of a form where the form should be. What the form does not yet collect
 * is recorded in `src/data/consultation-page.ts`; it is a decision for
 * AOHC, not a tidy-up, because it touches the server action, the
 * validation schema and the admin leads view.
 *
 * ⚠️  TWO THINGS SIT ABOVE THE FORM AND MUST STAY THERE. The hero's third
 * paragraph — that submitting does not guarantee a consultation,
 * acceptance, or a particular recommendation — and the Important Notice
 * about emergencies. Both limit what pressing the button achieves, and
 * both are addressed to someone who is about to press it. Below the
 * submit, either becomes small print.
 *
 * ⚠️  NO CLOSING PANEL ON THIS PAGE, UNLIKE EVERY OTHER ONE. The shared
 * closing exists to send a reader to the enquiry form. They are already
 * on it. A second call to action under a form is a second thing to decide
 * between at the moment the page wants exactly one.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Request a Consultation' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Request a Consultation',
  description:
    'Start with a review of your situation. What happens after you send an enquiry to Art of Healing Cancer, what the team will need, and what submitting a request does and does not guarantee.',
  canonicalPath: routes.consultation,
})

export default function RequestConsultationPage() {
  const { steps, notice, submitLabel } = consultationPage

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={consultationPage.hero} trail={trail} />

      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* ── What happens next ──────────────────────────────────
                Beside the form rather than above it, so the sequence is
                readable while filling it in instead of scrolled past.

                ⚠️  UNNUMBERED IN THE DATA, NUMBERED HERE. The draft
                numbers these 18–22, an artefact of its own running list;
                printing "18." as step one of five reads as a fault. The
                <ol> supplies the numbering. */}
            <Reveal className="lg:col-span-5">
              <SectionHeader eyebrow={steps.eyebrow} title={steps.title} />

              <ol className="mt-8 space-y-5">
                {steps.items.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span
                      aria-hidden
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-subtle font-display text-sm font-bold text-accent-dark"
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0 self-center text-base leading-relaxed text-neutral-700">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {/* ── Important notice ─────────────────────────────────
                  Above the form on every width: on a phone the columns
                  stack in source order, so this still arrives before the
                  first field. */}
              <div className="mt-10 flex items-start gap-4 rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-6 sm:gap-5 sm:p-7">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Icon name="alert-triangle" className="size-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold leading-snug text-text">
                    {notice.title}
                  </h2>
                  <p className="mt-2 text-base font-bold leading-relaxed text-text">
                    {notice.body}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ── The form ───────────────────────────────────────────── */}
            <Reveal direction="right" delay={80} className="min-w-0 lg:col-span-7">
              <div
                id="enquiry"
                className="scroll-mt-32 rounded-(--radius-3xl) border border-border bg-surface p-6 sm:p-9"
              >
                {/* A fresh challenge per render. The expected answer never
                    reaches the browser — only an HMAC of it. */}
                <EnquiryForm
                  source="consultation-page"
                  captcha={makeCaptcha()}
                  submitLabel={submitLabel}
                />

                <p className="mt-6 border-t border-border pt-5 text-sm text-text-muted">
                  Information on this site is general education, not medical
                  advice.{' '}
                  <Link
                    href={routes.disclaimer}
                    className="font-semibold text-accent-dark underline underline-offset-2"
                  >
                    Read the medical disclaimer
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
