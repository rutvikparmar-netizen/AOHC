import type { ArticlePageContent } from '@/types'

/**
 * HIGH-DOSE VITAMIN C INFUSION AND G6PD DEFICIENCY
 * ----------------------------------------------------------------------------
 * Migrated from https://artofhealingcancer.com/vitamin-c-infusion-and-g6pd-deficiency/
 * and kept at that URL. Transcribed verbatim.
 *
 * ⚠️  THE SOURCE PAGE HAS NO STANDFIRST, so the hero's two sentences are
 * lifted from the article's own "Bottom Line" rather than written. That
 * rule holds for all seven migrated articles: where a summary is needed,
 * it is the page's own words, never a new claim about the page.
 *
 * ⚠️  THE INLINE CITATIONS ARE NUMBERED AGAINST THE REFERENCE ARRAY. The
 * prose says "(15–17)" and "(26)" and means the 15th, 16th, 17th and 26th
 * entries below. REORDERING THAT ARRAY SILENTLY BREAKS EVERY CITATION ON
 * THE PAGE. Append, never insert.
 *
 * ⚠️  FOUR ERRORS IN THE SOURCE ARE REPRODUCED AS FOUND, because this is a
 * migration and silently correcting a clinical page is not a developer's
 * call. Each needs an editor:
 *
 *   1. "free radicals that seap from the electron transport chain" —
 *      "seep".
 *   2. "the use of high-des of vitamin V through IV administration" —
 *      "high doses of vitamin C".
 *   3. The 1993 case ends "resulted in the development of acute
 *      hemodialysis the very next day". The cited paper (Rees 1993) reports
 *      acute HAEMOLYSIS. "Hemodialysis" is a different event and this one
 *      is a factual error, not a typo.
 *   4. Reference 13 gives the page range "245–222", which runs backwards.
 *
 * ⚠️  REFERENCE 19 CITES "glucose-6-phosphatase dehydrogenase", which is
 * two enzymes welded together. The paper is about G6PD. Left as printed.
 *
 * ⚠️  THE OPENING CLAIM — vitamin C "is involved in fifteen types of
 * enzymes in humans as a cofactor" — rests on a single review (ref 1) and
 * should be checked before this is held out as fact.
 */
export const vitaminCG6pd: ArticlePageContent = {
  image: {
    src: '/images/articles/g6pd.png',
    alt: 'Illustration of red blood cells beside the title "Role of IV Vitamin C in G6PD Deficiency"',
    width: 702,
    height: 352,
  },

  hero: {
    title: 'High-Dose Vitamin C Infusion and G6PD Deficiency',
    body: [
      'These case studies provide the rationale that high-dose vitamin C given intravenously is contraindicated in G6PD deficiency.',
      'However, physiologic doses of vitamin C can be used in G6PD deficiency.',
    ],
  },

  lead: [
    'Ascorbic acid or popularly referred to as Vitamin C is involved in fifteen types of enzymes in humans as a cofactor but an important role Vitamin C imparts is in the detoxification of free radicals by donating an electron inside the body, thereby playing a critical role as an antioxidant pharmacologically (1). Vitamin C has two structural forms based on the atoms attached. The first is ascorbic acid, the reduced form while dehydroascorbic acid (DHA) is the second oxidized form. The predominant pro-oxidant activity offered by Vitamin C is because of its capability to reduce ferric ions (Fe3+) converting them to Ferrous ions (Fe2+). This results in hydrogen peroxide and superoxide formation which leads to the creation of DHA (2,3). Therefore, oxidant generation may result in some conditions due to vitamin C. Indeed, the presence of DHA suggests that the cell might be under oxidative stress (4,5). However uncommon but there have been reports that when vitamin C is administered as an intravenous infusion in high doses, it causes hemolysis in patients suffering from glucose-6-phosphate dehydrogenase (G6PD) deficiency.',
  ],

  sections: [
    {
      title: 'What is glucose-6-phosphate dehydrogenase (G6PD) deficiency?',
      body: [
        'Glucose-6-phosphate dehydrogenase (G6PD) deficiency is a disease inherited by the off-springs that occurs due to defects in the genes resulting in an insufficient presence of G6PD in the human blood. G6PD is an essential enzyme required for the regulation of several biochemical processes in the body (6,7). An important function of G6PD is to maintain the health of red blood cells (RBC). In this way, RBCs have a normal span of life and proper function. Without enough G6PD, the premature breaking of RBCs takes place called hemolysis (8). This eventually results in hemolytic anemia. To have a better understanding of how deficiency of G6PD works, one has to have an understanding of how it functions normally.',
        'The energy in human cells is manufactured by the cell’s mitochondria as adenosine triphosphate (ATP) through aerobic respiration. This energy production also forms byproducts like reactive oxygen species (ROS) and free radicals that seap from the electron transport chain (9). Harmful effects on cell membranes, lipoproteins, and DNA occurs due to free radicals including hydroxyl radical, hydrogen peroxide, and superoxide. This leads to cell damage and the breaking of the cell. This stage is often called oxidative stress (10). Multiple mechanisms are used by human cells to neutralize the injurious influence of these ROS and free radicals by making antioxidants to fight oxidative stress.',
        'G6PD has a critical part in glucose metabolism and catalyzes the step in the pathway in which nicotinamide adenine dinucleotide phosphate (NADP+) is reduced to NADPH. NADPH is a reducing coenzyme that changes oxidized glutathione (GSSG) to reduced glutathione (GSH) and this GSH provides protection to cells against oxidative attack or oxidative stress. The pathway that generates NADPH is dependent on the presence of G6PD for the redox reaction. This defense mechanism in RBCs also highly depends on the enzymatic activity of G6PD to tackle the effects of oxidative stress (11). The main problem that occurs in patients with G6PD deficiency is inadequate regeneration of protective glutathione. However, this deficiency in other cells is inconsequential because natural antioxidants supplied by other processes of mitochondria eliminate the ROS. But in RBCs, their organelles including mitochondria are lost naturally during cell maturation. Therefore, RBCs solely depend on the formation of reduced glutathione through the cytosolic pentose phosphate pathway for protection against oxidation. The G6PD deficiency makes RBCs vulnerable due to the absence of glutathione and results in damage due to oxidation and eventually death (12).',
      ],
    },

    {
      title:
        'The relationship of high dose IV vitamin C infusion and G6PD deficiency',
      body: [
        'Ascorbic acid or vitamin C is famous because of its anti-oxidant activity and its ability to donate electrons so that oxidizing radicals can be reduced. This may impart a protective effect in the case of G6PD deficiency in doses slightly higher than the physiologic levels (13). Though in healthy patients, little sequela has been recorded after vitamin C in high doses is given (14), however, there have been reports that when vitamin C is administered to patients with G6PD deficiency in high doses, it causes hemolysis (15–17). It has been observed that when vitamin C is administered in high doses, the function, and survival of RBCs deficient in G6PD decreases (18).',
        'The sequential relationship between the IV vitamin C infusion in high doses and the onset of hemolysis in G6PD deficient patients is very strong. The tolerance against oxidative stress is reduced in patients suffering from G6PD deficiency and therefore, the risk of hemolysis is much more for them. Moreover, the oxidizing agents may induce methemoglobinemia in G6PD deficient patients inducing hemolysis (19). In methemoglobinemia, there is an increased generation of methemoglobin in which the heme iron changes in the hemoglobin from reduced ferrous (Fe2+) form to oxidized ferric (Fe3+) form (20). Vitamin C administered in physiologic doses is used in the treatment of methemoglobinemia as a reducing agent, especially when there is a contraindication of using methylene blue, such as in the case of G6PD deficiency (21).',
        'However, when high serum concentrations are attained by vitamin C, the generation of hydrogen peroxide is promoted by it as a cycling by-product between two forms; ionized and ascorbate radical (22). Hydrogen peroxide functions as a potent oxidizer resulting in the oxidation of hemoglobin and peroxidation of lipids present in cell membranes leading to intravascular hemolysis (23). The same happens in the RBCs of G6PD-deficient patients. Reduced glutathione is required by the glutathione peroxidase enzyme to help in the elimination of hydrogen peroxide. But as discussed earlier, reduced glutathione storage results from the reduction in NADPH, and the glutathione peroxidase is rendered ineffective (7).',
      ],
    },

    {
      title: 'What does the research say?',
      body: [
        'The pharmacological amount of vitamin C has been used in a range of illnesses for more than twenty years (24). Various case studies have reported hemolysis presenting in patients suffering from G6PD deficiency when high doses of vitamin C were given to them. In 1974, a case of 68-year-old black man was reported having complained of acute renal failure along with second-degree burns on his hands. After admission to the hospital, he was administered vitamin C intravenously for two consecutive days in a dose of 80 gm for burns. On the third day of hospitalization, his urine turned dark in color while the color of the serum became red. The cytochemical test indicated that fifty percent of the RBCs did not have G6PD activity (25). In 1990, another case was reported of a 10-year-old boy who was in a stupor on admission to the hospital with a complaint of cola-colored urine. The next day his cousin was brought to the hospital with the same complaint. Although both the boys did not have G6PD deficiency or a history of hemolysis. However, both of their mothers were deficient in G6PD. Upon investigation, it was reported that both the boys had indulged in a “soft drink binge” and consumed almost four to six grams of ascorbic acid resulting in acute hemolysis (16). When the serum concentration of ascorbate reaches 5 mmol/l, it leads to the breakdown of hemoglobin and hemolysis (13).',
        'In 1993, another case was reported of a 32-year-old male G6PD deficient male with a history of malaria and HIV. His treatment regimen included a multivitamin course, glutathione supplements, and essential fatty acids along with a high-dose IV course of vitamin C, forty grams administered three times a week supplemented by twenty to forty grams of oral ascorbic acid every day. The dose of vitamin C transfused IV was eventually raised to eighty grams which resulted in the development of acute hemodialysis the very next day (15). Another case in 2017 of a 59-year-old African American man with a previous medical history of chronic lymphocytic leukemia, rheumatoid arthritis, and hypertension was reported. He reported shortness of breath for three days with weakness and dizziness after administration of seventy-five grams of a high dose of vitamin C intravenously. The same thing happened to him when other medicines were ineffective for his rheumatoid arthritis and he was managed with a high-dose IV vitamin C infusion (26).',
      ],
    },

    {
      title: 'The bottom line',
      body: [
        'These case studies provide the rationale that high-dose vitamin C given intravenously is contraindicated in G6PD deficiency. However, physiologic doses of vitamin C can be used in G6PD deficiency. There has been a rise in the usage of vitamin C in high doses administered intravenously in several diseases and both conventional and alternative medicines have recommended the use of high-des of vitamin V through IV administration for many decades. But some diseases getting benefit from this treatment have been reported to be deficient in G6PD such as HIV and hepatitis B. Therefore, while planning to administer a high dose of vitamin C intravenously, it is better to first establish G6PD deficiency typically through screening. Anytime when hemolytic anemia is observed after giving medicines, especially vitamin C in high doses through intravenous infusion, G6PD deficiency should always be given due consideration. Care must always be taken when vitamin C is being administered in high doses because vitamin C is just like any other drug having side effects.',
      ],
    },
  ],

  references: [
    {
      text: 'Padayatty SJ, Levine M. Vitamin C: the known and the unknown and Goldilocks. Oral Dis. 2016 Sep;22(6):463–93.',
    },
    {
      text: 'Young IS, Woodside JV. Antioxidants in health and disease. J Clin Pathol. 2001 Mar;54(3):176–86.',
    },
    {
      text: 'Rahman K. Studies on free radicals, antioxidants, and co-factors. Clin Interv Aging. 2007 Jun;2(2):219–36.',
    },
    {
      text: 'Lykkesfeldt J, Loft S, Nielsen JB, Poulsen HE. Ascorbic acid and dehydroascorbic acid as biomarkers of oxidative stress caused by smoking. Am J Clin Nutr. 1997 Apr;65(4):959–63.',
    },
    {
      text: 'Schorah CJ, Downing C, Piripitsi A, Gallivan L, Al-Hazaa AH, Sanderson MJ, et al. Total vitamin C, ascorbic acid, and dehydroascorbic acid concentrations in plasma of critically ill patients. Am J Clin Nutr. 1996 May;63(5):760–5.',
    },
    {
      text: 'Panich V. Glucose-6-phosphate dehydrogenase deficiency. Part 2. Tropical Asia. Clin Haematol. 1981 Oct;10(3):800–14.',
    },
    { text: 'Beutler E. G6PD deficiency. Blood. 1994 Dec 1;84(11):3613–36.' },
    {
      text: 'https://www.ncbi.nlm.nih.gov/books/NBK470315/',
      href: 'https://www.ncbi.nlm.nih.gov/books/NBK470315/',
    },
    {
      text: 'Cadenas E, Davies KJ. Mitochondrial free radical generation, oxidative stress, and aging. Free Radic Biol Med. 2000 Aug;29(3–4):222–30.',
    },
    {
      text: 'Frei B. Reactive oxygen species and antioxidant vitamins: mechanisms of action. Am J Med. 1994 Sep 26;97(3A):5S-13S; discussion 22S-28S.',
    },
    {
      text: 'Chaudière J, Ferrari-Iliou R. Intracellular antioxidants: from chemical to biochemical mechanisms. Food Chem Toxicol Int J Publ Br Ind Biol Res Assoc. 1999 Oct;37(9–10):949–62.',
    },
    {
      text: 'Bubp J, Jen M, Matuszewski K. Caring for Glucose-6-Phosphate Dehydrogenase (G6PD)–Deficient Patients: Implications for Pharmacy. Pharm Ther. 2015 Sep;40(9):572–4.',
    },
    {
      text: 'Winterbourn CC. Protection by ascorbate against acetylphenylhydrazine-induced Heinz body formation in glucose-6-phosphate dehydrogenase deficient erythrocytes. Br J Haematol. 1979 Feb;41(2):245–222.',
    },
    {
      text: 'Mühlhöfer A, Mrosek S, Schlegel B, Trommer W, Rozario F, Böhles H, et al. High-dose intravenous vitamin C is not associated with an increase of pro-oxidative biomarkers. Eur J Clin Nutr. 2004 Aug;58(8):1151–8.',
    },
    {
      text: 'Rees DC, Kelsey H, Richards JD. Acute haemolysis induced by high dose ascorbic acid in glucose-6-phosphate dehydrogenase deficiency. BMJ. 1993 Mar 27;306(6881):841–2.',
    },
    {
      text: 'Mehta JB, Singhal SB, Mehta BC. Ascorbic-acid-induced haemolysis in G-6-PD deficiency. Lancet Lond Engl. 1990 Oct 13;336(8720):944.',
    },
    {
      text: 'Huang YC, Chang TK, Fu YC, Jan SL. C for colored urine: acute hemolysis induced by high-dose ascorbic acid. Clin Toxicol Phila Pa. 2014 Nov;52(9):984.',
    },
    {
      text: 'Udomratn T, Steinberg MH, Campbell GD, Oelshlegel FJ. Effects of ascorbic acid on glucose-6-phosphate dehydrogenase-deficient erythrocytes: studies in an animal model. Blood. 1977 Mar;49(3):471–5.',
    },
    {
      text: 'Schuurman M, van Waardenburg D, Da Costa J, Niemarkt H, Leroy P. Severe hemolysis and methemoglobinemia following fava beans ingestion in glucose-6-phosphatase dehydrogenase deficiency: case report and literature review. Eur J Pediatr. 2009 Jul;168(7):779–82.',
    },
    {
      text: 'Ludlow J, Wilkerson R, Nappe T. Methemoglobinemia. StatPearls [Internet]. 2022 Aug 29 [cited 2022 Oct 23].',
      href: 'https://www.statpearls.com/ArticleLibrary/viewarticle/25071',
    },
    {
      text: 'Rino PB, Scolnik D, Fustiñana A, Mitelpunkt A, Glatstein M. Ascorbic acid for the treatment of methemoglobinemia: the experience of a large tertiary care pediatric hospital. Am J Ther. 2014 Aug;21(4):240–3.',
    },
    {
      text: 'Levine M, Padayatty SJ, Espey MG. Vitamin C: a concentration-function approach yields pharmacology and therapeutic discoveries. Adv Nutr Bethesda Md. 2011 Mar;2(2):78–88.',
    },
    {
      text: 'Ibrahim IH, Sallam SM, Omar H, Rizk M. Oxidative Hemolysis of Erythrocytes Induced by Various Vitamins. Int J Biomed Sci IJBS. 2006 Sep;2(3):295–8.',
    },
    {
      text: 'Wilson CWM, Loh HS. VITAMIN C AND COLDS. The Lancet. 1973 May 12;301(7811):1058–9.',
    },
    {
      text: 'Campbell GD, Steinberg MH, Bower JD. Ascorbic Acid-Induced Hemolysis in G-6-PD Deficiency. Ann Intern Med. 1975 Jun;82(6):810–810.',
    },
    {
      text: 'Quinn J, Gerber B, Fouche R, Kenyon K, Blom Z, Muthukanagaraj P. Effect of High-Dose Vitamin C Infusion in a Glucose-6-Phosphate Dehydrogenase-Deficient Patient. Case Rep Med [Internet]. 2017 [cited 2022 Oct 23];2017.',
      href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5727655/',
    },
  ],
}
