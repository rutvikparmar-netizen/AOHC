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
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THIS IS THE SECOND LAYOUT, AND THE FIRST WAS REJECTED FOR LOOKING
 * LIKE EVERY OTHER PAGE. It was eyebrow, serif heading, a vertical column
 * of icon rows, a tinted panel and a ruled list — the vocabulary this site
 * uses for pages of argument. A contact page is not read, it is used:
 * somebody arrives with one question, "how do I reach these people", and
 * that layout made them read two columns to answer it.
 *
 * So the page leads with the answer rather than with a heading:
 *
 *   1. FOUR CHANNEL CARDS STRADDLING THE HERO. The first thing under the
 *      title is WhatsApp, email, the address and the hours, as four cards
 *      overlapping the hero's bottom edge. Two are real links a thumb can
 *      hit without scrolling. The overlap is used nowhere else on this
 *      site, which is rather the point.
 *   2. THE FORM IS THE MAIN COLUMN — seven of twelve — rather than a
 *      panel squeezed beside a list.
 *   3. THE MAP IS FULL-BLEED at the foot, edge to edge, where "visit us"
 *      belongs rather than boxed inside a column showing four streets.
 *
 * ⚠️  THE EMERGENCY NOTICE SITS AFTER THE FASTEST ROUTES AND BEFORE
 * ANYTHING THAT TAKES TIME. Someone arriving mid-crisis is scanning for a
 * phone number, and the one thing they need to know is that none of these
 * channels reaches anyone quickly. Below the form it would be a
 * disclaimer; here it is an instruction.
 *
 * ⚠️  THE PRIVACY REMINDER IS IN THE FORM'S OWN COLUMN, ABOVE THE FORM,
 * AND NOT IN THE SIDEBAR. It belongs visually with the sidebar and cannot
 * live there: the columns stack in source order on a phone, so a reminder
 * in the right-hand column arrives AFTER the message box it is warning
 * about. "Do not paste your records in here" has to be read before the
 * box, not after it.
 *
 * ⚠️  THE DETAILS COME FROM `contactRows`, NOT FROM THIS PAGE'S DATA FILE.
 * The draft's "Contact Information" block is five placeholders — "[Insert
 * verified contact number]" and the like — and none may reach the page.
 * `contactRows` is built from `site.contact` and drops any row whose value
 * is empty, so the page shows what has been verified and omits what has
 * not.
 *
 * ⚠️  THERE IS NO TELEPHONE CARD, AND ITS ABSENCE IS DELIBERATE. `site.ts`
 * carries no number. A fabricated one on a cancer service's contact page
 * is the worst thing this site could publish and a visible "[Insert
 * verified contact number]" is the second worst. The grid is built from
 * the array, so a number added to `site.ts` becomes a fifth card with no
 * change here — at which point check the `lg:grid-cols-4`.
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

      {/* ── 1. The four channels ───────────────────────────────────────
          ⚠️  `-mt-*` PULLS THESE UP INTO THE HERO, which only works
          because `PageHero` carries `pb-14 lg:pb-20` — there is padding
          to overlap into. Reduce that padding and the cards start
          covering the hero's own text. `relative z-10` is what puts
          them over the dark field rather than under it. */}
      <section className="relative z-10 -mt-10 lg:-mt-14">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactRows.map((row, index) => {
              const inner = (
                <>
                  <span
                    aria-hidden
                    className="flex size-11 shrink-0 items-center justify-center rounded-(--radius-lg) bg-primary-subtle text-accent-dark transition-colors group-hover/ch:bg-accent group-hover/ch:text-white"
                  >
                    <Icon name={row.icon} className="size-5" />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-eyebrow uppercase text-text-subtle">
                      {row.label}
                    </span>
                    <span className="mt-1 block break-words text-base font-bold leading-snug text-text">
                      {row.value}
                    </span>
                  </span>
                </>
              )

              const shell =
                'group/ch flex h-full items-start gap-4 rounded-(--radius-2xl) border border-border bg-surface p-5 shadow-(--shadow-card) transition duration-300'

              return (
                <Reveal
                  as="li"
                  key={row.label}
                  direction="up"
                  delay={index * 60}
                  className="flex"
                >
                  {/* Only two of the four go anywhere. The others are
                      facts, and dressing a fact as a link promises that
                      something happens when you press it. */}
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        row.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className={`${shell} hover:-translate-y-0.5 hover:border-border-strong hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={shell}>{inner}</div>
                  )}
                </Reveal>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* ── 2. Emergency notice ──────────────────────────────────────── */}
      <section className="pt-10 lg:pt-14">
        <Container>
          <Reveal>
            <div className="flex items-start gap-4 rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-5 sm:gap-5 sm:p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Icon name="alert-triangle" className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold leading-snug text-text">
                  {emergency.title}
                </h2>
                <p className="mt-1.5 text-base font-bold leading-relaxed text-text">
                  {emergency.body}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 3. The form, as the main column ──────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="min-w-0 lg:col-span-7">
              <SectionHeader eyebrow={form.eyebrow} title={form.title} />

              {/* ⚠️  THE SECOND SENTENCE IS LOAD-BEARING. This page and
                  `/request-a-consultation` render the same `EnquiryForm`,
                  so without a line telling them apart a reader has two
                  identical forms and no way to choose. It links rather
                  than buttons: a button here would compete with the form
                  directly beneath it. */}
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

              {/* Above the form on every width — see the note at the top
                  of this file for why it cannot sit in the sidebar. */}
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

            {/* ── What the team handles ──────────────────────────────── */}
            <Reveal direction="right" delay={80} className="min-w-0 lg:col-span-5">
              {/* ⚠️  CHIPS, NOT ANOTHER RULED LIST. Seven short phrases in
                  a sidebar are a set of labels, and this site already
                  uses ruled rows and bordered cards everywhere else. As
                  chips they read as "any of these", which is what they
                  are, and they take a third of the height. They are not
                  buttons and not filters — the page has nothing to
                  filter, and nothing here is clickable. */}
              <h2 className="text-eyebrow uppercase text-primary-dark">
                {categories.title}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {categories.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-(--radius-pill) border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-text-muted"
                  >
                    {/* The draft writes each as a sentence with a full
                        stop. As a chip the stop is noise, so it is
                        trimmed for display; the data keeps AOHC's
                        wording exactly as supplied. */}
                    {item.replace(/\.$/, '')}
                  </li>
                ))}
              </ul>

              {/* ⚠️  NOTHING IS WRITTEN UNDER THE CHIPS, AND A LINE WAS
                  REMOVED FROM HERE. It read "tell us which of these your
                  message is about and the team can route it faster" —
                  which is a claim about how AOHC handles incoming
                  enquiries that nobody here can verify, invented to fill
                  a column. The chips say what the team handles; that is
                  the whole job. */}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 4. Where to find us ────────────────────────────────────────
          ⚠️  FULL-BLEED, OUTSIDE `Container`. A map is the one thing on
          this site that gains from the whole window: boxed into a column
          it shows four streets. `loading="lazy"` keeps a third-party
          iframe off the critical path, and it is titled because an
          untitled iframe is an unnamed landmark. */}
      {site.contact.mapEmbedUrl ? (
        <section aria-label="Where to find us">
          <iframe
            src={site.contact.mapEmbedUrl}
            title="Map showing the Art of Healing Cancer centre in Gurugram"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[20rem] w-full border-0 lg:h-[26rem]"
          />
        </section>
      ) : null}
    </>
  )
}
