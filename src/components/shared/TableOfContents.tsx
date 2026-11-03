'use client'

import { useEffect, useState } from 'react'

export type TocEntry = { id: string; title: string; level: 2 | 3 }

/**
 * Article table of contents, with the section being read highlighted.
 *
 * Highlighting is the one reason this is a client component. Without
 * JavaScript it is still a working list of anchor links, which is all a
 * table of contents strictly has to be.
 *
 * ⚠️  THE LIST SCROLLS INSIDE ITS OWN BOX once it is taller than the
 * viewport allows, as in AOHC's reference design. The mistletoe article
 * has fourteen headings; without the cap the sticky box would run off the
 * bottom of the screen and the last entries could never be reached.
 *
 * "Active" is the last heading to have crossed a line just under the
 * fixed header. The bottom margin of -65% means a heading counts once it
 * is in the top third of the screen, not merely visible somewhere.
 */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState<string>(entries[0]?.id ?? '')

  useEffect(() => {
    const els = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-120px 0px -65% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [entries])

  return (
    <ul className="max-h-[calc(100dvh-14rem)] space-y-0.5 overflow-y-auto overscroll-contain">
      {entries.map((entry) => {
        const on = entry.id === active
        return (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={on ? 'location' : undefined}
              onClick={() => setActive(entry.id)}
              className={`block border-l-2 py-2 pr-2 text-sm leading-snug transition-colors ${
                entry.level === 3 ? 'pl-7' : 'pl-4'
              } ${
                on
                  ? 'border-accent bg-primary-subtle font-semibold text-primary-dark'
                  : 'border-transparent text-text-muted hover:border-border-strong hover:text-text'
              }`}
            >
              {entry.title}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
