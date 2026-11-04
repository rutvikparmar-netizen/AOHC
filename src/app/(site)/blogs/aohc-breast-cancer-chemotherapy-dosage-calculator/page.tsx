import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { absoluteUrl, site } from '@/lib/site'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { ToolPage } from '@/components/tools/ToolPage'
import { BreastChemoCalculator } from '@/components/tools/BreastChemoCalculator'

/**
 * BREAST CANCER CHEMOTHERAPY DOSAGE CALCULATOR —
 * `/blogs/aohc-breast-cancer-chemotherapy-dosage-calculator`
 *
 * Migrated from the WordPress page at the same URL, one of the three
 * listed under `/blogs/category/dosing-calculator`. The copy is the live
 * page's; the formulas and the drug table are in
 * `BreastChemoCalculator.tsx`, which also explains the one change — the
 * dose-reduction labels, which on the live page said the opposite of what
 * the formula computed.
 *
 * ⚠️  THE LIVE "Important:" BANNER IS THE KEY TAKEAWAYS HERE, so the
 * warning a reader meets before the first input is the page's own.
 */

const PATH = routes.breastChemoCalculator

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Blogs', href: routes.blogs },
  { label: 'Dosing Calculator', href: routes.dosingCalculators },
  { label: 'Breast Cancer Chemotherapy Dosage Calculator' },
]

export const metadata: Metadata = buildMetadata({
  title: 'AOHC Breast Cancer Chemotherapy Dosage Calculator | AOHC',
  description:
    'Comprehensive calculator for all major breast cancer chemotherapy drugs. BSA-based calculations with dose-level options and carboplatin dosing using the Calvert formula. Educational only.',
  canonicalPath: PATH,
  absoluteTitle: true,
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AOHC Breast Cancer Chemotherapy Dosage Calculator',
  datePublished: '2025-08-30',
  dateModified: '2026-06-17',
  author: { '@type': 'Organization', name: site.name },
  publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl('/aohc-logo.png') } },
  mainEntityOfPage: absoluteUrl(PATH),
}

export default function BreastChemoCalculatorPage() {
  return (
    <ToolPage
      trail={trail}
      schema={schema}
      hero={{
        title: 'AOHC Breast Cancer Chemotherapy Dosage Calculator',
        body: [
          'Comprehensive calculator for all major breast cancer chemotherapy drugs. BSA-based calculations at 100%, 75%, 50% or 20% of the standard dose, and precise carboplatin dosing using the Calvert formula.',
        ],
      }}
      chips={[
        { icon: 'target', label: 'AOHC Tools' },
        { icon: 'clock', label: <>Updated: <time dateTime="2025-08-30">30 Aug 2025</time></> },
        { icon: 'activity', label: 'BSA + Calvert Formula' },
      ]}
      takeaways={
        <>
          <strong>Important:</strong> All dosing calculations are for educational purposes only. Always verify
          with current protocols and consult with the oncology team before administration. Dose modifications
          may be needed based on toxicity, organ function, and patient factors.
        </>
      }
      calculator={<BreastChemoCalculator />}
      safety={{
        intro: 'This calculator is for educational purposes only. It does not provide treatment recommendations.',
        items: [
          'Always verify dosing with current institutional protocols and drug monographs.',
          <>
            <strong className="block">Carboplatin dosing</strong>Requires accurate creatinine clearance. Consider
            capping CrCl at 150 mL/min.
          </>,
          'Dose modifications may be required based on organ function, performance status, toxicity, and prior treatments.',
          'Maximum doses and cumulative dose limits must be observed (e.g., doxorubicin 550 mg/m²).',
        ],
        closing: 'Never administer chemotherapy without oncologist supervision and appropriate monitoring.',
      }}
      references={{
        title: 'References',
        head: ['Drug Class', 'Key References'],
        rows: [
          { label: 'Carboplatin (Calvert Formula)', text: 'Calvert et al. J Clin Oncol 1989; BC Cancer protocols' },
          { label: 'Anthracyclines', text: 'FDA prescribing information, BC Cancer Drug Manual' },
          { label: 'Taxanes', text: 'NCCN Guidelines, European Medicines Agency' },
          { label: 'Other Agents', text: 'Susan G. Komen Foundation, Clinical studies' },
        ],
      }}
    />
  )
}
