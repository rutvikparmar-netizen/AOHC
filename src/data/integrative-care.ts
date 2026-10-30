import type { IntegrativeCareContent } from '@/types'
import { routes } from '@/lib/routes'

/**
 * INTEGRATIVE CANCER CARE PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as `home.ts`
 * and `about.ts`: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  THIS IS THE PAGE WHERE PARAPHRASING WOULD DO REAL HARM. It describes
 * what AOHC thinks about treatments outside routine cancer care, to an
 * audience actively considering them. Every hedge in the supplied text —
 * "may", "appropriate", "where clinically suitable", "should be confirmed" —
 * is load-bearing. The full set of rules is on `IntegrativeCareContent` in
 * `src/types/content.ts`; read it before editing anything here.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * TWO PRESENTATION DECISIONS WORTH KNOWING ABOUT, neither of which changes a
 * word:
 *
 *   1. TWO SENTENCES ARE PROMOTED OUT OF THEIR PARAGRAPH into `warning`,
 *      which renders in its own louder panel below the section's `outro`.
 *      They are the two statements on this page that could hurt someone if
 *      they were skimmed past — delaying standard treatment, and supplements
 *      interacting with cancer medicines. In the source the second of those
 *      shares a paragraph with the "must be confirmed with AOHC" sentence;
 *      both halves are reproduced whole, just in two panels instead of one.
 *
 *   2. THE SECTION HEADINGS ARE THE SUPPLIED ONES; the eyebrows above them
 *      are not in the source. They are navigational labels rather than
 *      claims — "What integrative care means", "Conventional oncology" —
 *      and none of them says anything the heading beneath does not.
 */
export const integrativeCare: IntegrativeCareContent = {
  hero: {
    eyebrow: 'Integrative cancer care',
    title: 'Considering Cancer Care From More Than One Perspective',
    /* Decoration, rendered `alt=""` and `aria-hidden` at a fifth opacity —
       see the note on `PageHeroContent.image`. The alt is kept accurate
       here as a record of what the frame shows, not because the page
       announces it. Shared with the home page's approach bento, which is
       acceptable at this opacity and worth knowing about. */
    image: {
      src: '/images/approach/supportive-integrative.webp',
      alt: 'A clinician sitting at a bedside, holding a patient’s hand',
      width: 1672,
      height: 941,
    },
    body: [
      "Integrative cancer care brings conventional cancer treatment together with appropriate supportive approaches, based on the patient's needs and clinical circumstances.",
      /**
       * ⚠️  THE SECOND SENTENCE IS THE POINT OF THE PAGE. "The objective is
       * not to replace evidence-based oncology with unproven alternatives"
       * is the line that distinguishes this service from the thing it would
       * otherwise be mistaken for. It belongs in the hero, above the fold,
       * and must not be moved down the page for balance.
       */
      'The objective is not to replace evidence-based oncology with unproven alternatives. It is to consider the available options carefully, understand how they may fit together, and prioritize patient safety.',
    ],
  },

  definition: {
    eyebrow: 'What integrative care means',
    title: 'What Is Integrative Cancer Care?',
    body: [
      'Cancer care can involve treating the disease, managing symptoms and treatment-related effects, maintaining physical function, supporting emotional well-being, and helping patients understand their choices.',
      'An integrative approach considers these needs together. It may include conventional treatment, supportive care, and selected complementary approaches when their use is appropriate and their risks have been assessed.',
      "The specific components of care depend on the patient's diagnosis, medical condition, treatment history, preferences, and the services available.",
    ],
  },

  conventional: {
    eyebrow: 'Conventional oncology',
    title: 'Conventional Oncology Remains Important',
    intro: [
      'Depending on the cancer type and clinical circumstances, conventional cancer care may include:',
    ],
    items: [
      'Surgery.',
      'Chemotherapy.',
      'Radiation therapy.',
      'Hormonal or endocrine therapy.',
      'Targeted therapy.',
      'Immunotherapy.',
      'Other specialist-directed cancer treatments.',
    ],
    outro:
      'These treatments have different indications, benefits, limitations, and risks. The treating oncology team should determine which options are suitable for the individual patient.',
    /* Its own supplied paragraph, and the one sentence on this page a
       reader most needs to not skim past. See decision 1 above. */
    warning:
      'An integrative approach should not delay a time-sensitive, potentially beneficial standard treatment.',
    image: {
      src: '/images/records-review.jpg',
      alt: 'Two clinicians holding a brain MRI film up to the light and discussing it',
      width: 1400,
      height: 788,
    },
  },

  supportive: {
    eyebrow: 'Supportive and complementary care',
    title: 'Supportive and Complementary Care',
    intro: [
      'Some patients may benefit from additional support for symptoms, nutrition, physical activity, sleep, emotional well-being, or treatment-related effects.',
      'Depending on availability and clinical suitability, supportive care may involve:',
    ],
    items: [
      'Symptom assessment and management.',
      'Nutritional assessment and appropriate dietary guidance.',
      'Psychological and emotional support.',
      'Physical activity or rehabilitation guidance.',
      'Review of supplements and complementary products.',
      'Support with treatment-related side effects.',
      'Coordination with relevant specialists.',
    ],
    /**
     * ⚠️  THIS SENTENCE IS WHAT KEEPS THE LIST ABOVE IT A DESCRIPTION
     * RATHER THAN A MENU. Seven services listed without it read as seven
     * things AOHC provides today, which the draft is explicit they are not
     * until confirmed. It must not be dropped to tidy the section.
     */
    outro:
      'These services must be confirmed with AOHC before they are represented as available.',
    /* The second half of the same supplied paragraph, promoted. A
       drug-interaction warning on a cancer site should not be the tail of
       a sentence about operational scope. */
    warning:
      'Supplements and natural products can cause adverse effects or interact with cancer medicines, so patients should disclose everything they take to their clinical team.',
  },

  caution: {
    eyebrow: 'Emerging and non-standard therapies',
    title: 'A Careful Approach to Emerging or Non-Standard Therapies',
    body: [
      'Some patients explore therapies that are not part of routine cancer care, including certain metabolic approaches, device-based interventions, repurposed medicines, or other emerging treatments.',
      'These options require careful evaluation. The existence of a biological rationale, laboratory result, or early study does not establish that a treatment is safe or effective for a particular patient.',
    ],
    /**
     * Set apart on the page, and also left in `body` where the supplied copy
     * puts it — quoted rather than moved, so the prose still reads whole.
     * The same device the about page uses for "what we do not promise".
     */
    lead: 'These options require careful evaluation. The existence of a biological rationale, laboratory result, or early study does not establish that a treatment is safe or effective for a particular patient.',
    itemsIntro:
      'Before any such approach is considered, the clinical team should assess:',
    items: [
      'The quality and relevance of the available evidence.',
      'Whether the treatment is approved for the intended use.',
      'Whether it is investigational or off-label.',
      'Potential side effects and interactions.',
      "The patient's overall health and organ function.",
      'Whether it could interfere with established treatment.',
      'Monitoring requirements, costs, and practical considerations.',
    ],
    outro:
      'Where evidence is limited, that uncertainty should be explained clearly.',
  },

  quality: {
    eyebrow: 'Quality of life',
    title: 'Quality of Life Is Part of the Discussion',
    body: [
      "A cancer plan should consider more than tumour measurements alone. Symptoms, daily function, treatment burden, emotional health, personal goals, and the patient's preferences also matter.",
      'Supportive care can be relevant at any stage of cancer. It may be provided alongside active treatment or, when appropriate, as part of care focused on comfort and quality of life.',
    ],
    /**
     * The hands. A detail shot rather than a face, for the reason given on
     * `approach.pillars` in `home.ts`: literal photographs of people
     * receiving cancer treatment are confronting for the audience most
     * likely to be reading a section about comfort and quality of life.
     */
    image: {
      src: '/images/card-supportive.jpg',
      alt: 'Two people sitting together, one hand resting on another',
      width: 1000,
      height: 563,
    },
  },

  closing: {
    title: 'Explore an Individualized Care Discussion',
    /**
     * `routes.consultation` is the home page's enquiry form — see the note
     * in `routes.ts`. Every CTA on the site lands there until the real
     * contact page ships.
     */
    cta: { label: 'Request a Consultation', href: routes.consultation },
  },
}
