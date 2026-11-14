/* Lists every English string the translated home page shows (home data,
   menus, form). Output feeds `src/i18n/source.ts`; see the note there.
   Run: npx tsx --tsconfig tsconfig.json scripts/i18n-extract.ts out.json */
import { writeFileSync } from 'node:fs'
import { home, contactRows } from '@/data/home'
import { reach } from '@/data/reach'
import { primaryNav, footerNav, legalNav } from '@/data/navigation'
import { APPOINTMENT_CTA, site } from '@/lib/site'

const RENDERED = ['hero', 'news', 'press', 'whoWeAre', 'stats', 'individual', 'approach', 'caseReview', 'international', 'process', 'whoWeServe', 'team', 'network', 'accreditations', 'partners', 'testimonials', 'complexJourney', 'faqs', 'contact', 'knowledge', 'closing'] as const
const SKIP_KEYS = new Set(['href', 'src', 'icon', 'slug', 'id', 'url', 'poster', 'video', 'image', 'logo', 'name', 'videoId', 'youtubeId', 'thumbnail', 'width', 'height'])
const out = new Set<string>()
const keep = (s: string) => s.length > 1 && !/^(\/|https?:|mailto:|tel:|#)/.test(s) && !/^[a-z0-9-]+$/.test(s) && !/\.(webp|png|jpe?g|svg|mp4|pdf)$/i.test(s) && !/^[\d\s.,+%×x-]+$/.test(s)
function walk(v: unknown, key = '') {
  if (typeof v === 'string') { if (!SKIP_KEYS.has(key) && keep(v)) out.add(v); return }
  if (Array.isArray(v)) { v.forEach((x) => walk(x, key)); return }
  if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (k === 'image' || k === 'thumbnail' || k === 'logo') walk((x as { alt?: string })?.alt ?? '', 'alt'); else walk(x, k)
}
for (const k of RENDERED) walk((home as unknown as Record<string, unknown>)[k])
walk(contactRows); walk(reach); walk(primaryNav); walk(footerNav); walk(legalNav)
walk([APPOINTMENT_CTA, site.contact.hours, site.tagline ?? '', site.description])
const manual = [
  // components
  'Connect to an Expert', 'Contact Us', 'Schedule a Free Meeting', 'Learn more', 'See the full team', 'Our doctors', 'Patient stories',
  'Not the question you had?', 'Read it', 'Registered address', 'GSTIN', 'Email the care team', 'Chat with us on WhatsApp', 'Main',
  'Not sure where you fit?', 'Tell us about the diagnosis and a member of our clinical team will help you work out the next step.',
  'These are individual experiences. No two patients have the same medical circumstances, and one person’s outcome cannot predict another’s. Each story is published with the patient’s permission.',
  'Open in Google Maps', 'Map showing the Art of Healing Cancer centre in Gurugram', 'Information on this site is general education, not medical advice.', 'Read the medical disclaimer',
  'A clinician with a tablet talking to two people across a table in a consulting area', 'Skip to main content', 'Language',
  // form
  'Your enquiry has been received', 'Your reference is', 'Please quote it if you write again.',
  'A confirmation has been emailed to you. If it has not arrived in a few minutes, please check your spam folder.',
  'Your enquiry is safely with the care team, but we could not send you a confirmation email. Please keep the reference above — it is the only copy.',
  'If things change before we reach you', 'Contact your treating hospital or your nearest emergency department. This mailbox is not monitored around the clock.',
  'Your enquiry was not sent', 'Full Name', 'Enter name', 'Email', 'Enter Email', 'Phone', 'required', 'optional', 'Country code', 'Phone number', 'Country', 'State', 'Enter State', 'City', 'Enter City',
  'How did you hear about us?', 'Message', 'What you have been told so far, and what you would like to know.', 'Verification: what is {a} + {b}?', 'Enter the answer',
  'I agree that Art of Healing Cancer may contact me about this enquiry, and may store the details I have given here in order to do so.', 'Schedule Meeting', 'Sending…',
  'Select country', 'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Australia', 'Canada', 'Nigeria', 'Kenya', 'Bangladesh', 'Nepal', 'Other',
  'Select an option', 'Google Search', 'Facebook Groups', 'Referred by a doctor', 'Friend or family', 'News article',
  'That answer was not right. Please try the sum again.', 'Please enter your full name.', 'Please enter an email address we can reply to.', 'Please enter a phone number we can reach you on.',
  'Please select your country.', 'Please tell us a little about what you need, so we can reply usefully.', 'Please keep this under 5,000 characters.', 'Please confirm we may contact you about this enquiry.',
  'Please check the highlighted fields.', 'Your enquiry has been received.', 'Something went wrong on our side and your message was not saved. Please try again, or email the care team directly.',
  'This form is not connected to a mailbox yet, so your message would not reach anyone. Please email the care team directly — the address is on this page. (Technical note for the site owner: set DATA_SOURCE=mongodb and MONGODB_URI.)',
]
manual.forEach((m) => out.add(m))
const list = [...out]
writeFileSync(process.argv[2]!, JSON.stringify(list, null, 1))
console.log(list.length, 'strings,', list.reduce((n, s) => n + s.length, 0), 'chars')
