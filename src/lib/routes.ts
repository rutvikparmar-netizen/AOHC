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
  whoWeAre: '/who-we-are',
  doctors: '/our-doctors',
  doctor: (slug: Slug) => `/our-doctors/${slug}`,
  partners: '/about-us/partnering-institutions',
  accreditations: '/about-us/accreditations',
  rgcc: '/about-us/accreditations/rgcc',
  /**
   * Ruchika Jaiswal's story. The WordPress page, migrated at its own URL
   * (the content draft's planned `/about-us/in-loving-memory-of-ruchika-jaiswal`
   * was never a live URL, so nothing links to it from outside).
   */
  memorial: '/in-the-loving-memory',

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
  /* /videos, the WordPress URL (it has the search impressions);
     /knowledge/videos redirects to it. */
  videos: '/videos',
  /* `/blogs`, not `/knowledge/blogs`: Knowledge is a dropdown, not a
     parent section, and the WordPress posts already live under /blogs/. */
  blogs: '/blogs',
  blog: (slug: Slug) => `/blogs/${slug}`,
  documents: '/knowledge/documents',

  /* Tools ---------------------------------------------------------------
     Kept at the WordPress path so the indexed URL survives the migration. */
  fenbendazoleCalculator: '/blogs/fenbendazole-dosage-calculator',
  ivermectinCalculator: '/blogs/ivermectin-dosing-calculator',
  breastChemoCalculator: '/blogs/aohc-breast-cancer-chemotherapy-dosage-calculator',
  /** The WordPress category page that lists the three calculators. */
  dosingCalculators: '/blogs/category/dosing-calculator',

  /**
   * ⚠️  THE CONVERSION ROUTES ARE REAL PAGES NOW. They pointed at the home
   * page's enquiry form anchor — `/#appointment` — for as long as neither
   * page existed, on the reasoning that sending a patient to a 404 at the
   * one moment they decide to act is the worst failure on the site. Both
   * have shipped, so both are pointed at themselves.
   *
   * This moves EVERY CALL TO ACTION ON THE SITE, which is the point of
   * having them in one place. `consultation` and `internationalEnquiry`
   * are the "Request an Appointment" buttons; `contact` is the quieter
   * second action and the footer link.
   *
   * ⚠️  `/#appointment` STILL EXISTS and still works. The home page keeps
   * its own enquiry form, and anything already linking to that anchor —
   * an old email, a printed card — still lands on a working form.
   */
  contact: '/contact-us',

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
  consultation: '/request-a-consultation',
  /* The same page. International enquiries go through the same form; the
     separate name exists so it can be split later without hunting down
     every international CTA. */
  internationalEnquiry: '/request-a-consultation',

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
  article: (slug: Slug) => `/blogs/${slug}`,
} as const

/** True for hrefs that leave the site and must not use `next/link` routing. */
export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:|#)/.test(href)
}
