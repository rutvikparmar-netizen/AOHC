import type { InternationalPatientsContent } from '@/types'
import { routes } from '@/lib/routes'
import { APPOINTMENT_CTA } from '@/lib/site'

/**
 * INTERNATIONAL PATIENTS PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  THIS PAGE CONFIRMS NOTHING. It describes a process and the arrangements
 * that *may* be available. The hero's note is the governing sentence, and
 * step 5 says "the team can explain the confirmed arrangements" — confirmed,
 * meaning confirmed case by case, not confirmed in general. Nothing here may
 * be rewritten into a list of services, and no stage may gain a price, a
 * timescale or a named provider.
 *
 * ⚠️  THE SEVEN CHILD PAGES DO NOT EXIST. `routes.ts` holds payments,
 * accommodation, India phone SIM, cash to carry, sightseeing, airport pickup
 * and medical visa, and the header already renders them as a dropdown under
 * this page. None of them is written. Step 5 names visas, accommodation and
 * interpretation as things to ask the team about; it must not link them until
 * those pages exist, or this page becomes seven dead ends at the exact moment
 * a reader decides to act.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  ONE SENTENCE OF THE SUPPLIED DOCUMENT IS NOT ON THE PAGE, because it is
 * an instruction to AOHC rather than copy for a patient. It is kept here so
 * nothing is lost, and it governs what may be built next:
 *
 *   Under "Step 5: Planning a Visit":
 *     "Travel, visa, accommodation, interpretation, and other support
 *      services should be described only where AOHC has confirmed that it
 *      provides them or can arrange them through a verified provider."
 *
 * Printed on the page it would read as the site talking to its own editors,
 * and it would tell someone planning a trip that nothing has been confirmed —
 * which the sentence directly above it already says more usefully, by making
 * "confirmed arrangements" the thing the team explains. It is also the rule
 * that keeps the seven child pages unwritten rather than guessed at. The same
 * decision was taken on `/cancer-types` (twice) and `/treatments-and-
 * therapies`; see the notes at the top of those files.
 *
 * THE SECTION EYEBROWS ARE NOT IN THE SOURCE. They are navigational labels
 * rather than claims, and none of them says anything its heading does not.
 */
export const internationalPatients: InternationalPatientsContent = {
  hero: {
    title: 'Helping Patients Navigate Cancer Care Across Borders',
    /**
     * Decoration — `alt=""` and `aria-hidden` at 45 per cent opacity. See the
     * note on `PageHeroContent.image`.
     *
     * ⚠️  THE BRIGHTEST OF THE FIVE, AND THE ONE TO RE-MEASURE FIRST. The
     * window runs the full width with sky behind it, so unlike the other
     * four there is no dark half for the headline to sit on; the scrim is
     * doing real work here rather than tidying up. Contrast was measured
     * after it went in, not assumed.
     */
    image: {
      src: '/images/heroes/international-patients.webp',
      alt: 'An airport walkway before dawn, aircraft on a wet apron beyond the glass',
      width: 1942,
      height: 809,
    },
    body: [
      'Patients travelling from another country may face additional challenges when arranging medical records, consultations, appointments, accommodation, travel, and follow-up care.',
      'AOHC aims to provide clear information about the consultation process and the arrangements that may be available to international patients.',
    ],
    /**
     * ⚠️  THE FOURTH SUPPLIED PARAGRAPH, AND THE ONE THAT GOVERNS THE PAGE.
     * Held out of `body` so it does not read as a third welcoming paragraph,
     * and kept in the hero rather than pushed to the foot: someone who reads
     * this page as an offer of care abroad has done so before reaching any
     * section about what cannot be guaranteed.
     */
    note: 'Acceptance for consultation or treatment depends on clinical assessment, service availability, travel feasibility, and applicable requirements.',
  },

  /**
   * The third supplied paragraph, which is the only one that answers "is
   * this page for me". It is its own strip rather than a third hero
   * paragraph — see `RegionBand` for why the region names also appear as
   * labels beside it.
   */
  regions: {
    eyebrow: 'Where enquiries come from',
    body: 'Patients from the United Kingdom, Australia, Canada, the United States, Europe, the Middle East, Africa, Southeast Asia, and other regions may contact our team to enquire about eligibility and available services.',
    /**
     * ⚠️  THE REGION NAMES ARE LIFTED FROM THE SENTENCE ABOVE, NOT ADDED TO
     * IT. No region appears here that the supplied copy does not name, and
     * "Other regions" is last because the sentence ends "and other regions"
     * — a reader from Japan or Brazil must not read eight labels as a list
     * of who is eligible.
     */
    names: [
      'United Kingdom',
      'Australia',
      'Canada',
      'United States',
      'Europe',
      'Middle East',
      'Africa',
      'Southeast Asia',
      'Other regions',
    ],
  },

  process: {
    eyebrow: 'What to expect',
    title: 'How the Process Works',
    /**
     * ⚠️  THE ORDER IS THE STEP NUMBER. There is no `label` field — see
     * `EnquiryStep` in `src/types/content.ts`. Inserting a stage renumbers
     * the page automatically, which is the point.
     */
    steps: [
      {
        title: 'Initial Enquiry',
        body: [
          'Contact AOHC with your basic details, country of residence, diagnosis, and the type of support you are seeking.',
        ],
        /**
         * ⚠️  A DATA-SAFETY INSTRUCTION, AND THE MOST ACTIONABLE LINE IN THE
         * SECTION. A patient who has just read "contact AOHC with your
         * diagnosis" will attach everything they have to the first email
         * unless told not to, and a full oncology record sent to an
         * unverified address cannot be recalled. It must not be demoted to
         * a second paragraph or moved below the document list in step 2,
         * which is where someone would already have sent them.
         */
        caution:
          'Please do not send full medical records until the team has provided an appropriate secure submission method.',
      },
      {
        title: 'Medical Record Collection',
        body: ['You may be asked to provide relevant records, such as:'],
        items: [
          'Pathology and biopsy reports.',
          'Imaging reports and scans.',
          'Treatment summaries.',
          'Recent laboratory results.',
          'Molecular or biomarker reports, if available.',
          'A current medication list.',
          'A summary of current symptoms and medical concerns.',
        ],
        /**
         * ⚠️  THIS SENTENCE IS WHAT KEEPS THE LIST ABOVE IT A GUIDE RATHER
         * THAN A CHECKLIST TO COMPLETE BEFORE WRITING IN. Seven documents
         * listed without it tell a patient whose hospital will take three
         * weeks to release imaging that they cannot yet make contact.
         */
        outro:
          'The required documents depend on the case. The team will advise what is needed.',
      },
      {
        title: 'Preliminary Review',
        body: [
          'The available records may be reviewed to determine whether a consultation is appropriate and whether additional information is required.',
          /* A limitation, not a caution: it qualifies what the stage is.
             See the note on `EnquiryStep.caution`. */
          'A preliminary review cannot guarantee treatment eligibility, clinical benefit, or acceptance for a specific procedure.',
        ],
      },
      {
        title: 'Consultation and Discussion',
        body: [
          'If a consultation can be arranged, the team will explain the process, relevant fees, expected next steps, and the information required for a meaningful clinical discussion.',
          'Remote consultations, if offered, have limitations and may not replace an in-person examination or local medical care.',
        ],
      },
      {
        title: 'Planning a Visit',
        /**
         * One of the two supplied paragraphs. The second is an instruction
         * to AOHC about what it may describe as available, not something to
         * tell a patient — see the note at the top of this file. The word
         * "confirmed" in the paragraph below already carries the part that
         * concerns the reader.
         */
        body: [
          'If an in-person visit is clinically appropriate and available, the team can explain the confirmed arrangements and any documents required.',
        ],
      },
      {
        title: 'Follow-Up and Coordination',
        body: [
          'Before travelling, patients should understand the proposed follow-up arrangements and how their care will be coordinated with clinicians in their home country.',
        ],
        /**
         * ⚠️  THE LAST THING READ BEFORE THE TRAVEL SECTION, AND A CAUTION
         * RATHER THAN A QUALIFIER. Someone who has read five stages about
         * how a visit is arranged is at the point of booking a flight; this
         * is the sentence that says not to. It must not be softened into
         * "patients are advised to".
         */
        caution:
          'Patients should not travel for treatment without a clear plan, appropriate medical advice, and confirmation of the relevant arrangements.',
      },
    ],
  },

  considerations: {
    eyebrow: 'Before you travel',
    title: 'Important Considerations Before Travelling',
    /**
     * ⚠️  THE TRAVEL-SAFETY SENTENCE LEADS THE SECTION AND IS NOT IN
     * `warning`. `ChecklistSection` renders `warning` below `outro`, at the
     * very foot of the section — and the supplied copy opens with this,
     * before the list, because a patient whose disease makes flying unsafe
     * needs to know before weighing visas and insurance. Demoting it to the
     * loudest panel at the bottom would put it after the reader has finished
     * deciding. The `outro` panel takes the sentence that belongs there: the
     * one about what AOHC cannot guarantee.
     */
    intro: [
      'Cancer patients may have symptoms or complications that make travel unsafe. Travel plans should be discussed with the treating medical team.',
      'Patients should also consider:',
    ],
    items: [
      'Fitness to travel.',
      'The risk of symptoms worsening during travel.',
      'Medication supply and documentation.',
      'Medical insurance and out-of-pocket expenses.',
      'Visa and entry requirements.',
      'Accessibility and caregiver needs.',
      'Follow-up care after returning home.',
    ],
    outro:
      'AOHC cannot guarantee visa approval, travel eligibility, treatment availability, or a particular outcome.',
  },

  caregivers: {
    eyebrow: 'Families and caregivers',
    title: 'Support for Families and Caregivers',
    body: [
      'Family members and caregivers can play an important role in helping patients organize records, understand information, and make decisions.',
      /* "Where appropriate and with the patient's consent" is the whole
         clause, and the consent half of it is not optional — it is the only
         place on the page that says a relative cannot act for a patient by
         default. */
      "Where appropriate and with the patient's consent, caregivers may participate in consultations and help coordinate practical arrangements.",
    ],
  },

  closing: {
    title: 'Enquire About International Patient Services',
    /* `routes.internationalEnquiry` is the home page's enquiry form — see the
       note in `routes.ts`. Every CTA on the site lands there until the real
       contact page ships. */
    cta: { label: APPOINTMENT_CTA, href: routes.internationalEnquiry },
  },
}
