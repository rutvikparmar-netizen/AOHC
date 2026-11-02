import type { LegalPageContent } from '@/types'
import { site } from '@/lib/site'

/**
 * PRIVACY POLICY COPY
 * ----------------------------------------------------------------------------
 * ⚠️  THIS HAS NOT BEEN THROUGH LEGAL REVIEW AND IS NOT A FINISHED POLICY.
 * It is the supplied draft with its drafting instructions removed. A
 * privacy policy is a legal representation made to every visitor who sends
 * an enquiry — including, on this site, people sending medical
 * information. Read the list below before this page is treated as final.
 *
 * ⚠️  WHAT THE DRAFT ASKS FOR AND DOES NOT YET CONTAIN. Each of these is a
 * sentence in the draft addressed to whoever completes it, not copy; they
 * are recorded here rather than rendered, because a live policy telling a
 * reader what "the final policy must specify" is worse than a short one:
 *
 *   1. §1 — the LEGAL ENTITY responsible for processing, and the APPLICABLE
 *      PRIVACY LAWS. Neither is named anywhere. `site.name` is a trading
 *      name, not necessarily the registered entity, so nothing here
 *      asserts one.
 *   2. §3 — the LAWFUL BASIS for each use.
 *   3. §5 — the categories of recipient, any cross-border transfers, and
 *      the safeguards used. The draft's own warning applies: "AOHC should
 *      not make claims about encryption, hosting location, retention, or
 *      security certifications until these have been verified." Nothing
 *      here makes any such claim.
 *   4. §6 — the actual RETENTION PERIODS, or the criteria for them.
 *   5. §8 — how to EXERCISE the listed rights, and how requests are
 *      handled.
 *   6. COOKIES AND ANALYTICS — the draft's §9 is entirely an instruction
 *      ("if the website uses cookies … the policy should explain what is
 *      collected"), so there was no copy to render and the section is
 *      absent. A finding for whoever writes it: the source contains no
 *      analytics, tag manager, advertising pixel or `document.cookie`
 *      usage today. That is not the same as the deployment having none —
 *      the host may set its own — so it needs confirming rather than
 *      assuming.
 *   7. INTERNATIONAL TRANSFERS — the draft's §10 is likewise entirely an
 *      instruction, and is absent for the same reason. The site takes
 *      enquiries from outside India and names a laboratory partner in
 *      Greece, so this one is not hypothetical.
 *   8. The EFFECTIVE DATE and LAST UPDATED date. None supplied, and a date
 *      on a policy is a legal fact rather than a formatting detail.
 *
 * ⚠️  THE CONDITIONAL VOICE IS AOHC'S OWN AND IS REPRODUCED VERBATIM.
 * "Information may be used…", "AOHC should implement…". It reads as a
 * description of intent rather than of practice, which is a question for
 * the reviewer, not something to fix by rewriting: changing "should" to
 * "does" would be this file asserting a fact about AOHC's systems that
 * nobody here can verify.
 */
export const privacyPolicy: LegalPageContent = {
  hero: {
    title: 'Privacy Policy',
    body: [
      'Art of Healing Cancer (AOHC) respects the privacy of individuals who visit our website or contact us.',
      'This Privacy Policy explains how personal information may be collected, used, stored, disclosed, and protected when you use our website or submit an enquiry.',
    ],
  },

  sections: [
    {
      title: 'Information We May Collect',
      body: ['Depending on the services you use, information may include:'],
      items: [
        'Contact details, such as your name, email address, and telephone number.',
        'Country of residence and preferred language.',
        'Information included in an enquiry.',
        'Medical information voluntarily provided for a consultation request.',
        'Website usage information collected through approved technologies.',
        'Communication preferences and consent records.',
      ],
      outro: [
        'Medical information is sensitive and should be collected only where necessary and through an appropriate process.',
      ],
    },
    {
      title: 'How Information May Be Used',
      body: ['Information may be used for purposes such as:'],
      items: [
        'Responding to enquiries.',
        'Assessing whether a consultation can be arranged.',
        'Coordinating requested services.',
        'Communicating with you about your enquiry.',
        'Protecting the security and integrity of our systems.',
        'Meeting applicable legal and regulatory obligations.',
      ],
    },
    {
      title: 'Medical Records and Sensitive Information',
      body: [
        'Medical records should be accessed only by authorized personnel who need the information for a legitimate purpose.',
        'Where consent is required, it should be obtained before information is shared with other healthcare providers or service partners, subject to applicable legal requirements.',
        'Patients should be informed about the purpose of any requested records and how those records will be handled.',
      ],
    },
    {
      title: 'Sharing Information',
      body: [
        'Information may be shared with authorized healthcare professionals, service providers, or other parties only where appropriate and permitted by applicable law.',
      ],
    },
    {
      title: 'Data Retention',
      body: [
        'Personal information should be retained only for as long as necessary for the stated purpose or as required by applicable law.',
      ],
    },
    {
      title: 'Security',
      body: [
        'AOHC should implement appropriate technical and organizational measures to protect personal information against unauthorized access, loss, alteration, or disclosure.',
        'No system can be guaranteed to be completely secure. Users should follow the approved process for sharing sensitive information.',
      ],
    },
    {
      title: 'Your Rights',
      body: [
        'Depending on the applicable law, you may have rights relating to access, correction, deletion, restriction, objection, portability, or withdrawal of consent.',
      ],
    },
    {
      /**
       * ⚠️  THE DRAFT'S CONTACT BLOCK IS THREE PLACEHOLDERS — privacy
       * email, legal entity, address. The email and the registered
       * address are real values from `site.ts`; the legal entity is not
       * recorded anywhere and is therefore not stated rather than
       * guessed at from the trading name.
       */
      title: 'Contact Us',
      body: [
        'For privacy-related questions or requests, contact AOHC at the address below.',
      ],
      items: [
        `Email: ${site.contact.email}`,
        `Registered address: ${site.contact.registeredAddress}`,
      ],
    },
    {
      title: 'Policy Updates',
      body: [
        'This policy may be updated to reflect changes in services, systems, or legal requirements.',
      ],
    },
  ],
}
