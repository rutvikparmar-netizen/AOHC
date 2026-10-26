import type { HomeContent } from '@/types'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

/**
 * HOME PAGE COPY
 * ----------------------------------------------------------------------------
 * Taken from section 1 of the AOHC Website Content Master Draft. Wording is
 * the draft's, not rewritten, because the draft's status line says it is
 * pending clinical, operational, legal and editorial review — paraphrasing it
 * here would mean reviewers sign off on text the site does not actually show.
 *
 * ⚠️  ONE DELIBERATE DEPARTURE FROM THE REFERENCE DESIGN.
 *
 * The layout this page is modelled on carries a headline-statistics band:
 * "98% satisfied patients · 50K+ healthy smiles · 4.9 average rating · 15+
 * years". There is no AOHC equivalent, and inventing one would contradict the
 * draft directly — section 7 ("What We Do Not Promise"), and checklist item 30
 * ("Avoid guarantees of cure, survival, response, or treatment success").
 *
 * That slot therefore carries the honest-expectations content instead. It
 * keeps the visual rhythm of four items and says something true. If the
 * practice later has figures it can evidence — patients reviewed, years in
 * operation — they belong there with a stated basis, never as round numbers
 * chosen because they look good.
 */

export const home: HomeContent = {
  hero: {
    eyebrow: 'Personalized, integrative cancer care',
    title: 'A More Personalized Approach to Cancer Care',
    standfirst:
      'Bringing together oncology, patient-specific information, and integrative care to help inform individual treatment decisions.',
    body: [
      'Every cancer journey is different. The diagnosis, disease biology, previous treatments, response to therapy, side effects, overall health, and personal priorities can all influence the next steps in care.',
      'At Art of Healing Cancer (AOHC), our approach is built around understanding the individual behind the diagnosis.',
    ],
    primaryCta: { label: 'Request a Consultation', href: routes.consultation },
    secondaryCta: { label: 'Understand Our Approach', href: routes.integrativeCare },
    /**
     * STOCK PHOTOGRAPHY, AND THE ALT TEXT SAYS SO BY SAYING NOTHING.
     *
     * Every image on this page is an Unsplash stock photograph of models, not
     * AOHC staff, patients or premises. The alt text therefore describes the
     * SCENE and never names or implies a role at AOHC — "two clinicians", not
     * "our specialists". Captioning a stock model as a member of the team
     * would be a straightforward misrepresentation on a page where checklist
     * item 25 requires every clinician's identity to be verified.
     *
     * Replace these with real photography of the actual team and premises
     * before launch, and the alt text can then name people properly.
     */
    image: {
      /**
       * ⚠️  TODO — REPLACE WITH A REAL PHOTOGRAPH of the AOHC team.
       *
       * Stock, and chosen for the dark hero card: it is already backlit and
       * low-key, so the left-to-right scrim has something to work with and
       * the headline stays legible. `object-[62%_center]` in `Hero.tsx`
       * keeps the film itself clear of the text.
       *
       * Worth saying plainly when the real shoot is briefed: a close-up of a
       * brain scan is a confronting first image for someone who has just
       * been diagnosed. A photograph of the team with a patient would do the
       * same job more kindly — `consultation-room.jpg` is in the repo if you
       * want to try that instead.
       */
      src: '/images/records-review.jpg',
      alt: 'Two clinicians holding a brain MRI film up to the light and discussing it',
      width: 1400,
      height: 788,
    },
  },

  /**
   * From section 4, "Cancer Types We May Be Asked to Review".
   *
   * The draft is explicit that these are navigation and educational landing
   * pages, and that a clinical service page is published "only after
   * confirming that the team accepts and assesses that cancer type". They are
   * shortcuts here, not an offer.
   */
  cancerTypes: [
    { label: 'Breast', slug: 'breast-cancer' },
    { label: 'Ovarian', slug: 'ovarian-cancer' },
    { label: 'Brain tumours', slug: 'brain-tumours' },
    { label: 'Colorectal', slug: 'colorectal-cancer' },
    { label: 'Lung', slug: 'lung-cancer' },
    { label: 'Prostate', slug: 'prostate-cancer' },
    { label: 'Pancreatic', slug: 'pancreatic-cancer' },
    { label: 'Liver', slug: 'liver-cancer' },
    { label: 'Blood cancers', slug: 'blood-cancers' },
  ],

  individual: {
    eyebrow: 'Cancer care that starts with the individual',
    title: 'One Diagnosis Does Not Tell the Whole Story',
    intro: [
      'A cancer diagnosis provides essential information, but it may not answer every question about an individual patient’s treatment options.',
      'Important considerations may include:',
    ],
    items: [
      'The type, stage, and location of the cancer.',
      'The findings from pathology, imaging, and molecular tests.',
      'Treatments already received and how the cancer responded.',
      'Side effects, treatment tolerance, and other health conditions.',
      'Whether additional testing could help inform a clinical decision.',
      "The patient's priorities, quality of life, and practical circumstances.",
    ],
    outro:
      "We consider these factors together to support a more complete understanding of each case. Recommendations depend on the available evidence, the patient's condition, and the assessment of the treating clinical team.",
    image: {
      src: '/images/scan-discussion.jpg',
      alt: 'A patient seated at a desk while a scan is displayed on a laptop beside them',
      width: 1400,
      height: 788,
    },
  },

  approach: {
    eyebrow: 'Our approach to integrative cancer care',
    title: 'Connecting Different Perspectives Around One Patient',
    intro:
      'We aim to consider conventional oncology alongside appropriate integrative and supportive approaches. Depending on the individual case, the clinical discussion may involve:',
    pillars: [
      {
        icon: 'stethoscope',
        title: 'Conventional oncology',
        description:
          'Established cancer treatments, such as surgery, chemotherapy, radiation therapy, targeted therapy, hormonal therapy, and immunotherapy, where clinically appropriate.',
        href: routes.treatments,
        /**
         * Abstract detail shots, not treatment photographs, across all four.
         *
         * Literal pictures of people receiving cancer treatment are
         * confronting for the audience most likely to be reading — and the
         * stock sets of them are largely NIH/NCI releases carrying visible
         * institutional branding, which would imply an affiliation AOHC does
         * not have. Detail imagery sidesteps both problems.
         */
        image: {
          src: '/images/card-infusion.jpg',
          alt: 'An intravenous line against a softly blurred window',
          width: 1000,
          height: 667,
        },
      },
      {
        icon: 'file-search',
        title: 'Precision and molecular information',
        description:
          'Relevant pathology, molecular profiling, genomic findings, and other diagnostic information that may help clinicians understand a tumour and evaluate treatment options.',
        href: routes.treatments,
        image: {
          src: '/images/card-molecular.jpg',
          alt: 'A pipette dispensing into a tray of sample tubes',
          width: 1000,
          height: 667,
        },
      },
      {
        icon: 'message-circle',
        title: 'Supportive and integrative care',
        description:
          'Appropriate measures to support symptom management, nutrition, physical function, emotional well-being, and quality of life alongside cancer treatment.',
        href: routes.integrativeCare,
        image: {
          src: '/images/card-supportive.jpg',
          alt: 'Two people sitting together, one hand resting on another',
          width: 1000,
          height: 563,
        },
      },
      {
        icon: 'target',
        title: 'Individualized treatment planning',
        description:
          'A structured review of the patient’s current condition, previous treatments, treatment goals, potential risks, and available options.',
        href: routes.patientJourney,
        image: {
          src: '/images/tablet-explanation.jpg',
          alt: 'A clinician holding a tablet while talking with a colleague',
          width: 1400,
          height: 933,
        },
      },
    ],
    outro:
      "Not every treatment or test is appropriate for every patient. We aim to evaluate options based on clinical relevance, evidence, safety, feasibility, and the patient's informed preferences.",
  },

  /**
   * THE FOUR STEPS AND THEIR SUB-POINTS ARE FROM THE LIVE SITE
   * (artofhealingcancer.com → "OUR PROCESS"), not from the content draft.
   *
   * The draft's §1 has a five-step sequence written in cautious, conditional
   * language; the live site has these four, written as capability claims
   * ("We identify the unique molecular signature of your cancer"). They
   * describe the same service at different confidence levels.
   *
   * The live wording is used because it is what the organisation currently
   * publishes about itself, and a redesign should not quietly downgrade the
   * client's own positioning. The tension is real though, and belongs in the
   * review the draft calls for — see the note in the README.
   */
  process: {
    eyebrow: 'Our process',
    title: 'Our Integrative Cancer Treatment Approach',
    intro:
      'We combine precision diagnostics, multi-modal therapies, and long-term prevention for deeply personalized care.',
    /**
     * ⚠️  THE FOUR IMAGES ARE STOCK AND SHOULD BE REPLACED.
     *
     * They are the abstract clinical shots already in this repo, chosen so
     * each one is at least honest about the stage it sits beside — sample
     * tubes against sequencing, a scan being discussed against monitoring.
     * None of them is a photograph of AOHC, its centre or its team, and the
     * section will be much stronger when it is.
     *
     * The same reasoning as the approach cards applies to what replaces them:
     * literal pictures of people receiving cancer treatment are confronting
     * for the audience most likely to be reading, and the stock sets of them
     * are largely NIH/NCI releases carrying visible institutional branding,
     * which would imply an affiliation AOHC does not have.
     */
    steps: [
      {
        title: 'Decode the Disease',
        description:
          'We identify the unique molecular signature of your cancer to guide precise, personalized treatment.',
        points: [
          'Comprehensive tumor DNA/RNA sequencing',
          'Liquid biopsy & circulating tumor cell (CTC) analysis',
          'Identification of resistance mutations and actionable biomarkers',
        ],
        image: {
          src: '/images/card-molecular.jpg',
          alt: 'A pipette dispensing into a tray of sample tubes',
          width: 1000,
          height: 667,
        },
      },
      {
        title: 'Build Your Personalized Protocol',
        description:
          'We design an individualized treatment roadmap combining evidence-based conventional and integrative approaches.',
        points: [
          'Precision-aligned conventional oncology therapies',
          'Integrative, functional medicine for better outcomes',
          'Off-label and molecularly targeted strategies to overcome resistance',
        ],
        image: {
          src: '/images/tablet-explanation.jpg',
          alt: 'A clinician holding a tablet while talking with a colleague',
          width: 1400,
          height: 933,
        },
      },
      {
        title: 'Multidisciplinary, Monitored Care',
        description:
          'Experience real-time, personalized care guided by a compassionate and expert team focused on you.',
        points: [
          'Healing-focused environment that supports body and mind',
          'Ongoing monitoring of clinical markers & imaging',
          'Adaptive treatment adjustments by a collaborative care team',
        ],
        image: {
          src: '/images/scan-discussion.jpg',
          alt: 'A patient seated at a desk while a scan is displayed on a laptop beside them',
          width: 1400,
          height: 788,
        },
      },
      {
        title: 'Long Term Recurrence Prevention',
        description:
          'Ongoing support beyond remission, safeguarding your health, recovery, and long-term wellbeing every step forward.',
        points: [
          'Customized nutraceuticals and evidence-based nutrition plans',
          'Stress relief, better sleep and lifestyle coaching',
          'Regular diagnostic monitoring through labs and imaging surveillance',
        ],
        image: {
          src: '/images/card-supportive.jpg',
          alt: 'Two people sitting together, one hand resting on another',
          width: 1000,
          height: 563,
        },
      },
    ],
    cta: { label: 'Request an Appointment', href: routes.consultation },
  },

  /**
   * ⚠️  THESE FOUR FIGURES ARE PUBLISHED ON THE LIVE SITE TODAY. They are not
   * invented here — earlier in this build the statistics band was left out
   * precisely because there were none to use.
   *
   * They are nonetheless outcome claims about cancer treatment, and they sit
   * directly against the content draft: §7 "What We Do Not Promise" and
   * checklist item 30, "Avoid guarantees of cure, survival, response, or
   * treatment success". `basis` is blank on every one because no source was
   * supplied with them.
   *
   * The component renders the footnote whenever a `basis` is missing, so the
   * gap is visible on the page rather than buried here. Fill each `basis`
   * with the study, audit or internal dataset it comes from, or remove the
   * figure — those are the two honest options.
   */
  stats: {
    items: [
      { value: '78%', label: 'See tumor shrinkage within 90 days', basis: '' },
      { value: '80%', label: 'Report fewer side effects vs standard treatment', basis: '' },
      { value: '92%', label: 'Stick to care plans with personalized support', basis: '' },
      { value: '85%', label: 'Stay cancer-free 2 years post-treatment', basis: '' },
    ],
    footnote: '',
  },

  complexJourney: {
    eyebrow: 'Support for complex cancer journeys',
    title: 'When the Next Step Is Not Clear',
    intro: [
      'Patients and families may seek another opinion when cancer has progressed, treatment has stopped working, side effects have become difficult to manage, or several options are being considered.',
      'A review may help clarify:',
    ],
    items: [
      'What the current medical records show.',
      'Which treatment options may be appropriate to discuss.',
      'Whether additional diagnostic information could be useful.',
      'Which risks or symptoms require urgent attention.',
      'What questions should be addressed with the treating oncologist.',
    ],
    outro:
      'A consultation cannot guarantee that another treatment will be available or effective. The purpose is to support a clearer understanding of the available choices.',
  },

  international: {
    eyebrow: 'Support for patients from around the world',
    title: 'Care Coordination Across Borders',
    body: [
      'Patients and families may need help organizing records, understanding the consultation process, coordinating appointments, and preparing questions for their clinical team.',
      'AOHC aims to make the process clearer for patients seeking care from outside India. The availability of remote consultations, in-person assessments, travel assistance, and other services must be confirmed with our team before arrangements are made.',
    ],
    /** The same copy, broken into three steps so it can be scanned. */
    steps: [
      {
        title: 'Send an enquiry',
        description:
          'Tell us your country, the diagnosis and what you would like to discuss. Do not attach records yet.',
      },
      {
        title: 'Share records securely',
        description:
          'If a review looks appropriate, the team sends you a secure channel and says exactly which documents are needed.',
      },
      {
        title: 'Plan the visit',
        description:
          'Consultation arrangements, travel assistance and accommodation are confirmed with you before anything is booked.',
      },
    ],
    cta: { label: 'International Patient Enquiry', href: routes.internationalEnquiry },
    image: {
      src: '/images/consultation-room.jpg',
      alt: 'A clinician and a patient talking across a desk in a consulting room',
      width: 1400,
      height: 788,
    },
  },

  /* See the ⚠️ note at the top of this file. */
  honesty: {
    eyebrow: 'What we do not promise',
    title: 'Honest Expectations Matter',
    intro:
      'Cancer is complex, and outcomes vary according to many factors, including the diagnosis, disease stage, tumour characteristics, previous treatment, overall health, and individual response.',
    items: [
      {
        icon: 'shield-check',
        title: 'No guaranteed outcome',
        description:
          'AOHC does not promise a cure, a particular survival period, a guaranteed treatment response, freedom from side effects, or prevention of recurrence.',
      },
      {
        icon: 'file-search',
        title: 'A test result is not a treatment',
        description:
          'A promising test result or a proposed treatment does not automatically mean that an effective or suitable treatment is available.',
      },
      {
        icon: 'scale',
        title: 'Evidence stated plainly',
        description:
          'Patients should receive clear information about the evidence, possible benefits, risks, uncertainties, and alternatives associated with any proposed intervention.',
      },
      {
        icon: 'alert-triangle',
        title: 'Never stop treatment on our say-so',
        description:
          'We do not encourage patients to stop, delay, or replace prescribed cancer treatment based on website information. Discuss any change with your treating oncologist.',
      },
    ],
  },

  closing: {
    eyebrow: 'Start with a conversation',
    title: 'Your Medical History Matters',
    body: [
      'If you or someone you care for has received a cancer diagnosis and would like to understand the available options, you can contact AOHC to discuss the next steps.',
      'Please share medical information only through the secure channel provided by our team.',
    ],
    primaryCta: { label: 'Request a Consultation', href: routes.consultation },
    secondaryCta: { label: 'Contact Our Team', href: routes.contact },
    note: 'A consultation request does not establish a doctor–patient relationship or guarantee acceptance for treatment.',
    /**
     * No image, deliberately. The closing panel runs on brand colour so the
     * last thing before the footer is the call to action itself rather than
     * another stock photograph — by that point in the page there have been
     * six.
     */
  },

  /* ========================================================================
     LIVE-SITE SECTIONS
     ------------------------------------------------------------------------
     Everything below is transcribed from artofhealingcancer.com as it stands
     today. None of it appears in the content draft, which describes a more
     cautious home page — so these sections carry the organisation's current
     public voice rather than the draft's reviewed one.

     ⚠️  LOGOS, THUMBNAILS AND LINKS ARE ABSENT. Press mastheads,
     accreditation marks, video stills and article URLs are assets that have
     to come from the client; none could be recreated here without
     fabricating a third party's branding. Every component below renders a
     typographic fallback when the asset is missing, so the layout is
     complete and the gaps are obvious rather than hidden.
     ====================================================================== */

  /**
   * PRESS — WHERE EACH NAME CAME FROM.
   *
   * This is a factual claim about third parties, so provenance is recorded
   * per entry rather than for the list as a whole.
   *
   *   • The first five are named outright in the live site's own "Artofhealing
   *     In The News" section.
   *
   *   • Hindustan Times and NDTV appear as logos in the strip near the top of
   *     the live home page, which is not labelled as coverage. They are
   *     included because they sit on AOHC's own site in what reads as an
   *     as-seen-in strip — but that inference is mine, so ⚠️ CONFIRM BOTH, or
   *     delete them.
   *
   *   • The last two are verified articles; the URLs below were read, not
   *     assumed. Note that The Industry Outlook piece is editorial coverage,
   *     NOT an award — see the note on `heroTrust` for why that distinction
   *     mattered here.
   *
   * ⚠️  No outlet may be added to this list without a link or a published
   * reference. A masthead on a cancer clinic's home page asserts that the
   * paper wrote about them.
   */
  press: [
    { name: 'The Times of India' },
    { name: 'Zee News' },
    { name: 'Business Today' },
    { name: 'India Today' },
    { name: 'India TV' },
    { name: 'Hindustan Times' },
    { name: 'NDTV' },
    {
      name: 'The Industry Outlook',
      href: 'https://www.theindustryoutlook.com/startups/vendor/art-of-healing-cancer-a-dedicated-initiative-towards-treating-advanced-cancers--cid-8123.html',
    },
    {
      name: 'India Pharma Outlook',
      href: 'https://www.indiapharmaoutlook.com/manufacturing/vendor/art-of-healing-cancer-a-dedicated-initiative-towards-treating-advanced-cancers-cid-1404.html',
    },
  ],

  /**
   * HERO TRUST BAR
   *
   * ⚠️  WHAT WAS ASKED FOR AND WHY IT IS NOT HERE.
   *
   * The brief named two example items: an "Industry Outlook 2023 Award" and
   * "trusted for 15 years". Neither could be substantiated:
   *
   *   • There is no Industry Outlook award. The Industry Outlook published a
   *     feature ABOUT AOHC — it is in the press list above. A feature article
   *     is not a prize, and printing it as one on a cancer clinic's home page
   *     is the kind of claim that does not survive being checked.
   *
   *   • The live site makes no years-in-operation claim anywhere, and nothing
   *     published gives a founding date. "15 years" would have been a number
   *     chosen because it looks good — exactly what the note at the top of
   *     this file rules out.
   *
   * What is here instead is every trust signal AOHC already publishes about
   * itself. If there IS an award, add it with the awarding body and the year
   * and it belongs in this bar; `href` is there for the citation.
   */
  heroTrust: [
    { icon: 'shield-check', label: 'Accredited by RGCC Labs, Greece' },
    { icon: 'hospital', label: 'Affiliated with CK Birla Hospital' },
    { icon: 'award', label: 'NABH-accredited partner clinics' },
  ],

  whoWeAre: {
    eyebrow: 'Who we are',
    title: 'Pioneers in Integrative & Precision Oncology',
    body: [
      /**
       * ⚠️  "India's first and largest" is a superlative competitive claim.
       * It is the organisation's own live copy and is reproduced verbatim,
       * but it is the kind of statement that needs substantiation to survive
       * a challenge — checklist item 28 of the content draft covers exactly
       * this. Flagged, not altered.
       */
      'Art of Healing Cancer (AOHC) is India’s first and largest center for integrative and precision oncology, redefining cancer treatment by blending cutting-edge science with compassionate, whole person care.',
      'We specialize in delivering deeply personalized protocols that integrate genomic and molecular diagnostics with conventional oncology and evidence-based natural therapies. Every treatment we design is tailored to the unique genetic profile of the patient’s cancer — not just the type of cancer.',
      'Our team of surgical, medical, and molecular oncologists works in close collaboration to provide outcome-driven, affordable, and compassionate care to both Indian and international patients.',
    ],
    cta: { label: 'More About Us', href: routes.about },
    image: {
      src: '/AOHC.jpeg',
      alt: 'The Art of Healing Cancer building, with the AOHC sign on its facade',
      width: 1122,
      height: 1402,
    },
  },

  whoWeServe: {
    eyebrow: 'Who we serve',
    title: 'Care for Every Cancer Journey',
    intro: 'We help patients across all stages and types of cancer.',
    /**
     * Each needs a line of explanation and somewhere to go — see the note on
     * `ServeItem`. The descriptions use the content draft's own language
     * about each situation; none is a new claim.
     */
    items: [
      {
        icon: 'stethoscope',
        title: 'Newly Diagnosed',
        description:
          'Understand the diagnosis, what the reports show, and which options are worth discussing.',
        href: routes.patientJourney,
      },
      {
        icon: 'target',
        title: 'Advanced and Recurrent Cancers',
        description:
          'A further review when disease has progressed or treatment has stopped working.',
        href: routes.treatments,
      },
      {
        icon: 'scale',
        title: 'Holistic and Scientific Approach',
        description:
          'Conventional oncology considered alongside appropriate supportive and integrative care.',
        href: routes.integrativeCare,
      },
      {
        icon: 'shield-check',
        title: 'Survivors and Relapse Prevention',
        description:
          'Ongoing monitoring, nutrition and lifestyle support after active treatment ends.',
        href: routes.integrativeCare,
      },
      {
        icon: 'users',
        title: 'Global Access to Care',
        description:
          'Help organising records, consultations and travel for patients coming from abroad.',
        href: routes.international,
      },
    ],
  },

  insights: {
    title: 'Expert Insights on Cancer Healing',
    items: [
      {
        title: 'Bone Cancer Battle',
        caption:
          'An Iraqi Patient’s Life-Changing Journey | Art of Healing Cancer, Gurugram',
      },
      {
        title: 'Revolutionizing Breast Cancer Treatment',
        caption:
          'How Robotic Surgery is Changing Breast Cancer | Art of Healing Cancer, Gurugram',
      },
      {
        title: 'Strength & Science',
        caption:
          'Advanced Cancer Treatment | Real Patient Case Study | Art of Healing Cancer, Gurugram',
      },
    ],
  },

  accreditations: {
    eyebrow: 'Affiliations & accreditations',
    title: 'Certified. Accredited. Globally Connected.',
    intro:
      'Our diagnostics and clinical partnerships are backed by internationally recognised laboratories and accredited hospitals.',
    items: [
      { title: 'RGCC Labs', detail: 'Accredited laboratory partner · Greece' },
      { title: 'CK Birla Hospital', detail: 'Clinical affiliation · India' },
      { title: 'NABH', detail: 'Accredited partner clinics' },
    ],
  },

  /**
   * OUR DOCTORS — the real roster, from artofhealingcancer.com/our-doctors.
   *
   * Names, roles, affiliations and specialty groupings are transcribed from
   * that page; portraits are the site's own files. Nothing here is inferred:
   * where the source gives only a name and a heading, only a name and a
   * heading appear.
   *
   * TWO THINGS TO PRESERVE WHEN EDITING THIS LIST:
   *
   * 1. Mr. Pankaj Kumar is a yoga therapist, NOT a physician. His prefix is
   *    'Mr.' and must stay that way — the page is explicit, and promoting a
   *    real person to "Dr." on a cancer-care site is a misrepresentation with
   *    consequences.
   *
   * 2. The live page's Medical Oncology heading reads "DR. IAONNIS" while the
   *    body text names Dr. Papasotiriou. The full name is used here; the
   *    spelling should be confirmed with the practice.
   *
   * `experienceYears` appears on only the three clinicians whose biographies
   * state a figure. The rest omit it rather than estimate.
   */
  team: {
    eyebrow: 'Our doctors',
    title: 'The Specialists Behind Your Care',
    intro:
      'Cancer care may involve several medical disciplines. The specialists required depend on the diagnosis, the treatment decision under consideration, and any additional medical needs.',
    disciplines: [
      'Surgical Oncology',
      'Precision Oncology',
      'Medical Oncology',
      'Radiation Oncology',
      'Nuclear Medicine',
      'Pathology',
      'Radiology',
      'Ayurveda & Naturopathic Medicine',
      'Yoga and Meditation',
      'Interventional Radiology',
    ],
    members: [
      {
        slug: 'mandeep-singh-malhotra',
        name: 'Mandeep Singh Malhotra',
        prefix: 'Dr.',
        role: 'Chief Mentor · Surgical & Precision Oncology',
        speciality: 'Surgical Oncology',
        experienceYears: 20,
        qualifications: ['Senior residency, surgical oncology — AIIMS Delhi'],
        featured: true,
        photo: {
          src: '/images/doctors/mandeep-singh-malhotra.png',
          alt: 'Portrait of Dr. Mandeep Singh Malhotra',
          width: 375,
          height: 375,
        },
      },
      {
        slug: 'sonal-jain',
        name: 'Sonal Jain',
        prefix: 'Dr.',
        role: 'Medical Director · Haematopathologist',
        speciality: 'Pathology',
        featured: true,
        photo: {
          src: '/images/doctors/sonal-jain.jpg',
          alt: 'Portrait of Dr. Sonal Jain',
          width: 150,
          height: 150,
        },
      },
      {
        slug: 'abhishek-bansal',
        name: 'Abhishek Bansal',
        prefix: 'Dr.',
        role: 'Leads Interventional Radiology & Interventional Oncology',
        speciality: 'Interventional Radiology',
        featured: true,
        photo: {
          src: '/images/doctors/abhishek-bansal.png',
          alt: 'Portrait of Dr. Abhishek Bansal',
          width: 212,
          height: 245,
        },
      },
      {
        slug: 'neha-sharma',
        name: 'Neha Sharma',
        prefix: 'Dr.',
        role: 'Oral & Maxillofacial Surgeon',
        speciality: 'Surgical Oncology',
        experienceYears: 10,
        qualifications: ['MDS, Oral & Maxillofacial Surgery — Manipal'],
        featured: true,
        photo: {
          src: '/images/doctors/neha-sharma.png',
          alt: 'Portrait of Dr. Neha Sharma',
          width: 375,
          height: 375,
        },
      },
      {
        slug: 'harsimran-singh',
        name: 'Harsimran Singh',
        prefix: 'Dr.',
        role: 'Surgical Oncologist, Delhi NCR',
        speciality: 'Surgical Oncology',
        experienceYears: 15,
        qualifications: ['Fellowship, Head & Neck Onco Surgery'],
        featured: true,
        photo: {
          src: '/images/doctors/harsimran-singh.jpg',
          alt: 'Portrait of Dr. Harsimran Singh',
          width: 375,
          height: 375,
        },
      },
      {
        slug: 'vikas-goswami',
        name: 'Vikas Goswami',
        prefix: 'Dr.',
        role: 'Senior Consultant — Max Group of Hospitals & Zeeva Clinic',
        speciality: 'Medical Oncology',
        featured: true,
        photo: {
          src: '/images/doctors/vikas-goswami.png',
          alt: 'Portrait of Dr. Vikas Goswami',
          width: 375,
          height: 375,
        },
      },
      {
        slug: 'ishita-b-sen',
        name: 'Ishita B. Sen',
        prefix: 'Dr.',
        role: 'Nuclear Medicine Physician',
        speciality: 'Nuclear Medicine',
        featured: true,
        photo: {
          src: '/images/doctors/ishita-b-sen.png',
          alt: 'Portrait of Dr. Ishita B. Sen',
          width: 375,
          height: 375,
        },
      },
      {
        slug: 'ritesh-sharma',
        name: 'Ritesh Sharma',
        prefix: 'Dr.',
        role: 'Senior Consultant Radiation Oncologist — Batra Hospital, Delhi',
        speciality: 'Radiation Oncology',
        featured: true,
        photo: {
          src: '/images/doctors/ritesh-sharma.png',
          alt: 'Portrait of Dr. Ritesh Sharma',
          width: 375,
          height: 375,
        },
      },

      /* ---- Not featured on the home grid; shown on the full team page ---- */
      {
        slug: 'siddharth-sahai',
        name: 'Siddharth Sahai',
        prefix: 'Dr.',
        role: 'Medical Oncologist',
        speciality: 'Medical Oncology',
        photo: {
          src: '/images/doctors/siddharth-sahai.png',
          alt: 'Portrait of Dr. Siddharth Sahai',
          width: 375,
          height: 375,
        },
      },
      {
        slug: 'ioannis-papasotiriou',
        name: 'Ioannis Papasotiriou',
        prefix: 'Dr.',
        role: 'Leads R.G.C.C. International GmbH',
        speciality: 'Precision Oncology',
        photo: {
          src: '/images/doctors/ioannis-papasotiriou.png',
          alt: 'Portrait of Dr. Ioannis Papasotiriou',
          width: 300,
          height: 300,
        },
      },
      {
        slug: 'neeraj-prakash',
        name: 'Neeraj Prakash',
        prefix: 'Dr.',
        role: 'Senior Pathologist',
        speciality: 'Pathology',
        photo: {
          src: '/images/doctors/neeraj-prakash.png',
          alt: 'Portrait of Dr. Neeraj Prakash',
          width: 375,
          height: 375,
        },
      },
      {
        slug: 'shoma-mukerjee-sharma',
        name: 'Shoma Mukerjee Sharma',
        prefix: 'Dr.',
        role: 'Head of Department — Mahajan Radiology, Fortis Vasant Kunj',
        speciality: 'Radiology',
        photo: {
          src: '/images/doctors/shoma-mukerjee-sharma.png',
          alt: 'Portrait of Dr. Shoma Mukerjee Sharma',
          width: 375,
          height: 375,
        },
      },
      {
        slug: 'shikha-panwar',
        name: 'Shikha Panwar',
        prefix: 'Dr.',
        role: 'Senior Consultant & Head, MRI Division — Mahajan Imaging',
        speciality: 'Radiology',
        photo: {
          src: '/images/doctors/shikha-panwar.png',
          alt: 'Portrait of Dr. Shikha Panwar',
          width: 375,
          height: 375,
        },
      },
      {
        slug: 'kishore-kanuga',
        name: 'Kishore Kanuga',
        prefix: 'Dr.',
        role: 'Ayurvedic Physician (BAMS) · Senior Medical Officer, NanoLife',
        speciality: 'Ayurveda & Naturopathic Medicine',
        photo: {
          src: '/images/doctors/kishore-kanuga.png',
          alt: 'Portrait of Dr. Kishore Kanuga',
          width: 375,
          height: 375,
        },
      },
      {
        /* Mr., not Dr. — see the note at the top of this block. */
        slug: 'pankaj-kumar',
        name: 'Pankaj Kumar',
        prefix: 'Mr.',
        role: 'Yoga Therapist & Certified Yoga Trainer',
        speciality: 'Yoga and Meditation',
        photo: {
          src: '/images/doctors/pankaj-kumar.jpg',
          alt: 'Portrait of Mr. Pankaj Kumar',
          width: 150,
          height: 150,
        },
      },
    ],
    cta: { label: 'Meet the full team', href: routes.doctors },
    note: '',
  },

  /**
   * PARTNERING INSTITUTIONS
   *
   * Only CK Birla Hospital is named, because it is the only institution the
   * live site names. RGCC is a laboratory rather than a hospital and appears
   * under accreditations; the NABH entry is deliberately generic because the
   * live site does not say which clinics.
   *
   * The draft is explicit (§7): "A referral relationship must not be
   * described as a formal partnership unless that relationship exists." Each
   * entry therefore states the nature of the relationship rather than
   * implying one.
   */
  partners: {
    eyebrow: 'Partnering institutions',
    title: 'Where Your Care Takes Place',
    intro:
      'Treatment, diagnostics and procedures are delivered with accredited hospitals and laboratories. Before proceeding, patients are told which clinician is responsible, which facility is involved, and what the follow-up arrangements are.',
    /**
     * LOGOS ARE THE INSTITUTIONS' OWN MARKS, supplied by AOHC. They are
     * reproduced as given and must not be recoloured, redrawn or regenerated:
     * a third party's trademark is the one asset on this site that cannot be
     * approximated.
     */
    items: [
      {
        name: 'CK Birla Hospital',
        relationship: 'Clinical affiliation',
        location: 'Gurugram, India',
        logo: {
          src: '/images/partners/ck-birla.webp',
          alt: 'CK Birla Hospital',
          width: 320,
          height: 117,
        },
      },
      {
        name: 'RGCC Laboratories',
        relationship: 'Accredited diagnostics partner',
        location: 'Greece',
        logo: {
          src: '/images/partners/rgcc.webp',
          alt: 'RGCC',
          width: 280,
          height: 180,
        },
      },
      {
        /** ⚠️  Logo still outstanding — see the note in the README. */
        name: 'NABH-accredited partner clinics',
        relationship: 'Accredited partner network',
        location: 'India',
      },
    ],
    cta: { label: 'All partnering institutions', href: routes.partners },
  },

  news: {
    title: 'Art of Healing in the News',
    items: [
      {
        publication: 'India Today',
        headline:
          'Delhi tops cancer rates among metros, Srinagar leads in lung cancer: ICMR study',
      },
      {
        publication: 'India Today',
        headline:
          'All about liquid biopsy: How a simple blood test can spot cancer early',
      },
      {
        publication: 'Business Today',
        headline:
          'Air pollution possible link to head and neck cancer, finds new study',
      },
      {
        publication: 'The Times of India',
        headline:
          'Cervical cancer surgery: Nod for robotic surgery for better aesthetics and swift recovery',
      },
    ],
  },

  /**
   * PATIENT TESTIMONIAL VIDEOS — the real ones, from the AOHC YouTube channel.
   *
   * Titles come from YouTube's oEmbed endpoint and thumbnails from
   * `img.youtube.com`, so both are the channel's own assets rather than
   * anything reconstructed here.
   *
   * ⚠️  TWO OF THESE MAKE STRONG CLINICAL CLAIMS — "Complete Remission from
   * Stage 3 Cervical Cancer in 8 Weeks" and "Wheelchair to Walking …
   * in Just 2 Months". They are already published on the channel, so the
   * titles are reproduced verbatim rather than softened here.
   *
   * They do need the §11 treatment from the content draft: documented
   * permission on file, and the standing reminder that one person's
   * experience does not predict another's. The section renders that reminder
   * beneath the row — it is not optional furniture.
   */
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'What Our Patients Say About Their Healing Journey',
    items: [
      {
        title:
          'Wheelchair to Walking: Glioblastoma Patient Recovers with 2DG Metabolic Therapy in Just 2 Months',
        caption: 'Glioblastoma · Metabolic therapy',
        href: 'https://youtu.be/l_JVy8qRiJI',
        thumbnail: {
          src: '/images/testimonials/l_JVy8qRiJI.jpg',
          alt: 'Video thumbnail: glioblastoma patient recovery story',
          width: 1280,
          height: 720,
        },
      },
      {
        title: 'Complete Remission from Stage 3 Cervical Cancer in 8 Weeks',
        caption: 'Cervical cancer · International patient',
        href: 'https://youtu.be/hvsElxx_9so',
        thumbnail: {
          src: '/images/testimonials/hvsElxx_9so.jpg',
          alt: 'Video thumbnail: cervical cancer remission story',
          width: 1280,
          height: 720,
        },
      },
      {
        title: 'Survivor Testimonial | How Early Detection Changed Everything',
        caption: 'Early detection',
        href: 'https://youtu.be/GJy4ASONFFs',
        thumbnail: {
          src: '/images/testimonials/GJy4ASONFFs.jpg',
          alt: 'Video thumbnail: survivor testimonial on early detection',
          width: 1280,
          height: 720,
        },
      },
      {
        title: 'Survivor’s Journey | Strength Through Precision & Care',
        caption: 'Precision oncology',
        href: 'https://youtu.be/nsHSdzPVQG0',
        thumbnail: {
          src: '/images/testimonials/nsHSdzPVQG0.jpg',
          alt: 'Video thumbnail: survivor’s journey through precision care',
          width: 1280,
          height: 720,
        },
      },
      {
        title: 'From Diagnosis to Recovery | Guided by Precision, Powered by Care',
        caption: 'Diagnosis to recovery',
        href: 'https://youtu.be/Sx2FBrcDoYQ',
        thumbnail: {
          src: '/images/testimonials/Sx2FBrcDoYQ.jpg',
          alt: 'Video thumbnail: from diagnosis to recovery',
          width: 1280,
          height: 720,
        },
      },
      {
        title: 'Triumph Over Cancer | From Fear to Freedom',
        caption: 'Patient story',
        href: 'https://youtu.be/N22oMzQjhJE',
        thumbnail: {
          src: '/images/testimonials/N22oMzQjhJE.jpg',
          alt: 'Video thumbnail: triumph over cancer',
          width: 1280,
          height: 720,
        },
      },
      {
        title: 'Rare Ovarian Cancer Journey | Early Detection Changed Everything',
        caption: 'Ovarian cancer · Early detection',
        href: 'https://youtu.be/ugnjn22j37E',
        thumbnail: {
          src: '/images/testimonials/ugnjn22j37E.jpg',
          alt: 'Video thumbnail: rare ovarian cancer journey',
          width: 1280,
          height: 720,
        },
      },
    ],
  },

  contact: {
    title: 'You’re Not Alone, We’re Here to Help',
    subtitle:
      'Tell us where you are in this. A member of the care team will read your message and reply.',
    /**
     * ⚠️  TODO — COPY NOT SUPPLIED.
     *
     * These three lines are the most reassuring thing on the page: somebody
     * who has just written about their diagnosis wants to know whether
     * anyone will read it and when. They are drafted here from the content
     * draft's §14 ("What Happens Next?") and MUST be confirmed against the
     * practice's real process — especially anything implying a response
     * time, which is an operational commitment nobody has made.
     */
    afterSubmit: {
      title: 'What happens after you submit',
      steps: [
        'Your enquiry reaches the care team and you receive a reference number.',
        'The team reviews what you have sent and replies with the next steps.',
        'If a review is appropriate, you are sent a secure channel for your records.',
      ],
    },
  },
}

/** Contact rows for the appointment block, built from `site.contact`. */
export const contactRows = [
  site.contact.hours && {
    icon: 'clock' as const,
    label: 'Consultation Hours',
    value: site.contact.hours,
    href: '',
  },
  site.contact.address && {
    icon: 'map-pin' as const,
    label: 'Visit Us',
    value: site.contact.address,
    href: '',
  },
  site.contact.email && {
    icon: 'mail' as const,
    label: 'Email Us',
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  /* No telephone row — see the note in `src/lib/site.ts`. WhatsApp and email
     are the two direct routes; the form below is the third. */
  site.contact.whatsapp && {
    icon: 'message-circle' as const,
    label: 'WhatsApp',
    value: `+${site.contact.whatsapp.replace(/[^\d]/g, '')}`,
    href: `https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}`,
  },
].filter(Boolean) as Array<{
  icon: 'clock' | 'map-pin' | 'mail' | 'message-circle'
  label: string
  value: string
  href: string
}>
