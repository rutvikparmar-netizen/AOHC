'use client'

import { useEffect, useRef } from 'react'

/**
 * Makes the header compact once the page has scrolled.
 *
 * USES A SENTINEL AND AN INTERSECTION OBSERVER, NOT A SCROLL LISTENER.
 * A `scroll` handler fires on every frame of every scroll and has to read
 * `scrollY`, which forces layout. A one-pixel sentinel above the header fires
 * twice — once on the way out of view, once on the way back — and costs
 * nothing in between. On a long page read on a mid-range phone, that
 * difference is most of the scroll budget.
 *
 * The attribute is toggled on the DOM directly rather than through state: it
 * is a presentational flag only CSS consumes, so a re-render would change no
 * markup.
 */
export function StickyHeaderShell({ children }: { children: React.ReactNode }) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    const shell = shellRef.current
    if (!sentinel || !shell || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Sentinel out of view === the page has scrolled past the top.
        if (entry) shell.toggleAttribute('data-compact', !entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      <div
        ref={shellRef}
        className="sticky top-0 z-(--z-header) [&[data-compact]]:shadow-(--shadow-header) [&[data-compact]_[data-header-logo]]:h-10 [&[data-compact]_[data-header-row]]:min-h-16 [&[data-compact]_[data-header-utility]]:hidden"
      >
        {children}
      </div>
    </>
  )
}
