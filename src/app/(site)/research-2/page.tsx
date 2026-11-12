import type { Metadata } from 'next'
import Link from 'next/link'
import type { Breadcrumb } from '@/types'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'

/**
 * RESEARCH — `/research-2`, the WordPress URL (the "-2" is WordPress's
 * duplicate-slug suffix; it is the URL with the impressions, so it stays).
 *
 * The live page is a heading, "RESEARCH", and two numbered links: "2
 * Deoxyglucose 2DG)" and "ECCT", to the articles migrated at `/2-deoxyglucose-2dg`
 * and `/ecct`. That is all it holds; it is reproduced as that. The first
 * label's missing "(" is restored. The hero line is written, not supplied.
 */

const PATH = routes.research

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Research' },
]

const ITEMS = [
  { label: '2 Deoxyglucose (2DG)', href: '/2-deoxyglucose-2dg' },
  { label: 'ECCT', href: '/ecct' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Research | Art of Healing Cancer',
  description: 'Research areas at Art of Healing Cancer: 2-deoxy-D-glucose (2DG) metabolic therapy and electro-capacitive cancer therapy (ECCT).',
  canonicalPath: PATH,
  absoluteTitle: true,
})

export default function ResearchPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero
        content={{ title: 'Research', body: ['The areas of research behind our treatment programmes.'] }}
        trail={trail}
      />

      <section className="py-(--spacing-section)">
        <Container>
          <ol className="grid max-w-3xl gap-5 sm:grid-cols-2">
            {ITEMS.map((item, index) => (
              <Reveal as="li" key={item.href} delay={index * 60} className="flex min-w-0">
                <Link
                  href={item.href}
                  className="group flex w-full min-w-0 items-center gap-5 rounded-(--radius-2xl) border border-border bg-surface p-6 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-7"
                >
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-subtle font-display text-xl font-bold text-primary-dark"
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-lg font-bold leading-snug text-text">
                    {item.label}
                  </span>
                  <Icon name="arrow-right" className="size-5 shrink-0 text-primary-dark transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
