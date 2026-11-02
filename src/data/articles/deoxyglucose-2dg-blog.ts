import type { ArticlePageContent } from '@/types'

/**
 * 2-DEOXYGLUCOSE (2DG) — THE BLOG VERSION
 * ----------------------------------------------------------------------------
 * Migrated from https://artofhealingcancer.com/2-deoxyglucose-2dg-blog/ and
 * kept at that URL. Transcribed verbatim.
 *
 * ⚠️  THIS IS A NEAR-DUPLICATE OF `/2-deoxyglucose-2dg`, AND THE TWO PAGES
 * COMPETE WITH EACH OTHER. Same title, same subject, largely the same
 * sentences. Both were on the migration list, so both are here, but one
 * of them should not exist and a reviewer has to decide which.
 *
 * NEITHER IS A SUPERSET, which is why this is not a five-minute call.
 * Each has material the other lacks:
 *
 *   ONLY ON `/2-deoxyglucose-2dg`:
 *     • the oxidative-decarboxylation step and the "total of 36 ATPs"
 *     • the paragraph on hypoxic cancer cells shifting to glycolysis
 *     • glycolysis generating substrates for protein and nucleotide
 *       formation
 *
 *   ONLY HERE:
 *     • "Concept of metabolism?" as an explicit heading
 *     • TWO PARAGRAPHS ON LYSOSOMAL RECYCLING — cancer cells diverting
 *       unfolded proteins to the lysosome, degrading and recycling them,
 *       and 2DG interfering with that. The other page drops this
 *       mechanism entirely.
 *
 *   The two also disagree on a word: chemotherapy's "toxicity" here,
 *   "effectiveness" there.
 *
 * ⚠️  WHAT TO DO ABOUT IT, for whoever reviews this. Merging the two into
 * one article at `/2-deoxyglucose-2dg` and 301-ing this URL to it is the
 * right answer — it keeps both unique passages, ends the duplication, and
 * consolidates whatever link equity the two have been splitting. What
 * should NOT happen is a `canonical` pointing one at the other while both
 * stay live, because each would then be hiding content the other does not
 * have. Both pages currently self-canonicalise, which is the honest
 * holding position and not the destination.
 *
 * ⚠️  THE AUTHOR'S NOTE IS OMITTED HERE AS IT WAS THERE. The source
 * carries "(General idea of ER stress, autophagy, glycosylation and their
 * importance!!)" mid-article — notes to whoever was drafting the page,
 * published by accident.
 *
 * ⚠️  "warburg" IS LOWER-CASED IN THIS VERSION — "Why do cancer cells take
 * up more glucose than normal cells- warburg?" and "known as the warburg
 * effect". It is a person's name, Otto Warburg. Reproduced as found.
 *
 * ⚠️  THE LAST SENTENCE IS BROKEN ACROSS A LINE IN THE SOURCE: "…as it
 * enhances toxicity (i.e. killing potential) / Of chemotherapy." The
 * stray capital is a mid-sentence line break in their editor. Joined
 * into one sentence here, which is a typesetting repair rather than an
 * edit to the content.
 */
export const deoxyglucose2dgBlog: ArticlePageContent = {
  hero: {
    title: '2-Deoxyglucose (2DG)',
    body: [
      'Cells break down complex molecules into simpler ones and synthesize important biomolecules from these substrates. Together, all of these reactions are termed as metabolism.',
      '2DG is a glucose analogue which can mimic glucose in the cancer microenvironment, inhibiting glycolysis and the production of ATP.',
    ],
  },

  sections: [
    {
      title: 'Concept of metabolism?',
      body: [
        'Like every living being, cells require energy to survive. For this purpose, cells break down complex molecules into simpler ones and synthesize important biomolecules from these substrates. Together, all of these reactions are termed as metabolism.',
        'The result of metabolism is the production of ATP molecules which are also considered the Energy Currency of a cell. ATP molecules are required further by many biochemical processes in our body to carry out essential functions.',
      ],
    },

    {
      title:
        'Why do cancer cells take up more glucose than normal cells- warburg?',
      body: [
        'As Cancer cells rapidly grow, they have higher demand for energy as compared to normal cells. ATP molecules are used for this purpose. ATP is produced from glucose directly through a multi-step process known as glycolysis. Glycolysis uses 1 molecule of glucose to produce 2 molecules of ATP.',
        'Glucose is an important substrate for the production of ATP molecules, therefore with increase in ATP demand, glucose consumption rate also increases to meet energy needs of tumour. This phenomenon is known as the warburg effect.',
      ],
    },

    {
      title: 'What is 2DG? How does it work? Basic mechanism?',
      body: [
        '2DG or 2-deoxy-glucose is a glucose analogue, having an almost similar structure to glucose. It can mimic glucose in cancer microenvironment.',
        'Inside tumor cells, these 2DG molecules inhibit glycolysis and thereby production of ATP.',
        'This causes death of these cancerous cells through induction of apoptosis, or self destruction.',
        'As mentioned above, cancer cells tend to take up more glucose as compared to normal cells. This provides a base for 2DG to differentially affect cancer cells more. When 2DG is present in the environment, they will take up large amounts of 2DG instead of glucose (because of the identical structures) thus, inhibiting ATP production, cell proliferation and ultimately, apoptosis/death. This is how 2DG affects cancer cells more as compared to normal cells.',
        'In addition to this, 2DG can also cause death through obstruction of multiple survival pathways.',
        'Proteins are important components of cellular machinery, structure etc. 2DG interferes with their proper folding, rendering them non functional. These unfolded, non-functional proteins pile up inside the endoplasmic reticulum (a cell organelle used for packaging and transportation of proteins). This leads to ER stress which can ultimately result in cell death.',
        'In order to survive, cancer cells can also direct unfolded protein molecules to a separate compartment called lysosome. Once inside lysosome, cancer cells can degrade these proteins and recycle the degraded components to produce essential proteins again.',
        '2DG interferes with this process of recycling, and leads to death of cancerous cells.',
        '2DG has been shown to be very effective in certain kinds of cancers, especially when administered along with chemotherapy drugs as it enhances toxicity (i.e. killing potential) of chemotherapy.',
        'Along with the above mentioned mechanisms, 2DG is under investigation for other novel mechanisms to treat cancer. This drug can act as a hope in very crucial cases.',
      ],
    },
  ],
}
