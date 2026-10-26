import Link from 'next/link'
import { site } from '@/lib/site'
import { whatsappHref } from '@/lib/format'
import { routes } from '@/lib/routes'
import { Icon } from '@/components/ui/Icon'

/**
 * Sticky action bar, phones only.
 *
 * The three things a patient on a phone most likely wants, always one tap
 * away. The page is long and the header scrolls out of reach; without this
 * the next step is wherever the reader happens to be.
 *
 * `pb-[env(safe-area-inset-bottom)]` keeps the row clear of the iPhone home
 * indicator, which otherwise sits on top of the middle button. The site
 * layout reserves space with `pb-20 lg:pb-0`, so the bar never covers the
 * footer's last row.
 *
 * THE THREE ROUTES ARE EMAIL, WHATSAPP AND THE FORM. There is no call
 * button, because there is no telephone line — see `src/lib/site.ts`. An item
 * whose target is missing is omitted rather than rendered dead: a bottom bar
 * is no place for a placeholder, and tapping a button that does nothing
 * reads as "this practice is unreachable".
 */
export function MobileBottomBar() {
  const whatsapp = whatsappHref('Hello, I would like to ask about a consultation.')

  const itemClass =
    'flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-(--radius-button) text-xs font-semibold text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

  return (
    <div className="fixed inset-x-0 bottom-0 z-(--z-sticky) border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(6,42,49,0.08)] lg:hidden">
      <div className="mx-auto flex max-w-md items-stretch gap-2 p-2">
        {site.contact.email ? (
          <a href={`mailto:${site.contact.email}`} className={itemClass}>
            <Icon name="mail" className="size-5 text-primary-dark" />
            Email
          </a>
        ) : null}

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
