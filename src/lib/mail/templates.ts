import type { Enquiry, Webinar, WebinarRegistration } from '@/types'
import { formatWebinarTime } from '@/lib/format'
import { absoluteUrl, site } from '@/lib/site'
import { routes } from '@/lib/routes'
import type { MailMessage } from './mailer'

/**
 * EMAIL TEMPLATES
 * ----------------------------------------------------------------------------
 * Every message is built as BOTH text and HTML. The text part is not a
 * courtesy: a message with no text alternative scores worse with spam filters,
 * and a confirmation that lands in spam is a confirmation that did not arrive.
 *
 * TONE. These go to people who have just been diagnosed, or to their families.
 * No marketing language, no urgency, no exclamation marks. State what will
 * happen and when.
 *
 * NO CLINICAL CONTENT AND NO DIAGNOSIS IS EVER QUOTED BACK. An acknowledgement
 * is forwarded, printed and read on shared screens; repeating what someone
 * wrote about their cancer into a channel they do not control is a disclosure
 * they did not ask for. The reference number is enough to find the enquiry.
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Shared shell. Inline styles only — email clients discard <style> blocks. */
function layout(heading: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;background:#f4f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#33383a;line-height:1.6">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #dfeaec">
    <tr>
      <td style="padding:28px 32px 8px">
        <p style="margin:0 0 20px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#0b8291;font-weight:700">${escapeHtml(site.name)}</p>
        <h1 style="margin:0 0 16px;font-size:21px;line-height:1.3;color:#0b3a43">${escapeHtml(heading)}</h1>
      </td>
    </tr>
    <tr><td style="padding:0 32px 28px">${bodyHtml}</td></tr>
    <tr>
      <td style="padding:18px 32px 24px;border-top:1px solid #dfeaec;background:#f4f9fa">
        <p style="margin:0;font-size:12px;color:#67716f">
          ${escapeHtml(site.name)} · <a href="${site.url}" style="color:#0b8291">${escapeHtml(site.url.replace(/^https?:\/\//, ''))}</a><br>
          This email is patient education and correspondence, not medical advice.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

const p = (text: string) =>
  `<p style="margin:0 0 14px;font-size:15px;color:#33383a">${text}</p>`

/* ==========================================================================
   ENQUIRIES
   ========================================================================== */

/** Acknowledgement to the person who wrote in. */
export function enquiryAcknowledgement(enquiry: Enquiry): MailMessage {
  const firstName = enquiry.name.split(' ')[0] ?? enquiry.name

  const lines = [
    `Dear ${firstName},`,
    '',
    'We have received your enquiry and a member of the care team will be in touch.',
    '',
    `Your reference is ${enquiry.reference}. Please quote it if you call or write again.`,
    '',
    'If your situation changes or becomes urgent, please contact your treating hospital or your nearest emergency department — this mailbox is not monitored around the clock.',
    '',
    `— ${site.name}`,
  ]

  /* WhatsApp, not a phone number — there is no telephone line. The plain
     https link is deliberate: an email client should not be asked to render
     anything clever, and the recipient may be reading on a desktop where
     wa.me opens the web client. */
  const contactLine = site.contact.whatsapp
    ? p(
        `You can also reach us on WhatsApp at <a href="https://wa.me/${escapeHtml(
          site.contact.whatsapp.replace(/[^\d]/g, ''),
        )}">+${escapeHtml(site.contact.whatsapp.replace(/[^\d]/g, ''))}</a>.`,
      )
    : ''

  return {
    to: enquiry.email,
    subject: `We have your enquiry — ${enquiry.reference}`,
    text: lines.join('\n'),
    html: layout(
      'We have your enquiry',
      [
        p(`Dear ${escapeHtml(firstName)},`),
        p('We have received your enquiry and a member of the care team will be in touch.'),
        p(
          `Your reference is <strong style="color:#0b3a43">${escapeHtml(enquiry.reference)}</strong>. Please quote it if you call or write again.`,
        ),
        contactLine,
        /**
         * The safety-netting sentence.
         *
         * Required on every acknowledgement. Someone who has just described a
         * worrying symptom to a website may otherwise wait for this mailbox
         * instead of seeking care.
         */
        p(
          '<strong>If your situation changes or becomes urgent</strong>, please contact your treating hospital or your nearest emergency department. This mailbox is not monitored around the clock.',
        ),
      ].join(''),
    ),
  }
}

/** Internal notification to the care team. */
export function enquiryNotification(enquiry: Enquiry, to: string): MailMessage {
  const rows: Array<[string, string]> = [
    ['Reference', enquiry.reference],
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone],
    /* `relation` and `diagnosis` are no longer asked for, but older stored
       enquiries still carry them — so both are rendered when present rather
       than dropped from the notification. */
    ['Writing as', enquiry.relation ?? '—'],
    ['City', enquiry.city ?? '—'],
    ['State', enquiry.state ?? '—'],
    ['Country', enquiry.country ?? '—'],
    ['Heard about us via', enquiry.heardFrom ?? '—'],
    ['Diagnosis given', enquiry.diagnosis ?? '—'],
    ['Treatment page', enquiry.treatmentSlug ?? '—'],
    ['Source', enquiry.source],
  ]

  const text = [
    `New enquiry — ${enquiry.reference}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    enquiry.message,
    '',
    `Open in the console: ${absoluteUrl(routes.adminLead(enquiry.id))}`,
  ].join('\n')

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:5px 12px 5px 0;font-size:13px;color:#67716f;vertical-align:top">${escapeHtml(label)}</td><td style="padding:5px 0;font-size:14px;color:#33383a">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  return {
    to,
    // The patient's address, so a reply goes straight back to them.
    replyTo: enquiry.email,
    subject: `New enquiry — ${enquiry.name} (${enquiry.reference})`,
    text,
    html: layout(
      'New patient enquiry',
      [
        `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px">${tableRows}</table>`,
        `<div style="padding:14px 16px;background:#f4f9fa;border-left:3px solid #0e9caf;border-radius:4px;margin:0 0 18px"><p style="margin:0;font-size:15px;white-space:pre-wrap">${escapeHtml(enquiry.message)}</p></div>`,
        p(
          `<a href="${absoluteUrl(routes.adminLead(enquiry.id))}" style="color:#0b8291;font-weight:600">Open in the console</a>`,
        ),
      ].join(''),
    ),
  }
}

/* ==========================================================================
   WEBINAR REGISTRATION
   ========================================================================== */

/**
 * Builds an "Add to Google Calendar" link.
 *
 * The calendar entry deliberately carries the webinar PAGE as its location,
 * not the join link — a calendar entry is routinely shared with family and
 * synced to third-party apps.
 */
function googleCalendarUrl(webinar: Webinar): string {
  const stamp = (iso: string) => iso.replace(/[-:]|\.\d{3}/g, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: webinar.title,
    dates: `${stamp(webinar.startsAt)}/${stamp(webinar.endsAt)}`,
    details: `${webinar.summary}\n\n${absoluteUrl(routes.webinar(webinar.slug))}`,
    location: `Online — ${webinar.platform}`,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function registrationConfirmation(
  registration: WebinarRegistration,
  webinar: Webinar,
): MailMessage {
  const firstName = registration.name.split(' ')[0] ?? registration.name
  const when = formatWebinarTime(webinar.startsAt)
  const joinUrl = process.env.WEBINAR_JOIN_URL ?? ''

  const text = [
    `Dear ${firstName},`,
    '',
    `You are registered for "${webinar.title}".`,
    '',
    `When: ${when}`,
    `Where: Online — ${webinar.platform}`,
    joinUrl ? `Join link: ${joinUrl}` : 'The join link will be emailed before the session.',
    '',
    `Reference: ${registration.reference}`,
    '',
    `Add to your calendar: ${googleCalendarUrl(webinar)}`,
    '',
    'The session is educational. It is not a consultation, and the speakers cannot comment on an individual case during it.',
    '',
    `— ${site.name}`,
  ].join('\n')

  return {
    to: registration.email,
    subject: `You are registered — ${webinar.title}`,
    text,
    html: layout(
      'You are registered',
      [
        p(`Dear ${escapeHtml(firstName)},`),
        p(`You are registered for <strong>${escapeHtml(webinar.title)}</strong>.`),
        `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px">
           <tr><td style="padding:5px 12px 5px 0;font-size:13px;color:#67716f">When</td><td style="padding:5px 0;font-size:15px;color:#0b3a43;font-weight:600">${escapeHtml(when)}</td></tr>
           <tr><td style="padding:5px 12px 5px 0;font-size:13px;color:#67716f">Where</td><td style="padding:5px 0;font-size:15px">Online — ${escapeHtml(webinar.platform)}</td></tr>
           <tr><td style="padding:5px 12px 5px 0;font-size:13px;color:#67716f">Reference</td><td style="padding:5px 0;font-size:15px">${escapeHtml(registration.reference)}</td></tr>
         </table>`,
        joinUrl
          ? `<p style="margin:0 0 18px"><a href="${escapeHtml(joinUrl)}" style="display:inline-block;padding:12px 22px;background:#0e9caf;color:#ffffff;border-radius:10px;font-weight:700;text-decoration:none">Join the session</a></p>`
          : p('The join link will be emailed to you before the session.'),
        p(
          `<a href="${escapeHtml(googleCalendarUrl(webinar))}" style="color:#0b8291;font-weight:600">Add to Google Calendar</a>`,
        ),
        /**
         * Stated in the confirmation, not only on the page.
         *
         * People register expecting their own case to be discussed. Saying so
         * now prevents someone waiting for personal advice that will not come.
         */
        p(
          'The session is educational. It is not a consultation, and the speakers cannot comment on an individual case during it.',
        ),
      ].join(''),
    ),
  }
}
