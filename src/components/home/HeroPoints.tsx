import type { TrustPoint } from '@/types'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The ruled row of four trust points directly beneath the hero card.
 *
 * ⚠️  NOT NUMBERS, AND NOT A STAT BAND. The reference layout this was taken
 * from runs "Based on 1M+ patient outcomes" and "a written opinion in 48
 * hours" across the same four slots, and the brief that supplied this copy
 * said in terms to avoid claims like those "unless AOHC can substantiate
 * those services and figures". Each of these four describes how AOHC works
 * rather than what it has achieved, which is what makes the row safe above
 * the fold. `StatBand` exists for figures and carries a `basis` with each
 * one; this is not that component and must not become it.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * BELOW THE CARD, NOT INSIDE IT. The reference puts its four points inside
 * one dark panel with the headline, which works there because that hero is
 * type and a still image. Ours is a video card that already carries nine
 * cancer-type chips and the patient-stories badge on its floor, and it is
 * capped at `80svh` on phones precisely so the page starts within one
 * screen — four more stacked items inside it would undo that. On the warm
 * page colour immediately under the card the row keeps the reference's
 * structure, reads as the first thing after the hero rather than as more
 * hero furniture, and costs the card nothing.
 *
 * THE DIVIDERS ARE `lg` ONLY. `border-s` on every item but the first draws
 * the vertical rules between four columns correctly — but at `sm` the grid
 * is two columns and the same rule lands on the third item, which starts
 * row two, putting a divider down the left edge of the row. Below `lg` the
 * gap does the separating instead.
 */
export function HeroPoints({ points }: { points: TrustPoint[] }) {
  if (points.length === 0) return null

  /* The hero section already pays `--gutter` of bottom padding (16px on
     phones, 40px from `lg`), so the padding below only tops it up: 48px of
     air above the rule on a phone, 64px on desktop. At the first attempt's
     `pt-12` the band above the hairline was 88px and read as a gap rather
     than as space. */
  return (
    <section className="bg-background pt-8 lg:pt-6">
      <Container>
        <ul className="grid gap-x-10 gap-y-8 border-t border-border pt-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
          {points.map((point, index) => (
            <Reveal
              as="li"
              key={point.title}
              direction="up"
              delay={index * 70}
              className={[
                index > 0 ? 'lg:border-s lg:border-border lg:ps-8' : '',
                index < points.length - 1 ? 'lg:pe-8' : '',
              ].join(' ')}
            >
              {/* `h2`, not a styled paragraph: these are the first headings
                  on the page after the hero's `h1`, and a screen reader's
                  heading list is how someone skips the video card. */}
              <h2 className="text-base font-bold leading-snug text-text">
                {point.title}
              </h2>

              <p className="mt-2.5 text-sm leading-relaxed text-neutral-700">
                {point.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
