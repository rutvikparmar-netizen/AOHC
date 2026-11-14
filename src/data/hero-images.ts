import type { ImageAsset } from '@/types'

/**
 * HERO BACKGROUND IMAGES FOR THE MIGRATED ARTICLES, ONE PER TOPIC
 * ----------------------------------------------------------------------------
 * About 215 article and location pages share twelve topic images. A page
 * gets its topic by matching its URL (and, for the Devanagari URLs, its
 * script) against `match`, first match wins; anything unmatched is
 * "integrative".
 *
 * ⚠️  DECORATION ONLY. `PageHero` draws the image at 45 per cent opacity
 * under a teal gradient with `alt=""` — it is texture behind white type,
 * not a picture the page is about. That is also why it must never show an
 * identifiable patient, a scan presented as a result, or anything that
 * reads as evidence of an outcome.
 *
 * ⚠️  UNTIL A TOPIC'S OWN IMAGE EXISTS, `ready: false` AND THE PAGE USES
 * `fallback` — one of the five hero photographs already on the site. To
 * add one: generate it from `prompt`, export 2400 × 1000 WebP (quality
 * ~70, under ~250 KB), save it as `public/images/heroes/topics/<id>.webp`,
 * and set `ready: true`. Nothing else changes.
 *
 * Every prompt shares one style line so the twelve read as a set with the
 * five existing heroes: dark, low-light, cinematic, subject on the RIGHT
 * (the headline sits on the left), no text, no faces.
 */

const STYLE =
  'Cinematic wide 21:9 photograph, dark low-key lighting, deep teal and charcoal tones with soft warm highlights, shallow depth of field, subject placed in the right third of the frame with empty dark space on the left for a headline, calm and clinical, no text, no logos, no identifiable faces, photorealistic, 2400x1000.'

const W = 1942
const H = 809
const existing = (file: string, alt: string): ImageAsset => ({ src: `/images/heroes/${file}.webp`, alt, width: W, height: H })
const LAB = existing('cancer-types', 'A darkened laboratory bench with a microscope, slide trays and backlit scans')
const CARE = existing('integrative-cancer-care', 'A clinician’s hands resting over a patient’s at a bedside, a window beyond')
const INFUSION = existing('treatments-and-therapies', 'An empty infusion suite at low light, a drip stand beside a treatment chair')

export interface HeroTopic {
  id: string
  match: RegExp
  alt: string
  prompt: string
  /** Flip to true once `public/images/heroes/topics/<id>.webp` exists. */
  ready: boolean
  fallback: ImageAsset
}

export const heroTopics: HeroTopic[] = [
  /* First, so a guide's slug ("medical-visa-for-india") is never caught by
     a clinical topic below. These are the seven international-patient
     guides; see data/articles/international-guides.ts. */
  {
    id: 'travel',
    match: /^(payments-and-invoices|accommodation|india-phone-sim|insight\/(cash-to-carry|local-sight-seeing-shopping|airport-pickup-and-local-travel|medical-visa-for-india))$/,
    alt: 'A passport, boarding pass and folded hotel key card on a table by a window',
    prompt: `A passport, a boarding pass and a hotel key card laid on a light wooden table beside a large window, a small travel bag out of focus behind, calm arrival-day mood. ${STYLE}`,
    ready: false,
    fallback: existing('international-patients', 'An airport walkway before dawn, aircraft on a wet apron beyond the glass'),
  },  {
    id: 'lung',
    match: /lung|breathe|pulmonary|फेफड़/,
    alt: 'A pair of backlit chest X-ray films on a lightbox in a dim room',
    prompt: `Chest X-ray films clipped to a softly glowing lightbox in a dim radiology reading room, lungs visible as abstract translucent shapes, a stethoscope resting on the desk below. ${STYLE}`,
    ready: false,
    fallback: LAB,
  },
  {
    id: 'breast',
    match: /breast|paget|स्तन|चमत्कार/,
    alt: 'A pink ribbon resting on a folded hospital gown beside a window',
    prompt: `A small pink awareness ribbon resting on a neatly folded white hospital gown on a bedside table, soft window light from the right, out-of-focus clinic room behind. ${STYLE}`,
    ready: false,
    fallback: CARE,
  },
  {
    id: 'gynae',
    match: /cervical|ovarian|vulvar/,
    alt: 'A teal awareness ribbon on a consultation desk beside a notepad',
    prompt: `A teal-and-white awareness ribbon lying on a wooden consultation desk next to a closed notepad and a pen, a blurred gynaecology consulting room behind, warm desk lamp light. ${STYLE}`,
    ready: false,
    fallback: CARE,
  },
  {
    id: 'brain',
    match: /glioblastoma|glioma|brain/,
    alt: 'Backlit MRI brain scans on a monitor in a dark reading room',
    prompt: `A row of greyscale MRI brain slices glowing on a monitor in a dark neuro-radiology reading room, abstract and unlabeled, a keyboard edge in the foreground. ${STYLE}`,
    ready: false,
    fallback: LAB,
  },
  {
    id: 'specialty',
    match: /gastric|stomach|sinonasal|thyroid|hematolog|myeloprolif|metabolic-cancer-treatment|pasighat/,
    alt: 'A surgeon’s gloved hands over an instrument tray under operating lights',
    prompt: `Gloved hands arranging sterile instruments on a stainless-steel tray under soft operating-theatre lights, background falling into darkness, no faces. ${STYLE}`,
    ready: false,
    fallback: INFUSION,
  },
  {
    id: 'metabolic',
    match: /2dg|2-dg|deoxy|metabol|glucose|glycolys|acetate|pentose|fat-transporter|mannose/,
    alt: 'Glass flasks and a pipette on a laboratory bench in low light',
    prompt: `Glass laboratory flasks with clear and amber liquids and a pipette on a lab bench, a softly glowing molecular diagram projected on the wall behind, biochemistry research mood. ${STYLE}`,
    ready: false,
    fallback: LAB,
  },
  {
    id: 'vitamin-c',
    match: /vitamin-c|vitaminc|ascorb/,
    alt: 'An IV drip bag beside sliced oranges in soft light',
    prompt: `A clear IV infusion bag hanging on a drip stand, with a few halved oranges on a small tray in the foreground, soft citrus-orange glow against a dark teal clinic background. ${STYLE}`,
    ready: false,
    fallback: INFUSION,
  },
  {
    id: 'ayurveda',
    match: /ayurved|आयुर्वेद|holistic|healing|wellness|vitality|nurtur|sanctuary|renew|harmon|guardian|spark|radiant|timeless|empower/,
    alt: 'Ayurvedic herbs, turmeric and a brass bowl on dark wood',
    prompt: `Ayurvedic herbs — turmeric roots, ashwagandha, tulsi leaves — and a small brass bowl with herbal powder on a dark wooden surface, a mortar and pestle in soft focus, warm lamp light. ${STYLE}`,
    ready: false,
    fallback: CARE,
  },
  {
    id: 'diagnostics',
    match: /diagnos|sequenc|ngs|histopath|biopsy|circulating|dna|rna|metabolomics|stages|from-dna/,
    alt: 'A microscope and stained slides on a laboratory bench',
    prompt: `A modern microscope with stained tissue slides and a slide rack on a pathology bench, a DNA sequencer screen glowing softly behind, precise and clinical. ${STYLE}`,
    ready: false,
    fallback: LAB,
  },
  {
    id: 'therapies',
    match: /hydrogen|mistletoe|hyperbaric|ecct|aot|8212|antisense|immunotherap|targeted|chemotherap|histopatholog/,
    alt: 'A treatment chair and infusion stand in a quiet day-care suite',
    prompt: `A comfortable reclining treatment chair beside an infusion stand in a quiet oncology day-care suite, a hyperbaric chamber softly visible in the background, evening light. ${STYLE}`,
    ready: false,
    fallback: INFUSION,
  },
  {
    id: 'mind-body',
    match: /yoga|meditation|fever/,
    alt: 'A rolled yoga mat and a cup of tea by a window at dawn',
    prompt: `A rolled yoga mat, a folded blanket and a cup of herbal tea beside a large window at dawn, calm restorative space, first light on the right. ${STYLE}`,
    ready: false,
    fallback: CARE,
  },
  {
    id: 'integrative',
    match: /.*/,
    alt: 'A clinician’s hands resting over a patient’s at a bedside',
    prompt: `A clinician's hand resting reassuringly on a patient's hand at a bedside, hands only, a window with soft morning light behind, warm and human. ${STYLE}`,
    ready: false,
    fallback: CARE,
  },
]

/** The topic a page belongs to, by its URL path (without the leading slash). */
export function topicOf(slug: string): HeroTopic {
  return heroTopics.find((h) => h.match.test(slug.toLowerCase())) ?? heroTopics[heroTopics.length - 1]!
}

/** The hero image for a page, by its URL path (without the leading slash). */
export function heroImageFor(slug: string): ImageAsset {
  const t = topicOf(slug)
  return t.ready ? { src: `/images/heroes/topics/${t.id}.webp`, alt: t.alt, width: 2400, height: 1000 } : t.fallback
}
