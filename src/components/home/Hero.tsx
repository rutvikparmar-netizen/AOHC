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
 */
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
  return (
    <section className="bg-background p-(--gutter)">
      <div className="relative isolate flex min-h-[680px] flex-col overflow-hidden rounded-(--radius-3xl) bg-brand-teal-950 lg:min-h-[860px]">
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

        <Container className="flex flex-1 flex-col justify-center pb-10 pt-28 lg:pb-12 lg:pt-32">
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="max-w-[13ch] text-[clamp(2.1rem,4.2vw,3.5rem)] font-bold uppercase leading-[1.04] tracking-[-0.01em] text-white">
              {content.title}
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
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

          {/* Frosted chips and the Google rating badge share one row, the
              badge aligned to the chips' last line. The badge promotes the
              organisation, never one doctor, and renders nothing until a
              real rating is configured — see `RatingBadge`.

              The reference highlights its first chip because it is a
              selected tab; these are links to nine different diagnoses, so
              the lead chip is styled solid as an entry point rather than
              marked `aria-current`, which would claim a state that is false. */}
          <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
            {cancerTypes.length > 0 ? (
              <nav aria-label="Cancer types">
                <ul className="flex max-w-2xl flex-wrap gap-2">
                  {cancerTypes.map((type, index) => (
                    <li key={type.slug}>
                      <Link
                        href={routes.cancerType(type.slug)}
                        className={
                          index === 0
                            ? "inline-flex min-h-11 items-center rounded-(--radius-pill) bg-white px-5 text-sm font-semibold text-brand-teal-900 transition-colors hover:bg-brand-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            : "inline-flex min-h-11 items-center rounded-(--radius-pill) border border-white/15 bg-brand-teal-950/40 px-5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white hover:text-brand-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        }
                      >
                        {type.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <div className="lg:shrink-0">
              <RatingBadge faces={faces} storiesHref="#stories" />
            </div>
          </div>

          {/**
           * TRUST BAR.
           *
           * Accreditations and affiliations only — things a third party
           * conferred and that can be checked. No ratings, no patient counts,
           * no years-in-operation, because AOHC publishes none of those and a
           * number invented for this row would be the single least defensible
           * thing on the page. See the note on `heroTrust` in
           * `src/data/home.ts` for what was asked for and left out.
           */}
          {trust.length > 0 ? (
            <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-6">
              {trust.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 text-xs font-semibold text-brand-teal-100"
                >
                  <Icon
                    name={item.icon as IconName}
                    className="size-4 shrink-0 text-brand-teal-300"
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
          ) : null}
        </Container>
      </div>
    </section>
  );
}
