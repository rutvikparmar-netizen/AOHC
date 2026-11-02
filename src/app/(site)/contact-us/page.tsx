import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import Link from 'next/link'
import { contactPage } from '@/data/contact-page'
import { contactRows } from '@/data/home'
import { site } from '@/lib/site'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { makeCaptcha } from '@/lib/forms/captcha'

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
  const { categories, privacy, emergency, form } = contactPage

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

            {/* ── The enquiry form ──────────────────────────────────
                Beside the ways of reaching the team, not below them.
                This is what most people came to do, and on a contact
                page the form should not be something you scroll past
                two columns to find. */}
            <Reveal
              direction="right"
              delay={80}
              className="min-w-0 lg:col-span-7"
            >
              <SectionHeader eyebrow={form.eyebrow} title={form.title} />

              {/* ⚠️  THE SECOND SENTENCE IS THE ONE THAT EARNS ITS PLACE.
                  This page and `/request-a-consultation` both render the
                  same `EnquiryForm`, so without a line telling them
                  apart a reader has two identical forms and no way to
                  choose. It links rather than buttons: a button here
                  would compete with the form directly beneath it. */}
              <p className="mt-5 max-w-(--measure) text-base leading-relaxed text-neutral-700">
                {form.intro}{' '}
                <Link
                  href={routes.consultation}
                  className="font-semibold text-accent-dark underline underline-offset-2"
                >
                  Request a consultation
                </Link>
                .
              </p>

              {/* ── Privacy reminder, above the form ─────────────────
                  Addressed to someone about to paste a scan into a
                  message box — so it has to arrive before they reach
                  the box, not after they have filled it. */}
              <div className="mt-7 flex items-start gap-4 rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-5 sm:gap-5 sm:p-6">
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

              <div
                id="enquiry"
                className="mt-7 scroll-mt-32 rounded-(--radius-3xl) border border-border bg-surface p-6 sm:p-9"
              >
                {/* A fresh challenge per render. The expected answer never
                    reaches the browser — only an HMAC of it. */}
                <EnquiryForm source="contact-page" captcha={makeCaptcha()} />

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

      {/* ── Enquiry categories ─────────────────────────────────────────
          Below the form rather than beside it. They describe what the
          team handles, which is useful context and not a step in
          getting in touch — it should not sit between the reader and
          the form. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeader
              eyebrow={categories.eyebrow}
              title={categories.title}
            />
          </Reveal>

          <ul className="mt-8 grid gap-x-10 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {categories.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3.5 border-b border-border py-4"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-(--radius-md) bg-primary-subtle text-accent-dark"
                >
                  <Icon name="check" className="size-3.5" />
                </span>
                <span className="min-w-0 text-base leading-relaxed text-neutral-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
