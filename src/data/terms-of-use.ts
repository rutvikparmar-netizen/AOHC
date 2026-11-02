import type { LegalPageContent } from '@/types'
import { site } from '@/lib/site'

/**
 * TERMS OF USE COPY
 * ----------------------------------------------------------------------------
 * ⚠️  THIS HAS NOT BEEN THROUGH LEGAL REVIEW AND IS NOT FINISHED TERMS. It
 * is the supplied draft with its placeholders removed. Read the list below
 * before this page is treated as final.
 *
 * ⚠️  WHAT IS STILL MISSING:
 *
 *   1. THE LEGAL ENTITY. §10 asks for the registered legal entity name and
 *      it is recorded nowhere. `site.name` is a trading name; nothing here
 *      asserts it is the entity these terms bind.
 *   2. THE GOVERNING LAW AND JURISDICTION. The draft never asks for them
 *      and never states them, which for a document that opens "by
 *      accessing this website, you agree" is the largest hole in it. A
 *      reviewer should not take its absence from the draft as a decision.
 *   3. THE EFFECTIVE DATE, which §9 says the published version should
 *      include, along with "any legally required notices".
 *
 * ⚠️  §3 AND §4 ARE THE TWO THAT MATTER CLINICALLY, not §7 on intellectual
 * property. No doctor–patient relationship arises from using the site or
 * sending an enquiry, and the site is not an emergency service. Both are
 * said elsewhere — beside the enquiry form, on the contact page, in the
 * FAQ — and this is the version with legal weight. Neither may be
 * shortened or moved below the intellectual-property clauses to make the
 * document read in a more conventional order.
 */
export const termsOfUse: LegalPageContent = {
  hero: {
    title: 'Terms of Use',
    body: [
      'By accessing this website, you agree to use it in accordance with the applicable Terms of Use and laws. If you do not agree, you should discontinue use of the website.',
    ],
  },

  sections: [
    {
      title: 'Website Purpose',
      body: [
        'This website provides general information about AOHC, its approach to cancer care, and the enquiry process.',
        'Website information is not a substitute for an individual clinical assessment or advice from a qualified healthcare professional.',
      ],
    },
    {
      title: 'No Doctor–Patient Relationship Through Website Use',
      body: [
        'Visiting the website, submitting a general enquiry, or receiving an automated acknowledgement does not by itself establish a doctor–patient relationship.',
        'Any clinical relationship and associated responsibilities should be established through the appropriate formal process.',
      ],
    },
    {
      title: 'No Emergency Service',
      body: [
        'The website and its general contact forms are not designed for emergency medical care.',
        'If you experience severe or rapidly worsening symptoms, seek urgent medical attention.',
      ],
    },
    {
      title: 'Accuracy and Availability',
      body: [
        'AOHC aims to provide useful and accurate information. However, website content may change, may not cover every circumstance, and may not always reflect the latest clinical developments.',
        'Services, staff, facilities, and treatment availability must be confirmed directly with AOHC.',
      ],
    },
    {
      title: 'External Links',
      body: [
        'The website may link to external websites for educational or informational purposes. AOHC does not automatically endorse all content on those websites and is not responsible for their privacy practices.',
      ],
    },
    {
      title: 'Intellectual Property',
      body: [
        'Unless otherwise stated, website text, branding, design, and other materials are owned by AOHC or used with permission.',
        'Content may not be reproduced or commercially reused without the required authorization, except where permitted by law.',
      ],
    },
    {
      title: 'Acceptable Use',
      body: [
        'Users must not misuse the website, attempt unauthorized access, introduce malicious code, or interfere with its operation.',
      ],
    },
    {
      title: 'Changes to These Terms',
      body: ['AOHC may update these Terms of Use as needed.'],
    },
    {
      /**
       * ⚠️  THE DRAFT'S CONTACT BLOCK IS THREE PLACEHOLDERS — email, legal
       * entity, address. Two are real values from `site.ts`; the legal
       * entity is not recorded anywhere and is therefore not stated
       * rather than guessed at from the trading name.
       */
      title: 'Contact',
      body: ['For questions about these terms, contact AOHC at the address below.'],
      items: [
        `Email: ${site.contact.email}`,
        `Registered address: ${site.contact.registeredAddress}`,
      ],
    },
  ],
}
