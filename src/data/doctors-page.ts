import type { DoctorsPageContent } from '@/types'
import { routes } from '@/lib/routes'
import { APPOINTMENT_CTA } from '@/lib/site'

/**
 * DOCTORS AND SPECIALISTS PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * âš ï¸  `doctors-page`, NOT `doctors`. `src/data/doctors.ts` is a deliberately
 * empty `Doctor[]` that the demo repository reads. The same collision was hit
 * once already with `treatments.ts`; this file is named to avoid repeating it.
 *
 * ⚠️  THE ROSTER IS NOT HERE. It is `home.team.members` — the transcription of
 * artofhealingcancer.com/our-doctors, already rendered as a preview on the
 * home page, whose "Meet the full team" link points at this page. One list,
 * two views. Copying fifteen real people's names and credentials into a
 * second file is how the two copies start to disagree.
 *
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * âš ï¸  THE DRAFT'S "MEET OUR TEAM" SECTION IS A TEMPLATE, NOT COPY, AND IS NOT
 * RENDERED. It reads, in full:
 *
 *     Use the following template for each verified team member.
 *
 *     [Doctor's Full Name]
 *     [Verified Qualifications and Degrees]
 *     [Specialty and Clinical Role]
 *     [Insert a concise biography describing the doctor's relevant training,
 *      experience, clinical interests, current affiliations, and role in
 *      patient care. Include only information that has been verified and
 *      approved by the doctor or the organization.]
 *     Areas of clinical focus: [Verified areas]
 *     Professional registration: [Registration authority and registration
 *      details, where appropriate]
 *     Consultation availability: [Confirmed consultation arrangements]
 *     CTA: Request a Consultation
 *
 * Putting any of that on the page would publish square brackets to patients.
 * It is kept here because it is the SPEC for what still has to be collected
 * per person: the roster currently carries name, prefix, role, speciality,
 * some qualifications and a few experience figures, and carries NO biography,
 * areas of focus, registration or availability. Those four fields are the
 * gap, and the draft is explicit that only the doctor or AOHC may supply
 * them — "include only information that has been verified and approved".
 *
 * The template's own call to action is the one on the roster section below.
 */
export const doctorsPage: DoctorsPageContent = {
  hero: {
    title: 'The Right Expertise for the Clinical Question',
    /**
     * Decoration — `alt=""` and `aria-hidden` at 45 per cent opacity. See the
     * note on `PageHeroContent.image`.
     *
     * âš ï¸  THESE ARE MODELS, NOT THE AOHC TEAM, and on this page of all
     * pages that distinction matters: the real roster is fifteen named
     * people further down, with their own photographs. The frame is held
     * at 45 per cent and unlabelled precisely so it cannot be read as a
     * picture of the team.
     */
    image: {
      src: '/images/heroes/our-doctors.webp',
      alt: 'Three clinicians seen from behind, discussing scans on a lit display wall',
      width: 1942,
      height: 809,
    },
    body: [
      "Cancer care may involve several medical disciplines. The specialists required depend on the patient's diagnosis, the treatment decision under consideration, and any additional medical needs.",
      'AOHC aims to support an individualized review process and appropriate coordination with qualified healthcare professionals.',
    ],
  },

  disciplines: {
    eyebrow: 'A multidisciplinary perspective',
    title: 'A Multidisciplinary Perspective',
    intro: [
      'Depending on the patient’s needs and the services confirmed by AOHC, relevant expertise may include:',
    ],
    items: [
      'Medical oncology.',
      'Surgical oncology.',
      'Radiation oncology.',
      'Pathology.',
      'Radiology and diagnostic imaging.',
      'Molecular diagnostics.',
      'Interventional oncology or radiology.',
      'Supportive and palliative care.',
      'Nutrition and rehabilitation.',
      'Other relevant medical specialties.',
    ],
    /**
     * âš ï¸  THIS SENTENCE IS WHAT KEEPS THE LIST ABOVE IT A DESCRIPTION OF
     * DISCIPLINES RATHER THAN A ROSTER OF SERVICES AOHC STAFFS. Ten
     * specialties listed without it read as ten specialties on call. It
     * must not be dropped to tidy the section.
     */
    outro:
      'Not every patient requires every specialist, and not all disciplines may be available through AOHC directly.',
  },

  team: {
    eyebrow: 'Meet our team',
    title: 'The Specialists Behind Your Care',
    /**
     * ⚠️  WRITTEN HERE, NOT SUPPLIED — and deliberately says nothing about
     * the team beyond what the records themselves prove. Every discipline
     * it names is one a member of this roster is actually filed under; it
     * makes no claim about availability, seniority or where anyone
     * consults, because none of that is in the data. Replace it with
     * AOHC's own wording when there is some; do not extend it from
     * inference.
     */
    intro:
      'Specialists across surgical, medical, radiation and precision oncology, diagnostics, and supportive care.',
    /* The call to action the draft's per-doctor template specifies. */
    cta: { label: APPOINTMENT_CTA, href: routes.consultation },
  },

  responsibility: {
    eyebrow: 'Responsibility and collaboration',
    title: 'Clinical Responsibility and Collaboration',
    body: [
      'Treatment recommendations should be made by appropriately qualified professionals within their scope of practice. Where a patient has an existing oncologist, collaboration and communication may be important for continuity and safety.',
      'Patients should understand who is responsible for each part of their care, where treatment will take place, and whom to contact if their condition changes.',
    ],
  },

  closing: {
    title: 'Connect With the Appropriate Clinical Team',
    /* `routes.contact` is the home page's enquiry form — see the note in
       `routes.ts`. Every CTA on the site lands there until the real contact
       page ships. */
    cta: { label: APPOINTMENT_CTA, href: routes.contact },
  },
}
