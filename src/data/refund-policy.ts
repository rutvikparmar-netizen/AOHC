import type { LegalPageContent } from '@/types'

/**
 * CANCELLATION AND REFUND POLICY
 * ----------------------------------------------------------------------------
 * Migrated from
 * https://artofhealingcancer.com/cancellation-and-refund-policy/ and kept
 * at `/cancellation-and-refund-policy`. Transcribed verbatim.
 *
 * THE ROUTE ALREADY EXISTED AND WAS A 404. `routes.refunds` sits in the
 * footer's legal row on every page of this site, next to Privacy Policy
 * and Terms of Use, and went nowhere.
 *
 * ⚠️  TWO EDITING INSTRUCTIONS WERE PUBLISHED BY MISTAKE AND ARE NOT
 * REPRODUCED. The live page ends:
 *
 *     "Contact Us (add the link [https://artofhealingcancer.com/contact-us/)"
 *
 * — an unbalanced bracket and a note to whoever was building the page.
 * Section 4.1 has the same thing in gentler form: "contact our customer
 * service team at [https://artofhealingcancer.com/contact-us/]". Both are
 * rendered as what they were meant to be, a sentence pointing at the
 * contact page, which `LegalDocument` cannot linkify — so the path is
 * written out in words instead. Replace with real links if the component
 * ever grows inline markup.
 *
 * ⚠️  THIS IS A COMMERCIAL POLICY ON A CLINICAL SITE AND THE TWO DO NOT
 * QUITE MEET. It talks about "services", "clients" and "providers" in the
 * language of a booking business — "cancel a service before it begins",
 * "a prorated refund for the unused portion". Nothing in it says what
 * happens to money paid toward a treatment that is then found to be
 * clinically unsuitable, or to a deposit from an international patient
 * whose visa is refused, both of which are realistic. A reviewer should
 * decide whether consultations, treatment packages and international
 * arrangements are all covered by one 24-hour rule.
 *
 * ⚠️  NOT LEGALLY REVIEWED. Same standing as the privacy policy and the
 * terms of use. It is AOHC's own published text, which is not the same
 * as text a lawyer has signed off.
 *
 * ⚠️  NO EFFECTIVE DATE, as with the other two legal pages. A refund
 * policy without one cannot be shown to have applied on the day of a
 * disputed transaction.
 */
export const refundPolicy: LegalPageContent = {
  hero: {
    title: 'Cancellation and Refund Policy',
    body: [
      'At Art of Healing Cancer, we are committed to providing high-quality services to our clients. We understand that there may be circumstances where you need to cancel a service or request a refund.',
      'Please read our cancellation and refund policy carefully to understand your rights and how to proceed in such situations.',
    ],
  },

  sections: [
    {
      title: 'Service Cancellation',
      body: ['1.1. Cancellation by Client'],
      items: [
        'Before Service Commencement: You may cancel a service before it begins by contacting our customer service team. A full refund will be issued to your original payment method.',
        'After Service Commencement: If you wish to cancel a service after it has begun, you must notify us at least 24 hours in advance. In such cases, a prorated refund will be issued for the unused portion of the service. If less than 24 hours’ notice is given, a partial refund may be considered at our discretion.',
      ],
      outro: [
        '1.2. Cancellation by Art of Healing Cancer',
        'We reserve the right to cancel any service at our discretion if we are unable to fulfill it due to unforeseen circumstances (e.g., provider unavailability, emergency). In such cases, you will be notified promptly, and a full refund will be issued.',
      ],
    },

    {
      title: 'Refund Policy',
      body: ['2.1. Eligibility for Refunds'],
      items: [
        'Unsatisfactory Services: If you are not satisfied with the quality of our services, please contact us within 14 days of the service completion. We will work with you to resolve the issue and, if necessary, offer a partial or full refund based on the circumstances.',
        'Service Not Rendered: If a service you paid for was not rendered, you are entitled to a full refund.',
      ],
    },

    {
      title: 'Service Modification',
      body: [
        '3.1. Rescheduling Services',
        'If you need to reschedule a service, please contact us at least 24 hours in advance. We will do our best to accommodate your request without any additional charges. If less than 24 hours’ notice is given, rescheduling may be subject to a fee.',
      ],
    },

    {
      title: 'Refund Process',
      body: [
        '4.1. Initiating a Refund',
        'To initiate a refund, please contact our customer service team through the contact page at artofhealingcancer.com/contact-us with your service details and a brief description of the issue.',
        'Our team will review your request and provide a response within 7 business days.',
        '4.2. Processing Refunds',
        'If your refund request is approved, it will be processed, and a credit will be applied to your original payment method within 7-10 business days.',
      ],
    },

    {
      title: 'Contact Us',
      body: [
        'If you have any questions or concerns about our cancellation and refund policy, please contact us through the contact page at artofhealingcancer.com/contact-us.',
      ],
    },
  ],
}
