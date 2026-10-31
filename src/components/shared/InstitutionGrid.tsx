import Image from 'next/image'
import type { PartnerInstitution } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'

/**
 * A grid of the hospitals, laboratories and accredited networks AOHC works
 * with.
 *
 * ⚠️  EVERY CARD HERE IS A PUBLIC CLAIM THAT TWO ORGANISATIONS WORK
 * TOGETHER, and the wording of that claim is in the data, not here. §7 of
 * the content draft is explicit: "a referral relationship must not be
 * described as a formal partnership unless that relationship exists". Each
 * entry states the nature of the relationship — "Clinical affiliation",
 * "Accredited diagnostics partner", "Accredited partner network" — and none
 * of those is a synonym for the others. Do not flatten them to "Partner" to
 * make the cards match.
 *
 * ⚠️  THE LOGOS ARE THIRD-PARTY TRADEMARKS, supplied by AOHC and reproduced
 * as given. They must not be recoloured, redrawn or regenerated: a logo is
 * the one asset on this site that cannot be approximated.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * SHARED BY THE HOME PAGE AND `/about-us/partnering-institutions`, which is
 * why it is a component rather than markup in either. The two show the same
 * organisations and the card had already accumulated enough hard-won detail
 * — the plate height, the two-axis cap — that a second copy would have
 * drifted from this one within a change or two.
 *
 * ⚠️  THE MARK SITS ON A WHITE PLATE, CAPPED ON BOTH AXES, AND THE PLATE IS
 * TALLER THAN IT LOOKS IT NEEDS TO BE. Height alone was the only limit
 * once, which is the right rule for two long wordmarks and the wrong one
 * the moment a round seal arrives: at the old 56px of plate, CK Birla
 * rendered 153x56 and the NABH roundel 58x56 — a third of the area, with
 * ring type far too small to read, even though 366px of plate width was
 * going spare. Raising the plate lets a compact mark earn its height, and
 * the width cap stops the wordmarks ballooning to match. Measured after:
 * 192x70, 136x88, 91x88.
 *
 * White, not the page tint, because these logos are supplied flat on white
 * and would otherwise sit in a coloured box that is not theirs.
 * `object-contain` so no third party's logo is ever cropped or stretched.
 */
export function InstitutionGrid({
  items,
  className,
}: {
  items: PartnerInstitution[]
  className?: string
}) {
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className ?? ''}`}>
      {items.map((partner, index) => (
        <Reveal as="li" key={partner.name} direction="up" delay={index * 60}>
          <article className="flex h-full flex-col gap-3 rounded-(--radius-2xl) border border-border bg-background p-6">
            <div className="flex h-28 items-center justify-center rounded-(--radius-lg) bg-white p-3">
              {partner.logo ? (
                <Image
                  src={partner.logo.src}
                  alt={partner.logo.alt}
                  width={partner.logo.width}
                  height={partner.logo.height}
                  sizes="192px"
                  className="max-h-full max-w-48 object-contain"
                />
              ) : (
                /* A name where no mark has been supplied — the two are
                   interchangeable here, and a half-supplied set reads as a
                   deliberate mix rather than as a row of broken images. */
                <span className="font-display text-base font-bold text-text-muted">
                  {partner.name}
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-text">{partner.name}</h3>

            {partner.relationship ? (
              <p className="text-sm font-medium text-primary-dark">
                {partner.relationship}
              </p>
            ) : null}

            {partner.location ? (
              <p className="inline-flex items-center gap-1.5 text-sm text-text-muted">
                <Icon name="map-pin" className="size-4" />
                {partner.location}
              </p>
            ) : null}
          </article>
        </Reveal>
      ))}
    </ul>
  )
}
