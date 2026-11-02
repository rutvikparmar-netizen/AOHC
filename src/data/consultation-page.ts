import type { ConsultationPageContent } from '@/types'

/**
 * REQUEST A CONSULTATION PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  THE THIRD LEAD PARAGRAPH IS THE ONE THAT MATTERS. "Submitting a
 * request does not guarantee a consultation, acceptance for treatment, or a
 * particular clinical recommendation." It is the only sentence on the page
 * that limits what pressing the button achieves, and it is placed before
 * the form rather than under it. Moving it below the submit, shortening it,
 * or folding it into the paragraph above turns a limit into small print.
 *
 * ⚠️  "Suggested Enquiry Form Fields" IS A SPEC, NOT PAGE COPY, AND IS NOT
 * IN THIS FILE. The draft lists eighteen fields across three groups —
 * personal details, enquiry details, consent — as a description of what the
 * form should collect. Rendering that list on the page would show a reader
 * a specification of a form instead of a form. The page renders the real
 * `EnquiryForm`.
 *
 * ⚠️  THE REAL FORM DOES NOT YET COLLECT EVERYTHING THE SPEC ASKS FOR, and
 * the gap is recorded here rather than quietly ignored. It currently takes
 * name, email, phone, country, city, state, the message, how they heard of
 * AOHC, and one consent checkbox. The spec additionally asks for:
 *
 *   • preferred contact method and preferred language;
 *   • whether the sender is the patient or a caregiver;
 *   • the cancer diagnosis, stage and current treatment status;
 *   • the preferred consultation arrangement;
 *   • two further consent statements — that the privacy notice has been
 *     read, and that submitting the form is not medical advice and does
 *     not establish a doctor–patient relationship.
 *
 * Adding them is a change to the form, the server action, the validation
 * schema and the admin leads view, so it is a decision rather than a
 * tidy-up. The third consent line in particular is a legal statement that
 * currently appears only as a note beside the form.
 *
 * ⚠️  THE DRAFT'S OWN INSTRUCTION, reproduced here because it governs any
 * such change: "Do not request extensive medical details through an
 * ordinary contact form. Provide a secure medical-record submission process
 * when sensitive information is required." Diagnosis and stage sit close to
 * that line; records plainly cross it.
 */
export const consultationPage: ConsultationPageContent = {
  hero: {
    title: 'Start With a Review of Your Situation',
    body: [
      'If you would like to discuss your cancer diagnosis or explore whether a further clinical review may be appropriate, contact AOHC.',
      'Our team will explain the enquiry process and the information required to determine the next steps.',
      'Submitting a request does not guarantee a consultation, acceptance for treatment, or a particular clinical recommendation.',
    ],
  },

  /**
   * "What Happens Next?"
   *
   * ⚠️  THE DRAFT NUMBERS THESE 18 TO 22, which is an artefact of the
   * numbered list running on from an earlier section of the source
   * document. They render unnumbered-from-one; printing "18." as the first
   * step of a five-step process would read as a fault.
   *
   * ⚠️  A PANEL SAYING ALMOST THIS WAS REMOVED FROM THE HOME PAGE on AOHC's
   * instruction, because it described a process nobody had confirmed. This
   * is the supplied copy for this page, so it renders here — but it is the
   * same claim, and if the process is still unconfirmed then step five in
   * particular ("applicable consultation fees and arrangements should be
   * communicated before you proceed") is a commitment.
   */
  steps: {
    eyebrow: 'After you send it',
    title: 'What Happens Next?',
    items: [
      'Submit your initial enquiry.',
      'Our team reviews the information needed to respond to your request.',
      'If appropriate, you will receive instructions for securely sharing relevant medical records.',
      'The team will explain whether a consultation can be arranged and what the next steps involve.',
      'Applicable consultation fees and arrangements should be communicated before you proceed.',
    ],
  },

  /**
   * ⚠️  NOT SMALL PRINT. It is addressed to someone who may be about to use
   * a web form in an emergency, and it is placed above the form for that
   * reason. It must not be moved below the submit button.
   */
  notice: {
    title: 'Important Notice',
    body: 'This form is not for emergencies. If you are experiencing severe symptoms or a medical emergency, contact your local emergency service or seek urgent medical care.',
  },

  /** The draft specifies the submit button's words. */
  submitLabel: 'Submit Consultation Enquiry',
}
