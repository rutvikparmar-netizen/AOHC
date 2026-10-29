import type { Slug } from '@/types'

/**
 * Every internal URL in one place, mirroring the AOHC main menu.
 *
 * MOST OF THESE ARE NOT BUILT YET — they resolve to 404 until each page is
 * written, which is expected during build-out rather than a bug. Built so
 * far: `home`, `about`, `doctors`, `cancerTypes`, `integrativeCare`,
 * `international` and `treatments`.
 *
 * ⚠️  `international` IS BUILT BUT ITS SEVEN CHILDREN ARE NOT — payments,
 * accommodation, sim, cashToCarry, sightseeing, airportPickup, medicalVisa.
 * The header renders them as a dropdown under the parent, and the parent
 * page deliberately does not link to them; see the note at the top of
 * `src/data/international-patients.ts`.
 *
 * Components link via `routes.doctor(slug)` rather than an inline template
 * string, so a routing change is one edit here instead of a grep.
 */
export const routes = {
  home: '/',

  /* About us ------------------------------------------------------------ */
  about: '/about-us',
  whoWeAre: '/about-us/who-we-are',
  doctors: '/about-us/our-doctors',
  doctor: (slug: Slug) => `/about-us/our-doctors/${slug}`,
  partners: '/about-us/partnering-institutions',
  accreditations: '/about-us/accreditations',
  rgcc: '/about-us/accreditations/rgcc',
  /** Ruchika Jaiswal's story — §8 of the content draft. */
  memorial: '/about-us/in-loving-memory-of-ruchika-jaiswal',

  media: '/media',

  /* International patients ---------------------------------------------- */
  international: '/international-patients',
  payments: '/international-patients/payments-and-invoices',
  accommodation: '/international-patients/accommodation',
  sim: '/international-patients/india-phone-sim',
  cashToCarry: '/international-patients/cash-to-carry',
  sightseeing: '/international-patients/local-sightseeing-and-shopping',
  airportPickup: '/international-patients/airport-pickup-and-local-travel',
  medicalVisa: '/international-patients/medical-visa-for-india',

  testimonials: '/testimonials',

  /* Knowledge ------------------------------------------------------------ */
  knowledge: '/knowledge',
  videos: '/knowledge/videos',
  blogs: '/knowledge/blogs',
  blog: (slug: Slug) => `/knowledge/blogs/${slug}`,
  documents: '/knowledge/documents',

  /**
   * CONVERSION ROUTES POINT AT THE HOME PAGE'S ENQUIRY FORM for now.
   *
   * `/contact-us` and `/request-an-appointment` are not built, and every CTA
   * on the site leads here — sending a patient to a 404 at the one moment
   * they decide to act is the worst failure on the page. Swap these back to
   * the real paths when those pages ship.
   */
  contact: '/#appointment',

  /* Our expertise --------------------------------------------------------
     The mega menu's forty-odd entries all hang off this one base, so the
     whole section can be re-rooted from here if it moves. None of these
     pages exists yet — see the note at the top of this file. */
  expertise: '/our-expertise',
  /**
   * ⚠️  FLAT, NOT NESTED UNDER `/our-expertise`, on request. "Treatment"
   * is `/treatment`, not `/our-expertise/treatment`. Only the menu's own
   * landing page keeps the `/our-expertise` path.
   *
   * ⚠️  THIS PUTS ~44 SLUGS IN THE ROOT NAMESPACE, which is the cost of
   * the change and the thing to check before adding any new top-level
   * page. `treatment`, `diagnosis`, `research`, `imaging`, `surgery` and
   * `leukemia` are now reserved; a future `/treatment` that means
   * something else would silently collide. Nothing collides today — the
   * nearest misses are `integrative-oncology` against
   * `/integrative-cancer-care` and `treatment` against
   * `/treatments-and-therapies` and `/treatment-costs`, all distinct.
   *
   * Reverting is this one line. Every link in the mega menu, the mobile
   * drawer and the footer is built from it, which is why it is a function
   * here rather than forty template strings.
   */
  expertiseItem: (slug: Slug) => `/${slug}`,

  /* Clinical content ----------------------------------------------------- */
  integrativeCare: '/integrative-cancer-care',
  cancerTypes: '/cancer-types',
  cancerType: (slug: Slug) => `/cancer-types/${slug}`,
  treatments: '/treatments-and-therapies',
  treatment: (slug: Slug) => `/treatments-and-therapies/${slug}`,
  patientJourney: '/patient-journey',
  costs: '/treatment-costs',
  faqs: '/faqs',

  /* Conversion ----------------------------------------------------------- */
  consultation: '/#appointment',
  internationalEnquiry: '/#appointment',

  /* Legal ---------------------------------------------------------------- */
  privacy: '/privacy-policy',
  terms: '/terms-of-use',
  disclaimer: '/medical-disclaimer',
  refunds: '/cancellation-and-refund-policy',

  /* Admin console. Linked from nowhere on the public site, by design. */
  admin: '/admin',
  adminLogin: '/admin/login',
  adminLeads: '/admin/leads',
  adminLead: (id: string) => `/admin/leads/${id}`,
  adminRegistrations: '/admin/registrations',

  /** Kept so the dormant webinar modules still compile. Nothing links here. */
  webinars: '/webinars',
  webinar: (slug: Slug) => `/webinars/${slug}`,
  stories: '/testimonials',
  story: (slug: Slug) => `/testimonials/${slug}`,
  resources: '/knowledge',
  article: (slug: Slug) => `/knowledge/blogs/${slug}`,
} as const

/** True for hrefs that leave the site and must not use `next/link` routing. */
export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:|#)/.test(href)
}
