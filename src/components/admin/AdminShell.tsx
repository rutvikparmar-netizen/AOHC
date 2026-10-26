import Link from 'next/link'
import { signOutAdmin } from '@/app/actions/admin/auth'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { Icon, type IconName } from '@/components/ui/Icon'

/**
 * Console chrome: a top bar, a nav rail and the page body.
 *
 * A server component. Sign-out is a plain `<form action={serverAction}>`
 * rather than an onClick handler, so the console needs no client JavaScript to
 * log someone out — which matters on the one control that must always work.
 */

const NAV: Array<{ label: string; href: string; icon: IconName }> = [
  { label: 'Overview', href: routes.admin, icon: 'target' },
  { label: 'Enquiries', href: routes.adminLeads, icon: 'mail' },
  { label: 'Registrations', href: routes.adminRegistrations, icon: 'users' },
]

export function AdminShell({
  email,
  title,
  description,
  active,
  children,
}: {
  email: string
  title: string
  description?: string
  /** Href of the current section, for `aria-current`. */
  active: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-border bg-brand-teal-950 text-white">
        <div className="mx-auto flex max-w-(--container-site) flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div>
            <p className="text-eyebrow uppercase text-brand-teal-300">Art of Healing Cancer</p>
            <p className="font-semibold">Care team console</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-brand-teal-100 sm:inline">{email}</span>
            <Link
              href={routes.home}
              className="text-sm text-brand-teal-100 hover:text-white hover:underline"
            >
              View site
            </Link>
            <form action={signOutAdmin}>
              <button
                type="submit"
                className="rounded-(--radius-button) border border-white/25 px-3 py-1.5 text-sm font-semibold hover:bg-white/10"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-(--container-site) px-5 py-6">
        <nav aria-label="Console" className="mb-6">
          <ul className="flex flex-wrap gap-2">
            {NAV.map((item) => {
              const isActive = item.href === active
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-10 items-center gap-2 rounded-(--radius-pill) border px-4 text-sm font-semibold',
                      isActive
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-strong bg-surface text-text hover:border-primary',
                    )}
                  >
                    <Icon name={item.icon} className="size-4" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mb-6">
          <h1 className="text-h2">{title}</h1>
          {description ? (
            <p className="mt-1 text-text-muted">{description}</p>
          ) : null}
        </div>

        {children}
      </div>
    </div>
  )
}
