'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavGroup } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { routes } from '@/lib/routes'
import { APPOINTMENT_CTA } from '@/lib/site'

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
 * ──────────────────────────────────────────────────────────────────────────
 * EVERY LEVEL IS A SLIDE. THERE ARE NO DROPDOWNS IN HERE, BY INSTRUCTION.
 *
 * The expertise menu used to end in `<details>` accordions because it is
 * three deep and the old code could only animate one submenu panel. The
 * panels are now a STACK of arbitrary depth, so a column opens the same way
 * a section does and the reader never has to hold two mental models.
 *
 * HOW THE SLIDING WORKS, and why it is a track rather than per-panel
 * transforms: every panel is laid out side by side at `left: i * 100%`
 * inside one element that is itself translated by `-depth * 100%`. The panel
 * being entered is therefore already mounted OFF-SCREEN before it is asked
 * to move, so it animates in properly. Transforming each panel individually
 * does not survive a newly mounted node — React applies the mount and the
 * new transform in one commit, there is no starting frame to animate from,
 * and the panel simply appears. Moving the container sidesteps that: the
 * thing that animates was already there.
 *
 * Only the panel at `depth` is interactive; every other one is `inert`.
 * Without it, Tab walks into links sitting outside the viewport, which is
 * invisible and unescapable.
 *
 * ESCAPE GOES BACK BEFORE IT CLOSES. From any depth, Escape pops one level;
 * at the root it dismisses the drawer. The `cancel` event is where that is
 * decided, so it works for every route the browser uses to dismiss a dialog.
 *
 * The scroll lock lives in `globals.css` as `html:has(dialog[open])`, so no
 * effect mutates `document.body` and nothing can leave the page locked if
 * this component unmounts while open.
 */

/** One row in the drawer. A node with `children` drills down; the rest link. */
interface MenuNode {
  key: string
  label: string
  href?: string
  description?: string
  children?: MenuNode[]
}

/**
 * Flatten the header's nav shape into one uniform tree.
 *
 * The source has three different shapes at three depths — `NavGroup`,
 * `MegaNavColumn`, `MegaNavLink` — which is why the old drawer needed a
 * different control for each. One node type means one row component and one
 * panel component, whatever the depth, and a fourth level in the data would
 * need no change here.
 */
function toNodes(nav: NavGroup[]): MenuNode[] {
  return nav.map((group) => {
    const children: MenuNode[] = [
      ...group.links.map((link) => ({
        key: link.href,
        label: link.label,
        href: link.href,
        description: link.description,
      })),
      ...(group.mega ?? []).map((column) => ({
        key: `col:${column.label}`,
        label: column.label,
        href: column.href,
        children: [
          ...column.links.map((link) => ({
            key: link.href,
            label: link.label,
            href: link.href,
            description: link.description,
            children: link.links?.length
              ? link.links.map((child) => ({
                  key: child.href,
                  label: child.label,
                  href: child.href,
                }))
              : undefined,
          })),
          /* The column's closing "View all …" row, kept because a reader
             scanning a long list looks for the way out at the bottom. */
          ...(column.footer
            ? [
                {
                  key: column.footer.href,
                  label: column.footer.label,
                  href: column.footer.href,
                },
              ]
            : []),
        ],
      })),
    ]

    return {
      key: `grp:${group.label}`,
      label: group.label,
      href: group.href,
      children: children.length > 0 ? children : undefined,
    }
  })
}

export function MobileMenu({
  nav,
  onDark = false,
}: {
  nav: NavGroup[]
  /** White trigger, for use over the dark hero. */
  onDark?: boolean
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  /** The row that opened the current panel, so Back can return focus to it. */
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
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
  /** The nodes drilled into, root first. Its length is the current depth. */
  const [stack, setStack] = useState<MenuNode[]>([])

  const open = openedAt !== null && openedAt === pathname
  const roots = useMemo(() => toNodes(nav), [nav])

  /** A closed drawer can never reopen onto a stale panel. */
  const depth = open ? stack.length : 0
  const panels: MenuNode[] = [
    { key: 'root', label: 'Menu', children: roots },
    ...(open ? stack : []),
  ]

  const setOpen = (next: boolean) => {
    setOpenedAt(next ? pathname : null)
    setStack([])
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

    if (depth > 0) {
      dialog
        .querySelector<HTMLElement>(`[data-panel="${depth}"] [data-back]`)
        ?.focus()
    } else {
      triggerRefs.current[0]?.focus()
    }
  }, [open, depth])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        /* Over the hero the trigger is white; once the header frosts it has
           to come back to ink or it disappears into the bar.

           ⚠️  85rem, MATCHING THE DESKTOP NAV in `Header.tsx` — the row of
           eight items plus the logo and the button does not fit below it,
           and the reasoning is written out there. The two breakpoints must
           move together, or a band of widths gets both the drawer and the
           nav, or neither. */
        className={`inline-flex size-11 items-center justify-center rounded-(--radius-button) transition-colors min-[85rem]:hidden ${
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
          // Escape backs out one level before it closes the drawer.
          if (depth > 0) {
            event.preventDefault()
            setStack((s) => s.slice(0, -1))
          }
        }}
        /* ⚠️  `w-[90%]`, NOT `w-full`, ON INSTRUCTION. The strip of dimmed
           page left showing is what makes the drawer read as a layer over
           the site rather than as a new screen, and it gives a thumb
           somewhere to tap to dismiss. `max-w-sm` still caps it, so the
           drawer does not become a half-metre of empty list on a tablet. */
        className="drawer m-0 ml-auto h-dvh w-[90%] max-w-sm bg-surface shadow-(--shadow-modal) backdrop:bg-brand-teal-950/55"
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
            <div
              className="absolute inset-0 transition-transform duration-300 ease-(--ease-out-settle) motion-reduce:transition-none"
              style={{ transform: `translateX(-${depth * 100}%)` }}
            >
              {panels.map((panel, index) => (
                <nav
                  key={`${index}-${panel.key}`}
                  data-panel={index}
                  aria-label={index === 0 ? 'Main' : panel.label}
                  inert={index !== depth || undefined}
                  className="absolute inset-y-0 w-full overflow-y-auto overscroll-contain bg-surface px-5 py-4"
                  style={{ left: `${index * 100}%` }}
                >
                  {index > 0 ? (
                    <>
                      <button
                        type="button"
                        data-back
                        onClick={() => setStack((s) => s.slice(0, index - 1))}
                        className="flex min-h-12 w-full cursor-pointer items-center gap-2 rounded-(--radius-button) px-3 text-sm font-bold uppercase tracking-[0.08em] text-accent-dark hover:bg-surface-subtle"
                      >
                        <Icon name="arrow-left" className="size-4 shrink-0" />
                        Back
                      </button>

                      <p className="mt-3 px-3 text-h6">{panel.label}</p>
                    </>
                  ) : null}

                  <ul className={index > 0 ? 'mt-2 space-y-0.5' : 'space-y-1'}>
                    {/* The section's own page, which the drill-down would
                        otherwise bury — tapping the parent row now opens
                        this list instead of navigating to it. */}
                    {index > 0 && panel.href ? (
                      <li>
                        <Link
                          href={panel.href}
                          className="flex min-h-12 items-center rounded-(--radius-button) px-3 font-semibold text-accent-dark hover:bg-surface-subtle"
                        >
                          All of {panel.label}
                        </Link>
                      </li>
                    ) : null}

                    {panel.children?.map((node) =>
                      node.children?.length ? (
                        <li key={node.key}>
                          <button
                            type="button"
                            ref={(el) => {
                              if (index === depth && index === 0) {
                                triggerRefs.current[0] ??= el
                              }
                            }}
                            onClick={() =>
                              setStack((s) => [...s.slice(0, index), node])
                            }
                            /* `aria-expanded` would be wrong: the children
                               are not revealed in place, they replace this
                               view. */
                            className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-(--radius-button) px-3 text-left font-semibold text-text hover:bg-surface-subtle ${
                              index === 0 ? 'min-h-14 text-lg' : 'min-h-12'
                            }`}
                          >
                            {node.label}
                            <Icon
                              name="chevron-right"
                              className="size-5 shrink-0 text-text-muted"
                            />
                          </button>
                        </li>
                      ) : (
                        <li key={node.key}>
                          <Link
                            href={node.href ?? '#'}
                            className={`flex flex-col justify-center rounded-(--radius-button) px-3 text-text hover:bg-surface-subtle hover:text-primary-dark ${
                              index === 0
                                ? 'min-h-14 text-lg font-semibold'
                                : 'min-h-12 py-2'
                            }`}
                          >
                            {node.label}
                            {node.description ? (
                              <span className="mt-0.5 text-xs text-text-muted">
                                {node.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className="border-t border-border p-5">
            <Button
              href={routes.consultation}
              size="lg"
              className="w-full"
              icon="arrow-right"
            >
              {APPOINTMENT_CTA}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  )
}
