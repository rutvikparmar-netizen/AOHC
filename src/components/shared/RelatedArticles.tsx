import Link from 'next/link'
import { migratedArticles } from '@/data/articles'
import { topicOf } from '@/data/hero-images'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'

/**
 * "Related reading" — four links to other pages on the same topic, at the
 * foot of every migrated article. Internal links are how both readers and
 * crawlers move between the ~200 articles; before this, an article linked
 * to nothing.
 *
 * WHICH FOUR: the pages that follow this one in its topic's list, wrapping
 * round. Every page in a group is linked from some sibling, instead of all
 * of them pointing at the same first four.
 */
export function RelatedArticles({ href }: { href: string }) {
  const topic = topicOf(href.slice(1)).id
  const group = migratedArticles.filter((a) => topicOf(a.href.slice(1)).id === topic)
  const at = group.findIndex((a) => a.href === href)
  if (group.length < 2 || at < 0) return null
  const picks = Array.from({ length: Math.min(4, group.length - 1) }, (_, i) => group[(at + 1 + i) % group.length]!)

  return (
    <section aria-labelledby="related-reading" className="pb-(--spacing-section)">
      <Container>
        <h2 id="related-reading" className="font-display text-2xl font-bold text-text">
          Related reading
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((a) => (
            <li key={a.href} className="flex min-w-0">
              <Link
                href={a.href}
                className="group flex w-full min-w-0 flex-col rounded-(--radius-2xl) border border-border bg-surface p-5 shadow-(--shadow-xs) transition-shadow duration-300 hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span className="flex-1 font-display text-base font-bold leading-snug text-text [overflow-wrap:anywhere]">
                  {a.title}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark">
                  Read
                  <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
