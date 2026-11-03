import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { articleStats, articleTopics, migratedArticles } from '@/data/articles'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/shared/PageHero'
import { ClosingSection } from '@/components/home/ClosingSection'
import { BlogGrid, type BlogCard } from '@/components/blog/BlogGrid'

/**
 * BLOGS — `/blogs`
 *
 * ⚠️  BOXES AND A FILTER, NOTHING ELSE. That is AOHC's brief for this
 * page. An earlier redesign with a featured article, a sticky topic rail
 * and numbered shelves was rejected — see `BlogGrid`.
 *
 * ⚠️  NOT UNDER `/knowledge`. It was `/knowledge/blogs` until AOHC pointed
 * out that Knowledge is a dropdown, not a parent section. The old path
 * redirects here — see `next.config.ts`.
 *
 * ⚠️  THE HREFS ARE ROOT-LEVEL. An article listed here is at `/ecct`, not
 * `/blogs/ecct`, because that is the URL Google has indexed. See the
 * warning in `src/data/articles/index.ts` before "fixing" that.
 *
 * ⚠️  NO DATES, NO AUTHORS. The migration captured neither, and AOHC's own
 * editorial standards on `/knowledge` require both. That is a gap to close
 * with real dates, not to paper over with invented ones.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
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
  /* Card fields only — the full articles never reach the browser. */
  const cards: BlogCard[] = migratedArticles.map((a) => {
    const { minutes, references, lang } = articleStats(a.content)
    return {
      slug: a.slug,
      href: a.href,
      title: a.title,
      summary: a.summary,
      topic: a.topic,
      minutes,
      references,
      lang,
    }
  })

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
          <BlogGrid cards={cards} topics={articleTopics} />
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
