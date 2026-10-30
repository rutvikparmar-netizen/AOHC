import type { MegaNavColumn, NavGroup, NavLink } from '@/types'
import { routes } from '@/lib/routes'
import { slugify } from '@/lib/utils'
import { cancerTypes } from '@/data/cancer-types'
import { treatmentsPage } from '@/data/treatments-page'

/**
 * CANCER CARE — the two-column menu.
 *
 * ⚠️  BOTH LISTS ARE GENERATED FROM THE PAGES THEY POINT AT, not typed out
 * here. Every entry links to an anchor on `/cancer-types` or
 * `/treatments-and-therapies`, and both the anchor and the label come from
 * the same record that renders the section — `EntryGrid` puts the id on
 * each entry with the same `slugify`. Hand-writing either list is how a
 * menu ends up naming a cancer the page no longer lists, or linking an
 * anchor that silently scrolls nowhere.
 *
 * ⚠️  THESE ARE ANCHORS, NOT PER-TOPIC PAGES. `/cancer-types/breast-cancer`
 * and `/treatments-and-therapies/chemotherapy` resolve in `routes.ts` and
 * neither exists; the hero's nine cancer-type chips pointed at exactly
 * those and were nine dead links until they were removed. The full text of
 * every entry is already on the index page, so an anchor takes a reader to
 * the actual content rather than to a 404. When the per-topic pages are
 * written, swap `#${slug}` for `routes.cancerType(slug)` here and the menu
 * follows.
 *
 * ⚠️  THE TYPES COLUMN IS THE WHOLE PAGE, UNFILTERED, ON REQUEST. An earlier
 * version dropped "Other Cancer Types" on the grounds that a catch-all makes
 * a poor menu item. It is back, because the menu and the page listing
 * different things is worse: a reader who does not find their diagnosis in
 * the menu needs to see the entry that tells them to ask anyway, and that
 * entry is the one that says so.
 */
const cancerCareNav: MegaNavColumn[] = [
  {
    label: 'Cancer Types',
    href: routes.cancerTypes,
    links: cancerTypes.index.types.map((type) => ({
      label: type.name,
      href: `${routes.cancerTypes}#${slugify(type.name)}`,
    })),
    footer: { label: 'View all cancer types', href: routes.cancerTypes },
  },
  {
    label: 'Cancer Treatments',
    href: routes.treatments,
    links: [
      ...treatmentsPage.conventional.entries.map((entry) => ({
        label: entry.name,
        href: `${routes.treatments}#${slugify(entry.name)}`,
      })),
      /* The one entry that is its own page rather than an anchor. */
      { label: 'Integrative Care', href: routes.integrativeCare },
    ],
    footer: { label: 'View all treatments', href: routes.treatments },
  },
]

/**
 * OUR EXPERTISE — the full-width menu, transcribed from the supplied
 * structure.
 *
 * Seven columns, and one of them goes three deep: Hematological (Blood)
 * Malignancies carries the four blood cancers beneath it. Nothing else on
 * the site nests that far, which is why `MegaNavColumn` exists rather than
 * this being another `NavGroup`.
 *
 * FIVE OF THESE TAKE A COLUMN AND TWO STACK UNDER A NAMED NEIGHBOUR, which
 * each one declares with `stackUnder`. Array order sets reading order and
 * the mobile drawer; it no longer decides placement, so these can be
 * reordered freely.
 *
 * "Precision Cancer Healing" was an eighth column. Its children were below
 * the crop in the supplied screenshot, so it stood as a heading with
 * nothing under it, and it was removed on request.
 *
 * ⚠️  ONE GAP LEFT, FROM THE SOURCE RATHER THAN THE TRANSCRIPTION: the
 * screenshot is cut off after "ECCT" under Research, so that column may
 * have more entries than the two here. Send the rest and they drop
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
        /* Shortened from "Antisense Oligonucleotide Therapy in Oncology
           (AOT)" on request. The slug is unchanged, so the page this will
           eventually point at does not move. */
        label: 'Antisense Oligonucleotide Therapy',
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
  /**
   * THE LAST TWO SIT UNDER A NAMED NEIGHBOUR rather than taking columns of
   * their own — the panel is five wide and there are seven of these. See
   * `stackUnder` on `MegaNavColumn`, and `stackMegaColumns` in `Header.tsx`
   * for how it is laid out.
   *
   * They are still top-level columns, not children of the headings above
   * them. The alignment is visual only: 2-DeoxyGlucose and ECCT are research
   * therapies rather than a kind of precision oncology, and nesting Research
   * inside that column would say otherwise.
   */
  {
    label: 'Research',
    href: expertise('research'),
    stackUnder: 'Precision Oncology',
    links: [
      { label: '2-DeoxyGlucose (2DG)', href: expertise('2-deoxyglucose-2dg') },
      { label: 'ECCT', href: expertise('ecct') },
    ],
  },
  {
    label: 'Supportive Therapy',
    href: expertise('supportive-therapy'),
    stackUnder: 'Treatment',
    links: [
      { label: 'Diet & Nutrition', href: expertise('diet-and-nutrition') },
      { label: 'Spiritual Healing', href: expertise('spiritual-healing') },
      { label: 'Yoga & Meditation', href: expertise('yoga-and-meditation') },
    ],
  },
]

/**
 * SITE NAVIGATION — the AOHC main menu, exactly as supplied.
 *
 * Four of the eight top-level items carry children, so the header renders a
 * dropdown for those and a plain link for the rest. `description` is used as
 * the second line inside a dropdown; items without one render as a single
 * line, which keeps the International Patients menu compact at seven entries.
 *
 * ⚠️  THE ROW HAS NO SPARE WIDTH AT 1280, which is the breakpoint that
 * reveals it. Eight labels, a logo and a button fit with a few pixels to
 * spare; a ninth item, or a materially longer label, pushes the nav into
 * the button. Adding one means checking the header at 1280 before shipping
 * it — swapping Media for Cancer Types cost about 50px on its own.
 *
 * `/`, `/about-us`, `/about-us/our-doctors`, `/cancer-types`,
 * `/integrative-cancer-care`, `/international-patients` and
 * `/treatments-and-therapies` are built. Every other target will 404 until
 * written — including all seven children of International Patients, which
 * that page deliberately does not link to for the same reason.
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
      /**
       * MOVED IN FROM THE TOP LEVEL, on request, which is also where it
       * belongs: press coverage is something about the organisation rather
       * than a service a patient is looking for, and it was taking a slot
       * in a row that has no spare width.
       *
       * The description is taken from the home page's own press section,
       * "Art of Healing Cancer in the News", rather than invented.
       */
      { label: 'Media', href: routes.media, description: 'AOHC in the news' },
    ],
  },
  /**
   * TOOK MEDIA'S SLOT RATHER THAN BEING APPENDED, so the row keeps its
   * eight items — see the note above about the nav having no spare width
   * at 1280. It also reads in the right order here: a patient scanning the
   * bar goes from who AOHC is, to what it is asked to review, to how.
   *
   * ⚠️  NO DROPDOWN, DELIBERATELY. There are nine cancer types in
   * `home.cancerTypes` and `routes.cancerType(slug)` resolves for all of
   * them, but not one of those pages exists — a dropdown here would be
   * nine links to 404s. The same reasoning keeps the entries on
   * `/cancer-types` itself unlinked; see the note at the top of
   * `src/data/cancer-types.ts`.
   */
  {
    label: 'Cancer Care',
    href: routes.cancerTypes,
    /* Empty on purpose: `mega` is what this group renders. Two columns, so
       the header gives it the narrow panel rather than the full-width
       sheet — see `narrow` in `Header.tsx`. */
    links: [],
    mega: cancerCareNav,
  },
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
