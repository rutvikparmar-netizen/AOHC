import type { ArticlePageContent } from '@/types'

/**
 * 2-DEOXYGLUCOSE (2DG)
 * ----------------------------------------------------------------------------
 * Migrated from https://artofhealingcancer.com/2-deoxyglucose-2dg/ and kept
 * at that URL. Transcribed verbatim.
 *
 * ⚠️  THE SOURCE IS A TOPIC HUB, NOT AN ARTICLE, and only half of it comes
 * across. It is an explainer followed by a listing of NINE further posts
 * in a "2DG" category — "2DG foes Mannose and N-acetyl Cysteine (NAC)",
 * "Can 2DG make immunotherapy more effective?", "Metformin: A drug for
 * Diabetes and friends with 2DG", and so on, each with a teaser and a
 * "Read More".
 *
 * NONE OF THOSE NINE POSTS WAS IN THE LIST OF PAGES TO MIGRATE, so none of
 * them exists on this site. The listing is therefore NOT reproduced: nine
 * teasers whose "Read More" goes nowhere is nine dead ends, which is the
 * same reasoning that keeps the planned-article titles on `/knowledge`
 * unlinked. Migrate the nine and the listing can come back.
 *
 * ⚠️  THE EXPLAINER REPEATS ITS OWN TWO QUESTIONS. The source prints
 * "Why do cancer cells take up more glucose than normal cells- Warburg
 * effect?" and "What is 2DG? How does it work? Basic mechanism?" as a
 * contents pair and then again as the section headings. Rendered once
 * each, as headings.
 *
 * ⚠️  ONE LINE IS AN AUTHOR'S NOTE THAT WAS PUBLISHED BY MISTAKE:
 * "(General idea of ER stress, autophagy, glycosylation and their
 * importance!!)". It is a note to whoever was writing the page, not copy,
 * and it is omitted — the same call made for the "[Insert verified …]"
 * placeholders on the contact page.
 *
 * ⚠️  "2DG has been shown to be very effective in certain kinds of
 * cancers" is unsourced and uncharacterised — which cancers, and on what
 * evidence. 2DG has been studied in humans and has not become a standard
 * treatment; a reader could take that sentence as saying it has. The page
 * carries no references at all.
 */
export const deoxyglucose2dg: ArticlePageContent = {
  hero: {
    title: '2-Deoxyglucose (2DG)',
    body: [
      'As cancer cells rapidly grow, they have higher demand for energy as compared to normal cells, and their glucose consumption rate increases to meet it.',
      '2DG is a glucose analogue with an almost similar structure to glucose, which can mimic glucose in the cancer microenvironment.',
    ],
  },

  lead: [
    'Like every living being, cells require energy to survive. For this purpose, cells break down complex molecules into simpler ones and synthesize important biomolecules from these substrates. Together, all of these reactions are termed as metabolism.',
    'The result of metabolism is the production of ATP molecules which are also considered the Energy Currency of a cell. ATP molecules are required further by many biochemical processes in our body to carry out essential functions.',
  ],

  sections: [
    {
      title:
        'Why do cancer cells take up more glucose than normal cells — the Warburg effect?',
      body: [
        'As Cancer cells rapidly grow, they have higher demand for energy as compared to normal cells. ATP is the energy currency of cell. It starts with a multi-step process known as glycolysis. Glycolysis uses 1 molecule of glucose to produce 2 molecules of ATP. The products of glycolysis are then subjected to oxidative decarboxylation which requires oxygen to generate further ATP. A total of 36 ATPs are generated from one glucose molecule.',
        'Since, only using Glycolysis is much simpler and rapid process to get ATP molecules without the need for oxygen, a lot of cancer cells who live in Hypoxic environment shift to it and grows.',
        'Also, glycolysis generates substrates for protein and nucleotide formation which are used to make more cells. Glucose is an important substrate to produce ATP molecules, therefore with increase in ATP demand, glucose consumption rate also increases to meet energy needs of tumour. This phenomenon is known as the Warburg effect.',
      ],
    },

    {
      title: 'What is 2DG? How does it work? Basic mechanism?',
      body: [
        '2DG or 2-deoxy-glucose is a glucose analogue, having an almost similar structure to glucose. It can mimic glucose in cancer microenvironment.',
        'Inside tumor cells, these 2DG molecules inhibit glycolysis and thereby production of ATP.',
        'This causes death of these cancerous cells through induction of apoptosis, or self-destruction.',
        'As mentioned above, cancer cells tend to take up more glucose as compared to normal cells. This provides a base for 2DG to differentially affect cancer cells more. When 2DG is present in the environment, they will take up large amounts of 2DG instead of glucose (because of the identical structures) thus, inhibiting ATP production, cell proliferation and ultimately, apoptosis/death. This is how 2DG affects cancer cells more as compared to normal cells.',
        'In addition to this, 2DG can also cause death through obstruction of multiple survival pathways.',
        'Proteins are important components of cellular machinery, structure etc. 2DG interferes with their proper folding, rendering them non-functional. These unfolded, non-functional proteins pile up inside the endoplasmic reticulum (a cell organelle used for packaging and transportation of proteins). This leads to ER stress which can ultimately result in cell death.',
        '2DG has been shown to be very effective in certain kinds of cancers, especially when administered along with chemotherapy drugs as it enhances effectiveness (i.e. killing potential) of chemotherapy.',
        'Along with the above-mentioned mechanisms, 2DG is under investigation for other novel mechanisms to treat cancer. This drug can act as a hope in very crucial cases.',
      ],
    },
  ],
}
