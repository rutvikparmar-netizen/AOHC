import type { NavGroup, NavLink } from '@/types'
import { routes } from '@/lib/routes'

/**
 * SITE NAVIGATION — the AOHC main menu, exactly as supplied.
 *
 * Four of the seven top-level items carry children, so the header renders a
 * dropdown for those and a plain link for the rest. `description` is used as
 * the second line inside a dropdown; items without one render as a single
 * line, which keeps the International Patients menu compact at seven entries.
 *
 * Every target except `/` is unbuilt and will 404 until written.
 */

export const primaryNav: NavGroup[] = [
  { label: 'Home', href: routes.home, links: [] },
  {
    label: 'About Us',
    href: routes.about,
    links: [
      {
        label: 'Who We Are',
        href: routes.whoWeAre,
        description: 'Our purpose, story and commitment',
      },
      {
        label: 'Our Doctors',
        href: routes.doctors,
        description: 'The specialists behind your care',
      },
      {
        label: 'Partnering Institutions',
        href: routes.partners,
        description: 'Hospitals and clinics we work with',
      },
      {
        label: 'Accreditations',
        href: routes.accreditations,
        description: 'Certifications and global affiliations',
      },
      { label: 'RGCC', href: routes.rgcc, description: 'Our Greece laboratory partner' },
    ],
  },
  { label: 'Media', href: routes.media, links: [] },
  {
    label: 'International Patients',
    href: routes.international,
    links: [
      { label: 'Payments and Invoices', href: routes.payments },
      { label: 'Accommodation', href: routes.accommodation },
      { label: 'India Phone SIM', href: routes.sim },
      { label: 'Cash to Carry', href: routes.cashToCarry },
      { label: 'Local Sightseeing & Shopping', href: routes.sightseeing },
      { label: 'Airport Pickup and Local Travel', href: routes.airportPickup },
      { label: 'Medical Visa for India', href: routes.medicalVisa },
    ],
  },
  { label: 'Testimonials', href: routes.testimonials, links: [] },
  {
    label: 'Knowledge',
    href: routes.knowledge,
    links: [
      { label: 'Videos', href: routes.videos, description: 'Patient stories and explainers' },
      { label: 'Blogs', href: routes.blogs, description: 'Articles from the care team' },
      { label: 'Documents', href: routes.documents, description: 'Guides and downloads' },
    ],
  },
  { label: 'Contact Us', href: routes.contact, links: [] },
]

/** Footer columns. */
export const footerNav: NavGroup[] = [
  {
    label: 'About Us',
    links: [
      { label: 'Who We Are', href: routes.whoWeAre },
      { label: 'Our Doctors', href: routes.doctors },
      { label: 'Partnering Institutions', href: routes.partners },
      { label: 'Accreditations', href: routes.accreditations },
      { label: 'In Loving Memory of Ruchika Jaiswal', href: routes.memorial },
    ],
  },
  {
    label: 'International Patients',
    links: [
      { label: 'Medical Visa for India', href: routes.medicalVisa },
      { label: 'Airport Pickup and Local Travel', href: routes.airportPickup },
      { label: 'Accommodation', href: routes.accommodation },
      { label: 'Payments and Invoices', href: routes.payments },
      { label: 'India Phone SIM', href: routes.sim },
    ],
  },
  {
    label: 'Knowledge',
    links: [
      { label: 'Videos', href: routes.videos },
      { label: 'Blogs', href: routes.blogs },
      { label: 'Documents', href: routes.documents },
      { label: 'Testimonials', href: routes.testimonials },
      { label: 'Media', href: routes.media },
    ],
  },
]

/** Footer small print. */
export const legalNav: NavLink[] = [
  { label: 'Privacy Policy', href: routes.privacy },
  { label: 'Cancellation and Refund Policy', href: routes.refunds },
  { label: 'Terms of Use', href: routes.terms },
  { label: 'Medical Disclaimer', href: routes.disclaimer },
]
