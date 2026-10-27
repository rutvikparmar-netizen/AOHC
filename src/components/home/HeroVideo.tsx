'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'

/**
 * The hero's background video.
 *
 * A CLIENT COMPONENT FOR TWO REASONS, BOTH ACCESSIBILITY:
 *
 * 1. WCAG 2.2.2 (Pause, Stop, Hide) — anything that moves automatically for
 *    more than five seconds needs a way to stop it. This loops forever, so a
 *    pause control is not optional. It sits where the reference layout puts
 *    its carousel arrows.
 *
 * 2. `prefers-reduced-motion` — the video must not play at all for someone
 *    who has asked for less motion. CSS alone cannot stop playback; it can
 *    only hide the element, which still downloads and decodes 8MB.
 *
 * The poster frame is a still from the video itself, so the hero paints
 * immediately and looks identical before playback starts, on a slow
 * connection, or when motion is reduced.
 *
 * `aria-hidden` because it is decoration — it carries no information the
 * headline beside it does not already state.
 */
export function HeroVideo({
  src,
  poster,
}: {
  src: string
  poster: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')

    const apply = () => {
      if (query.matches) {
        video.pause()
        setPlaying(false)
      } else {
        /**
         * `play()` returns a promise that rejects when the browser blocks
         * autoplay — which it does on some mobile power-saving settings even
         * for a muted video. Swallowing it leaves the poster showing, which
         * is a perfectly good hero; an unhandled rejection in the console is
         * not.
         */
        void video.play().then(
          () => setPlaying(true),
          () => setPlaying(false),
        )
      }
    }

    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      void video.play().then(() => setPlaying(true), () => setPlaying(false))
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 -z-20 size-full object-cover"
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause background video' : 'Play background video'}
        /* Deliberately quiet. It is a required control, not a design feature
           — the reference puts carousel arrows in this corner, and this sits
           in the same place at the same weight. */
        /* size-11 = 44px: quiet, but still a target this audience can hit.
           It was 40, which is under the floor every other control here
           clears. */
        className="absolute bottom-5 right-5 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-brand-teal-950/40 text-white/80 backdrop-blur-md transition-colors hover:bg-white hover:text-brand-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <Icon name={playing ? 'pause' : 'play'} className={playing ? 'size-4' : 'ml-0.5 size-4'} />
      </button>
    </>
  )
}
