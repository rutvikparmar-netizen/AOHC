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

  return (
    <section className="border-y border-border bg-surface py-(--spacing-section)">
      <Container>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.label} className="border-t-2 border-accent pt-5">
              <p className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.03em] text-text tabular-nums">
                {item.value}
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-700">
                {item.label}
              </p>
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
                <p className="mt-2 text-sm text-text-muted">{item.basis}</p>
              )}
            </li>
          ))}
        </ul>

        {footnote ? (
          <p className="mt-10 max-w-(--measure) border-t border-border pt-5 text-sm text-text-muted">
            {footnote}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
