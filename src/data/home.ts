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
    /**
     * ALL THREE PARAGRAPHS OF THE SUPPLIED HERO COPY, which is more than the
     * hero card can hold — it has room for the headline, the standfirst and
     * one button, and on a 390px phone it is already capped at roughly one
     * screen. They are rendered as the opening statement directly beneath the
     * card instead; see the note on that section in `(site)/page.tsx`.
     */
    body: [
      'Every cancer journey is different. The diagnosis, disease biology, previous treatments, response to therapy, side effects, overall health, and personal priorities can all influence the next steps in care.',
      'At Art of Healing Cancer (AOHC), our approach is built around understanding the individual behind the diagnosis. We aim to bring relevant clinical information together and evaluate appropriate conventional and integrative options with the patient’s needs at the centre.',
      'Our goal is to help patients and families better understand their options and make informed decisions in collaboration with qualified healthcare professionals.',
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
         * SUPPLIED BY AOHC, AND THE FOUR ARE ONE SET. They replaced four
         * unrelated stock photographs from four shoots and four colour
         * worlds — an ice-blue infusion line, a magenta pipette on navy, an
         * orange cardigan, lime-green nails on hospital blue — which fought
         * each other at full-bleed tile size and were the reason that
         * section still looked cheap after three redesigns of its layout.
         *
         * ⚠️  THE TONE LAYER IN `ApproachSection` WAS REMOVED WITH THEM. It
         * existed only to hold those four together and is not needed by
         * images that already share a palette; applied to these it would
         * tint an already-blue set twice. If anyone swaps one of these for
         * something from elsewhere, the mismatch comes back and a filter is
         * not the fix — match the set or replace all four.
         *
         * They arrive 1672x941 with their own darkened lower edge, which is
         * why the tiles' scrim can stay as light as it is. WebP at about
         * 40KB each, against 1.6MB for the PNGs that came with them.
         *
         * Still not literal pictures of treatment being administered: that
         * is confronting for the audience most likely to be reading, and
         * the stock sets of it carry visible NIH/NCI branding that would
         * imply an affiliation AOHC does not have.
         */
        image: {
          src: '/images/approach/conventional-oncology.webp',
          alt: 'An intravenous drip beside a hospital bed, daylight from a window behind it',
          width: 1672,
          height: 941,
        },
      },
      {
        icon: 'file-search',
        title: 'Precision and molecular information',
        description:
          'Relevant pathology, molecular profiling, genomic findings, and other diagnostic information that may help clinicians understand a tumour and evaluate treatment options.',
        href: routes.treatments,
        image: {
          src: '/images/approach/precision-molecular.webp',
          alt: 'A pipette releasing a droplet into a tray of sample vials in a laboratory',
          width: 1672,
          height: 941,
        },
      },
      {
        icon: 'message-circle',
        title: 'Supportive and integrative care',
        description:
          'Appropriate measures to support symptom management, nutrition, physical function, emotional well-being, and quality of life alongside cancer treatment.',
        href: routes.integrativeCare,
        image: {
          src: '/images/approach/supportive-integrative.webp',
          alt: "A clinician holding a patient's hand at the bedside",
          width: 1672,
          height: 941,
        },
      },
      {
        icon: 'target',
        title: 'Individualized treatment planning',
        description:
          'A structured review of the patient’s current condition, previous treatments, treatment goals, potential risks, and available options.',
        href: routes.patientJourney,
        image: {
          src: '/images/approach/individualized-planning.webp',
          alt: 'Two clinicians looking at a tablet together, a scan displayed on a monitor behind them',
          width: 1672,
          height: 941,
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
   * "A STRUCTURED APPROACH TO UNDERSTANDING YOUR CASE" — the five stages,
   * supplied verbatim.
   *
   * ⚠️  THIS DOES NOT REPLACE `process` ABOVE, and the distinction is worth
   * keeping straight when either is edited. `process` is the live site's
   * four-stage TREATMENT approach — "Decode the Disease" and the rest, with
   * twelve capability sub-points. This is what happens to a patient's RECORDS
   * AND CASE between the first enquiry and a plan: review, gaps, options,
   * discussion, reassessment. Two different things at two points in the
   * journey, so both are on the page.
   *
   * No sub-points, no imagery and no call to action, because the supplied copy
   * has none. The stages render as a plain numbered sequence rather than
   * through `ProcessPanels`, which is built around an image per stage.
   */
  caseReview: {
    eyebrow: 'A structured approach to understanding your case',
    title: 'From Medical Records to Informed Decisions',
    steps: [
      {
        title: 'Understand your medical history',
        description:
          'We begin by reviewing your diagnosis, treatment history, pathology reports, scans, laboratory results, and current concerns.',
      },
      {
        title: 'Identify information gaps',
        description:
          'We assess whether additional medical records, specialist opinions, or diagnostic investigations may be useful.',
      },
      {
        title: 'Evaluate relevant options',
        description:
          'The clinical team considers appropriate treatments and supportive approaches in light of the available information.',
      },
      {
        title: 'Discuss an individualized plan',
        description:
          'Options, uncertainties, possible benefits, risks, and next steps are discussed with you and, where appropriate, your existing treating team.',
      },
      {
        title: 'Review and adapt',
        description:
          "Cancer care may need to change as new results become available or the patient's condition changes. Follow-up and reassessment are therefore important.",
      },
    ],
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
     * THE ONE PHOTOGRAPH IN THE REPO THAT NOTHING ELSE USES. It was attached
     * to `international` for a section that renders steps rather than an
     * image, so it had never appeared on the site at all.
     *
     * It is also the right picture for this particular panel. The note on the
     * hero image says plainly that a brain scan is a confronting first thing
     * to show someone who has just been diagnosed, and suggests this frame
     * instead; two people talking across a desk is what "start with a
     * conversation" actually looks like, and it is the last thing a reader
     * sees before the footer.
     *
     * ⚠️  STOCK, LIKE THE REST. The alt text describes the scene and must not
     * name or imply a role at AOHC — see the note on `hero.image`.
     */
    image: {
      src: '/images/consultation-room.jpg',
      alt: 'A clinician and a patient talking across a desk in a consulting room',
      width: 1400,
      height: 788,
    },
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
   *     the live home page, which is not labelled as coverage. They were
   *     originally carried here on inference from that strip alone. ✅ BOTH
   *     CONFIRMED by the site owner on 2026-10-27 as real coverage, which is
   *     what cleared Hindustan Times to be shown as a masthead.
   *
   *   • The last two are verified articles; the URLs below were read, not
   *     assumed. Note that The Industry Outlook piece is editorial coverage,
   *     NOT an award — see the note on `heroTrust` for why that distinction
   *     mattered here.
   *
   * ⚠️  No outlet may be added to this list without a link or a published
   * reference. A masthead on a cancer clinic's home page asserts that the
   * paper wrote about them.
   *
   * ---------------------------------------------------------------------------
   * ADDING THE REAL MASTHEADS
   *
   * `PressMarquee` renders `logo` when it is present and falls back to the
   * wordmark when it is not, so these can be filled in one at a time without
   * the strip ever looking half-built.
   *
   * Put the files in `public/images/press/` and point at them from the repo
   * root, as the doctor portraits do:
   *
   *     {
   *       name: 'The Times of India',
   *       logo: {
   *         src: '/images/press/times-of-india.svg',
   *         alt: 'The Times of India',
   *         width: 240,
   *         height: 48,
   *       },
   *     }
   *
   * `width` and `height` are the file's own intrinsic dimensions — Next uses
   * them to reserve space, and a wrong ratio shows as a squashed masthead.
   * The strip sizes by height and lets width follow, so the two numbers only
   * need to be in the right proportion to each other.
   *
   * ⚠️  THE FILES MUST COME FROM THE OUTLETS' OWN PRESS KITS, not redrawn by
   * hand. These are registered trademarks; an approximation is both wrong and
   * worse than the wordmark it replaced.
   *
   * ALL NINE ARE PRESENT. Five were taken from each outlet's own site, four
   * of those from the `publisher.logo` their schema.org markup declares. Two
   * arrived under the wrong extension — the Times of India serves a PNG named
   * `.jpg`, Hindustan Times a JPEG named `.png` — and are stored here under
   * what they actually are.
   *
   * The remaining four were supplied by the site owner, because Zee News and
   * NDTV both return 403 to an automated request and the two Outlook titles
   * publish no masthead on the pages that carry the coverage. Each was
   * cropped to its ink before being committed: the strip sizes by height, so
   * packaging whitespace does not scale away — it just shrinks that wordmark
   * next to its neighbours.
   * ---------------------------------------------------------------------------
   */
  press: [
    {
      name: 'The Times of India',
      logo: {
        src: '/images/press/times-of-india.png',
        alt: 'The Times of India',
        width: 600,
        height: 60,
      },
    },
    {
      /* The only vector in the set, supplied by the site owner. */
      name: 'Zee News',
      logo: {
        src: '/images/press/zee-news.svg',
        alt: 'Zee News',
        width: 916,
        height: 346,
      },
    },
    {
      name: 'Business Today',
      logo: {
        src: '/images/press/business-today.png',
        alt: 'Business Today',
        width: 527,
        height: 59,
      },
    },
    {
      name: 'India Today',
      logo: {
        src: '/images/press/india-today.png',
        alt: 'India Today',
        width: 244,
        height: 30,
      },
    },
    {
      /**
       * The DARK variant, not the 600×60 colour one that sits in India TV's
       * own header. That file sets "TV" in white for a dark masthead bar, and
       * half the wordmark would simply disappear against this page.
       */
      name: 'India TV',
      logo: {
        src: '/images/press/india-tv.webp',
        alt: 'India TV',
        width: 150,
        height: 43,
      },
    },
    {
      name: 'Hindustan Times',
      logo: {
        src: '/images/press/hindustan-times.jpg',
        alt: 'Hindustan Times',
        width: 360,
        height: 46,
      },
    },
    {
      /**
       * Supplied as a screenshot that carried an exchange4media watermark in
       * the top-right corner. Cropped to the logo block, which removes it —
       * a third party's watermark must not ship on this page.
       *
       * Unlike the rest, this mark is white lettering ON a red block rather
       * than ink on white, so it carries its own background by design.
       */
      name: 'NDTV',
      logo: {
        src: '/images/press/ndtv.jpg',
        alt: 'NDTV',
        width: 491,
        height: 175,
      },
    },
    {
      name: 'The Industry Outlook',
      logo: {
        src: '/images/press/industry-outlook.jpg',
        alt: 'The Industry Outlook',
        width: 448,
        height: 155,
      },
      href: 'https://www.theindustryoutlook.com/startups/vendor/art-of-healing-cancer-a-dedicated-initiative-towards-treating-advanced-cancers--cid-8123.html',
    },
    {
      name: 'India Pharma Outlook',
      logo: {
        src: '/images/press/india-pharma-outlook.png',
        alt: 'India Pharma Outlook',
        width: 574,
        height: 144,
      },
      href: 'https://www.indiapharmaoutlook.com/manufacturing/vendor/art-of-healing-cancer-a-dedicated-initiative-towards-treating-advanced-cancers-cid-1404.html',
    },
  ],

  /*
   * ⚠️  `heroTrust` IS GONE — the accreditation row was removed from the hero
   * on request. Nothing is lost from the site: all three claims are still
   * published in the partners section ("Where your care takes place"), where
   * RGCC and CK Birla appear with their actual logos instead of as a row of
   * 12px labels.
   *
   * WHAT THAT ROW WAS NEVER ALLOWED TO CARRY, kept here because the
   * temptation will come back the next time someone wants a trust signal in
   * the hero. The original brief named two items and neither could be
   * substantiated:
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
   * The hero now carries a count of the patient-story videos instead, which
   * is simply the length of `testimonials.items`. See `PatientStoriesBadge`
   * for why the Google rating it replaced was not worth keeping.
   */

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
    title: 'Art of Healing Cancer in the News',
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
   * FREQUENTLY ASKED QUESTIONS.
   *
   * ⚠️  NOT ONE OF THESE ANSWERS IS NEW INFORMATION. Every one restates
   * something the site already says somewhere else, which is the only
   * defensible way to write an FAQ for a clinic without access to the
   * practice's own operating detail. Where the answer came from:
   *
   *   location      the reach panel — HCAH Transition Care Centre, Gurugram
   *   international `international.body`, on confirming availability first
   *   next steps    `contact.afterSubmit.steps`, near-verbatim
   *   records       the enquiry form's own note about not attaching scans
   *   second op.    `complexJourney.outro`, verbatim on what a consultation
   *                 cannot guarantee
   *   no phone      `src/lib/site.ts`, where the absence is a decision
   *   not advice    the disclaimer beside the enquiry form
   *
   * ⚠️  NOTHING HERE MAY STATE A RESPONSE TIME. The note on
   * `contact.afterSubmit` is explicit that any implied turnaround is an
   * operational commitment nobody has made, so "replies with the next
   * steps" stays unqualified until someone commits to a number.
   *
   * These also feed a `FAQPage` JSON-LD node, so an answer that drifts from
   * the page drifts in Google's rich result too — edit both or neither.
   */
  faqs: {
    eyebrow: 'Questions people ask first',
    title: 'Before you get in touch',
    intro:
      'The things most often asked by people writing to us for the first time, answered as plainly as we can.',
    items: [
      {
        question: 'Where does treatment actually take place?',
        answer:
          'At the HCAH Transition Care Centre in Gurugram, Haryana, in the Delhi capital region. All treatment takes place there.',
      },
      {
        question: 'Do you accept patients from outside India?',
        answer:
          'Yes. Patients and enquiries reach us from across Europe, the Middle East, Africa, Asia and the Americas. The availability of remote consultations, in-person assessments, travel assistance and other services has to be confirmed with the team before any arrangements are made.',
      },
      {
        question: 'What happens after I send an enquiry?',
        answer:
          'Your enquiry reaches the care team and you receive a reference number. The team reviews what you have sent and replies with the next steps. If a review is appropriate, you are sent a secure channel for your records.',
      },
      {
        question: 'Should I attach my scans and reports to the first message?',
        answer:
          'No — please do not send scans or reports through the enquiry form. If a review is needed, the team will tell you how to share them securely and exactly which documents are wanted.',
      },
      {
        question: 'Can I ask for a second opinion if treatment has stopped working?',
        answer:
          'Yes, and that is one of the most common reasons people write. A consultation cannot guarantee that another treatment will be available or effective; the purpose is to support a clearer understanding of the available choices.',
      },
      {
        question: 'Is there a phone number I can call?',
        answer:
          'No. Enquiries are taken by email, by WhatsApp and through the form on this page. The WhatsApp number is for messages and is not answered by voice.',
      },
      {
        question: 'Is the information on this site medical advice?',
        answer:
          'No. Everything here is general education. It cannot account for your diagnosis, your history or your current treatment, and it is not a substitute for a conversation with your treating oncologist.',
      },
    ],
  },

  /**
   * KNOWLEDGE — REAL ARTICLES, READ FROM THE LIVE SITE ON 2026-10-27.
   *
   * Titles and URLs are verbatim from artofhealingcancer.com/blogs. Each
   * summary is condensed from that article's own opening lines, not written
   * from the title — "families often focus on the word cancer itself" is the
   * pleural-effusion piece's first sentence, and the chemotherapy summary is
   * its first two. Reading times are the ones the articles print; the two
   * that do not print one simply have no `readingTime`, rather than an
   * estimate.
   *
   * ⚠️  THE LINKS POINT AT THE LIVE SITE, not at this one. `/knowledge/blogs`
   * exists in `routes` but has no page in this app yet. When these articles
   * are brought across, swap each `href` for `routes.blog(slug)` and the
   * section needs no other change.
   *
   * ⚠️  THREE OF THE NINE POSTS ON THAT PAGE ARE DOSING CALCULATORS — one of
   * them for fenbendazole and one for ivermectin, neither of which is an
   * approved cancer treatment. They are deliberately not among the three
   * surfaced here: the home page is the most prominent surface on the site,
   * and a dosing tool for an unapproved drug is not what it should lead
   * with. They remain on the blog itself; this is a choice about what to
   * feature, not about what to publish.
   *
   * The eight-part bone-metastasis series had a wide lead card above these
   * three. It was removed on request, so the series is now reached through
   * "All articles" rather than from the home page directly.
   *
   * `category` is the article's own where it prints one ("Cancer Treatment"
   * on the chemotherapy piece). The other two are editorial labels taken
   * from the subject in the title, which is a navigation aid rather than a
   * claim.
   */
  knowledge: {
    eyebrow: 'From the knowledge base',
    title: 'Written for the question you are about to ask',
    intro:
      'Long-form explanations of the things people search for at two in the morning — what a treatment actually does, why a symptom will not settle, and what it means for the next appointment.',
    /**
     * ⚠️  THE THUMBNAILS ARE DECORATIVE STOCK ALREADY USED ELSEWHERE ON
     * THIS PAGE, and not one of them is a picture of what its article is
     * about. The blog publishes no per-article artwork — all nine posts
     * serve the AOHC logo as their `og:image` — so these were chosen on
     * the owner's instruction to give the cards a visual.
     *
     * They are paired as closely as the set allows: an infusion line
     * against the chemotherapy piece, a scan being discussed against the
     * lung-imaging one, sample tubes against the molecular series. The alt
     * text describes the SCENE and never the article, which is what keeps
     * a stock photograph from reading as a claim — the same rule the rest
     * of this file follows.
     *
     * These are the images `ProcessPanels` already flags for replacement.
     * Real photography, or artwork made for each article, should replace
     * them here first.
     */
    items: [
      {
        title: 'AC Chemotherapy: How It Works, Side Effects, Care & FAQs',
        category: 'Cancer treatment',
        readingTime: '30 min read',
        summary:
          'Medicines that kill fast-growing cancer cells also reach fast-growing healthy ones — in hair, mouth, gut and bone marrow. That is where the side effects come from.',
        href: 'https://artofhealingcancer.com/blogs/ac-chemotherapy-how-it-works-side-effects-care-faqs/',
        image: {
          src: '/images/card-infusion.jpg',
          alt: 'An intravenous line against a softly blurred window',
          width: 1000,
          height: 667,
        },
      },
      {
        title: 'Persistent Fever in Cancer: Causes, Treatments & Natural Relief',
        category: 'Symptoms',
        readingTime: '22 min read',
        summary:
          'Recurring fevers that do not settle on antibiotics, and more than a dozen non-infectious reasons they happen.',
        href: 'https://artofhealingcancer.com/blogs/persistent-fever-in-cancer-causes-treatments-natural-relief/',
        image: {
          src: '/images/card-supportive.jpg',
          alt: 'Two people sitting together, one hand resting on another',
          width: 1000,
          height: 563,
        },
      },
      {
        title: 'Why Does Pleural Effusion Happen in Lung Cancer Patients?',
        category: 'Lung cancer',
        summary:
          'Families focus on the word "cancer" itself. This is about one of the problems that arrives later and frightens them just as much.',
        href: 'https://artofhealingcancer.com/blogs/why-does-pleural-effusion-happen-in-lung-cancer-patients-a-complete-guide/',
        image: {
          src: '/images/scan-discussion.jpg',
          alt: 'A patient seated at a desk while a scan is displayed on a laptop beside them',
          width: 1400,
          height: 788,
        },
      },
    ],
    cta: {
      label: 'All articles',
      href: 'https://artofhealingcancer.com/blogs/',
    },
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
