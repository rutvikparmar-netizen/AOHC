import type { AboutContent } from '@/types'
import { routes } from '@/lib/routes'
import { APPOINTMENT_CTA } from '@/lib/site'

/**
 * ABOUT US PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim. Nothing here is paraphrased, for
 * the same reason as `home.ts`: the draft is pending clinical, operational,
 * legal and editorial review, and rewording it would mean reviewers signing
 * off on text the site does not actually show.
 *
 * ⚠️  THIS PAGE NAMES A REAL PERSON WHO DIED OF CANCER.
 *
 * Ruchika Jaiswal's journey is AOHC's founding story and appears twice — as
 * section 1 and again as the memorial near the foot of the page. Three things
 * must survive any edit:
 *
 *   1. ONLY HER OWN PHOTOGRAPH STANDS IN FOR HER, AND ONLY IN THE MEMORIAL.
 *      AOHC supplied `/images/ruchika-jaiswal.webp`, so the memorial now
 *      carries a real portrait of her. That is the only reason the slot
 *      exists: it was deliberately absent while every image in this repo was
 *      stock of models, because any of them beside her name would have been
 *      read as a picture of her. The rule has not relaxed, it has been
 *      satisfied — nothing stock may ever be substituted into that slot, and
 *      any other face on this page must be captioned with whose it is.
 *   2. HER OUTCOME IS NOT A RESULT. "Ruchika lived longer than her initial
 *      prognosis, but she eventually passed away" is in the copy as supplied
 *      and must stay whole. Dropping the second clause would turn a
 *      dedication into a survival claim — exactly what §7 of the draft and
 *      checklist item 30 forbid.
 *   3. ARPAN TALWAR AND DR. MANDEEP SINGH MALHOTRA ARE NAMED as supplied.
 *      Dr. Malhotra is already on the home page roster as Chief Mentor, so
 *      the two records must not drift.
 *
 * Gurudev Sri Sri Ravi Shankar and Art of Living are named as the source of
 * the blessing and the name. That is a factual statement about a third party
 * and is reproduced exactly as given — it must not be expanded into any
 * suggestion of endorsement, affiliation or clinical involvement.
 */

export const about: AboutContent = {
  hero: {
    title: 'Our Purpose, Our Story, Our Commitment',
    standfirst:
      'At Art of Healing Cancer (AOHC), we recognise that every cancer journey is different. Each patient has a unique medical history, diagnosis, treatment experience, personal priorities, and concerns about the future.',
    body: [
      'Our approach centres on understanding the individual behind the diagnosis, considering relevant medical information, and supporting informed discussions about appropriate cancer-care options.',
      'Our story began with a personal experience that became a broader purpose: helping patients and families navigate the complexities of cancer care with compassion, clarity, and thoughtful consideration.',
    ],
    /**
     * The building, which is the one photograph in the repo that is actually
     * of AOHC rather than a stock model — the right image for the page that
     * introduces the organisation.
     */
    image: {
      src: '/AOHC.jpeg',
      alt: 'The Art of Healing Cancer building, with the AOHC sign on its facade',
      width: 1122,
      height: 1402,
    },
  },

  story: {
    eyebrow: 'The story behind AOHC',
    parts: [
      {
        title: 'A Personal Journey That Became a Purpose',
        body: [
          "The story of Art of Healing Cancer began with Ruchika Jaiswal's journey with stage IV cancer.",
          'Her experience became the inspiration behind AOHC. Her husband, Arpan Talwar, and Dr. Mandeep Singh Malhotra explored cancer-care options during her journey, seeking ways to address the disease, extend life where possible, and support quality of life.',
          'Their experience brought into focus the difficult questions that patients and families face when navigating cancer: understanding the diagnosis, exploring treatment possibilities, evaluating different approaches, and making decisions amid uncertainty.',
          'With the blessings of Gurudev Sri Sri Ravi Shankar, AOHC came into being. The name Art of Healing Cancer was inspired by Art of Living.',
          /* ⚠️  Both clauses. See the note at the top of this file. */
          'Ruchika lived longer than her initial prognosis, but she eventually passed away. AOHC is dedicated to the patient community in her memory.',
          "Her journey remains central to the organisation's founding story—not as a promise of a particular treatment outcome, but as the personal experience that inspired a commitment to supporting others affected by cancer.",
        ],
      },
      {
        title: 'From Personal Experience to a Broader Purpose',
        body: [
          'A cancer diagnosis affects more than the body. It can bring emotional uncertainty, complex medical information, difficult treatment decisions, and significant challenges for families and caregivers.',
          "Inspired by Ruchika's journey, AOHC's purpose is rooted in the importance of seeing the person behind the diagnosis and considering each patient's circumstances with care.",
          "Every patient's journey is different. Understanding the available information, discussing treatment options with qualified healthcare professionals, and recognising both the possibilities and limitations of medicine are essential parts of informed decision-making.",
          "Ruchika's story is where AOHC's story began. Her memory continues to give meaning to its dedication to the patient community.",
        ],
      },
    ],
    dedication: 'AOHC is dedicated to the patient community in her memory.',
    /**
     * AN IN-PAGE JUMP, NOT `routes.memorial`.
     *
     * The dedicated memorial page is not built yet — `routes.ts` is explicit
     * that everything but `/` still 404s — and the memorial section lower
     * down this page is the thing this link is promising. When
     * `/about-us/in-loving-memory-of-ruchika-jaiswal` ships, point this at
     * `routes.memorial` instead.
     */
    cta: { label: 'Read In Loving Memory of Ruchika Jaiswal', href: '#in-memory' },
    /**
     * Arpan Talwar, who the first passage names in its second sentence.
     *
     * THE ONE REAL PERSON THIS SECTION CAN SHOW. It replaced a stock shot of
     * two anonymous hands, which was standing in for a story about named
     * people. Ruchika's own portrait is not used here — it belongs to the
     * memorial, and using it twice on one page would spend it.
     *
     * ⚠️  IT IS CAPTIONED, AND THE CAPTION IS NOT DECORATION. An uncaptioned
     * face beside "The story of Art of Healing Cancer began with Ruchika
     * Jaiswal's journey" is read as Ruchika. The wording below is taken from
     * the supplied copy — "Her husband, Arpan Talwar" — and no title is
     * invented for him beyond it.
     */
    image: {
      src: '/team-arpan-talwar.jpg',
      alt: 'Arpan Talwar',
      width: 460,
      height: 460,
    },
    imageCaption: "Arpan Talwar, Ruchika's husband",
  },

  purpose: {
    eyebrow: 'Our purpose',
    title: 'Keeping the Patient at the Centre of Care',
    intro: [
      'Our purpose is to support patients and families as they navigate cancer-related decisions, understand relevant medical information, and explore appropriate care options.',
      "Cancer care can involve multiple specialists, investigations, treatment approaches, and follow-up requirements. Understanding how these elements relate to an individual patient's circumstances can help make complex discussions clearer.",
      'We aim to encourage a thoughtful approach that considers:',
    ],
    items: [
      "The patient's diagnosis and disease characteristics",
      'Medical history and previous treatment',
      'Relevant pathology, imaging, laboratory, and molecular findings',
      'Treatment goals, potential risks, and expected benefits',
      'Symptoms, treatment tolerance, and quality of life',
      "The patient's questions, preferences, and priorities",
    ],
    outro:
      'Our purpose is to support informed discussions and responsible decision-making, while recognising that clinical recommendations must be made by appropriately qualified healthcare professionals.',
    /**
     * The hands, moved here from the story section when that section got a
     * photograph of a real person instead. It belongs against "Keeping the
     * Patient at the Centre of Care" rather better than it ever did against
     * a founding story about two named people.
     */
    image: {
      src: '/images/card-supportive.jpg',
      alt: 'Two people sitting together, one hand resting on another',
      width: 1000,
      height: 563,
    },
  },

  philosophy: {
    eyebrow: 'Our philosophy',
    title: 'Integrative, Individualised, and Patient-Centred',
    intro: 'Our philosophy is guided by three central principles.',
    principles: [
      {
        title: 'The Patient Comes First',
        body: [
          'Every patient has a different medical history, current condition, set of concerns, and treatment goals.',
          "Care discussions should consider the patient's circumstances, preferences, safety, and quality of life rather than relying solely on a broad diagnosis label.",
          'We believe patients and families should have opportunities to ask questions, understand their options, and participate in decisions about their care.',
        ],
      },
      {
        title: 'Different Approaches Must Be Considered Carefully',
        body: [
          'Conventional oncology remains central to evidence-based cancer treatment. Depending on the diagnosis, this may include surgery, radiotherapy, chemotherapy, immunotherapy, targeted therapy, hormone therapy, or other specialist treatments.',
          'Where appropriate, supportive and integrative approaches may also be considered as part of a broader care plan.',
          'Each proposed intervention should be evaluated for its evidence, suitability, risks, potential interactions, and limitations. Complementary approaches should not be assumed to be effective cancer treatments or used to replace prescribed treatment without appropriate clinical guidance.',
        ],
      },
      {
        title: 'Decisions Should Be Informed by Relevant Evidence',
        body: [
          'Medical decisions may draw on pathology reports, imaging, laboratory investigations, previous treatment responses, molecular findings, and other relevant information.',
          'However, no single test can answer every clinical question. Test results must be interpreted in context, and additional testing should be considered when it may meaningfully inform a clinical decision.',
          'We believe that clear explanations of evidence, uncertainty, and available options are important to responsible cancer care.',
        ],
      },
    ],
  },

  personalised: {
    eyebrow: 'Why a personalised approach matters',
    title: 'Because Every Cancer Journey Is Different',
    body: [
      'Two people with the same broad cancer diagnosis may have different disease characteristics, medical histories, treatment responses, side effects, and personal priorities.',
      'The appropriate treatment approach may therefore differ from one patient to another.',
      'A careful review of relevant medical information can help identify unanswered questions, clarify the significance of test results, and support discussions about the options available.',
      'A personalised approach does not mean that every patient will have a unique medicine, that an alternative treatment will be effective, or that a particular outcome can be guaranteed.',
      "It means considering each case in its own clinical context and making decisions with the best available evidence, qualified clinical judgement, and the patient's individual needs in mind.",
    ],
    considerTitle: 'What May Be Considered?',
    considerIntro:
      "Depending on the patient's circumstances, a clinical discussion may consider:",
    items: [
      {
        icon: 'stethoscope',
        label: 'Diagnosis and disease characteristics',
        description:
          'Understanding the confirmed diagnosis, stage, pathology, and other relevant findings.',
      },
      {
        icon: 'clock',
        label: 'Previous treatment experience',
        description:
          'Reviewing previous therapies, responses, side effects, and reasons for changing or discontinuing treatment.',
      },
      {
        icon: 'file-search',
        label: 'Relevant diagnostic information',
        description:
          'Considering imaging, laboratory results, and molecular or genomic findings where clinically appropriate.',
      },
      {
        icon: 'scale',
        label: 'Overall health and treatment tolerance',
        description:
          'Taking account of symptoms, organ function, other medical conditions, current medicines, and treatment-related difficulties.',
      },
      {
        icon: 'target',
        label: 'Patient goals and priorities',
        description:
          "Discussing the purpose of treatment, quality of life, practical considerations, and the patient's preferences.",
      },
    ],
    outro:
      'The relevance of each factor depends on the individual case and should be assessed by qualified healthcare professionals.',
    /**
     * Breaks up the longest unbroken stretch of prose on the page — five
     * paragraphs of argument followed by a seven-item list, with nothing to
     * look at between them.
     *
     * A consultation rather than a procedure, because this section is about
     * the conversation: "discussing treatment options with qualified
     * healthcare professionals" is what the copy either side of it says.
     */
    image: {
      src: '/images/scan-discussion.jpg',
      alt: 'A patient seated at a desk while a scan is displayed on a laptop beside them',
      width: 1400,
      height: 788,
    },
  },

  process: {
    eyebrow: 'Our approach to cancer-care discussions',
    title: 'Understand. Review. Discuss. Plan.',
    intro:
      'A structured process can help patients and families understand what information is available and what questions need to be addressed.',
    steps: [
      {
        title: "Understand the Patient's Situation",
        description:
          "Begin with the diagnosis, medical history, previous treatment, current symptoms, and the patient's primary concerns.",
      },
      {
        title: 'Review Relevant Information',
        description:
          'Consider the available medical records, including pathology, imaging, laboratory results, and other investigations relevant to the clinical question.',
      },
      {
        title: 'Discuss Appropriate Options',
        description:
          'Explore available options with qualified clinicians, considering evidence, expected benefits, risks, alternatives, and uncertainties.',
      },
      {
        title: 'Clarify the Next Steps',
        description:
          "Establish what further assessment, treatment discussion, monitoring, or follow-up may be needed, based on the responsible clinician's recommendations.",
      },
    ],
    note: "The exact process and services available depend on AOHC's confirmed operating model and the clinical providers involved.",
  },

  commitment: {
    eyebrow: 'Our commitment to patients and families',
    title: 'Care Should Be Thoughtful, Transparent, and Respectful',
    intro:
      'We recognise that patients and families may be navigating difficult decisions during a challenging time. Clear communication and realistic expectations are important. Our intended approach is guided by the following commitments.',
    items: [
      {
        icon: 'info',
        label: 'Clarity',
        description:
          'Helping patients understand the purpose of investigations, the meaning of relevant findings, and the questions that need to be addressed.',
      },
      {
        icon: 'user',
        label: 'Individual Consideration',
        description:
          "Recognising each patient's medical circumstances, previous treatment experience, needs, and priorities.",
      },
      {
        icon: 'users',
        label: 'Collaboration',
        description:
          "Supporting communication with the patient's existing healthcare professionals where appropriate, available, and authorised.",
      },
      {
        icon: 'scale',
        label: 'Evidence-Conscious Decisions',
        description:
          'Distinguishing established treatment options from emerging research, off-label use, and interventions whose benefits remain uncertain.',
      },
      {
        icon: 'shield-check',
        label: 'Safety',
        description:
          'Considering potential risks, medication interactions, contraindications, side effects, and monitoring requirements.',
      },
      {
        icon: 'file-search',
        label: 'Transparency',
        description:
          'Explaining the scope of available services, associated costs, limitations, and the responsibilities of the professionals involved.',
      },
      {
        icon: 'heart',
        label: 'Respect and Dignity',
        description:
          'Treating patients and families with compassion while respecting privacy, informed choices, and individual circumstances.',
      },
    ],
    note: 'These principles describe the standard of care-related communication AOHC aims to uphold. Specific services and responsibilities should be confirmed before they are represented as operational offerings.',
  },

  /**
   * ⚠️  PROSE, NOT A LIST OF CARDS, AND DELIBERATELY SO.
   *
   * The home page carries a four-item version of this material. Here it is
   * left as the supplied paragraphs: breaking "we do not promise a cure, a
   * particular survival period, a guaranteed treatment response…" into
   * separate tiles turns a single careful sentence into a set of slogans, and
   * the qualifications in it are the whole point.
   */
  honesty: {
    eyebrow: 'What we do not promise',
    title: 'Honest Expectations Matter',
    lead:
      'AOHC does not promise a cure, a particular survival period, a guaranteed treatment response, freedom from side effects, or prevention of recurrence.',
    body: [
      'Cancer is complex, and outcomes vary according to many factors, including the diagnosis, disease stage, tumour characteristics, previous treatment, overall health, and individual response.',
      'AOHC does not promise a cure, a particular survival period, a guaranteed treatment response, freedom from side effects, or prevention of recurrence.',
      'We also recognise that a promising test result or a proposed treatment does not automatically mean that an effective or suitable treatment is available.',
      'Patients should receive clear information about the evidence, possible benefits, risks, uncertainties, and alternatives associated with any proposed intervention.',
      'We do not encourage patients to stop, delay, or replace prescribed cancer treatment based on website information or unverified claims. Decisions about treatment changes should be discussed with the treating oncologist or another appropriately qualified healthcare professional.',
      'Our commitment is to support thoughtful, informed discussions—not to offer unrealistic promises.',
    ],
  },

  memorial: {
    eyebrow: 'In loving memory of Ruchika Jaiswal',
    title: 'The Inspiration Behind Our Beginning',
    body: [
      "Ruchika Jaiswal's journey remains an integral part of AOHC's identity.",
      'Her experience inspired the organisation’s beginnings and continues to remind us that every cancer diagnosis belongs to a person with relationships, hopes, concerns, and individual priorities.',
      'AOHC is dedicated to the patient community in her memory.',
      "Her story is a reminder of why compassion, honest communication, and respect for each patient's circumstances matter throughout the cancer-care journey.",
    ],
    /**
     * ⚠️  THIS LINK 404s TODAY. `/about-us/in-loving-memory-of-ruchika-jaiswal`
     * is in `routes` but has no page yet, which `routes.ts` says is expected
     * during build-out. It is kept pointing at the real path rather than
     * swapped for a placeholder so that the page, once written, needs no
     * edit here — but it should ship before this page goes live.
     */
    cta: { label: 'Read Her Story', href: routes.memorial },
    /**
     * RUCHIKA JAISWAL, SUPPLIED BY AOHC. The only photograph of a named
     * patient anywhere in this repo, and the only image that may ever sit
     * here — see rule 1 at the top of this file.
     *
     * IT ARRIVES ALREADY FRAMED, in a gold memorial surround on a white
     * ground, so it is shown whole rather than cropped: the surround is how
     * the family presented her and cutting the portrait out of it would be
     * taking that decision away from them. The white ground is why
     * `MemorialPanel` sets it on an ivory plate instead of straight onto the
     * dark band, where it would have read as a white rectangle.
     *
     * 500x402 is small. It is sized to display at roughly half that, which
     * it carries comfortably, and it must not be scaled up — ask AOHC for
     * the original before using it any larger. Its EXIF and XMP were
     * stripped when it was brought into the repo; it is a private person's
     * photograph and carried no business being shipped with camera metadata.
     */
    image: {
      src: '/images/ruchika-jaiswal.webp',
      alt: 'Ruchika Jaiswal, in a gold memorial frame',
      width: 500,
      height: 402,
    },
    /*
     * No `imageCaption` here on purpose: the eyebrow immediately beneath the
     * portrait reads "In loving memory of Ruchika Jaiswal", which names her
     * more gracefully than a caption repeating it. If that eyebrow is ever
     * reworded so it no longer carries her name, add one back.
     */
  },

  continuing: {
    eyebrow: 'Our continuing purpose',
    title: 'Supporting Patients Through Difficult Questions',
    body: [
      'A cancer diagnosis can leave patients and families facing questions that are difficult to answer alone.',
      'Understanding the diagnosis, organising medical information, exploring available options, and discussing concerns with qualified healthcare professionals can help patients approach these decisions with greater clarity.',
      'Inspired by the personal journey behind AOHC, we remain focused on the importance of the individual behind every diagnosis.',
      'Every patient’s circumstances are different. Every treatment decision deserves careful consideration.',
    ],
  },

  closing: {
    eyebrow: 'Learn more about your options',
    title: 'Every Case Begins With Understanding the Patient',
    body: [
      'If you or a loved one is exploring cancer-care options, you can contact AOHC to learn about the enquiry process and ask which consultations or services may be available for your circumstances.',
      'Our team can explain the next steps and the information that may be needed to assess your enquiry.',
    ],
    primaryCta: { label: APPOINTMENT_CTA, href: routes.consultation },
    secondaryCta: { label: 'Contact AOHC', href: routes.contact },
    note: 'Submitting an enquiry does not guarantee acceptance for consultation, eligibility for a particular treatment, or a specific clinical outcome.',
    image: {
      src: '/images/consultation-room.jpg',
      alt: 'A clinician and a patient talking across a desk in a consulting room',
      width: 1400,
      height: 788,
    },
  },

  disclaimer: {
    title: 'Medical Disclaimer',
    body: [
      "The information on this page is provided for general educational purposes and is not a substitute for individual medical advice, diagnosis, or treatment. Cancer-care decisions should be made in consultation with appropriately qualified healthcare professionals who understand the patient's clinical circumstances.",
      'Do not stop, delay, or change prescribed treatment based solely on information on this website.',
    ],
  },
}
