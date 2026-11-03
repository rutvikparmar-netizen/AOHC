import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import Link from 'next/link'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER, site } from '@/lib/site'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'

/**
 * Medical Disclaimer — `/medical-disclaimer`
 *
 * ⚠️  THIS WAS THE WORST DEAD LINK ON THE SITE. `routes.disclaimer` is in
 * the footer of every page, in the line under the enquiry form on the
 * contact page, AND in the "Read the medical disclaimer" link that every
 * one of the thirteen migrated articles renders. A cancer service whose
 * medical disclaimer 404s is worse than one that has no disclaimer link
 * at all, because the link is an assurance that something was said.
 *
 * ⚠️  IT 404s ON THE LIVE WORDPRESS SITE TOO — checked directly, not
 * assumed. So there was no page to migrate and nothing of AOHC's to
 * transcribe for it.
 *
 * ⚠️  THE TWO PARAGRAPHS ARE NOT WRITTEN FOR THIS PAGE. They are
 * `MEDICAL_DISCLAIMER` and `EMERGENCY_NOTICE` from `lib/site.ts` — AOHC's
 * own supplied wording, already shown at the foot of `/cancer-types`,
 * `/treatments-and-therapies`, every migrated article and the
 * testimonials page. Using the same two strings here means the page a
 * reader is sent to says exactly what sent them, rather than a longer
 * version that could differ from it. Edit them in `site.ts` and they
 * change everywhere at once.
 *
 * ⚠️  IT IS SHORT, AND THAT IS HONEST RATHER THAN FINISHED. A full
 * disclaimer would normally also cover testimonials and individual
 * results, third-party links, the status of the migrated articles, and
 * who to contact about a correction. None of that has been supplied or
 * reviewed, and inventing it would mean publishing legal text nobody at
 * AOHC has approved. What is here is true and is theirs. The gaps are
 * listed below for whoever finishes it.
 *
 * ⚠️  NO CLOSING CTA, as on the other legal pages.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Medical Disclaimer' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Medical Disclaimer',
  description:
    'The content on the Art of Healing Cancer website is general educational information. It does not replace professional medical advice, and these channels are not an emergency service.',
  canonicalPath: routes.disclaimer,
})

export default function MedicalDisclaimerPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero
        content={{
          title: 'Medical Disclaimer',
          body: [
            'This page sets out what the information on this website is for, and what it is not.',
            'It applies to every page here, including the articles, the treatment and cancer-type pages, and the patient stories.',
          ],
        }}
        trail={trail}
      />

      <section className="py-(--spacing-section)">
        <Container>
          <div className="max-w-4xl space-y-6">
            <Reveal className="rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-6 sm:p-8">
              <div className="flex items-start gap-4 sm:gap-5">
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary-dark"
                >
                  <Icon name="info" className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-h4 font-bold leading-snug text-text">
                    General Educational Information Only
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text">
                    {MEDICAL_DISCLAIMER}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ⚠️  THE SAFETY-NETTING PANEL IS THE ONE THAT MATTERS AND IT
                IS STYLED TO SAY SO. Someone who has read an article about
                an unproven therapy and is wondering whether to stop their
                own treatment is the reader this page exists for. */}
            <Reveal
              delay={60}
              className="rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-6 sm:p-8"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white"
                >
                  <Icon name="alert-triangle" className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-h4 font-bold leading-snug text-text">
                    Do Not Change Your Treatment Because of This Website
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text">
                    {EMERGENCY_NOTICE}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="pt-4">
              <h2 className="font-display text-h4 font-bold leading-snug text-text">
                Where to Go Next
              </h2>
              <ul className="mt-4 space-y-2.5">
                {[
                  {
                    label: 'Terms of Use',
                    href: routes.terms,
                    note: 'what using this website means, including that it creates no doctor–patient relationship',
                  },
                  {
                    label: 'Privacy Policy',
                    href: routes.privacy,
                    note: 'what happens to information you send us',
                  },
                  {
                    label: 'Contact AOHC',
                    href: routes.contact,
                    note: 'to ask a question about anything you have read here',
                  },
                ].map((item) => (
                  <li
                    key={item.href}
                    className="flex gap-3 text-base leading-relaxed text-neutral-700"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="min-w-0">
                      <Link
                        href={item.href}
                        className="font-semibold text-accent-dark underline underline-offset-2"
                      >
                        {item.label}
                      </Link>{' '}
                      — {item.note}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 max-w-(--measure) text-sm leading-relaxed text-text-muted">
                For urgent or life-threatening symptoms, contact your local
                emergency services or go to your nearest emergency department.
                {site.contact.hours
                  ? ` ${site.name} is open ${site.contact.hours.toLowerCase()} and is not an emergency service.`
                  : null}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
