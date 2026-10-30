'use client'

import { useState } from 'react'
import { allMarkers, homeMarker, type ReachMarker } from '@/data/reach'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'
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

      {/**
       * THREE BANDS, NOT ONE STACK: where care happens, where people come
       * from, and what it takes to be accepted.
       *
       * Everything used to sit at roughly one weight inside a single padded
       * box — a small bold title, a small body, a small uppercase label, a
       * wall of fourteen pills, and the panel's most consequential sentence
       * set in its very quietest style. Nothing outranked the pills, so the
       * pills were all the eye got. Dividing the card gives each idea its
       * own ground and lets the pills be the middle of something rather
       * than the whole of it.
       */}
      <div className="overflow-hidden rounded-(--radius-2xl) border border-white/15 bg-white/5 backdrop-blur-md">
        {/* ── Where care happens ───────────────────────────────────────
            ⚠️  THE ADDRESS COMES FROM `site.contact.address`, NOT FROM
            HERE. It used to name the host facility — "HCAH Transition Care
            Centre" — as a heading with the city on a second line, and the
            full street address lived only in the footer. Now the panel
            carries the address itself, which is the one concrete fact a
            reader wants from this section, and it reads from the same
            string as the footer and the schema.org `PostalAddress` so the
            three cannot drift.

            "All treatment takes place here" is kept: the section is about
            patients travelling from forty countries, and the sentence that
            says they all come to ONE place is the point of the panel.

            The icon sits in a tinted disc, which is how every other list
            on this site marks a row. */}
        <div className="flex items-start gap-4 p-6 sm:p-8">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-teal-300/15 text-brand-teal-300">
            <Icon name="map-pin" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-h5 text-white">Visit Us</p>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-teal-100">
              {site.contact.address}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-teal-100">
              All treatment takes place here.
            </p>
          </div>
        </div>

        {/* ── Where people come from ───────────────────────────────── */}
        <div className="border-t border-white/10 p-6 sm:p-8">
          {/**
           * THE COUNT IS THE ANCHOR, and it is counted from the list
           * rendered directly beneath it rather than typed in, so the two
           * cannot drift apart.
           *
           * This is not a statistic in the sense `StatBand` refuses to
           * publish. That gate exists for outcome claims — response rates,
           * survival — which need a cited basis. This is a count of the
           * items on screen, and the reader can check it by looking.
           *
           * NOT "patients we have treated", which is what the label said.
           * Only two of the fourteen are evidenced in AOHC's own published
           * material — the New Zealand testimonial and the Iraqi patient's
           * video. The rest come from the International Patients page,
           * which describes who may get in touch rather than who has been
           * treated. One list was an explicit instruction and stays one
           * list; the label covers both kinds honestly. See the note in
           * `src/data/reach.ts`.
           */}
          <div className="flex items-baseline gap-3">
            <p className="font-display text-stat tabular-nums text-white">
              {allMarkers.length}
            </p>
            <p
              id="reach-list-label"
              className="text-sm font-semibold leading-snug text-brand-teal-100"
            >
              countries patients and enquiries have come from
            </p>
          </div>

          <ul
            aria-labelledby="reach-list-label"
            className="mt-6 flex flex-wrap gap-2"
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
                    /* The resting state is quieter than it was — a softer
                       border and fill — so the selected chip, which is the
                       one driving the globe, is unmistakably the odd one
                       out in the row rather than a slightly brighter pill
                       among thirteen bright ones. */
                    className={`inline-flex min-h-11 items-center gap-1.5 rounded-(--radius-pill) border px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'border-brand-teal-300 bg-brand-teal-300 text-brand-teal-950'
                        : 'border-white/15 bg-white/8 text-white hover:border-white/40 hover:bg-white/15'
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

          {/* A hint about a decoration, kept at the weight of one. */}
          <p className="mt-4 text-xs leading-relaxed text-brand-teal-300">
            Select a country to turn the globe to it.
          </p>
        </div>

        {/* ── The way in ───────────────────────────────────────────────
            This band held the acceptance caveat — whether a new patient
            can be taken on at all — which was removed on request. The
            same ground is covered a section further down, in "Care
            Coordination Across Borders": availability of consultations,
            assessments and travel assistance must be confirmed with the
            team before anything is arranged. The band is now just the way
            in, so it is sized for a button rather than a paragraph. */}
        <div className="border-t border-white/10 bg-brand-teal-950/40 px-6 py-6 sm:px-8">
          {/* Full width on a phone: the label is long enough to wrap inside
              a shrink-to-fit pill, which looked like a mistake. */}
          <Button
            href={routes.internationalEnquiry}
            variant="accent"
            icon="arrow-right"
            className="w-full rounded-(--radius-pill) sm:w-fit"
          >
            International Patient Enquiry
          </Button>
        </div>
      </div>
    </div>
  )
}
