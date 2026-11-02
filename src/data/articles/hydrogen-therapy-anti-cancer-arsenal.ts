import type { ArticlePageContent } from '@/types'

/**
 * HYDROGEN THERAPY — A RECENT ADDITION TO ANTI-CANCER ARSENAL
 * ----------------------------------------------------------------------------
 * Migrated from
 * https://artofhealingcancer.com/hydrogen-therapy-a-recent-addition-to-anti-cancer-arsenal/
 * and kept at that URL. Transcribed verbatim.
 *
 * ⚠️  THIS IS THE SECOND HYDROGEN PAGE AND IT OVERLAPS
 * `/hydrogen-inhalation-therapy`. Both cover molecular hydrogen in
 * cancer care, both describe the same three routes of administration,
 * both end on the FDA-and-COVID claim. This one is four times longer,
 * properly structured and far better argued; the other is a page of
 * assertions. If one of the two is to go, this is the one to keep — but
 * they are different enough that merging needs a clinician rather than a
 * redirect. Same situation as the two 2DG pages.
 *
 * ⚠️  TWENTY-NINE NUMBERED CITATIONS AND NO REFERENCE LIST. The prose
 * carries [1] through [29]. The live page's HTML was searched for
 * "References", "Bibliography", "doi.org" and "pubmed": none appears.
 * EVERY CITATION ON THIS PAGE IS A DEAD POINTER. That is the single
 * biggest thing wrong with it, and it is the more galling because the
 * article is otherwise the most carefully written on the site — it names
 * authors and years in the text (Ohsawa 2007, Li 2013, Wang 2018, Chen
 * 2018 and 2019), so the sources plainly existed when it was drafted.
 * The numbers are kept exactly as found so the list can be reattached.
 *
 * ⚠️  TWO CASE REPORTS ARE PRESENTED AS OUTCOMES. A 72-year-old woman
 * with metastatic gallbladder cancer "able to lead a normal life" after
 * three months, and a 44-year-old with NSCLC brain metastases in whom
 * "all the tumours in the brain disappeared completely" after a year of
 * hydrogen monotherapy. These are single cases from the same group
 * (Chen et al.). A reader will take them as what hydrogen does. They
 * need the words "case report" next to them, and they do not have them.
 *
 * ⚠️  THE CLOSING PARAGRAPH IS THE WEAKEST PART OF A STRONG PAGE:
 *   • "regarded as a 'Miracle Molecule' in Cancer treatment which has
 *     the potential to efficiently treat cancer" — by whom?
 *   • "the FDA has started trials for Hydrogen therapy to treat COVID-19"
 *     — the FDA regulates trials, it does not run them. The same error
 *     appears on `/hydrogen-inhalation-therapy`, so it came from one
 *     source and should be corrected in both.
 *   • The last sentence sells hydrogen-rich water on the basis that
 *     celebrities drink it. On a cancer clinic's site, under an article
 *     about treating cancer, that is the sentence to cut first.
 *
 * ⚠️  "No observed complications caused by hydrogen … H2 has no
 * cytotoxicity to humans and animals even when administered at high
 * levels" is an unqualified safety claim, though this page is at least
 * honest enough to give the flammability limit (4% in air) in the same
 * sentence — which the other hydrogen page is not.
 *
 * ⚠️  THE HEADINGS WERE NOT HEADINGS. In the source, "Intro to hydrogen
 * therapy", "Molecular hydrogen", "Mode of administration" and the rest
 * are plain paragraphs styled to look like headings. They are marked up
 * as real headings here, which is a structural repair rather than an
 * edit: the page had no heading hierarchy at all, so nothing could
 * navigate it.
 */
export const hydrogenTherapyAntiCancerArsenal: ArticlePageContent = {
  hero: {
    title: 'Hydrogen Therapy — A Recent Addition to Anti-Cancer Arsenal',
    body: [
      'Hydrogen therapy is the use of molecular hydrogen for rehabilitation and adjuvant therapy.',
      'It has become a novel and promising strategy for various diseases like viral infections, liver damage and cancer.',
    ],
  },

  sections: [
    {
      title: 'Intro to hydrogen therapy',
      body: [
        'Hydrogen therapy is the use of molecular hydrogen for rehabilitation and adjuvant therapy. Hydrogen therapy has become a novel and promising strategy for various diseases like viral infections, liver damage and cancer.',
      ],
    },

    {
      title: 'Molecular hydrogen',
      body: [
        'Hydrogen gas, or H2 molecule is made up of two hydrogen atoms and is a neutral molecule with two electrons and two protons. It has been recognised as a molecule of importance for medical sciences because of its smallest size and high lipid solubility. Smaller size leads to higher diffusion rates while higher solubility in lipids leads to better penetration in in vivo systems. Gas Molecules like H2S, H2, NO, CO etc, have the ability to act as a signalling molecule in various processes. Together they are called gas signalling molecules (GSM). Hydrogen constitutes 0.00005% of the total air in the atmosphere. In order to have its effect for therapy purposes it needs to be provided at upto 1% [1]. That’s why there is a need to take hydrogen passively for treatment purposes.',
      ],
    },

    {
      title: 'Mode of administration',
      body: [
        'Right now, there are three possible ways for the intake of hydrogen for therapeutic purposes:',
      ],
      items: [
        'HYDROGEN GAS INHALATION: hydrogen gas can be administered with the help of a nebuliser, where its different concentrations have been used in trials (67% H2; 33% O2). The flow rates are generally kept at 500ml to 3ltrs per minute. Hydrogen gas reaches to the lung alveoli, and then diffuses into the bloodstream owing to its higher concentration in inhaled air than in the blood reaching to lungs.',
        'HYDROGEN RICH WATER: hydrogen gas is made to dissolve in drinking water and this H2 containing water is consumed by the patient. Here, hydrogen molecules are transferred to the bloodstream through absorption by gut epithelia and then capillaries surrounding those epithelia.',
        'HYDROGEN RICH SALINE INJECTION: in this case, hydrogen gas is mixed with or dissolved in saline and then is administered to patients. This mechanism of administration is also faster, as the cannula is connected to a blood vessel, hydrogen gas directly diffuses in the bloodstream.',
      ],
    },

    {
      title: 'Molecular hydrogen and cancer',
      body: [
        'Hydrogen therapy has found a prominent position in Cancer Treatment. It is now actively used in rehabilitation after adverse cancer treatments like Chemotherapy and Radiotherapy by easing various complications and side effects. Apart from this, Hydrogen therapy has shown promising results as a therapeutic to target cancer in various researches.',
      ],
    },

    {
      title: 'Mechanism of action',
      body: [
        'One of the main decisive factors for the fate of cancer cells is the presence of different Reactive Oxygen Species (ROS) and antioxidants. ROS and antioxidants are antagonists to each other and both work in a paradox i.e. they can both fuel and kill the cancer. The balance between the levels of ROS and Antioxidants in a cell is what affects its viability.',
        'Reactive Oxygen Species or ROS are unstable molecules made from Oxygen atoms and may contain other atoms too. Atomic Number of Oxygen is 8 with an electronic configuration of 1S2 2S2 2P4. Each oxygen molecule (O2) is made up of two Oxygen atoms bonded together. Due to the presence of 2 unpaired electrons in the outer orbit, oxygen is more susceptible to free radical formation.',
        'There are many types of ROS found in our body which actually play a positive role for cells when present in controlled concentrations. It includes hydroxyl radical (•OH), Superoxide ions (•O2–), singlet oxygen (O2•), hydrogen peroxide (H2O2), nitric oxide (NO•), and peroxynitrite (ONOO−), etc. ROS are basically the by-products of oxygen metabolism but play an important role in cell functioning. They can act as signalling molecules to influence various physiological functions like homeostasis and metabolism and can also act as secondary messengers.',
        'Although they have a beneficial role in cellular functioning, it is only limited to their small concentrations. ROS, when present in high concentrations, can attack and irreversibly damage cellular structures like DNA, RNA, Proteins, Lipids, etc. by oxidizing them. This leads to the modification of these components and makes them unable to perform their original functions.',
        'To counter this, our body produces antioxidants which, as the name suggests, prevents oxidation of cellular structures via ROS. Antioxidants are molecules which scavenge ROS molecules, react to them and form stable molecules, thus preventing oxidation. In normal conditions, our body maintains the balance between the concentrations of ROS and antioxidants. Sometimes, due to environmental stress, the concentration of ROS increases drastically which disturbs the balance leading to cell damage by oxidation and ultimately, apoptosis. This is called Oxidative Stress.',
        'The balance between ROS and antioxidants is equally important for every cell including cancer cells. However, in terms of risk analysis, cancer cells are walking down a narrow path, since they produce high concentrations of both the products because of hyperactivity. So maintaining the balance is more essential for them as compared to other cells which also means that disrupting this balance will affect cancer cells more.',
        'In cancer cells, ROS play significant roles like:',
      ],
      items: [
        'It can induce mutations by damaging DNA of cells.',
        'It increases the activity of various cancer linked receptors and oncogenes by serving the role of signalling molecules in various pathways related to oncogenes [2].',
        'It is involved in activation of plasminogen protein to plasmin. Plasmin, along with MMPs, play a role in the degradation of Extracellular matrix leading to the metastasis of cancer. [3]',
      ],
      outro: [
        'Treatment for cancer is all about disrupting the balance between ROS and antioxidants. This can be done in two possible ways, pro-oxidation – increase the levels of ROS using pro-oxidants which will lead to the disruption of cancer cells or anti-oxidation – increase the levels of antioxidants which will also affect the cancer cells due to the absence of tumour promotion activity by ROS.',
      ],
    },

    {
      title: 'Hydrogen as an antioxidant',
      level: 3,
      body: [
        'Recent studies have shown that hydrogen acts as an antioxidant in cells. In 2007, Oshawa et al. reported that hydrogen could treat cerebral ischemia reperfusion injury by selectively reducing the concentration of ROS in an acute rat model. After further investigation, it was found that molecular hydrogen can act as an antioxidant in two ways:',
      ],
      items: [
        'It can directly bind to the most cytotoxic ROS, hydroxyl radical (OH) and reduce it to water.',
        'It can induce the expression of several antioxidant enzymes like superoxide dismutase (SOD), heme-oxygenase-1 (HO-1), nuclear factor erythroid-2-related factor 2 (nrf-2) [4].',
      ],
      outro: [
        'Because of the above written abilities of hydrogen, it is also used nowadays for rehabilitation of patients after chemotherapy and radiotherapy. Major side effect of these therapies is the production of large amounts of ROS which affect normal body tissue. Molecular hydrogen lowers the level of ROS formed and relieves the normal cells from its adverse effect.',
        'In a mouse model of non-small cell lung cancer under the treatment of EGFR inhibitor Gefitinib, it was shown that Hydrogen rich water reduces inflammation, treats the weight loss due to actions of gefitinib and enhances the survival therapy. [5,6]',
        'In a study, it was shown that intraperitoneal injection of hydrogen rich saline can relieve the side effects of Doxorubicin by lowering ROS level, decreasing inflammation, and preventing common side effects like cardiomyopathy and hepatotoxicity. [7,8]',
        'Another study showed that administration of both hydrogen inhalation therapy and hydrogen rich water relieve the side effects of Cisplatin, a chemotherapy drug. It reverses the weight loss caused by the therapy via antioxidant mechanism and reduces nephrotoxicity. [9,10,11]',
      ],
    },

    {
      title: 'Induction of apoptosis',
      level: 3,
      body: [
        'When Our body cells get damaged under stress and if the damage is beyond repair under stress, they are automatically eliminated by our body. This programmed cell death is called apoptosis. It can happen in three ways: [12,13,14]',
      ],
      items: [
        'Activation of external death receptors like FAS, TNF receptors, etc.',
        'Suppression of cell survival pathway proteins like MAPK, VEGF, ERK, PI3K, etc.',
        'Upregulation of pro-apoptotic proteins and down regulation of anti-apoptotic proteins.',
      ],
      outro: [
        'Hydrogen can act as both pro-apoptotic and anti-apoptotic factors. It can induce apoptosis by upregulating pro-apoptotic proteins like BAX, BAK, caspase, etc. and downregulating anti-apoptotic proteins like Bcl-2. [15,16,17]',
      ],
    },

    {
      title: 'Reduce inflammation',
      level: 3,
      body: [
        'Inflammation is primarily caused by inflammatory cytokines like Interleukins, tumour necrosis factor (TNF), etc. Although they work by inducing immune response towards diseases, it has been shown in multiple studies that interleukins and TNF are closely associated with cancer and promote tumour production. [18,19] Inflammation can be a side effect of chemotherapy and can also result in the metastasis of the cancer.',
        'Molecular Hydrogen is strongly reported as the modulator for inflammatory cytokines in several studies. By downregulating the levels of these cytokines, it not only eases the side effects of chemotherapy but also prevents tumour formation and its metastasis. [20,21]',
      ],
    },

    {
      title: 'Tumour shrinkage',
      level: 3,
      body: [
        'Many studies have shown the effectiveness of molecular hydrogen on different kinds of cancer as well as many other diseases in rat models, human cell lines etc. New research along with clinical data are showing promising results in humans also. Hydrogen therapy is being used to control the tumour progression, shrink the tumour size and reduce the side effects of different drugs.',
        'Ji-Bing Chen et al., in 2019, reported a case of a 72 year old woman who was suffering from gallbladder cancer which had metastasized to liver and lymph nodes around pancreas. Chemotherapy had failed to control the progression of her tumour. She was put on hydrogen inhalation therapy. After 1 month of continuous treatment her situation improved and after 3 months she was able to lead a normal life [22].',
        'In 2013, a study done by Li et al. in rat models showed that Hydrogen rich water inhibited several cancer biomarkers like VEGF, STAT3, PCNA, etc. which play a role in tumour formation. [23] Additional benefits of hydrogen were also shown by Daisuke et al. in mice model like lowering of hepatic cholesterol and Peroxisome proliferator activated receptor-alpha (PPARa). It also showed antioxidant effects in the liver while reducing inflammatory effects from cytokines and oxidative stress. [24]',
        'In 2018, another study was done by Wang et al. on lung cancer cell line A549 and H1975 cells which showed that Hydrogen gas has the ability to inhibit the proliferation, migration and invasion of cancer cells by arresting the cells in G2/M phase by downregulating the expression of proteins like CDK4, CDK6, Cyclin D1, SMC3, etc. altogether, it was shown that hydrogen gas inhalation inhibit the tumour growth and shrink it effectively. [25,26]',
        'In 2018 again, it was shown that Hydrogen can effectively inhibit Cancer Stem Cells (CSCs). The study was done in Ovarian cancer cell line Hs38.T and PA-1 cells and involves hydrogen successfully inhibiting proliferation marker Ki67, stem cell marker CD34 and Angiogenesis. Subsequently, it was also shown that hydrogen therapy leads to a decrease in proliferating and migrating properties of these cancer cells which was confirmed by the reduced volume of tumours in mice models. [27]',
        'In 2019, it was shown that Hydrogen inhibits the growth of Glioblastoma which is a form of malignant Brain tumour. Hydrogen, when given through inhalation therapy, significantly inhibits the growth and metastasis of Glioma cells in orthotopic glioma rat models. This can be confirmed by the decrease in colony formation of glioma cells in the rat models which can be credited to the small size of Hydrogen molecule and excellent efficiency to cross the blood brain barrier. [28]',
        'In 2018, Jibing chen et al. reported a female, 44 years old patient with Non-small cell lung cancer which metastasized to the brain and formed tumours. After 4 months of hydrogen therapy, the size of multiple brain tumours reduced significantly and after 1 year of continuous Hydrogen gas monotherapy, all the tumours in the brain disappeared completely. [29]',
      ],
    },

    {
      title: 'Advantages',
      items: [
        'No effect on chemo: Hydrogen efficiently lowers the side effects of chemotherapy without actually interfering with the mode of action of a chemotherapy drug.',
        'Small size, better penetration and efficient Blood brain barrier crossing: Hydrogen can easily diffuse through the epithelial blood brain barrier due to its small size. This is not seen in case of other antioxidants.',
        'Inexpensive: Compared to the other therapies and drugs used for the treatment of cancer, H2 therapy is inexpensive and has very few side effects. It is also easily available in the form of hydrogen water or inhalation devices.',
        'No observed complications caused by hydrogen: Unlike the inhalation of other gases, H2 has no cytotoxicity to humans and animals even when administered at high levels (upto 4% in air, over which it can be flammable) and at high pressure. H2 is also produced by the Gastrointestinal Microbiota in the gut of Humans and many Animals.',
      ],
      outro: [
        'Though Hydrogen is a novel therapy, it is regarded as a ‘Miracle Molecule’ in Cancer treatment which has the potential to efficiently treat cancer and benefit those patients who are going through adverse side effects of Chemotherapy and Radiotherapy. There are many reported cases around the world where patients benefited from the administration of Hydrogen. Right now, Role of hydrogen in treating Viral diseases is also under investigation where the FDA has started trials for Hydrogen therapy to treat COVID-19 infection. Apart from this, Hydrogen rich water has been available in the market for a very long time and has become the center of attraction for not only common people but celebrities, all hail to the excellent antioxidant properties of it.',
      ],
    },
  ],
}
