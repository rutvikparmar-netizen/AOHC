import type { TreatmentCostsContent } from '@/types'
import { routes } from '@/lib/routes'

/**
 * TREATMENT COSTS PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  THIS IS THE MOST DANGEROUS PAGE ON THE SITE TO EDIT CARELESSLY, because
 * everything on it is about what someone will be charged. Three rules:
 *
 *   1. NO FIGURE APPEARS ANYWHERE, and none may be added. Not a price, not a
 *      range, not a "from", not a currency symbol, not an example. None is
 *      supplied, and a number here is a quotation whoever reads it will hold
 *      AOHC to.
 *
 *   2. THE MODAL VERBS ARE LOAD-BEARING. "Costs VARY", "AOHC AIMS to
 *      explain", "WHEREVER those costs can be reasonably estimated", "WHERE
 *      APPROPRIATE, patients SHOULD receive a written estimate", "actual
 *      costs MAY change". Tightening "should receive a written estimate"
 *      into "receive a written estimate" turns a description of good
 *      practice into a promise about what happens to every patient.
 *
 *   3. THE LIST IS OF THINGS THAT MAY APPLY, NOT A BILL. "Depending on the
 *      case, expenses may include" opens it and "Not every patient will
 *      require every item" closes it. Nine line items with neither sentence
 *      reads as an itemised invoice for a treatment nobody has been offered
 *      yet.
 *
 * ⚠️  "No Treatment Guarantees" IS THE POINT OF THE PAGE, not its small
 * print. Paying does not buy an outcome, and decisions belong to clinical
 * appropriateness rather than to what someone has already spent. It is last
 * because it is what the reader should leave with, and it must not be moved
 * below the call to action or shortened to balance a column.
 *
 * ⚠️  THE EYEBROWS ARE WRITTEN, NOT SUPPLIED. The draft gives section
 * headings only ("Section: What Can Affect the Cost?"), and `ListSection`
 * requires an eyebrow. Each one restates its own heading and claims nothing
 * the heading does not. Replace them with AOHC's wording when there is some.
 */
export const treatmentCosts: TreatmentCostsContent = {
  hero: {
    title: 'Understand the Costs Before Making a Decision',
    body: [
      'Cancer treatment costs vary according to the diagnosis, treatment plan, investigations, medications, facility, duration of care, and individual medical needs.',
      'AOHC aims to explain the applicable consultation and treatment costs before a patient commits to a proposed service, wherever those costs can be reasonably estimated.',
    ],
    /**
     * ⚠️  NO HERO BACKGROUND. The other pages built on `PageHero` each carry
     * a frame commissioned for them; none was generated for this one, and
     * reusing another page's would undo the point of having one per page.
     * `image` is optional and the hero reads perfectly well without it.
     */
  },

  factors: {
    eyebrow: 'Treatment costs',
    title: 'What Can Affect the Cost?',
    intro: ['Depending on the case, expenses may include:'],
    items: [
      'Initial consultation and medical review.',
      'Diagnostic investigations and laboratory tests.',
      'Pathology review or molecular testing.',
      'Specialist consultations.',
      'Medicines and their administration.',
      'Hospital admission or day-care services.',
      'Procedures and associated facility fees.',
      'Monitoring and follow-up.',
      'Travel, accommodation, and caregiver expenses for international patients.',
    ],
    /**
     * ⚠️  THIS SENTENCE IS WHAT KEEPS THE LIST ABOVE IT A SET OF
     * POSSIBILITIES RATHER THAN AN ITEMISED BILL. Nine cost lines without it
     * read as nine charges every patient incurs. It must not be dropped to
     * tidy the section.
     */
    outro: 'Not every patient will require every item.',
  },

  estimates: {
    eyebrow: 'Written estimates',
    title: 'Individualized Cost Estimates',
    body: [
      'Where appropriate, patients should receive a written estimate that identifies the proposed services, expected charges, and any known exclusions.',
      'The estimate should explain whether it includes professional fees, medicines, facility charges, laboratory testing, follow-up, taxes, and other relevant costs.',
      'Actual costs may change if the clinical plan changes or additional services become necessary.',
    ],
  },

  questions: {
    eyebrow: 'Before you proceed',
    title: 'Questions to Ask',
    intro: ['Before proceeding, consider asking:'],
    items: [
      'What is included in the estimate?',
      'Which services are optional and which are necessary?',
      'Are any additional tests expected?',
      'What could cause the cost to increase?',
      'What are the charges for follow-up?',
      'Are payment or refund policies available in writing?',
      'Will any services be provided by external facilities?',
    ],
  },

  guarantees: {
    eyebrow: 'What money does not buy',
    title: 'No Treatment Guarantees',
    body: [
      'Paying for a consultation, test, or treatment does not guarantee a clinical response or a particular outcome.',
    ],
    emphasis:
      'Treatment decisions should be based on clinical appropriateness and informed consent, not financial pressure.',
  },

  closing: {
    title: 'Request Information About Fees',
    /* `routes.contact` is the home page's enquiry form — see the note in
       `routes.ts`. Every CTA on the site lands there until the real contact
       page ships. */
    cta: { label: 'Contact Our Team', href: routes.contact },
  },
}
