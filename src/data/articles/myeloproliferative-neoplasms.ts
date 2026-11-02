import type { ArticlePageContent } from '@/types'

/**
 * MYELOPROLIFERATIVE NEOPLASMS
 * ----------------------------------------------------------------------------
 * Migrated from https://artofhealingcancer.com/myeloproliferative-neoplasms/
 * and kept at that URL. Transcribed verbatim.
 *
 * ⚠️  THE SOURCE MISSPELLS THE CLINIC'S OWN NAME — "At ART OF HEALING
 * CANCE, we have extensive expertise…". Corrected here, because a missing
 * letter in the organisation's name is a defect in the page rather than a
 * claim anyone needs to review. Every other error is left as found.
 *
 * ⚠️  TWO SENTENCES ON THIS PAGE ARE CAPABILITY CLAIMS, NOT MEDICAL
 * EDUCATION, and a reviewer should confirm both are true of AOHC today:
 *
 *   • "Our hematopathologists specialize in myeloproliferative neoplasms"
 *     — asserts a named sub-speciality on staff.
 *   • "ART OF HEALING CANCER has a level of experience and expertise that
 *     can make a profound difference in your treatment."
 *
 * The rest of the page is standard disease information and reads as such.
 *
 * ⚠️  "Electrical wiring" IS LISTED AS A RISK FACTOR for MPN, alongside
 * nuclear radiation and benzene. There is no accepted evidence that
 * domestic wiring causes myeloproliferative neoplasms. Reproduced because
 * this is a migration, but it is the single sentence on this page most in
 * need of a clinician's eye.
 *
 * ⚠️  THE DRUG APPROVALS ARE DATED AND WILL GO STALE. Ropeginterferon
 * alfa-2b "approved … in November 2021" and pacritinib "February 2022" were
 * current when the page was written. Anyone reviewing this should check
 * them rather than assume.
 */
export const myeloproliferativeNeoplasms: ArticlePageContent = {
  hero: {
    title: 'Myeloproliferative Neoplasms',
    body: [
      'Myeloproliferative neoplasms (MPN), previously called myeloproliferative disorders, are diseases of the bone marrow and blood.',
      'They can strike at any age, have no known cause, and present with a wide range of symptoms and outlooks.',
    ],
  },

  lead: [
    'Myeloproliferative neoplasms (MPN), previously called myeloproliferative disorders, are diseases of the bone marrow and blood. They can strike at any age, have no known cause, and present with a wide range of symptoms and outlooks.',
    'Sometimes, the disease progresses slowly and requires little treatment; at other times, it develops into acute myeloid leukemia (AML).',
  ],

  sections: [
    {
      body: [
        'To understand what happens to your blood when you have MPN, it helps to know what makes up normal blood. There are three major types of blood cells; red blood cells (RBCs), white blood cells (WBCs), and platelets.',
        'Red blood cells (RBCs), the major part of your blood, carry oxygen and carbon dioxide throughout your body. The percentage of RBCs in the blood is called hematocrit. The part of the RBCs that carries oxygen is a protein called hemoglobin. All body tissues need oxygen to work properly.',
        'White blood cells (WBCs) include several different types. Each has its own role in protecting the body from germs. The three major types are neutrophils, monocytes, and lymphocytes.',
      ],
      items: [
        'Neutrophils (also known as granulocytes or polys) destroy most bacteria.',
        'Monocytes destroy germs such as tuberculosis.',
        'Lymphocytes are responsible for destroying viruses and for overall management of the immune system. When lymphocytes see foreign material, they increase the body’s resistance to infection.',
      ],
      outro: [
        'Platelets are the cells that help control bleeding. When you cut yourself, the platelets collect at the site of the injury and form a plug to stop the bleeding.',
      ],
    },

    {
      title: 'Myeloproliferative neoplasm types',
      body: ['There are several types of myeloproliferative neoplasms. The main types are:'],
    },
    {
      title: 'Primary myelofibrosis',
      level: 3,
      body: [
        'Primary myelofibrosis affects the red blood cells and granulocytes, a type of white blood cell. The cells don’t mature normally and are irregularly shaped. Primary myelofibrosis also causes thickening or scarring of the fibers inside the bone marrow, which can decrease the production of red blood cells and cause anemia.',
      ],
    },
    {
      title: 'Polycythemia vera (PV)',
      level: 3,
      body: [
        'Polycythemia vera (PV) is caused by the overproduction of red blood cells in the bone marrow, which then build up in the blood. Often, the spleen swells as extra blood cells collect there, causing pain or a full feeling on the left side. Itching all over the body is a symptom of PV.',
      ],
    },
    {
      title: 'Essential Thrombocythemia (ET)',
      level: 3,
      body: [
        'Essential Thrombocythemia (ET) means that the number of platelets in the blood is much higher than normal, while other blood cell types are normal. The extra platelets make the blood "sticky," which slows down blood flow.',
      ],
    },
    {
      title:
        'Chronic eosinophilic leukemia / hypereosinophilic syndrome (HES)',
      level: 3,
      body: [
        'Chronic eosinophilic leukemia/hypereosinophilic syndrome (HES) is characterized by a higher than normal number of the white blood cells responsible for fighting allergic reactions and some parasitic infections (eosonophils). You may experience itching, swelling around the eyes and lips, or swollen hands and/or feet. In some patients, HES may quickly progress to acute myelogenous leukemia.',
      ],
    },
    {
      title: 'Systemic mastocytosis (SM)',
      level: 3,
      body: [
        'Systemic mastocytosis (SM) affects mast cells, which are found in skin, connective tissue, and in the lining of the stomach and intestines. Mast cells serve as a sort of alarm system by signaling disease-fighting blood cells to target areas of the body where they are needed. They may also play a role in wound healing. SM is caused by too many mast cells accumulating in the body’s tissues, which can eventually affect the spleen, bone marrow, liver or small intestine.',
      ],
    },

    {
      title: 'Myeloproliferative neoplasm risk factors',
      body: [
        'Anything that increases your chance of getting myeloproliferative neoplasms is a risk factor. These include exposure to:',
      ],
      items: [
        'Intense radiation, such as a nuclear bomb',
        'Petrochemicals, such as benzene or toluene',
        'Electrical wiring',
      ],
      outro: [
        'Many people with myeloproliferative neoplasms have a mutation in the JAK2 gene.',
      ],
    },

    {
      title: 'Myeloproliferative neoplasm symptoms',
      body: [
        'Often, especially in the early stages, the symptoms of myeloproliferative neoplasms differ from person to person. If you have symptoms, they may include:',
      ],
      items: [
        'Headache',
        'Fatigue',
        'Shortness of breath',
        'Easy bruising or bleeding',
        'Petechiae (tiny red spots under the skin)',
        'Unexplained weight loss',
        'Night sweats',
        'Fever',
        'Pruritus (itching)',
      ],
      outro: [
        'These symptoms do not always mean you have myeloproliferative neoplasm. However, it is important to discuss any symptoms with your doctor, since they may signal other health problems.',
      ],
    },

    {
      title: 'Myeloproliferative neoplasm diagnosis',
      body: [
        'At Art of Healing Cancer, we have extensive expertise in diagnosing myeloproliferative neoplasms, as well as the latest technology to do so. Our hematopathologists specialize in myeloproliferative neoplasms, giving them the knowledge to pinpoint your exact diagnosis.',
        'Diagnosis of myeloproliferative neoplasms can be challenging. It often does not have symptoms in the early stages, and when it does they are often mistaken for signs of other diseases. A doctor must have a high degree of experience in myeloproliferative neoplasms (MPN) to make an accurate diagnosis.',
        'If MPN is suspected, blood tests will be ordered. The blood test results can validate the suspicion, but a bone marrow biopsy may be required to definitively confirm the diagnosis.',
      ],
    },

    {
      title: 'Myeloproliferative neoplasm treatment',
      body: [
        'Art of Healing Cancer has a level of experience and expertise that can make a profound difference in your treatment.',
        'The three classic MPN subtypes are myelofibrosis, the most aggressive MPN; polycythemia vera, the most common; and essential thrombocythemia, the most indolent.',
        'Myeloproliferative neoplasms can be challenging to treat. Patients may require years of therapy and follow-up care. Treatments for MPN are generally aimed at controlling disease symptoms, and your symptoms will help the doctor decide which treatment is best. Therapies may include one or more of the following:',
      ],
      items: [
        'Medications: aspirin, hydroxyurea, anagrelide and interferon-alpha are the main medications for essential thrombocythemia and polycythemia vera. Ruxolitinib can be used in polycythemia vera patients not responding to hydroxyurea. Ropeginterferon alpha-2b was approved as a first-line treatment for PV in the United States in November 2021. For myelofibrosis, ruxolitinib and fedratinib (JAK inhibitors) are approved therapies. Thalidomide, steroids and other hormones, and cladribine may also be used. Pacritinib received accelerated regulatory approval for patients with myelofibrosis and very low platelet counts (thrombocytopenia) in February 2022.',
        'Blood or platelet transfusion',
        'Growth factors, which stimulate growth of bone marrow cells, are given as injections under the skin and may benefit myelofibrosis patients with low blood cell counts.',
        'Radiation therapy of the spleen in patients with myelofibrosis',
        'Surgical removal of the spleen in patients with myelofibrosis',
        'Phlebotomy for patients with polycythemia vera',
        'Stem cell transplant in patients with myelofibrosis',
      ],
    },
  ],
}
