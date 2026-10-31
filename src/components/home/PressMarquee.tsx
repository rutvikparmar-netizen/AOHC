import Image from 'next/image'
import type { PressMention } from '@/types'
import { Icon } from '@/components/ui/Icon'

/**
 * "Art of Healing Cancer in the News" — a continuously running strip of
 * outlets.
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
              /**
               * ⚠️  SIZED BY ASPECT RATIO, NOT ONE HEIGHT FOR EVERYTHING.
               *
               * Nine of these are newspaper mastheads — long, single-line
               * wordmarks around 10:1 — and a fixed height is exactly right
               * for them. The IPM congress mark is not: it is a stacked
               * lockup at 239x126, nearly square, with three lines of type
               * and a date beneath. Given the mastheads' 32px it would be
               * 61px wide with each line about 9px tall, which is a blob
               * rather than a logo.
               *
               * So a genuinely stacked lockup gets roughly double the
               * height, which lands it at a similar optical WEIGHT to its
               * neighbours rather than the same measured height. Mixed
               * heights are normal in a logo strip; identical heights
               * across wildly different ratios are what look wrong.
               *
               * ⚠️  THE THRESHOLD IS 2.2, AND IT WAS 3 FOR ONE MEASUREMENT
               * BEFORE THAT. At 3 it also caught Zee News (2.65), NDTV
               * (2.81) and Industry Outlook (2.89) — three logos that read
               * perfectly well at 32px — and jumped them to 60, where they
               * dominated the row. Measured ratios of the current set:
               * IPM 1.90, then a clear gap to Zee 2.65, and everything
               * else from 3.39 to 10.00. Anything added here should be
               * checked against that spread rather than against the number.
               */
              className={`w-auto object-contain mix-blend-multiply opacity-90 transition-opacity duration-200 group-hover/outlet:opacity-100 ${
                outlet.logo.width / outlet.logo.height >= 2.2
                  ? 'h-7 sm:h-8'
                  : 'h-13 sm:h-15'
              }`}
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
              /* `min-h-11` because the mastheads are 28px tall and these are
                 real links to the articles — on a phone that is the whole
                 target. The strip's own height is unchanged; the extra is
                 padding around the logo. */
              className="group/outlet inline-flex min-h-11 items-center gap-2 font-display text-lg font-bold text-text-muted transition-colors hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-xl"
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
