import type { ArticlePageContent } from '@/types'

/**
 * HYDROGEN INHALATION THERAPY
 * ----------------------------------------------------------------------------
 * Migrated from https://artofhealingcancer.com/hydrogen-inhalation-therapy/
 * and kept at that URL. Transcribed verbatim.
 *
 * ⚠️  THIS IS THE PAGE ON THIS SITE MOST IN NEED OF CLINICAL REVIEW, and it
 * is not a close call. It is a page about an unproven therapy written
 * almost entirely in the indicative — things hydrogen "can" and "does" do,
 * not things it is being studied for. The specific sentences a reviewer has
 * to rule on, because each is a claim AOHC is making in its own voice:
 *
 *   1. "Hydrogen therapy is one of the latest advancements in cancer
 *      treatment with very promising results."
 *   2. "Being a non-toxic gas, Hydrogen is completely safe for human
 *      administration at higher concentration and Pressure." — an
 *      unqualified safety claim. Hydrogen is also described on this same
 *      page as "a highly inflammable gas".
 *   3. "Hydrogen inhalation is the most effective option as it ensures a
 *      fast and precise delivery to the tumor site." — a comparative
 *      efficacy claim against two other routes.
 *   4. "Hydrogen is now used in many places as a rehabilitative therapy
 *      after Chemo and Radiotherapy and has prevented many patients from
 *      post therapeutic complications and mortality." — asserts prevented
 *      deaths.
 *   5. "Hydrogen therapy is now approved by the Japan Ministry of Health,
 *      Labor and Welfare for treating Cancer." — a regulatory claim that is
 *      checkable and should be checked. Japan's approval of hydrogen
 *      inhalation is for post-cardiac-arrest syndrome, which is not cancer.
 *   6. "the FDA has started a clinical trial of Hydrogen therapy to be used
 *      for COVID-19" — the FDA regulates trials, it does not run them.
 *
 * ⚠️  THE PAGE CARRIES NO REFERENCES. It says "Multiple research have also
 * shown" and "several research have indicated" without citing any. The
 * G6PD article on this same site carries 26 citations; the gap between the
 * two is the clearest argument for the editorial standards published on
 * `/knowledge`, which this page would currently fail on every count.
 */
export const hydrogenInhalationTherapy: ArticlePageContent = {
  hero: {
    title: 'Hydrogen Inhalation Therapy',
    body: [
      'Hydrogen is the lightest and the most abundant element in the universe, and recent research has led to its use in several medical related areas.',
      'It is administered in a controlled concentration for a specific period of time to reduce the proliferation of in situ tumors.',
    ],
  },

  lead: [
    'Hydrogen is a natural element which can be found in liquid and gaseous form. It is the lightest and the most abundant element in the universe. It is a highly inflammable gas which is colorless, tasteless and odorless.',
  ],

  sections: [
    {
      body: [
        'Generally, hydrogen finds its use in non-medical purposes, but recent advancements and research has led to use of hydrogen in several medical related areas. Hydrogen therapy is one of the latest advancements in cancer treatment with very promising results. It is administered in a controlled concentration for a specific period of time to reduce the proliferation of in situ tumors.',
        'Being a non-toxic gas, Hydrogen is completely safe for human administration at higher concentration and Pressure. Hydrogen can be consumed in multiple forms i.e. Hydrogen Gas inhalation therapy, Hydrogen rich water and Hydrogen rich saline injection. Among them, Hydrogen inhalation is the most effective option as it ensures a fast and precise delivery to the tumor site.',
      ],
    },

    {
      title: 'Hydrogen can benefit our body in two possible ways',
      body: [],
    },

    {
      title: 'Cancer rehabilitation',
      level: 3,
      body: [
        'Hydrogen can prevent normal cells from the adverse side effects of Chemotherapy and radiation therapy. Hydrogen, when administered in the body, reacts with a toxic chemical species called Reactive Oxygen Species (ROS). ROS is produced in high quantities during Chemotherapy and radiation therapy and damages normal cells. Hence, Hydrogen works as an agent to neutralize these toxic compounds and prevent normal cells from adverse effects. Common side effects like weight loss, liver and kidney damage, inflammatory disorders, etc. can be prevented using Hydrogen. Hydrogen is now used in many places as a rehabilitative therapy after Chemo and Radiotherapy and has prevented many patients from post therapeutic complications and mortality.',
      ],
    },

    {
      title: 'Cancer treatment',
      level: 3,
      body: [
        'Multiple research have also shown that hydrogen can also target tumor cells directly and stop them from growing and spreading significantly. It has been shown that hydrogen can inhibit several proteins and genes responsible for tumor growth. Apart from this, there are multiple ways by which hydrogen can target cancer cells and lead to tumor shrinkage.',
      ],
    },

    {
      body: [
        'Hydrogen therapy is now approved by the Japan Ministry of Health, Labor and Welfare for treating Cancer. Nowadays, China has also been involved in conducting clinical trials based on this ability of Hydrogen. The benefits of Hydrogen Inhalation Therapy is under clinical investigation in China where, till now, it has been proven that inhalation therapy is an efficient method which can benefit the patients by multiple ways. Apart from cancer, several research have indicated that Hydrogen Therapy can be used for Treating Viral Diseases including COVID-19 and inflammatory diseases. Infact, the FDA has started a clinical trial of Hydrogen therapy to be used for COVID-19.',
      ],
    },
  ],
}
