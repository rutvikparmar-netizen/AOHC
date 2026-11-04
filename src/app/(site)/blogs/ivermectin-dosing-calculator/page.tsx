import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { absoluteUrl, site } from '@/lib/site'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ToolPage } from '@/components/tools/ToolPage'
import { IvermectinCalculator } from '@/components/tools/IvermectinCalculator'

/**
 * IVERMECTIN DOSING CALCULATOR — `/blogs/ivermectin-dosing-calculator`
 *
 * Migrated from the WordPress page at the same URL, one of the three
 * listed under `/blogs/category/dosing-calculator`. Every line of copy is
 * the live page's; the formula is in `IvermectinCalculator.tsx`.
 *
 * ⚠️  THE "[web:7]" AND "[web:8]" TOKENS IN THE REFERENCES ARE GONE. They
 * are citation stubs left by an AI search tool and point at nothing. The
 * second source names a real paper — Tang et al. 2020, PMC7505114 — and now
 * gives its PMC address in full. The first ("Healthline 2025") names no
 * article and is kept as written.
 *
 * ⚠️  THE LIVE PAGE'S ARTICLE SCHEMA POINTED AT example.org, as the
 * fenbendazole page's did. Replaced with the real URL.
 */

const PATH = routes.ivermectinCalculator

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: 'Dosing Calculator', href: routes.dosingCalculators },
  { label: 'Ivermectin Dosing Calculator' },
]

export const metadata: Metadata = buildMetadata({
  title: 'AOHC Ivermectin Calculator for Cancer & Non-Cancer | AOHC',
  description:
    'Tablet-dose ivermectin calculator. Presets only: Cancer (investigational): 0.4 mg/kg; Non-cancer (antiparasitic): 0.2 mg/kg. Strictly educational, not medical advice.',
  canonicalPath: PATH,
  absoluteTitle: true,
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AOHC Ivermectin Calculator for Cancer & Non-Cancer',
  datePublished: '2025-08-29',
  dateModified: '2025-08-29',
  author: { '@type': 'Organization', name: site.name },
  publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl('/aohc-logo.png') } },
  articleSection: ['Tools', 'Education'],
  description:
    'Tablet-only ivermectin calculator. Cancer = 0.4mg/kg (investigational), Non-cancer = 0.2mg/kg (approved standard). Computes tablet options. Not medical advice.',
  mainEntityOfPage: absoluteUrl(PATH),
  isAccessibleForFree: true,
}

export default function IvermectinCalculatorPage() {
  return (
    <ToolPage
      trail={trail}
      schema={schema}
      hero={{
        title: 'AOHC Ivermectin Calculator for Cancer & Non-Cancer',
        body: [
          'Tablet-dose calculator. Presets only: Cancer (investigational): 0.4 mg/kg; Non-cancer (antiparasitic): 0.2 mg/kg.',
          'Strictly educational — never use without direct clinical guidance.',
        ],
      }}
      chips={[
        { icon: 'target', label: 'AOHC Tools' },
        { icon: 'clock', label: <>Updated: <time dateTime="2025-08-29">29 Aug 2025</time></> },
        { icon: 'book-open', label: '≈ 2 min' },
      ]}
      takeaways={
        <>
          <strong>Key Takeaways:</strong> Only preset dosing for cancer (0.4 mg/kg) and parasitic (0.2
          mg/kg); both must be confirmed by a medical professional. Cancer dosing is investigational — never
          self-administer.
        </>
      }
      calculator={<IvermectinCalculator />}
      safety={{
        intro: (
          <>
            <strong>This tool is strictly educational.</strong> It does not provide medical or dosing advice.
          </>
        ),
        items: [
          'Non-cancer use is FDA-approved only for certain parasites at 0.2 mg/kg (single dose).',
          'Cancer dosing (0.4 mg/kg) is investigational and never standard — only under a clinical trial or strict oncologist direction.',
        ],
        closing: 'Never self-administer ivermectin for cancer. Seek specialist care.',
      }}
      references={{
        title: 'References & Further Reading',
        head: ['Type', 'Title / Source'],
        rows: [
          {
            label: 'Clinical Standard (non-cancer)',
            text: 'Ivermectin usual dose: 0.2 mg/kg, single oral dose',
            source: 'Healthline 2025',
          },
          {
            label: 'Investigational (cancer)',
            text: 'Suggested research dose: 0.4 mg/kg, investigational/preclinical human range 0.2–2.0 mg/kg',
            source: 'Tang et al., 2020 — PMC7505114 (pmc.ncbi.nlm.nih.gov/articles/PMC7505114)',
          },
        ],
      }}
    />
  )
}
