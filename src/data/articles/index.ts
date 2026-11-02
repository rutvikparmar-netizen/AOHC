import type { ArticlePageContent } from '@/types'
import { ayurvedicCancerCareGopala } from './ayurvedic-cancer-care-gopala'
import { breastCancerDiagnosis } from './breast-cancer-diagnosis'
import { deoxyglucose2dg } from './deoxyglucose-2dg'
import { ecct } from './ecct'
import { hydrogenInhalationTherapy } from './hydrogen-inhalation-therapy'
import { myeloproliferativeNeoplasms } from './myeloproliferative-neoplasms'
import { vitaminCG6pd } from './vitamin-c-g6pd'

/**
 * THE ARTICLES MIGRATED FROM THE WORDPRESS SITE.
 *
 * ⚠️  EVERY `href` IS THE PAGE'S ORIGINAL LIVE URL AND MUST NOT BE
 * "TIDIED". `/ecct` and
 * `/discover-the-healing-power-of-ayurvedic-cancer-care-gopala-shimoga-karnataka-india`
 * are both ugly and both load-bearing: they are the paths Google has
 * indexed, the paths other sites link to, and the paths in the old
 * sitemap. Moving one to `/knowledge/blogs/ecct` because it reads better
 * throws away whatever ranking that page has and 404s every inbound link.
 * If they ever do move, they move behind 301s.
 *
 * ⚠️  THIS PUTS SEVEN MORE SLUGS IN THE ROOT NAMESPACE, which `routes.ts`
 * warns about: `expertiseItem` already reserves ~44 root paths. Checked at
 * the time of writing — no collisions. Check again before adding another
 * root-level page.
 *
 * ⚠️  `summary` IS FOR THE INDEX AT `/knowledge/blogs` AND IS THE ARTICLE'S
 * OWN OPENING SENTENCE in every case, never a written précis. A summary
 * that characterises an article makes a claim about it; a quotation from
 * it does not.
 */
export interface MigratedArticle {
  slug: string
  /** The original live URL. See the warning above. */
  href: string
  /** Index-page title. Matches the article's own `hero.title`. */
  title: string
  summary: string
  content: ArticlePageContent
}

export const migratedArticles: MigratedArticle[] = [
  {
    slug: 'vitamin-c-infusion-and-g6pd-deficiency',
    href: '/vitamin-c-infusion-and-g6pd-deficiency',
    title: 'High-Dose Vitamin C Infusion and G6PD Deficiency',
    summary:
      'These case studies provide the rationale that high-dose vitamin C given intravenously is contraindicated in G6PD deficiency.',
    content: vitaminCG6pd,
  },
  {
    slug: 'myeloproliferative-neoplasms',
    href: '/myeloproliferative-neoplasms',
    title: 'Myeloproliferative Neoplasms',
    summary:
      'Myeloproliferative neoplasms (MPN), previously called myeloproliferative disorders, are diseases of the bone marrow and blood.',
    content: myeloproliferativeNeoplasms,
  },
  {
    slug: 'breast-cancer-diagnosis',
    href: '/breast-cancer-diagnosis',
    title: 'Radiology Methods for Breast Cancer Diagnosis',
    summary:
      'In Breast Cancer Radiology plays an important role in screening, diagnosis, evaluation of Breast cancer etc.',
    content: breastCancerDiagnosis,
  },
  {
    slug: '2-deoxyglucose-2dg',
    href: '/2-deoxyglucose-2dg',
    title: '2-Deoxyglucose (2DG)',
    summary:
      '2DG is a glucose analogue, having an almost similar structure to glucose. It can mimic glucose in cancer microenvironment.',
    content: deoxyglucose2dg,
  },
  {
    slug: 'hydrogen-inhalation-therapy',
    href: '/hydrogen-inhalation-therapy',
    title: 'Hydrogen Inhalation Therapy',
    summary:
      'Hydrogen is administered in a controlled concentration for a specific period of time to reduce the proliferation of in situ tumors.',
    content: hydrogenInhalationTherapy,
  },
  {
    slug: 'ecct',
    href: '/ecct',
    title: 'What Is ECCT?',
    summary:
      'ECCT (Electro-Capacitive Cancer Therapy) generates an electric field from non-contact capacitive electrodes placed around the location of the tumor.',
    content: ecct,
  },
  {
    slug: 'discover-the-healing-power-of-ayurvedic-cancer-care-gopala-shimoga-karnataka-india',
    href: '/discover-the-healing-power-of-ayurvedic-cancer-care-gopala-shimoga-karnataka-india',
    title: 'Ayurvedic Cancer Care at Gopala, Shimoga, Karnataka',
    summary:
      'Discover the ancient wisdom of Ayurveda through innovative techniques for cancer treatment.',
    content: ayurvedicCancerCareGopala,
  },
]
