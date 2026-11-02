import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import Link from 'next/link'
import { migratedArticles } from '@/data/articles'
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
 * BLOGS — `/knowledge/blogs`
 *
 * THE ROUTE ALREADY EXISTED AND WAS A 404. `routes.blogs` is in the
 * Knowledge dropdown and the footer on every page of the site; until now
 * it went nowhere. The seven migrated articles give it something to be.
 *
 * ⚠️  THESE ARE LINKS, UNLIKE THE TITLES ON `/knowledge`. That page lists
 * ten articles AOHC intends to write and deliberately does not link them,
 * because they do not exist. These seven do exist, so they are linked.
 * The two pages are not inconsistent — they are showing different things,
 * and `/knowledge` now says so.
 *
 * ⚠️  THE HREFS ARE ROOT-LEVEL AND DO NOT LIVE UNDER THIS PAGE. An article
 * listed here is at `/ecct`, not `/knowledge/blogs/ecct`, because that is
 * the URL Google has indexed. This index is a way in, not a parent. See
 * the warning in `src/data/articles/index.ts` before "fixing" that.
 *
 * ⚠️  NO DATES, NO AUTHORS, NO CATEGORIES. The WordPress originals carry
 * all three and none was captured in the migration, so none is shown.
 * Invented dates on clinical articles would be worse than no dates —
 * AOHC's own editorial standards, published on `/knowledge`, require "the
 * date of publication and last medical review" on every article. Not one
 * of these seven has either yet, which is a gap to close, not to paper
 * over.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Knowledge', href: routes.knowledge },
  { label: 'Blogs' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Blogs and Articles | Art of Healing Cancer',
  description:
    'Articles from the Art of Healing Cancer team on cancer diagnosis, treatment mechanisms and supportive therapies — including vitamin C and G6PD deficiency, myeloproliferative neoplasms and breast cancer radiology.',
  canonicalPath: routes.blogs,
  absoluteTitle: true,
})

export default function BlogsPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero
        content={{
          title: 'Articles From the Care Team',
          body: [
            'Writing from Art of Healing Cancer on cancer diagnosis, the mechanisms behind particular treatments, and the supportive therapies patients ask about most.',
            'Each article is educational. None of it is individual medical advice, and none of it replaces a conversation with your own treating team.',
          ],
        }}
        trail={trail}
      />

      <section className="py-(--spacing-section)">
        <Container>
          {/* Ruled rows rather than cards: seven items with no images,
              no dates and no authors have nothing to put in a card.

              ⚠️  TWO COLUMNS, AND NOT BY PREFERENCE. At `max-w-4xl` the
              list stopped halfway across a 1440 viewport and left the
              right half of the page empty — the same failure the contact
              page's sidebar had. Two columns is also the pattern
              `/knowledge` already uses for its list of article titles, so
              the two pages now look related, which they are. */}
          <ul className="grid border-t border-border lg:grid-cols-2 lg:gap-x-14">
            {migratedArticles.map((article, index) => (
              <Reveal
                as="li"
                key={article.slug}
                delay={Math.min(index, 5) * 50}
                className="border-b border-border"
              >
                <Link
                  href={article.href}
                  className="group/row flex h-full items-start gap-5 py-6 transition-colors hover:bg-primary-subtle/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:gap-6 sm:py-7"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-h5 font-bold leading-snug text-text transition-colors group-hover/row:text-accent-dark">
                      {article.title}
                    </span>
                    <span className="mt-2 block max-w-(--measure) text-base leading-relaxed text-neutral-700">
                      {article.summary}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="mt-1.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-text-subtle transition-all group-hover/row:border-accent group-hover/row:bg-accent group-hover/row:text-white"
                  >
                    <Icon name="arrow-right" className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingSection
        content={{
          title: 'Have a Question About Your Diagnosis?',
          primaryCta: { label: 'Contact AOHC', href: routes.contact },
        }}
      />
    </>
  )
}
