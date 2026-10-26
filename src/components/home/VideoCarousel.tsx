'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { VideoItem } from '@/types'
import { Icon } from '@/components/ui/Icon'

/**
 * Patient testimonial carousel.
 *
 * IT DOES NOT AUTO-ROTATE, AND THAT IS THE DESIGN.
 * `auto-rotation-controls` requires any moving content to carry pause/stop
 * controls and to halt on focus or reduced motion. The simplest way to satisfy
 * all of that is not to move on its own in the first place — these are
 * three-minute videos about people's cancer treatment, which nobody should
 * have snatched away mid-read by a timer.
 *
 * SCROLL-SNAP DOES THE WORK. The track is a native overflow container with
 * snap points, so touch and trackpad swiping, keyboard scrolling and screen
 * reader navigation all work without any of it being reimplemented. The
 * buttons simply call `scrollBy`, which means the two input methods cannot
 * disagree about position.
 *
 * Each card is a link to YouTube, so the whole thing degrades to a plain
 * scrollable list of links if this component never hydrates.
 */
export function VideoCarousel({ items }: { items: VideoItem[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  /** Disables the arrow you cannot usefully press. */
  const syncEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    setAtStart(track.scrollLeft <= 8)
    // 8px of slack: sub-pixel scroll widths mean an exact comparison never
    // reports the end on some zoom levels.
    setAtEnd(track.scrollLeft >= max - 8)
  }, [])

  useEffect(() => {
    syncEdges()
    const track = trackRef.current
    if (!track) return

    track.addEventListener('scroll', syncEdges, { passive: true })
    window.addEventListener('resize', syncEdges)
    return () => {
      track.removeEventListener('scroll', syncEdges)
      window.removeEventListener('resize', syncEdges)
    }
  }, [syncEdges])

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    // One card plus its gap, read off the first child so the step stays
    // correct at every breakpoint without hard-coding widths.
    const card = track.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.8
    track.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous testimonials"
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-accent hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Icon name="arrow-left" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next testimonials"
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-accent hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Icon name="arrow-right" className="size-5" />
        </button>
      </div>

      <ul
        ref={trackRef}
        className="scroll-rail gap-5 pb-2"
        // A scrollable region needs to be focusable and labelled, or keyboard
        // users can neither reach it nor know what it is.
        tabIndex={0}
        role="group"
        aria-label="Patient testimonial videos"
      >
        {items.map((item) => (
          <li key={item.href} className="w-[82vw] max-w-md sm:w-[55vw] lg:w-[26rem]">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-(--radius-2xl) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <div className="relative aspect-16/9 overflow-hidden rounded-(--radius-2xl) border border-white/12 bg-brand-teal-900">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail.src}
                    alt=""
                    width={item.thumbnail.width}
                    height={item.thumbnail.height}
                    sizes="(min-width: 1024px) 416px, 82vw"
                    className="size-full object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.04]"
                  />
                ) : null}

                <span
                  aria-hidden
                  className="absolute inset-0 bg-brand-teal-950/20 transition-colors group-hover:bg-brand-teal-950/5"
                />

                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-teal-900 shadow-(--shadow-modal) transition-transform duration-500 ease-(--ease-back-out) group-hover:scale-110"
                >
                  <Icon name="play" className="ml-1 size-6" />
                </span>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-teal-300">
                {item.caption}
              </p>
              <h3 className="mt-1.5 text-base font-semibold leading-snug text-white group-hover:underline">
                {item.title}
              </h3>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
