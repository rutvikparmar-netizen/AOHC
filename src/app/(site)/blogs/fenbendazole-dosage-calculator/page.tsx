import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER, absoluteUrl, site } from '@/lib/site'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { FenbendazoleCalculator } from '@/components/tools/FenbendazoleCalculator'

/**
 * FENBENDAZOLE DOSAGE CALCULATOR — `/blogs/fenbendazole-dosage-calculator`
 *
 * Kept at the WordPress URL so the indexed page survives the migration,
 * and linked from the footer's Tools column.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  BUILT ON AOHC'S EXPLICIT, REPEATED INSTRUCTION. It was declined once
 * during the migration, because it turns a reader into a dose of a drug
 * its own page says is not approved for humans, at up to 2,000 mg a day,
 * from protocols sourced to patient anecdote. AOHC asked again and
 * supplied the source, so it is here. The formula is theirs, unchanged —
 * see `FenbendazoleCalculator.tsx`.
 *
 * ⚠️  THE FULL SAFETY NOTICE IS BELOW THE CALCULATOR, ON AOHC'S REQUEST.
 * It was first placed above, on the reasoning that someone using a dose
 * calculator reads the result and stops. AOHC asked for it below, with
 * the live page's meta chips and Key Takeaways above instead. Key
 * Takeaways repeats the essentials — not FDA-approved, liver toxicity,
 * rapid progression — so a reader still meets them before the first
 * input. Every line of the notice is word for word.
 *
 * ⚠️  THE REFERENCES ARE UNVERIFIED, AND THE "[web:33]" TOKENS ARE GONE.
 * The live table cites "[PMC Case Series 2025, Fenbendazole.org 2025]
 * [web:33][web:36]", "[HealNavigator Clinical Experience 2025][web:12]"
 * and "[Cancer Choices Safety Review 2025][web:21]". The `[web:NN]`
 * markers are citation stubs left behind by an AI search tool — they
 * point at nothing, and are removed. The source names are kept as
 * written, but none links anywhere and none was found: there is no
 * identifiable "PMC Case Series 2025". "Complete remissions reported" is
 * a remission claim resting on sources nobody can open. A clinician
 * should either attach real citations or remove the column.
 *
 * ⚠️  THE ORIGINAL'S SEO BLOCK POINTED AT example.org. Its canonical, OG
 * URL and image were all `https://example.org/...` — template
 * placeholders that would have told Google this page lives somewhere
 * else. The title and description are AOHC's; every URL is the real one.
 */

const PATH = routes.fenbendazoleCalculator

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: 'Dosing Calculator', href: routes.dosingCalculators },
  { label: 'Fenbendazole Dosage Calculator' },
]

export const metadata: Metadata = buildMetadata({
  title: 'AOHC Fenbendazole Calculator for Cancer & Non-Cancer | AOHC',
  description:
    'AOHC Fenbendazole calculator: Tablet-only dose estimator for cancer & non-cancer use. Protocols: 222mg-2000mg daily. Educational only, not medical advice.',
  canonicalPath: PATH,
  absoluteTitle: true,
})

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AOHC Fenbendazole Calculator for Cancer & Non-Cancer',
  datePublished: '2025-08-29',
  dateModified: '2025-08-29',
  author: { '@type': 'Organization', name: site.name },
  publisher: {
    '@type': 'Organization',
    name: site.name,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/aohc-logo.png') },
  },
  description:
    'Tablet-only fenbendazole calculator. Cancer protocols: 222mg-2000mg daily based on patient experiences. Not medical advice.',
  mainEntityOfPage: absoluteUrl(PATH),
}

const references = [
  {
    protocol: 'Joe Tippens Basic',
    dosage: '222 mg daily, 3 days on/4 days off. Complete remissions reported.',
    source: 'PMC Case Series 2025, Fenbendazole.org 2025',
  },
  {
    protocol: 'Joe Tippens Modified',
    dosage: '222 mg daily continuous. No breaks.',
    source: 'Fenbendazole.org Protocol Guide',
  },
  {
    protocol: 'High-Dose Protocols',
    dosage: '444mg-2000mg daily reported by cancer patients',
    source: 'HealNavigator Clinical Experience 2025',
  },
  {
    protocol: 'Safety Data',
    dosage: 'Albendazole (similar drug): max tolerated 2400mg daily',
    source: 'Cancer Choices Safety Review 2025',
  },
]

export default function FenbendazoleCalculatorPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail), articleSchema]} />

      <PageHero
        content={{
          title: 'AOHC Fenbendazole Calculator for Cancer & Non-Cancer',
          body: [
            'Tablet-dose calculator based on real patient experiences. Cancer protocols: 222mg–2000mg daily; Non-cancer: 500–700mg daily.',
            'Strictly educational — requires medical supervision and liver monitoring.',
          ],
        }}
        trail={trail}
      />

      {/* ── 1. Meta and key takeaways ─────────────────────────────────
          From the live page's header. The title and description it also
          carried are already the hero above, word for word, so they are
          not repeated here.

          ⚠️  KEY TAKEAWAYS NOW CARRIES THE WARNING ABOVE THE CALCULATOR.
          The full safety notice moved below the calculator on AOHC's
          request; this callout still states, before any input, that the
          drug is not FDA-approved and that liver toxicity and rapid
          progression are risks. Do not remove it without moving the
          notice back up. */}
      <section className="pt-(--spacing-section)">
        <Container>
          <Reveal>
            <ul className="flex flex-wrap gap-2" aria-label="About this tool">
              <li className="inline-flex items-center gap-1.5 rounded-(--radius-pill) bg-primary-subtle px-3.5 py-1.5 text-sm font-semibold text-primary-dark">
                <Icon name="target" className="size-4" />
                AOHC Tools
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-(--radius-pill) bg-primary-subtle px-3.5 py-1.5 text-sm font-semibold text-primary-dark">
                <Icon name="clock" className="size-4" />
                Updated: <time dateTime="2025-08-29">29 Aug 2025</time>
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-(--radius-pill) bg-primary-subtle px-3.5 py-1.5 text-sm font-semibold text-primary-dark">
                <Icon name="book-open" className="size-4" />
                ≈ 3 min
              </li>
            </ul>

            <div className="mt-6 flex items-start gap-4 rounded-(--radius-2xl) border border-border-brand bg-surface p-6 shadow-(--shadow-card) sm:gap-5 sm:p-7">
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-dark"
              >
                <Icon name="info" className="size-5" />
              </span>
              <p className="min-w-0 self-center text-base leading-relaxed text-text">
                <strong>Key Takeaways:</strong> Cancer patients report using
                222mg–2000mg daily with regular liver monitoring. NOT
                FDA-approved for humans. Requires medical supervision due to
                liver toxicity risk and potential for rapid cancer progression
                in some cases.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. The calculator ──────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <FenbendazoleCalculator />
        </Container>
      </section>

      {/* ── 3. Critical safety notice ─────────────────────────────────
          Below the calculator on AOHC's request. See section 1. */}
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
                <p className="mt-3 text-base leading-relaxed text-text">
                  <strong>This tool is strictly educational.</strong> Fenbendazole
                  is NOT FDA-approved for human use.
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ['Cancer protocols', '222mg–2000mg daily based on patient reports. Requires medical supervision.'],
                    ['Serious risks', 'Liver injury, rapid cancer progression in some cases, bone marrow suppression at high doses.'],
                    ['Monitoring required', 'Liver function tests every 2–4 weeks. Stop if ALT/AST elevated.'],
                    ['Drug interactions', 'May interact with certain medications.'],
                  ].map(([k, v]) => (
                    <li
                      key={k}
                      className="rounded-(--radius-xl) bg-surface/70 p-4 text-sm leading-relaxed text-text"
                    >
                      <strong className="block text-text">{k}</strong>
                      {v}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-base font-bold text-text">
                  Never self-administer high-dose fenbendazole. Seek oncologist supervision.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 4. References & patient experiences ───────────────────── */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="max-w-4xl">
            <h2 className="font-display text-h3 font-bold leading-snug tracking-[-0.02em] text-text">
              References &amp; Patient Experiences
            </h2>

            {/* A real table: two columns of related facts per row is
                what tables are for, and it stays readable on a phone
                because each row stacks below `sm`. */}
            <div className="mt-8 overflow-hidden rounded-(--radius-2xl) border border-border">
              <table className="w-full text-left text-sm">
                <thead className="hidden bg-surface-subtle sm:table-header-group">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold text-text">Protocol</th>
                    <th scope="col" className="px-5 py-3 font-semibold text-text">Dosage &amp; source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {references.map((r) => (
                    <tr key={r.protocol} className="block sm:table-row">
                      <th
                        scope="row"
                        className="block px-5 pt-4 font-semibold text-text sm:table-cell sm:w-1/3 sm:py-4 sm:align-top"
                      >
                        {r.protocol}
                      </th>
                      <td className="block px-5 pb-4 pt-1 leading-relaxed text-neutral-700 sm:table-cell sm:py-4">
                        {r.dosage}
                        <span className="mt-1 block text-xs text-text-subtle">{r.source}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 5. Medical disclaimer ──────────────────────────────────── */}
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
