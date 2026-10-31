import type { PartneringInstitutionsContent } from '@/types'
import { routes } from '@/lib/routes'
import { APPOINTMENT_CTA } from '@/lib/site'

/**
 * PARTNERING INSTITUTIONS PAGE COPY
 * ----------------------------------------------------------------------------
 * Supplied in full and reproduced verbatim, for the same reason as the other
 * content files: the draft is pending clinical, operational, legal and
 * editorial review, and rewording it would mean reviewers signing off on text
 * the site does not actually show.
 *
 * ⚠️  THE LIST IS NOT IN THIS FILE. It is `home.partners.items`, which is
 * what the home page's affiliations section already renders. One list, two
 * views: duplicating three named organisations and their trademarks into a
 * second file is how the two copies start to disagree about who AOHC works
 * with, which is not a disagreement to have in public.
 *
 * ⚠️  TWO THINGS THE SUPPLIED COPY SAYS THAT THE DATA DOES NOT BEAR OUT.
 * Neither is fixed here, because the copy is AOHC's and reproduced as
 * given — but whoever reviews this page should see both:
 *
 *   1. IT SAYS "HOSPITALS", AND ONLY ONE OF THE THREE IS A HOSPITAL. CK
 *      Birla is a hospital; RGCC is a laboratory in Greece; the NABH entry
 *      is an accreditation network rather than a named institution at all.
 *      "Partnering hospitals help Art of Healing Cancer by providing
 *      cutting edge treatment" therefore describes one of the three.
 *
 *   2. THE HEADING ENDS IN A COLON AND PROMISES A LIST — "Some partnering
 *      Institutions for Art of Healing Cancer are:". Three entries follow
 *      it, which is the whole set the site has. If AOHC has more, they
 *      belong in `home.partners.items` and will appear here and on the
 *      home page at once.
 *
 * ⚠️  §7 OF THE DRAFT GOVERNS THIS PAGE MORE THAN ANY OTHER: "a referral
 * relationship must not be described as a formal partnership unless that
 * relationship exists". Each entry states its own relationship and they are
 * not synonyms. Nothing may be added here that AOHC has not confirmed.
 *
 * ⚠️  THE HERO TITLE IS THE SITE'S OWN EXISTING LABEL, NOT AN INVENTION.
 * "Partnering Institutions" is what the About Us menu and the footer have
 * called this page since before it existed. The draft supplies a lead-in
 * sentence rather than a page title, and that sentence is used as the
 * heading over the list, where its colon makes sense.
 */
export const partneringInstitutions: PartneringInstitutionsContent = {
  hero: {
    title: 'Partnering Institutions',
    body: [
      'Partnering hospitals help Art of Healing Cancer by providing cutting edge treatment for advanced cancers. By collaborating with these hospitals, we are able to offer our patients the latest and most effective treatments available. This partnership allows us to provide our patients with the best possible care, and helps us to continue our mission of helping those affected by cancer.',
    ],
    /**
     * ⚠️  NO HERO BACKGROUND. The other pages built on `PageHero` each carry
     * a frame commissioned for them; none was generated for this one, and
     * reusing another page's would undo the point of having one per page.
     */
  },

  /** The supplied lead-in, set over the list it introduces. */
  listTitle: 'Some partnering Institutions for Art of Healing Cancer are:',

  /**
   * ⚠️  THE CLOSING HEADING IS BORROWED, NOT WRITTEN. The draft supplies no
   * closing copy for this page, and every other page ends with the shared
   * panel. Rather than invent a line, this is `home.partners.title` —
   * AOHC's own heading for this exact content on the home page. It is
   * repeated here deliberately; replace it the moment there is a supplied
   * closing for this page, and do not write a new one in the meantime.
   */
  closing: {
    title: 'Where Your Care Takes Place',
    cta: { label: APPOINTMENT_CTA, href: routes.consultation },
  },
}
