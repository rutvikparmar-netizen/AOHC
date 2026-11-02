import type { ArticlePageContent } from '@/types'

/**
 * HIGH-DOSE INTRAVENOUS VITAMIN C
 * ----------------------------------------------------------------------------
 * Migrated from https://artofhealingcancer.com/iv-vitamin-c/ and kept at
 * that URL. Transcribed verbatim.
 *
 * ⚠️  THE REFERENCES WERE SCI-HUB LINKS AND HAVE BEEN REPOINTED AT DOIs.
 * Two of the four cited sources were given as `sci-hub.st/10.1016/...`
 * and `sci-hub.st/10.1126/...` — a piracy mirror. Publishing a cancer
 * clinic's reference list as links to a pirated-paper service is not
 * something to carry forward, and it needed no judgement call to fix: the
 * DOI is sitting inside the URL, so the same two papers now resolve
 * through doi.org. The papers cited are unchanged.
 *
 * ⚠️  THE CONCLUSION CONTRADICTS THIS SITE'S OWN G6PD ARTICLE, and the
 * two pages do not link to each other. This one ends:
 *
 *     "…with almost no side effects related to higher concentrations and
 *      cancer-specific cytotoxicity makes it a preferable and non-toxic
 *      treatment option for patients."
 *
 * `/vitamin-c-infusion-and-g6pd-deficiency` documents, over 26 citations,
 * that high-dose IV vitamin C is CONTRAINDICATED in G6PD deficiency and
 * has caused acute haemolysis. "Almost no side effects" and "non-toxic"
 * cannot both stand next to that. A reader who finds this page and not
 * the other one is being told the opposite of what AOHC's own better
 * article says. The two pages should be cross-linked at minimum.
 *
 * ⚠️  THE INLINE CITATIONS POINT AT A REFERENCE LIST THAT DOES NOT EXIST.
 * The prose carries "9,10", "11–15", "16,17", "[63, 89]", "[51, 89, 100,
 * 101, 102, 103, 179, 180]" and so on — numbering from a source document
 * with at least 184 references. FOUR are given. Every one of those
 * numbers is a dead pointer, and "[x]" in the figure caption is an
 * unfilled placeholder that was published as-is. This is the clearest
 * sign on the site that a page was assembled from another document
 * without being finished.
 *
 * ⚠️  ONE PARAGRAPH IS ABOUT PREGNANCY, NOT CANCER. The "ROS Scavenger"
 * section runs into several sentences on vitamin C, vitamin E and
 * pre-eclampsia, which has nothing to do with the subject of the page and
 * reads as text pasted from a different review. Reproduced, because
 * cutting a clinic's clinical copy is not a developer's call, but it
 * should go.
 *
 * ⚠️  THE FIGURE IS GONE. The source shows a diagram of vitamin C
 * homeostasis with a long caption crediting "Villagrán et al. [x]". The
 * image was not migrated, so a caption describing panels (A) to (D) of a
 * picture that is not there would be worse than nothing. The caption is
 * omitted; restore both together.
 *
 * ⚠️  "Many studies have confirmed the safety and indicated the efficacy
 * of High-dose IV Vitamin C in eradicating tumor cells in many different
 * cancers" is the strongest claim on the page and carries no citation.
 * High-dose IV vitamin C has not been shown in randomised trials to
 * eradicate tumours in humans.
 *
 * ⚠️  THE SOURCE ALSO LISTS ELEVEN FURTHER POSTS in an "IV Vitamin C"
 * category — on VEGF, doxycycline, fast-mimicking diets, 2DG combinations
 * and more. None was in the list to migrate, so none exists here, and the
 * listing is not reproduced; eleven teasers whose "Read More" goes
 * nowhere is eleven dead ends. One of the eleven IS on this site: the
 * G6PD article.
 */
export const ivVitaminC: ArticlePageContent = {
  hero: {
    title: 'What Is High-Dose Intravenous Vitamin C Treatment for Cancer?',
    body: [
      'Vitamin C is a water-soluble vitamin involved in antioxidant activities, which also works as a cofactor for several enzymatic reactions.',
      'In high concentrations given intravenously it can instead act as a pro-oxidant, activating hydrogen-peroxide-dependent cytotoxicity in cancer cells.',
    ],
  },

  lead: [
    'Vitamin C, also known as Ascorbic Acid (AA) or Ascorbate is an organic molecule that is essential for the normal metabolic processes in an organism. It is a water-soluble vitamin that is involved in antioxidant activities and also works as a cofactor for several enzymatic reactions. Its structure is similar to that of glucose, is a multi-hydroxyl compound that can be synthesized by many plants and animals. It is a nutrient that is essential to the human body because of a mutation in the GULO gene for the gulonolactone oxidase (an enzyme necessary for vitamin C synthesis) in humans [1].',
  ],

  sections: [
    {
      title: 'How does it get metabolized?',
      body: [
        'Ascorbic Acid is the reduced form of vitamin C, while dehydroascorbic acid (DHA) is the oxidized form. When vitamin C enters our body, it is transported to the cell through sodium-dependent vitamin C transporters or via GLUT to transport its oxidative product, known as dehydroascorbic acid (DHA). It is reduced to ascorbic acid after transportation into cells. Vitamin C degradation is completed by the hydrolysis of deoxy ascorbic acid to 2,3-diketone-L-gulonate. 2,3-Dione-L-gulonate is further degraded naturally into carbon dioxide, oxalic acid and L-erythrose in vivo. Most of these end products are eventually excreted through the kidneys.',
      ],
    },

    {
      title: 'How does it affect cancer cells?',
      body: [
        'Many studies have confirmed the safety and indicated the efficacy of High-dose IV Vitamin C in eradicating tumor cells in many different cancers.',
      ],
    },

    {
      title: 'Oxygen sensing',
      level: 3,
      body: [
        'The internal region of the tumor does not get enough oxygen and adapts to hypoxic conditions. The tumor cells then start growing independent of oxygen availability. To achieve this they activate a transcription factor HIF-1. Vitamin C regulates HIF hydroxylases that are involved in the deactivation of the transcription Factor HIF-1. Many studies have shown a negative correlation between HIF-1 and Vitamin C levels from tumor samples.',
      ],
    },

    {
      title: 'ROS (reactive oxygen species) scavenger',
      level: 3,
      body: [
        'Vitamin C is a chain-breaking antioxidant that halts the propagation of peroxidative processes and reacts with membrane-bound oxidized vitamin E, thus reducing it back to its native form. Vitamin C also plays a role in many enzyme reactions, including those leading to the synthesis of amino acids and peptide hormones. These findings suggest that vitamin C behaves as an ROS scavenger and may be effective in combating oxidative damage under conditions of increasing oxygen concentrations and apoptosis. Several randomized studies of the efficacy of antioxidant vitamins in preventing preeclampsia have shown no beneficial effects of vitamin C and E supplementation during pregnancy with respect to reducing the risk of preeclampsia. Intriguingly, epidemiological studies have reported a decreasing trend in the incidence of severe preeclampsia among patients with a high dietary intake of vitamin C and increased plasma vitamin C levels.',
      ],
    },

    {
      title: 'As a pro-oxidant',
      level: 3,
      body: [
        'Vitamin C in high concentrations (Intravenously) can act as a Pro-oxidant. This will activate the hydrogen peroxide dependent Cytotoxicity in cancer cells but not in normal cells. This is done so by the redox capability of vitamin C on metals such as iron and copper, which are generally abundant in cancer cells. Hydrogen peroxide reacts with these metal ions to form hydroxyl radicals, which are highly reactive chemical species and can easily damage cellular material Thus killing the cancer cells. Moreover, cancer cells also lack catalase activity which makes them extremely vulnerable to oxidative stress. Increasing oxidative stress in cancer cells can be an important anticancer strategy that works on the same underlying principles such as chemo and radiation therapy.',
        'Effect of glycolysis inhibitors can also be enhanced by high dose vitamin c in ROS dependent manner since both inhibitors increase oxidative stress levels.',
      ],
    },

    {
      title: 'Cofactor activation',
      level: 3,
      body: [
        'As mentioned earlier vitamin c acts as a reducing agent of iron which makes it crucial for Fe containing protein functions such as mitochondrial respiratory chains, collagen synthesis, and oxidative stress regulation.',
      ],
    },

    {
      title: 'EMT and invasion',
      level: 3,
      body: [
        'ECM (extracellular matrix) provides biomechanical and biochemical signals to modulate the behavior of cancer cells whilst maintaining tissue morphology and integrity. The ECM is a dynamic structure that is continually reshaped by a variety of enzymes and signaling molecules. Under pathological conditions, ECM remodeling is often accompanied by cancer growth and cancer metastasis.',
        'Collagen is one of the most important structural proteins which is involved in the adhesion of cells to ECM. Regulation of collagen synthesis is a key factor affecting cancer progression.',
        'Collagen forms a tertiary structure called collagen fibrils, these fibrils are responsible to hold a cell and adhere it to ECM. Vitamin c is known to stabilize these strong crosslinks and prevent neoplastic invasions. Vitamin C is also shown to target cancer invasion by reversing the process of EMT (epithelial to mesenchymal transition) by deactivating HIF (hypoxia-inducible factor). Later it was also shown that vitamin c also works by increasing the E-cadherin levels and reducing vimentin thus suppressing the EMT and inhibiting cell migration.',
      ],
    },

    {
      title: 'Effect on chemotherapy',
      level: 3,
      body: [
        'In pre-clinical models, high-dose Vitamin C is reported to enhance the effectivity of a wide variety of chemotherapeutics such as carboplatin, cisplatin, chlorambucil, 5-FU, gemcitabine and temozolomide in various cancer cell types, often in a synergistic manner or by enhancing treatment efficacy. This is done so by increasing the number of reactive oxygen species.',
      ],
    },

    {
      title: 'Immunomodulation',
      level: 3,
      body: [
        'Most immune cells maintain high levels of vitamin c which can affect many processes involved in the immune response. For example, ascorbate is a well-known antioxidant maintained at a high level in immune cells also its cofactor activity for oxygenases has a detrimental role in the innate and adaptive immune response. Vitamin C is also involved in the differentiation and polarization of myeloid and T-cells, development of B-cells, maturation and activation of T-cells, Cytokine production, Chemotaxis, and enhancing NK cell activity to kill cancer cells. Recent studies have also shown that Vitamin C is also involved in regulating the epigenetic profile of immune cells by TET activity restoration in Treg cells which results in Foxp3 re-expression, driving proper immune cell functions.',
      ],
    },

    {
      title: 'Conclusion',
      body: [
        'To conclude there is a large amount of clinical research which suggests that high dose Vitamin C has the potential to be a great therapeutic agent for cancer treatment strategy. Its participation in increasing the efficacy of chemo, radio, and targeted therapies, with almost no side effects related to higher concentrations and cancer-specific cytotoxicity makes it a preferable and non-toxic treatment option for patients.',
      ],
    },
  ],

  references: [
    {
      text: 'Biomedicine & Pharmacotherapy — doi:10.1016/j.biopha.2020.110588',
      href: 'https://doi.org/10.1016/j.biopha.2020.110588',
    },
    {
      text: 'Science Translational Medicine — doi:10.1126/scitranslmed.aay8707',
      href: 'https://doi.org/10.1126/scitranslmed.aay8707',
    },
    {
      text: 'Antioxidants 2021, 10(12), 1894',
      href: 'https://www.mdpi.com/2076-3921/10/12/1894/htm',
    },
    {
      text: 'Journal of Experimental & Clinical Cancer Research — doi:10.1186/s13046-021-02134-y',
      href: 'https://jeccr.biomedcentral.com/articles/10.1186/s13046-021-02134-y',
    },
  ],
}
