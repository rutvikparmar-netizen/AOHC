import type { Metadata } from 'next'
import type { ReactNode } from 'react'
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
 * ⚠️  THE PRIVACY REMINDER IS IN THE LEFT COLUMN, WHICH IS WHY THE LEFT
 * COLUMN IS THE NARROW ONE. The columns stack in source order on a phone,
 * so anything in the right-hand column arrives AFTER the message box. "Do
 * not paste your records in here" has to be read before the box, not
 * after it — which settles the whole layout: everything a reader needs
 * before typing goes left, the form goes right.
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

/**
 * Soft break opportunities after "@" and ".".
 *
 * ⚠️  NOT COSMETIC. `break-words` lets the browser split an overflowing
 * word, but only at whatever character lands on the edge — which turned
 * the email into "AOHC@getintouch.zohod / esk.in" in a 185px card. A
 * `<wbr>` after the "@" and each "." offers somewhere sensible to break
 * first; the browser falls back to splitting mid-token only when even a
 * single segment will not fit.
 *
 * Applied to every card value, and only the email has either character
 * in it. Written as a loop rather than a lookbehind split because a
 * lookbehind regex literal is a PARSE error on Safari below 16.4, which
 * would take down the whole bundle rather than this one card.
 */
function withSoftBreaks(value: string) {
  const out: ReactNode[] = []
  let chunk = ''

  for (const char of value) {
    chunk += char
    if (char === '@' || char === '.') {
      out.push(chunk, <wbr key={out.length} />)
      chunk = ''
    }
  }
  if (chunk) out.push(chunk)

  return out
}

export const metadata: Metadata = buildMetadata({
  title: 'Contact Art of Healing Cancer | AOHC',
  description:
    'Contact AOHC with questions about the consultation process, available services, or international patient enquiries.',
  canonicalPath: routes.contact,
  absoluteTitle: true,
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
              /* ⚠️  THE ROW IS CENTRED IN THE CARD, THE ICON IS NOT
                 CENTRED IN THE ROW, and both halves of that matter. All
                 four cards stretch to the tallest, and the address is
                 six lines against two — so top-aligned content left the
                 other three two-thirds empty at the foot. The card is a
                 column that centres its single row, which spreads that
                 slack above and below instead. Putting `items-center` on
                 the row itself would have been the easy version and the
                 wrong one: it drops the icon to the middle of a
                 six-line address. */
              const inner = (
                <span className="flex min-w-0 items-start gap-4">
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
                      {withSoftBreaks(row.value)}
                    </span>
                  </span>
                </span>
              )

              /* ⚠️  `w-full min-w-0` IS LOAD-BEARING, NOT TIDYING. This
                 element is a flex item of the `<li>`, so it gets
                 `min-width: auto` and will not shrink below its own
                 min-content — 368px, set by the email address, which is
                 one unbreakable 27-character token. `break-words` does
                 not help: `overflow-wrap: break-word` wraps an
                 overflowing word but does not lower min-content, so the
                 card stayed 368 wide inside a 343 column and took the
                 document to scrollWidth 385 at a 375 viewport. */
              const shell =
                'group/ch flex h-full w-full min-w-0 flex-col justify-center rounded-(--radius-2xl) border border-border bg-surface p-5 shadow-(--shadow-card) transition duration-300'

              return (
                <Reveal
                  as="li"
                  key={row.label}
                  direction="up"
                  delay={index * 60}
                  /* ⚠️  `min-w-0` HERE IS HALF THE OVERFLOW FIX; the other
                     half is on `shell` below, and neither works alone. A
                     grid track defaults to `minmax(auto, 1fr)`, and
                     `auto` resolves to the item's min-content width, so
                     without this the cell itself refuses to shrink. */
                  className="flex min-w-0"
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

      {/* ── 3. Everything you need before writing, then the form ──────
          ⚠️  THE COLUMNS WERE THE OTHER WAY ROUND AND IT DID NOT WORK.
          The form held the wide left column and the right held nothing
          but seven chips, so the sidebar ran out around 700px down while
          the form carried on for another 500 — a column and a half of
          empty page beside a form nobody had finished filling in. The
          sidebar did not have enough in it to be a sidebar.

          Everything a reader needs BEFORE typing now shares the narrow
          column — what this form is for, what not to put in it, what the
          team handles — and the form takes the wide one. The two columns
          are within a hundred pixels of each other, and the narrow one
          sticks so it stays beside the form on the way down.

          THE SOURCE ORDER IS THE MOBILE ORDER, and it is the reason this
          works at all: heading, then what the form is for, then the
          privacy reminder, then the categories, then the message box.
          The reminder is read before the box on every width. That was
          impossible while it lived in a right-hand column. */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="min-w-0 lg:col-span-5">
              {/* Sticky on the inside: the Reveal is the grid item and a
                  grid item stretches to the row, so sticking IT would do
                  nothing. The stretched wrapper is exactly the travel
                  this needs. */}
              <div className="lg:sticky lg:top-28">
                <SectionHeader eyebrow={form.eyebrow} title={form.title} />

                {/* ⚠️  THE SECOND SENTENCE IS LOAD-BEARING. This page and
                    `/request-a-consultation` render the same
                    `EnquiryForm`, so without a line telling them apart a
                    reader has two identical forms and no way to choose.
                    It links rather than buttons: a button here would
                    compete with the form beside it. */}
                <p className="mt-5 text-base leading-relaxed text-neutral-700">
                  {form.intro}{' '}
                  <Link
                    href={routes.consultation}
                    className="font-semibold text-accent-dark underline underline-offset-2"
                  >
                    Request a consultation
                  </Link>
                  .
                </p>

                <div className="mt-7 flex items-start gap-4 rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-5 sm:gap-5 sm:p-6">
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary-dark"
                  >
                    <Icon name="shield-check" className="size-5" />
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-text">
                      {privacy.title}
                    </h3>
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

                {/* ── What the team handles ──────────────────────────
                    ⚠️  CHIPS, NOT ANOTHER RULED LIST. Seven short
                    phrases are a set of labels, and this site already
                    uses ruled rows and bordered cards everywhere else.
                    As chips they read as "any of these", which is what
                    they are. They are not buttons and not filters — the
                    page has nothing to filter, and nothing here is
                    clickable.

                    ⚠️  A LINE WAS REMOVED FROM UNDER THEM. It read "tell
                    us which of these your message is about and the team
                    can route it faster" — a claim about how AOHC handles
                    incoming enquiries that nobody here can verify,
                    invented to fill a column. */}
                <h3 className="mt-9 text-eyebrow uppercase text-primary-dark">
                  {categories.title}
                </h3>
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
              </div>
            </Reveal>

            <Reveal
              direction="right"
              delay={80}
              className="min-w-0 lg:col-span-7"
            >
              <div
                id="enquiry"
                className="scroll-mt-32 rounded-(--radius-3xl) border border-border bg-surface p-6 shadow-(--shadow-card) sm:p-9"
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
