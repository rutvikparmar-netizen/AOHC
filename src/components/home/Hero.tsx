import Link from "next/link";
import type { HeroContent, TrustPoint } from "@/types";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "./HeroVideo";
import { PatientStoriesBadge } from "./PatientStoriesBadge";

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
 * right so the picture shows — plus a vertical one under the trust points
 * holds contrast on every frame. The vertical ramp is what the points are
 * legible against; they are small white type directly over moving footage,
 * so it is not decoration.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE PHONE LAYOUT IS A DIFFERENT COMPOSITION, NOT A NARROWER ONE.
 *
 * Everything used to sit inside the dark card at every width, which measured
 * 1163px tall on a 390px screen — a screen and a half of hero before a reader
 * reached a single word of the page. Most of that was furniture: nine
 * cancer-type chips wrapped into four rows and took 252px on their own.
 *
 * ⚠️  THAT HEIGHT IS STILL THE BINDING CONSTRAINT, and it is why the trust
 * points run two across on phones rather than stacked. The card is capped at
 * roughly one screen with the copy sitting on its floor, where the scrim is
 * heaviest. Anything added to the foot of this card has to be measured on a
 * 390px screen before it ships, not after.
 *
 * THE TWO ARRANGEMENTS ARE RENDERED FROM THE SAME SUB-COMPONENTS, one branch
 * `lg:hidden` and the other `hidden lg:block`. Only one is ever in the layout
 * — and `display: none` also takes the other out of the accessibility tree,
 * so nothing is announced twice.
 */

/**
 * The trust points on the floor of the card, under a hairline rule.
 *
 * ⚠️  WHAT USED TO BE HERE WAS NINE CANCER-TYPE CHIPS, AND THEY ARE GONE ON
 * REQUEST — replaced by these four. Worth knowing before anyone restores
 * them: every one of those chips linked `routes.cancerType(slug)` and not
 * one of those nine pages exists, so the hero was nine dead links. If they
 * come back, they come back pointing at `/cancer-types`, which is built, or
 * after the per-type pages are.
 *
 * ⚠️  NO FIGURES. The reference layout this row is modelled on leads on "1M+
 * patient outcomes" and a 48-hour turnaround, and the brief that supplied
 * this copy warned off claims like those "unless AOHC can substantiate those
 * services and figures". Every point here describes how AOHC works, not what
 * it has achieved. See `TrustPoint` in `src/types/content.ts` for why the
 * shape has nowhere to put a number.
 *
 * ⚠️  `lg` AND UP ONLY, AND THAT IS A MEASUREMENT, NOT A PREFERENCE. Inside
 * the card on a phone these four take the hero to 1060px on a 360x800 screen
 * — 132% of the viewport, which is the exact regression the phone
 * arrangement was built to end. Two columns did not save it either: at 152px
 * a column every title and description wraps, and the block still came to
 * 363px. On phones the same four render as `HeroPointsBand` immediately
 * below the card, where there is no height budget to blow. Measure at 360
 * before moving them back in.
 *
 * FOUR ACROSS ONLY FROM `xl`, TWO BEFORE IT. The reference puts all four on
 * one row and that is right where there is width for it: at 1440 each column
 * holds 276px of text and every description sits on two lines. At 1024 the
 * same four columns are 236px with 64px of divider padding inside them,
 * leaving 172px — which wraps "Individualised Assessment" onto two lines and
 * its description onto four, and the row reads as a cramped mistake. Two
 * columns at that width give each point 472px and one line apiece.
 *
 * THE VERTICAL DIVIDERS ARE `xl` ONLY for the same reason they are absent
 * from the phone band: `border-s` on every item but the first is correct
 * across one row of four, but at two columns it also lands on the third
 * item, which starts row two, drawing a rule down the left edge of the row.
 */
function HeroPoints({ points }: { points: TrustPoint[] }) {
  if (points.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-x-10 gap-y-6 border-t border-white/15 pt-7 xl:grid-cols-4 xl:gap-x-0">
      {points.map((point, index) => (
        <li
          key={point.title}
          className={[
            index > 0 ? "xl:border-s xl:border-white/15 xl:ps-8" : "",
            index < points.length - 1 ? "xl:pe-8" : "",
          ].join(" ")}
        >
          <p className="text-base font-bold leading-snug text-white">
            {point.title}
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-brand-teal-100">
            {point.description}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function Hero({
  content,
  storyCount = 0,
}: {
  content: HeroContent;
  /**
   * How many patient-story videos exist, for the trust badge.
   *
   * ⚠️  THE ACCREDITATION ROW AND THE GOOGLE RATING ARE BOTH GONE from this
   * hero, on request — the `trust` and `faces` props with them. The three
   * accreditations are still published, in "Where your care takes place"
   * further down the page, where they sit beside the institutions' actual
   * logos instead of as a row of 12px labels. The rating is not published
   * anywhere now; see `PatientStoriesBadge` for why it was not worth
   * keeping.
   */
  storyCount?: number;
}) {
  /**
   * FULL BLEED ON PHONES. The card used to sit in a 16px frame on all four
   * sides, which on a 390px screen spends 32px of an already narrow column on
   * margin and makes the hero read as a widget on a page rather than as the
   * top of the page. Edge to edge, with only the bottom corners rounded, is
   * the phone convention and what the reference does.
   *
   * The bottom padding stays: that is the gap before the chips, not a frame.
   * From `lg` the full inset frame returns, top included.
   *
   * ⚠️  THE TOP INSET AND THE HEADER'S RESTING POSITION ARE A PAIR. The
   * header is fixed and transparent until you scroll, so it only reads over
   * the dark card — park it over the warm strip above the card and the white
   * wordmark and white nav disappear into it. `StickyHeaderShell` drops the
   * bar by this same `--gutter` at rest for that reason. Change one and the
   * other has to move with it.
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
      {/* Bottom corners only on a phone, where the card meets the top of the
          window and a rounded corner there would show the page through the
          gap. From `lg` the card is inset on all four sides, so it is
          rounded on all four. */}
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

        {/* NO HEADER IN HERE ANY MORE. It is fixed to the viewport from the
            site layout, so it survives the scroll instead of leaving with
            the hero — and it cannot live in this card regardless, which is
            `overflow-hidden` and would pin it inside the card rather than
            the window. The `pt-24` below is what keeps the headline clear
            of it. */}

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

            {/**
             * BOTH LABELS COME FROM THE CONTENT RECORD, not from here. The
             * supplied home-page copy names the two actions — "Request a
             * Consultation" and "Understand Our Approach" — and a label typed
             * into JSX is the thing `src/data/home.ts` exists to prevent.
             *
             * STILL ONE BUTTON, THOUGH. The note at the top of this file is
             * about weight rather than count: two accent buttons side by side
             * read as a menu and split the decision at the one moment the
             * page has the reader's full attention. The secondary action is
             * therefore a link — present, keyboard-reachable, 44px tall, and
             * unmistakably the quieter of the two.
             */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Button
                href={content.primaryCta.href}
                variant="accent"
                size="lg"
                icon="calendar"
                iconPosition="start"
                className="w-full rounded-(--radius-pill) sm:w-fit"
              >
                {content.primaryCta.label}
              </Button>

              <Link
                href={content.secondaryCta.href}
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {content.secondaryCta.label}
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* ── Inside the card, phones ───────────────────────────────
              These were below the card, which left a dead band of video
              between the header and the headline — the copy is anchored to
              the floor, so whatever the card's minimum height does not use
              shows up as emptiness at the top. Bringing them inside fills it
              without making the card any taller, because the minimum height
              was the binding constraint, not the content. */}
          {/* ⚠️  NO TRUST POINTS IN HERE. They are `HeroPointsBand`, below
              the card, because inside it they take the hero to 132% of a
              360x800 screen. See the note on `HeroPoints` above. */}
          <div className="mt-8 lg:hidden">
            <PatientStoriesBadge count={storyCount} href="#stories" />
          </div>

          {/* ── Inside the card, from `lg` up ─────────────────────────
              The badge on its own line, then the ruled row of trust points
              across the floor of the card, which is the arrangement of the
              supplied reference. The badge promotes the organisation, never
              one doctor. */}
          <div className="hidden lg:block">
            <div className="mt-12 flex justify-end">
              <PatientStoriesBadge count={storyCount} href="#stories" />
            </div>

            <div className="mt-9">
              <HeroPoints points={content.points} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
