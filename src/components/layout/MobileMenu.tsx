'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavGroup } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { routes } from '@/lib/routes'

/**
 * The small-screen navigation drawer, with drill-down submenus.
 *
 * ONE OF THE FEW CLIENT COMPONENTS IN THE PROJECT. It needs open/closed state
 * and has to close itself on navigation, neither of which a server component
 * can do.
 *
 * NATIVE `<dialog>` + `showModal()`, which gives the focus trap, the Escape
 * handler and the inert background for free. Hand-rolling those is where
 * accessible menus usually go wrong — a custom div traps focus badly, leaks
 * Tab to the page behind, or forgets Escape entirely.
 *
 * THE DRILL-DOWN. Tapping a section with children slides the root list out to
 * the left and a second panel in from the right, headed by a back button. It
 * is the pattern every phone OS uses for nested navigation, and it beats an
 * accordion here for a concrete reason: International Patients has seven
 * children and About Us has five, so an expanded accordion pushes the rest of
 * the menu off the bottom of a phone screen and the reader loses their place.
 *
 * ONLY ONE SUBMENU PANEL EXISTS AT A TIME, and `panelLabel` is what it shows.
 * An earlier version stacked all three sections on top of each other and told
 * them apart with a transform alone; driving it in a headless browser caught
 * it painting the wrong section while the DOM and computed styles both said
 * otherwise. One panel cannot be ambiguous about which section it is.
 *
 * `panelLabel` lags `submenu` on the way out on purpose: it keeps rendering
 * the section being closed until the slide-out finishes, so the panel does
 * not blank mid-animation.
 *
 * The off-screen panel is `inert` — without it, Tab walks straight into links
 * sitting outside the viewport, which is invisible and unescapable.
 *
 * ESCAPE GOES BACK BEFORE IT CLOSES. From a submenu, Escape returns to the
 * root list; from the root, it dismisses the drawer. The `cancel` event is
 * where that is decided, so it works for every route the browser uses to
 * dismiss a dialog.
 *
 * The scroll lock lives in `globals.css` as `html:has(dialog[open])`, so no
 * effect mutates `document.body` and nothing can leave the page locked if this
 * component unmounts while open.
 */
export function MobileMenu({
  nav,
  onDark = false,
}: {
  nav: NavGroup[]
  /** White trigger, for use over the dark hero. */
  onDark?: boolean
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  /** The row that opened the current submenu, so Back can return focus to it. */
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)
  const pathname = usePathname()

  /**
   * Open state is DERIVED from the route, not set by an effect.
   *
   * The drawer has to close when a link inside it navigates. The obvious way
   * is `useEffect(() => setOpen(false), [pathname])`, which works and is also
   * a render-then-correct round trip that React now warns about.
   *
   * Storing the path the menu was opened ON removes the effect entirely: the
   * moment `pathname` changes, `openedAt === pathname` is false and the menu
   * is closed, with nothing to synchronise.
   */
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const [submenu, setSubmenu] = useState<string | null>(null)
  /** Which section the single submenu panel renders. Trails `submenu`. */
  const [panelLabel, setPanelLabel] = useState<string | null>(null)

  const open = openedAt !== null && openedAt === pathname
  /** Derived the same way: a submenu only counts while the drawer is open, so
      a closed drawer can never reopen onto a stale panel. */
  const activeLabel = open ? submenu : null
  const panelGroup = nav.find((group) => group.label === panelLabel) ?? null

  const setOpen = (next: boolean) => {
    setOpenedAt(next ? pathname : null)
    setSubmenu(null)
  }

  const openSubmenu = (label: string) => {
    setPanelLabel(label)
    setSubmenu(label)
  }

  // Drive the native dialog from that derived value, so the two cannot
  // disagree after a route change.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  /**
   * Move focus with the panels. Going in, focus lands on Back — the first
   * thing in the new panel and the way out of it. Coming back, it returns to
   * the row that was tapped, so a keyboard user resumes where they left off
   * rather than at the top of the list.
   */
  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return

    if (activeLabel) {
      dialog.querySelector<HTMLElement>('[data-panel] [data-back]')?.focus()
    } else {
      lastTriggerRef.current?.focus()
    }
  }, [open, activeLabel])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        /* Over the hero the trigger is white; once the header frosts it has
           to come back to ink or it disappears into the bar. */
        className={`inline-flex size-11 items-center justify-center rounded-(--radius-button) transition-colors xl:hidden ${
          onDark ? 'text-white group-data-[scrolled]/header:text-text' : 'text-text'
        }`}
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Icon name="menu" className="size-6" />
      </button>

      <dialog
        ref={dialogRef}
        // `close` also fires for Escape and for the backdrop, so state stays
        // in sync however the dialog was dismissed.
        onClose={() => setOpen(false)}
        onCancel={(event) => {
          // Escape backs out of a submenu before it closes the drawer.
          if (activeLabel) {
            event.preventDefault()
            setSubmenu(null)
          }
        }}
        className="drawer m-0 ml-auto h-dvh w-full max-w-sm bg-surface shadow-(--shadow-modal) backdrop:bg-brand-teal-950/55"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="text-h6">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-(--radius-button) text-text-muted"
              aria-label="Close menu"
            >
              <Icon name="x" className="size-5" />
            </button>
          </div>

          {/* The sliding area. `overflow-hidden` clips the panels parked to
              either side; each panel scrolls on its own. */}
          <div className="relative flex-1 overflow-hidden">
            {/* ── Root list ─────────────────────────────────────────── */}
            <nav
              aria-label="Main"
              inert={activeLabel !== null || undefined}
              className={`absolute inset-0 overflow-y-auto overscroll-contain px-5 py-4 transition-transform duration-300 ease-(--ease-out-settle) ${
                activeLabel ? '-translate-x-full' : 'translate-x-0'
              }`}
            >
              <ul className="space-y-1">
                {nav.map((group) =>
                  group.links.length > 0 ? (
                    <li key={group.label}>
                      <button
                        type="button"
                        onClick={(event) => {
                          lastTriggerRef.current = event.currentTarget
                          openSubmenu(group.label)
                        }}
                        /* `aria-expanded` would be wrong: the children are not
                           revealed in place, they replace this view. */
                        className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 rounded-(--radius-button) px-3 text-left text-lg font-semibold text-text hover:bg-surface-subtle"
                      >
                        {group.label}
                        <Icon
                          name="chevron-right"
                          className="size-5 shrink-0 text-text-muted"
                        />
                      </button>
                    </li>
                  ) : (
                    <li key={group.label}>
                      <Link
                        href={group.href ?? '#'}
                        className="flex min-h-14 items-center rounded-(--radius-button) px-3 text-lg font-semibold text-text hover:bg-surface-subtle"
                      >
                        {group.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            {/* ── The one submenu panel ─────────────────────────────── */}
            {panelGroup ? (
              <nav
                data-panel={panelGroup.label}
                aria-label={panelGroup.label}
                inert={activeLabel === null || undefined}
                className={`absolute inset-0 overflow-y-auto overscroll-contain bg-surface px-5 py-4 transition-transform duration-300 ease-(--ease-out-settle) ${
                  activeLabel ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <button
                  type="button"
                  data-back
                  onClick={() => setSubmenu(null)}
                  className="flex min-h-12 w-full cursor-pointer items-center gap-2 rounded-(--radius-button) px-3 text-sm font-bold uppercase tracking-[0.08em] text-accent-dark hover:bg-surface-subtle"
                >
                  <Icon name="arrow-left" className="size-4 shrink-0" />
                  Back
                </button>

                <p className="mt-3 px-3 text-h6">{panelGroup.label}</p>

                <ul className="mt-2 space-y-0.5">
                  {/* The section's own page, which the drill-down would
                      otherwise bury — tapping the parent row now opens this
                      list instead of navigating. */}
                  {panelGroup.href ? (
                    <li>
                      <Link
                        href={panelGroup.href}
                        className="flex min-h-12 items-center rounded-(--radius-button) px-3 font-semibold text-accent-dark hover:bg-surface-subtle"
                      >
                        All of {panelGroup.label}
                      </Link>
                    </li>
                  ) : null}

                  {panelGroup.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-12 flex-col justify-center rounded-(--radius-button) px-3 py-2 text-text hover:bg-surface-subtle hover:text-primary-dark"
                      >
                        {link.label}
                        {link.description ? (
                          <span className="mt-0.5 text-xs text-text-muted">
                            {link.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          <div className="border-t border-border p-5">
            <Button
              href={routes.consultation}
              size="lg"
              className="w-full"
              icon="arrow-right"
            >
              Request a Consultation
            </Button>
          </div>
        </div>
      </dialog>
    </>
  )
}
