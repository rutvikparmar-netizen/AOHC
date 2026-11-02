import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { testimonialsPage } from '@/data/testimonials-page'
import { home } from '@/data/home'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER } from '@/lib/site'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { VideoCarousel } from '@/components/home/VideoCarousel'
import { ClosingSection } from '@/components/home/ClosingSection'

/**
 * TESTIMONIALS — `/testimonials`
 *
 * THE ROUTE ALREADY EXISTED AND WAS A 404, in the main menu and the
 * footer of every page on the site.
 *
 * ⚠️  THE DISCLAIMER IS DIRECTLY UNDER THE QUOTES, NOT AT THE FOOT OF THE
 * PAGE, AND THAT IS THE WHOLE POINT OF ITS POSITION. Three of the five
 * testimonials tell the reader not to have a mastectomy and one calls it
 * "a myth" — see the warnings in `data/testimonials-page.ts`.
 * `EMERGENCY_NOTICE` happens to carry the exact sentence that answers
 * them: "Do not stop, delay, or change prescribed treatment based solely
 * on information on this website." Below the video rail it would be
 * small print after a sales pitch. Here it is read in the same breath as
 * the advice it qualifies. DO NOT MOVE IT TO THE BOTTOM TO TIDY THE PAGE.
 *
 * ⚠️  THE "EVERY PATIENT IS DIFFERENT" LINE IN THE HERO IS WRITTEN, NOT
 * SUPPLIED. The live page has no such line. It is here because five
 * survivor stories in a row, unqualified, read as a prediction, and the
 * one thing this page must not do is promise an outcome. It states a
 * fact about variability and claims nothing about AOHC.
 *
 * ⚠️  THE VIDEOS ARE `home.testimonials.items`, NOT THIS PAGE'S OWN LIST.
 * The live page runs an automatic YouTube channel feed; there is nothing
 * stable to migrate. See the data file. Reading the home page's rail
 * means one curated list in one place — change it there and both pages
 * change together.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Testimonials' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Patient Testimonials | Art of Healing Cancer',
  description:
    'Breast cancer survivors treated at Art of Healing Cancer describe their experience in their own words, alongside filmed patient stories.',
  canonicalPath: routes.testimonials,
  absoluteTitle: true,
})

export default function TestimonialsPage() {
  const { hero, written } = testimonialsPage

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={hero} trail={trail} />

      {/* ── 1. In their own words ──────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeader
              eyebrow="In their own words"
              title="Survivor Stories"
            />
          </Reveal>

          {/* Two columns so five quotes of uneven length do not leave a
              single ragged stack down the left of a wide screen. The
              fifth sits alone, which is what five does. */}
          <ul className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2">
            {written.map((item, index) => (
              <Reveal
                as="li"
                key={item.name}
                direction="up"
                delay={(index % 2) * 60}
                className="flex min-w-0"
              >
                <figure className="flex h-full w-full min-w-0 flex-col rounded-(--radius-2xl) border border-border bg-surface p-6 shadow-(--shadow-card) sm:p-7">
                  <span
                    aria-hidden
                    className="flex size-9 items-center justify-center rounded-full bg-primary-subtle text-primary-dark"
                  >
                    <Icon name="quote" className="size-4.5" />
                  </span>

                  <blockquote className="mt-5 flex-1 text-base leading-relaxed text-neutral-700">
                    {item.quote}
                  </blockquote>

                  <figcaption className="mt-6 border-t border-border pt-4">
                    <span className="block font-display text-base font-bold text-text">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-text-muted">
                      {item.context}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>

          {/* ⚠️  HERE, NOT AT THE FOOT. See the note at the top. */}
          <Reveal className="mt-10 rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-6 sm:p-7">
            <div className="flex items-start gap-4 sm:gap-5">
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white"
              >
                <Icon name="alert-triangle" className="size-5" />
              </span>
              <div className="min-w-0 space-y-3">
                <h2 className="font-display text-lg font-bold leading-snug text-text">
                  Before You Act on Anything Above
                </h2>
                <p className="text-base leading-relaxed text-text">
                  {EMERGENCY_NOTICE}
                </p>
                <p className="text-base leading-relaxed text-text">
                  {MEDICAL_DISCLAIMER}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Filmed stories ──────────────────────────────────────── */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeader
              eyebrow={home.testimonials.eyebrow}
              title={home.testimonials.title}
            />
          </Reveal>
        </Container>

        <div className="mt-10 lg:mt-12">
          <VideoCarousel items={home.testimonials.items} />
        </div>
      </section>

      <ClosingSection
        content={{
          title: 'Want to Talk to Someone About Your Own Diagnosis?',
          primaryCta: { label: 'Contact AOHC', href: routes.contact },
        }}
      />
    </>
  )
}
