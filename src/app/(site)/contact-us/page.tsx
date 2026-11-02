import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { contactPage } from '@/data/contact-page'
import { contactRows } from '@/data/home'
import { site } from '@/lib/site'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { ClosingSection } from '@/components/home/ClosingSection'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'

/**
 * CONTACT — `/contact-us`
 *
 * THE ROUTE WAS A PLACEHOLDER UNTIL NOW. `routes.contact` pointed at the
 * home page's enquiry form anchor, with a note in `routes.ts` saying to
 * swap it back when this page shipped. It has been swapped.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE DETAILS COME FROM `contactRows`, NOT FROM THIS PAGE'S DATA FILE,
 * and that is what keeps them honest. The draft's "Contact Information"
 * block is five placeholders — "[Insert verified clinic or office
 * address]", "[Insert verified contact number]" and so on. None of them may
 * reach the page. `contactRows` is built from `site.contact` and drops any
 * row whose value is empty, so the page shows what has been verified and
 * silently omits what has not.
 *
 * ⚠️  THERE IS NO TELEPHONE ROW, AND ITS ABSENCE IS DELIBERATE. `site.ts`
 * carries no number; the draft asks for one. A contact page with email,
 * WhatsApp, an address and opening hours is complete and honest. A
 * fabricated number on a cancer service's contact page is the single worst
 * thing this site could publish, and "[Insert verified contact number]" on
 * a live page is the second worst.
 *
 * ⚠️  THE EMERGENCY NOTICE IS ABOVE THE DETAILS, NOT BELOW THEM. Someone
 * reaching a contact page mid-crisis is scanning for a phone number, and
 * the one thing they need to know is that these channels will not reach
 * anyone quickly. Printed after the address it is a disclaimer; printed
 * before it, it is an instruction. It must not be moved down to tidy the
 * page.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Contact Us' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Contact Art of Healing Cancer',
  description:
    'How to reach the Art of Healing Cancer team about a consultation, medical records, or an international patient enquiry — and what not to send through an ordinary contact message.',
  canonicalPath: routes.contact,
})

export default function ContactPage() {
  const { categories, privacy, emergency, closing } = contactPage

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={contactPage.hero} trail={trail} />

      {/* ── 1. Emergency notice ────────────────────────────────────────
          First, before any way of getting in touch. See the note above. */}
      <section className="pt-(--spacing-section)">
        <Container>
          <Reveal>
            <div className="flex items-start gap-4 rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-6 sm:gap-5 sm:p-7">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Icon name="alert-triangle" className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold leading-snug text-text">
                  {emergency.title}
                </h2>
                <p className="mt-2 text-base font-bold leading-relaxed text-text">
                  {emergency.body}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. How to reach the team ───────────────────────────────────
          Every row is a real, verified value or it is not rendered. */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <SectionHeader
                eyebrow="How to reach us"
                title="Contact Information"
              />
              <p className="mt-6 max-w-(--measure) text-base leading-relaxed text-neutral-700">
                {site.name}
              </p>

              <ul className="mt-8 space-y-5">
                {contactRows.map((row) => (
                  <li key={row.label} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-dark">
                      <Icon name={row.icon} className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-text">{row.label}</p>
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith('http') ? '_blank' : undefined}
                          rel={
                            row.href.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className="mt-0.5 block break-words text-base leading-relaxed text-accent-dark underline underline-offset-2"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 break-words text-base leading-relaxed text-neutral-700">
                          {row.value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Map of the centre. `loading="lazy"` keeps a third-party
                  iframe off the critical path. Titled, because an untitled
                  iframe is an unnamed landmark. */}
              {site.contact.mapEmbedUrl ? (
                <div className="mt-8 overflow-hidden rounded-(--radius-2xl) border border-border">
                  <iframe
                    src={site.contact.mapEmbedUrl}
                    title="Map showing the Art of Healing Cancer centre in Gurugram"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-64 w-full border-0"
                  />
                </div>
              ) : null}
            </Reveal>

            <Reveal direction="right" delay={80} className="lg:col-span-7">
              <SectionHeader
                eyebrow={categories.eyebrow}
                title={categories.title}
              />

              <ul className="mt-6 overflow-hidden rounded-(--radius-2xl) border border-border">
                {categories.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-border bg-surface p-4 last:border-b-0 sm:p-5"
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
                ))}
              </ul>

              {/* ── Privacy reminder ──────────────────────────────────
                  Addressed to someone about to paste a scan into a
                  message box, which is why it sits with the categories
                  rather than at the foot of the page. */}
              <div className="mt-8 flex items-start gap-4 rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-6 sm:gap-5 sm:p-7">
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary-dark"
                >
                  <Icon name="shield-check" className="size-5" />
                </span>
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-text">{privacy.title}</h3>
                  {privacy.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-base leading-relaxed text-text"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <ClosingSection
        content={{ title: closing.title, primaryCta: closing.cta }}
      />
    </>
  )
}
