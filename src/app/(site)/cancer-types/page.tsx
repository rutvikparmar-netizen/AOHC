import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { cancerTypes } from '@/data/cancer-types'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER } from '@/lib/site'
import { Button } from '@/components/ui/Button'
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
      <EntryGrid
        eyebrow={cancerTypes.index.eyebrow}
        title={cancerTypes.index.title}
        entries={cancerTypes.index.types}
        surface
      />

      {/* ── 2. What information helps ────────────────────────────────
          A `ListSection`, so it renders through the home page's component.
          Its `warning` — do not send sensitive medical information through
          an unsecured channel — is the only sentence on this page that
          asks the reader to do something differently. */}
      <ChecklistSection content={cancerTypes.documents} />

      {/* ── 3. Closing ───────────────────────────────────────────────
          ⚠️  THINNER THAN THE HOME AND ABOUT CLOSINGS, like the
          integrative-care page's, and for the same reason: `ClosingPanel`
          requires lead paragraphs, a second action and a disclaimer under
          the buttons, and the supplied copy here is a heading and one
          button. Send copy for the rest and this becomes a `ClosingPanel`
          like the others. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-h2 font-bold tracking-[-0.02em] text-text">
              {closing.title}
            </h2>

            <Button
              href={closing.cta.href}
              icon="arrow-right"
              className="mt-8 rounded-(--radius-pill)"
            >
              {closing.cta.label}
            </Button>
          </Reveal>
        </Container>
      </section>

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
