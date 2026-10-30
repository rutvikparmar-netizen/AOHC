import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

/**
 * Hero trust badge: the patient stories, as a frosted panel over the video.
 *
 * REPLACES THE GOOGLE RATING BADGE. That badge showed "4.9 on Google" with
 * `count: null` and `url: ''` — a score with no number of reviews behind it
 * and no link to check it against. A rating nobody can verify is the weakest
 * kind of trust signal, and on a cancer clinic's home page it is the kind
 * that does not survive being looked into.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE FACE STACK IS BACK, ON REQUEST, AND ITS PROVENANCE IS UNRESOLVED.
 *
 * Read this before touching the images or the text beside them.
 *
 * The badge this replaced had no faces, deliberately. The one BEFORE that
 * showed four circular "patient faces" cropped out of the testimonial
 * thumbnails under a comment claiming "THE FACES ARE PATIENTS WHO PUBLISHED
 * VIDEO STORIES" — which was false. Those thumbnails are stock or
 * AI-generated title cards; `hvsElxx_9so.jpg` and `GJy4ASONFFs.jpg` are the
 * SAME model in the same sweater against the same corridor. Four of them in
 * a row asserted that four different real patients were pictured, and two of
 * them were one person.
 *
 * The four faces here are a different, AOHC-supplied set and are NOT those
 * thumbnails. What has not been established is who they are. They are styled
 * as cancer patients — a chemotherapy cap, regrown hair — and they sit
 * directly beside the words "Watch patient stories", which is what makes the
 * assertion. If they are stock or generated portraits, the page is showing
 * invented patients to people deciding where to be treated for cancer. §11
 * of the content draft requires documented consent for a patient's image.
 *
 * Two things follow, and neither is cosmetic:
 *
 *   1. EVERY FACE IS `alt=""` AND THE STACK IS `aria-hidden`. A screen reader
 *      hears "Watch patient stories, N video testimonials" and no claim about
 *      who is pictured. The visual treatment makes a claim the markup does
 *      not have to repeat.
 *   2. NOBODY ADDS A NAME, A CAPTION, A DIAGNOSIS OR AN OUTCOME to these
 *      images. The moment one of them is captioned, an unverified portrait
 *      becomes a named patient with a result.
 *
 * If the set turns out to be stock, the honest fixes are to drop the stack
 * again or to label it as illustrative. Both are smaller changes than this
 * one was.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE STRIP WAS SUPPLIED AS ONE OPAQUE IMAGE AND IS RENDERED AS FOUR. The
 * source (`22.webp`) is a plain VP8 WebP — no alpha — so the four discs,
 * their white rings and a soft drop shadow are all baked onto white. Over
 * the frosted badge that is a white rectangle punched through the video.
 * Each photo was therefore cropped square, a few pixels inside its own edge
 * so clipping to a circle cannot catch a crescent of the ring, and the ring,
 * the overlap and the stacking are rebuilt here in CSS — where they stay
 * crisp at any size and the ring can be any colour the panel needs.
 *
 * THE COUNT IS THE LENGTH OF THE TESTIMONIALS LIST, passed in rather than
 * written here, so it cannot drift from the section it links to.
 */

/** The four crops, in the order of the supplied strip. */
const FACES = [1, 2, 3, 4].map((n) => `/images/story-faces/${n}.webp`)

export function PatientStoriesBadge({
  count,
  href,
}: {
  /** How many testimonial videos exist. Nothing renders at zero. */
  count: number
  href: string
}) {
  if (count === 0) return null

  return (
    <Link
      href={href}
      /* Frosted rather than the solid white plate the rating badge used: it
         sits over moving footage, and a white block punched a hole in the
         picture. The hairline is what makes blur read as glass — without an
         edge the panel has no shape. */
      /* ⚠️  THE PHONE SIZING IS MEASURED, NOT EYEBALLED, AND IT HAS ABOUT 6px
         OF SLACK. A 360px screen leaves 328px inside the gutter. "Watch
         patient stories" is 163px set at `text-sm` bold, and everything else
         in the row — 10px + 16px padding, the 28px stack at 88px, the 1px
         rule, the 20px arrow and three 8px gaps — comes to 159px, so the
         title gets 169px. Widen any of those, add a fifth face or lengthen
         the label and the title wraps; the badge then stands three lines
         tall and shoulders the chips above it out of line. Re-measure at 360
         after touching this row. */
      className="group inline-flex items-center gap-2 rounded-(--radius-pill) border border-white/20 bg-brand-teal-950/45 py-2.5 pe-4 ps-2.5 backdrop-blur-md transition-colors hover:border-white/45 hover:bg-brand-teal-950/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:gap-3.5 sm:pe-6"
    >
      {/* ⚠️  `aria-hidden` and every `alt=""` — see the provenance note above.
          The negative inline spacing is the overlap from the supplied strip;
          later siblings paint over earlier ones, so the stack fans to the
          right exactly as it does in the source. */}
      <span aria-hidden className="flex shrink-0 -space-x-2 sm:-space-x-2.5">
        {FACES.map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={128}
            height={128}
            className="size-7 rounded-full object-cover ring-2 ring-white/90 sm:size-9"
          />
        ))}
      </span>

      {/* The divider the stack is separated from the copy by. A rule rather
          than a typed "|", so it keeps its weight and its height whatever
          the text does. */}
      <span aria-hidden className="h-7 w-px shrink-0 bg-white/25 sm:h-8" />

      <span className="min-w-0">
        <span className="block text-sm font-bold leading-tight text-white">
          Watch patient stories
        </span>
        <span className="mt-0.5 block text-sm leading-tight text-brand-teal-100">
          {count} video testimonials
        </span>
      </span>

      <Icon
        name="arrow-right"
        className="size-4 shrink-0 text-brand-teal-200 transition-transform group-hover:translate-x-1"
      />
    </Link>
  )
}
