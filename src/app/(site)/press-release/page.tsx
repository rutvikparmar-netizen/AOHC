import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { pressPage } from '@/data/press-page'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { ClosingSection } from '@/components/home/ClosingSection'

/**
 * PRESS — `/press-release`, the WordPress page's URL.
 *
 * The footer's "Media" link pointed at `/media`, which had no page; it now
 * points here and `/media` redirects (next.config.ts). The coverage list
 * and what in it needs checking is in `data/press-page.ts`.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'In the Press' },
]

export const metadata: Metadata = buildMetadata({
  title: 'In the Press | Art of Healing Cancer',
  description:
    'News articles and interviews featuring Art of Healing Cancer on liquid biopsy, robotic cervical cancer surgery, diet and cancer risk, and more.',
  canonicalPath: routes.media,
  absoluteTitle: true,
})

export default function PressPage() {
  const { hero, items } = pressPage

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={hero} trail={trail} />

      <section className="py-(--spacing-section)">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal as="li" key={item.href} delay={Math.min(index, 5) * 50} className="flex min-w-0">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full min-w-0 flex-col rounded-(--radius-2xl) border border-border bg-surface p-6 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-7"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark">
                    {item.outlet}
                  </span>
                  <span className="mt-3 flex-1 font-display text-lg font-bold leading-snug text-text [overflow-wrap:anywhere]">
                    {item.headline}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark">
                    {item.outlet === 'YouTube' ? 'Watch the video' : 'Read the article'}
                    <Icon name="external-link" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    <span className="sr-only">(opens {item.outlet} in a new tab)</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingSection
        content={{
          title: 'Media Enquiries and Patient Questions',
          primaryCta: { label: 'Contact AOHC', href: routes.contact },
        }}
      />
    </>
  )
}
