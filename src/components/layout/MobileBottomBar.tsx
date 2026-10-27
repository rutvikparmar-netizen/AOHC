import Link from 'next/link'
import { whatsappHref } from '@/lib/format'
import { routes } from '@/lib/routes'
import { Icon } from '@/components/ui/Icon'

/**
 * Sticky action bar, phones only.
 *
 * The two things a patient on a phone most likely wants, always one tap
 * away. The page is long and the header scrolls out of reach; without this
 * the next step is wherever the reader happens to be.
 *
 * `pb-[env(safe-area-inset-bottom)]` keeps the row clear of the iPhone home
 * indicator, which otherwise sits on top of the middle button. The site
 * layout reserves space with `pb-20 lg:pb-0`, so the bar never covers the
 * footer's last row.
 *
 * TWO ROUTES: WHATSAPP AND THE FORM. There is no call button, because there
 * is no telephone line — see `src/lib/site.ts`. An item whose target is
 * missing is omitted rather than rendered dead: a bottom bar is no place for
 * a placeholder, and tapping a button that does nothing reads as "this
 * practice is unreachable".
 *
 * EMAIL WAS THE THIRD AND HAS BEEN DROPPED ON REQUEST. Three targets across
 * a phone's width left each one narrow, and the two that remain are the ones
 * people actually use from a phone. Email is still one tap away in the
 * footer and beside the enquiry form, so nothing has become unreachable —
 * it has stopped competing for the bar.
 */
export function MobileBottomBar() {
  const whatsapp = whatsappHref('Hello, I would like to ask about a consultation.')

  /* Icon beside the label, not stacked above it. Stacking was there to keep
     three targets narrow; with two there is room for a row, and it matches
     the consultation button alongside it. */
  const itemClass =
    'flex min-h-12 flex-1 items-center justify-center gap-2 rounded-(--radius-button) text-sm font-semibold text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

  return (
    <div className="fixed inset-x-0 bottom-0 z-(--z-sticky) border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(6,42,49,0.08)] lg:hidden">
      <div className="mx-auto flex max-w-md items-stretch gap-2 p-2">
        {whatsapp ? (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={itemClass}
          >
            <Icon name="message-circle" className="size-5 text-primary-dark" />
            WhatsApp
          </a>
        ) : null}

        <Link
          href={routes.consultation}
          className="flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-(--radius-button) bg-accent px-4 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Icon name="calendar" className="size-5" />
          Consult
        </Link>
      </div>
    </div>
  )
}
