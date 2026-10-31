import Image from 'next/image'
import type { NetworkPartner } from '@/types'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The care network, as a wall of logos — the organisations AOHC actually
 * works with.
 *
 * ⚠️  EVERY MARK HERE IS A PUBLIC CLAIM THAT TWO ORGANISATIONS WORK
 * TOGETHER. They were supplied by AOHC and are reproduced exactly as given:
 * a third party's trademark is the one asset on this site that must never
 * be recoloured, redrawn or regenerated, and nothing may be added that AOHC
 * has not confirmed a relationship with. See `NetworkPartner` in
 * `src/types/content.ts`.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THIS IS A DIFFERENT LIST FROM `InstitutionGrid`'S, AND THE DIFFERENCE
 * MATTERS. That component shows `home.partners.items` — three entries that
 * are AFFILIATIONS AND ACCREDITATIONS, each carrying a stated relationship
 * and a location. This one shows `home.network.items`: the ten
 * organisations in AOHC's care network, which is what they mean by
 * partnering institutions. The two overlap (CK Birla and RGCC are in both)
 * and are not the same list; do not merge them.
 *
 * A SEPARATE COMPONENT RATHER THAN A PROP ON THE OTHER ONE, because the
 * content shape is genuinely different. `NetworkPartner` carries a name and
 * a logo and nothing else — no relationship, no location — so the card has
 * nothing to put under the name, and ten logo-only cells want a different
 * column count from three cells with three lines of text each.
 *
 * ⚠️  TWO COLUMNS THEN FIVE, WITH NOTHING IN BETWEEN. There are ten
 * partners, so the only column counts that fill every row are 1, 2, 5 and
 * 10. Three columns — the obvious middle step — leaves a single card
 * stranded on a fourth row, and five columns at tablet width squeezes each
 * logo into about 140px. Skipping straight from two to five is what keeps
 * every row complete at every width.
 *
 * ⚠️  THE NAME IS PRINTED, UNLIKE THE HOME PAGE'S MARQUEE. There the logos
 * move and the alt text carries the name; here the reader has come to a
 * page to find out who AOHC works with, and several of these marks are not
 * legible as words — a stylised monogram tells you nothing if you do not
 * already know the organisation.
 */
export function PartnerLogoGrid({
  items,
  className,
}: {
  items: NetworkPartner[]
  className?: string
}) {
  return (
    <ul className={`grid grid-cols-2 gap-4 lg:grid-cols-5 ${className ?? ''}`}>
      {items.map((partner, index) => (
        <Reveal
          as="li"
          key={partner.name}
          direction="up"
          /* Across the row rather than down the column: the stagger should
             read the way the grid does. */
          delay={(index % 5) * 50}
          className="flex"
        >
          {/* ⚠️  NO BRAND-TEAL BORDER ON HOVER. The card hover used
              elsewhere on the site turns the border `border-border-brand`,
              which on a card whose entire content is somebody else's logo
              reads as a selection outline drawn around their mark rather
              than as a hover. It darkens to the neutral `border-border-strong`
              instead; the lift and the shadow carry the state. */}
          <article className="flex w-full flex-col items-center gap-4 rounded-(--radius-2xl) border border-border bg-surface p-5 text-center shadow-(--shadow-xs) transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-(--shadow-card-hover)">
            <span className="flex h-16 w-full items-center justify-center sm:h-20">
              {/* ⚠️  `max-w-full` AS WELL AS `max-h-full`. These marks were
                  trimmed to their own ink, so the aspect ratios run from
                  5.9:1 (Medharbour) to 0.7:1 (Living Light). Constrained
                  on one axis only, a wide wordmark overflows the cell it
                  is centred in. */}
              <Image
                src={partner.logo.src}
                alt=""
                aria-hidden
                width={partner.logo.width}
                height={partner.logo.height}
                sizes="220px"
                className="max-h-full max-w-full object-contain"
              />
            </span>

            <h3 className="text-sm font-bold leading-snug text-text">
              {partner.name}
            </h3>
          </article>
        </Reveal>
      ))}
    </ul>
  )
}
