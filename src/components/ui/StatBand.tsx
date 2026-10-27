import type { StatItem } from '@/types'
import { Container } from '@/components/ui/Container'

/**
 * Headline figures.
 *
 * ⚠️  THIS COMPONENT RENDERS NOTHING UNTIL EVERY FIGURE HAS A CITED SOURCE,
 * and that gate is the point of it.
 *
 * AOHC publishes four outcome percentages — tumour shrinkage, side effects,
 * adherence, two-year disease-free — and not one has a stated basis. They are
 * claims about cancer treatment outcomes, and the organisation's own content
 * draft forbids exactly this: §7 "What We Do Not Promise", and checklist item
 * 30, "Avoid guarantees of cure, survival, response, or treatment success."
 *
 * An earlier build shipped them with an apologetic "source not yet stated"
 * note underneath. That is worse than either option — it publishes the claim
 * AND admits it is unsupported, in front of patients.
 *
 * So: fill `basis` (and optionally `sourceHref`) on all of them and the band
 * appears. Leave any blank and it stays hidden. No flag to flip.
 */
export function StatBand({
  items,
  footnote,
}: {
  items: StatItem[]
  footnote?: string
}) {
  const everyFigureCited = items.length > 0 && items.every((item) => item.basis)
  if (!everyFigureCited) return null

  /**
   * THE LAYOUT IS THE ONE THAT WAS ASKED FOR: a pale teal band, the figures
   * large and centred in the brand teal, the label beneath each in grey. The
   * previous treatment — left-aligned under a 2px accent rule on white — is
   * gone.
   *
   * Two columns on a phone rather than one. Four figures stacked vertically
   * is a very long band for very little information, and these are short
   * enough to sit side by side at 320px.
   *
   * The figures are `text-accent` (#0B8291) rather than the brighter
   * `--color-primary` they appear to be in the reference. #0E9CAF on this
   * background is about 3.1:1, which scrapes past only because the type is
   * large; one step down is 4.5:1 and reads as the same colour.
   */
  return (
    <section className="bg-primary-subtle py-(--spacing-section)">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.label} className="text-center">
              <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.03em] text-accent tabular-nums">
                {item.value}
              </p>
              <p className="mx-auto mt-4 max-w-[22ch] text-sm leading-relaxed text-text-muted sm:text-base">
                {item.label}
              </p>
              {/* The basis is part of the figure, not a footnote to it. */}
              {item.sourceHref ? (
                <a
                  href={item.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-accent-dark underline underline-offset-2"
                >
                  {item.basis}
                </a>
              ) : (
                <p className="mx-auto mt-2 max-w-[26ch] text-sm text-text-subtle">
                  {item.basis}
                </p>
              )}
            </li>
          ))}
        </ul>

        {footnote ? (
          <p className="mx-auto mt-12 max-w-(--measure) border-t border-border-brand pt-5 text-center text-sm text-text-muted">
            {footnote}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
