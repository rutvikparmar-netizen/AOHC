import Image from 'next/image'
import type { PressMention } from '@/types'
import { Icon } from '@/components/ui/Icon'

/**
 * "Art of Healing in the news" — a continuously running strip of outlets.
 *
 * HOW THE LOOP IS SEAMLESS. The track holds the list twice and slides left by
 * exactly half its width before repeating. At the moment it snaps back, the
 * second copy is sitting precisely where the first one started, so there is no
 * visible jump and no JavaScript measuring anything. The duplicate is
 * `aria-hidden`: a screen reader should hear each outlet once.
 *
 * THE EDGES ARE MASKED rather than cut, so names fade out instead of being
 * sliced mid-letter at the container edge.
 *
 * MOTION CONTROLS. Movement stops on hover and on keyboard focus, and
 * `prefers-reduced-motion` prevents it ever starting — the strip then renders
 * as a static row, which is the same information standing still.
 *
 * This is a server component. Nothing here needs state: the animation is CSS,
 * and so is every way of stopping it.
 */
export function PressMarquee({ items }: { items: PressMention[] }) {
  /** Rendered twice; the second pass is decorative. */
  const lap = (duplicate: boolean) =>
    items.map((outlet) => {
      const body = (
        <>
          {/**
           * A MASTHEAD WHERE ONE EXISTS, THE NAME WHERE IT DOES NOT. The two
           * are interchangeable here: both say which outlet covered AOHC, so
           * a half-supplied list reads as a deliberate mix rather than as a
           * row of broken images.
           *
           * Sized by height with `w-auto`, because mastheads have no common
           * aspect ratio — a shared width would set The Times of India and
           * NDTV at wildly different optical weights. `object-contain`
           * guarantees nothing is cropped, whatever the file turns out to be.
           *
           * SHOWN IN THEIR OWN COLOURS. A greyscale strip is the tidier
           * design, but these are mastheads: The Times of India's black, the
           * India Today red and the Hindustan Times cyan are most of what
           * makes each one recognisable at this size.
           *
           * `mix-blend-multiply` IS LOAD-BEARING, not decoration. Two of the
           * supplied files have a white background baked in rather than an
           * alpha channel — Hindustan Times is a JPEG, and the Times of India
           * PNG has no transparency — so without it they render as white
           * rectangles on the warm page. Multiply drops white into the
           * background and leaves the dark ink, and it is a no-op on the
           * files that do have alpha.
           */}
          {outlet.logo ? (
            <Image
              src={outlet.logo.src}
              alt={outlet.logo.alt}
              width={outlet.logo.width}
              height={outlet.logo.height}
              /**
               * Vectors skip the optimiser. Resizing an SVG gains nothing,
               * and routing it through `/_next/image` would otherwise mean
               * turning on `dangerouslyAllowSVG` globally — which exists
               * under that name because an SVG can carry script, and the
               * flag would apply to every image the optimiser ever serves.
               */
              unoptimized={outlet.logo.src.endsWith('.svg')}
              className="h-7 w-auto object-contain mix-blend-multiply opacity-90 transition-opacity duration-200 group-hover/outlet:opacity-100 sm:h-8"
            />
          ) : (
            <span>{outlet.name}</span>
          )}
          {outlet.href ? (
            <Icon
              name="external-link"
              className="size-3.5 opacity-0 transition-opacity group-hover/outlet:opacity-100"
            />
          ) : null}
        </>
      )

      return (
        <li
          key={`${outlet.name}-${duplicate ? 'b' : 'a'}`}
          aria-hidden={duplicate || undefined}
          className="shrink-0"
        >
          {outlet.href && !duplicate ? (
            <a
              href={outlet.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/outlet inline-flex items-center gap-2 font-display text-lg font-bold text-text-muted transition-colors hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-xl"
            >
              {body}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-display text-lg font-bold text-text-muted sm:text-xl">
              {body}
            </span>
          )}
        </li>
      )
    })

  return (
    <div className="marquee mt-8 border-y border-border py-6">
      <ul className="marquee-track gap-x-12 sm:gap-x-16">
        {lap(false)}
        {lap(true)}
      </ul>
    </div>
  )
}
