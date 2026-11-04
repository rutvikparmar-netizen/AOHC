import type { ArticlePageContent } from '@/types'

/**
 * FOUR ONE-OFF PAGES MIGRATED FROM WORDPRESS, KEPT AT THEIR URLs
 * ----------------------------------------------------------------------------
 *   /in-the-loving-memory
 *   /glioblastoma
 *   /insight/leading-accessible-wellness-package-…-kaushik-enclave-burari-delhi-india-patients
 *   /best-doctors-for-high-dose-vitamin-c-for-cancer-treatment-in
 *
 * Each is its own template, so each was drafted from the extracted live
 * text by script (`oneoff-draft.js`) and then put in order by hand. The
 * sentences are the published ones. Every change is listed under its page.
 *
 * Common to all four: the enquiry forms, the "Book a consultation" /
 * "Contact us" banners, the phone/email/address blocks and the images are
 * not carried over (the site-wide contact section closes every page), and
 * the numbering painted on list items ("01 Molecular Oncology") is left to
 * the list markup.
 *
 * ⚠️  TWO OF THESE ARE UNFINISHED TEMPLATES ON THE LIVE SITE. Glioblastoma
 * publishes "[Location]" and "[State Name]" six times, and the Vitamin C
 * page publishes "(...)" or "(…)" ten times, where a city was meant to be
 * filled in. Copying the brackets would put them on the new site too, so
 * they are replaced with the smallest wording that reads (details below).
 */

/* ────────────────────────────────────────────────────────────────────── */

/** /in-the-loving-memory — copied in full; nothing changed. */
export const inLovingMemory: ArticlePageContent = {
  hero: { title: 'In The Loving Memory', body: ['Ruchika Jaiswal, from 1981 to 2022'] },
  image: {
    src: '/images/articles/ruchika-jaiswal.jpg',
    alt: 'Portrait of Ruchika Jaiswal, smiling, in an ornate gold memorial frame',
    width: 500,
    height: 402,
  },
  lead: [
    'Art Of Healing Cancer, the name got its inspiration from the Art of living institution which is a volunteer based non-government organisation spreading peace, Harmony, Through the amazing teachings of yoga, meditation and Sudarshan Kriya.',
    'The idea was conceptualised when Ruchika Jaiswal, A staunch devotee of Art Of Living and Gurudev His Holiness Sri Sri Ravi Shankar Ji, got detected with stage four cancer. It was then that her doctor Dr. Mandeep Singh Malhotra and Ruchika‘s husband Arpan Talwar Teamed together to dive into the immense research done by the greatest of the scientists, to find out if there are ways to cure cancer, extend life with stage four cancer or at the least increase the quality of life. Dr Pradeep Singh Malhotra, Through his immense inclination towards Cancer research and help to humanity, supported Art of Healing Cancer to develop advanced modalities of treatment for cancer patients.',
    'With the blessings of Gurudev Sri Sri Ravi Shankar, Art of Healing Cancer came into being and started specialising in treatment options for advanced cancers across various types of this dreaded disease. During the journey Art of Healing Cancer has gained immense insights, knowledge and experience which we feel shall be of great support to humanity at large.',
    'Unfortunately during this journey Ruchika definitely extended her life from a few months as suggested, to a good number of years but finally succumbed to the disease. Art Of Healing Cancer is dedicated to the patient community, in the living memory of our beautiful guiding force, Ruchika Jaiswal.',
  ],
  sections: [],
}

/* ────────────────────────────────────────────────────────────────────── */

/**
 * /glioblastoma
 *
 * ⚠️  PLACEHOLDERS REPLACED:
 *   • Title and subtitle: "… Treatment in India for Patients from
 *     [Location]" and "… — Welcoming Patients from [Location]" lose the
 *     "from [Location]" phrase.
 *   • "facing a diagnosis of glioblastoma in [State Name], We bring" →
 *     "facing a diagnosis of glioblastoma, we bring".
 *   • "with patients from [State Name] trusting us" → "from across India".
 *   • "Why Patients from [State Name] Choose Us" → "Why Patients Choose Us".
 *   • The closing "Whether you're in [State Name] or anywhere across India,
 *     we're here to help…" banner is dropped with the other contact banners.
 * ⚠️  OTHER CHANGES:
 *   • The four-step process is printed twice on the live page (once as
 *     tabs, once as cards); it appears once.
 *   • The 2-DG card opens with "We offer gene-guided immunotherapy,
 *     tailored to each patient's tumor characteristics." — the next card's
 *     sentence, pasted into the wrong one. It stays with the card it
 *     belongs to.
 *   • Lines the source broke mid-sentence for layout are joined, and a
 *     missing space ("brain cancer.Our team") is restored.
 *   • "Hydrogen Inhalation Threapy" → "Therapy"; the "Connect" button
 *     label run into the last "Why choose us" line is removed.
 *   • ⚠️ FOR CLINICAL REVIEW: "India's first and largest dedicated
 *     Precision Oncology Center" is a superlative with no source, and the
 *     case report is single-patient evidence presented as a "breakthrough".
 */
export const glioblastoma: ArticlePageContent = {
  hero: {
    title: 'Advanced & Integrative Glioblastoma, Glioma & Brain Cancer Treatment in India',
    body: ['Travel to India for World-Class Precision Oncology & Integrative Brain Cancer Care.'],
  },
  sections: [
    {
      title: 'Welcome to the Art of Healing Cancer',
      body: [
        'India’s first and largest dedicated Precision Oncology Center, based in Delhi NCR.',
        'We understand how overwhelming a glioblastoma diagnosis can be. That’s why we combine world-class science with compassionate care to offer renewed hope for patients facing this aggressive brain cancer. Our team uses cutting-edge molecular diagnostics and advanced, personalized therapies to not only fight the disease — but to support your quality of life at every step.',
      ],
    },
    {
      title: 'Bringing World-Class Glioblastoma Care to Delhi NCR',
      body: [
        'If you or your loved one is facing a diagnosis of glioblastoma, we bring world class care directly to you.',
        'At Art of Healing Cancer, India’s first and largest dedicated Precision Oncology Center, we offer cutting-edge, personalized treatment for aggressive brain tumors like Glioblastoma Multiforme (GBM). Located in Delhi NCR, our expertise extends across India, with patients from across India trusting us for their most critical cancer journeys.',
        'Glioblastoma is among the most challenging brain cancers, known for rapid progression and limited response to traditional treatments.',
        'At Art of Healing Cancer, we don’t just follow protocols — we tailor every treatment based on each patient’s unique molecular profile to deliver hope, time, and improved quality of life.',
      ],
    },
    {
      title: 'Our Integrative Cancer Treatment Approach',
      body: ['We combine precision diagnostics, multi-modal therapies, and long-term prevention for deeply personalized care.'],
    },
    {
      title: 'Decode the Disease',
      level: 3,
      body: ['We uncover the molecular fingerprint of your cancer.'],
      items: ['Tumor DNA/RNA sequencing', 'Liquid biopsy and CTC analysis', 'Mutation & resistance marker identification'],
    },
    {
      title: 'Build Your Personalized Protocol',
      level: 3,
      body: ['Your custom plan: conventional & integrative therapies'],
      items: ['Conventional Oncology', 'Integrative & Functional Therapies', 'Off-Label & Molecular Strategies'],
    },
    {
      title: 'Multidisciplinary, Monitored Care',
      level: 3,
      body: ['Dynamic, team-led care tailored in real-time to your response'],
      items: ['Healing-centered environment', 'Real-time monitoring', 'Adaptive care by a multidisciplinary team'],
    },
    {
      title: 'Long Term Recurrence Prevention',
      level: 3,
      body: ['Sustained support for your immune system and wellbeing'],
      items: ['Maintenance nutraceuticals & diet', 'Lifestyle & stress plans', 'Ongoing scans & emotional support'],
    },
    { title: 'Advanced Treatments We Offer for Glioblastoma' },
    {
      title: 'Metabolic Slow Drip Infusion of 2-Deoxy-D-Glucose (2-DG) Therapy',
      level: 3,
      body: [
        'A unique metabolic therapy that targets glioblastoma’s abnormal glucose metabolism, enhancing treatment sensitivity and selectively impacting tumor cells with minimal systemic toxicity.',
      ],
    },
    {
      title: 'Targeted Immunotherapy Based on Gene Profile',
      level: 3,
      body: ['We offer gene-guided immunotherapy, tailored to each patient’s tumor characteristics.', 'For example:'],
      items: [
        'Bevacizumab (Avastin) in VEGF-positive, highly angiogenic glioblastomas, where it effectively blocks blood vessel formation and reduces intracranial pressure.',
        'Other immunomodulatory or checkpoint-targeting agents, selected based on tumor markers and immune profiling.',
      ],
    },
    {
      title: 'Metronomic & Mediated Chemotherapy',
      level: 3,
      body: [
        'We utilize case-dependent low-dose, cyclical chemotherapy protocols—designed to minimize toxicity while maintaining anti-tumor pressure.',
        'These are guided by real-time molecular data, tumor behavior, and patient tolerance.',
      ],
    },
    {
      title: 'Electro-Capacitive Cancer Therapy (ECCT)',
      level: 3,
      body: [
        'A non-invasive modality that uses low-intensity electric fields to disrupt tumor mitosis. ECCT is an exciting adjunctive therapy in glioblastoma, especially when surgery or radiation is not an option.',
      ],
    },
    {
      title: 'Hydrogen Inhalation Therapy',
      level: 3,
      body: [
        'By gently inhaling medical hydrogen gas through a special device, this therapy helps reduce inflammation, protect brain cells, and support healing. As a selective antioxidant, it plays a helpful role in managing glioblastoma—especially when used as part of an integrative treatment plan.',
      ],
    },
    {
      title: 'Targeted Off-Label & Natural Medicine Approach',
      level: 3,
      body: [
        'We use targeted off-label drugs based on your tumor’s profile to inhibit growth and improve outcomes. Natural compounds like AKBA (Boswellic Acid) and Curcumin are included to support immunity and enhance effectiveness. All therapies are selected for their ability to cross the blood-brain barrier and complement conventional treatments—boosting both quality of life and clinical results.',
      ],
    },
    { title: 'What Makes Our Approach Unique?' },
    {
      title: 'Empirical + Precision-Based Oncology, Tailored to You',
      level: 3,
      body: [
        'We understand the urgency and complexity of glioblastoma. That’s why, in select patients, we begin with empirical treatments that have shown clinically significant benefit in multiple cases, even before the full molecular workup is complete. This ensures no time is lost, especially in rapidly progressive disease.',
      ],
    },
    { title: 'Our comprehensive diagnostic approach includes' },
    {
      title: 'CSF Analysis for Circulating Tumor Cells (CTCs)',
      level: 3,
      body: [
        'We use a minimally invasive test of your cerebrospinal fluid to detect and track tumor cells in real time. This allows us to closely monitor disease progression or response to treatment — without the need for repeated surgical biopsies.',
      ],
    },
    {
      title: 'Comprehensive Genomic Profiling',
      level: 3,
      body: [
        'Our diagnostic panel examines key genetic and molecular markers such as IDH1/2 mutations, MGMT promoter methylation, EGFR amplification, VEGF expression, and more. These insights help us identify how your tumor behaves and which therapies it may respond to best.',
      ],
    },
    {
      title: 'Individualized Precision Protocols',
      level: 3,
      body: [
        'Based on your unique molecular and immune profile, our multidisciplinary tumor board develops a personalized treatment plan. This ensures that your therapy is not only evidence-based but also aligned with your body’s biology for the best possible outcome.',
      ],
    },
    { title: 'New Hope in Brain Cancer Treatment: Slow-Infusion 2-DG Therapy Shows Promise' },
    {
      title: 'A Breakthrough Case Study from the International Journal of Complementary and Internal Medicine',
      level: 3,
      body: [
        'This case report highlights the use of low-dose, slow-infusion (metronomic) 2-deoxy-D-glucose (2-DG) as adjunct therapy in a patient with refractory Glioblastoma Multiforme (GBM). By targeting cancer cell metabolism, this novel approach led to marked clinical and radiological improvement, including seizure control and disease stabilization—offering a potential breakthrough for treating this highly resistant brain cancer.',
      ],
    },
    {
      title: 'Why Patients Choose Us',
      items: [
        'India’s First Dedicated Precision Oncology Center',
        'Leading Experts in Brain Tumor Management',
        'Real-Time Tumor Monitoring via Liquid Biopsies & Imaging',
        'Holistic, Compassionate Care Beyond Just Treatment',
        'Focus on Long-Term Survival & Quality of Life',
      ],
    },
  ],
  references: [
    {
      text: 'Impact of Slow-Infusion (Metronomic) 2-Deoxy-D-Glucose in Treatment of Refractory Patient of Glioblastoma Multiforme. International Journal of Complementary and Internal Medicine.',
      href: 'https://ijcimjournal.com/index.php/1/article/view/47/33',
    },
  ],
}

/* ────────────────────────────────────────────────────────────────────── */

/**
 * /insight/leading-accessible-wellness-package-and-trusted-precision-experts-in-india-innovative-precision-metabolic-end-stage-breast-cancer-care-for-kaushik-enclave-burari-delhi-india-patients
 *
 * A page from the separate "AOHC-insight" WordPress install (/insight/…),
 * the newer location template. It is a doorway page like the city pages:
 * a town name in a page about AOHC's Gurugram centre.
 *
 * ⚠️  CHANGES:
 *   • Under "Robotic Breast Surgery" the live page repeats the "We
 *     specialize in treating patients with" list of breast-cancer
 *     subtypes under a "We offer:" label, a copy-paste. It is dropped.
 *   • "B2-Deoxy-D-glucose (2DG) slow trip infusion" → "2-Deoxy-D-glucose
 *     (2DG) slow drip infusion", spelling only.
 *   • "We welcome patients from:" was a map image with no text; dropped.
 *   • ⚠️ FOR CLINICAL REVIEW: "supportive therapies proven to improve
 *     outcomes" and "All therapies are backed by scientific rationale"
 *     are stronger than the evidence for several items on that list
 *     (mistletoe, 2-DG, SOT). The testimonial is reproduced as published;
 *     AOHC should hold the patient's consent for it.
 */
export const breastCancerBurari: ArticlePageContent = {
  hero: {
    title: 'End stage breast cancer Treatment in India for Patients from Kaushik Enclave, Burari, Delhi, India',
    body: ['Treating patients from Kaushik Enclave, Burari, Delhi, India seeking world-class, biology-driven breast cancer care in India.'],
  },
  lead: [
    'At Art of Healing Cancer, we provide advanced, personalized, and integrative treatment for all Stages of breast cancer. Our care protocols are trusted by patients from across the world — including the USA, Canada, UK, Australia, Singapore, Africa, and the Middle East — who seek targeted therapy, non-toxic support, and better outcomes beyond conventional pathways.',
  ],
  sections: [
    {
      title: 'A Global Destination for Breast Cancer Healing',
      body: [
        'We are not a conventional cancer center, we are a precision-integrative metabolic clinic designed for patients who want deep personalization, advanced diagnostics, and holistic support throughout their treatment journey.',
      ],
      items: ['Molecular Oncology', 'Robotic Surgery', 'Metabolic Therapy', 'Immunologic support', 'Real-time tumor response monitoring'],
    },
    {
      title: 'We specialize in treating patients with',
      level: 3,
      items: [
        'Triple-Negative Breast Cancer (TNBC)',
        'HER2+ or ER/PR+ Subtypes',
        'Recurrent, Metastatic, or High-Risk Disease',
        'Bone Metastases or Residual Disease after prior Treatment',
      ],
    },
    { title: 'Our Four-Part Breast Cancer Protocol' },
    {
      title: '01/ Precision Diagnostics',
      level: 3,
      body: ['We begin by understanding your cancer’s unique biology, not just the stage or grade.'],
      items: [
        'Next-Generation Sequencing (NGS)',
        'RGCC Onconomics Plus, SOT, EMT, CTC Enumeration',
        'Liquid biopsies (Guardant360, FoundationOne, etc.)',
        'Tumor marker analysis and metabolic profiling',
      ],
      outro: ['This allows us to select only the agents and therapies most likely to work for you, minimizing side effects and maximizing effectiveness.'],
    },
    {
      title: '02/ Integrative & Metabolic Oncology',
      level: 3,
      body: ['Our international treatment protocols include supportive therapies proven to improve outcomes, reduce recurrence risk, and enhance immune resilience.'],
      items: [
        '2-Deoxy-D-glucose (2DG) slow drip infusion',
        'High-dose IV Vitamin C (25–75g)',
        'Mistletoe therapy (IV & subcutaneous)',
        'Curcumin, EGCG, AKBA, Metformin, Everolimus, Doxycycline',
        'Anti-inflammatory clean ketogenic diet',
        'Intermittent fasting and mitochondrial support',
      ],
      outro: ['All therapies are backed by scientific rationale and customized to each patient’s markers and tolerability.'],
    },
    {
      title: '03/ Robotic Breast Surgery (If Required)',
      level: 3,
      body: [
        'Performed by Dr. Mandeep Singh Malhotra, Director of Breast Oncology and Head & Neck Surgery at Art of Healing Cancer, our robotic surgeries offer:',
      ],
      items: [
        'Better cosmetic and functional outcomes',
        'Preservation of lymphatic and nerve pathways',
        'Less pain and shorter hospital stay',
        'Advanced axillary clearance when required',
      ],
    },
    {
      title: '04/ Immune Modulation & Long-Term Control',
      level: 3,
      body: ['For select cases, we offer additional personalized therapies based on tumor immune environment and clinical response:'],
      items: [
        'Tumor-targeted autologous vaccines',
        'SOT (Supportive Oligonucleotide Therapy) non-toxic, gene-silencing strategy from Europe',
        'Circulating Tumor Cell (CTC) Monitoring for treatment adaptation',
      ],
    },
    {
      title: 'A Survivor’s Voice: Stage 4 Breast Cancer from Singapore',
      body: [
        '“I was diagnosed with Stage IV breast cancer that had spread to my bones. I found Art of Healing Cancer at a time when I needed more than just standard chemotherapy. Dr. Mandeep Singh Malhotra and his team offered me a complete protocol, starting with precision tests, a customized chemo plan, and metabolic support to protect my energy and immunity. Today, I am pain-free, living well, and deeply grateful. This place didn’t just treat my cancer. They treated me.”',
        '— Susan, Singapore. Stage IV Breast Cancer.',
      ],
    },
    {
      title: 'Designed for Patients around the world',
      items: [
        'Dedicated care coordinators fluent in English and trained in international protocol expectations',
        'Assistance with visa documentation, airport pickup, and hotel stays',
        'Private suites and ICU-equipped recovery rooms',
        'Ability to coordinate with your local oncologist for co-management or follow-up',
        'Concierge support for long-stay arrangements (6 to 8 weeks)',
      ],
    },
  ],
}

/* ────────────────────────────────────────────────────────────────────── */

/**
 * /best-doctors-for-high-dose-vitamin-c-for-cancer-treatment-in
 *
 * ⚠️  THE URL ITSELF ENDS "…treatment-in" — the city was never filled in,
 * on the slug or on the page. It is kept because it is the URL that
 * earns the clicks.
 *
 * ⚠️  PLACEHOLDERS REPLACED: every "(...)" / "(…)" — ten of them, in the
 * title, headings and prose — reads "India", the one place the page's
 * own meta description names ("Art of Healing Cancer in India").
 * ⚠️  OTHER CHANGES:
 *   • "We involve you information and-making process" → "We involve you
 *     in the decision-making process", restoring garbled words.
 *   • "Effects on Cancer Cells": the seven mechanisms, each a one-item
 *     list under its own label, are one list of "Label: text" items.
 *   • The quote's link token to artofhealingcancer.com is dropped from
 *     the sentence; the mini-profile under it ("More experienced and
 *     highly Qualified Oncologist", "More than 20-year experience") is
 *     not reproduced — doctor details come only from Our Doctors.
 *   • ⚠️ FOR CLINICAL REVIEW: the quote says IV vitamin C "is more
 *     effective in killing cancer cells than conventional therapies",
 *     that it "has proven to be beneficial in … several human clinical
 *     trials", and that the team "is going to start" this treatment (the
 *     quote is dated). The FAQ, by contrast, calls it complementary.
 */
export const vitaminCDoctors: ArticlePageContent = {
  hero: {
    title: 'Book an appointment with the top high dose Vitamin C specialists for cancer treatment in India',
    body: ['In India, high dose Vitamin C therapy is emerging as an innovative approach in cancer treatment.'],
  },
  sections: [
    {
      title: 'Best options for High Dose Vitamin C for Cancer Treatment in India',
      body: [
        'In India, high dose Vitamin C therapy is emerging as an innovative approach in cancer treatment. Our specialized team in India is well-versed in harnessing the potential of high-dose Vitamin C to complement conventional cancer therapies, offering a holistic treatment approach.',
      ],
    },
    {
      title: 'Treatment Options in India',
      body: ['High Dose Vitamin C Infusions: India’s leading healthcare centres provide high-dose Vitamin C infusions, administered by experienced medical professionals.'],
    },
    {
      title: 'Integration with Conventional Treatments',
      level: 3,
      body: ['Our experts seamlessly integrate high-dose Vitamin C therapy with conventional cancer treatments to enhance their effectiveness while minimizing side effects.'],
    },
    {
      title: 'Personalized Treatment Plans',
      level: 3,
      body: ['Each patient in India receives a personalized treatment plan, tailored to their specific needs and medical condition.'],
    },
    {
      title: 'Ongoing Research',
      level: 3,
      body: ['We stay abreast of the latest research and developments in high-dose Vitamin C therapy, ensuring that you receive the most up-to-date and evidence-based care.'],
    },
    {
      title: 'Quality of Life Enhancement',
      level: 3,
      body: ['High-dose Vitamin C therapy not only targets cancer but also focuses on improving your quality of life. It can alleviate symptoms, reduce pain, and enhance overall well-being.'],
    },
    {
      title: 'Open Communication',
      level: 3,
      body: [
        'Our healthcare team believes in open and transparent communication. We involve you in the decision-making process, provide you with comprehensive information, and encourage questions and discussions throughout your treatment.',
        'Choose India for high-dose Vitamin C cancer treatment and experience a holistic approach to healing that prioritizes your well-being and quality of life.',
      ],
    },
    {
      title: 'Art of Healing Cancer (AOHC India): A Comprehensive Guide to Integrative Cancer Treatment',
      body: [
        'Welcome to the Art of Healing Cancer (AOHC India), where we explore the world of cancer treatment through a holistic and integrative approach. In this comprehensive guide, we will delve into the intricate aspects of cancer, focusing on genes involved, intravenous Vitamin C (IVC) therapy, and nutraceuticals that can inhibit cancer-related genes. Our mission is to provide you with accurate and well-researched information to empower you in your journey to fight cancer.',
      ],
    },
    {
      title: 'Understanding Cancer',
      level: 3,
      body: [
        'Cancer is a complex disease that affects millions of people worldwide. It is characterized by the uncontrolled growth and division of abnormal cells within the body. Cancer can manifest in various forms, such as breast cancer, lung cancer, prostate cancer, and many others. AOHC India is dedicated to shedding light on all types of cancer and their unique challenges.',
      ],
    },
    {
      title: 'Cancer and Ascorbic Acid: A Natural Approach to Tumor Reduction',
      level: 3,
      body: [
        'Cancer remains a widespread and life-threatening disease affecting millions of individuals worldwide. Traditional treatments such as chemotherapy and radiotherapy are commonly employed in the fight against cancer. However, in recent years, the potential role of ascorbic acid, commonly known as vitamin C and naturally found in citrus fruits, has garnered attention in cancer management due to its antioxidant properties and various crucial functions in the human body.',
      ],
    },
    {
      title: 'Mechanism of Action',
      body: [
        'High-dose intravenous Vitamin C (IVC) therapy has gained recognition as a potential adjunctive treatment for cancer. IVC involves the administration of Vitamin C directly into the bloodstream, bypassing the digestive system. This method allows for higher levels of Vitamin C to be delivered to the body’s cells, potentially enhancing its anti-cancer effects.',
      ],
    },
    {
      title: 'High-Dose Intravenous Vitamin C (IV Vitamin C) Treatment for Cancer: What You Need to Know',
      level: 3,
      body: [
        'Vitamin C, also known as Ascorbic Acid (AA) or Ascorbate, is a vital organic molecule crucial for normal metabolic processes in the body. It serves as a water-soluble vitamin with antioxidant properties and plays a role as a cofactor in various enzymatic reactions. Humans rely on dietary sources of vitamin C due to a genetic mutation that impairs its synthesis.',
      ],
    },
    {
      title: 'Metabolism of Vitamin C',
      level: 3,
      body: [
        'Ascorbic Acid, the reduced form of vitamin C, undergoes metabolism in the body. After ingestion, vitamin C is transported into cells through specific transporters or GLUT transport. Within cells, it is converted back to ascorbic acid. Subsequently, vitamin C degradation leads to the formation of end products such as carbon dioxide, oxalic acid, and L-erythrose, which are eventually excreted through the kidneys.',
      ],
    },
    {
      title: 'Vitamin C: A Micronutrient with Potential in Cancer Treatment',
      level: 3,
      body: [
        'Vitamin C, also known as ascorbic acid, is an essential micronutrient for humans due to our inability to synthesize it. Among the many dietary antioxidants, ascorbic acid stands out for its potent antioxidant properties. In the 1950s, there was initial optimism that vitamin C could prevent cancer. However, in the 1970s, Linus Pauling and Ewan Cameron suggested a potential therapeutic role, citing improved survival rates in advanced-stage cancer patients who received high-dose intravenous vitamin C (IV Vit C) treatment. Subsequently, multiple randomized controlled studies (RCTs) employing large oral vitamin C doses failed to replicate these benefits, raising doubts about the treatment’s efficacy.',
      ],
    },
    {
      title: 'Intravenous Ascorbic Acid: A Promising Approach',
      level: 3,
      body: [
        'Recent literature highlights a crucial factor: the limited absorption rate of oral vitamin C in the stomach. This limitation necessitates intravenous or intraperitoneal administration to achieve the significantly elevated plasma concentrations required for therapeutic purposes. Human plasma concentrations resulting from high-dose IV vitamin C can be approximately two hundred times higher than those achieved through oral vitamin C treatment. Consequently, it is essential to recognize that high-dose vitamin C treatments administered orally and intravenously represent distinct therapeutic approaches with varying potential benefits.',
      ],
    },
    { title: 'High-Dose IV Vitamin C: Boosting Immunity for Enhanced Anti-Tumor Response' },
    {
      title: 'Role of Vitamin C in Immunity',
      level: 3,
      body: [
        'Vitamin C, a potent antioxidant, plays a pivotal role in fortifying the body\'s immune system. It acts as a cofactor for essential enzymes involved in critical signaling pathways. Vitamin C accumulates in immune cells, generating reactive oxygen species (ROS) and Fe+2 species, contributing to cell elimination.',
      ],
    },
    {
      title: 'Enhancing Cancer Treatment',
      level: 3,
      body: [
        'Vitamin C can combat resistance to anti-cancer drugs, making it a valuable addition to cancer therapy. It sensitizes tumor cells to conventional treatments like cisplatin, paclitaxel, and doxorubicin. Furthermore, it synergizes with radiotherapy and chemotherapy by reducing resistance mechanisms often seen in cancer cells.',
      ],
    },
    {
      title: 'Role of Vitamin C in Chemokines Production',
      level: 3,
      body: [
        'Vitamin C modulates the immune response against cancer by promoting the production of cytokines and chemokines. It boosts Treg cell function through the TET mechanism and enhances natural killer cell activity.',
      ],
    },
    {
      title: 'Experimental Findings',
      level: 3,
      body: [
        'In vivo and in vitro experiments highlight vitamin C\'s potential in fortifying Treg cells and natural killer cells to combat various cancers, suggesting its effectiveness as a cancer treatment.',
      ],
    },
    {
      title: 'Effects on Cancer Cells',
      body: ['High-dose IV Vitamin C has garnered attention for its potential in eradicating cancer cells, supported by several mechanisms:'],
      items: [
        'Oxygen Sensing: Tumor cells adapt to low oxygen levels by activating the transcription factor HIF-1. Vitamin C regulates HIF hydroxylases, leading to decreased HIF-1 activity, which has been observed in tumor samples.',
        'ROS Scavenger: Vitamin C acts as an antioxidant, countering oxidative damage and apoptosis. It also reacts with oxidized vitamin E, restoring it to its native form.',
        'Pro-Oxidant: In high concentrations, intravenous vitamin C can act as a pro-oxidant, generating hydrogen peroxide-dependent cytotoxicity in cancer cells while sparing normal cells. This is achieved through redox reactions with metals like iron and copper, which are abundant in cancer cells.',
        'Cofactor Activation: Vitamin C’s role as a reducing agent for iron is crucial for functions such as mitochondrial respiratory chains, collagen synthesis, and oxidative stress regulation.',
        'EMT and Invasion: Vitamin C stabilizes collagen crosslinks, inhibiting neoplastic invasion. It also reverses epithelial mesenchymal transition (EMT) and reduces cell migration by deactivating HIF.',
        'Effect on Chemotherapy: High-dose vitamin C enhances the effectiveness of various chemotherapeutic agents in pre-clinical models, often by increasing the production of reactive oxygen species.',
        'Immunomodulation: Vitamin C affects immune cells by influencing processes like differentiation, polarization, cytokine production, chemotaxis, and enhancing natural killer (NK) cell activity. It also plays a role in regulating the epigenetic profile of immune cells.',
      ],
    },
    {
      title: 'Combining Intravenous Vitamin C and Fasting-Like Diet for Cancer Treatment',
      level: 3,
      body: [
        'High-dose intravenous vitamin C (IVC) has emerged as a safe and promising anti-cancer therapy, either as monotherapy or in combination with conventional treatments. It improves patient quality of life and mitigates chemotherapy-related side effects. When paired with a fasting-like diet, vitamin C exhibits enhanced potential against cancer. Animal trials demonstrate slowed tumor growth and, in some cases, disease remission, particularly in colorectal cancer models. The combination addresses previous challenges, making vitamin C more detrimental to cancer cells by reducing protective ferritin levels. Ongoing clinical trials explore this approach in various cancer types, presenting an innovative and well-tolerated strategy. Additionally, fasting-mimicking diets offer multiple health benefits, including weight loss, cardiovascular health improvement, and potential cancer treatment support, enhancing overall well-being.',
      ],
    },
    {
      title: 'High-Dose Vitamin C Suppresses VEGF Expression in Cancer',
      level: 3,
      body: [
        'A study explored the anti-cancer effects of high-dose vitamin C (VitC) on vascular endothelial growth factor (VEGF) expression in mice with Colon 26 rectal cancer xenografts. Administering high-dose VitC led to reduced VEGFA and VEGF D levels, decreased tumor volumes, and lowered levels of reactive oxygen species and HIF-1α. This research suggests that high-dose VitC inhibits tumor angiogenesis, contributing to its anti-cancer properties.',
      ],
    },
    {
      title: 'High-dose intravenous Vitamin C as Adjunctive Therapy to Chemo and Radiation',
      level: 3,
      body: [
        'Several epidemiological studies highlight the potential anti-cancer benefits of vitamin C, which plays essential roles in various bodily functions. While animal studies have shown that oral vitamin C supplements can impede tumor development, higher doses than those achievable through diet are often needed for cancer management. Intravenous (IV) vitamin C has been used for years as a complementary cancer therapy. Concerns about its antioxidant nature potentially interfering with chemotherapy have been raised, but research indicates that IV vitamin C can sensitize cancer cells to radiation and chemotherapy while sparing healthy cells. Clinical studies have reported increased survival rates and tumor regression when IV vitamin C is combined with standard cancer treatments. Overall, IV high-dose vitamin C shows promise as an effective adjunctive anti-cancer therapy.',
      ],
    },
    {
      title: 'High-dose vitamin C Infusion and G6PD Deficiency',
      level: 3,
      body: [
        'Vitamin C, known for its antioxidant properties, plays a crucial role in various bodily functions. However, high-dose intravenous vitamin C can lead to hemolysis in individuals with glucose-6-phosphate dehydrogenase (G6PD) deficiency, a genetic condition affecting red blood cell health. G6PD is essential for maintaining the lifespan and function of red blood cells, protecting them from oxidative stress. In G6PD-deficient individuals, the absence of this protection makes their red blood cells vulnerable to oxidative damage and premature destruction, resulting in hemolytic anemia. High-dose vitamin C can exacerbate this condition by promoting the generation of hydrogen peroxide, causing oxidative damage to hemoglobin and cell membranes. While vitamin C has therapeutic potential, especially in diseases like HIV and hepatitis B, screening for G6PD deficiency is essential before administering high-dose intravenous vitamin C to avoid hemolytic complications.',
      ],
    },
    {
      title: 'Does High-Dose Vitamin C Enhance Immunotherapy?',
      level: 3,
      body: [
        'Cancer is a complex disease involving the tumor microenvironment (TME), a diverse ecosystem of cells and molecules. Immunotherapy has shown promise in cancer treatment, but the TME often suppresses the immune system\'s response. Vitamin C, known for its antioxidant properties, has been studied for its potential anti-cancer effects. Recent research suggests that vitamin C can modulate the TME and enhance immunotherapy. Vitamin C affects various immune cells, promoting T-cell activation and natural killer (NK) cell maturation. It can also reduce immunosuppressive cells like regulatory T-cells and reprogram tumor-associated macrophages. When combined with immunotherapies like checkpoint inhibitors, high-dose vitamin C has shown promise in animal studies, leading to improved tumor response. While more research is needed, vitamin C\'s immunomodulatory properties may enhance the effectiveness of cancer immunotherapies.',
      ],
    },
    {
      title: 'High-Dose Intravenous Vitamin C in Combination with 2-Deoxy Glucose (2DG) for Cancer Treatment',
      level: 3,
      body: [
        'Both intravenous vitamin C (ascorbic acid) and 2-deoxy glucose (2DG) have shown promise in targeting cancer cells. Vitamin C can disrupt the glucose metabolism crucial for tumor cell survival by binding to glucose transporters, limiting glucose uptake, and inducing oxidative stress, leading to cell death. Similarly, 2DG, a glucose analog, interferes with cancer cells\' energy production via glycolysis. When these two treatments are combined, they synergistically enhance their effectiveness against cancer. In vitro experiments on breast cancer cell lines demonstrated that the combined therapy reduced tumor size more effectively than individual treatments. In vivo experiments with animal models and human trials also showed promising results, suggesting that this combination therapy could be a potent strategy for various cancer types, with minimal impact on normal cells.',
      ],
    },
    {
      title: 'High dose Vitamin C for Cancer Treatment in India',
      body: [
        'In Our Doctor’s Words:',
        '“Intravenous (IV) vitamin C (high dose) is an effective integrative approach to target diverse types of cancer and is reported to shrink tumor size and growth. Dr. Mandeep Singh Malhotra (Chief Mentor and Clinical Lead of Art of Healing Cancer) with his team is going to start treatment of different cancers using high-dose IVC. With more than 20 years of clinical experience, he is a talented and active oncologist. Treatment of different cancers using high doses of IV vitamin C has proven to be beneficial in vitro, in vivo, animal studies and several human clinical trials. So, patients will benefit from this approach because it is more effective in killing cancer cells than conventional therapies, as conventional therapies can develop resistance” said Dr Mandeep Singh Malhotra.',
      ],
    },
    { title: 'Frequently Asked Questions' },
    {
      title: 'How does high-dose vitamin C therapy work in cancer treatment?',
      level: 3,
      body: ['High-dose Vitamin C therapy involves administering Vitamin C intravenously at higher-than-normal doses. It is believed to have cytotoxic effects on cancer cells and may enhance the effectiveness of conventional cancer treatments.'],
    },
    {
      title: 'What types of cancers can benefit from High Dose Vitamin C therapy?',
      level: 3,
      body: ['High-dose Vitamin C therapy has been explored as a complementary treatment for various types of cancer, including breast cancer, pancreatic cancer, lung cancer, and more. It is often used in conjunction with conventional therapies.'],
    },
    {
      title: 'Is high-dose vitamin C therapy safe?',
      level: 3,
      body: ['High-dose Vitamin C therapy is considered safe when administered by qualified healthcare professionals. However, it may not be suitable for all individuals, and potential side effects should be discussed with your healthcare team.'],
    },
    {
      title: 'How is the dosage of Vitamin C determined in high-dose Vitamin C therapy?',
      level: 3,
      body: ['The dosage of Vitamin C in High-dose Vitamin C therapy is tailored to each patient’s specific needs and medical condition. It is determined by healthcare professionals based on factors like the type and stage of cancer.'],
    },
    {
      title: 'Are there any potential interactions between High Dose Vitamin C therapy and other cancer treatments?',
      level: 3,
      body: ['High-dose Vitamin C therapy is often used alongside conventional cancer treatments like chemotherapy and radiation therapy. Your healthcare team will carefully plan and monitor your treatment to minimize any potential interactions or side effects.'],
    },
    {
      title: 'Can I receive a dose Vitamin C therapy as a standalone treatment, or does it need to be combined with other therapies?',
      level: 3,
      body: ['High-dose Vitamin C therapy is typically used as a complementary treatment alongside conventional cancer therapy. It is essential to discuss your treatment plan with your healthcare team to determine the most suitable approach for your specific case.'],
    },
  ],
}

/** Route metadata. Descriptions are the pages' own meta descriptions,
 *  except Glioblastoma's, which was its first lines with "[Location]" in
 *  them; it is the page's subtitle and opening line instead. */
export const landingPagesMeta = {
  memory: {
    title: 'Ruchika Jaiswal - In the Loving Memory',
    description: 'Art Of Healing Cancer is dedicated to the patient community, in the living memory of our beautiful guiding force, Ruchika Jaiswal.',
  },
  glioblastoma: {
    title: 'Advanced & Integrative Glioblastoma, Glioma & Brain Cancer Treatment in India',
    description: 'Travel to India for World-Class Precision Oncology & Integrative Brain Cancer Care at Art of Healing Cancer, India’s first and largest dedicated Precision Oncology Center, based in Delhi NCR.',
  },
  burari: {
    title: 'Innovative Precision Metabolic End Stage Breast Cancer Care for Kaushik Enclave, Burari, Delhi, India Patients',
    description: 'At our India centre, Kaushik Enclave, Burari, Delhi, India patients with End stage breast cancer receive advanced precision metabolic therapies from skilled Accessible Wellness Package and trusted precision experts. By integrating science-driven care with individualized attention, we help patients heal faster, build resilience, and achieve sustainable improvements in recovery, wellness, and long-term quality of life.',
  },
  vitaminC: {
    title: 'Best Doctors for High Dose Vitamin C for Cancer Treatment in India',
    description: 'Discover pioneering high-dose Vitamin C cancer treatments at Art of Healing Cancer in India. Our specialists are at the forefront of innovative care. Schedule a consultation with our top high-dose Vitamin C experts.',
  },
}
