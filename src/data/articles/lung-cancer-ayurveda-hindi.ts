import type { ArticlePageContent, ArticleSection } from '@/types'

/**
 * फेफड़ों के कैंसर — THE TWO HINDI LUNG-CANCER LOCATION PAGES
 * ----------------------------------------------------------------------------
 * Migrated from, and kept at:
 *   /फेफड़ों-के-कैंसर-के-लिए-अभ-6/   (Neemrana, Alwar, Rajasthan)
 *   /आयुर्वेदिक-जादू-उजागर-सा-2/     (Harrai, Chhindwara, Madhya Pradesh)
 *
 * ⚠️  ONE TEMPLATE, TWO PAGES. Both are location landing pages from the
 * same WordPress template. Their English body is identical word for word;
 * only the title, description and seven Hindi section headings (three of
 * them with a Hindi paragraph) differ. So the English is written once
 * here and each page supplies its Hindi parts. The Hindi was copied out
 * of the live HTML by script, not retyped.
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
    lang: 'hi',
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

export const lungCancerAyurvedaNeemrana = build(lungParts)
export const lungCancerAyurvedaHarrai = build(ayurParts)

/** Titles and descriptions for the routes' metadata. */
export const lungCancerHindiMeta = {
  neemrana: { title: lungParts.title, description: lungParts.description },
  harrai: { title: ayurParts.title, description: ayurParts.description },
}
