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
          <span>{outlet.name}</span>
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
