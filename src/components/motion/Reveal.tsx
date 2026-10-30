'use client'

import { useEffect, useRef } from 'react'

/**
 * Reveals its children when they scroll into view.
 *
 * ONE SHARED OBSERVER FOR THE WHOLE PAGE, not one per element. A long landing
 * page holds forty or fifty of these; forty IntersectionObserver instances
 * each with their own callback is measurable work on a mid-range phone, and
 * entirely avoidable since they all want the same threshold.
 *
 * ONE-SHOT. Once an element has appeared it is unobserved and stays put.
 * Re-hiding content when it scrolls back out is a well-known way to make a
 * page feel broken — a reader scrolling up to re-read a sentence should not
 * watch it fade away.
 *
 * The element starts hidden in CSS (`[data-reveal]` in globals.css), so if
 * this component never mounts the content would be invisible — which is why
 * the layout ships a `<noscript>` override. See the note there.
 */

/** `tilt` is the 3D entrance — see `[data-reveal='tilt']` in globals.css. */
type Direction = 'up' | 'left' | 'right' | 'scale' | 'tilt'

/** Created lazily, shared, and never torn down — the page outlives it. */
let observer: IntersectionObserver | undefined

function getObserver(): IntersectionObserver | undefined {
  if (typeof IntersectionObserver === 'undefined') return undefined

  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-revealed', '')
        observer?.unobserve(entry.target)
      }
    },
    {
      /**
       * Fires a little BEFORE the element reaches the viewport edge, so the
       * transition is already running by the time it is properly visible.
       * Revealing exactly at the boundary reads as a lag rather than an
       * entrance.
       */
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.05,
    },
  )

  return observer
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  id,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  direction?: Direction
  /** Milliseconds. Stagger siblings with `delay={index * 70}`. */
  delay?: number
  className?: string
  /**
   * An anchor target on the revealed element.
   *
   * `EntryGrid` uses it so the Cancer Care menu can link straight to a
   * named cancer or treatment. Pair it with a `scroll-mt-*` in `className`
   * — the header is fixed, and without one it lands on top of whatever the
   * reader was sent to.
   */
  id?: string
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const io = getObserver()

    /**
     * Every path below sets the attribute on the DOM node directly rather
     * than through state.
     *
     * `data-revealed` is a presentational flag that CSS alone consumes — React
     * never needs to know it changed. Routing it through `useState` would
     * trigger a re-render per element for no benefit, and on a page holding
     * fifty of these that is fifty renders that do not change any markup.
     */

    // No IntersectionObserver (very old browser, or a test environment):
    // show the content rather than leaving it invisible forever.
    if (!io) {
      node.setAttribute('data-revealed', '')
      return
    }

    /**
     * Anything already on screen at mount is revealed synchronously.
     *
     * The observer would do this itself a frame later, but that frame is
     * visible as a flash of empty hero on a fast connection.
     */
    if (node.getBoundingClientRect().top < window.innerHeight) {
      node.setAttribute('data-revealed', '')
      return
    }

    io.observe(node)
    return () => io.unobserve(node)
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      id={id}
      data-reveal={direction}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  )
}
