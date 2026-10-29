import type { TreatmentsContent } from '@/types'
import { routes } from '@/lib/routes'

/**
 * TREATMENTS AND THERAPIES PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  NOTHING HERE IS AN OFFER. The hero says it outright — these are
 * "categories that may be relevant to cancer care" whose "availability
 * through AOHC must be confirmed individually" — and every entry below is
 * written as what a discussion may consider rather than what AOHC provides.
 * The full set of rules is on `TreatmentsContent` in `src/types/content.ts`.
 *
 * ⚠️  ONE SENTENCE OF THE SUPPLIED DOCUMENT IS NOT ON THE PAGE, because it
 * is an instruction to AOHC rather than copy for a patient. It is kept here
 * so nothing is lost, and it governs what may be built next:
 *
 *   Under "Local and Interventional Procedures":
 *     "AOHC should list a specific procedure as an available service only
 *      after confirming its clinical availability, specialist credentials,
 *      appropriate facilities, and patient-selection criteria."
 *
 * Printed on the page it would read as the site talking to its own editors,
 * and it would tell a reader weighing an ablation that nothing has been
 * confirmed — which the section already says more carefully in the sentence
 * before it. The same decision was taken twice on `/cancer-types`; see the
 * note at the top of that file.
 *
 * THE SECTION EYEBROWS ARE NOT IN THE SOURCE. They are navigational labels
 * rather than claims, and none of them says anything its heading does not.
 */
export const treatmentsPage: TreatmentsContent = {
  hero: {
    eyebrow: 'Treatments and therapies',
    title: 'Evaluating Treatment Options in the Context of Your Case',
    body: [
      'Treatment selection depends on the confirmed diagnosis, disease extent, tumour characteristics, previous treatment, patient health, available evidence, and the goals of care.',
      "AOHC's approach is to consider clinically relevant options rather than assume that a single treatment pathway is appropriate for every patient.",
    ],
    /**
     * ⚠️  THE THIRD SUPPLIED PARAGRAPH, AND THE ONE THAT KEEPS THE WHOLE
     * PAGE HONEST. Held out of `body` so it does not read as a third
     * selling paragraph, and kept in the hero rather than pushed to the
     * foot: a reader who takes this page as a menu of services has done
     * so before reaching any disclaimer.
     */
    note: 'The treatments described below are categories that may be relevant to cancer care. Their availability through AOHC must be confirmed individually.',
  },

  conventional: {
    eyebrow: 'Established options',
    title: 'Conventional Cancer Treatments',
    /**
     * ⚠️  NO ICONS ON THESE SIX, UNLIKE THE CANCER TYPES. Only `target`
     * and `shield-check` had an honest match in the set — there is no
     * scalpel, no radiation beam and nothing for hormonal therapy — and a
     * grid where two of six carry a mark reads as a mistake rather than a
     * system. Better none than an arbitrary four.
     */
    entries: [
      {
        name: 'Surgery',
        body: [
          "Surgery may be used to remove a tumour, obtain diagnostic tissue, or address specific complications. Suitability depends on the cancer type, location, disease extent, and the patient's condition.",
          'Surgical decisions should be made with the appropriate specialist team.',
        ],
      },
      {
        name: 'Chemotherapy',
        body: [
          'Chemotherapy uses medicines to damage or inhibit cancer cells. Different drugs work in different ways and have different side-effect profiles.',
          "Treatment decisions may consider prior response, disease characteristics, organ function, blood counts, neuropathy and other toxicities, and the patient's overall condition.",
        ],
      },
      {
        name: 'Radiation Therapy',
        body: [
          'Radiation therapy uses targeted radiation to treat cancer in a defined area. It may be used for different purposes depending on the cancer type and clinical circumstances.',
          'The potential benefits and risks should be discussed with a radiation oncologist.',
        ],
      },
      {
        name: 'Hormonal or Endocrine Therapy',
        body: [
          'Some cancers depend on hormonal signals for growth. Hormonal treatments may be appropriate for selected cancers when supported by the diagnosis and relevant test results.',
          'Receptor status and other clinical findings should be interpreted in context.',
        ],
      },
      {
        /* ⚠️  The second sentence is the one a reader arriving with a
           genomic report most needs, and it must not be trimmed. */
        name: 'Targeted Therapy',
        body: [
          'Targeted medicines act on particular molecular targets or pathways. Their suitability depends on the cancer type, relevant biomarkers, clinical evidence, regulatory status, and patient-specific factors.',
          'A molecular finding does not automatically mean that a matching medicine will be effective.',
        ],
      },
      {
        name: 'Immunotherapy',
        body: [
          'Immunotherapy aims to use or modify immune-system activity against cancer. Its role depends on the tumour type, biomarkers, previous treatment, clinical status, and applicable evidence.',
          'Immunotherapy can cause significant immune-related adverse effects and requires appropriate medical oversight.',
        ],
      },
    ],
  },

  molecular: {
    eyebrow: 'Diagnostic information',
    title: 'Molecular and Biomarker-Guided Treatment Discussions',
    subtitle: 'Using Diagnostic Information to Inform Decisions',
    body: [
      'Depending on the case, clinicians may review pathology, molecular profiling, genomic findings, transcriptomic information, or other relevant tests.',
      'The purpose is to understand whether a result has established clinical relevance and whether it can inform a real treatment decision.',
      'Testing should be selected thoughtfully. Not every patient needs every test, and more testing does not always lead to a better outcome.',
    ],
  },

  caution: {
    eyebrow: 'Approaches that need more care',
    topics: [
      {
        title: 'Investigational and Off-Label Approaches',
        subtitle: 'Understanding the Difference',
        body: [
          'A medicine may be approved for one condition but used off-label for another under appropriate clinical supervision. An investigational treatment may be under study and may not have established safety or effectiveness for the intended use.',
          'These categories should not be presented as equivalent to established standard care.',
          'Any discussion should explain the evidence, uncertainty, legal and regulatory considerations, possible risks, alternatives, and any additional monitoring requirements.',
        ],
      },
      {
        title: 'Metabolic or Repurposed-Medicine Approaches',
        body: [
          'Some treatment discussions explore metabolic pathways or medicines originally developed for other conditions.',
          'Laboratory findings or proposed mechanisms alone do not prove that these approaches will benefit a patient. Their clinical relevance, evidence, safety, interactions, and regulatory status must be evaluated carefully.',
          'No specific metabolic or repurposed treatment should be represented as an established cancer therapy unless that claim is supported for the relevant indication.',
        ],
      },
    ],
  },

  procedures: {
    eyebrow: 'Local and interventional',
    title: 'Local and Interventional Procedures',
    /**
     * Two of the three supplied paragraphs. The third is an instruction to
     * AOHC about what it may advertise, not something to tell a patient —
     * see the note at the top of this file. The second paragraph already
     * tells the reader the part that concerns them: that eligibility is
     * narrow and depends on the treating team.
     */
    body: [
      'Certain cancers may be assessed for specialist procedures that target a tumour or a particular anatomical area. Depending on the diagnosis and clinical context, these may include selected ablation or catheter-based techniques.',
      'Such procedures are not suitable for every tumour or patient. Eligibility depends on factors such as tumour location, size, number of lesions, organ function, disease distribution, and the expertise of the treating team.',
    ],
  },

  supportive: {
    eyebrow: 'Supportive care',
    title: 'Supportive and Integrative Therapies',
    body: [
      'Supportive approaches may help address selected symptoms, functional needs, or treatment-related challenges. Their purpose and evidence vary.',
      'Before a supportive or complementary therapy is included in a treatment plan, the team should consider whether it is appropriate, whether it could interfere with cancer treatment, and how benefit and harm will be assessed.',
    ],
  },

  evaluation: {
    eyebrow: 'How options are weighed',
    title: 'How Treatment Options Are Evaluated',
    intro: 'Treatment discussions may consider:',
    /* Numbered in the source, so numbered on the page. */
    items: [
      "The patient's confirmed diagnosis and current condition.",
      'What has already been tried and the response achieved.',
      'The clinical evidence for each option.',
      'Potential benefits, harms, and interactions.',
      'Whether the option is standard, off-label, or investigational.',
      "The patient's goals and preferences.",
      'Monitoring, costs, accessibility, and practical feasibility.',
    ],
  },

  /**
   * ⚠️  THE MOST IMPORTANT BLOCK ON THE PAGE. It is the only place on the
   * site that tells a patient outright not to act on what they have read,
   * and it is given its own panel rather than folded into a section. It
   * must not be shortened, softened, or moved below the closing call to
   * action.
   */
  safety: {
    title: 'Important Safety Information',
    body: 'Do not stop, postpone, or change prescribed cancer treatment based on website information, a laboratory test, or a complementary treatment proposal. Discuss treatment decisions with the qualified clinician responsible for your care.',
  },

  closing: {
    title: 'Discuss Which Options May Be Relevant to Your Case',
    /* `routes.consultation` is the home page's enquiry form — see the note
       in `routes.ts`. Every CTA on the site lands there until the real
       contact page ships. */
    cta: { label: 'Request a Consultation', href: routes.consultation },
  },
}
