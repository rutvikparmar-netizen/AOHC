import Image from 'next/image'
import Link from 'next/link'
import type { ImageAsset, KnowledgeTeaser } from '@/types'
import { isExternalHref } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The knowledge section — a wide lead card and three below it.
 *
 * ⚠️  EVERY THUMBNAIL IS DECORATIVE STOCK, not a picture of the article.
 * The blog publishes no per-article artwork — all nine posts serve the AOHC
 * logo as their `og:image` — so these were added on the owner's instruction
 * from the set already on this page. The alt text describes the scene and
 * never the article, which is what keeps a stock photograph from reading as
 * a claim about the content behind it.
 *
 * The lead keeps its dark panel; the photograph sits beside the type rather
 * than behind it, so nothing has to be legible over a picture. The other
 * three are ordinary cards, image above the words.
 *
 * Every card is one link, not a title link plus a "read more" beside it.
 * Two targets for one destination is two tab stops and two things to aim at
 * on a phone.
 */

interface Featured {
  kicker: string
  title: string
  summary: string
  href: string
  image: ImageAsset
}

/**
 * These articles live on the current site, so the links leave this one. An
 * external href gets a plain anchor: `next/link` prefetches and
 * client-navigates, neither of which means anything off-site.
 */
function PostLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export function BlogSection({
  eyebrow,
  title,
  intro,
  featured,
  items,
  cta,
}: {
  eyebrow: string
  title: string
  intro: string
  featured: Featured
  items: KnowledgeTeaser[]
  cta: { label: string; href: string }
}) {
  return (
    <section className="bg-surface py-(--spacing-section)">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
        </Reveal>

        {/* ── The lead ─────────────────────────────────────────────────── */}
        <Reveal direction="up" className="mt-12">
          <PostLink
            href={featured.href}
            className="group grid overflow-hidden rounded-(--radius-3xl) bg-brand-teal-950 text-white transition-shadow duration-300 hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative aspect-16/9 overflow-hidden lg:aspect-auto lg:min-h-80">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-(--radius-pill) border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-teal-200">
                <Icon name="book-open" className="size-3.5" />
                {featured.kicker}
              </span>

              <h3 className="mt-6 font-display text-[clamp(1.625rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                {featured.title}
              </h3>

              <p className="mt-4 max-w-(--measure) text-base leading-relaxed text-brand-teal-100">
                {featured.summary}
              </p>

              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-teal-300">
                Start the series
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </PostLink>
        </Reveal>

        {/* ── The rest ─────────────────────────────────────────────────── */}
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post, index) => (
            <Reveal as="li" key={post.href} direction="up" delay={index * 70}>
              <PostLink
                href={post.href}
                className="group flex h-full flex-col overflow-hidden rounded-(--radius-2xl) border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-16/9 overflow-hidden">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-[0.08em] text-text-subtle">
                    {post.category}
                    {/* Only the articles that print a reading time get one.
                        The others are not estimated here. */}
                    {post.readingTime ? (
                      <>
                        <span aria-hidden>·</span>
                        <span className="font-semibold normal-case tracking-normal">
                          {post.readingTime}
                        </span>
                      </>
                    ) : null}
                  </span>

                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-text transition-colors group-hover:text-accent-dark">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {post.summary}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-accent-dark">
                    Read it
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </PostLink>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Button
            href={cta.href}
            variant="secondary"
            icon="arrow-right"
            className="mt-10 w-full rounded-(--radius-pill) sm:w-fit"
          >
            {cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
