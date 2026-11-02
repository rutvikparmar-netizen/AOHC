import type { ContactPageContent } from '@/types'

/**
 * CONTACT PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  THE CONTACT DETAILS ARE NOT IN THIS FILE, AND MUST NOT BE COPIED INTO
 * IT. The draft's "Contact Information" block is five placeholders —
 * "[Insert verified clinic or office address]", "[Insert verified contact
 * number]" and so on. Those are instructions to whoever fills the page in,
 * not copy, and a placeholder rendered on a live contact page is worse than
 * no page at all.
 *
 * The real values already exist in `src/lib/site.ts`, which is the single
 * source the footer, the home page's contact row and the `PostalAddress`
 * schema all read from. The page reads them from there, so an address
 * corrected once is corrected everywhere.
 *
 * ⚠️  THERE IS NO TELEPHONE NUMBER, AND THE PAGE OMITS THE ROW RATHER THAN
 * INVENTING ONE. `site.contact` carries no phone — see the note there,
 * where its absence is a decision rather than an oversight. The draft asks
 * for a phone line; until AOHC supplies one, a contact page with email,
 * WhatsApp, an address and opening hours is complete and honest, and a
 * fabricated number is the single worst thing this site could publish.
 *
 * ⚠️  THE PRIVACY REMINDER AND THE EMERGENCY NOTICE ARE THE POINT OF THE
 * PAGE, not its small print. One tells people not to put medical records,
 * ID or financial details into an ordinary contact message; the other says
 * these channels are not an emergency service. Both are addressed to
 * someone who is about to do the thing they warn against. Neither may be
 * shortened, folded into the intro, or moved below the form.
 */
export const contactPage: ContactPageContent = {
  hero: {
    title: 'We Are Here to Help You Understand the Next Steps',
    body: [
      'If you have questions about AOHC, the consultation process, medical-record requirements, or international patient enquiries, contact our team.',
      'We will explain the appropriate next steps based on the nature of your enquiry and the services available.',
    ],
  },

  /**
   * "Enquiry Categories" — what people write in about.
   *
   * ⚠️  THESE ARE NOT FORM OPTIONS AND THE PAGE DOES NOT RENDER THEM AS A
   * PICKER. The draft lists them as categories; turning them into a
   * required dropdown would make someone classify their own enquiry
   * before they are allowed to ask a question, which is exactly the
   * friction a contact page should not have. They are shown as a list of
   * what the team handles.
   */
  categories: {
    eyebrow: 'What people write in about',
    title: 'Enquiry Categories',
    items: [
      'General enquiry.',
      'New patient consultation.',
      'Existing patient follow-up.',
      'International patient enquiry.',
      'Medical-record submission assistance.',
      'Professional or clinical collaboration.',
      'Media or educational enquiry.',
    ],
  },

  privacy: {
    title: 'Privacy Reminder',
    body: [
      'Please do not include detailed medical records, identification documents, financial information, or other sensitive personal information in an ordinary contact message.',
      'If medical information is required, our team should direct you to the approved secure submission process.',
    ],
  },

  emergency: {
    title: 'Emergency Notice',
    body: 'AOHC’s general contact channels are not an emergency service. For urgent or life-threatening symptoms, seek immediate local medical care.',
  },

  /**
   * The enquiry form's own heading.
   *
   * ⚠️  WRITTEN, NOT SUPPLIED — the draft gives this page contact details
   * and categories but no form copy. These two lines name the control and
   * claim nothing else; the second says what the form is NOT for, which
   * is the only thing a reader needs to decide between this and the
   * consultation page. Replace with AOHC's wording when there is some.
   */
  form: {
    eyebrow: 'Send an enquiry',
    title: 'Write to the Team',
    intro:
      'For general questions. If you would like a clinical review of your diagnosis, use the consultation request instead.',
  },

  /**
   * ⚠️  THERE IS NO CLOSING PANEL ON THIS PAGE, AND THAT IS DELIBERATE.
   * It had one, borrowed from the consultation page's heading, back when
   * this page carried no form. Now that the form is here, a closing
   * panel sending the reader to a different form is a second action
   * competing with the one they are already looking at. The draft
   * supplies no closing copy for this page either, so its absence is
   * also the faithful reading.
   *
   * The route to the consultation page is kept as a sentence beside the
   * form, where it helps someone choose, rather than as a button under
   * it, where it competes.
   */
}
