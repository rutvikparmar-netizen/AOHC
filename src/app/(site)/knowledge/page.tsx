import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { resourcesPage } from '@/data/resources-page'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { ClosingSection } from '@/components/home/ClosingSection'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { ChecklistSection } from '@/components/home/ChecklistSection'

/**
 * RESOURCES AND BLOG — `/knowledge`
 *
 * THE ROUTE ALREADY EXISTED. `routes.knowledge` is the Knowledge menu's own
 * landing page and was a 404 reachable from every page on the site.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  NOTHING ON THIS PAGE IS A LINK TO AN ARTICLE, BECAUSE THERE ARE NO
 * ARTICLES. Both of the draft's headings begin "Suggested": the six
 * categories and the ten titles are a content plan, not a library. Making
 * either clickable before the writing exists would put ten dead ends on
 * the one page a reader comes to for something to read.
 *
 * The page says so, once, near the top. That sentence is the only copy
 * here that is not AOHC's, and it exists because the alternative is a
 * reader scrolling two lists, finding nothing clickable, and concluding
 * the site is broken. Delete it when the lists become links.
 *
 * ⚠️  THE ARTICLE TITLES ARE A NUMBERED LIST IN THE DRAFT, 8 TO 17 — an
 * artefact of its own running list. They render unnumbered; "8." as the
 * first of ten would read as a fault.
 *
 * ⚠️  THE EDITORIAL STANDARDS RENDER THROUGH `ChecklistSection` BECAUSE
 * THEY ARE EXACTLY ITS SHAPE: a lead sentence, a list of short
 * requirements, and a closing qualification. The qualification here is the
 * line about AI-generated medical content, which earns the component's
 * outro panel — it is the one sentence on this page a reader has a direct
 * interest in, and it should not be the last bullet of six.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Resources' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Cancer Information and Patient Resources',
  description:
    'The patient resources and articles Art of Healing Cancer is preparing — understanding a diagnosis, treatment options, molecular testing, side effects, nutrition and guidance for international patients — and the editorial standards each will be held to.',
  canonicalPath: routes.knowledge,
})

export default function ResourcesPage() {
  const { status, categories, articles, standards, closing } = resourcesPage

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={resourcesPage.hero} trail={trail} />

      {/* ── 1. What is coming ──────────────────────────────────────────
          Said before either list, not after. See the note above. */}
      <section className="pt-(--spacing-section)">
        <Container>
          <Reveal>
            <div className="flex items-start gap-4 rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-6 sm:gap-5 sm:p-7">
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary-dark"
              >
                <Icon name="info" className="size-5" />
              </span>
              <p className="self-center text-base leading-relaxed text-text">
                {status}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Resource categories ─────────────────────────────────────
          Described, not offered. Cards rather than links. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeader
              eyebrow={categories.eyebrow}
              title={categories.title}
            />
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {categories.items.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                direction="up"
                delay={(index % 3) * 60}
                className="flex"
              >
                <article className="flex h-full w-full flex-col gap-3 rounded-(--radius-2xl) border border-border bg-surface p-6">
                  <h3 className="font-display text-lg font-bold leading-snug text-text">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-neutral-700">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 3. Planned articles ────────────────────────────────────────
          ⚠️  TITLES, NOT LINKS, AND NOT AN `<a>` BETWEEN THEM. Rendered
          as ruled rows rather than cards so they read as a contents list
          of something unwritten rather than as ten articles waiting to
          be opened. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeader eyebrow={articles.eyebrow} title={articles.title} />
          </Reveal>

          <ul className="mt-10 grid gap-x-10 border-t border-border sm:grid-cols-2 lg:mt-12">
            {articles.items.map((title) => (
              <li
                key={title}
                className="flex items-start gap-3.5 border-b border-border py-4"
              >
                <Icon
                  name="file-search"
                  className="mt-0.5 size-5 shrink-0 text-text-subtle"
                />
                <span className="min-w-0 text-base leading-relaxed text-neutral-700">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 4. Editorial standards ─────────────────────────────────────
          Through the shared list section: a lead sentence, six short
          requirements, and the AI line as the closing qualification. */}
      <ChecklistSection
        content={{
          eyebrow: standards.eyebrow,
          title: standards.title,
          intro: standards.intro,
          items: standards.items,
          outro: standards.outro,
        }}
      />

      <ClosingSection
        content={{ title: closing.title, primaryCta: closing.cta }}
      />
    </>
  )
}
