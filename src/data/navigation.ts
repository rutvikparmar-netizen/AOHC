import type { MegaNavColumn, NavGroup, NavLink } from '@/types'
import { routes } from '@/lib/routes'

/**
 * OUR EXPERTISE — the full-width menu, transcribed from the supplied
 * structure.
 *
 * Eight columns, and one of them goes three deep: Hematological (Blood)
 * Malignancies carries the four blood cancers beneath it. Nothing else on
 * the site nests that far, which is why `MegaNavColumn` exists rather than
 * this being another `NavGroup`.
 *
 * ⚠️  TWO GAPS, BOTH FROM THE SOURCE RATHER THAN THE TRANSCRIPTION. The
 * supplied screenshot is cut off after "ECCT" under Research, so Research
 * may have more entries than the two here; and "Precision Cancer Healing"
 * was named in the list but its children were below the crop, so it is a
 * column heading with nothing under it. Send the rest and they drop
 * straight in — nothing else has to change.
 *
 * Every slug is derived from its label. None of these pages exists, like
 * the rest of the menu; they resolve to 404 until written.
 */
const expertise = (slug: string) => routes.expertiseItem(slug)

export const expertiseNav: MegaNavColumn[] = [
  {
    label: 'Centre of Excellence',
    href: expertise('centre-of-excellence'),
    links: [
      {
        label: 'Advanced Breast Cancer Program',
        href: expertise('advanced-breast-cancer-program'),
      },
      {
        label: 'Hematological (Blood) Malignancies',
        href: expertise('hematological-malignancies'),
        links: [
          { label: 'Multiple Myeloma', href: expertise('multiple-myeloma') },
          {
            label: 'Non-Hodgkin’s Lymphoma',
            href: expertise('non-hodgkins-lymphoma'),
          },
          {
            label: 'Myeloproliferative Neoplasms',
            href: expertise('myeloproliferative-neoplasms'),
          },
          { label: 'Leukemia', href: expertise('leukemia') },
        ],
      },
      {
        label: 'Antisense Oligonucleotide Therapy in Oncology (AOT)',
        href: expertise('antisense-oligonucleotide-therapy'),
      },
      {
        label: 'Affordable Integrative Cancer Care',
        href: expertise('affordable-integrative-cancer-care'),
      },
    ],
  },
  {
    label: 'Diagnosis',
    href: expertise('diagnosis'),
    links: [
      { label: 'Breast Cancer Diagnosis', href: expertise('breast-cancer-diagnosis') },
      { label: 'Head & Neck Cancer', href: expertise('head-and-neck-cancer') },
      { label: 'Imaging', href: expertise('imaging') },
      { label: 'Histopathology', href: expertise('histopathology') },
      { label: 'Hypoxia Mapping', href: expertise('hypoxia-mapping') },
      { label: 'Advanced Diagnostics', href: expertise('advanced-diagnostics') },
      {
        label: 'Blood Based Tests & Markers',
        href: expertise('blood-based-tests-and-markers'),
      },
    ],
  },
  {
    label: 'Treatment',
    href: expertise('treatment'),
    links: [
      { label: 'Surgery', href: expertise('surgery') },
      { label: 'Chemotherapy', href: expertise('chemotherapy') },
      { label: 'Targeted Therapy', href: expertise('targeted-therapy') },
      { label: 'Immunotherapy', href: expertise('immunotherapy') },
      { label: 'Radiation Therapy', href: expertise('radiation-therapy') },
    ],
  },
  {
    label: 'Precision Oncology',
    href: expertise('precision-oncology'),
    links: [
      { label: 'Genomic Sequencing (NGS)', href: expertise('genomic-sequencing-ngs') },
      { label: 'Chemosensitivity', href: expertise('chemosensitivity') },
      { label: 'From DNA to RNA', href: expertise('from-dna-to-rna') },
      { label: 'Tissue Banking', href: expertise('tissue-banking') },
      { label: 'Circulating Tumor Cell', href: expertise('circulating-tumor-cell') },
      { label: 'Metabolic Therapy', href: expertise('metabolic-therapy') },
    ],
  },
  {
    label: 'Integrative Oncology',
    href: expertise('integrative-oncology'),
    links: [
      { label: 'IV Vitamin C', href: expertise('iv-vitamin-c') },
      {
        label: 'Hydrogen Inhalation Therapy',
        href: expertise('hydrogen-inhalation-therapy'),
      },
      {
        label: 'Hyperbaric Oxygen Therapy',
        href: expertise('hyperbaric-oxygen-therapy'),
      },
      { label: 'Mistletoe Therapy', href: expertise('mistletoe-therapy') },
      { label: 'Hyperthermia', href: expertise('hyperthermia') },
      { label: 'Ayurvedic Medicine', href: expertise('ayurvedic-medicine') },
    ],
  },
  {
    label: 'Supportive Therapy',
    href: expertise('supportive-therapy'),
    links: [
      { label: 'Diet & Nutrition', href: expertise('diet-and-nutrition') },
      { label: 'Spiritual Healing', href: expertise('spiritual-healing') },
      { label: 'Yoga & Meditation', href: expertise('yoga-and-meditation') },
    ],
  },
  {
    label: 'Research',
    href: expertise('research'),
    links: [
      { label: '2-DeoxyGlucose (2DG)', href: expertise('2-deoxyglucose-2dg') },
      { label: 'ECCT', href: expertise('ecct') },
    ],
  },
  {
    label: 'Precision Cancer Healing',
    href: expertise('precision-cancer-healing'),
    links: [],
  },
]

/**
 * SITE NAVIGATION — the AOHC main menu, exactly as supplied.
 *
 * Four of the seven top-level items carry children, so the header renders a
 * dropdown for those and a plain link for the rest. `description` is used as
 * the second line inside a dropdown; items without one render as a single
 * line, which keeps the International Patients menu compact at seven entries.
 *
 * Every target except `/` is unbuilt and will 404 until written.
 */

export const primaryNav: NavGroup[] = [
  { label: 'Home', href: routes.home, links: [] },
  {
    label: 'About Us',
    href: routes.about,
    links: [
      {
        label: 'Who We Are',
        href: routes.whoWeAre,
        description: 'Our purpose, story and commitment',
      },
      {
        label: 'Our Doctors',
        href: routes.doctors,
        description: 'The specialists behind your care',
      },
      {
        label: 'Partnering Institutions',
        href: routes.partners,
        description: 'Hospitals and clinics we work with',
      },
      {
        label: 'Accreditations',
        href: routes.accreditations,
        description: 'Certifications and global affiliations',
      },
      { label: 'RGCC', href: routes.rgcc, description: 'Our Greece laboratory partner' },
    ],
  },
  { label: 'Media', href: routes.media, links: [] },
  {
    label: 'International Patients',
    href: routes.international,
    links: [
      { label: 'Payments and Invoices', href: routes.payments },
      { label: 'Accommodation', href: routes.accommodation },
      { label: 'India Phone SIM', href: routes.sim },
      { label: 'Cash to Carry', href: routes.cashToCarry },
      { label: 'Local Sightseeing & Shopping', href: routes.sightseeing },
      { label: 'Airport Pickup and Local Travel', href: routes.airportPickup },
      { label: 'Medical Visa for India', href: routes.medicalVisa },
    ],
  },
  {
    label: 'Our Expertise',
    href: routes.expertise,
    /* Empty on purpose: `mega` is what this group renders. */
    links: [],
    mega: expertiseNav,
  },
  { label: 'Testimonials', href: routes.testimonials, links: [] },
  {
    label: 'Knowledge',
    href: routes.knowledge,
    links: [
      { label: 'Videos', href: routes.videos, description: 'Patient stories and explainers' },
      { label: 'Blogs', href: routes.blogs, description: 'Articles from the care team' },
      { label: 'Documents', href: routes.documents, description: 'Guides and downloads' },
    ],
  },
  { label: 'Contact Us', href: routes.contact, links: [] },
]

/** Footer columns. */
export const footerNav: NavGroup[] = [
  {
    label: 'About Us',
    links: [
      { label: 'Who We Are', href: routes.whoWeAre },
      { label: 'Our Doctors', href: routes.doctors },
      { label: 'Partnering Institutions', href: routes.partners },
      { label: 'Accreditations', href: routes.accreditations },
      { label: 'In Loving Memory of Ruchika Jaiswal', href: routes.memorial },
    ],
  },
  {
    label: 'International Patients',
    links: [
      { label: 'Medical Visa for India', href: routes.medicalVisa },
      { label: 'Airport Pickup and Local Travel', href: routes.airportPickup },
      { label: 'Accommodation', href: routes.accommodation },
      { label: 'Payments and Invoices', href: routes.payments },
      { label: 'India Phone SIM', href: routes.sim },
    ],
  },
  {
    label: 'Knowledge',
    links: [
      { label: 'Videos', href: routes.videos },
      { label: 'Blogs', href: routes.blogs },
      { label: 'Documents', href: routes.documents },
      { label: 'Testimonials', href: routes.testimonials },
      { label: 'Media', href: routes.media },
    ],
  },
]

/** Footer small print. */
export const legalNav: NavLink[] = [
  { label: 'Privacy Policy', href: routes.privacy },
  { label: 'Cancellation and Refund Policy', href: routes.refunds },
  { label: 'Terms of Use', href: routes.terms },
  { label: 'Medical Disclaimer', href: routes.disclaimer },
]
