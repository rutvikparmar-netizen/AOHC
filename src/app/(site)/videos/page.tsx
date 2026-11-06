import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { videosPage } from '@/data/videos-page'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER, site } from '@/lib/site'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { VideoGrid } from '@/components/shared/VideoGrid'
import { ClosingSection } from '@/components/home/ClosingSection'

/**
 * VIDEOS — `/videos`, the WordPress page's URL ("Find us in Youtube").
 *
 * The Knowledge menu and the footer already linked `routes.videos`, which
 * pointed at `/knowledge/videos` with no page behind it. The route now is
 * the live URL, and `/knowledge/videos` redirects here (next.config.ts).
 *
 * Laid out like Testimonials: the same `VideoGrid`, and the same
 * disclaimer directly under the patient stories — the first of them
 * claims a remission in eight weeks. See `data/videos-page.ts`.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Videos' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Videos | Art of Healing Cancer',
  description:
    'Patient stories and short explainers on breast, oral and head and neck cancers from the Art of Healing Cancer YouTube channel.',
  canonicalPath: routes.videos,
  absoluteTitle: true,
})

function ChannelLink() {
  return (
    <a
      href={site.social.youtube}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-primary-dark transition-colors hover:border-primary hover:bg-primary-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      Watch Other Videos
      <Icon name="external-link" className="size-4" />
      <span className="sr-only">(opens YouTube in a new tab)</span>
    </a>
  )
}

export default function VideosPage() {
  const { hero, stories, shorts } = videosPage

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={hero} trail={trail} />

      {/* ── 1. Patient stories ─────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeader eyebrow="Patient stories" title="From Diagnosis to Recovery" />
          </Reveal>

          <div className="mt-10 lg:mt-12">
            <VideoGrid items={stories} />
          </div>

          {/* Directly under the stories, as on Testimonials. */}
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
                <p className="text-base leading-relaxed text-text">{EMERGENCY_NOTICE}</p>
                <p className="text-base leading-relaxed text-text">{MEDICAL_DISCLAIMER}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Shorts ──────────────────────────────────────────────── */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="flex max-w-none flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <SectionHeader eyebrow="Shorts" title="Short Explainers" />
            </div>
            <ChannelLink />
          </Reveal>

          <div className="mt-10 lg:mt-12">
            <VideoGrid items={shorts} />
          </div>
        </Container>
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
