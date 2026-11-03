import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import Link from 'next/link'
import {
  articleStats,
  articleTopics,
  migratedArticles,
  type MigratedArticle,
} from '@/data/articles'
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
 * BLOGS — `/blogs`
 *
 * ⚠️  NOT UNDER `/knowledge`. It was `/knowledge/blogs` until AOHC pointed
 * out that Knowledge is a dropdown, not a parent section. The old path
 * redirects here — see `next.config.ts`.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE DESIGN: AN EDITORIAL TABLE OF CONTENTS, NOT A FEED.
 *
 * The articles have no images, no dates and no authors — the migration
 * captured none — so a card grid in the usual blog style would be a wall
 * of identical grey boxes. Instead the page is built from what the
 * articles DO have:
 *
 *   1. ONE FEATURED ARTICLE, set large. It is the G6PD piece, chosen
 *      because it is the most thoroughly referenced article on the site
 *      (26 citations) and because it is a safety article — the one a
 *      reader considering IV vitamin C most needs. Change `FEATURED` to
 *      feature another.
 *   2. NUMBERED TOPIC SHELVES, with a sticky index beside them on desktop
 *      and jump-chips above them on a phone. Thirteen articles in one list
 *      is a scroll; five labelled shelves is a contents page.
 *   3. CARDS THAT CARRY FACTS, NOT DECORATION — reading time, reference
 *      count and language, every one computed from the article itself by
 *      `articleStats`. "26 references" beside "0 references" tells a
 *      reader something true about how each piece is supported, which is
 *      more useful to someone deciding what to trust than any stock photo.
 *
 * ⚠️  THE REFERENCE COUNT IS SHOWN EVEN WHEN IT IS ZERO, AND THAT IS THE
 * POINT. Hiding it on the unreferenced pages would make them look like
 * the referenced ones. A reader is better served seeing the difference.
 *
 * ⚠️  THE HREFS ARE ROOT-LEVEL. An article listed here is at `/ecct`, not
 * `/blogs/ecct`, because that is the URL Google has indexed. See the
 * warning in `src/data/articles/index.ts` before "fixing" that.
 *
 * ⚠️  NO DATES, NO AUTHORS. AOHC's own editorial standards on `/knowledge`
 * require "the date of publication and last medical review" on every
 * article, and none of these has either yet. That is a gap to close with
 * real dates, not to paper over with invented ones.
 */

const FEATURED = 'vitamin-c-infusion-and-g6pd-deficiency'

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

/** "8 min read · 26 references" — the facts row every card shares. */
function Facts({ article, light = false }: { article: MigratedArticle; light?: boolean }) {
  const { minutes, references, lang } = articleStats(article.content)
  const tone = light ? 'text-brand-teal-200' : 'text-text-muted'
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm ${tone}`}>
      <li className="inline-flex items-center gap-1.5">
        <Icon name="clock" className="size-4" />
        {minutes} min read
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Icon name="book-open" className="size-4" />
        {references} {references === 1 ? 'reference' : 'references'}
      </li>
      {lang === 'hi' ? (
        <li>
          <span
            className={
              light
                ? 'rounded-(--radius-pill) bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white'
                : 'rounded-(--radius-pill) bg-primary-subtle px-2.5 py-0.5 text-xs font-semibold text-primary-dark'
            }
          >
            <span lang="hi">हिन्दी</span> · Hindi
          </span>
        </li>
      ) : null}
    </ul>
  )
}

export default function BlogsPage() {
  const featured = migratedArticles.find((a) => a.slug === FEATURED)
  const shelves = articleTopics
    .map((topic) => ({
      ...topic,
      articles: migratedArticles.filter((a) => a.topic === topic.id && a.slug !== FEATURED),
    }))
    .filter((shelf) => shelf.articles.length > 0)

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

      {/* ── 1. Featured ───────────────────────────────────────────────
          Straddles the hero's foot like the contact page's channel cards,
          which is why it needs `relative z-10` and the negative margin —
          `PageHero` carries the bottom padding it overlaps into. */}
      {featured ? (
        <section className="relative z-10 -mt-10 lg:-mt-14">
          <Container>
            <Reveal>
              <Link
                href={featured.href}
                className="group/feat grid overflow-hidden rounded-(--radius-3xl) bg-brand-teal-900 text-white shadow-(--shadow-card) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:grid-cols-12"
              >
                <div className="p-7 sm:p-10 lg:col-span-8 lg:p-12">
                  <p className="text-eyebrow uppercase text-brand-teal-300">
                    Start here ·{' '}
                    {articleTopics.find((t) => t.id === featured.topic)?.title}
                  </p>
                  <h2 className="mt-4 max-w-2xl font-display text-h2 font-bold leading-[1.1] tracking-[-0.02em] text-white">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-(--measure) text-lg leading-relaxed text-brand-teal-100">
                    {featured.summary}
                  </p>
                  <div className="mt-7">
                    <Facts article={featured} light />
                  </div>
                </div>

                {/* The right panel states the one fact that makes this the
                    featured piece — how thoroughly it is referenced —
                    instead of standing in for an image the article does
                    not have. The number is computed, not typed. */}
                <div className="flex flex-col justify-between gap-8 border-t border-white/10 bg-brand-teal-950/60 p-7 sm:p-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-12">
                  <p>
                    <span className="block font-display text-6xl font-bold leading-none tabular-nums text-white">
                      {articleStats(featured.content).references}
                    </span>
                    <span className="mt-2 block text-sm text-brand-teal-200">
                      references cited in the article
                    </span>
                  </p>
                  <span className="inline-flex items-center gap-3 font-semibold text-white">
                    Read the article
                    <span
                      aria-hidden
                      className="flex size-11 items-center justify-center rounded-full bg-accent transition-transform duration-300 group-hover/feat:translate-x-1"
                    >
                      <Icon name="arrow-right" className="size-5" />
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── 2. The shelves ─────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Topic index. Wrapped chips on a phone, a sticky contents
                rail from `lg`. Same links either way, so it is one nav
                with two layouts rather than two navs. */}
            <nav aria-label="Article topics" className="min-w-0 lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="text-eyebrow uppercase text-primary-dark">Topics</p>
                <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-l-2 lg:border-border">
                  {shelves.map((shelf, i) => (
                    <li key={shelf.id}>
                      <a
                        href={`#${shelf.id}`}
                        className="flex min-h-11 items-center gap-2 rounded-(--radius-pill) border border-border bg-surface px-4 text-sm font-semibold text-text-muted transition-colors hover:border-accent hover:text-accent-dark lg:-ml-0.5 lg:min-h-0 lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:bg-transparent lg:py-2.5 lg:pl-4 lg:hover:border-accent"
                      >
                        <span className="tabular-nums text-text-subtle">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0">{shelf.title}</span>
                        <span className="ml-auto pl-2 tabular-nums text-xs text-text-subtle">
                          {shelf.articles.length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="min-w-0 space-y-14 lg:col-span-9 lg:space-y-16">
              {shelves.map((shelf, i) => (
                <section
                  key={shelf.id}
                  id={shelf.id}
                  aria-labelledby={`${shelf.id}-title`}
                  className="scroll-mt-32"
                >
                  <Reveal className="flex items-baseline gap-4 border-b border-border pb-4">
                    <span
                      aria-hidden
                      className="font-display text-h3 font-bold tabular-nums text-accent"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2
                      id={`${shelf.id}-title`}
                      className="font-display text-h3 font-bold leading-snug tracking-[-0.02em] text-text"
                    >
                      {shelf.title}
                    </h2>
                  </Reveal>

                  <ul className="mt-6 grid gap-5 md:grid-cols-2">
                    {shelf.articles.map((article, j) => (
                      <Reveal
                        as="li"
                        key={article.slug}
                        delay={(j % 2) * 60}
                        /* A lone last card spans the row, so a shelf of
                           one or three never leaves a half-empty line. */
                        className={`flex min-w-0 ${
                          shelf.articles.length % 2 === 1 && j === shelf.articles.length - 1
                            ? 'md:col-span-2'
                            : ''
                        }`}
                      >
                        <Link
                          href={article.href}
                          lang={article.content.lang}
                          className="group/card flex w-full min-w-0 flex-col rounded-(--radius-2xl) border border-border bg-surface p-6 transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-7"
                        >
                          <h3 className="font-display text-xl font-bold leading-snug text-text transition-colors group-hover/card:text-accent-dark">
                            {article.title}
                          </h3>
                          <p className="mt-3 line-clamp-3 flex-1 text-base leading-relaxed text-neutral-700">
                            {article.summary}
                          </p>
                          <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-4">
                            <Facts article={article} />
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
                </section>
              ))}
            </div>
          </div>
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
