import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

/**
 * Hero trust badge: the patient stories, as a frosted panel over the video.
 *
 * REPLACES THE GOOGLE RATING BADGE, on request. That badge showed "4.9 on
 * Google" with `count: null` and `url: ''` — a score with no number of
 * reviews behind it and no link to check it against. A rating nobody can
 * verify is the weakest kind of trust signal, and on a cancer clinic's home
 * page it is the kind that does not survive being looked into.
 *
 * ⚠️  NO FACE STACK, AND THIS IS NOT A LAYOUT DECISION.
 *
 * The badge it replaces showed four circular "patient faces" cropped out of
 * the testimonial thumbnails, and its own comment said "THE FACES ARE
 * PATIENTS WHO PUBLISHED VIDEO STORIES". That was not true. Those thumbnails
 * are stock or AI-generated title cards: `hvsElxx_9so.jpg` ("FROM NEW
 * ZEALAND…") and `GJy4ASONFFs.jpg` ("SURVIVOR'S TESTIMONIALS") are the SAME
 * model in the same sweater against the same corridor, and the rest are
 * stock too. A row of four of them on the hero asserts that four different
 * real patients are pictured, and two of them would have been one person.
 *
 * So the badge counts the stories instead of picturing them. If real
 * photographs of real patients are ever supplied WITH DOCUMENTED CONSENT —
 * §11 of the content draft requires it — the stack can come back, and it
 * should, because faces are worth more than a numeral. Not before.
 *
 * THE COUNT IS THE LENGTH OF THE TESTIMONIALS LIST, passed in rather than
 * written here, so it cannot drift from the section it links to.
 */
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
      className="group inline-flex items-center gap-4 rounded-(--radius-pill) border border-white/20 bg-brand-teal-950/45 py-2.5 pe-6 ps-2.5 backdrop-blur-md transition-colors hover:border-white/45 hover:bg-brand-teal-950/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-teal-900 transition-transform group-hover:scale-105">
        <Icon name="play" className="size-4.5 translate-x-px" />
      </span>

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
