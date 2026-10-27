'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'

/**
 * A horizontal, snapping rail with previous/next controls.
 *
 * SHARED BY THE DOCTORS AND TESTIMONIALS SLIDERS, because they are the same
 * interaction and were about to become two subtly different implementations
 * of it.
 *
 * AUTOPLAY IS OPTIONAL AND STOPS THE MOMENT IT IS TOUCHED. There is no pause
 * button any more; the rule that button satisfied, and what now stands in for
 * it, are written out in full above the autoplay effect.
 *
 * SCROLL-SNAP DOES THE WORK. The track is a native overflow container, so
 * touch swiping, trackpad gestures, keyboard scrolling and screen-reader
 * navigation all work without being reimplemented. The buttons call
 * `scrollBy`, which means the two input paths cannot disagree about position.
 */
export function CardRail({
  children,
  label,
  onDark,
  /** Rendered beside the controls — a heading, a count, anything. */
  aside,
  /** Advances on a timer until the reader touches it; see below. */
  autoplay = false,
}: {
  children: React.ReactNode
  /** Accessible name for the scrollable region. */
  label: string
  onDark?: boolean
  aside?: React.ReactNode
  autoplay?: boolean
}) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  /**
   * Set once the reader does anything deliberate with the rail, and never
   * unset. See the autoplay effect for why this replaced a pause button.
   */
  const [surrendered, setSurrendered] = useState(false)

  const syncEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    setAtStart(track.scrollLeft <= 8)
    // 8px of slack: sub-pixel scroll widths mean an exact comparison never
    // reports the end at some zoom levels.
    setAtEnd(track.scrollLeft >= max - 8)
  }, [])

  useEffect(() => {
    syncEdges()
    const track = trackRef.current
    if (!track) return

    /**
     * Any deliberate act on the rail stops the autoplay for good. These three
     * events are the ones a person generates and the timer does not:
     * `scrollBy({ behavior: 'smooth' })` fires neither a pointer, a key nor a
     * wheel event, so the rail can never mistake itself for the reader.
     */
    const surrender = () => setSurrendered(true)

    track.addEventListener('scroll', syncEdges, { passive: true })
    track.addEventListener('pointerdown', surrender, { passive: true })
    track.addEventListener('wheel', surrender, { passive: true })
    track.addEventListener('keydown', surrender)
    window.addEventListener('resize', syncEdges)
    return () => {
      track.removeEventListener('scroll', syncEdges)
      track.removeEventListener('pointerdown', surrender)
      track.removeEventListener('wheel', surrender)
      track.removeEventListener('keydown', surrender)
      window.removeEventListener('resize', syncEdges)
    }
  }, [syncEdges])

  const step = useCallback((direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    // One card plus its gap, measured off the first child so the step stays
    // correct at every breakpoint without hard-coded widths.
    const card = track.firstElementChild as HTMLElement | null
    const distance = card ? card.offsetWidth + 20 : track.clientWidth * 0.8
    track.scrollBy({ left: distance * direction, behavior: 'smooth' })
  }, [])

  /**
   * AUTOPLAY — AND WHAT REPLACED THE PAUSE BUTTON.
   *
   * ⚠️  The visible pause/play toggle was removed on request. That toggle was
   * what satisfied `auto-rotation-controls` (WCAG 2.2.2): content that starts
   * moving by itself and runs for more than five seconds is supposed to carry
   * a mechanism to pause, stop or hide it. Hover and focus pausing is NOT
   * generally accepted as that mechanism.
   *
   * So the rail gives up instead. Three things stop it, two of them for good:
   *
   *   - `prefers-reduced-motion` prevents it ever starting;
   *   - hovering or focusing holds it while the pointer or focus is inside;
   *   - any deliberate act — an arrow press, a swipe, a drag, a keyboard
   *     scroll — stops it permanently for the rest of the visit.
   *
   * That last one is the real substitute: the first thing anyone does when
   * they want a carousel to stop is touch it, and here that works. It is a
   * weaker guarantee than a labelled button, and the honest fix if this ever
   * needs to pass an audit is to drop `autoplay` rather than to re-derive a
   * control from scroll events.
   *
   * At the end it rewinds to the start instead of stopping, which is what
   * makes it read as a loop rather than as something that broke.
   */
  useEffect(() => {
    if (!autoplay || surrendered) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const track = trackRef.current
    if (!track) return

    let held = false
    const hold = () => {
      held = true
    }
    const release = () => {
      held = false
    }

    track.addEventListener('pointerenter', hold)
    track.addEventListener('pointerleave', release)
    track.addEventListener('focusin', hold)
    track.addEventListener('focusout', release)

    const timer = window.setInterval(() => {
      if (held) return
      const max = track.scrollWidth - track.clientWidth
      if (track.scrollLeft >= max - 8) {
        track.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        step(1)
      }
    }, 4500)

    return () => {
      window.clearInterval(timer)
      track.removeEventListener('pointerenter', hold)
      track.removeEventListener('pointerleave', release)
      track.removeEventListener('focusin', hold)
      track.removeEventListener('focusout', release)
    }
  }, [autoplay, surrendered, step])

  const button = onDark
    ? 'border-white/25 text-white hover:bg-white hover:text-brand-teal-900 disabled:opacity-30'
    : 'border-border-strong text-text hover:border-accent hover:bg-accent hover:text-white disabled:opacity-35'

  return (
    <div>
      {/* STACKED ON PHONES. Side by side, the two 48px arrows plus their
          gaps leave the caption about 160px at 320px, which broke "Showing
          7 of 12 specialists. See the full team." over five lines next to
          the controls. */}
      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="min-w-0">{aside}</div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              setSurrendered(true)
              step(-1)
            }}
            disabled={atStart}
            aria-label={`Previous — ${label}`}
            className={`inline-flex size-12 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${button}`}
          >
            <Icon name="arrow-left" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setSurrendered(true)
              step(1)
            }}
            disabled={atEnd}
            aria-label={`Next — ${label}`}
            className={`inline-flex size-12 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${button}`}
          >
            <Icon name="arrow-right" className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="scroll-rail gap-5 pb-2"
        /* A scrollable region must be focusable and labelled, or keyboard
           users can neither reach it nor tell what it is. */
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        {children}
      </ul>
    </div>
  )
}
