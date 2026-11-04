import type { Breadcrumb } from '@/types'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'

/**
 * The page around an AOHC dosing calculator, in the order the
 * fenbendazole page settled on with AOHC: hero → meta chips and Key
 * Takeaways → the calculator → Critical Safety Notice → references →
 * medical disclaimer.
 *
 * ⚠️  KEY TAKEAWAYS IS WHERE THE WARNING SITS ABOVE THE CALCULATOR. The full
 * notice is below it, on AOHC's request, so the takeaways must keep saying
 * the dangerous part before the first input. Do not drop `takeaways`.
 */

export type ToolReference = { label: string; text: string; source?: string }

export function ToolPage({
  trail,
  schema,
  hero,
  chips,
  takeaways,
  calculator,
  safety,
  references,
}: {
  trail: Breadcrumb[]
  schema: Record<string, unknown>
  hero: { title: string; body: string[] }
  chips: { icon: 'target' | 'clock' | 'book-open' | 'activity'; label: React.ReactNode }[]
  takeaways: React.ReactNode
  calculator: React.ReactNode
  safety: { intro: React.ReactNode; items: React.ReactNode[]; closing: string }
  references: { title: string; head: [string, string]; rows: ToolReference[] }
}) {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail), schema]} />

      <PageHero content={hero} trail={trail} />

      <section className="pt-(--spacing-section)">
        <Container>
          <Reveal>
            <ul className="flex flex-wrap gap-2" aria-label="About this tool">
              {chips.map((chip, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-(--radius-pill) bg-primary-subtle px-3.5 py-1.5 text-sm font-semibold text-primary-dark"
                >
                  <Icon name={chip.icon} className="size-4" />
                  {chip.label}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-4 rounded-(--radius-2xl) border border-border-brand bg-surface p-6 shadow-(--shadow-card) sm:gap-5 sm:p-7">
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-dark"
              >
                <Icon name="info" className="size-5" />
              </span>
              <p className="min-w-0 self-center text-base leading-relaxed text-text">{takeaways}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-(--spacing-section)">
        <Container>{calculator}</Container>
      </section>

      <section className="pb-(--spacing-section)">
        <Container>
          <Reveal className="rounded-(--radius-3xl) border-2 border-accent bg-accent-subtle p-6 sm:p-8">
            <div className="flex items-start gap-4 sm:gap-5">
              <span
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-white"
              >
                <Icon name="alert-triangle" className="size-5.5" />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-h4 font-bold leading-snug text-text">
                  Critical Safety Notice
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text">{safety.intro}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {safety.items.map((item, i) => (
                    <li key={i} className="rounded-(--radius-xl) bg-surface/70 p-4 text-sm leading-relaxed text-text">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-base font-bold text-text">{safety.closing}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-4xl">
            <h2 className="font-display text-h3 font-bold leading-snug tracking-[-0.02em] text-text">
              {references.title}
            </h2>
            <div className="mt-8 overflow-hidden rounded-(--radius-2xl) border border-border">
              <table className="w-full text-left text-sm">
                <thead className="hidden bg-surface-subtle sm:table-header-group">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold text-text">{references.head[0]}</th>
                    <th scope="col" className="px-5 py-3 font-semibold text-text">{references.head[1]}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {references.rows.map((r) => (
                    <tr key={r.label} className="block sm:table-row">
                      <th
                        scope="row"
                        className="block px-5 pt-4 font-semibold text-text sm:table-cell sm:w-1/3 sm:py-4 sm:align-top"
                      >
                        {r.label}
                      </th>
                      <td className="block px-5 pb-4 pt-1 leading-relaxed text-neutral-700 sm:table-cell sm:py-4">
                        {r.text}
                        {r.source ? <span className="mt-1 block text-xs text-text-subtle">{r.source}</span> : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-(--spacing-section)">
        <Container>
          <Reveal className="border-t border-border pt-8">
            <h2 className="text-base font-bold text-text">Medical Disclaimer</h2>
            <div className="mt-3 max-w-4xl space-y-3">
              <p className="text-sm leading-relaxed text-text-muted">{MEDICAL_DISCLAIMER}</p>
              <p className="text-sm leading-relaxed text-text-muted">{EMERGENCY_NOTICE}</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
