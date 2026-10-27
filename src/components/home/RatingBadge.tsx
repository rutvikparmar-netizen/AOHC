import Image from 'next/image'
import type { ImageAsset } from '@/types'
import { site } from '@/lib/site'

/**
 * Google rating badge for the hero: the "G", five stars, the score, then a
 * stack of patient faces.
 *
 * RENDERS NOTHING UNTIL `site.reviews.rating` IS SET. The figures must be
 * copied from AOHC's Google Business Profile — see `src/lib/site.ts`. There
 * is no fallback number, on purpose.
 *
 * THE FACES ARE PATIENTS WHO PUBLISHED VIDEO STORIES, not Google reviewers,
 * so the stack links to those stories and is labelled as such rather than
 * implying the people pictured wrote the reviews.
 */

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

/** One star, filled to `fill` (0–1) so 4.8 shows as four and four-fifths. */
function Star({ fill, id }: { fill: number; id: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4.5 sm:size-7">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#F5B301" />
          <stop offset={`${fill * 100}%`} stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M12 1.8l3.09 6.26 6.91 1.01-5 4.87 1.18 6.88L12 17.57l-6.18 3.25L7 13.94 2 9.07l6.91-1.01z"
      />
    </svg>
  )
}

export function RatingBadge({
  faces = [],
  storiesHref,
  idPrefix = 'rating',
}: {
  faces?: ImageAsset[]
  storiesHref: string
  /**
   * ⚠️  REQUIRED IF THIS BADGE APPEARS TWICE ON A PAGE, and the hero renders
   * it twice — once inside the card for `lg`, once below it for phones.
   *
   * Each star fills itself from a `<linearGradient>` referenced by `id`.
   * Two badges meant two sets of identical ids, and `url(#…)` resolves to
   * the FIRST match in the document — which is the copy sitting in the
   * `display: none` branch. A paint server in a tree that is not rendered
   * does not resolve, so every star lost its fill and the rating showed as
   * five invisible stars.
   */
  idPrefix?: string
}) {
  const { rating, count, url } = site.reviews
  if (rating == null) return null

  const score = rating.toFixed(1)
  const label = `Rated ${score} out of 5 on Google${count ? ` from ${count} reviews` : ''}`

  const scoreBlock = (
    <div className="flex items-center gap-3 sm:gap-4">
      <GoogleG className="size-9 shrink-0 sm:size-12" />
      <div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                id={`${idPrefix}-star-${i}`}
                fill={Math.max(0, Math.min(1, rating - i))}
              />
            ))}
          </div>
          <p className="text-base font-bold text-text sm:text-2xl">
            {score}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-text-muted">
          on Google{count ? ` · ${count} reviews` : ''}
        </p>
      </div>
    </div>
  )

  return (
    /**
     * ONE LINE ON A PHONE. The badge used to wrap, dropping the patient
     * faces onto a second row and making it twice as tall as it needed to
     * be. Everything inside steps down a size below `sm` — the mark, the
     * stars, the score and especially the faces, which go from 48px to 28px
     * — so the whole thing fits across a 360px screen. `flex-wrap` stays as
     * the fallback for anything narrower rather than letting it overflow.
     */
    <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-4 rounded-(--radius-2xl) bg-[#F3F3FB] px-4 py-4 shadow-(--shadow-modal) sm:w-max sm:flex-nowrap sm:gap-x-7 sm:px-6 sm:py-5">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} — read the reviews`}
          className="rounded-(--radius-lg) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {scoreBlock}
        </a>
      ) : (
        <div role="img" aria-label={label}>
          {scoreBlock}
        </div>
      )}

      {faces.length > 0 ? (
        <>
          <span aria-hidden className="hidden h-14 w-px bg-border-strong sm:block" />
          <a
            href={storiesHref}
            aria-label="Watch our patients' stories"
            className="flex -space-x-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:-space-x-3"
          >
            {/* The thumbnails are 16:9 title cards with the patient on the
                right, so each circle zooms in on that side — otherwise the
                crop is mostly overlay text. */}
            {faces.slice(0, 4).map((face) => (
              <span
                key={face.src}
                className="relative size-6 shrink-0 overflow-hidden rounded-full border-2 border-white bg-surface sm:size-14 sm:border-[3px]"
              >
                <Image
                  src={face.src}
                  alt=""
                  fill
                  sizes="160px"
                  className="origin-[80%_32%] scale-[2.4] object-cover object-[80%_32%]"
                />
              </span>
            ))}
          </a>
        </>
      ) : null}
    </div>
  )
}
