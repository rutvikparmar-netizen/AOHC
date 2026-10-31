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
 * ⚠️  THE LIST IS NOT IN THIS FILE. It is `home.network.items` — the ten
 * organisations in AOHC's care network, the same array the home page's
 * logo strip renders, shown here as a grid instead of a marquee.
 *
 * ⚠️  IT IS NOT `home.partners.items`, AND THAT WAS THE FIRST MISTAKE ON
 * THIS PAGE. Those three — CK Birla, RGCC, NABH — are affiliations and
 * accreditations, and AOHC corrected the page when it showed them here.
 * The two lists overlap and are not the same list.
 *
 * ⚠️  THE SUPPLIED COPY SAYS "HOSPITALS", AND THE LIST IS BROADER THAN
 * THAT. The ten include hospitals, a genetics laboratory, an imaging unit,
 * a hyperbaric-oxygen provider and a non-profit foundation. Not fixed
 * here, because the copy is AOHC's and reproduced as given, but whoever
 * reviews this page should see it: "partnering hospitals help Art of
 * Healing Cancer by providing cutting edge treatment" describes some of
 * them.
 *
 * The heading ends in a colon and promises a list, and the list is the
 * whole care network. More belong in `home.network.items`, where they
 * appear here and on the home page's strip at once.
 *
 * ⚠️  §7 OF THE DRAFT GOVERNS THIS PAGE MORE THAN ANY OTHER: "a referral
 * relationship must not be described as a formal partnership unless that
 * relationship exists". Nothing may be added to the network that AOHC has
 * not confirmed a relationship with — this page states, in a heading, that
 * every logo on it is a partner.
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
