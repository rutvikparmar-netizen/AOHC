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
           * ⚠️  `mix-blend-multiply` IS GONE, AND MUST NOT COME BACK. It was
           * here because several files had a white background baked in
           * rather than an alpha channel, and multiply dropped that white
           * into the page. Every logo now carries real transparency — the
           * background was flood-filled out of each one — so it has nothing
           * left to do, and it was actively wrong on two of them: multiply
           * takes white to the colour beneath it, so the white letters
           * inside the NDTV box and Industry Outlook's reversed "Outlook"
           * were rendering cream against the warm page instead of white.
           *
           * SHOWN IN THEIR OWN COLOURS, with no greyscale filter. A
           * desaturated strip is the tidier design, but these are
           * mastheads: the Times of India's black, the India Today red and
           * the Hindustan Times cyan are most of what makes each one
           * recognisable at this size.
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
               * ⚠️  NOT ONE HEIGHT FOR EVERYTHING. Ten of these are
               * newspaper mastheads — long, single-line wordmarks from
               * 3.4:1 to 10:1 — and a fixed height suits them exactly. The
               * IPM congress mark is a three-line lockup; at the mastheads'
               * 32px each of its lines would be about 10px tall, which is a
               * blob rather than a logo. A stacked lockup gets roughly
               * double the height, which lands it at a similar optical
               * WEIGHT rather than the same measured height. Mixed heights
               * are normal in a logo strip; identical heights across wildly
               * different shapes are what look wrong.
               *
               * ⚠️  `stacked` IS DECLARED PER LOGO, AND THAT REPLACED AN
               * ASPECT-RATIO TEST THAT DID NOT SURVIVE CONTACT. The ratio
               * version was tried at two thresholds. At 3 it swept up Zee
               * News (2.65), NDTV (2.81) and Industry Outlook (2.89), which
               * read fine at 32px, and blew them up to 60. Tightened to
               * 2.2 it worked — until a revised IPM mark arrived at 237x94,
               * ratio 2.52, still three lines of type, while Zee at 2.65 is
               * a single line. No threshold between 2.52 and 2.65 is worth
               * trusting, so the shape is now stated rather than guessed.
               */
              className={`w-auto object-contain opacity-90 transition-opacity duration-200 group-hover/outlet:opacity-100 ${
                outlet.stacked ? 'h-13 sm:h-15' : 'h-7 sm:h-8'
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
          /* ⚠️  `flex` ON THE ITEM, NOT JUST `shrink-0`. The anchor inside
             is `inline-flex`, so as an inline-level box it sat on the
             item's line box and carried its descender space below —
             every logo ended up a few pixels above centre with the slack
             underneath, even once the track itself was centred. Making
             the item a flex container takes the line box out of it, so
             the item is exactly as tall as the anchor. */
          className="flex shrink-0 items-center"
        >
          {outlet.href ? (
            <a
              href={outlet.href}
              target="_blank"
              rel="noopener noreferrer"
              /**
               * ⚠️  THE DUPLICATE LAP IS A REAL LINK TOO, AND IT HAS TO BE.
               *
               * The track holds the list twice so the loop is seamless.
               * This used to render the second copy as a plain `<span>`,
               * which meant that at any moment roughly half the logos on
               * screen were dead: a reader aiming at TEDx or IPM as it
               * drifted past clicked a span and nothing happened. The
               * links were all present in the markup, which is exactly
               * why the fault looked like they had been removed.
               *
               * `tabIndex={-1}` is not optional. The `<li>` carries
               * `aria-hidden` on the duplicate, and a focusable element
               * inside `aria-hidden` content is a genuine accessibility
               * fault — a keyboard user would land on a control screen
               * readers have been told to ignore. Out of the tab order it
               * stays mouse-clickable and announced exactly once.
               */
              tabIndex={duplicate ? -1 : undefined}
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
      {/* ⚠️  `items-center` IS LOAD-BEARING, NOT TIDYING. `.marquee-track`
          is `display: flex` and was inheriting the default
          `align-items: stretch`, so every `<li>` stretched to the row's
          full height and the INLINE-flex anchor inside it then sat on that
          line box's baseline — near the top. With one 60px stacked lockup
          in a row of 32px mastheads, the row was tall and the short logos
          hung off the top of it with all the slack underneath. Centring
          the track puts every logo on one axis whatever its height. */}
      <ul className="marquee-track items-center gap-x-12 sm:gap-x-16">
        {lap(false)}
        {lap(true)}
      </ul>
    </div>
  )
}
