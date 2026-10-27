import type { Slug } from '@/types'

/**
 * Every internal URL in one place, mirroring the AOHC main menu.
 *
 * ONLY `/` IS BUILT SO FAR — the rest resolve to 404 until each page is
 * written, which is expected during build-out rather than a bug.
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
  expertiseItem: (slug: Slug) => `/our-expertise/${slug}`,

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
