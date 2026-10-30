import type { PatientJourneyContent } from '@/types'
import { routes } from '@/lib/routes'
import { APPOINTMENT_CTA } from '@/lib/site'

/**
 * YOUR PATIENT JOURNEY PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  EVERY STAGE IS WRITTEN IN THE CONDITIONAL AND MUST STAY THERE. "The
 * clinical team MAY consider", "IF the team confirms that a review may be
 * appropriate", "IF a treatment plan is proposed", "additional testing is NOT
 * automatically required". The page describes a process, not a promise about
 * what any one patient will be offered. Turning a "may" into a "will" while
 * tightening the prose would turn a description into a commitment.
 *
 * ⚠️  TWO SENTENCES CARRY THE MOST WEIGHT and must survive any edit:
 *
 *   - Stage 2: "Only information needed for the clinical review should be
 *     requested. Medical records should be handled through appropriate
 *     secure systems, with access restricted to authorized personnel." It
 *     is the page's only data-protection statement.
 *   - `consent.emphasis`: "You should never feel pressured to proceed with
 *     a test, treatment, or procedure you do not understand." It is the
 *     only line on the page addressed to someone being pushed.
 *
 * THE SECTION EYEBROWS ARE NOT IN THE SOURCE. They are navigational labels
 * rather than claims, and none of them says anything its heading does not.
 */
export const patientJourney: PatientJourneyContent = {
  hero: {
    eyebrow: 'Your patient journey',
    title: 'A Clearer Process From First Enquiry to Follow-Up',
    /**
     * ONE PARAGRAPH, WHICH IS ALL THE DRAFT SUPPLIES. `PageHero` sets a
     * single paragraph as one wide lead rather than as two columns with
     * the right half empty — see the note there. Nothing was invented to
     * make up a second.
     */
    body: [
      "Every patient's clinical journey is different, but a structured process can help patients and families understand what happens next.",
    ],
  },

  stages: {
    eyebrow: 'Seven stages',
    /* Not in the source: the draft runs straight from the standfirst into
       "Stage 1". A deck of seven pinned cards needs something above it to
       say what the deck is. It names the thing rather than claiming
       anything about it. */
    title: 'From First Enquiry to Follow-Up',
    /**
     * ⚠️  THE ORDER IS THE STAGE NUMBER. There is no `number` field — see
     * `JourneyStage` in `src/types/content.ts`.
     */
    items: [
      {
        title: 'Make an Enquiry',
        body: [
          'Contact AOHC to explain your diagnosis, current situation, and the questions you would like to discuss.',
          'Our team can explain the enquiry process, the available consultation options, and the information required to proceed.',
        ],
      },
      {
        title: 'Share Relevant Medical Records Securely',
        body: [
          'If the team confirms that a review may be appropriate, you will be advised how to submit the relevant medical records.',
          /* ⚠️  THE PAGE'S ONLY DATA-PROTECTION STATEMENT. It is also the
             promise that answers the question a patient actually has when
             asked to hand over their records. It must not be shortened. */
          'Only information needed for the clinical review should be requested. Medical records should be handled through appropriate secure systems, with access restricted to authorized personnel.',
        ],
      },
      {
        title: 'Review Your Medical History',
        body: [
          'The clinical team may consider the diagnosis, pathology, imaging, previous treatments, responses, side effects, current symptoms, laboratory results, and other relevant health information.',
          'If important information is missing, additional records or clarification may be requested.',
        ],
      },
      {
        title: 'Identify Questions and Information Gaps',
        body: [
          'The review may identify areas where further information is needed before treatment options can be meaningfully discussed.',
          /* ⚠️  "ADDITIONAL TESTING IS NOT AUTOMATICALLY REQUIRED" is the
             sentence that stops this page reading as a funnel into paid
             investigations. Keep it first in its sentence, not buried. */
          'Additional testing is not automatically required. The potential value, limitations, risks, cost, and clinical relevance of any proposed investigation should be explained.',
        ],
      },
      {
        title: 'Discuss the Available Options',
        body: [
          'The consultation may cover relevant standard treatments, supportive care, and other options where appropriate.',
          'The discussion should include the rationale for each option, the evidence supporting it, possible benefits and risks, uncertainties, and any alternatives.',
        ],
      },
      {
        title: 'Agree on the Next Steps',
        body: [
          'If a treatment plan is proposed, the patient should understand the recommended next steps, who will provide each part of care, how treatment will be monitored, and when reassessment is needed.',
          'Where care involves other doctors or facilities, responsibilities and communication arrangements should be clarified.',
        ],
      },
      {
        title: 'Monitoring and Reassessment',
        body: [
          "Cancer care may change as the patient's condition, test results, symptoms, or treatment response changes.",
          'The clinical team should explain how follow-up will be arranged, which symptoms require urgent attention, and whom to contact with concerns.',
        ],
      },
    ],
  },

  prepare: {
    eyebrow: 'Before you come in',
    title: 'What You Can Do to Prepare',
    intro: ['Before a consultation:'],
    items: [
      'Gather your latest medical reports.',
      'Prepare a list of current medicines and supplements.',
      'Note important symptoms and when they began.',
      'Write down questions and concerns.',
      'Include information about previous treatment side effects.',
      'Consider having a trusted caregiver join, if you wish.',
    ],
  },

  consent: {
    eyebrow: 'Your decision',
    title: 'You Remain Part of Every Decision',
    body: [
      'Patients should have the opportunity to ask questions, understand uncertainties, and discuss their preferences. Consent should be informed and voluntary.',
    ],
    /**
     * ⚠️  ITS OWN PANEL, NOT A SECOND PARAGRAPH. This is the only sentence
     * on the page written to someone who is being pushed into something,
     * and a reader in that position is skimming. Folded into the prose
     * above it, it reads as more process description.
     */
    emphasis:
      'You should never feel pressured to proceed with a test, treatment, or procedure you do not understand.',
  },

  closing: {
    title: 'Begin With Your Medical History',
    /**
     * The draft names this CTA "Request a Consultation". It uses the
     * site-wide label instead, on request — see `APPOINTMENT_CTA` in
     * `lib/site.ts` for why there is only one wording.
     */
    cta: { label: APPOINTMENT_CTA, href: routes.consultation },
  },
}
