/**
 * Site-wide constants.
 *
 * Values here come from the AOHC Website Content Master Draft. Anything the
 * draft marks `[Insert verified …]` is left BLANK rather than guessed — see
 * the note on `contact` below.
 */

export interface SiteContact {
  email: string
  /** Digits only, country code first. There is deliberately no `phone`. */
  whatsapp: string
  /** Where patients are seen. This is the one to show on a map. */
  address: string
  /** The company's registered office — a legal address, not a clinic. */
  registeredAddress: string
  /** Operating hours. */
  hours: string
  /** Indian GST identification number, shown in the footer. */
  gstin: string
  /** Google Maps embed URL for the centre. */
  mapEmbedUrl: string
}

export interface SiteSocial {
  facebook: string
  instagram: string
  youtube: string
  linkedin: string
  x: string
}

/**
 * AOHC's public Google rating.
 *
 * ⚠️  NOTHING RENDERS THIS ANY MORE. The hero badge that used it was replaced
 * on request: it showed "4.9" with `count: null` and `url: ''`, which is a
 * score with no number of reviews behind it and no link to check it against.
 * The config is kept because the figures are real and may be wanted
 * elsewhere, but a rating nobody can verify should not go back on the page
 * until `count` and `url` are filled in from the Google Business Profile.
 *
 * ⚠️  COPY THESE FROM AOHC'S GOOGLE BUSINESS PROFILE — NEVER ESTIMATE THEM.
 * A star rating is a claim about what real patients said; on a cancer
 * clinic's home page an invented one is misleading advertising.
 */
export interface SiteReviews {
  /** e.g. 4.8 — out of 5. */
  rating: number | null
  /** Total number of Google reviews. */
  count: number | null
  /** The Google Maps reviews link the badge opens. */
  url: string
}

export interface SiteConfig {
  name: string
  shortName: string
  url: string
  title: string
  description: string
  tagline: string
  locale: string
  contact: SiteContact
  announcement: string
  social: SiteSocial
  reviews: SiteReviews
}

export const site: SiteConfig = {
  name: 'Art of Healing Cancer',
  shortName: 'AOHC',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://artofhealingcancer.com',

  /* SEO metadata, taken verbatim from section D of the content draft. */
  title: 'Art of Healing Cancer | Personalized Integrative Cancer Care',
  description:
    "Learn about AOHC's personalized approach to cancer care, including clinical information review, conventional oncology, and appropriate integrative support.",

  /** The draft's recommended positioning line, shortened for the logo lockup. */
  tagline: 'Personalized, integrative cancer care',
  locale: 'en_IN',

  /**
   * Taken from the live site's contact block, not from the content draft —
   * the draft marks all of these `[Insert verified …]`, and these are the
   * values artofhealingcancer.com actually publishes today.
   *
   * THREE CONTACT ROUTES, BY DESIGN: email, WhatsApp and the enquiry form.
   * See the note on the WhatsApp number below for why there is no telephone
   * field at all.
   */
  contact: {
    email: 'AOHC@getintouch.zohodesk.in',
    /**
     * THERE IS NO TELEPHONE LINE, AND THAT IS A DECISION — NOT A GAP.
     *
     * AOHC takes enquiries by email, WhatsApp and the enquiry form only. The
     * `phone` field and the `telHref` helper were removed outright rather
     * than left blank, because an empty string reads as "still to come" and
     * invites someone to fill it in; every call button, the `tel:` helper and
     * the schema.org `telephone` property went with it.
     *
     * If a number is ever published, add it back deliberately — do not infer
     * one from the WhatsApp number below. A WhatsApp line is not a line
     * anybody answers by voice.
     */
    whatsapp: '919056330977',
    /**
     * ⚠️  SUPPLIED VERBATIM, INCLUDING THE CAPITALS. AOHC gave this exact
     * string; the capitalised portion is how the address reads on the
     * official record. It is not a mistake to tidy away — ask before
     * title-casing it.
     *
     * ⚠️  THE HOST FACILITY IS NO LONGER NAMED HERE. The previous version
     * began "Art of Healing Cancer — HCAH Transition Care Centre, …". The
     * building and the postcode are unchanged; only the label went. One
     * place still names HCAH: the "where does treatment take place" answer
     * in `home.faqs`, which is prose rather than a label and was left for a
     * reviewer to decide on.
     *
     * This one string is the single source for the footer, the home page's
     * contact row and the schema.org `PostalAddress`. Edit it here, nowhere
     * else.
     */
    address:
      'Art of Healing Cancer - PLOT NUMBER 219P, 226, SECTOR-51, URBAN ESTATE GURGAON, Gurgaon, Haryana, 122413',
    registeredAddress: '1421, Sector 34 C, Chandigarh 160022',
    hours: 'Mon–Sat: 10 AM – 6 PM | Sunday by appointment',
    gstin: '06ABVFA1555E1ZF',
    /**
     * Supplied as coordinates rather than a place name — 28°26'00.6"N
     * 77°03'51.6"E. A coordinate embed cannot drift if the listing is
     * renamed, which a `q=` place search can.
     */
    mapEmbedUrl:
      'https://maps.google.com/maps?q=28%C2%B026%2700.6%22N%2077%C2%B003%2751.6%22E&t=m&z=15&output=embed&iwloc=near',
  },

  announcement: '',

  /* Fill in from Google — see the note on `SiteReviews`. */
  reviews: {
    rating: 4.9,
    count: null,
    url: '',
  },

  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    x: '',
  },
}

/** Absolute URL builder for canonicals, Open Graph and the sitemap. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url).toString()
}

/**
 * The label on every button that asks a reader to get in touch.
 *
 * ⚠️  ONE CONSTANT BECAUSE THE SITE HAD SEVEN DIFFERENT WORDINGS FOR THE
 * SAME ACTION: "Request a Consultation", "Request an Appointment", "Book
 * Appointment", "Contact AOHC", "Contact Our Team", "Ask About Your Cancer
 * Type" and "International Patient Enquiry" — all of them pointing at the
 * same anchor, scattered across nine data files and four components. A
 * reader crossing three pages met three different names for one thing.
 *
 * Importing it is what keeps a new page from inventing an eighth. Change
 * the wording here and it changes on the header, the footer, the mobile
 * bar, the drawer, the hero and the foot of every page at once.
 *
 * THE ONE EXCEPTION IS A SECONDARY BUTTON BESIDE A PRIMARY. `ClosingPanel`
 * on the home and about pages renders two actions side by side; both would
 * read "Request an Appointment", which is not consistency but a stutter.
 * Those keep "Contact AOHC" and "Contact Our Team" — the quieter of the
 * pair, and a different register.
 */
export const APPOINTMENT_CTA = 'Request an Appointment'

/**
 * The medical disclaimer, quoted from section 16C of the content draft.
 *
 * Centralised because it must be identical everywhere it appears and must
 * never be quietly dropped from a page that needs it.
 */
export const MEDICAL_DISCLAIMER =
  'The content on this website is provided for general educational and informational purposes. It is not intended to diagnose, treat, cure, or prevent any disease and does not replace professional medical advice. Cancer-care decisions should be made in consultation with appropriately qualified healthcare professionals who understand the patient’s clinical circumstances.'

/** The safety-netting line. Shown with the disclaimer, never on its own. */
export const EMERGENCY_NOTICE =
  'Do not stop, delay, or change prescribed treatment based solely on information on this website. If you experience severe or rapidly worsening symptoms, seek urgent local medical care — AOHC’s contact channels are not an emergency service.'
