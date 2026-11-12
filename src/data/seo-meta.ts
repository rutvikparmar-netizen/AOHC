import { migratedArticles } from './articles'

/**
 * SEARCH TITLES AND DESCRIPTIONS FOR THE MIGRATED PAGES
 * ----------------------------------------------------------------------------
 * These pages already earn impressions and very few clicks. Their titles
 * were the WordPress page titles — often 120–200 characters, which Google
 * cuts off after about 60, so the searcher saw "Comprehensive Care: Stage 4,
 * Advanced, Recurrent or Late-Stage Ovarian…" and nothing about where or
 * who. `buildMetadata` replaces a page's title and description with the
 * entry here, looked up by its canonical path.
 *
 * RULES EVERY ENTRY FOLLOWS
 *   • Title ≤ 60 characters including " | AOHC"; description ≤ 155.
 *   • What the page is about, in the words people search with, first.
 *   • No "best", "top", "cure", "guaranteed", "No. 1": a page that cannot
 *     back a superlative must not put it in a search result.
 *   • Location pages say "for patients from <town>". AOHC's centre is in
 *     Gurugram; these pages must not read as a clinic in that town.
 *   • Articles describe what the article explains, not what a treatment
 *     achieves.
 *
 * Location pages (≈125) are titled by rule from their own title; the
 * articles and one-off pages are written by hand below. The page's
 * visible H1 is unchanged — only the search snippet changes.
 *
 * ⚠️  The Hindi titles and descriptions were written for this table, not
 * copied, and need a Hindi speaker's check like the pages themselves.
 */

export interface SeoEntry {
  /** Absent on the main pages, which keep their own titles. */
  title?: string
  description: string
}

const SUFFIX = ' | AOHC'

/* ── Hand-written: articles and one-off pages ─────────────────────────── */
const HAND: Record<string, [string, string]> = {
  '/vitamin-c-infusion-and-g6pd-deficiency': ['High-Dose Vitamin C Infusion and G6PD Deficiency', 'Why G6PD deficiency matters before high-dose IV vitamin C: how the infusion can cause haemolysis, who should be screened and what to ask.'],
  '/myeloproliferative-neoplasms': ['Myeloproliferative Neoplasms: Types and Treatment', 'A guide to myeloproliferative neoplasms: polycythaemia vera, essential thrombocythaemia and myelofibrosis — symptoms, diagnosis and treatment.'],
  '/breast-cancer-diagnosis': ['Breast Cancer Diagnosis: Mammogram, Ultrasound, MRI', 'How breast cancer is diagnosed with imaging — mammography, ultrasound, MRI and more — what each test shows and when doctors use it.'],
  '/iv-vitamin-c': ['High-Dose IV Vitamin C for Cancer: How It Works', 'What high-dose intravenous vitamin C is, how it acts on cancer cells at pharmacological doses, who may be suitable and what the evidence shows.'],
  '/human-trials-of-mistletoe-therapy': ['Mistletoe Therapy in Cancer: Human Trial Evidence', 'What human trials show about mistletoe extract in cancer care — quality of life, survival and side effects — and the limits of that evidence.'],
  '/2-deoxyglucose-2dg': ['2-Deoxyglucose (2DG) in Cancer: Metabolic Therapy', "How 2-deoxy-D-glucose (2DG) targets cancer's sugar metabolism, how it is given, and where it fits alongside chemotherapy and radiation."],
  '/2-deoxyglucose-2dg-blog': ['2DG Mechanisms: Glycolysis and Lysosomal Recycling', 'How 2-deoxyglucose blocks glycolysis, disrupts glycosylation and affects lysosomal recycling in cancer cells — the science, explained.'],
  '/breast-cancer-stages': ['स्तन कैंसर ग्रेडिंग और स्टेजिंग', 'स्तन कैंसर के ग्रेड और स्टेज क्या होते हैं, TNM प्रणाली कैसे काम करती है और हर चरण का उपचार पर क्या असर पड़ता है।'],
  '/hydrogen-inhalation-therapy': ['Hydrogen Inhalation Therapy in Cancer Care', 'What molecular hydrogen inhalation is, how it may reduce oxidative stress and inflammation, and what research says about it in cancer care.'],
  '/hydrogen-therapy-a-recent-addition-to-anti-cancer-arsenal': ['Hydrogen Therapy: A Recent Addition to Cancer Care', 'An overview of hydrogen therapy in oncology — proposed mechanisms, early studies and how it is used alongside conventional cancer treatment.'],
  '/ecct': ['ECCT: Electro-Capacitive Cancer Therapy Explained', 'How electro-capacitive cancer therapy (ECCT) uses a low-intensity electric field to interfere with cancer cell division, and what studies show.'],
  '/discover-the-healing-power-of-ayurvedic-cancer-care-gopala-shimoga-karnataka-india': ['Ayurvedic Cancer Care for Patients from Gopala', 'Ayurvedic and integrative cancer care at Art of Healing Cancer, Gurugram, for patients from Gopala, Shimoga, alongside conventional treatment.'],
  '/empowering-integrative-oncology-treatment-hub-badi-dhaulpur-rajasthan-india': ['Integrative Oncology for Patients from Badi, Dhaulpur', 'Integrative oncology at Art of Healing Cancer, Gurugram, for patients from Badi, Dhaulpur: precision diagnostics with conventional and supportive care.'],
  '/glioblastoma': ['Glioblastoma Treatment in India: Integrative Care', 'Integrative, precision-led care for glioblastoma and brain cancer at Art of Healing Cancer, Gurugram: molecular profiling and metabolic therapy.'],
  '/insight/leading-accessible-wellness-package-and-trusted-precision-experts-in-india-innovative-precision-metabolic-end-stage-breast-cancer-care-for-kaushik-enclave-burari-delhi-india-patients': ['End-Stage Breast Cancer Care for Patients from Burari', 'Precision and metabolic care for advanced breast cancer at Art of Healing Cancer, Gurugram, for patients from Kaushik Enclave, Burari, Delhi.'],
  '/best-doctors-for-high-dose-vitamin-c-for-cancer-treatment-in': ['High-Dose Vitamin C Specialists for Cancer in India', "Consult Art of Healing Cancer's team about high-dose intravenous vitamin C alongside conventional cancer treatment, in Gurugram, India."],
  '/vitamin-cadjunctive-therapy-to-chemo-and-radiation': ['IV Vitamin C Alongside Chemotherapy and Radiation', 'Can high-dose intravenous vitamin C be given alongside chemotherapy and radiation? Mechanisms, study findings and safety, explained.'],
  '/vitamin-c-in-clinical-trials': ['High-Dose IV Vitamin C in Clinical Trials', 'A review of clinical trials of high-dose intravenous vitamin C in cancer — tumour types studied, doses, safety and what the results suggest.'],
  '/vitamin-c-effects-on-cancer': ['Vitamin C as Pro-oxidant and Antioxidant in Cancer', 'How pharmacological doses of ascorbic acid act as a pro-oxidant against cancer cells while acting as an antioxidant in normal tissue.'],
  '/paget-breast-cancer': ['इंफ्लेमेटरी और पैगेट स्तन कैंसर', 'इंफ्लेमेटरी ब्रेस्ट कैंसर (IBC) और स्तन की पैगेट बीमारी के लक्षण, निदान और उपचार के विकल्पों की जानकारी।'],
  '/aot': ['Antisense Oligonucleotide Therapy (AOT) in Cancer', 'What antisense oligonucleotide therapy is, how it silences cancer-driving genes, and how AOT may be combined with other cancer treatment.'],
  '/next-generation-sequencing-ngs': ['Next Generation Sequencing (NGS) in Cancer Care', "How next generation sequencing reads a tumour's genes to find targetable mutations and guide personalised cancer treatment."],
  '/hematological-malignancies': ['Hematological Malignancies: A Guide for Patients', 'Leukaemia, lymphoma and myeloma explained for patients and caregivers — types, symptoms, diagnosis and treatment options.'],
  '/mistletoe_therapy': ['Mistletoe Therapy for Cancer: How It Works', 'What mistletoe extract therapy is, how it is given, its proposed effects on the immune system and cancer cells, and what studies show.'],
  '/hyperbaric-oxygen-therapy': ['Hyperbaric Oxygen Therapy (HBOT) in Cancer Care', 'How hyperbaric oxygen therapy raises oxygen levels in tissue, its uses in cancer care and radiation injury, and what to know before treatment.'],
  '/role-of-acetate-in-fat-metabolism-and-cancer-development': ['Acetate in Fat Metabolism and Cancer Development', 'How cancer cells use acetate to build fat and grow, and why acetate metabolism is studied as a target in cancer therapy.'],
  '/digital-twin-simulation-and-anesthesia-safe-robotic-breast-surgery-lumpectomy-mastectomy-for-patients-from-staten-island-new-york-city-new-york-united-states-performed-at-art-of-h': ['Robotic Breast Surgery: Patients from Staten Island', 'Robotic mastectomy and lumpectomy at Art of Healing Cancer, Gurugram, India, for patients travelling from Staten Island, New York.'],
  '/ayurvedic-medicine': ['Ayurvedic Medicine in Cancer Care', 'How Ayurvedic medicine is used alongside conventional cancer treatment at Art of Healing Cancer — herbs, diet, detoxification and supportive care.'],
  '/role-of-pentose-phosphate-pathway-during-glucose-metabolism-in-cancer-development': ['Pentose Phosphate Pathway in Cancer Metabolism', 'How cancer cells use the pentose phosphate pathway during glucose metabolism to build DNA and resist oxidative stress.'],
  '/8212-2': ['Antisense Oligonucleotide Therapy in Oncology', 'How antisense oligonucleotides block cancer-related genes, the main kinds of AOT drug, and their place in oncology research and treatment.'],
  '/advanced-diagnostics': ['Advanced Cancer Diagnostics: CTC and Gene Tests', 'Advanced diagnostics in cancer — circulating tumour cell tests, chemosensitivity and gene expression analysis — and how they guide treatment.'],
  '/mistletoe-therapy-in-cancer-management': ['Mistletoe Therapy, Proteins and Gene Expression', 'Can mistletoe therapy inhibit cancer-related proteins and gene overexpression? What laboratory and clinical studies suggest.'],
  '/best-doctors-for-sinonasal-undifferentiated-carcinoma-snuctreatment-in': ['Sinonasal Undifferentiated Carcinoma (SNUC) Care', 'Sinonasal undifferentiated carcinoma (SNUC) explained — types, causes, diagnosis and treatment — and how to consult our team in Gurugram, India.'],
  '/best-doctors-for-sinonasal-squamous-cell-carcinoma-snsc-treatment-in': ['Sinonasal Squamous Cell Carcinoma (SNSC) Care', 'Sinonasal squamous cell carcinoma (SNSC) explained — causes, diagnosis and treatment options — and how to consult our team in Gurugram, India.'],
  '/best-doctors-for-mistletoe-therapy-for-cancer-treatment-in': ['Mistletoe Therapy for Cancer in India: Consult', "Mistletoe therapy explained — types, how it is given and what studies show — and how to consult Art of Healing Cancer's team in Gurugram."],
  '/best-doctors-for-sinonasal-adenocarcinoma-sna-treatment-in': ['Sinonasal Adenocarcinoma (SNA): Treatment in India', 'Sinonasal adenocarcinoma (SNA) explained — causes, diagnosis and treatment options — and how to consult our team in Gurugram, India.'],
  '/breast-cancer-treatment': ['स्तन कैंसर का उपचार: हर चरण के विकल्प', 'स्तन कैंसर के हर चरण में सर्जरी, विकिरण, हार्मोन थेरेपी, कीमोथेरेपी और लक्षित उपचार के विकल्पों की जानकारी।'],
  '/circulating-tumor-cell': ['Circulating Tumour Cell (CTC) Test in Cancer', 'What a circulating tumour cell test detects in the blood, and how it helps track metastatic cancer, relapse risk and response to treatment.'],
  '/metabolomics': ['Metabolomics and Metabolic Therapy in Cancer', 'How cancer cells rewire their metabolism — the Warburg effect — and how metabolomics informs metabolic therapy at Art of Healing Cancer.'],
  '/can-2-deoxy-d-glucose-2dg-make-chemotherapy-more-effective': ['Can 2DG Make Chemotherapy More Effective?', 'What laboratory, animal and early human studies show about combining 2-deoxy-D-glucose (2DG) with chemotherapy drugs.'],
  '/can-2-deoxy-d-glucose-2dg-make-radiation-therapy-more-effective': ['Can 2DG Make Radiation Therapy More Effective?', 'How 2-deoxy-D-glucose may make cancer cells more sensitive to radiation, and what laboratory studies and clinical trials have found.'],
  '/glucose-metabolism-and-cancer-development': ['Aerobic Glycolysis (Warburg Effect) and Cancer', 'How cancer cells favour aerobic glycolysis — the Warburg effect — to fuel growth, and why glucose metabolism is a target in cancer care.'],
  '/role-of-fat-transporter-in-fat-metabolism-and-cancer-development': ['Fat Transporters in Cancer Metabolism', 'How fatty-acid transport proteins supply fat to cancer cells, and their role in tumour growth and spread.'],
  '/2dg-foes-mannose-and-n-acetyl-cysteine-nac': ['Mannose and NAC: How They Counter 2DG', 'How mannose and N-acetyl cysteine (NAC) can counteract 2-deoxy-D-glucose in cancer cells, and what that means during 2DG treatment.'],
  '/yoga-and-meditation': ['Yoga and Meditation for Cancer Patients', 'Evidence-based benefits of yoga and meditation during and after cancer treatment — fatigue, anxiety, sleep and nausea — and safe practice.'],
  '/targeted-therapy-in-cancer': ['Targeted Therapy in Cancer: Types and Examples', 'What targeted cancer therapy is, the main drug types — monoclonal antibodies, kinase inhibitors and more — with breast, lung and thyroid examples.'],
  '/histopathology': ['Histopathology in Cancer: Biopsy and FNAC', 'What histopathology tells you about a cancer — FNAC, biopsy, tumour type, grade and markers — and why it guides treatment decisions.'],
  '/from-dna-to-rna': ['OmiCure RNA Expression Test for Resistant Cancers', 'How the OmiCure RNA expression test, offered with Art of Healing Cancer, analyses tumour RNA to suggest options for resistant and rare cancers.'],
  '/cancer-metabolism-how-tumors-rewire-energy-and-nutrient-pathways': ['Cancer Metabolism: How Tumours Rewire Energy', 'How tumours rewire glucose, glutamine and fat metabolism to grow, and how imaging, biomarkers and therapies target those pathways.'],
  '/impact-of-high-dose-intravenous-vitamin-c-on-cancers-with-braf-kras-mutations': ['High-Dose Vitamin C for BRAF and KRAS Cancers', 'What studies show about high-dose intravenous vitamin C in cancers with BRAF or KRAS mutations, such as colorectal cancer.'],
  '/chemotherapy': ['Chemotherapy: Drug Types, Dosing and Side Effects', 'How chemotherapy works, the main drug classes, how doses are planned, common side effects, and how sensitivity testing guides drug choice.'],
  '/antisense-bcl-2-and-her-2-oligonucleotide-therapy-in-breast-cancer': ['Antisense BCL-2 and HER2 Therapy in Breast Cancer', 'How antisense oligonucleotides against BCL-2 and HER2 may help in HER2-positive breast cancer, and what research has found.'],
  '/blogs/persistent-fever-in-cancer-causes-treatments-natural-relief': ['Persistent Fever in Cancer: Causes and Relief', 'Why fevers persist in cancer, why antibiotics may not help, when to seek urgent care, and supportive options to discuss with your team.'],
  '/affordable-integrative-cancer-care': ['Affordable Integrative Cancer Care in India', 'How Art of Healing Cancer keeps integrative oncology affordable: Indian-made drugs, no middlemen and partner hospitals at several price points.'],
  '/आयुर्वेदिक-चमत्कार-खोजें': ['स्तन कैंसर का समग्र उपचार — अरावली, गुड़गांव', 'अरावली, गुड़गांव के मरीज़ों के लिए आर्ट ऑफ हीलिंग कैंसर, गुरुग्राम में स्तन कैंसर का समग्र उपचार: प्रिसिजन ऑन्कोलॉजी और आयुर्वेदिक सहायता।'],
  '/2dg-make-immunotherapy-more-effective': ['Can 2DG Make Cancer Immunotherapy More Effective?', 'How 2-deoxy-D-glucose may strengthen immunotherapy, including CAR T-cell therapy, by blocking glycosylation and sugar metabolism in tumours.'],
}

/* ── Main pages: their own titles stay; descriptions over ~160 characters
      (the content draft's) are shortened, keeping their wording. ── */
const MAIN_DESCRIPTIONS: Record<string, string> = {
  '/blogs': 'Articles from the Art of Healing Cancer team on cancer diagnosis, treatment mechanisms and supportive therapies, from vitamin C to breast cancer imaging.',
  '/blogs/aohc-breast-cancer-chemotherapy-dosage-calculator': 'Calculator for major breast cancer chemotherapy drugs: BSA-based doses with dose levels, and carboplatin by the Calvert formula. Educational only.',
  '/blogs/category/dosing-calculator': 'AOHC dosing calculators: breast cancer chemotherapy (BSA and Calvert), fenbendazole and ivermectin tablet doses. Educational tools, not medical advice.',
  '/blogs/ivermectin-dosing-calculator': 'Ivermectin tablet-dose calculator with two presets: cancer (investigational) 0.4 mg/kg and antiparasitic 0.2 mg/kg. Educational, not medical advice.',
  '/faqs': 'What integrative cancer care means, what a review can promise, which records are needed, travelling for treatment and when to seek urgent care.',
  '/knowledge': 'Patient resources from Art of Healing Cancer: understanding a diagnosis, treatment options, molecular testing, side effects, nutrition and travel.',
  '/medical-disclaimer': "Art of Healing Cancer's website is general educational information. It does not replace medical advice, and these channels are not an emergency service.",
  '/our-doctors': "The specialists on the AOHC team, the disciplines a cancer review may involve, and how care is shared with a patient's existing oncologist.",
  '/privacy-policy': 'How Art of Healing Cancer collects, uses, stores and shares personal information from visitors and enquiries, including medical information.',
  '/request-a-consultation': 'What happens after you send an enquiry to Art of Healing Cancer, what the team will need, and what a request does and does not guarantee.',
  '/terms-of-use': 'Terms for using the Art of Healing Cancer website: using it does not create a doctor–patient relationship, and it is not an emergency service.',
  '/treatment-costs': 'What affects the cost of cancer care, what a written estimate should cover, questions to ask first, and why paying does not guarantee an outcome.',
  '/who-we-are': 'Art of Healing Cancer is one of the first institutions dedicated to advanced cancers, integrating modern and traditional medicine with science.',
}

/* ── Rule: location pages ─────────────────────────────────────────────── */

/** "<town>, <district>" from a page title: "… Patients from X …" or "… | X". */
function locationOf(title: string): string | null {
  const from = title.match(/Patients from (.+?)(?: to Art of Healing| at Art of Healing| Choose|$)/i)
  const raw = from?.[1] ?? title.split(' | ')[1]
  if (!raw) return null
  const parts = raw.replace(/\s+/g, ' ').split(',').map((p) => p.trim()).filter((p) => p && !/^(india|भारत)$/i.test(p))
  return parts.slice(0, 2).join(', ') || null
}

/** Location templates: what the page offers (`what`) and its detail (`tail`),
 *  in descending length; `byRule` takes the longest that fits 155. */
const SERVICES: { match: RegExp; name: string; what: string; tail: string; hindi?: string }[] = [
  { match: /फेफड़/, name: 'फेफड़ों के कैंसर का आयुर्वेदिक उपचार', what: '', tail: '', hindi: 'फेफड़ों के कैंसर का समन्वित उपचार: प्रिसिजन ऑन्कोलॉजी और आयुर्वेदिक सहायता।' },
  { match: /स्तन|चमत्कार/, name: 'स्तन कैंसर का समग्र उपचार', what: '', tail: '', hindi: 'स्तन कैंसर का समग्र उपचार: प्रिसिजन ऑन्कोलॉजी और आयुर्वेदिक सहायता।' },
  { match: /glioblastoma|glioma|brain/i, name: 'Glioblastoma Care', what: 'Glioblastoma and brain cancer care', tail: 'molecular profiling and 2-DG metabolic therapy' },
  { match: /ovarian/i, name: 'Stage 4 Ovarian Cancer Care', what: 'Stage 4 and recurrent ovarian cancer care', tail: 'liquid biopsy, BRCA/HRD testing and targeted therapy' },
  { match: /gastric|stomach/i, name: 'Stomach Cancer Metabolic Therapy', what: 'Metabolic therapy for stomach cancer', tail: 'precision diagnostics and integrative care' },
  { match: /vulvar/i, name: 'Stage 4 Vulvar Cancer Care', what: 'Stage 4 vulvar cancer care', tail: 'surgery, radiation, chemotherapy and supportive care' },
  { match: /cervical/i, name: 'Cervical Cancer Care', what: 'Cervical cancer care', tail: 'robotic surgery, chemotherapy and integrative support' },
  { match: /breast/i, name: 'Breast Cancer Care', what: 'Breast cancer care', tail: 'robotic breast-preserving surgery and integrative support' },
  { match: /lung|breathe|pulmonary/i, name: 'Lung Cancer Care', what: 'Lung cancer care', tail: 'precision oncology, chemosensitivity testing and integrative support' },
  { match: /mistletoe/i, name: 'Mistletoe Therapy', what: 'Mistletoe therapy', tail: 'given alongside conventional cancer treatment' },
  { match: /metabolic|precision metabolic/i, name: 'Metabolic Cancer Therapy', what: 'Metabolic cancer therapy', tail: 'targeting tumour metabolism alongside conventional treatment' },
  { match: /ayurved/i, name: 'Ayurvedic Cancer Care', what: 'Ayurvedic cancer care', tail: 'supportive Ayurveda alongside conventional and precision oncology' },
  { match: /.*/, name: 'Integrative Oncology', what: 'Integrative oncology', tail: 'conventional treatment with precision diagnostics and supportive care' },
]

function byRule(title: string): SeoEntry | null {
  const loc = locationOf(title)
  if (!loc) return null
  const s = SERVICES.find((x) => x.match.test(title))!
  const town = loc.split(',')[0]!.trim()
  const titles = s.hindi
    ? [`${s.name} — ${loc}`, `${s.name} — ${town}`]
    : [`${s.name} for Patients from ${loc}`, `${s.name} for Patients from ${town}`, `${s.name} — ${town}`]
  const core = titles.find((c) => c.length + SUFFIX.length <= 60) ?? titles[titles.length - 1]!
  const descs = s.hindi
    ? [loc, town].map((l) => `${l} के मरीज़ों के लिए आर्ट ऑफ हीलिंग कैंसर, गुरुग्राम में ${s.hindi}`)
    : [loc, town].flatMap((l) => [
        `${s.what} at Art of Healing Cancer, Gurugram, for patients from ${l}: ${s.tail}. Ask our team.`,
        `${s.what} at Art of Healing Cancer, Gurugram, for patients from ${l}: ${s.tail}.`,
        `${s.what} at AOHC, Gurugram, for patients from ${l}: ${s.tail}.`,
        `${s.what} at Art of Healing Cancer, Gurugram, for patients from ${l}.`,
      ])
  const description = descs.find((d) => d.length <= 155) ?? descs[descs.length - 1]!
  return { title: core + SUFFIX, description }
}

function build(): Map<string, SeoEntry> {
  const map = new Map<string, SeoEntry>()
  for (const a of migratedArticles) {
    const hand = HAND[a.href]
    if (hand) map.set(a.href, { title: hand[0] + SUFFIX, description: hand[1] })
    else {
      const rule = byRule(a.title)
      if (rule) map.set(a.href, rule)
    }
  }
  for (const [path, description] of Object.entries(MAIN_DESCRIPTIONS)) map.set(path, { description })
  return map
}

const TABLE = build()

/** The search title and description for a page, by canonical path, if any. */
export function seoFor(path: string): SeoEntry | undefined {
  return TABLE.get(path)
}

/** Every entry, for the audit script. */
export function allSeoEntries(): [string, SeoEntry][] {
  return [...TABLE.entries()]
}
