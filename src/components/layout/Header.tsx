import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'
import { primaryNav } from '@/data/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { MobileMenu } from './MobileMenu'

/**
 * Site header.
 *
 * Two modes, because the reference layout puts the header INSIDE the dark
 * hero card on the home page and above white content everywhere else:
 *
 *   overlay  transparent, white type, absolutely positioned over the hero
 *   solid    white, sticky, with a bottom border
 *
 * A server component, with one client child for the mobile drawer.
 *
 * THE DROPDOWNS ARE CSS-ONLY. They open on `group-hover` AND
 * `group-focus-within`, which is what makes them reachable by keyboard — a
 * hover-only menu leaves its links focusable but invisible, which is worse
 * than no menu at all. No JavaScript means they also work before hydration
 * and for a crawler.
 *
 * THE LOGO IS INVERTED IN OVERLAY MODE with a CSS filter rather than by
 * shipping a second file. Swap the `<Image src>` and drop the filter if a
 * proper reversed lockup arrives.
 */
export function Header({ variant = 'solid' }: { variant?: 'overlay' | 'solid' }) {
  const overlay = variant === 'overlay'

  return (
    <header
      className={
        overlay
          ? 'absolute inset-x-0 top-0 z-(--z-header)'
          : // Sticky on its own. Wrap it in `StickyHeaderShell` as well to
            // get the compact-on-scroll behaviour, which the data-header-*
            // hooks below are there for.
            'sticky top-0 z-(--z-header) bg-surface shadow-(--shadow-header)'
      }
    >
      {/* Utility bar. Renders only where there is something true to put in
          it — with `site.contact` blank it disappears rather than showing an
          empty strip. */}
      {!overlay && (site.contact.email || site.contact.hours) ? (
        <div
          data-header-utility
          className="hidden border-b border-border bg-brand-teal-950 text-white lg:block"
        >
          <Container className="flex min-h-(--spacing-topbar) items-center justify-between gap-6 text-xs">
            <p className="text-brand-teal-100">{site.tagline}</p>
            <div className="flex items-center gap-6">
              {site.contact.hours ? (
                <span className="inline-flex items-center gap-2 text-brand-teal-100">
                  <Icon name="clock" className="size-3.5 text-brand-teal-300" />
                  {site.contact.hours}
                </span>
              ) : null}
              {site.contact.email ? (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 hover:text-brand-teal-300"
                >
                  <Icon name="mail" className="size-3.5 text-brand-teal-300" />
                  {site.contact.email}
                </a>
              ) : null}
            </div>
          </Container>
        </div>
      ) : null}

      <Container
        data-header-row
        className="flex min-h-(--spacing-header-mobile) items-center gap-8 transition-[min-height] duration-300 lg:min-h-(--spacing-header)"
      >
        <Link href={routes.home} className="shrink-0" aria-label={`${site.name} — home`}>
          <Image
            src="/aohc-logo.svg"
            alt={site.name}
            width={212}
            height={131}
            priority
            data-header-logo
            className={`h-12 w-auto transition-[height] duration-300 lg:h-16 ${
              overlay ? 'brightness-0 invert' : ''
            }`}
          />
        </Link>

        {/* `mr-auto` groups the nav tight against the logo and pushes the
            actions to the far right — the reference layout's arrangement.
            Without it `justify-between` centres the nav in the gap. */}
        <nav aria-label="Main" className="mr-auto hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((group) => {
              const hasChildren = group.links.length > 0

              return (
                <li key={group.label} className="group relative">
                  <Link
                    href={group.href ?? '#'}
                    className={`inline-flex min-h-11 items-center gap-1 rounded-(--radius-button) px-3 text-sm font-semibold transition-colors ${
                      overlay
                        ? 'text-white/85 hover:text-white'
                        : 'text-text hover:text-primary-dark'
                    }`}
                  >
                    {group.label}
                    {hasChildren ? (
                      <Icon
                        name="chevron-down"
                        className={`size-3.5 transition-transform group-hover:rotate-180 ${
                          overlay ? 'text-white/60' : 'text-text-subtle'
                        }`}
                      />
                    ) : null}
                  </Link>

                  {hasChildren ? (
                    <div className="invisible absolute left-0 top-full z-(--z-dropdown) w-76 translate-y-1 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="overflow-hidden rounded-(--radius-panel) border border-border bg-surface p-2 shadow-(--shadow-dropdown)">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block rounded-(--radius-button) px-3 py-2.5 transition-colors hover:bg-primary-subtle"
                            >
                              <span className="block text-sm font-semibold text-text">
                                {link.label}
                              </span>
                              {link.description ? (
                                <span className="mt-0.5 block text-xs text-text-muted">
                                  {link.description}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/**
           * THE BREAKPOINT LIVES ON THIS WRAPPER, NOT ON THE BUTTON.
           *
           * `hidden` passed to `<Button>` through `className` did nothing:
           * `cn()` only joins strings, so the button kept both `inline-flex`
           * from its own base classes and `hidden` from here. Two utilities,
           * same specificity — so the winner is whichever Tailwind emits
           * last, and that is `.inline-flex`. The button was therefore
           * visible on every phone, where the label wrapped onto two lines
           * and squeezed the logo.
           *
           * A wrapper has no competing display of its own, so `hidden` means
           * hidden. Anything else that needs to hide a `<Button>`
           * responsively should wrap it the same way.
           */}
          <div className="hidden sm:block">
            <Button
              href={routes.consultation}
              size="sm"
              variant="accent"
              className="rounded-(--radius-pill)"
            >
              {/* ONE primary label across the whole site. */}
              Request a Consultation
            </Button>
          </div>

          <MobileMenu nav={primaryNav} onDark={overlay} />
        </div>
      </Container>
    </header>
  )
}
