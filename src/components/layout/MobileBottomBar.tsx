import Link from 'next/link'
import { APPOINTMENT_CTA, site } from '@/lib/site'
import { routes } from '@/lib/routes'
import { Icon } from '@/components/ui/Icon'

/**
 * Sticky action bar, phones only.
 *
 * ONE ACTION, PLUS A WAY TO WRITE. The page is long and the header scrolls
 * out of reach; without this the next step is wherever the reader happens to
 * be. So the bar is mostly one full-width button — booking is the thing this
 * site is for — with email as a quiet icon beside it.
 *
 * NO WHATSAPP HERE, deliberately: the floating button already sits just
 * above this bar, and offering the same action twice within 40px of itself
 * spends half the bar on a duplicate.
 *
 * NO CALL BUTTON either, because there is no telephone line — see
 * `src/lib/site.ts`. An item whose target is missing is omitted rather than
 * rendered dead: a bottom bar is no place for a placeholder, and tapping a
 * button that does nothing reads as "this practice is unreachable".
 *
 * EDGE TO EDGE, NO PADDING. The bar used to float its buttons inside a
 * `max-w-md` box with a 8px frame, which on a phone reads as a widget laid
 * over the page. Full-bleed reads as part of the browser.
 *
 * `pb-[env(safe-area-inset-bottom)]` keeps the row clear of the iPhone home
 * indicator, which otherwise sits on top of the button. The site layout
 * reserves space with `pb-20 lg:pb-0`, so the bar never covers the footer's
 * last row.
 */
export function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-(--z-sticky) border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(6,42,49,0.08)] lg:hidden">
      <div className="flex items-stretch">
        {site.contact.email ? (
          <a
            href={`mailto:${site.contact.email}`}
            aria-label="Email the care team"
            className="flex min-h-14 w-16 shrink-0 items-center justify-center border-r border-border text-primary-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
          >
            <Icon name="mail" className="size-6" />
          </a>
        ) : null}

        <Link
          href={routes.consultation}
          className="flex min-h-14 flex-1 items-center justify-center gap-2.5 bg-accent text-base font-semibold text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
        >
          <Icon name="calendar" className="size-5" />
          {APPOINTMENT_CTA}
        </Link>
      </div>
    </div>
  )
}
