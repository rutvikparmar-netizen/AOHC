import type { TrustPoint } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The hero's four trust points, below the card — the phone arrangement.
 *
 * ⚠️  THE SAME FOUR POINTS AS `HeroPoints` INSIDE THE CARD, IN TWO PLACES,
 * ONE OF WHICH IS ALWAYS HIDDEN. This band is `lg:hidden` and the in-card
 * row is `hidden lg:block`, so only ever one is in the layout — and
 * `display: none` takes the other out of the accessibility tree too, so
 * nothing is announced twice. It is the same split the hero already uses
 * for the patient-stories badge.
 *
 * ⚠️  WHY THEY ARE NOT IN THE CARD ON PHONES, SINCE THAT IS WHERE THEY WERE
 * ASKED FOR: measured, the four inside the card take the hero to 1060px on a
 * 360x800 screen, which is 132% of the viewport. The phone composition
 * exists precisely to keep the hero inside one screen — it was rebuilt once
 * already from 1163px — so putting them back in undoes it. Two columns did
 * not rescue it: at 152px a column every title and description wraps and the
 * block still measured 363px. Below the card there is no height budget to
 * blow, the rule and the four points read in the same order, and the card is
 * untouched.
 *
 * ONE COLUMN BELOW `sm`, TWO ABOVE IT. Two columns at 360px give each point
 * 152px, which wraps "Individualised Assessment" onto two lines and its
 * description onto four. Stacked, each point is a heading and one line.
 *
 * ⚠️  NO FIGURES — see `TrustPoint` in `src/types/content.ts`. The reference
 * layout leads on "1M+ patient outcomes" and a 48-hour turnaround, and the
 * brief that supplied this copy warned off both by name.
 */
export function HeroPointsBand({ points }: { points: TrustPoint[] }) {
  if (points.length === 0) return null

  /* The hero section already pays `--gutter` of bottom padding (16px on
     phones), so this only tops it up to 48px of air above the rule. */
  return (
    <section className="bg-background pt-8 lg:hidden">
      <Container>
        <ul className="grid gap-x-10 gap-y-7 border-t border-border pt-8 sm:grid-cols-2">
          {points.map((point, index) => (
            <Reveal as="li" key={point.title} direction="up" delay={index * 70}>
              {/* `h2`, not a styled paragraph: these are the first headings
                  after the hero's `h1`, and a screen reader's heading list
                  is how someone skips past the video card. */}
              <h2 className="text-base font-bold leading-snug text-text">
                {point.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                {point.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
