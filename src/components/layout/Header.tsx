import Image from 'next/image'
import Link from 'next/link'
import type { MegaNavColumn } from '@/types'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'
import { primaryNav } from '@/data/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { MobileMenu } from './MobileMenu'

/**
 * Groups the flat column list into one stack per grid cell.
 *
 * ⚠️  THE EXTRAS STACK INSIDE A CELL, THEY DO NOT FORM A SECOND GRID ROW.
 * They used to, and a grid row is as tall as its tallest cell: Centre of
 * Excellence runs to eleven lines, so the stacked column could not begin
 * until that one had finished and sat about 110px below its own neighbour
 * with nothing in between. Stacking lets each cell close up on its own.
 *
 * The cost, taken deliberately: second-level headings no longer line up
 * across the panel, because each column closes at its own height. Aligning
 * them is exactly what a grid row does, and that alignment is what the dead
 * space was paying for. Do not "fix" the ragged headings by going back to a
 * row.
 *
 * WHICH COLUMN A STACK JOINS COMES FROM THE DATA, via `stackUnder`. An
 * earlier version worked it out by index, which made the order of
 * `expertiseNav` load-bearing in a way nothing could check — moving two
 * entries put each under the wrong heading and still compiled. A column
 * naming a parent that is not there keeps a cell of its own rather than
 * disappearing from the menu.
 */
function stackMegaColumns(
  columns: MegaNavColumn[],
): { key: string; stack: MegaNavColumn[] }[] {
  /* `key` rather than reading `stack[0]` at the call site: with
     `noUncheckedIndexedAccess` an index into an array is possibly
     undefined, and the head is only known to exist here. */
  const cells = columns
    .filter((column) => !column.stackUnder)
    .map((column) => ({ key: column.label, stack: [column] }))

  for (const column of columns) {
    if (!column.stackUnder) continue
    const parent = cells.find((cell) => cell.key === column.stackUnder)
    if (parent) parent.stack.push(column)
    else cells.push({ key: column.label, stack: [column] })
  }

  return cells
}

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
          ? /**
             * ⚠️  NO POSITIONING IN OVERLAY MODE. `StickyHeaderShell`
             * positions this, and it used to be `absolute inset-x-0 top-0`
             * from when it lived inside the hero card.
             *
             * Absolute inside the shell took it out of the shell's flow,
             * which left the shell nothing to be the height of — so the
             * frosted background painted across a zero-height box and the
             * bar looked transparent no matter what colour it was given.
             * The text and logo still recoloured correctly, because the
             * cascade does not care about positioning, which made it look
             * like a colour bug rather than a layout one.
             *
             * `relative` is the one exception, and it is not positioning
             * this element so much as offering itself as the positioning
             * context for the full-width expertise panel below — that
             * panel is `absolute inset-x-0` and has to resolve against the
             * header to span the window.
             */
            'relative'
          : // Sticky on its own. Wrap it in `StickyHeaderShell` as well to
            // get the compact-on-scroll behaviour, which the data-header-*
            // hooks below are there for.
            'relative sticky top-0 z-(--z-header) bg-surface shadow-(--shadow-header)'
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

      {/* The row shortens once `StickyHeaderShell` marks the page scrolled.
          Every scrolled style is written as `group-data-[scrolled]/header:`
          so it sits on the element it affects rather than being reached
          into from the shell. */}
      <Container
        data-header-row
        className="flex min-h-(--spacing-header-mobile) items-center gap-8 transition-[min-height] duration-300 group-data-[scrolled]/header:min-h-14 lg:min-h-(--spacing-header) lg:group-data-[scrolled]/header:min-h-16 xl:gap-4"
      >
        <Link href={routes.home} className="shrink-0" aria-label={`${site.name} — home`}>
          {/* The lockup is reversed out over the hero with a filter and
              returns to its own colours once the bar is frosted — the
              wordmark is dark teal and would vanish into it otherwise. */}
          <Image
            src="/aohc-logo.svg"
            alt={site.name}
            width={212}
            height={131}
            priority
            data-header-logo
            className={`h-12 w-auto transition-[height,filter] duration-300 group-data-[scrolled]/header:h-9 lg:h-16 lg:group-data-[scrolled]/header:h-11 ${
              overlay
                ? 'brightness-0 invert group-data-[scrolled]/header:brightness-100 group-data-[scrolled]/header:invert-0'
                : ''
            }`}
          />
        </Link>

        {/* An earlier version put `mr-auto` here to push the actions right.
            It did nothing below `xl` — this element is `hidden` there, and
            a `display: none` element is not a flex item, so it has no
            margins to collect the free space. The menu button ended up
            packed against the logo on every screen under 1280px. The rule
            that replaced it is on the actions, and on this element from
            `xl` up; see both comments below. */}
        {/* `shrink-0`, because the nav was being squeezed below its content
            width at exactly the breakpoint that reveals it: every label
            long enough to break did, and "About Us", "International
            Patients" and "Contact Us" each sat on two lines. A nav item is
            a single phrase and should never wrap. */}
        {/**
         * ⚠️  THE ITEMS ARE FULL HEIGHT, AND THAT IS WHAT MAKES THE
         * DROPDOWNS REACHABLE.
         *
         * A panel opens on `group-hover` of its `<li>` and hangs from the
         * bottom of the header. While the `<li>` was only as tall as its
         * own text there was a band of dead header between the two: the
         * pointer left the item, `group-hover` went false, and the panel
         * closed before it could be reached. Stretching the items to the
         * full height of the row removes the gap entirely — the trigger
         * now ends exactly where the panel begins.
         */}
        {/**
         * CENTRED BY AUTO MARGINS, not by absolute positioning. Auto
         * margins absorb the free space on both sides of the nav and push
         * the actions to the far edge, and because the nav is still in
         * the flow it can never overlap the logo or the button — which an
         * absolutely centred nav does at 1280, where the row has only a
         * few pixels to spare. The nav therefore centres between the logo
         * and the button rather than on the window; with the two end
         * blocks at 103px and 206px that is about 50px off true centre,
         * and no reader will measure it.
         */}
        <nav
          aria-label="Main"
          className="hidden shrink-0 self-stretch xl:mx-auto xl:block"
        >
          <ul className="flex h-full items-stretch gap-0.5">
            {primaryNav.map((group) => {
              const mega = group.mega
              const hasChildren = mega ? mega.length > 0 : group.links.length > 0

              return (
                /**
                 * `static` FOR THE MEGA ITEM, `relative` FOR THE REST.
                 *
                 * An absolutely positioned panel resolves against its
                 * nearest positioned ancestor. A narrow dropdown wants that
                 * to be its own `<li>`, so it hangs under its trigger; the
                 * full-width panel wants the header, so it can span the
                 * window. Taking the positioning off this one item is what
                 * lets the same markup do both.
                 */
                /* `shrink-0` on each item as well as on the nav: the items
                   are flex children too, and without it they compress
                   below their own labels while `whitespace-nowrap` stops
                   the text reflowing — so the words run into each other
                   instead of the row simply being too wide. */
                <li
                  key={group.label}
                  className={`group flex shrink-0 items-center ${mega ? 'static' : 'relative'}`}
                >
                  {/**
                   * ── The trigger, and what ties the panel to it ───────
                   *
                   * THE WRAPPER EXISTS TO ANCHOR THE CARET. The `<li>` is
                   * `static` so the mega panel can centre on the header,
                   * which means nothing inside it can be positioned
                   * against the item itself. This span is `relative` and
                   * `self-stretch`, so it is exactly as tall as the header
                   * row and its bottom edge is where the panel begins —
                   * giving the caret something to hang from without
                   * disturbing the panel's own containing block.
                   *
                   * It must not be given a width or a background: the
                   * `<li>` is the hover target, and shrinking the hit area
                   * back to the label would reopen the dead band between
                   * trigger and panel that the full-height items fixed.
                   */}
                  <span className="relative flex items-center self-stretch">
                    <Link
                      href={group.href ?? '#'}
                      /* 14px and tighter padding, so eight items and the
                         button fit on one row. 14px is the floor this type
                         scale sets and `--text-xs` is the token for it —
                         the scale's own note explains why nothing goes
                         below.

                         THE FILL IS THE "THIS ONE IS OPEN" MARKER. It is
                         on `group-hover`, not `hover`, so it lights up
                         while the pointer is anywhere in the panel below
                         — the whole point is that it stays lit for as long
                         as the menu it opened is on screen. */
                      className={`inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-(--radius-button) px-2 text-xs font-semibold transition-colors ${
                        overlay
                          ? 'text-white/85 group-hover:bg-white/10 group-hover:text-white group-focus-within:bg-white/10 group-data-[scrolled]/header:text-text group-data-[scrolled]/header:group-hover:bg-primary-subtle group-data-[scrolled]/header:group-hover:text-primary-dark'
                          : 'text-text group-hover:bg-primary-subtle group-hover:text-primary-dark group-focus-within:bg-primary-subtle'
                      }`}
                    >
                      {group.label}
                      {hasChildren ? (
                        <Icon
                          name="chevron-down"
                          className={`size-3.5 transition-transform group-hover:rotate-180 ${
                            overlay
                              ? 'text-white/60 group-data-[scrolled]/header:text-text-subtle'
                              : 'text-text-subtle'
                          }`}
                        />
                      ) : null}
                    </Link>

                    {/**
                     * ⚠️  THE CARET IS ONLY FOR THE MEGA PANEL. Every other
                     * dropdown is `absolute left-0` inside its own
                     * `relative` item, so it already hangs visibly beneath
                     * the word that opened it. This one is centred on the
                     * header and can open six items away from its trigger,
                     * which is the whole problem it solves.
                     *
                     * ⚠️  `0.75rem` IS THE PANEL WRAPPER'S `pt-3`. The
                     * caret is centred on the card's top edge: the half
                     * above shows, the half below is covered because the
                     * panel carries `z-(--z-dropdown)` and paints over it.
                     * Change that padding and change this, or the caret
                     * floats off the card or vanishes under it.
                     *
                     * `rotate` and `translate` are separate properties in
                     * Tailwind v4, so the rotation and the centring
                     * compose instead of overwriting one another.
                     */}
                    {mega ? (
                      <span
                        aria-hidden
                        className="invisible absolute left-1/2 top-[calc(100%_+_0.75rem)] size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-border bg-surface opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
                      />
                    ) : null}
                  </span>

                  {/**
                   * ── The expertise panel ──────────────────────────────
                   * A CONTAINED BOX, NOT A FULL-BLEED BAND. Spanning the
                   * window put the far column a long way from the trigger
                   * and left nothing tying the panel back to the item
                   * that opened it. A card centred under the header reads
                   * as belonging to "Our Expertise", and seven columns
                   * still fit as five across and two down.
                   *
                   * It is centred on the HEADER rather than on its own
                   * item — hence `static` on that `<li>` — because a box
                   * this wide anchored to a mid-nav trigger would hang
                   * off the right edge of the window.
                   *
                   * Opens on hover AND on `focus-within`, like the narrow
                   * dropdowns: a hover-only menu leaves its links
                   * focusable but invisible, which is worse than no menu
                   * at all. No JavaScript, so it works before hydration
                   * and for a crawler.
                   *
                   * The `calc()` needs spaces around its minus or the
                   * whole declaration is invalid and the cap silently
                   * does nothing — underscores are how Tailwind writes
                   * them inside an arbitrary value.
                   */}
                  {mega ? (
                    <div className="invisible absolute left-1/2 top-full z-(--z-dropdown) w-[min(1420px,calc(100vw_-_2.5rem))] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="max-h-[min(44rem,calc(100dvh_-_8rem))] overflow-y-auto rounded-(--radius-panel) border border-border bg-surface p-6 shadow-(--shadow-dropdown)">
                          {/* FIVE CELLS, WITH THE EXTRA COLUMNS STACKED
                              INSIDE ONE rather than wrapping to a second
                              grid row — see `stackMegaColumns`, and
                              `stackUnder` in `src/data/navigation.ts` for
                              which column joins which.

                              All seven shared one row once, which left
                              each about 180px at the 1420 cap — narrow
                              enough that "Blood Based Tests & Markers"
                              ran to four lines and the tallest column
                              pushed the panel into its scroll cap.

                              THE FIRST CELL IS WIDER THAN THE REST, at
                              1.4fr against 1fr: about 340px rather than
                              260. Centre of Excellence carries the four
                              longest labels in the menu and the only
                              third level, so at an equal share
                              "Hematological (Blood) Malignancies" took
                              two lines on its own and pushed the four
                              blood cancers down with it. The others lose
                              about 20px each and none of them wraps.

                              The scroll cap stays as a backstop for short
                              windows; it should not normally be hit. */}
                          <ul className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-x-4">
                            {stackMegaColumns(mega).map((cell) => (
                              <li key={cell.key}>
                                {cell.stack.map((column, depth) => (
                                  <div
                                    key={column.label}
                                    className={depth > 0 ? 'mt-8' : undefined}
                                  >
                                    <Link
                                      href={column.href ?? '#'}
                                      className="block text-xs font-bold uppercase tracking-[0.06em] text-accent-dark hover:underline"
                                    >
                                      {column.label}
                                    </Link>

                                    {column.links.length > 0 ? (
                                      <ul className="mt-3 space-y-1">
                                        {column.links.map((link) => (
                                          <li key={link.href}>
                                            <Link
                                              href={link.href}
                                              className="block rounded-(--radius-button) px-2 py-1 text-xs leading-snug text-text transition-colors hover:bg-primary-subtle hover:text-primary-dark"
                                            >
                                              {link.label}
                                            </Link>

                                            {/* The third level — only the
                                                blood cancers go this deep. */}
                                            {link.links?.length ? (
                                              <ul className="mt-1 ml-2 space-y-0.5 border-l border-border pl-3">
                                                {link.links.map((child) => (
                                                  <li key={child.href}>
                                                    <Link
                                                      href={child.href}
                                                      className="block rounded-(--radius-button) px-2 py-1 text-xs leading-snug text-text-muted transition-colors hover:bg-primary-subtle hover:text-primary-dark"
                                                    >
                                                      {child.label}
                                                    </Link>
                                                  </li>
                                                ))}
                                              </ul>
                                            ) : null}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : null}
                                  </div>
                                ))}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ) : hasChildren ? (
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

        {/* `ml-auto` holds the actions at the right edge while the nav is
            hidden. From `xl` the nav's own auto margins do that job, and a
            second auto margin here would split the free space three ways
            and pull the actions back inward. */}
        <div className="ml-auto flex items-center gap-2 xl:ml-0">
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
              /* The label is one phrase and was breaking across two lines
                 whenever the row ran short. */
              className="rounded-(--radius-pill) whitespace-nowrap"
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
