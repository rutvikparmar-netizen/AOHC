import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { cancerTypes } from '@/data/cancer-types'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER } from '@/lib/site'
import { ClosingSection } from '@/components/home/ClosingSection'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { EntryGrid } from '@/components/shared/EntryGrid'
import { ChecklistSection } from '@/components/home/ChecklistSection'

/**
 * CANCER TYPES — `/cancer-types`
 *
 * ORDER, which is the supplied document's own: hero → the ten types → what
 * information helps → closing → disclaimer.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THIS PAGE DESCRIBES WHAT A REVIEW CONSIDERS. IT DOES NOT OFFER
 * TREATMENT FOR ANYTHING IT NAMES. Every entry reads "a review may
 * consider…" rather than "we treat…", none of them links anywhere, and the
 * draft is explicit that a cancer type becomes a clinical service page
 * "only after confirming that the team accepts and assesses that cancer
 * type". Two sentences of the supplied document are deliberately not
 * rendered because they are instructions to AOHC rather than copy for a
 * patient — both are quoted in full at the top of `src/data/cancer-types.ts`.
 *
 * ⚠️  THE DISCLAIMER IS NOT OPTIONAL. The hero already says the page is
 * educational and not a substitute for an individual medical assessment;
 * the foot carries the shared notice as well, because `lib/site.ts` says it
 * "must never be quietly dropped from a page that needs it" and a page of
 * per-diagnosis clinical description is squarely one of those. The
 * emergency notice goes with it — it is never shown on its own.
 *
 * IT OPENS ON `PageHero`, dark, because the layout's overlay header
 * disappears on the warm page colour. See the note on that component.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Cancer Types' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Cancer Types',
  description:
    'The cancer types AOHC may be asked to review, what a clinical review of each may consider, and the medical information that helps in understanding a case.',
  canonicalPath: routes.cancerTypes,
})

export default function CancerTypesPage() {
  const { closing } = cancerTypes

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={cancerTypes.hero} trail={trail} />

      {/* ── 1. The ten types ────────────────────────────────────────
          Through the shared grid, which `/treatments-and-therapies` also
          uses for its six conventional treatments. */}
      {/* ⚠️  BOXED: ONE CARD PER TYPE, DESCRIPTION INCLUDED. A previous
          version split this into a compact "Learn more" index above the
          same ten entries written out in full, which put every name and
          every box on the page twice. One rendering per entry.

          On the warm page colour rather than white: the cards are
          `bg-surface` themselves, and on a white section only their
          borders would hold them together. The ruled variant on
          `/treatments-and-therapies` keeps its white section, which is
          why `surface` and `boxed` are separate props. */}
      <EntryGrid
        eyebrow={cancerTypes.index.eyebrow}
        title={cancerTypes.index.title}
        entries={cancerTypes.index.types}
        boxed
      />

      {/* ── 2. What information helps ────────────────────────────────
          A `ListSection`, so it renders through the home page's component.
          Its `warning` — do not send sensitive medical information through
          an unsecured channel — is the only sentence on this page that
          asks the reader to do something differently. */}
      <ChecklistSection content={cancerTypes.documents} />

      {/* ── Closing ─────────────────────────────────────────────────
          The shared panel, same as every other page. Only a heading and
          one action are supplied for this one; the lead paragraphs, the
          second action and the note under the buttons render when AOHC
          sends copy for them. */}
      <ClosingSection
        content={{ title: closing.title, primaryCta: closing.cta }}
      />

      {/* ── Medical disclaimer ────────────────────────────────────────
          ⚠️  LAST, AND NOT OPTIONAL. Quiet by design — it is a legal notice
          rather than something to sell — but it must not be dropped or
          shortened to tidy the foot of the page. Both strings come from
          `lib/site.ts` so they stay identical everywhere they appear. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal className="border-t border-border pt-8">
            <h2 className="text-base font-bold text-text">Medical Disclaimer</h2>
            <div className="mt-3 max-w-4xl space-y-3">
              <p className="text-sm leading-relaxed text-text-muted">
                {MEDICAL_DISCLAIMER}
              </p>
              <p className="text-sm leading-relaxed text-text-muted">
                {EMERGENCY_NOTICE}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
