import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { home } from '@/data/home'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { Passage } from '@/components/shared/Passage'
import { VideoGrid } from '@/components/shared/VideoGrid'
import { ClosingSection } from '@/components/home/ClosingSection'

/**
 * WHO WE ARE — `/who-we-are`
 *
 * Migrated from https://artofhealingcancer.com/who-we-are/ and KEPT AT
 * THAT URL, which is the one Google holds. `/about-us/who-we-are` (the
 * path the menu used to point at) redirects here.
 *
 * The copy is the live page's own, with two changes:
 *   • "ART OF HEALING CANCER" is set in normal case. The source shouts it
 *     in capitals mid-sentence; a screen reader may spell capitals out.
 *   • THE THREE PILLARS ARE TEXT, NOT AN ANIMATED GIF. On the live site
 *     they are baked into `AOHC-Pillars-v3.gif` (and a second GIF for
 *     mobile), so the words cannot be read by search engines, screen
 *     readers or anyone zooming. The wording below is transcribed from
 *     the image exactly, including "Believe" and the capitalisation.
 *
 * ⚠️  DROPPED FROM THE SOURCE: the "Knowledge Videos" strip (three videos
 * from 2020–2023 with no embed on the page, only titles and a link to the
 * channel) and the newsletter form, which posts to the WordPress backend
 * that will not exist after the move. The patient testimonial videos are
 * kept, through the same carousel the home page uses.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'About Us', href: routes.about },
  { label: 'Who We Are' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Who We Are | Art of Healing Cancer',
  description:
    'Art of Healing Cancer is one of the first institutions dedicated to treating advanced cancers, integrating modern and traditional medicine with science at the core.',
  canonicalPath: routes.whoWeAre,
  absoluteTitle: true,
})

const pillars = [
  {
    icon: 'shield-check',
    title: 'Advanced Cancer Management',
    body: 'Art of Healing Cancer provides the best of treatment including Surgery, Chemotherapy, Radiation Therapy, Targeted Therapy, Immunotherapy and other advanced options like Robotic Surgery',
  },
  {
    icon: 'leaf',
    title: 'Integrative Oncology',
    body: 'Art of Healing Cancer Believe in Indian way of treating diseases by scientifically integrating Traditional Indian Medicine like Ayurveda',
  },
  {
    icon: 'file-search',
    title: 'Supports Cancer Research',
    body: 'Art of Healing Cancer Supports Cancer Research and aims at making New Therapeutic Options Available to Cancer Patients through Clinical Trials',
  },
] as const

export default function WhoWeArePage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero
        content={{
          title: 'Who We Are',
          body: [
            'Cancer is a disease that can affect anyone, at any age. And while cancer is detected from Early to Advanced stages, it becomes difficult to treat cancer in Late Stages. This is where Art of Healing Cancer comes in.',
          ],
        }}
        trail={trail}
      />

      <Passage
        content={{
          title: 'One of the First Institutions Dedicated to Treating Advanced Cancers',
          body: [
            'We are a unique organization that specializes in the treatment of advanced cancers integrating multiple modalities of treatment from Modern to Traditional Medicine. But at the core of it is SCIENCE.',
          ],
        }}
      />

      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeader eyebrow="What we stand on" title="Our Pillars of Strength" />
          </Reveal>

          <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12">
            {pillars.map((pillar, index) => (
              <Reveal as="li" key={pillar.title} delay={index * 60} className="flex">
                <div className="flex w-full min-w-0 flex-col rounded-(--radius-2xl) border border-border bg-surface p-6 shadow-(--shadow-card) sm:p-7">
                  <span
                    aria-hidden
                    className="flex size-12 items-center justify-center rounded-(--radius-xl) bg-primary-subtle text-primary-dark"
                  >
                    <Icon name={pillar.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-h4 font-bold leading-snug text-text">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-700">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeader
              eyebrow="Testimonials"
              title="What Our Patients Say About Their Healing Journey"
            />
          </Reveal>
          <div className="mt-10 lg:mt-12">
            <VideoGrid items={home.testimonials.items} />
          </div>
        </Container>
      </section>

      <ClosingSection
        content={{
          title: 'Talk to the Team',
          primaryCta: { label: 'Contact AOHC', href: routes.contact },
        }}
      />
    </>
  )
}
