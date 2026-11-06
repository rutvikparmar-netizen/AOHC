import { build, type HindiParts } from './lung-cancer-ayurveda-hindi'

/**
 * EIGHT MORE LUNG-CANCER LOCATION PAGES, KEPT AT THEIR WORDPRESS URLs
 * ----------------------------------------------------------------------------
 * Beawar, Chail, Ashiana Village (Bhiwadi), Pusad, Ashok Nagar (Shimoga),
 * Panchkula, Khandagiri (Bhubaneswar) and Alathur (Palakkad).
 *
 * The same WordPress template as Bhilwara in `lung-cancer-ayurveda-hindi.ts`,
 * published in English: every page was diffed against Bhilwara and only the
 * title, description, seven section headings and three of their paragraphs
 * differ. Those are copied out of the live HTML by script (`lung-parts3.js`);
 * the shared body, and everything that file says it drops or corrects
 * (doctor profiles, the copy-pasted "Surgery" cost block, the forms), applies
 * here unchanged.
 *
 * ⚠️  FOR REVIEW, NOT CHANGED:
 *   • These are doorway pages: town names on pages about AOHC's Gurugram
 *     centre ("our clinic located in … Pusad"). AOHC has no clinic there.
 *   • Pusad's description reads "our esteemed clinic located in
 *     wellfarePusad" — a run-together typo on the live page, kept as
 *     published because it is the page's meta description.
 *   • Khandagiri's title promises "Immunotherapy Solutions"; the shared
 *     body is the Ayurveda / integrative template.
 */

/** /lung-cancer-care-premier-treatment-clinic-panchsheel-nagar-beawar-rajasthan-india/ */
const beawarParts: HindiParts = {
  lang: 'en',
  title: "Lung Cancer Care: Premier Treatment Clinic | Panchsheel Nagar, Beawar, Rajasthan, India",
  description: "Discover the pinnacle of excellence in Lung Cancer care at the distinguished Premiere Healing Haven. Nestled in the heart of Panchsheel Nagar, Beawar, Rajasthan, India – our illustrious clinic stands as a beacon of hope for those battling this relentless disease. Experience bespoke treatments tailored to your unique journey towards health and vitality amidst tranquil surroundings unparalleled by others in the field. Trust only The Best when it comes to your fight against Lung Cancer - trust us!",
  intro: { title: "Unlocking Lifeforce: Personal Mastery Coaching for Optimized Potential and Fulfillment", body: "Embark on a journey towards unparalleled innovation and originality as you delve into the realm of precision oncology through Art of Healing Cancer. Our holistic approach to lung cancer treatment combines cutting-edge medical expertise with profound compassion, ensuring that each patient receives personalized care tailored to their unique needs. Trust in our best-in-class clinicians at our state-of-the-art clinic to guide you towards recovery and renewed well-being, offering unwavering support every step of your battle against lung cancer." },
  approach: { title: "Embark on a Journey to Optimal Health at the Foremost Lung Cancer Clinic.", body: "Welcome to the best clinic for lung cancer treatment, where we prioritize individualized care and innovative therapies. Our approach combines cutting-edge research with compassionate support, ensuring each patient receives personalized attention every step of the way. Trust us to provide you with top-notch care as we strive towards your recovery journey." },
  team: { title: "Pioneering Lung Cancer Specialists Crafting Groundbreaking Care", body: "At our clinic, we take a holistic approach to treating Lung Cancer by combining the best of conventional therapies with cutting-edge precision oncology and integrative treatments. Our team of doctors are not only experienced in traditional methods but also stay ahead of the curve in innovative approaches to provide you with personalized care that brings hope and healing." },
  daycare: "Pioneering Oncology Oasis: Lung Treatment Center with a Twist- Daycare Facility",
  robotic: "Art of Healing Cancer: Groundbreaking robotic innovation for Lung Cancer treatment.",
  overview: "Prelude and therapeutic approach for pulmonary carcinoma treatment.",
  integrative: "Innovative Holistic Approach for Pulmonary Malignancy- Integrative Oncology",
}

/** /groundbreaking-strategies-for-lung-cancer-treatment-chail-shimla-himachal-pradesh-india/ */
const chailLungParts: HindiParts = {
  lang: 'en',
  title: "Groundbreaking Strategies for Lung Cancer Treatment | Chail, Shimla, Himachal Pradesh, India",
  description: "Discover a transformative approach to the treatment of Lung Cancer that offers hope and healing. Our cutting-edge therapies redefine conventional practices, providing unparalleled care for those battling this formidable disease. Uncover a new path towards recovery with our innovative methods tailored to combatting Lung Cancer at its core.",
  intro: { title: "Innovating Precision Oncology & Holistic Lung Cancer Treatment at Art of Healing", body: "Embark on a transformative journey towards healing at Art of Healing Cancer, where precision oncology meets a holistic approach in the treatment of lung cancer. Our cutting-edge methods transcend traditional practices, offering personalized treatments tailored to each individual's unique needs and genetic makeup. Through meticulous analysis and targeted therapies, we aim to enhance effectiveness while minimizing side effects for optimal outcomes. At Art of Healing Cancer, we believe in empowering our patients with knowledge and support throughout their healing process, guiding them towards a path of hope and resilience against the challenges posed by lung cancer. Partner with us in your quest for wellness as we redefine standards in lung cancer treatment through innovation and compassion." },
  approach: { title: "Charting a New Course: Transformative Lung Cancer Therapies Await.", body: "In a bold new era of lung cancer treatment innovation, discover the transformative power of cutting-edge therapies and personalized care. Our holistic approach goes beyond conventional methods to provide hope and healing for every individual facing the challenge of Lung Cancer Treatment. Join us on this journey towards wellness today!" },
  team: { title: "Guidance from our proficient lung health squad.", body: "Our team of doctors excels in more than just conventional therapies; they bring expertise in precision oncology and integrative treatment to the forefront of lung cancer care. Drawing on a wealth of experience, we tailor personalized approaches that transcend traditional methods, offering comprehensive solutions for effective lung cancer treatment." },
  daycare: "Guidance Hub: Lung Cancer Healing Haven- Daycare Facility",
  robotic: "Art of Healing Cancer: Trailblazing Robotic Lung Cancer Surgery Breakthrough",
  overview: "Pioneering Approach to Lung Cancer Management",
  integrative: "Convergence Approach for Pulmonary Malignancy- Integrative Oncology",
}

/** /pioneering-ayurvedic-remedies-for-lung-cancer-treatment-ashiana-village-bhiwadi-rajasthan-india/ */
const bhiwadiLungParts: HindiParts = {
  lang: 'en',
  title: "Pioneering Ayurvedic Remedies for Lung Cancer Treatment | Ashiana Village, Bhiwadi, Rajasthan, India",
  description: "Discover innovative Ayurvedic solutions for Lung Cancer treatment at Ashiana Village in Bhiwadi, Rajasthan, India. Explore groundbreaking therapies and holistic approaches to combatting this disease naturally with ancient healing practices. Unlock the potential of Ayurveda in your fight against Lung Cancer today!",
  intro: { title: "Art of Healing Cancer: Ayurvedic Elixirs for Lung Cancer Care", body: "Amidst the realm of advanced medical interventions lies Art of Healing Cancer, a sanctuary for those battling lung cancer. Through precision oncology and a holistic approach rooted in ancient Ayurvedic wisdom, patients are embraced with personalized care at every step. The elusive nature of disinfected cells is combated not just superficially but by delving deep into individual constitutions to tailor treatments that resonate uniquely with each person's journey towards healing. At Art Of Healing Cancer, we believe that true restoration blooms when traditional therapies intertwine seamlessly with modern innovations to offer hope beyond conventional boundaries - where lungs breathe anew under the nurturing embrace of Ayurvedic philosophies tailored specifically for combating Lung Cancer." },
  approach: { title: "Embark on a journey to cleanse your lungs with Ayurvedic remedies for Lung Cancer.", body: "Embark on a transformative journey towards healing with our groundbreaking approach to combating Lung Cancer through the power of ancient Ayurvedic treatments. Discover a world where traditional wisdom meets modern science, offering hope and vitality in the face of adversity. Say goodbye to uncertainty and embrace life anew with our holistic solutions for Lung Cancer care." },
  team: { title: "Mastery in Healing: Leading-edge Experts for Your Lungs", body: "Our formidable team of physicians possess unparalleled expertise in conventional therapies and cutting-edge precision oncology to combat lung cancer effectively. Moreover, they are adept in integrating ayurvedic treatments seamlessly into the care regimen, ensuring a holistic approach towards combating this disease with compassion and innovation at its core." },
  daycare: "Sterilized sanctuary for Lung Carcinoma treatment- Daycare Facility",
  robotic: "Art of Healing Cancer: Innovative robotic procedure for Lung Cancer's sanitization.",
  overview: "Novel Approach for Lung Cancer Management",
  integrative: "Harmonizing Therapy for Pulmonary Malignancy- Integrative Oncology",
}

/** /welfares-finest-lung-cancer-clinic-pusad-yavatmal-maharashtra-india/ */
const pusadParts: HindiParts = {
  lang: 'en',
  title: "Welfare’s Finest Lung Cancer Clinic | Pusad, Yavatmal, Maharashtra, India",
  description: "Welcome to the pinnacle of excellence in lung cancer care at our esteemed clinic located in wellfarePusad, Yavatmal, Maharashtra, India. Discover a world-class approach tailored just for you by the best minds in oncology. Let us guide you on your journey toward better health and brighter tomorrows amid Lung Cancer treatment like no other.",
  intro: { title: "Instill proactive self-care habits for overall well-being and vitality.", body: "At Art of Healing Cancer, we prioritize your wellbeing by offering the best in precision oncology and a holistic approach to lung cancer treatment. Our clinic is dedicated to providing personalized care that addresses not only the physical aspects but also focuses on mental and emotional wellness. Through cutting-edge research and innovative therapies, our team strives to optimize outcomes for each patient's unique journey with lung cancer. Trust us at Art of Healing Cancer as we guide you towards achieving optimal health during this challenging time." },
  approach: { title: "Uncover the paramount sanctuary for optimal lung cancer treatment at our clinic.", body: "Achieving well-being while navigating a lung cancer diagnosis can be overwhelming, but with the right support and resources, it's possible to find hope. The best approach is to seek out a top-tier clinic that specializes in personalized treatment plans tailored specifically for you. Remember, your journey towards healing starts with taking that first step forward." },
  team: { title: "Compassionate Mastery: Lung Health Pioneers of Exceptional Care", body: "At our esteemed clinic, we take a holistic approach to treating Lung Cancer that sets us apart from the rest. Our team of doctors are not only highly experienced in conventional therapies but also specialize in precision oncology and integrative treatments, providing you with the best care available for your journey towards wellness." },
  daycare: "Beneficent sanctuary offering distinctive care for pulmonary carcinoma patients.- Daycare Facility",
  robotic: "Art of Healing Cancer: Path-breaking robotic procedure for Lung Cancer care.",
  overview: "Preface and regimen design for Pulmonary Carcinoma management strategy",
  integrative: "Holistic Approach to Managing Lung Malignancy- Integrative Oncology",
}

/** /cutting-edge-ayurvedic-approach-to-lung-cancer-treatment-ashok-nagar-shimoga-karnataka-india/ */
const shimogaLungParts: HindiParts = {
  lang: 'en',
  title: "Cutting-edge Ayurvedic Approach to Lung Cancer Treatment | Ashok Nagar, Shimoga, Karnataka, India",
  description: "Discover an avant-garde Ayurvedic method for combating Lung Cancer at our facility in Ashok Nagar, Shimoga, Karnataka, India. Delve into the realm of alternative therapies with our innovative and cutting-edge approach to treatment, rooted in the ancient wisdom of Ayurveda.",
  intro: { title: "A Magnifying Glass on the Precision Oncology and Holistic Healing of Lung Cancer at Art of Healing Cancer", body: "At the core of Art of Healing Cancer's approach to treating lung cancer is the priority of integrating precision oncology with an ayurvedic treatment regimen. Through a synergistic blend of conventional medical techniques and holistic therapies, the experts at Art of Healing Cancer aim to customize treatment plans tailored to each individual's unique genetic makeup and overall health profile. By prioritizing the personalization of care, patients undergoing treatment for lung cancer can benefit from a comprehensive approach that addresses not only the physical symptoms but also the emotional and spiritual aspects of healing." },
  approach: { title: "Upholding Lung Cancer Treatment: Prioritizing Ayurvedic Healing Methods", body: "In a transformational approach to healthcare priority, researchers are exploring the effectiveness of ayurvedic treatments for lung cancer. Embracing ancient wisdom and natural remedies, this innovative approach offers hope to patients seeking a holistic and personalized path to healing. This harmonious integration of traditional and modern medicine signals a potential breakthrough in lung cancer treatment." },
  team: { title: "Forefront Lung Carers: Our Elite Oncology Specialists", body: "Our distinguished team of doctors possess expertise not just in traditional therapies but also in cutting-edge precision oncology and integrative medicine. When it comes to combating Lung Cancer, our approach extends beyond conventional methods to include personalized care and ayurvedic treatments, ensuring comprehensive and holistic patient well-being." },
  daycare: "Foremost Oncology Haven Redefining Lung Cancer Care",
  robotic: "Groundbreaking robotic procedure transforms lung cancer treatment landscape",
  overview: "Foremost Approach for Lung Cancer Care & Handling Strategy",
  integrative: "Foremost approach harmonizing therapy for Lung Cancer patients",
}

/** /empower-your-health-lung-cancer-ayurvedic-care-sector-8-panchkula-haryana-india/ */
const panchkulaParts: HindiParts = {
  lang: 'en',
  title: "Empower Your Health: Lung Cancer Ayurvedic Care | Sector 8, Panchkula, Haryana, India",
  description: "Elevate Your Well-being with Ayurvedic Wisdom: Discover Holistic Lung Cancer Management at our serene sanctuary in Sector 8, Panchkula, Haryana. Uncover the power of ancient remedies for lung cancer and embark on a path to rejuvenation and vitality.",
  intro: { title: "Preserving Life: Unveiling Ayurvedic Wisdom for Lung Cancer Treatment at Art of Healing Cancer.", body: "At Art of Healing Cancer, our approach to treating lung cancer goes beyond mere preservation; we embrace a holistic methodology that leverages the power of precision oncology and Ayurvedic treatments. Our unique blend of cutting-edge medical technologies and ancient healing practices ensures comprehensive care for each individual battling this formidable disease. By combining personalized therapies tailored to specific genetic markers with natural remedies rooted in centuries-old traditions, we strive to provide not just treatment, but genuine healing for mind, body, and spirit. Experience a new paradigm in healthcare where science meets artistry at Art of Healing Cancer's innovative Lung Cancer Clinic." },
  approach: { title: "Discover the art of preserving health with Ayurvedic wisdom for Lung Cancer treatment.", body: "Embark on a transformative journey towards healing with our groundbreaking approach to Lung Cancer treatment through the ancient wisdom of Ayurveda. Discover a harmonious blend of science and nature, offering hope and restoration for those seeking an alternative path in their battle against this formidable disease." },
  team: { title: "Lung Cancer Savior Squad", body: "Our team of doctors brings a unique blend of expertise to the table when it comes to treating Lung Cancer. Not only are they well-versed in conventional therapies, but they also specialize in precision oncology and integrative approaches like ayurvedic treatments. This comprehensive approach ensures that patients receive personalized care tailored specifically to their needs." },
  daycare: "Conservation center with a unique approach- Daycare Facility",
  robotic: "Art of Healing Cancer: Trailblazing automated procedure for pulmonary ailment",
  overview: "Commencement and therapeutic approach for Pulmonary Carcinoma",
  integrative: "Synergistic therapy for pulmonary malignancy using comprehensive care solution.- Integrative Oncology",
}

/** /revolutionizing-lung-cancer-care-with-immunotherapy-solutions-khandagiri-bhubaneswar-orissa-india/ */
const khandagiriParts: HindiParts = {
  lang: 'en',
  title: "Revolutionizing Lung Cancer Care with Immunotherapy Solutions | Khandagiri, Bhubaneswar, Orissa, India",
  description: "Revamping Lung Cancer Management: Unleashing the Power of Immunotherapy in Khandagiri, Bhubaneswar. Explore cutting-edge solutions for combating lung cancer through innovative immunotherapeutic approaches at our Orissa-based facility. Discover a holistic approach to treatment that goes beyond conventional methods to provide personalized care and support every step of the way towards better health outcomes.",
  intro: { title: "Achieving Flourishing Health: Tailored Strategies for Lung Cancer and Immunotherapy.", body: "Embark on a transformative journey towards healing and wellness with Art of Healing Cancer's innovative approach to Lung Cancer treatment. Our distinguished medical professionals specialize in precision oncology, tailoring personalized therapies based on individual genetic profiles for optimal outcomes. Embrace the power of immunotherapy as part of our holistic methodology, fostering resilience and well-being throughout your cancer care experience. Let us guide you through this intricate process with compassion and expertise, paving the way for a brighter future beyond lung cancer diagnosis." },
  approach: { title: "Transforming Lung Cancer Care: Pioneering Immunotherapy Solutions Await You!", body: "Embrace a transformative approach to combating lung cancer by exploring the potential of immunotherapy. By reforming traditional treatment methods and integrating cutting-edge immunotherapy techniques, we can unlock new avenues for healing and progress in the fight against this formidable disease. Let's champion innovation and collaboration on our path towards optimal health outcomes." },
  team: { title: "Transforming the Lung Cancer Support Brigade with Mastery", body: "At our clinic, the doctors are well-versed in cutting-edge precision oncology techniques and integrative therapies to effectively combat lung cancer. Our team's expertise extends beyond conventional treatments, incorporating innovative methods like immunotherapy for comprehensive care tailored to each patient's unique needs and circumstances. Your journey towards healing starts here with us by your side." },
  daycare: "Transformational lung cancer care hub with a unique approach.- Daycare Facility",
  robotic: "Art Of Healing Cancer: Innovative robotic procedure for pulmonary malignancy",
  overview: "Revamping approach and therapeutic regimen for Pulmonary Carcinoma.",
  integrative: "Transformative approach for Lung Carcinoma combining varied therapies- Integrative Oncology",
}

/** /innovative-ayurvedic-approach-to-lung-cancer-treatment-alathur-palakkad-kerala-india/ */
const alathurParts: HindiParts = {
  lang: 'en',
  title: "Innovative Ayurvedic Approach to Lung Cancer Treatment | Alathur, Palakkad, Kerala, India",
  description: "Discover a groundbreaking Ayurvedic methodology for combating Lung Cancer at our renowned clinic in Alathur, Palakkad, Kerala, India. Our avant-garde approach integrates ancient wisdom with modern research to provide unique, personalized treatments. Say goodbye to conventional methods and explore a holistic path to healing.",
  intro: { title: "Art of Healing Cancer offers innovative approach using Ayurvedic treatment for Lung Cancer.", body: "At the forefront of combating lung cancer, Art of Healing Cancer is pioneering a paradigm shift in the realm of oncology by offering a holistic approach that intertwines precision medicine with Ayurvedic treatments. By harnessing the power of originality and blending cutting-edge technology with ancient healing practices, their innovative methods aim to provide personalized care to each individual facing the challenges of lung cancer. Through a deep understanding of the intricate connection between mind and body, Art of Healing Cancer seeks to not just treat the disease, but to address the root causes and bring about comprehensive healing for their patients." },
  approach: { title: "Unveiling the Singular Efficacy of Ayurvedic Therapy in Lung Cancer Management on our Website.", body: "A groundbreaking approach to combating lung cancer is gaining attention: Ayurvedic treatment. This ancient healing system offers a holistic and personalized approach to managing the disease, focusing on restoring balance and vitality to the body. With a surge in interest in alternative therapies, Ayurveda's potential in aiding lung cancer patients is increasingly intriguing." },
  team: { title: "Pioneering Specialists Devoted to Excellence in Lung Cancer", body: "In our medical team, the doctors bring a unique blend of expertise, with extensive experience in traditional therapies as well as cutting-edge precision oncology techniques. Moreover, they are well-versed in the integration of Ayurvedic treatments, offering a holistic approach to combating lung cancer. This comprehensive approach ensures patients receive a well-rounded and personalized treatment plan." },
  daycare: "Innovative Oncology Oasis: Lung Cancer Sanctuary Spurs Transformation",
  robotic: "Groundbreaking robotic procedure innovating Lung Cancer treatment landscape",
  overview: "Inception and therapeutic approach for Lung Carcinoma",
  integrative: "Innovative Approach Fostering Union for Pulmonary Carcinoma Cure",
}

/** URL (without slashes), breadcrumb label and page, in the order above. */
export const lungLocationPages = [
  { slug: "lung-cancer-care-premier-treatment-clinic-panchsheel-nagar-beawar-rajasthan-india", crumb: "Lung Cancer Care — Panchsheel Nagar, Beawar", parts: beawarParts },
  { slug: "groundbreaking-strategies-for-lung-cancer-treatment-chail-shimla-himachal-pradesh-india", crumb: "Lung Cancer Treatment — Chail, Shimla", parts: chailLungParts },
  { slug: "pioneering-ayurvedic-remedies-for-lung-cancer-treatment-ashiana-village-bhiwadi-rajasthan-india", crumb: "Ayurvedic Lung Cancer Care — Ashiana Village, Bhiwadi", parts: bhiwadiLungParts },
  { slug: "welfares-finest-lung-cancer-clinic-pusad-yavatmal-maharashtra-india", crumb: "Lung Cancer Clinic — Pusad, Yavatmal", parts: pusadParts },
  { slug: "cutting-edge-ayurvedic-approach-to-lung-cancer-treatment-ashok-nagar-shimoga-karnataka-india", crumb: "Ayurvedic Lung Cancer Care — Ashok Nagar, Shimoga", parts: shimogaLungParts },
  { slug: "empower-your-health-lung-cancer-ayurvedic-care-sector-8-panchkula-haryana-india", crumb: "Ayurvedic Lung Cancer Care — Sector 8, Panchkula", parts: panchkulaParts },
  { slug: "revolutionizing-lung-cancer-care-with-immunotherapy-solutions-khandagiri-bhubaneswar-orissa-india", crumb: "Lung Cancer Immunotherapy — Khandagiri, Bhubaneswar", parts: khandagiriParts },
  { slug: "innovative-ayurvedic-approach-to-lung-cancer-treatment-alathur-palakkad-kerala-india", crumb: "Ayurvedic Lung Cancer Care — Alathur, Palakkad", parts: alathurParts },
].map((p) => ({ ...p, title: p.parts.title, description: p.parts.description, content: build(p.parts) }))

