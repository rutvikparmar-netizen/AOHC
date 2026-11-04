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
 * DOSING CALCULATOR — `/blogs/category/dosing-calculator`
 *
 * The WordPress category page, kept at its URL because it ranks (865
 * clicks in AOHC's Search Console export). It lists the same three
 * calculators the live one does, newest first as WordPress ordered them,
 * each with its own summary line from the live listing.
 *
 * ⚠️  NO AUTHOR LINE. The live listing credits every post to "admin
 * blogs", a WordPress account name, not a person. Left off rather than
 * presented as a byline.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: 'Dosing Calculator' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Dosing Calculators | Art of Healing Cancer',
  description:
    'AOHC dosing calculators: breast cancer chemotherapy (BSA and Calvert), fenbendazole and ivermectin tablet-dose calculators. Educational tools only, not medical advice.',
  canonicalPath: routes.dosingCalculators,
  absoluteTitle: true,
})

const tools = [
  {
    href: routes.breastChemoCalculator,
    title: 'AOHC Breast Cancer Chemotherapy Dosage Calculator',
    summary:
      'Comprehensive calculator for all major breast cancer chemotherapy drugs. BSA-based calculations with dose reduction options and precise carboplatin dosing using the Calvert formula.',
    date: '2025-08-30',
    dateLabel: '30 Aug 2025',
    tag: 'BSA + Calvert Formula',
  },
  {
    href: routes.fenbendazoleCalculator,
    title: 'Fenbendazole Dosage Calculator',
    summary:
      'Tablet-dose calculator based on real patient experiences. Cancer protocols: 222mg–2000mg daily; Non-cancer: 500–700mg daily. Strictly educational — requires medical supervision and liver monitoring.',
    date: '2025-08-29',
    dateLabel: '29 Aug 2025',
    tag: '≈ 3 min',
  },
  {
    href: routes.ivermectinCalculator,
    title: 'Ivermectin Dosing Calculator',
    summary:
      'Tablet-dose calculator. Presets only: Cancer (investigational): 0.4 mg/kg; Non-cancer (antiparasitic): 0.2 mg/kg. Strictly educational — never use without direct clinical guidance.',
    date: '2025-08-29',
    dateLabel: '29 Aug 2025',
    tag: '≈ 2 min',
  },
]

export default function DosingCalculatorCategoryPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero
        content={{
          title: 'Dosing Calculator',
          body: [
            'Educational dose calculators from the AOHC team. None of them is medical advice, and none replaces the prescribing clinician’s order.',
          ],
        }}
        trail={trail}
      />

      <section className="py-(--spacing-section)">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <Reveal as="li" key={tool.href} delay={index * 60} className="flex min-w-0">
                <Link
                  href={tool.href}
                  className="group/card flex w-full min-w-0 flex-col rounded-(--radius-2xl) border border-border bg-surface p-6 transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-7"
                >
                  <span
                    aria-hidden
                    className="flex size-11 items-center justify-center rounded-(--radius-xl) bg-primary-subtle text-primary-dark"
                  >
                    <Icon name="activity" className="size-5" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold leading-snug text-text transition-colors group-hover/card:text-accent-dark">
                    {tool.title}
                  </h2>
                  <div className="mt-3 flex-1">
                    <p className="text-base leading-relaxed text-neutral-700">{tool.summary}</p>
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-4">
                    <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="clock" className="size-4" />
                        <time dateTime={tool.date}>{tool.dateLabel}</time>
                      </span>
                      <span>{tool.tag}</span>
                    </p>
                    <span
                      aria-hidden
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-text-subtle transition-colors group-hover/card:border-accent group-hover/card:bg-accent group-hover/card:text-white"
                    >
                      <Icon name="arrow-right" className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
