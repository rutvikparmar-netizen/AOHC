import type { FaqsPageContent } from '@/types'
import { routes } from '@/lib/routes'

/**
 * FREQUENTLY ASKED QUESTIONS PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  FOUR ANSWERS HERE BEGIN WITH THE WORD "NO", AND THAT IS THE MOST
 * VALUABLE THING ON THE PAGE. No guarantee of a cure. Do not stop your
 * current treatment. Not every patient needs molecular testing. No test
 * identifies the treatment that will definitely work. A reader arriving at
 * an integrative cancer service is often being told elsewhere that the
 * answer to all four is yes. Softening any of them — to "every case is
 * different", or by moving the qualification after a reassurance — turns a
 * refusal into a maybe, which is the failure this whole draft is written to
 * avoid.
 *
 * ⚠️  "Should I stop my current treatment before contacting AOHC?" IS A
 * SAFETY ANSWER, not an FAQ. It tells someone not to stop prescribed cancer
 * treatment. It must not be shortened, reordered out of the treatment
 * group, or folded into another answer.
 *
 * ⚠️  THE SUPPLEMENTS ANSWER CARRIES A SPECIFIC WARNING — that a product
 * being "natural" does not make it safe alongside cancer medicines. It is
 * the same point the integrative-care page makes in its own warning panel,
 * and it is here because this is where people ask it.
 *
 * ⚠️  THE HOME PAGE HAS ITS OWN SHORTER FAQ, and the two overlap. That one
 * is a handful of questions asked by people writing in for the first time;
 * this is the full set. They are deliberately separate lists: the home
 * page's was trimmed on AOHC's instruction when two of its answers restated
 * copy that had been removed from the page. Keep them in step by hand, or
 * decide which is canonical — do not merge them without being asked.
 *
 * ⚠️  GROUPED, AND THE GROUPS ARE THE DRAFT'S OWN. Twenty questions in one
 * accordion is a list nobody reads to the end of. The five headings are
 * supplied; do not invent a sixth or redistribute questions between them.
 */
export const faqsPage: FaqsPageContent = {
  hero: {
    title: 'Frequently Asked Questions',
    body: [
      'Questions people ask about AOHC, treatment, medical records, travelling for care, and when to seek urgent help instead.',
    ],
    /**
     * ⚠️  THE LEAD IS WRITTEN, NOT SUPPLIED. The draft opens straight into
     * "General Questions" with no page introduction. This sentence only
     * names the five groups below it and claims nothing else. Replace it
     * with AOHC's wording when there is some.
     */
  },

  groups: [
    {
      title: 'General Questions',
      items: [
        {
          question: 'What is Art of Healing Cancer?',
          answer:
            'Art of Healing Cancer (AOHC) focuses on a personalized approach to cancer care, considering relevant medical information, previous treatment, current needs, and appropriate treatment options. The specific services available should be confirmed with our team.',
        },
        {
          question: 'What does integrative cancer care mean?',
          answer:
            'Integrative cancer care considers conventional oncology alongside appropriate supportive or complementary approaches. Each option should be evaluated for its clinical relevance, evidence, safety, and suitability. Integrative care should not automatically replace standard cancer treatment.',
        },
        {
          question: 'Does AOHC treat every type of cancer?',
          answer:
            'The team’s scope and available services may vary. Contact AOHC with your diagnosis to ask whether your case can be reviewed.',
        },
        {
          question: 'Can AOHC guarantee a cure or a particular outcome?',
          answer:
            'No. No responsible cancer service can guarantee a cure or a specific outcome. Treatment response varies, and every option has limitations and risks.',
        },
      ],
    },
    {
      title: 'Questions About Treatment',
      items: [
        {
          question: 'Can I seek another opinion if my cancer has progressed?',
          answer:
            'You may enquire about a further clinical review. The team will need relevant medical records to understand your diagnosis, previous treatment, current condition, and the questions that need to be addressed.',
        },
        {
          question: 'Should I stop my current treatment before contacting AOHC?',
          answer:
            'No. Do not stop, delay, or change prescribed cancer treatment without discussing the decision with your treating clinician. A consultation request does not mean that a different treatment is available or more appropriate.',
        },
        {
          question: 'Does every patient need molecular testing?',
          answer:
            'No. The usefulness of molecular or biomarker testing depends on the cancer type, the available tissue or other samples, the clinical question, and whether the result could inform a decision.',
        },
        {
          question:
            'Can a molecular test identify the treatment that will definitely work?',
          answer:
            'No. Tests can provide useful information in some situations, but no test can guarantee a clinical response. Results must be interpreted alongside other clinical findings and the limitations of the test.',
        },
        {
          question: 'What if my previous treatment did not work?',
          answer:
            'The clinical team may review your treatment history, the evidence of progression, the original diagnosis, and the current medical information. A review can help identify questions and options to discuss, but it cannot guarantee that another effective treatment will be available.',
        },
        {
          question: 'Are off-label or investigational treatments available?',
          answer:
            'Availability and suitability depend on the treatment, applicable regulations, clinical evidence, and individual circumstances. Any such option should be clearly identified and discussed with its uncertainties, risks, alternatives, and monitoring requirements.',
        },
        {
          question:
            'Can I use supplements or natural medicines during cancer treatment?',
          answer:
            'Some products may cause side effects or interact with cancer medicines. Tell your treating team about all supplements, herbs, vitamins, and other products you use. Do not assume that a natural product is safe simply because it is described as natural.',
        },
      ],
    },
    {
      title: 'Questions About Medical Records',
      items: [
        {
          question: 'What documents should I provide?',
          answer:
            'The team may request pathology reports, imaging reports, treatment summaries, laboratory results, molecular reports, and a medication list. The exact requirements depend on the case.',
        },
        {
          question: 'What if I do not have all my records?',
          answer:
            'Tell the team which records are missing. You may need to request copies from your existing hospital or clinic. A reliable review may not be possible until essential information is available.',
        },
        {
          question: 'How should I submit my medical reports?',
          answer:
            'Use the secure submission method provided by AOHC. Do not send sensitive medical records through a public link or unsecured channel unless the team has specifically confirmed that the method is appropriate.',
        },
      ],
    },
    {
      title: 'International Patient Questions',
      items: [
        {
          question: 'Can patients from other countries contact AOHC?',
          answer:
            'Patients from different countries may enquire about consultation and treatment options. Acceptance depends on the clinical situation, available services, and applicable requirements.',
        },
        {
          question: 'Can I have a remote consultation?',
          answer:
            'Remote consultation availability should be confirmed with the team. A remote appointment may not replace an in-person examination, diagnostic testing, or local medical care.',
        },
        {
          question: 'Can AOHC help with visas and travel?',
          answer:
            'The team can explain any confirmed support services that are available. Visa decisions are made by the relevant authorities, and travel should be discussed with the treating clinician where medical risks may be present.',
        },
        {
          question: 'Can I travel while receiving cancer treatment?',
          answer:
            'Travel suitability depends on your condition, treatment, symptoms, complications, and the availability of care during travel. Ask your treating medical team before making arrangements.',
        },
      ],
    },
    {
      /**
       * ⚠️  THIS GROUP IS LAST IN THE DRAFT AND STAYS LAST, but the page
       * renders it with an emphasis the others do not get. "Seek urgent
       * medical care" is the only instruction on the site that someone may
       * need to act on within the hour, and an accordion row closed by
       * default is the wrong place for it. See the page.
       */
      title: 'Safety Questions',
      items: [
        {
          question: 'What should I do if my condition suddenly worsens?',
          answer:
            'Seek urgent medical care for severe or rapidly worsening symptoms. Do not wait for an online enquiry or routine consultation response if you may be experiencing a medical emergency.',
        },
        {
          question: 'Is the information on this website medical advice?',
          answer:
            'No. Website content is general educational information. It does not replace an assessment by a qualified healthcare professional who knows your medical history.',
        },
      ],
    },
  ],

  closing: {
    title: 'Have a Question That Is Not Listed Here?',
    cta: { label: 'Contact Our Team', href: routes.contact },
  },
}
