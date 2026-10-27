import Link from 'next/link'
import { isExternalHref } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The knowledge section — one lead article beside a numbered list.
 *
 * NO THUMBNAILS, AND THAT IS THE DESIGN RATHER THAN A GAP. The blog
 * publishes none, and the alternative — a stock photograph per card, or a
 * tinted rectangle standing in for one — would make three long technical
 * explainers look like a magazine. What these articles have is their
 * titles and their first lines, so the layout is built from type: a dark
 * panel for the series, then rules, numerals and headlines for the rest.
 * If real artwork ever arrives, the lead panel is where it belongs first.
 *
 * THE LEAD IS DARK ON A LIGHT SECTION, which is the only inversion on this
 * part of the page and does the work a picture would otherwise do — it
 * tells you where to start without a label saying "featured".
 *
 * Every row is one link, not a title link plus a "read more" link beside
 * it. Two targets for one destination is two tab stops and two things to
 * aim at on a phone.
 */

interface Post {
  title: string
  category: string
  summary: string
  href: string
  readingTime?: string
}

interface Featured {
  kicker: string
  title: string
  summary: string
  href: string
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
  items: Post[]
  cta: { label: string; href: string }
}) {
  return (
    <section className="bg-surface py-(--spacing-section)">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* ── The lead ─────────────────────────────────────────────── */}
          <Reveal direction="left">
            <PostLink
              href={featured.href}
              className="group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-(--radius-3xl) bg-brand-teal-950 p-8 text-white transition-shadow duration-300 hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-10"
            >
              {/* The same lit-sphere glow the globe section uses, so the two
                  dark panels on this page belong to each other. */}
              <span
                aria-hidden
                className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-primary/20 blur-3xl"
              />

              <div>
                <span className="inline-flex items-center gap-2 rounded-(--radius-pill) border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-teal-200 backdrop-blur-md">
                  <Icon name="book-open" className="size-3.5" />
                  {featured.kicker}
                </span>

                <h3 className="mt-6 font-display text-[clamp(1.625rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                  {featured.title}
                </h3>

                <p className="mt-4 max-w-(--measure) text-base leading-relaxed text-brand-teal-100">
                  {featured.summary}
                </p>
              </div>

              <span className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-brand-teal-300">
                Start the series
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </PostLink>
          </Reveal>

          {/* ── The rest, as a numbered list ─────────────────────────── */}
          <Reveal direction="right" delay={100}>
            <ol className="divide-y divide-border border-y border-border">
              {items.map((post, index) => (
                <li key={post.href}>
                  <PostLink
                    href={post.href}
                    className="group flex gap-4 py-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:gap-5"
                  >
                    <span className="pt-0.5 font-display text-sm font-bold tabular-nums text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-[0.08em] text-text-subtle">
                        {post.category}
                        {/* Only the articles that print a reading time get
                            one. The other two are not estimated here. */}
                        {post.readingTime ? (
                          <>
                            <span aria-hidden>·</span>
                            <span className="font-semibold normal-case tracking-normal">
                              {post.readingTime}
                            </span>
                          </>
                        ) : null}
                      </span>

                      <span className="mt-2 block font-display text-lg font-bold leading-snug text-text transition-colors group-hover:text-accent-dark">
                        {post.title}
                      </span>

                      <span className="mt-2 block text-sm leading-relaxed text-neutral-700">
                        {post.summary}
                      </span>
                    </span>

                    <Icon
                      name="arrow-right"
                      className="mt-1 size-5 shrink-0 text-text-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </PostLink>
                </li>
              ))}
            </ol>

            <Reveal>
              <Button
                href={cta.href}
                variant="secondary"
                icon="arrow-right"
                className="mt-8 w-full rounded-(--radius-pill) sm:w-fit"
              >
                {cta.label}
              </Button>
            </Reveal>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
