import Link from "next/link";
import type { ChipLink, HeroContent, ImageAsset } from "@/types";
import { routes } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "./HeroVideo";
import { RatingBadge } from "./RatingBadge";

/**
 * Home hero — full-bleed video card, matched to the reference layout.
 *
 * TYPE IS SANS, NOT THE DISPLAY SERIF. The reference sets its headline in a
 * bold grotesque, and at this size the serif was fighting the moving image
 * behind it — thin strokes and high contrast are exactly what a video
 * background destroys. Lexend bold holds up on every frame.
 *
 * ONE CTA UNDER THE STANDFIRST. The header button alone was too easy to
 * miss — it is small, top-right, and hidden below `sm` — so the next step is
 * offered where the eye lands after the headline. One button, not a row: a
 * single action reads as "start here"; three read as a menu.
 *
 * THE SCRIM IS TWO GRADIENTS, NOT A FLAT TINT. A uniform overlay dims bright
 * and dark frames equally, so white text drifts in and out of legibility as
 * footage plays. A horizontal ramp — heavy left under the headline, clearing
 * right so the picture shows — plus a vertical one under the chips holds
 * contrast on every frame.
 *
 * THE FROSTED CHIPS are `bg-brand-teal-950/40` + `backdrop-blur-md` + a
 * `white/15` hairline. The hairline is what makes blur read as glass rather
 * than a smudge; without an edge the panel has no shape.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE PHONE LAYOUT IS A DIFFERENT COMPOSITION, NOT A NARROWER ONE.
 *
 * Everything used to sit inside the dark card at every width, which measured
 * 1163px tall on a 390px screen — a screen and a half of hero before a reader
 * reached a single word of the page. Most of that was furniture: the nine
 * cancer-type chips wrapped into four rows and took 252px on their own.
 *
 * So on phones the card holds only what the reference holds — headline,
 * standfirst, one button — and is capped at roughly one screen with the copy
 * sitting on its floor, where the scrim is heaviest. The chips, the Google
 * rating and the accreditation row move out below the card onto the warm
 * page, the chips as a single swipeable row instead of a block. Nothing is
 * dropped; it is ordered.
 *
 * THE TWO ARRANGEMENTS ARE RENDERED FROM THE SAME SUB-COMPONENTS, one branch
 * `lg:hidden` and the other `hidden lg:block`. Only one is ever in the layout
 * — and `display: none` also takes the other out of the accessibility tree,
 * so nothing is announced twice.
 */

/** Shared by both arrangements; `tone` is the only thing that differs. */
function CancerTypeChip({
  type,
  lead,
  tone,
}: {
  type: ChipLink;
  /** The first chip is styled solid, as an entry point into the list. */
  lead: boolean;
  tone: "dark" | "light";
}) {
  const base =
    "inline-flex min-h-11 items-center rounded-(--radius-pill) px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

  const dark = lead
    ? "bg-white text-brand-teal-900 hover:bg-brand-teal-50 focus-visible:outline-white"
    : "border border-white/15 bg-brand-teal-950/40 text-white backdrop-blur-md hover:border-white hover:bg-white hover:text-brand-teal-900 focus-visible:outline-white";

  const light = lead
    ? "bg-accent text-white hover:bg-accent-dark focus-visible:outline-accent"
    : "border border-border-strong bg-surface text-text hover:border-accent hover:text-accent-dark focus-visible:outline-accent";

  return (
    <Link
      href={routes.cancerType(type.slug)}
      className={`${base} ${tone === "dark" ? dark : light}`}
    >
      {type.label}
    </Link>
  );
}

/**
 * TRUST BAR.
 *
 * Accreditations and affiliations only — things a third party conferred and
 * that can be checked. No ratings, no patient counts, no years-in-operation,
 * because AOHC publishes none of those and a number invented for this row
 * would be the single least defensible thing on the page. See the note on
 * `heroTrust` in `src/data/home.ts` for what was asked for and left out.
 */
function TrustBar({
  items,
  tone,
  className,
}: {
  items: { icon: string; label: string; href?: string }[];
  tone: "dark" | "light";
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-7 gap-y-3 border-t pt-6 ${
        tone === "dark" ? "border-white/15" : "border-border"
      } ${className ?? ""}`}
    >
      {items.map((item) => (
        <li
          key={item.label}
          className={`flex items-center gap-2.5 text-xs font-semibold ${
            tone === "dark" ? "text-brand-teal-100" : "text-text-muted"
          }`}
        >
          <Icon
            name={item.icon as IconName}
            className={`size-4 shrink-0 ${
              tone === "dark" ? "text-brand-teal-300" : "text-primary-dark"
            }`}
          />
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {item.label}
            </a>
          ) : (
            item.label
          )}
        </li>
      ))}
    </ul>
  );
}

export function Hero({
  content,
  cancerTypes,
  faces = [],
  trust = [],
}: {
  content: HeroContent;
  cancerTypes: ChipLink[];
  /** Patient-story thumbnails for the rating badge's face stack. */
  faces?: ImageAsset[];
  /** Accreditation and affiliation chips. See the note where they render. */
  trust?: { icon: string; label: string; href?: string }[];
}) {
  /**
   * FULL BLEED ON PHONES. The card used to sit in a 16px frame on all four
   * sides, which on a 390px screen spends 32px of an already narrow column on
   * margin and makes the hero read as a widget on a page rather than as the
   * top of the page. Edge to edge, with only the bottom corners rounded, is
   * the phone convention and what the reference does.
   *
   * The bottom padding stays: that is the gap before the chips, not a frame.
   * From `lg` the inset frame returns.
   */
  return (
    <section className="bg-background pb-(--gutter) lg:p-(--gutter)">
      {/**
       * `svh` RATHER THAN `vh` ON PHONES. `vh` resolves against the viewport
       * with the browser's address bar retracted, so a `100vh` card is taller
       * than the screen on first paint and the button under the standfirst
       * starts below the fold. `svh` is the small viewport — what is actually
       * visible with the chrome showing — and the `max()` floor stops the
       * card collapsing on a short screen or a landscape phone.
       */}
      <div className="relative isolate flex min-h-[max(30rem,80svh)] flex-col overflow-hidden rounded-b-(--radius-3xl) bg-brand-teal-950 lg:min-h-[860px] lg:rounded-(--radius-3xl)">
        <HeroVideo src="/hero.mp4" poster="/images/hero-poster.jpg" />

        {/* Lighter than before on the right — the reference lets its image
            read clearly there, and so should the helix. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-r from-brand-teal-950/95 via-brand-teal-950/70 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-brand-teal-950/90 to-transparent"
        />

        <Header variant="overlay" />

        {/* Copy sits on the floor of the card on phones, where the vertical
            scrim is heaviest, and is centred again once the card is tall
            enough for centring to read as deliberate. */}
        {/* `pb-20` keeps the full-width CTA clear of the video's pause
            control, which is pinned to the bottom-right corner of the card
            and would otherwise sit on top of it now that the copy has moved
            to the floor. */}
        <Container className="flex flex-1 flex-col justify-end pb-20 pt-24 lg:justify-center lg:pb-12 lg:pt-32">
          <div className="lg:flex lg:flex-1 lg:flex-col lg:justify-center">
            {/**
             * NO CHARACTER CAP ON PHONES. `13ch` is a measure for the 56px
             * desktop setting; at 320px it held the headline to 241px of an
             * available 288px and broke it over five lines. The column is
             * already narrow enough to be its own measure.
             */}
            <h1 className="text-[clamp(1.875rem,4.2vw,3.5rem)] font-bold uppercase leading-[1.04] tracking-[-0.01em] text-white lg:max-w-[13ch]">
              {content.title}
            </h1>

            {/* 17px, not 15px: this sentence is the page's explanation of
                itself, set over moving footage, and it was the smallest text
                in the hero. */}
            <p className="mt-5 text-base leading-relaxed text-white/80 lg:max-w-sm lg:text-sm">
              {content.standfirst}
            </p>

            <Button
              href={routes.consultation}
              variant="accent"
              size="lg"
              icon="calendar"
              iconPosition="start"
              className="mt-8 w-full rounded-(--radius-pill) sm:w-fit"
            >
              Schedule a Free Meeting
            </Button>
          </div>

          {/* ── Inside the card, from `lg` up ───────────────────────────
              Frosted chips and the Google rating badge share one row, the
              badge aligned to the chips' last line. The badge promotes the
              organisation, never one doctor, and renders nothing until a
              real rating is configured — see `RatingBadge`. */}
          <div className="hidden lg:block">
            <div className="mt-14 flex flex-row items-end justify-between gap-8">
              {cancerTypes.length > 0 ? (
                <nav aria-label="Cancer types">
                  <ul className="flex max-w-2xl flex-wrap gap-2">
                    {cancerTypes.map((type, index) => (
                      <li key={type.slug}>
                        <CancerTypeChip
                          type={type}
                          lead={index === 0}
                          tone="dark"
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}

              <div className="shrink-0">
                <RatingBadge
                  faces={faces}
                  storiesHref="#stories"
                  idPrefix="hero-wide"
                />
              </div>
            </div>

            {/* `pr-16` so the last accreditation never runs under the
                video's pause control in the corner. */}
            <TrustBar items={trust} tone="dark" className="mt-8 pr-16" />
          </div>
        </Container>
      </div>

      {/* ── Below the card, phones only ─────────────────────────────────
          This block carries its own gutter now that the section has none,
          so the badge and the accreditations stay inset from the screen
          edge while the card behind them runs full width. */}
      <div className="px-(--gutter) lg:hidden">
        {cancerTypes.length > 0 ? (
          <nav aria-label="Cancer types" className="mt-8">
            {/**
             * ONE SWIPEABLE ROW, BLED TO THE SCREEN EDGES. Wrapped, these
             * nine chips were a 252px block directly under the headline.
             * The negative margin lets the row run to the edge of the
             * screen, which is what signals there is more to the right —
             * a row that stops short of the edge reads as complete.
             */}
            <ul className="scroll-rail -mx-(--gutter) px-(--gutter) pb-1">
              {cancerTypes.map((type, index) => (
                <li key={type.slug}>
                  <CancerTypeChip type={type} lead={index === 0} tone="light" />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="mt-8">
          <RatingBadge
            faces={faces}
            storiesHref="#stories"
            idPrefix="hero-phone"
          />
        </div>

        <TrustBar items={trust} tone="light" className="mt-8" />
      </div>
    </section>
  );
}
