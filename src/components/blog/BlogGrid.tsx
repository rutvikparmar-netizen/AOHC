'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

/**
 * The `/blogs` index: a topic filter over a grid of article cards.
 *
 * ⚠️  BOXES AND A FILTER, NOTHING ELSE — AOHC'S EXPLICIT BRIEF. A previous
 * version had a featured article, a sticky topic rail and numbered topic
 * shelves; it was rejected. Do not reintroduce any of them.
 *
 * Only the fields a card needs come down to the browser. The page passes
 * these instead of the full articles, which carry several thousand words
 * each that the index never shows.
 *
 * The filter is real `<button>`s with `aria-pressed`, so a screen reader
 * announces which topic is on, and the result count is announced
 * politely when it changes.
 */

export type BlogCard = {
  slug: string
  href: string
  title: string
  summary: string
  topic: string
  minutes: number
  references: number
  lang?: string
}

export function BlogGrid({
  cards,
  topics,
}: {
  cards: BlogCard[]
  topics: readonly { id: string; title: string }[]
}) {
  const [active, setActive] = useState<string>('all')
  const shown = active === 'all' ? cards : cards.filter((c) => c.topic === active)

  const filters = [
    { id: 'all', title: 'All', count: cards.length },
    ...topics
      .map((t) => ({ ...t, count: cards.filter((c) => c.topic === t.id).length }))
      .filter((t) => t.count > 0),
  ]

  return (
    <>
      <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = active === f.id
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f.id)}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-(--radius-pill) border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                on
                  ? 'border-primary-dark bg-primary-dark text-white'
                  : 'border-border bg-surface text-text-muted hover:border-accent hover:text-accent-dark'
              }`}
            >
              {f.title}
              <span
                className={`rounded-(--radius-pill) px-2 py-0.5 text-xs tabular-nums ${
                  on ? 'bg-white/15 text-white' : 'bg-surface-subtle text-text-subtle'
                }`}
              >
                {f.count}
              </span>
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {shown.length} {shown.length === 1 ? 'article' : 'articles'}
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((card) => (
          <li key={card.slug} className="flex min-w-0">
            <Link
              href={card.href}
              lang={card.lang}
              className="group/card flex w-full min-w-0 flex-col rounded-(--radius-2xl) border border-border bg-surface p-6 transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-7"
            >
              <p className="text-eyebrow uppercase text-primary-dark">
                {topics.find((t) => t.id === card.topic)?.title}
              </p>
              <h2 className="mt-3 font-display text-xl font-bold leading-snug text-text transition-colors group-hover/card:text-accent-dark">
                {card.title}
              </h2>
              {/* The wrapper takes the spare height so the paragraph does
                  not. `line-clamp` on a box that `flex-1` has stretched
                  taller than three lines paints a fourth line under the
                  ellipsis. */}
              <div className="mt-3 flex-1">
                <p className="line-clamp-3 text-base leading-relaxed text-neutral-700">
                  {card.summary}
                </p>
              </div>

              <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-4">
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-text-muted">
                  <li className="inline-flex items-center gap-1.5">
                    <Icon name="clock" className="size-4" />
                    {card.minutes} min read
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Icon name="book-open" className="size-4" />
                    {card.references} {card.references === 1 ? 'reference' : 'references'}
                  </li>
                  {card.lang === 'hi' ? (
                    <li className="rounded-(--radius-pill) bg-primary-subtle px-2.5 py-0.5 text-xs font-semibold text-primary-dark">
                      <span lang="hi">हिन्दी</span> · Hindi
                    </li>
                  ) : null}
                </ul>
                <span
                  aria-hidden
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-text-subtle transition-colors group-hover/card:border-accent group-hover/card:bg-accent group-hover/card:text-white"
                >
                  <Icon name="arrow-right" className="size-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
