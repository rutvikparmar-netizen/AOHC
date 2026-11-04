import type { ArticlePageContent, ArticleSection } from '@/types'

/**
 * फेफड़ों के कैंसर — THE LUNG-CANCER LOCATION PAGES (FIVE HINDI, ONE ENGLISH)
 * ----------------------------------------------------------------------------
 * Migrated from, and kept at:
 *   /फेफड़ों-के-कैंसर-के-लिए-अभ-6/   (Neemrana, Alwar, Rajasthan)
 *   /आयुर्वेदिक-जादू-उजागर-सा-2/     (Harrai, Chhindwara, Madhya Pradesh)
 *   /आयुर्वेदिक-फेफड़ों-के-कै-57/    (Vidya Nagar, Bhilwara, Rajasthan)
 *   /आयुर्वेदिक-उपचार-से-फेफड-6/     (Mandawa, Jhunjhunu, Rajasthan)
 *   /नवीनीकृत-जीवन-शक्ति-आयुर/       (Charkhi Dadri, Bhiwani, Haryana)
 *   /empower-your-journey-lung-cancer-ayurvedic-healing-r-k-colony-bhilwara-rajasthan-india/
 *                                     (the same template, published in English)
 *
 * ⚠️  ONE TEMPLATE, SIX PAGES. All are location landing pages from the
 * same WordPress template. Their English body is identical word for word;
 * only the title, description and seven section headings (three of them
 * with a paragraph) differ. So the English is written once here and each
 * page supplies its own parts. Those were copied out of the live HTML by
 * script (`hindi-parts.js`, then `lung-parts2.js`), not retyped.
 *
 * ⚠️  ONE UNFILLED PLACEHOLDER WAS REPAIRED. On Vidya Nagar the team
 * paragraph opens "*वेबसाइट नाम* पर डॉक्टरों की हमारी टीम…" — the literal
 * "*website name*" was never replaced. It now reads "आर्ट ऑफ हीलिंग कैंसर
 * में", the clinic's name as the other pages write it. The heading above
 * it was published wrapped in stray quotes with a trailing "|"; those are
 * removed. A Hindi speaker should confirm both.
 *
 * ⚠️  THE PAGES ARE MOSTLY ENGLISH UNDER HINDI HEADINGS. `lang: 'hi'` is
 * set for the page, and every English block carries `lang: 'en'` so a
 * screen reader switches voice correctly. Headings that are English in
 * the source carry `titleLang: 'en'`.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE HINDI IS MACHINE-TRANSLATED AND SOME OF IT SAYS THE WRONG THING.
 * A Hindi speaker has to review both pages before they are promoted:
 *
 *   • Neemrana: "…अभूतपूर्व स्वचालित प्रक्रिया कल से शुरू होगी!" — "a
 *     groundbreaking automated procedure will start from tomorrow!" — over
 *     the robotic-surgery section. It is a false claim of a launch date.
 *   • Harrai: the title calls Ayurveda "जादू" (magic) and the meta
 *     description "जादू-टोना" (witchcraft / black magic). On a cancer
 *     treatment page that is the opposite of the message intended.
 *   • Both: "हर्रई"/"नीमराना" etc. are place names the clinic is not in;
 *     these are SEO pages for towns, which Google treats as doorway pages.
 *
 * Reproduced exactly as published, because rewriting Hindi clinical copy
 * is not a developer's call — but the "tomorrow" heading should not stay.
 *
 * ⚠️  CHANGES FROM THE SOURCE, ALL DELIBERATE:
 *   • THE FIVE DOCTOR PROFILES ARE NOT REPRODUCED (Dr. Mandeep Singh
 *     Malhotra, Dr. Archit Pandit, Dr. Siddharth Sahai, Dr. Ritesh Sharma,
 *     Dr. Mohit Saxena). AOHC's standing instruction is that doctor details
 *     come only from the Our Doctors roster; the page links there instead.
 *   • THE "Surgery" COST BLOCK IS DROPPED. On the live page it is a
 *     copy-paste of the "Diagnostic Costs" block (imaging and biopsy
 *     prices under a "Surgery" heading) — no surgery cost is given.
 *   • "Embracing Natural Therapies" IS DROPPED for the same reason: its
 *     text is the metabolic-therapy paragraph again, word for word.
 *   • The two embedded enquiry forms and the images are not carried over;
 *     the page ends at the site-wide contact section.
 *   • The two publications become the reference list, with their links.
 *   • "VIDEO ASSISTED THORACISCOPIC" is corrected to "Thoracoscopic" and
 *     "Gliobalstoma" to "Glioblastoma" — spelling only.
 */

type HindiParts = {
  /** 'hi' unless given. Bhilwara is the same template published in English. */
  lang?: 'hi' | 'en'
  title: string
  description: string
  intro: { title: string; body: string | null }
  approach: { title: string; body: string | null }
  team: { title: string; body: string | null }
  daycare: string
  robotic: string
  overview: string
  integrative: string
}

const EN = 'en'

function hindiSection(title: string, body: string | null): ArticleSection {
  return { title, ...(body ? { body: [body] } : {}) }
}

function build(p: HindiParts): ArticlePageContent {
  return {
    lang: p.lang ?? 'hi',
    hero: { title: p.title, body: [p.description] },
    sections: [
      hindiSection(p.intro.title, p.intro.body),
      hindiSection(p.approach.title, p.approach.body),
      {
        title: 'Why Choose Art of Healing Cancer',
        titleLang: EN,
        lang: EN,
        items: [
          'Pioneering Integrative Cancer Center: Blending traditional and modern treatments, we offer a holistic approach to cancer care.',
          'Personalized Chemotherapy through Chemosensitivity: Through chemosensitivity planning, we customize chemotherapy to each patient’s unique needs.',
          'Advanced Robotic Surgery: Precision and improved outcomes are hallmarks of our state-of-the-art robotic surgery techniques.',
          'Cutting-Edge Targeted Therapy using Transcriptomic Data: Utilizing genomic and transcriptomic data analysis, we provide the most advanced targeted therapy options.',
          'Innovative Natural Treatment Mapping to Genes: As the only institution in India combining genomic and transcriptomic data with natural and herbal treatments, we offer comprehensive care.',
          'Advanced Immunotherapy Options through Drug Sensitivity: We offer the most advanced immunotherapy treatments, including tailored vaccines and sensitivity testing to immunotherapy drugs.',
          'Metabolic Therapy: One of the only centres trained on exploiting tumor Metabolism.',
        ],
      },
      hindiSection(p.team.title, p.team.body),
      {
        title: p.daycare,
        lang: EN,
        body: [
          'The AOHC Chemotherapy Daycare is unique for integrating a Hyperbaric Oxygen Chamber with chemotherapy, enhancing patient recovery. It also offers additional treatments like IV Vitamin C, promoting a holistic approach to cancer care.',
        ],
      },
      {
        title: 'Personalized Chemotherapy through Chemosensitivity / Tumour Viability',
        titleLang: EN,
        lang: EN,
        level: 3,
        items: [
          'Culturing Cancer Cells: Isolate and grow cancer stem cells in a lab to replicate the tumor environment.',
          'Drug Exposure: Introduce chemotherapeutic drugs to the cultured cells to test their effectiveness.',
          'Inhibition Assessment: Measure the drugs’ ability to inhibit cancer cell growth or induce cell death, guiding treatment choices. The results provide valuable insights into which chemotherapeutic agents are likely to be most effective in treating the specific cancer type, potentially guiding personalized treatment plans for patients.',
        ],
      },
      {
        title: 'HBOT',
        titleLang: EN,
        lang: EN,
        level: 3,
        items: [
          'HBOT mitigates tumor hypoxia, reducing cancer progression and resistance by enhancing tissue oxygenation.',
          'Increased plasma oxygen through HBOT reaches areas typically inaccessible to red blood cells, diminishing cancer cell advantages.',
          'HBOT, when paired with chemotherapy, boosts treatment efficacy by elevating ROS levels, especially effective if chemotherapy follows HBOT.',
        ],
      },
      {
        title: 'IV Vitamin C',
        titleLang: EN,
        lang: EN,
        level: 3,
        items: [
          'Our organization administers high-dose IV Vitamin C at our chemo daycare facility, significantly enhancing serum vitamin C levels to target cancer cells effectively.',
          'By incorporating IV Vitamin C, we potentiate chemotherapy’s effectiveness, leveraging its ability to increase the cytotoxic impact on tumor cells while aiming to reduce treatment side effects.',
          'This integrated approach, supported by extensive research, underscores our commitment to providing advanced, comprehensive cancer care at our daycare facility.',
        ],
      },
      {
        title: 'Cost of Lung Cancer Treatment',
        titleLang: EN,
        lang: EN,
        body: [
          'The financial implications of lung cancer treatment in India encompass a variety of expenses, from diagnostic procedures to advanced therapies.',
        ],
      },
      {
        title: 'Diagnostic Costs',
        titleLang: EN,
        lang: EN,
        level: 3,
        items: [
          'Imaging: CT, MRI, and PET scans cost between INR 2,500 to INR 20,000, varying by type and detail required.',
          'Biopsies: Procedures like bronchoscopy or needle biopsy range from INR 15,000 to INR 50,000, based on complexity.',
        ],
      },
      {
        title: 'Chemotherapy',
        titleLang: EN,
        lang: EN,
        level: 3,
        items: [
          'Each chemotherapy cycle may cost between INR 20,000 to INR 2,00,000. The total expense is contingent on the number and types of drugs administered and the overall treatment duration.',
        ],
      },
      {
        title: 'Radiation Therapy',
        titleLang: EN,
        lang: EN,
        level: 3,
        items: [
          'Standard radiation therapy ranges from INR 1,00,000 to INR 2,50,000.',
          'Advanced techniques like IMRT or SBRT could exceed INR 3,00,000.',
        ],
      },
      {
        title: 'Targeted Therapies and Immunotherapy',
        titleLang: EN,
        lang: EN,
        level: 3,
        items: [
          'These more sophisticated treatments can cost from INR 1,00,000 to over INR 2,00,000 per dose, with prolonged treatment potentially spanning several months.',
        ],
        outro: [
          'The overall cost is influenced by the lung cancer’s stage, the individual’s treatment plan, and the application of personalized treatment approaches.',
        ],
      },
      {
        title: p.robotic,
        lang: EN,
        body: [
          'Conventional Surgery for lung cancer through open techniques involve large thoracotomy incisions i.e. muscles, ribs and facial tissue is retracted or cut to enter the thoracic cavity and remove the suspicious or affected tissue which may be whole or part of lung, bronchus, and lymph nodes.',
          'Minimally Invasive approach involves using Thoracoscope for visualising the thoracic cavity and special instruments to through which surgical procedure is done',
        ],
      },
      {
        title: 'Video Assisted Thoracoscopic Surgery (VATS) in Lung Cancer',
        titleLang: EN,
        lang: EN,
        level: 3,
        body: [
          'Video-Assisted Thoracoscopic Surgery (VATS) represents a significant advancement in treating lung cancer, offering a less invasive alternative to traditional open surgery. Through small incisions, surgeons utilize a thoracoscope (a small camera) and specialized instruments to perform the procedure, providing real-time video guidance.',
          'Now the present age of Thoracic surgery has evolved into Robot assisted minimally invasive surgery.',
          'Robotic surgery in lung cancer treatment utilizes advanced robotic systems, such as the da Vinci Surgical System, to perform highly precise and minimally invasive procedures. The surgeon controls robotic arms equipped with surgical instruments, while a 3D high-definition vision system ensures superior visualization.',
        ],
      },
      {
        title: 'Advantages of Robotic Surgery',
        titleLang: EN,
        lang: EN,
        level: 3,
        items: [
          'Enhanced Precision: Robotic systems provide surgeons with unparalleled control and precision, reducing the risk of damage to surrounding tissues.',
          'Greater Dexterity: Robotic arms can rotate and bend beyond the capabilities of the human hand, allowing for more complex maneuvers.',
          'Improved Visualization: The 3D HD vision system offers a magnified, high-resolution image of the surgical site.',
          'Less Invasive: Like VATS, robotic surgery involves small incisions, leading to less pain and faster recovery.',
        ],
      },
      {
        title: 'Procedure and Recovery',
        titleLang: EN,
        lang: EN,
        level: 3,
        items: [
          'Technologically Advanced Approach: The surgeon operates from a console, directing the robotic arms to perform the surgery through tiny incisions.',
          'Recovery Benefits: Patients typically benefit from reduced pain, lower risk of infection, and quicker return to normal activities.',
          'Postoperative Care: Involves monitoring for complications, managing pain, and regular follow-ups to assess lung function and overall well-being.',
        ],
        outro: [
          'Robotic surgery is an option for patients with operable lung cancer, particularly those in the early stages. The decision involves evaluating the tumor’s characteristics, patient’s health status, and potential benefits over traditional methods.',
        ],
      },
      {
        title: p.overview,
        lang: EN,
        body: [
          'Lung cancer stands as one of the most challenging health crises, marked by the uncontrolled growth of abnormal cells in the lungs. These cells form tumors, impairing lung function, affecting breathing, and potentially spreading to other body parts. Recognized globally for its prevalence and fatality, lung cancer is at the forefront of medical research, with significant strides being made in diagnosis and treatment.',
        ],
      },
      {
        title: 'Types of Lung Cancer',
        titleLang: EN,
        lang: EN,
        level: 3,
        body: [
          'Non-Small Cell Lung Cancer (NSCLC): Dominating lung cancer cases with about 85% incidence, NSCLC is known for its relatively slower progression. It encompasses:',
        ],
        items: [
          'Adenocarcinoma: Common in nonsmokers, typically developing in the lung’s outer regions, and more prevalent in women.',
          'Squamous Cell Carcinoma: Often tied to smoking, originates in the inner lung lining and usually found near a bronchus.',
          'Large Cell Carcinoma: Rarer and fast-growing, posing significant treatment challenges.',
        ],
        outro: [
          'Small Cell Lung Cancer (SCLC): Representing 10%-15% of cases, SCLC is linked primarily to smoking. Known for its aggressive nature, it frequently metastasizes rapidly, often before diagnosis.',
          'Other Types: This category includes carcinoid tumors, salivary gland carcinomas, and more, each with unique characteristics and treatment approaches.',
        ],
      },
      {
        title: 'Causes and Risk Factors',
        titleLang: EN,
        lang: EN,
        body: ['Lung cancer’s etiology is multifaceted:'],
        items: [
          'Smoking: The leading cause, involving both active and passive exposure to tobacco smoke.',
          'Air Pollution: Long-term exposure to air pollutants, particularly fine particulate matter, has been correlated with increased lung cancer risk.',
          'Genetics: Genetic predispositions and mutations play a role in susceptibility.',
          'History of Lung Disease: A personal or family history of lung cancer suggests a combination of genetic and environmental risk factors.',
        ],
      },
      {
        title: 'Symptoms',
        titleLang: EN,
        lang: EN,
        body: [
          'In its early stages, lung cancer might not present any symptoms. However, as it advances, symptoms such as a persistent cough, changes in breathing, chest pain, weight loss, hoarseness, recurring infections, blood in sputum, and fatigue can manifest, signaling the need for medical evaluation.',
        ],
      },
      {
        title: 'Diagnostic Approaches',
        titleLang: EN,
        lang: EN,
        items: [
          'Imaging Tests: CT and PET scans are crucial in locating tumors and assessing their spread.',
          'Tissue Biopsy: Various techniques, including bronchoscopy and needle biopsy, offer definitive diagnoses.',
          'Sputum Cytology: This non-invasive test analyzes mucus for cancer cells.',
          'Molecular Testing: Essential for identifying genetic mutations and guiding targeted therapy.',
          'Mediastinoscopy: A surgical approach to check lymph nodes for cancer spread.',
        ],
      },
      {
        title: 'Staging of Lung Cancer',
        titleLang: EN,
        lang: EN,
        body: ['Lung cancer staging is pivotal in determining the appropriate treatment strategy'],
        items: [
          'Stage 0: Early stage with abnormal cells in the bronchial mucosa.',
          'Stage I: Localized growth, divided into subcategories based on tumor size.',
          'Stage II: Larger tumors or those with regional spread.',
          'Stage III: Advanced stage with significant local and regional spread.',
          'Stage IV: Metastatic disease, where cancer has spread to distant organs.',
          'Recurrent Lung Cancer: Cancer that returns post-treatment, varying in local or distant recurrence.',
        ],
      },
      {
        title: 'Treatment Modalities',
        titleLang: EN,
        lang: EN,
        items: [
          'Surgery: Essential for early-stage lung cancer, involving various techniques like lobectomy, segmentectomy, pneumonectomy, and minimally invasive methods.',
          'Chemotherapy: A mainstay treatment using cytotoxic drugs, often combined with other therapies.',
          'Targeted Therapy: Focuses on specific genetic mutations in cancer cells.',
          'Immunotherapy: Leverages the immune system to fight cancer.',
          'Radiation Therapy: Uses high-energy beams to target cancer cells.',
          'Precision Oncology: Personalizes treatment based on genomic and chemosensitivity testing.',
        ],
      },
      {
        title: p.integrative,
        lang: EN,
        items: [
          'IV Vitamin C Therapy: Administering high-dose Vitamin C intravenously, this therapy is explored for its potential to produce hydrogen peroxide, which may target cancer cells, enhance life quality, and mitigate side effects of traditional treatments.',
          'Hydrogen Inhalation Therapy: An innovative therapy where patients inhale molecular hydrogen gas, leveraging its antioxidant properties to potentially reduce oxidative stress in cancer cells. Its efficacy and safety in humans are subjects of ongoing research.',
          'Hyperbaric Oxygen Therapy (HBOT): Involves breathing pure oxygen in a pressurized environment, believed to enhance tissue oxygenation and aid healing. Used cautiously in cancer care to potentially improve chemotherapy and radiation effectiveness and manage side effects.',
          'Mistletoe Therapy: Utilizes extracts from the European mistletoe plant, injected to possibly stimulate the immune system and exert cytotoxic effects on cancer cells. While popular in Europe for quality of life improvement, its scientific validation remains mixed.',
          'Ayurvedic Medicine: An ancient Indian practice focusing on body system balance through diet, herbal treatment, and yogic breathing. Aimed at detoxification, boosting defense mechanisms, and overall well-being, it complements conventional treatments despite limited clinical trial evidence.',
          'Advances in Targeted Therapy: Targeted therapies, like tyrosine kinase inhibitors, have revolutionized the treatment landscape for lung cancer. These therapies specifically target molecular changes seen in cancer cells. For example, drugs like gefitinib, erlotinib, and afatinib have been successful against specific types of NSCLC.',
          'Immunotherapy Breakthroughs: Immunotherapy has emerged as a game-changer, especially for advanced lung cancer. It includes checkpoint inhibitors, monoclonal antibodies, and adoptive cell therapies. Drugs like nivolumab and pembrolizumab have shown remarkable results in treating NSCLC by reactivating the immune system’s ability to recognize and destroy cancer cells.',
          'Radiation Therapy — Evolving Techniques: Radiation therapy has evolved significantly, with techniques like 3D-CRT, IMRT, SRS, and SBRT offering more precision and minimizing damage to healthy tissues. Advances like IGRT and ART allow for real-time adjustments, enhancing treatment accuracy and outcomes.',
          'Precision Oncology — A Personalized Approach: Precision oncology represents a paradigm shift in cancer treatment, with Next-Generation Sequencing (NGS) enabling a comprehensive genomic analysis. This approach allows for the development of personalized treatment plans, targeting specific genetic mutations and alterations in cancer cells.',
          'Chemosensitivity Testing: Chemosensitivity testing evaluates how cancer cells respond to different chemotherapy drugs, reducing the trial-and-error approach in selecting effective treatments. This predictive analysis can significantly enhance treatment efficacy.',
          'Exploring Metabolic Therapy: Metabolic therapy targets the unique metabolic requirements of cancer cells, disrupting their growth and survival pathways. Dietary interventions play a role in this approach, complementing conventional treatments.',
          'Integrating Mind-Body Therapies: Stress reduction and emotional well-being are critical components of lung cancer care. Practices like meditation, yoga, and tai chi offer significant benefits in stress management and physical recovery.',
        ],
      },
    ],
    references: [
      {
        text: 'Case report on Reversal of Field Cancerization using Nutraceuticals mapped to the aberrant pathways deciphered via NGS analysis of the neoplastic oral mucosa. European Society of Medicine, Medical Research Archives.',
        href: 'https://esmed.org/MRA/mra/article/view/4553',
      },
      {
        text: 'Impact of Slow-Infusion (Metronomic) 2-Deoxy-D-Glucose in Treatment of Refractory Patient of Glioblastoma Multiforme. International Journal of Complementary and Internal Medicine.',
        href: 'https://ijcimjournal.com/index.php/1/article/view/47',
      },
    ],
  }
}

const lungParts: HindiParts = {
  title: "फेफड़ों के कैंसर के लिए अभिनव आयुर्वेदिक इलाज | नीमराना, अलवर, राजस्थान, भारत",
  description: "नीमराना, अलवर, राजस्थान में प्राचीन आयुर्वेदिक उपचारों के साथ फेफड़ों के कैंसर से निपटने के लिए एक उन्नत दृष्टिकोण की खोज करें। पारंपरिक प्रथाओं में निहित विशेष रूप से क्यूरेटेड उपचारों के माध्यम से उपचार की दिशा में एक समग्र यात्रा शुरू करें। प्रकृति के उपहार की परिवर्तनकारी शक्ति का अनुभव करें और इस चुनौतीपूर्ण बीमारी से उबरने की नई संभावनाओं को अनलॉक करें।",
  intro: { title: "आर्ट ऑफ हीलिंग कैंसर में फेफड़ों के कैंसर के लिए सटीक ऑन्कोलॉजी और आयुर्वेदिक उपचार के उत्तम संयोजन का अनावरण", body: "आर्ट ऑफ हीलिंग कैंसर में एक परिवर्तनकारी यात्रा पर निकलें, जहां सटीक ऑन्कोलॉजी फेफड़ों के कैंसर से निपटने में आयुर्वेदिक उपचार के प्राचीन ज्ञान से मिलती है। उपचार के लिए प्राकृतिक दृष्टिकोण को अपनाते हुए, हमारे समग्र तरीके अद्वितीय परिणामों के लिए सदियों पुराने उपचारों के साथ अत्याधुनिक तकनीक का मिश्रण करते हैं। अपनी विशिष्ट आवश्यकताओं के अनुरूप वैयक्तिकृत उपचारों में गोता लगाएँ और आधुनिक चिकित्सा के साथ सहक्रियात्मक रूप से काम करने वाले प्रकृति के उपचारों की शक्ति का अनुभव करें। आइए हम आपको कायाकल्प और लचीलेपन की दिशा में मार्गदर्शन करें क्योंकि हम आर्ट ऑफ हीलिंग कैंसर में फेफड़ों के कैंसर के खिलाफ आपकी लड़ाई में उन्नत ऑन्कोलॉजिकल उपचारों के साथ-साथ आयुर्वेद की गहन क्षमता का उपयोग करते हैं; हम पर भरोसा करें कि हम आपको कम यात्रा वाले लेकिन गहन रूप से प्रभावी पुनर्प्राप्ति मार्ग पर ले जाएंगे।" },
  approach: { title: "अलौकिक अमृत की खोज करें: फेफड़ों के कैंसर के इलाज के लिए आयुर्वेदिक कीमिया", body: "फेफड़ों के कैंसर से निपटने के लिए हमारे अभूतपूर्व आयुर्वेदिक दृष्टिकोण के साथ समग्र उपचार की दिशा में एक परिवर्तनकारी यात्रा शुरू करें। आयुर्वेद के प्राचीन रहस्यों की खोज करें जो प्रकृति के उपचारों को उजागर करते हैं, इस दुर्जेय दुश्मन के खिलाफ आपकी लड़ाई में आशा और जीवन शक्ति प्रदान करते हैं। हमारे साक्ष्य-आधारित उपचारों के साथ कैंसर देखभाल में एक नए प्रतिमान का अनुभव करें।" },
  team: { title: "कैंसर देखभाल प्रदाताओं की विशिष्ट टीम अभूतपूर्व उपचारों की पेशकश करती है", body: "हमारी टीम की असाधारण देखभाल का अनुभव करें जो न केवल फेफड़ों के कैंसर के लिए पारंपरिक उपचारों में कुशल हैं, बल्कि सटीक ऑन्कोलॉजी और एकीकृत उपचारों में भी पारंगत हैं। हमारे डॉक्टर पारंपरिक तरीकों से परे समग्र और व्यक्तिगत देखभाल प्रदान करने के लिए आयुर्वेदिक उपचार के उन्नत ज्ञान के साथ अपनी विशेषज्ञता को जोड़ते हैं।" },
  daycare: "ऑर्गेनिक ऑन्कोलॉजी ओएसिस: फेफड़े का कल्याण अभयारण्य- डेकेयर सुविधा",
  robotic: "कैंसर ठीक करने की कला: फेफड़ों के कैंसर के इलाज के लिए अभूतपूर्व स्वचालित प्रक्रिया कल से शुरू होगी!",
  overview: "सतत पुनर्प्राप्ति समाधान के लिए फेफड़े के घाव दृष्टिकोण का अनावरण",
  integrative: "पारिस्थितिक उपायों का उपयोग करके फुफ्फुसीय घातकता के लिए समग्र उपचार- इंटीग्रेटिव ऑन्कोलॉजी",
}

const ayurParts: HindiParts = {
  title: "आयुर्वेदिक जादू उजागर: साहस से फेफड़ों के कैंसर का इलाज | हर्रई, छिंदवाड़ा, मध्य प्रदेश, भारत",
  description: "आयुर्वेदिक जादू-टोना उजागर करें: फेफड़ों के कैंसर पर वीरता से विजय प्राप्त करें | हर्रई, छिंदवाड़ा, मध्य प्रदेश, भारत। स्वास्थ्य और कल्याण की दिशा में अपनी यात्रा को सशक्त बनाने के लिए शक्तिशाली आयुर्वेदिक उपचारों और पारंपरिक ज्ञान के माध्यम से फेफड़ों के कैंसर के लिए समग्र उपचार की प्राचीन कला की खोज करें।",
  intro: { title: "साहस का अनावरण: फेफड़ों के कैंसर के इलाज के लिए अभिनव आयुर्वेदिक समाधान", body: "आर्ट ऑफ हीलिंग कैंसर में उपचार की दिशा में एक साहसी यात्रा शुरू करें, जहां सटीक ऑन्कोलॉजी फेफड़ों के कैंसर से निपटने के लिए आयुर्वेदिक उपचार के समग्र ज्ञान से मिलती है। एक अभयारण्य की खोज करें जहां आपकी बहादुरी को सम्मानित किया जाता है और आपकी व्यक्तिगत आवश्यकताओं के अनुरूप व्यक्तिगत देखभाल के हिस्से के रूप में अपनाया जाता है। हमारा दृष्टिकोण पारंपरिक तरीकों से परे है, इस चुनौतीपूर्ण पथ के हर कदम पर आपको व्यापक समर्थन प्रदान करने के लिए प्राचीन ज्ञान के साथ अत्याधुनिक तकनीक को जोड़ता है। फेफड़ों के कैंसर से जुड़ी जटिलताओं के बीच इष्टतम कल्याण की खोज में विज्ञान और प्रकृति को निर्बाध रूप से विलय करने की हमारी प्रतिबद्धता में निहित परिवर्तनकारी शक्ति को उजागर करें।" },
  approach: { title: "फेफड़ों के कैंसर से लड़ने में आयुर्वेद की उपचार शक्ति का दृढ़ता के साथ उपयोग करें।", body: "ऐसी दुनिया में जहां बहादुरी अनिश्चितता से मिलती है, फेफड़ों के कैंसर के खिलाफ कठिन लड़ाई का सामना करने वालों के लिए आशा हवा में मोमबत्ती की तरह टिमटिमाती है। आयुर्वेदिक उपचार के साथ उपचार का एक वैकल्पिक मार्ग खोजें - प्राचीन ज्ञान और आधुनिक विज्ञान का सामंजस्यपूर्ण मिश्रण जो अशांत समय के बीच सांत्वना प्रदान करता है।" },
  team: { title: "फेफड़े के संरक्षक: मास्टर कैंसर हीलर", body: "सम्मानित डॉक्टरों की हमारी टीम में बहादुरी सिर्फ एक शब्द नहीं बल्कि एक मार्गदर्शक सिद्धांत है। फेफड़ों के कैंसर के लिए पारंपरिक उपचारों में व्यापक अनुभव के साथ, वे सटीक ऑन्कोलॉजी और आयुर्वेदिक उपचार जैसे एकीकृत दृष्टिकोण में भी विशेषज्ञ हैं। यह अनूठा संयोजन व्यापक देखभाल सुनिश्चित करता है जिसमें इस चुनौतीपूर्ण बीमारी से प्रभावी ढंग से लड़ने के लिए परंपरा और नवीनता दोनों शामिल हैं।" },
  daycare: "वैलिएंट थेरेपी रिट्रीट फेफड़ों के कैंसर सहायता को पुनर्परिभाषित कर रहा है- डेकेयर सुविधा",
  robotic: "कैंसर ठीक करने की कला: फेफड़ों के कैंसर के लिए अग्रणी रोबोटिक प्रक्रिया।",
  overview: "अग्रणी दृष्टिकोण: फेफड़ों के कैंसर प्रबंधन",
  integrative: "फेफड़ों की घातकता के लिए साहसपूर्वक सम्मिश्रण उपचार- इंटीग्रेटिव ऑन्कोलॉजी",
}

/** /आयुर्वेदिक-फेफड़ों-के-कै-57/ — Vidya Nagar, Bhilwara, Rajasthan */
const vidyaNagarParts: HindiParts = {
  title: "आयुर्वेदिक फेफड़ों के कैंसर के उपचार से पुनर्जीवित करें | विद्या नगर, भीलवाड़ा, राजस्थान, भारत",
  description: "आयुर्वेदिक फेफड़ों के कैंसर उपचार के साथ ऐसे परिवर्तन का अनुभव करें जो पहले कभी नहीं हुआ। प्राचीन आयुर्वेदिक पद्धतियों के माध्यम से फेफड़ों के कैंसर के समग्र उपचार की दिशा में अपनी यात्रा शुरू करते समय विद्या नगर, भीलवाड़ा, राजस्थान, भारत में जीवन शक्ति और जोश को अपनाएं। सर्वोत्तम स्वास्थ्य और कल्याण के लिए प्रकृति के उपचारों की शक्ति को अनलॉक करें।",
  intro: { title: "फेफड़ों के कैंसर के लिए सटीक आयुर्वेद की जटिलताओं की खोज करें।", body: "आर्ट ऑफ हीलिंग कैंसर में जीवंत स्वास्थ्य की दिशा में एक परिवर्तनकारी यात्रा शुरू करें, जहां जीवंतता का सार फेफड़ों के कैंसर से निपटने के लिए अत्याधुनिक प्रिसिजन ऑन्कोलॉजी और समग्र आयुर्वेदिक उपचारों के साथ जुड़ा हुआ है। हमारा दृष्टिकोण आधुनिक चिकित्सा प्रगति के साथ प्राचीन ज्ञान का सामंजस्य स्थापित करता है, व्यक्तिगत देखभाल प्रदान करता है जो आशा को प्रज्वलित करता है और आत्मा को फिर से जीवंत करता है। आपके शरीर, मन और आत्मा का समग्र रूप से पोषण करते हुए आपकी विशिष्ट आवश्यकताओं को पूरा करने के लिए तैयार किए गए विशेष उपचारों की खोज करें। आइए हम आपको एक प्रतिमान-परिवर्तनकारी अनुभव के माध्यम से मार्गदर्शन करें जो भीतर से उपचार की क्षमता को अनलॉक करते हुए व्यक्तित्व को गले लगाता है। एक ऐसे अभयारण्य का अनुभव करें जहां विपरीत परिस्थितियों के बीच भी जीवन शक्ति पनपती है; जहां हर सांस अनिश्चितता की स्थिति में लचीलेपन का प्रतीक है - आर्ट ऑफ हीलिंग कैंसर के विज्ञान और प्रकृति के अभिनव संलयन में आपका स्वागत है कि कैसे खुद पर महारत हासिल की जाती है।" },
  approach: { title: "आयुर्वेदिक फेफड़ों के कैंसर देखभाल के साथ जीवन शक्ति की ओर यात्रा शुरू करें।", body: "फेफड़ों के कैंसर के इलाज के लिए हमारे नवोन्मेषी दृष्टिकोण के साथ नई जीवंतता और आशा का अनुभव करें। आधुनिक उपचार के लिए तैयार किए गए प्राचीन आयुर्वेदिक उपचारों की शक्ति का अन्वेषण करें। हमारे समग्र उपचारों का लक्ष्य प्राकृतिक, टिकाऊ तरीकों के माध्यम से फेफड़ों के कैंसर पर काबू पाने की दिशा में आपकी यात्रा में संतुलन, जीवन शक्ति और भलाई को बहाल करना है जो आपके स्वास्थ्य और कल्याण को बाकी सभी चीजों से ऊपर प्राथमिकता देते हैं।" },
  team: { title: "पल्मोनरी मैलिग्नेंसी के लिए गतिशील ऑन्कोलॉजी उत्साही", body: "आर्ट ऑफ हीलिंग कैंसर में डॉक्टरों की हमारी टीम सटीक ऑन्कोलॉजी और एकीकृत उपचार में विशेषज्ञता का एक अनूठा मिश्रण लाती है, जो फेफड़ों के कैंसर के रोगियों के लिए व्यापक देखभाल सुनिश्चित करती है। आयुर्वेदिक उपचार के लाभों के साथ-साथ पारंपरिक उपचारों की गहरी समझ के साथ, हम समग्र दृष्टिकोण प्रदान करते हैं जो आपकी उपचार यात्रा के दौरान कल्याण और जीवंतता को प्राथमिकता देते हैं।" },
  daycare: "फेफड़े के कैंसर का पुनर्जीवन: एक गतिशील देखभाल केंद्र- डेकेयर सुविधा",
  robotic: "कैंसर ठीक करने की कला: फेफड़ों के ट्यूमर के इलाज के लिए नवोन्मेषी साइबरनेटिक प्रक्रिया",
  overview: "पुनर्जीवित करें: नवीन तकनीकों के साथ फेफड़ों के कैंसर का दृष्टिकोण",
  integrative: "पल्मोनरी मैलिग्नेंसी के लिए सिनर्जिस्टिक हीलिंग दृष्टिकोण- इंटीग्रेटिव ऑन्कोलॉजी",
}

/** /आयुर्वेदिक-उपचार-से-फेफड-6/ — Mandawa, Jhunjhunu, Rajasthan */
const mandawaParts: HindiParts = {
  title: "आयुर्वेदिक उपचार से फेफड़ों के कैंसर को पुनर्जीवित करें | मंडावा, झुंझुनूं, राजस्थान, भारत",
  description: "भारत के राजस्थान में हमारी मंडावा, झुंझुनूं सुविधा में फेफड़ों के कैंसर के लिए आयुर्वेदिक उपचार की पुनर्जीवन शक्ति की खोज करें। स्वाभाविक रूप से संतुलन और कल्याण को बहाल करने के लिए तैयार किए गए समग्र दृष्टिकोण के साथ अपनी उपचार यात्रा में जीवंतता और जीवन शक्ति को अपनाएं। आज आप नए सिरे से स्वास्थ्य और कल्याण की राह पर आगे बढ़ते हुए निराशा को अलविदा कहें!",
  intro: { title: "उपचार की दिशा में एक यात्रा शुरू करना: जीवंतता का उपयोग करके सटीक ऑन्कोलॉजी और समग्र दृष्टिकोण के साथ कैंसर को ठीक करने की कला में आयुर्वेदिक फेफड़ों के कैंसर उपचार का अनावरण।", body: "आशा और उपचार की जीवंतता को प्रकट करते हुए, आर्ट ऑफ हीलिंग कैंसर आयुर्वेदिक सिद्धांतों के प्राचीन ज्ञान के माध्यम से फेफड़ों के कैंसर के उपचार के लिए एक समग्र दृष्टिकोण प्रदान करता है। हमारी सटीक ऑन्कोलॉजी सेवाएँ प्रत्येक व्यक्ति के अनुरूप हैं, जो न केवल शारीरिक लक्षणों को संबोधित करती हैं बल्कि भावनात्मक कल्याण का भी पोषण करती हैं। आर्ट ऑफ हीलिंग कैंसर में, हम समझते हैं कि फेफड़ों के कैंसर से लड़ने के लिए पारंपरिक चिकित्सा से कहीं अधिक की आवश्यकता होती है; यह समय-सम्मानित प्रथाओं के साथ आधुनिक विज्ञान के मिश्रण के लिए एक व्यक्तिगत स्पर्श की मांग करता है। फेफड़ों के कैंसर के खिलाफ आपके शरीर की जन्मजात उपचार शक्तियों को प्रज्वलित करने के लिए डिज़ाइन किए गए हमारे एकीकृत आयुर्वेदिक उपचारों के साथ कल्याण और जीवन शक्ति की दिशा में एक परिवर्तनकारी यात्रा की खोज करें - Artofhealingcancer.Com पर पारंपरिक तरीकों से परे व्यापक देखभाल चाहने वालों के लिए स्वास्थ्य देखभाल वितरण में एक अभिनव प्रतिमान।" },
  approach: { title: "अपनी जीवन शक्ति बढ़ाएं: फेफड़ों के कैंसर से बचाव के लिए आयुर्वेद को अपनाएं", body: "आयुर्वेदिक तरीकों के माध्यम से फेफड़ों के कैंसर के इलाज के लिए हमारे अभिनव दृष्टिकोण के साथ जीवंतता के नवीनीकरण का अनुभव करें। समग्र उपचार और समग्र कल्याण पर ध्यान केंद्रित करते हुए, इस बीमारी से लड़ने में आधुनिक विज्ञान के साथ मिलकर प्राचीन उपचारों की शक्ति की खोज करें। फेफड़ों के कैंसर के लिए आज ही हमारे वैयक्तिकृत आयुर्वेदिक उपचारों से आशा और उपचार को अपनाएँ!" },
  team: { title: "फेफड़ों के कैंसर के लिए असाधारण कुशल कैंसर देखभाल करने वाले स्क्वाड्रन का अनुभव करें।", body: "डॉक्टरों की हमारी समर्पित टीम फेफड़ों के कैंसर के रोगियों को व्यक्तिगत देखभाल प्रदान करने के लिए पारंपरिक उपचारों में दशकों के अनुभव को सटीक ऑन्कोलॉजी और एकीकृत उपचारों में विशेषज्ञता के साथ जोड़ती है। प्राचीन आयुर्वेदिक पद्धतियों के साथ-साथ अत्याधुनिक तकनीकों को शामिल करके, हम एक समग्र दृष्टिकोण प्रदान करते हैं जो जीवन शक्ति को बढ़ाने और उपचार को बढ़ावा देने के लिए मन, शरीर और आत्मा को संबोधित करता है।" },
  daycare: "पल्मोनरी वेलनेस के लिए डायनेमिक हीलिंग सैंक्चुअरी- डेकेयर सुविधा",
  robotic: "कैंसर ठीक करने की कला: फेफड़ों के कैंसर के लिए स्वचालित सर्जरी में साहसिक प्रगति।",
  overview: "फुफ्फुसीय घातकता के लिए अग्रणी दृष्टिकोण",
  integrative: "फेफड़ों की घातकता के लिए सिनर्जिस्टिक थेरेपी- इंटीग्रेटिव ऑन्कोलॉजी",
}

/** /नवीनीकृत-जीवन-शक्ति-आयुर/ — Charkhi Dadri, Bhiwani, Haryana */
const charkhiDadriParts: HindiParts = {
  title: "नवीनीकृत जीवन शक्ति: आयुर्वेदिक फेफड़ों के कैंसर का इलाज | चरखी दादरी, भिवानी, हरियाणा, भारत",
  description: "चरखी दादरी, भिवानी, हरियाणा में हमारे अभयारण्य में फेफड़ों के कैंसर के लिए आयुर्वेदिक उपचार की कायाकल्प शक्ति का अनुभव करें। आधुनिक विशेषज्ञता के साथ प्राचीन आयुर्वेदिक सिद्धांतों का उपयोग करके इस भयानक बीमारी से निपटने के लिए तेज, नवीनीकृत जीवन शक्ति और समग्र उपचार प्रदान करने वाले एक शांत नखलिस्तान की खोज करें। फेफड़ों के कैंसर के लिए प्राकृतिक उपचार आज ही अनलॉक करें!",
  intro: { title: "कैंसर को ठीक करने की कला: शीघ्रता के साथ सटीक चिकित्सा और आयुर्वेदिक फेफड़ों के कैंसर की देखभाल का अनावरण।", body: "तेजी और सटीकता के साथ, आर्ट ऑफ हीलिंग कैंसर आयुर्वेद के प्राचीन ज्ञान के माध्यम से फेफड़ों के कैंसर के इलाज के लिए एक समग्र दृष्टिकोण अपनाता है। हमारे नवोन्मेषी तरीके आधुनिक तकनीक को समय-सम्मानित आयुर्वेदिक सिद्धांतों के साथ जोड़कर वैयक्तिकृत उपचार बनाते हैं जो न केवल शारीरिक लक्षणों को बल्कि हमारे रोगियों के भावनात्मक और आध्यात्मिक कल्याण को भी संबोधित करते हैं। प्राकृतिक उपचारों के साथ अत्याधुनिक चिकित्सा प्रगति को एकीकृत करके, हम अद्वितीय देखभाल प्रदान करते हैं जो केवल बीमारी ही नहीं, बल्कि पूरे व्यक्ति को ठीक करने पर केंद्रित है। आयुर्वेदिक ऑन्कोलॉजी थेरेपी में उत्कृष्टता के लिए आर्ट ऑफ हीलिंग कैंसर के केंद्र में स्वास्थ्य देखभाल में एक नए प्रतिमान का अनुभव करें जहां विज्ञान फेफड़ों के कैंसर के उपचार में इष्टतम परिणामों के लिए परंपरा को पूरा करता है।" },
  approach: { title: "नवीनीकृत स्वास्थ्य के लिए आयुर्वेदिक फेफड़ों के कैंसर देखभाल की जीवन शक्ति की खोज करें।", body: "फेफड़ों के कैंसर के उपचार के क्षेत्र में प्राचीन आयुर्वेदिक ज्ञान की शक्ति को उजागर करते हुए, हमारा परिवर्तनकारी दृष्टिकोण पारंपरिक तरीकों से आगे निकल जाता है। समग्र उपचार पद्धतियों और प्राकृतिक उपचारों को एकीकृत करके, हम इस निरंतर बीमारी से जूझ रहे लोगों के लिए आशा की किरण प्रदान करने का प्रयास करते हैं। आयुर्वेद के साथ फेफड़ों के कैंसर की देखभाल में एक नया क्षितिज खोजें।" },
  team: { title: "अग्रणी चिकित्सा दल फेफड़ों की घातकता में उत्कृष्टता प्राप्त करता है।", body: "प्रतिष्ठित डॉक्टरों की हमारी टीम न केवल फेफड़ों के कैंसर के लिए पारंपरिक उपचारों में बल्कि अत्याधुनिक सटीक ऑन्कोलॉजी और आयुर्वेदिक उपचार जैसे एकीकृत दृष्टिकोण में भी विशेषज्ञता रखती है। समग्र देखभाल पर ध्यान देने के साथ, हम व्यापक उपचार और सहायता के लिए प्रत्येक रोगी की विशिष्ट आवश्यकताओं के अनुसार अपनी रणनीतियाँ तैयार करते हैं।" },
  daycare: "ट्विस्ट-डेकेयर सुविधा के साथ पल्मोनरी थेरेपी के लिए विवासिटी हब",
  robotic: "कैंसर ठीक करने की कला: फेफड़े के ट्यूमर के लिए स्वचालित ऑपरेशन में साहसिक सफलता",
  overview: "फुफ्फुसीय घातकता के लिए प्रेरक दृष्टिकोण",
  integrative: "फेफड़ों की घातकता के लिए सिनर्जिस्टिक थेरेपी- इंटीग्रेटिव ऑन्कोलॉजी",
}

/** /empower-your-journey-lung-cancer-ayurvedic-healing-r-k-colony-bhilwara-rajasthan-india/ — the same template in English */
const bhilwaraParts: HindiParts = {
  lang: "en",
  title: "Empower Your Journey: Lung Cancer Ayurvedic Healing | R.K. Colony, Bhilwara, Rajasthan, India",
  description: "Embark on a transformative path towards healing with our avant-garde Lung Cancer Ayurvedic treatment at R.K. Colony, Bhilwara, nestled in the verdant landscape of Rajasthan, India. Discover ancient remedies harmonizing nature's bounties to combat lung cancer as you embrace holistic wellness like never before.",
  intro: { title: "Discover Art of Healing Cancer's Cutting-edge Lung Cancer Ayurvedic Therapy.", body: "Embark on a transformative journey towards healing at Art of Healing Cancer, where precision oncology meets the holistic spunk to combat Lung Cancer with ayurvedic treatment. Dive into a realm where cutting-edge medical innovation intertwines seamlessly with ancient wisdom, offering tailored remedies and compassionate care for those seeking solace in their battle against this relentless ailment. Let our team ignite hope and vitality within you through personalized strategies that honor your individuality while embracing the power of natural therapies rooted in centuries-old traditions. Experience a paradigm shift in healthcare as we redefine conventional approaches to fighting Lung Cancer by harmonizing science and spirituality at its core, paving the way for profound restoration unlike any other institution can offer." },
  approach: { title: "Unleash the vigor of Ayurvedic elixirs for Lung Cancer healing.", body: "Unleash the power of nature's remedies with our groundbreaking ayurvedic treatment for Lung Cancer. Discover a holistic approach that nurtures your body and soul, offering hope and healing where it is needed most. Embrace a path to wellness rooted in ancient wisdom and supported by modern science - because you deserve nothing less." },
  team: { title: "Innovative, pioneering thoracic oncology specialists rise above mediocrity.", body: "Our team of doctors brings a unique blend of expertise to the table, specializing not only in conventional therapies for Lung Cancer but also in precision oncology and integrative approaches like ayurvedic treatments. With years of experience under their belt, they offer comprehensive care that prioritizes personalized treatment plans tailored to each individual." },
  daycare: "Bold Cancer Care Center: a unique approach to healing- Daycare Facility",
  robotic: "Art of Healing Cancer: Innovative Automated Procedure Elevates Lung Cancer Treatment",
  overview: "Unveiling Novel Approach for Lung Carcinoma Care",
  integrative: "Synergistic approach to lung malignancy therapy- Integrative Oncology",
}

export const lungCancerAyurvedaNeemrana = build(lungParts)
export const lungCancerAyurvedaHarrai = build(ayurParts)
export const lungCancerAyurvedaVidyaNagar = build(vidyaNagarParts)
export const lungCancerAyurvedaMandawa = build(mandawaParts)
export const lungCancerAyurvedaCharkhiDadri = build(charkhiDadriParts)
export const lungCancerAyurvedaBhilwara = build(bhilwaraParts)

/** Titles and descriptions for the routes' metadata. */
export const lungCancerHindiMeta = {
  neemrana: { title: lungParts.title, description: lungParts.description },
  harrai: { title: ayurParts.title, description: ayurParts.description },
  vidyaNagar: { title: vidyaNagarParts.title, description: vidyaNagarParts.description },
  mandawa: { title: mandawaParts.title, description: mandawaParts.description },
  charkhiDadri: { title: charkhiDadriParts.title, description: charkhiDadriParts.description },
  bhilwara: { title: bhilwaraParts.title, description: bhilwaraParts.description },
}
