import { site } from './site'

/**
 * Formatting helpers.
 *
 * EVERY FUNCTION HERE IS DETERMINISTIC AND LOCALE-PINNED. A server render and
 * the client hydration that follows must produce byte-identical strings, and
 * `toLocaleDateString()` with no locale argument does not: it reads the host's
 * default, which differs between the server and the visitor's browser and
 * throws a hydration mismatch.
 */

const DATE_LOCALE = 'en-IN'

/** `14 February 2026`. */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(DATE_LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(date)
}

/** `Sat, 22 Aug 2026`. */
export function formatDateShort(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(DATE_LOCALE, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(date)
}

/**
 * `Saturday, 22 August 2026 at 7:30 pm IST`.
 *
 * PINNED TO IST, DELIBERATELY. Webinar instants are stored in UTC, and the
 * audience is overwhelmingly in India. Rendering in the viewer's own zone
 * would be friendlier in the abstract and wrong in practice: it cannot be done
 * on the server, so the time would either flash and change on hydration or
 * have to be a client component. One stated zone, labelled, is unambiguous.
 */
export function formatWebinarTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''

  const formatted = new Intl.DateTimeFormat(DATE_LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(date)

  return `${formatted} IST`
}

/** `7:30 pm IST`. */
export function formatTimeOnly(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const formatted = new Intl.DateTimeFormat(DATE_LOCALE, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(date)
  return `${formatted} IST`
}

/** `90 minutes`, from two instants. */
export function formatDuration(startIso: string, endIso: string): string {
  const start = new Date(startIso).getTime()
  const end = new Date(endIso).getTime()
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return ''

  const minutes = Math.round((end - start) / 60_000)
  if (minutes < 60) return `${minutes} minutes`

  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  const hourPart = `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  return rest ? `${hourPart} ${rest} minutes` : hourPart
}

/** `5 min read`. */
export function formatReadingTime(minutes: number): string {
  return `${Math.max(1, Math.round(minutes))} min read`
}

/** `18 years` — omitted entirely when the figure is unknown. */
export function formatExperience(years?: number): string {
  if (!years || years <= 0) return ''
  return `${years} ${years === 1 ? 'year' : 'years'}`
}

/** `Dr. Abhishek Bansal`, from the prefix and name. */
export function formatDoctorName(prefix: string, name: string): string {
  return prefix ? `${prefix} ${name}` : name
}

/** Human label for a treatment category. */
export function formatCategory(category: string): string {
  const labels: Record<string, string> = {
    'interventional-oncology': 'Interventional oncology',
    'systemic-therapy': 'Systemic therapy',
    'radiation-therapy': 'Radiation therapy',
    'supportive-care': 'Supportive care',
    diagnostics: 'Diagnostics',
  }
  return labels[category] ?? category
}

/**
 * A wa.me link for the configured WhatsApp number.
 *
 * `wa.me` rather than the longer `api.whatsapp.com/send?...` form: both
 * resolve to the same chat, and the short one opens the installed app on a
 * phone instead of bouncing through the web client first.
 *
 * There is no `telHref` counterpart — AOHC publishes no telephone line. See
 * the note in `src/lib/site.ts`.
 */
export function whatsappHref(message?: string): string {
  const number = site.contact.whatsapp.replace(/[^\d]/g, '')
  if (!number) return ''
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${query}`
}

/**
 * Splits stored long-form text into paragraphs.
 *
 * Bodies are plain text with blank lines between paragraphs, so they render as
 * a list of `<p>` elements — never through `dangerouslySetInnerHTML`. Nothing
 * in the content can inject markup, which matters because this content will
 * eventually be edited through the admin console.
 */
export function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
