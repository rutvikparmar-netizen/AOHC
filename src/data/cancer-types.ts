import type { CancerTypesContent } from '@/types'
import { routes } from '@/lib/routes'
import { APPOINTMENT_CTA } from '@/lib/site'

/**
 * CANCER TYPES PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as `home.ts`,
 * `about.ts` and `integrative-care.ts`: the draft is pending clinical,
 * operational, legal and editorial review, and rewording it would mean
 * reviewers signing off on text the site does not actually show.
 *
 * ⚠️  TWO SENTENCES OF THE SUPPLIED DOCUMENT ARE NOT ON THE PAGE, because
 * they are instructions to AOHC rather than copy for a patient. Both are
 * reproduced here so nothing is lost, and both are conditions on publishing
 * more of this section — not things to tell a reader:
 *
 *   Under "Cancer Types We May Be Asked to Review":
 *     "The following categories can be used as website navigation and
 *      educational landing pages. AOHC should publish each as a clinical
 *      service page only after confirming that the team accepts and
 *      assesses that cancer type."
 *
 *   Under "Blood Cancers":
 *     "Any AOHC service page for blood cancers must clearly identify the
 *      relevant clinical expertise and scope of care before publication."
 *
 * Rendering the first to a patient would read as the site talking to its own
 * editors; rendering the second would announce that a scope has not been
 * confirmed. They govern what may be built next, which is why they live in
 * the file that would have to change to build it. The existing note on
 * `home.cancerTypes` already works from the same instruction.
 *
 * ⚠️  THE ENTRIES ARE NOT LINKS, AND THAT IS THE FIRST SENTENCE ABOVE DOING
 * ITS JOB. `routes.cancerType(slug)` exists and every one of those pages
 * 404s. Linking ten of them from here would both break ten links and imply
 * the confirmation the draft requires. The full text of each entry is on
 * this page, so there is nothing a reader is being kept from.
 */
export const cancerTypes: CancerTypesContent = {
  hero: {
    eyebrow: 'Cancer types',
    title: 'Understanding Your Diagnosis',
    /* Decoration — `alt=""` and `aria-hidden` at 45 per cent opacity. See the
       note on `PageHeroContent.image`. A laboratory frame, because this
       page is about what a diagnosis is made of. */
    image: {
      src: '/images/heroes/cancer-types.webp',
      alt: 'A darkened laboratory bench with a microscope, slide trays and backlit scans',
      width: 1942,
      height: 809,
    },
    body: [
      'Cancer is not a single disease. Different cancer types—and even different tumours within the same person—can have distinct characteristics.',
      "AOHC's review process should begin with the confirmed diagnosis, pathology findings, imaging, previous treatment, current condition, and the questions the patient wants addressed.",
    ],
    /* Third supplied paragraph, held out of `body` so it does not read as
       a third selling paragraph. It is the sentence that says what the
       page is not. */
    note: 'The information on this page is educational. It is not a substitute for an individual medical assessment.',
  },

  index: {
    eyebrow: 'What a review may consider',
    title: 'Cancer Types We May Be Asked to Review',
    /**
     * ⚠️  EVERY ENTRY IS WRITTEN AS "A REVIEW MAY CONSIDER", NEVER AS "WE
     * TREAT". That is the distinction the whole page rests on, and it is
     * easy to erase by accident while tightening a sentence. No entry may
     * gain a link, a price, a photograph or a call to action until the
     * page behind it exists — see the warning at the top of this file.
     */
    types: [
      {
        icon: 'ribbon',
        name: 'Breast Cancer',
        body: [
          'Breast cancer includes several biological subtypes, which may differ in hormone receptor status, HER2 status, molecular characteristics, and response to treatment.',
          'A clinical review may consider the original pathology, results from any later biopsy, imaging, previous treatments, side effects, and whether the available information remains representative of the current disease.',
        ],
      },
      {
        icon: 'ovaries',
        name: 'Ovarian Cancer',
        body: [
          'Ovarian cancer care depends on the confirmed tumour type, disease extent, surgical history, previous systemic treatments, current symptoms, and overall condition.',
          'Medical records and imaging can help clarify the disease distribution and identify questions for the treating oncology team.',
        ],
      },
      {
        icon: 'brain',
        name: 'Brain Tumours',
        body: [
          'Brain tumours vary by pathology, molecular classification, location, grade, previous surgery, radiation therapy, and systemic treatment.',
          "A review may consider pathology and molecular reports, imaging, neurological function, current symptoms, and the patient's existing care plan.",
        ],
      },
      {
        icon: 'intestine',
        name: 'Colorectal Cancer',
        body: [
          'Colorectal cancer assessment may involve pathology, disease stage, imaging, previous surgery, treatment history, and relevant molecular or biomarker findings.',
          'The significance of each test depends on the confirmed diagnosis and the treatment decision being considered.',
        ],
      },
      {
        icon: 'lungs',
        name: 'Lung Cancer',
        body: [
          'Lung cancer includes different histological and molecular subtypes. Treatment options may depend on pathology, biomarker findings, disease extent, previous therapies, and overall health.',
          'A clinical review should use the available reports to identify which findings are relevant to treatment planning.',
        ],
      },
      {
        icon: 'prostate',
        name: 'Prostate Cancer',
        body: [
          'Prostate cancer management depends on disease characteristics, stage, pathology, PSA trends, imaging, previous treatment, symptoms, and individual goals.',
          'Different patients may require different approaches, and decisions should be made with the treating specialist.',
        ],
      },
      {
        icon: 'pancreas',
        name: 'Pancreatic Cancer',
        body: [
          'Pancreatic cancer assessment may involve pathology, imaging, disease extent, treatment tolerance, nutritional status, symptoms, and relevant molecular findings.',
          "The patient's current condition and any urgent complications should be considered when evaluating possible next steps.",
        ],
      },
      {
        icon: 'liver',
        name: 'Liver Cancer and Cancer Involving the Liver',
        body: [
          'Primary liver cancer and cancer that has spread to the liver are different clinical situations.',
          'Assessment should clarify the origin of the cancer, the extent of disease, liver function, other sites of involvement, previous treatment, and whether specialist local or systemic treatments may be relevant.',
        ],
      },
      {
        /**
         * ⚠️  THE DRAFT PUTS AN EXTRA CONDITION ON THIS ONE: "Any AOHC
         * service page for blood cancers must clearly identify the relevant
         * clinical expertise and scope of care before publication." That
         * sentence is an instruction to AOHC, not copy, so it is not
         * rendered — but it binds whoever builds the blood cancers page,
         * and the expertise menu already lists four of them.
         */
        icon: 'droplet',
        name: 'Blood Cancers',
        body: [
          'Blood cancers include conditions such as leukaemias, lymphomas, and myeloma. These require disease-specific assessment and appropriate haematology expertise.',
        ],
      },
      {
        icon: 'stethoscope',
        name: 'Other Cancer Types',
        body: [
          "For other diagnoses, patients can contact AOHC to ask whether their case falls within the team's scope.",
        ],
      },
    ],
  },

  documents: {
    eyebrow: 'Preparing for a review',
    title: 'What Information Helps Us Understand Your Case?',
    intro: ['Where available, patients may be asked to provide:'],
    items: [
      'Pathology or biopsy reports.',
      'Recent imaging reports and relevant images.',
      'A summary of previous treatments.',
      'Recent laboratory results.',
      'Molecular or biomarker reports, if performed.',
      'A current medication and supplement list.',
      'A summary of symptoms and other medical conditions.',
    ],
    outro: 'The team will advise which documents are relevant.',
    /**
     * The second half of the same supplied paragraph, promoted to the
     * louder panel. It is the only sentence on this page that tells a
     * patient to do something differently, and it concerns their medical
     * records — the one thing a reader of this page is about to send
     * somewhere.
     */
    warning:
      'Please do not send sensitive medical information through an unsecured channel.',
  },

  closing: {
    title: 'Have a Specific Diagnosis?',
    /* `routes.consultation` is the home page's enquiry form — see the note
       in `routes.ts`. Every CTA on the site lands there until the real
       contact page ships. */
    cta: { label: APPOINTMENT_CTA, href: routes.consultation },
  },
}
