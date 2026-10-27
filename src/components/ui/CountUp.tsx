'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A figure that counts up to itself the first time it is scrolled into view.
 *
 * ⚠️  THE FINAL VALUE IS WHAT RENDERS ON THE SERVER, and the count only ever
 * starts once the observer fires. That ordering is the whole design: with no
 * JavaScript, a blocked bundle or a crawler reading the HTML, the figure is
 * simply correct and still. A component that renders "0%" and waits for an
 * effect to fix it publishes a wrong number to anyone whose JavaScript did
 * not arrive — on a page of medical claims, the wrong number is worse than
 * no animation.
 *
 * ONCE, NOT EVERY TIME. The observer disconnects after it fires. A figure
 * that re-runs each time it scrolls past is a fidget, and on a long page it
 * would run several times a minute.
 *
 * `prefers-reduced-motion` SKIPS IT ENTIRELY. Counting digits is exactly the
 * sort of autonomous movement that setting exists for, and the number is the
 * content — it must not depend on the animation having run.
 *
 * THE DIGITS ARE `aria-hidden` AND THE REAL VALUE SITS BESIDE THEM in a
 * screen-reader-only span. Otherwise assistive technology can read whatever
 * intermediate frame it happens to catch, and "forty-one per cent" is a
 * different claim from "seventy-eight per cent".
 */

/** How long the count runs. Long enough to read as deliberate, short enough
 *  that the real number is there before anyone has finished looking. */
const DURATION_MS = 1100

/**
 * Splits "78%" into "", 78, "%" — or "₹1,200+" into "₹", 1200, "+".
 *
 * Anything that does not parse is returned whole and never animated, so an
 * unusual value degrades to plain text rather than to a broken one.
 */
function parse(value: string) {
  const match = /^(\D*?)([\d][\d.,]*)(.*)$/s.exec(value)
  if (!match) return null

  const [, prefix = '', digits = '', suffix = ''] = match
  const target = Number(digits.replace(/,/g, ''))
  if (!Number.isFinite(target)) return null

  const dot = digits.indexOf('.')
  return {
    prefix,
    suffix,
    target,
    /** Kept so 4.9 does not count up through 4.87341. */
    decimals: dot === -1 ? 0 : digits.length - dot - 1,
    /** Kept so 1,200 does not land on 1200. */
    grouped: digits.includes(','),
  }
}

export function CountUp({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const parsed = parse(value)
    if (!parsed) return

    const { prefix, suffix, target, decimals, grouped } = parsed
    const format = (n: number) =>
      prefix +
      (grouped
        ? n.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : n.toFixed(decimals)) +
      suffix

    /**
     * ⚠️  THE COUNTER ONLY RUNS IF IT CAN LAND EXACTLY ON THE SOURCE
     * STRING. Anything else and the figure animates to something that is
     * not the published number.
     *
     * The case that caught this was Indian digit grouping: "₹2,50,000"
     * reformats through `en-US` as "₹250,000", which is the same quantity
     * written a way nobody here writes it — and on a page of figures, a
     * number that changes shape after a second is a number the reader has
     * to double-check. Values that fail this test stay still, which is
     * always correct.
     */
    if (format(target) !== value) return

    let frame = 0
    let safety = 0
    let start = 0

    const land = () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(safety)
      setDisplay(value)
    }

    const step = (now: number) => {
      if (!start) start = now
      const progress = Math.min((now - start) / DURATION_MS, 1)
      if (progress >= 1) {
        land()
        return
      }
      // Ease-out cubic: quick off the mark, settling rather than stopping.
      setDisplay(format(target * (1 - Math.pow(1 - progress, 3))))
      frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        // Disconnect before starting: this runs once per page load.
        observer.disconnect()
        setDisplay(format(0))
        frame = requestAnimationFrame(step)

        /**
         * ⚠️  A DEADLINE, BECAUSE THE FIRST THING THE COUNT DOES IS SET
         * THE FIGURE TO ZERO.
         *
         * Every frame after that walks it back up, so if the loop stops
         * running the page is left showing 0% where it should show 78% —
         * a wrong number, published, with no error anywhere. The window
         * for that is narrow (`requestAnimationFrame` is driven by the
         * same rendering steps as the observer that just fired) but the
         * cost of being wrong here is a medical claim, so it gets a
         * backstop rather than an argument.
         */
        safety = window.setTimeout(land, DURATION_MS + 600)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.clearTimeout(safety)
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
