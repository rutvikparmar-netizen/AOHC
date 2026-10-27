'use client'

import { useEffect, useRef } from 'react'

/**
 * The header's scroll state: transparent over the hero at the top of the
 * page, frosted and compact once you have scrolled.
 *
 * ONE HEADER, NOT TWO. The obvious way to build this is to leave the
 * transparent header inside the hero and slide a second, solid one down from
 * the top once the hero has gone. That ships the whole navigation twice —
 * two "Main" landmarks, every link duplicated for a screen reader and for a
 * crawler, and two things to keep in step. This is the same header
 * throughout; only its paint changes.
 *
 * WHICH IS WHY IT IS `fixed` RATHER THAN `sticky`. Sticky would have to sit
 * in the flow above the hero and be pulled back over it with a negative
 * margin, and it cannot live inside the hero card at all — that card is
 * `overflow-hidden`, which makes it the scroll container and would pin the
 * header inside the card instead of the viewport. Fixed needs neither trick.
 *
 * USES A SENTINEL AND AN INTERSECTION OBSERVER, NOT A SCROLL LISTENER.
 * A `scroll` handler fires on every frame of every scroll and has to read
 * `scrollY`, which forces layout. A sentinel fires twice — once on the way
 * out of view, once on the way back — and costs nothing in between. On a
 * long page read on a mid-range phone, that difference is most of the scroll
 * budget.
 *
 * The sentinel is 6rem tall rather than a single pixel, so the header stays
 * clear over the top of the hero for the first bit of travel instead of
 * frosting the moment the page moves. It cancels its own height with an
 * equal negative margin, so it occupies a real 96px box at the top of the
 * document for the observer to watch while adding nothing to the layout.
 *
 * IN THE FLOW, NOT ABSOLUTELY POSITIONED. An absolute sentinel resolves
 * against the initial containing block and sits inside `body`, which this
 * site gives `overflow-x: clip` — enough questions about clip rectangles
 * and containing blocks to be worth not asking. A box in normal flow has
 * none of them.
 *
 * `data-scrolled` is toggled on the DOM directly rather than held in state:
 * it is a presentational flag that only CSS reads, so a re-render would
 * change no markup. The header's own classes respond to it through
 * `group-data-[scrolled]/header:` — the styling stays on the elements it
 * applies to rather than being remote-controlled from here.
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
        if (entry) shell.toggleAttribute('data-scrolled', !entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none -mb-24 h-24 w-full"
      />
      {/**
       * TWO ELEMENTS: the outer one is the group and the positioning, the
       * inner one is the paint.
       *
       * The bar's own background was written as `data-[scrolled]:bg-...`
       * on this element and did not take effect, while the
       * `group-data-[scrolled]/header:` rules on the logo and the links —
       * which drive everything else about this state — worked. Rather than
       * keep two mechanisms where one of them is unreliable, the painted
       * bar is now a child of the group and uses the same variant as the
       * rest of the header.
       *
       * ⚠️  SOLID, NOT TRANSLUCENT, AND NOT BY PREFERENCE. Written as
       * `bg-surface/95` with a `backdrop-blur-xl` behind it, the bar did
       * not paint at all: a named-group variant combined with an opacity
       * modifier — `group-data-[scrolled]/header:bg-surface/95` — produced
       * no rule, while the same variant without the `/95` does. Both
       * slashes in one class appear to be one too many for the parser.
       *
       * Opaque white is also the better answer here regardless. The bar
       * passes over photographs, a dark globe panel and a white form, and
       * anything translucent lets the busier of those read through enough
       * to make the menu hard to follow.
       *
       * If a frosted bar is wanted later, set the colour and the blur in
       * CSS rather than reaching for the opacity modifier again — and
       * check it paints before trusting it.
       */}
      <div
        ref={shellRef}
        className="group/header fixed inset-x-0 top-0 z-(--z-header)"
      >
        {/**
         * THE BAR STARTS LOW AND RISES. From `lg` the hero card is inset by
         * `--gutter` on all four sides, so the top of the window there is
         * the warm page, not the card — and a transparent bar with white
         * type on it would be invisible. At rest the bar is dropped by that
         * same gutter so it sits over the card; once scrolled it goes to
         * the top of the window and takes its background with it.
         */}
        <div className="transition-[background-color,box-shadow,margin] duration-300 ease-(--ease-out-soft) group-data-[scrolled]/header:bg-surface group-data-[scrolled]/header:shadow-(--shadow-header) lg:mt-(--gutter) lg:group-data-[scrolled]/header:mt-0">
          {children}
        </div>
      </div>
    </>
  )
}
