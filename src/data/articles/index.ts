import type { ArticlePageContent } from '@/types'
import { ayurvedicCancerCareGopala } from './ayurvedic-cancer-care-gopala'
import { breastCancerDiagnosis } from './breast-cancer-diagnosis'
import { breastCancerStagesHindi } from './breast-cancer-stages-hindi'
import { deoxyglucose2dg } from './deoxyglucose-2dg'
import { deoxyglucose2dgBlog } from './deoxyglucose-2dg-blog'
import { ecct } from './ecct'
import { hydrogenInhalationTherapy } from './hydrogen-inhalation-therapy'
import { hydrogenTherapyAntiCancerArsenal } from './hydrogen-therapy-anti-cancer-arsenal'
import { integrativeOncologyBadiDhaulpur } from './integrative-oncology-badi-dhaulpur'
import { ivVitaminC } from './iv-vitamin-c'
import {
  lungCancerAyurvedaBhilwara,
  lungCancerAyurvedaCharkhiDadri,
  lungCancerAyurvedaHarrai,
  lungCancerAyurvedaMandawa,
  lungCancerAyurvedaNeemrana,
  lungCancerAyurvedaVidyaNagar,
} from './lung-cancer-ayurveda-hindi'
import { cityPages } from './city-pages'
import { cityPages2 } from './city-pages-2'
import { cityPages3 } from './city-pages-3'
import { cityPages4 } from './city-pages-4'
import { lungLocationPages } from './lung-cancer-locations'
import { internationalGuides } from './international-guides'
import { batch3Pages } from './wordpress-batch-3'
import { batch4Pages } from './wordpress-batch-4'
import { batch5Pages } from './wordpress-batch-5'
import { breastCancerBurari, glioblastoma, vitaminCDoctors } from './landing-pages'
import { mistletoeHumanTrials } from './mistletoe-human-trials'
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
/**
 * The topics the blog index groups articles under.
 *
 * ⚠️  LABELS, NOT CLAIMS. These are shelf names for the index at
 * `/blogs` — written for the redesign, not supplied by AOHC — and they
 * deliberately say only what an article is about, never that a therapy
 * works. "Supportive and Investigational Therapies" puts the word
 * "investigational" on the shelf that holds hydrogen, ECCT and
 * mistletoe for exactly that reason.
 *
 * Order here is the order on the page.
 */
export const articleTopics = [
  { id: 'diagnosis', title: 'Understanding a Diagnosis' },
  { id: 'vitamin-c', title: 'High-Dose Vitamin C' },
  { id: 'metabolic', title: 'Metabolic Approaches' },
  { id: 'therapies', title: 'Supportive and Investigational Therapies' },
  { id: 'integrative', title: 'Integrative Care in India' },
  { id: 'international', title: 'Travelling to AOHC from Abroad' },
] as const

export type ArticleTopicId = (typeof articleTopics)[number]['id']

/**
 * Facts about an article computed from its own content, for the index
 * cards — so a card can say something true and specific without an image,
 * a date or an author, none of which the migration captured.
 *
 * Reading time assumes 200 words a minute, a common figure for careful
 * reading of technical prose, and rounds up so nothing reads "0 min".
 */
export function articleStats(content: ArticlePageContent) {
  const text = [
    ...(content.lead ?? []),
    ...content.sections.flatMap((s) => [
      s.title ?? '',
      ...(s.body ?? []),
      ...(s.items ?? []),
      ...(s.outro ?? []),
    ]),
  ].join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return {
    minutes: Math.max(1, Math.ceil(words / 200)),
    references: content.references?.length ?? 0,
    lang: content.lang,
  }
}

export interface MigratedArticle {
  slug: string
  /** Which shelf of the `/blogs` index it sits on. */
  topic: ArticleTopicId
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
    topic: 'vitamin-c',
    href: '/vitamin-c-infusion-and-g6pd-deficiency',
    title: 'High-Dose Vitamin C Infusion and G6PD Deficiency',
    summary:
      'These case studies provide the rationale that high-dose vitamin C given intravenously is contraindicated in G6PD deficiency.',
    content: vitaminCG6pd,
  },
  {
    slug: 'myeloproliferative-neoplasms',
    topic: 'diagnosis',
    href: '/myeloproliferative-neoplasms',
    title: 'Myeloproliferative Neoplasms',
    summary:
      'Myeloproliferative neoplasms (MPN), previously called myeloproliferative disorders, are diseases of the bone marrow and blood.',
    content: myeloproliferativeNeoplasms,
  },
  {
    slug: 'breast-cancer-diagnosis',
    topic: 'diagnosis',
    href: '/breast-cancer-diagnosis',
    title: 'Radiology Methods for Breast Cancer Diagnosis',
    summary:
      'In Breast Cancer Radiology plays an important role in screening, diagnosis, evaluation of Breast cancer etc.',
    content: breastCancerDiagnosis,
  },
  {
    slug: 'iv-vitamin-c',
    topic: 'vitamin-c',
    href: '/iv-vitamin-c',
    title: 'What Is High-Dose Intravenous Vitamin C Treatment for Cancer?',
    summary:
      'Vitamin C in high concentrations given intravenously can act as a pro-oxidant, activating hydrogen-peroxide-dependent cytotoxicity in cancer cells but not in normal cells.',
    content: ivVitaminC,
  },
  {
    slug: 'human-trials-of-mistletoe-therapy',
    topic: 'therapies',
    href: '/human-trials-of-mistletoe-therapy',
    title: 'Human Trials of Mistletoe Therapy',
    summary:
      'The results of clinical trials of mistletoe therapy have been mixed. Some trials have found benefits in quality of life and survival, while others have found none.',
    content: mistletoeHumanTrials,
  },
  {
    slug: '2-deoxyglucose-2dg',
    topic: 'metabolic',
    href: '/2-deoxyglucose-2dg',
    title: '2-Deoxyglucose (2DG)',
    summary:
      '2DG is a glucose analogue, having an almost similar structure to glucose. It can mimic glucose in cancer microenvironment.',
    content: deoxyglucose2dg,
  },
  /* ⚠️  THE SECOND 2DG ENTRY. These two are near-duplicates of each
     other and are listed next to each other so the duplication is
     impossible to miss on the index page. Neither is a superset of the
     other — see the warning in `deoxyglucose-2dg-blog.ts` — so neither
     can simply be deleted. They want merging. */
  {
    slug: '2-deoxyglucose-2dg-blog',
    topic: 'metabolic',
    href: '/2-deoxyglucose-2dg-blog',
    title: '2-Deoxyglucose (2DG) — Mechanisms and Lysosomal Recycling',
    summary:
      'Cancer cells can divert unfolded proteins to the lysosome, degrade them and recycle the components. 2DG interferes with that recycling.',
    content: deoxyglucose2dgBlog,
  },
  {
    slug: 'breast-cancer-stages',
    topic: 'diagnosis',
    href: '/breast-cancer-stages',
    title: 'स्तन कैंसर ग्रेडिंग और स्टेजिंग (Breast Cancer Grading and Staging)',
    summary:
      'विशिष्ट कोशिकाओं की तुलना में कैंसर कोशिकाएं कितनी असामान्य हैं, इसका वर्णन ग्रेड द्वारा किया जाता है।',
    content: breastCancerStagesHindi,
  },
  /* ⚠️  THE TWO HYDROGEN PAGES, listed next to each other so the overlap
     is visible on the index. The long one is the better article by a
     distance; see the warning in its data file. */
  {
    slug: 'hydrogen-inhalation-therapy',
    topic: 'therapies',
    href: '/hydrogen-inhalation-therapy',
    title: 'Hydrogen Inhalation Therapy',
    summary:
      'Hydrogen is administered in a controlled concentration for a specific period of time to reduce the proliferation of in situ tumors.',
    content: hydrogenInhalationTherapy,
  },
  {
    slug: 'hydrogen-therapy-a-recent-addition-to-anti-cancer-arsenal',
    topic: 'therapies',
    href: '/hydrogen-therapy-a-recent-addition-to-anti-cancer-arsenal',
    title: 'Hydrogen Therapy — A Recent Addition to Anti-Cancer Arsenal',
    summary:
      'The three routes of administration, the balance between reactive oxygen species and antioxidants, and what hydrogen has been reported to do in cell lines, animal models and case reports.',
    content: hydrogenTherapyAntiCancerArsenal,
  },
  {
    slug: 'ecct',
    topic: 'therapies',
    href: '/ecct',
    title: 'What Is ECCT?',
    summary:
      'ECCT (Electro-Capacitive Cancer Therapy) generates an electric field from non-contact capacitive electrodes placed around the location of the tumor.',
    content: ecct,
  },
  {
    slug: 'discover-the-healing-power-of-ayurvedic-cancer-care-gopala-shimoga-karnataka-india',
    topic: 'integrative',
    href: '/discover-the-healing-power-of-ayurvedic-cancer-care-gopala-shimoga-karnataka-india',
    title: 'Ayurvedic Cancer Care at Gopala, Shimoga, Karnataka',
    summary:
      'Discover the ancient wisdom of Ayurveda through innovative techniques for cancer treatment.',
    content: ayurvedicCancerCareGopala,
  },
  {
    slug: 'empowering-integrative-oncology-treatment-hub-badi-dhaulpur-rajasthan-india',
    topic: 'integrative',
    href: '/empowering-integrative-oncology-treatment-hub-badi-dhaulpur-rajasthan-india',
    title: 'Integrative Oncology Treatment Hub — Badi, Dhaulpur, Rajasthan',
    summary:
      'Integrative oncology blends traditional cancer treatments with evidence-based complementary therapies, aiming to support and optimise them rather than replace them.',
    content: integrativeOncologyBadiDhaulpur,
  },
  /* ⚠️  THE TWO HINDI LUNG-CANCER PAGES share one English body and differ
     only in their Hindi headings — see their data file, which also lists
     the machine-translation errors a Hindi speaker must fix. Listed next
     to each other so the duplication is visible. */
  {
    slug: 'फेफड़ों-के-कैंसर-के-लिए-अभ-6',
    topic: 'integrative',
    href: '/फेफड़ों-के-कैंसर-के-लिए-अभ-6',
    title: lungCancerAyurvedaNeemrana.hero.title,
    summary: 'नीमराना, अलवर, राजस्थान में प्राचीन आयुर्वेदिक उपचारों के साथ फेफड़ों के कैंसर से निपटने के लिए एक उन्नत दृष्टिकोण की खोज करें।',
    content: lungCancerAyurvedaNeemrana,
  },
  {
    slug: 'आयुर्वेदिक-जादू-उजागर-सा-2',
    topic: 'integrative',
    href: '/आयुर्वेदिक-जादू-उजागर-सा-2',
    title: lungCancerAyurvedaHarrai.hero.title,
    summary: 'स्वास्थ्य और कल्याण की दिशा में अपनी यात्रा को सशक्त बनाने के लिए शक्तिशाली आयुर्वेदिक उपचारों और पारंपरिक ज्ञान के माध्यम से फेफड़ों के कैंसर के लिए समग्र उपचार की प्राचीन कला की खोज करें।',
    content: lungCancerAyurvedaHarrai,
  },
  /* The same template again: three more Hindi towns and one English one.
     Summaries are each page's own first sentence. */
  ...(
    [
      ['आयुर्वेदिक-फेफड़ों-के-कै-57', lungCancerAyurvedaVidyaNagar],
      ['आयुर्वेदिक-उपचार-से-फेफड-6', lungCancerAyurvedaMandawa],
      ['नवीनीकृत-जीवन-शक्ति-आयुर', lungCancerAyurvedaCharkhiDadri],
      ['empower-your-journey-lung-cancer-ayurvedic-healing-r-k-colony-bhilwara-rajasthan-india', lungCancerAyurvedaBhilwara],
    ] as const
  ).map(([slug, content]) => ({
    slug,
    topic: 'integrative' as const,
    href: `/${slug}`,
    title: content.hero.title,
    summary: (content.hero.body?.[0] ?? '').match(/^.*?[.!?।](\s|$)/)?.[0].trim() ?? '',
    content,
  })),
  {
    slug: 'glioblastoma',
    topic: 'therapies',
    href: '/glioblastoma',
    title: glioblastoma.hero.title,
    summary: 'Precision oncology and integrative care for glioblastoma, glioma and brain cancer: 2-DG, gene-guided immunotherapy, metronomic chemotherapy, ECCT and more.',
    content: glioblastoma,
  },
  {
    slug: 'insight/leading-accessible-wellness-package-and-trusted-precision-experts-in-india-innovative-precision-metabolic-end-stage-breast-cancer-care-for-kaushik-enclave-burari-delhi-india-patients',
    topic: 'integrative',
    href: '/insight/leading-accessible-wellness-package-and-trusted-precision-experts-in-india-innovative-precision-metabolic-end-stage-breast-cancer-care-for-kaushik-enclave-burari-delhi-india-patients',
    title: breastCancerBurari.hero.title,
    summary: breastCancerBurari.hero.body?.[0] ?? '',
    content: breastCancerBurari,
  },
  {
    slug: 'best-doctors-for-high-dose-vitamin-c-for-cancer-treatment-in',
    topic: 'vitamin-c',
    href: '/best-doctors-for-high-dose-vitamin-c-for-cancer-treatment-in',
    title: vitaminCDoctors.hero.title,
    summary: vitaminCDoctors.hero.body?.[0] ?? '',
    content: vitaminCDoctors,
  },
  /* ⚠️  THE 22 CITY LANDING PAGES — one template per therapy with the
     town swapped. See `city-pages.ts` before adding another. Each summary
     is the page's own first sentence. */
  /* Sixteen articles and service pages migrated in one pass; see the
     header of `wordpress-batch-3.ts`. */
  ...batch3Pages.map((p) => ({
    slug: p.slug,
    topic: p.topic,
    href: `/${p.slug}`,
    title: p.title,
    summary: p.summary,
    content: p.content,
  })),
  /* Nineteen more; see the header of `wordpress-batch-4.ts`. */
  ...batch4Pages.map((p) => ({
    slug: p.slug,
    topic: p.topic,
    href: `/${p.slug}`,
    title: p.title,
    summary: p.summary,
    content: p.content,
  })),
  /* Twenty-nine more; see the header of `wordpress-batch-5.ts`. */
  ...batch5Pages.map((p) => ({
    slug: p.slug,
    topic: p.topic,
    href: `/${p.slug}`,
    title: p.title,
    summary: p.summary,
    content: p.content,
  })),
  ...[...cityPages, ...cityPages2, ...cityPages3, ...cityPages4].map((p) => ({
    slug: p.slug,
    topic: p.topic,
    href: `/${p.slug}`,
    title: p.title,
    summary: p.summary,
    content: p.content,
  })),
  /* Eight English lung-cancer location pages on the Bhilwara template; see
     `lung-cancer-locations.ts`. The summary is the page's description, as
     for Bhilwara. */
  ...lungLocationPages.map((p) => ({
    slug: p.slug,
    topic: 'integrative' as const,
    href: `/${p.slug}`,
    title: p.title,
    summary: p.description,
    content: p.content,
  })),
  /* The seven international-patient guides, at their live URLs; see
     `international-guides.ts`. */
  ...internationalGuides.map((p) => ({
    slug: p.slug,
    topic: 'international' as const,
    href: p.href,
    title: p.title,
    summary: p.summary,
    content: p.content,
  })),
]
