import type { ResourcesPageContent } from '@/types'
import { routes } from '@/lib/routes'

/**
 * RESOURCES AND BLOG PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  THE WORD IN BOTH HEADINGS IS "SUGGESTED", AND IT IS LOAD-BEARING.
 * "Suggested Resource Categories" and "Suggested Blog Articles" are a
 * content plan: a list of what AOHC intends to publish, not a list of what
 * exists. Nothing is written yet. Two consequences the page honours and
 * which must not be undone:
 *
 *   1. THE TEN ARTICLE TITLES ARE NOT LINKS, and must not become links
 *      until the articles exist. Ten titles that look clickable and go
 *      nowhere is ten dead ends on a page whose whole purpose is to be
 *      useful.
 *   2. THE SIX CATEGORIES ARE DESCRIBED, NOT OFFERED. Each says what a
 *      reader will be able to learn, in the draft's own words. None of
 *      them links anywhere either.
 *
 * The page says plainly that this is what is being written. That is a
 * change of framing rather than of copy, and it is the honest one: a
 * reader who scrolls a list of ten titles and finds nothing clickable
 * concludes the site is broken, unless the page told them first.
 *
 * ⚠️  THE DRAFT NUMBERS THE ARTICLES 8 TO 17, an artefact of its own
 * numbered list running on from an earlier section. They are stored and
 * rendered unnumbered.
 *
 * ⚠️  THE EDITORIAL STANDARDS ARE A PUBLIC COMMITMENT AND ONLY BECOME TRUE
 * WHEN THERE ARE ARTICLES. "A named, qualified clinical reviewer", "the
 * date of publication and last medical review" — these describe what every
 * article will carry. Publishing them is a promise about content that does
 * not exist yet, which is defensible while the page is honest about being
 * a plan, and is not once articles start appearing without those fields.
 * Whoever ships the first article should check it against this list.
 *
 * ⚠️  THE LINE ABOUT AI-GENERATED CONTENT IS RENDERED, DELIBERATELY. It
 * reads as an instruction to AOHC's own team, and it was tempting to treat
 * it as a note and drop it. It stays because it is the single most
 * reassuring sentence on a cancer-information page in 2026, and because a
 * reader has a legitimate interest in knowing it. Its phrasing is the
 * draft's; a reviewer may want it recast from a directive into a statement
 * of what AOHC does.
 */
export const resourcesPage: ResourcesPageContent = {
  hero: {
    title: 'Understand the Information Behind Your Care',
    body: [
      'Reliable information can help patients and families prepare for consultations, understand medical terminology, and ask informed questions.',
      'AOHC’s educational resources should support—not replace—individual medical advice.',
    ],
  },

  /**
   * ⚠️  WRITTEN, NOT SUPPLIED — the one piece of copy on this page that is
   * not AOHC's. The draft gives no sentence saying the library is still
   * being written, and without one a reader meets two lists of things
   * they cannot open. It states the position and claims nothing else.
   * Replace it with AOHC's wording, or delete it once the articles are
   * live and the lists become links.
   *
   * ⚠️  IT NOW HAS TO DISTINGUISH TWO THINGS, because seven articles
   * migrated from the WordPress site went live at `/knowledge/blogs`.
   * Until then this read "none of them is published yet", which became
   * false the moment those shipped — a page telling a reader there is
   * nothing to read, one click from seven articles. The sentence draws
   * the line instead: these ten titles are unwritten, the blogs are not.
   */
  status:
    'The categories and titles on this page are what AOHC is preparing, listed so you can see what is coming; none of them is written yet. The articles that are already published are in Blogs.',

  categories: {
    eyebrow: 'What the library will cover',
    title: 'Suggested Resource Categories',
    items: [
      {
        title: 'Understanding a Cancer Diagnosis',
        body: 'Learn about pathology reports, cancer staging, tumour grade, receptor status, and the role of diagnostic imaging.',
      },
      {
        title: 'Understanding Treatment Options',
        body: 'Explore the purposes, limitations, and common considerations associated with surgery, chemotherapy, radiation therapy, hormonal therapy, targeted therapy, and immunotherapy.',
      },
      {
        title: 'Molecular Testing and Precision Oncology',
        body: 'Understand what genomic and biomarker tests can reveal, when they may be useful, and why a test result does not automatically determine a treatment.',
      },
      {
        title: 'Managing Treatment and Side Effects',
        body: 'Learn how to prepare for appointments, keep track of symptoms, discuss side effects, and seek timely medical attention.',
      },
      {
        title: 'Nutrition and Supportive Care',
        body: 'Find general educational information about nutrition, activity, sleep, emotional well-being, and the importance of discussing supplements with the treating team.',
      },
      {
        title: 'International Patient Guidance',
        body: 'Understand how to organize medical records, prepare for a second opinion, and plan questions before considering cross-border care.',
      },
    ],
  },

  articles: {
    eyebrow: 'Planned',
    title: 'Suggested Blog Articles',
    items: [
      'How to Prepare for a Cancer Second Opinion',
      'What to Include in Your Cancer Medical Records',
      'Understanding Pathology and Biomarker Reports',
      'What Molecular Testing Can—and Cannot—Tell You',
      'Questions to Ask Before Starting a New Cancer Treatment',
      'How to Discuss Treatment Side Effects With Your Oncologist',
      'Why Cancer Treatment Plans May Change Over Time',
      'How to Review Supplements for Safety During Cancer Treatment',
      'What International Patients Should Consider Before Travelling',
      'Understanding the Difference Between Standard, Off-Label, and Investigational Treatments',
    ],
  },

  standards: {
    eyebrow: 'How these will be written',
    title: 'Editorial Standards for Every Article',
    intro: ['Each medical article should include:'],
    items: [
      'A named, qualified clinical reviewer.',
      'The date of publication and last medical review.',
      'Reliable references appropriate to the topic.',
      'A clear explanation of the evidence and its limitations.',
      'A statement that the content is educational, not individual medical advice.',
      'A process for updating outdated information.',
    ],
    outro:
      'AI-generated medical content must not be published automatically. It should pass editorial review and clinical approval before publication.',
  },

  closing: {
    title: 'Have a Question About Your Medical Records?',
    cta: { label: 'Contact AOHC', href: routes.contact },
  },
}
