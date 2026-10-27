'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProcessStep } from '@/types'
import { Icon } from '@/components/ui/Icon'

/**
 * "Our Integrative Cancer Treatment Approach" — an expanding image accordion.
 *
 * SIXTH ATTEMPT. Keeping the list of what failed, because every one of them
 * failed for a reason that constrains this:
 *
 *   1. Sticky stacked cards clipped stage 3 behind stage 4.
 *   2. A thin horizontal stepper gave twelve sub-points the same weight as
 *      four stage titles, so nothing led.
 *   3. A 2×2 of flat panels was safe and dull.
 *   4. Stacking plus a pinned "Stage 2 / 4" rail — chrome restating the cards.
 *   5. Four cards on a scroll-linked track: still four cards in a row.
 *
 * The thread running through (2) and (5) is that showing all four stages at
 * once means showing twelve sub-points at once, and twelve sub-points at once
 * is a wall. This pattern solves that structurally rather than cosmetically:
 * one stage is open and readable at full size, the other three are reduced to
 * a numbered spine. The content is all still there — it is the emphasis that
 * moves.
 *
 * HOW THE EXPANSION WORKS. Every panel is `flex-basis: 0` with a flex-grow of
 * 1, and the open one grows to 5. The browser animates the grow factor, so
 * there are no measured pixel widths anywhere and the row reflows correctly
 * at any container size. The open panel's text block is given a fixed width
 * rather than filling the panel, because text that rewraps on every frame of
 * the expansion looks broken.
 *
 * THE SAME COMPONENT TURNS VERTICAL on small screens — `flex-col` instead of
 * `flex-row` — so a phone gets an ordinary accordion of stacked strips rather
 * than four unreadable slivers.
 *
 * ⚠️  AND ON PHONES THE OPEN PANEL IS SIZED BY ITS CONTENT, not by a share of
 * a fixed height. The column used to be `h-[38rem]`, split five-to-one
 * between the open panel and the three collapsed strips, which left the open
 * one 361px tall — while its copy needs 364px to 421px depending on the
 * stage. Since the copy is anchored to the BOTTOM of the panel, the overflow
 * came off the top: stage 2 lost 60px, which is its heading. Measured at
 * 390px; at 320px even stage 1 lost 83px.
 *
 * The fix is `grid-template-rows: 0fr` → `1fr` on the panel, which is the one
 * way to animate to a content-driven height in CSS. The inner wrapper needs
 * `min-h-0` and `overflow-hidden` or the row will not collapse to zero. From
 * `lg` up the panel goes back to `display: block` and the fixed-height flex
 * row takes over again, where there is width to spare and the original
 * composition is the right one.
 *
 * INTERACTION, AND WHY IT IS NOT HOVER-ONLY. The published versions of this
 * pattern are usually pure CSS `:hover`, which leaves touch and keyboard with
 * nothing. Here:
 *
 *   - a mouse opens a panel on hover (`pointerType` check, so a tap does not
 *     also fire a phantom hover);
 *   - a tap opens it, because touch has no hover at all;
 *   - focus opens it, so tabbing through works exactly like pointing.
 *
 * The trigger is a real `<button>` covering the panel, named for its stage and
 * carrying `aria-pressed`. `aria-expanded` would be a lie: nothing is hidden
 * from assistive technology — all four stages stay in the accessibility tree
 * and are read in order, which is the point of an ordered list of stages.
 * Only the visual emphasis changes.
 */
export function ProcessPanels({ steps }: { steps: ProcessStep[] }) {
  const [open, setOpen] = useState(0)

  return (
    <ol className="flex flex-col gap-2.5 lg:h-[34rem] lg:flex-row lg:gap-3">
      {steps.map((step, index) => {
        const isOpen = index === open

        return (
          <li
            key={step.title}
            data-open={isOpen ? '' : undefined}
            onPointerEnter={(event) => {
              // A touch also fires pointerenter just before the tap; letting
              // it through would open the panel under the finger twice.
              if (event.pointerType === 'mouse') setOpen(index)
            }}
            className={`group/panel relative grid min-h-16 grid-rows-[0fr] overflow-hidden rounded-(--radius-2xl) bg-brand-teal-950 transition-[grid-template-rows] duration-700 ease-(--ease-out-settle) data-[open]:grid-rows-[1fr] lg:block lg:min-h-0 lg:min-w-20 lg:basis-0 lg:transition-[flex-grow] ${
              isOpen ? 'lg:grow-[5]' : 'lg:grow'
            }`}
          >
            {step.image ? (
              <Image
                src={step.image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 67vw, 100vw"
                /* The collapsed panels sit back: darker and a touch cooler,
                   so the open one is unmistakably the one being read. */
                className="object-cover opacity-55 transition-all duration-700 group-data-[open]/panel:scale-105 group-data-[open]/panel:opacity-100"
              />
            ) : null}

            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-brand-teal-950 via-brand-teal-950/75 to-brand-teal-950/40 transition-opacity duration-700 group-data-[open]/panel:via-brand-teal-950/55 group-data-[open]/panel:to-brand-teal-950/10"
            />

            {/* COLLAPSED SPINE. Horizontal on a phone, where the panel is a
                wide strip; vertical on desktop, where it is a narrow column.
                `aria-hidden` — the button below carries the same words. */}
            <span
              aria-hidden
              className="absolute left-5 top-1/2 flex -translate-y-1/2 items-center gap-3.5 transition-opacity duration-300 group-data-[open]/panel:opacity-0 lg:left-1/2 lg:top-auto lg:bottom-7 lg:translate-y-0 lg:-translate-x-1/2 lg:flex-col-reverse lg:gap-5"
            >
              <span className="font-display text-lg font-bold text-brand-teal-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-base font-bold text-white lg:[writing-mode:vertical-rl] lg:rotate-180 lg:whitespace-nowrap">
                {step.title}
              </span>
            </span>

            {/* The trigger. Covers the whole panel and sits under the copy,
                which is `pointer-events-none`, so a click anywhere lands
                here while the words still render above it. */}
            <button
              type="button"
              aria-pressed={isOpen}
              aria-label={`Stage ${index + 1}: ${step.title}`}
              onClick={() => setOpen(index)}
              onFocus={() => setOpen(index)}
              className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
            />

            {/* OPEN CONTENT. Two elements, and both are load-bearing: the
                outer one is the collapsing grid row on phones and the
                bottom-anchored overlay from `lg` up, while the inner one
                carries the padding and the fade. `min-h-0` is what lets the
                row actually reach zero — a grid item's automatic minimum
                size would otherwise hold it open at content height.

                From `lg`, the width is fixed rather than fluid: text that
                rewraps on every frame of the expansion looks broken. The
                delay lets the panel get most of the way open first, so the
                copy reads as a consequence of the expansion. */}
            <div className="pointer-events-none z-20 min-h-0 overflow-hidden lg:absolute lg:inset-x-0 lg:bottom-0">
              <div className="translate-y-4 p-6 opacity-0 transition-all delay-150 duration-500 ease-(--ease-out-settle) group-data-[open]/panel:translate-y-0 group-data-[open]/panel:opacity-100 sm:p-8 lg:w-[32rem] lg:max-w-full">
                {/* This was hidden on phones while the panel had a fixed
                    height, because it pushed the heading off the top. The
                    panel is sized by its content there now, so it is back at
                    every width. */}
                <span className="inline-flex items-center gap-2 rounded-(--radius-pill) border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-teal-200 backdrop-blur-md">
                  Stage {index + 1}
                </span>

                <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-(--measure) text-sm leading-relaxed text-brand-teal-100 sm:text-base">
                  {step.description}
                </p>

                {step.points?.length ? (
                  <ul className="mt-5 space-y-2.5 border-t border-white/15 pt-5">
                    {step.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <Icon
                          name="check"
                          className="mt-0.5 size-3.5 shrink-0 text-brand-teal-300"
                        />
                        <span className="text-xs leading-relaxed text-brand-teal-100">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
