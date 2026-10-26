'use client'

import { useState } from 'react'
import { allMarkers, homeMarker, type ReachMarker } from '@/data/reach'
import { routes } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { RealGlobe } from './RealGlobe'

/**
 * The globe and the country list, wired together.
 *
 * WHY THESE TWO ARE ONE COMPONENT: pointing at a country has to turn the
 * globe, so the hovered country is shared state and this is the smallest
 * boundary that can hold it. The section around it stays a server component.
 *
 * EVERY CHIP IS A BUTTON, NOT A STYLED SPAN. Three reasons, in order of
 * importance:
 *
 *   1. Touch has no hover. On a phone the only way to aim the globe at a
 *      country is to tap it, so the chip must be a real control.
 *   2. Keyboard focus drives the globe exactly as hover does, so the effect
 *      is not reserved for people using a mouse.
 *   3. A tap PINS the country (`aria-pressed`) rather than flashing it, so a
 *      touch user can look at where it landed without holding a finger down.
 *      Tapping it again, or picking another, releases it.
 *
 * Hover and focus never overwrite a pinned country — that would take control
 * back off someone who deliberately chose one.
 */
export function ReachExplorer() {
  /** Set by tap/click and held until released. Wins over hover. */
  const [pinned, setPinned] = useState<ReachMarker | null>(null)
  /** Transient — whatever the pointer or keyboard focus is on right now. */
  const [hovered, setHovered] = useState<ReachMarker | null>(null)

  const focus = pinned ?? hovered

  return (
    <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
      <div className="flex justify-center">
        <RealGlobe
          markers={allMarkers}
          focus={focus}
          onDrag={() => {
            setPinned(null)
            setHovered(null)
          }}
        />
      </div>

      <div className="rounded-(--radius-2xl) border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8">
        <p className="flex items-center gap-2.5 text-base font-bold text-white">
          <Icon name="map-pin" className="size-5 text-brand-teal-300" />
          Care is delivered in {homeMarker.country}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-brand-teal-100">
          From the HCAH Transition Care Centre in Gurugram, Haryana.
        </p>

        <div className="mt-7 border-t border-white/15 pt-6">
          <p
            id="reach-list-label"
            className="text-xs font-bold uppercase tracking-[0.1em] text-brand-teal-300"
          >
            Patients we have treated
          </p>

          <ul
            aria-labelledby="reach-list-label"
            className="mt-3 flex flex-wrap gap-2"
            onPointerLeave={() => setHovered(null)}
          >
            {allMarkers.map((marker) => {
              const isPinned = pinned?.country === marker.country
              const isActive = focus?.country === marker.country

              return (
                <li key={marker.country}>
                  <button
                    type="button"
                    aria-pressed={isPinned}
                    onPointerEnter={() => setHovered(marker)}
                    onFocus={() => setHovered(marker)}
                    onBlur={() => setHovered(null)}
                    onClick={() =>
                      setPinned((current) =>
                        current?.country === marker.country ? null : marker,
                      )
                    }
                    /* min-h-11 = 44px: the tap-target floor, which a chip of
                       this text size would otherwise miss by a few pixels. */
                    className={`inline-flex min-h-11 items-center gap-1.5 rounded-(--radius-pill) border px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'border-brand-teal-300 bg-brand-teal-300 text-brand-teal-950'
                        : 'border-white/25 bg-white/10 text-white hover:border-white/50 hover:bg-white/20'
                    }`}
                  >
                    {marker.country === homeMarker.country ? (
                      <Icon name="map-pin" className="size-3.5" />
                    ) : null}
                    {marker.country}
                  </button>
                </li>
              )
            })}
          </ul>

          <p className="mt-4 text-xs leading-relaxed text-brand-teal-300">
            Tap a country to turn the globe to it, or drag the globe to spin it.
            Acceptance of a new patient depends on clinical assessment, service
            availability and travel feasibility.
          </p>
        </div>

        <Button
          href={routes.internationalEnquiry}
          variant="accent"
          icon="arrow-right"
          className="mt-7 rounded-(--radius-pill)"
        >
          International Patient Enquiry
        </Button>
      </div>
    </div>
  )
}
