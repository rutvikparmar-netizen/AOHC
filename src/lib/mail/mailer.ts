import { createTransport, type Transporter } from 'nodemailer'

/**
 * EMAIL DELIVERY
 * ----------------------------------------------------------------------------
 * SERVER ONLY.
 *
 * Three transports, chosen by whichever credentials the deployment has, in
 * this order:
 *
 *   1. SMTP_URL       — any SMTP server (Zoho, Gmail, Hostinger, SES, …)
 *   2. RESEND_API_KEY — Resend's HTTP API, no SMTP port needed
 *   3. none           — console transport, DEVELOPMENT ONLY
 *
 * THE CONSOLE TRANSPORT NEVER PRETENDS. It returns `delivered: false` and the
 * calling action says plainly that no email was sent. On this site that
 * honesty has teeth: a webinar confirmation carries the join link, so a
 * registration that silently fails to email leaves someone with a diary entry
 * and no way in.
 */

export interface MailMessage {
  to: string
  subject: string
  text: string
  html: string
  /** Set on acknowledgements so a patient's reply reaches the care team. */
  replyTo?: string
}

export interface MailResult {
  /** True only when a transport actually accepted the message. */
  delivered: boolean
  /** Which transport ran: `smtp`, `resend`, or `console`. */
  transport: 'smtp' | 'resend' | 'console'
  /** Present when delivery failed; logged, never shown to a user. */
  error?: string
}

const FROM =
  process.env.MAIL_FROM ?? 'Art of Healing Cancer <no-reply@artofhealingcancer.com>'

/**
 * Cached across hot reloads, for the same reason the Mongo client is: every
 * HMR cycle would otherwise open a fresh SMTP connection pool.
 */
declare global {
  var __mailTransport: Transporter | undefined
}

/** Adds query parameters to an SMTP URL without clobbering existing ones. */
function withDefaults(url: string, extra: Record<string, string>): string {
  try {
    const parsed = new URL(url)
    for (const [key, value] of Object.entries(extra)) {
      if (!parsed.searchParams.has(key)) parsed.searchParams.set(key, value)
    }
    return parsed.toString()
  } catch {
    // An unparseable URL is nodemailer's problem to report, not this
    // function's to swallow — hand it back untouched.
    return url
  }
}

function smtpTransport(url: string): Transporter {
  /**
   * Timeouts go in the URL's query string, not in a second argument.
   *
   * `createTransport(url, defaults)` takes MESSAGE defaults as its second
   * argument — from, subject and so on — not connection options. Putting
   * `connectionTimeout` there compiles under some type versions and is simply
   * ignored at runtime, which is the worst kind of wrong. Nodemailer does read
   * these from the URL, so they are appended here where they take effect.
   */
  globalThis.__mailTransport ??= createTransport(
    withDefaults(url, {
      // Someone is waiting at a keyboard. Fail fast rather than hang.
      connectionTimeout: '10000',
      greetingTimeout: '10000',
      socketTimeout: '15000',
    }),
  )
  return globalThis.__mailTransport
}

async function sendViaSmtp(url: string, message: MailMessage): Promise<MailResult> {
  await smtpTransport(url).sendMail({ from: FROM, ...message })
  return { delivered: true, transport: 'smtp' }
}

async function sendViaResend(key: string, message: MailMessage): Promise<MailResult> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [message.to],
      subject: message.subject,
      text: message.text,
      html: message.html,
      ...(message.replyTo ? { reply_to: message.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    throw new Error(`Resend returned ${response.status}`)
  }

  return { delivered: true, transport: 'resend' }
}

/**
 * Sends a message, or reports honestly that it could not.
 *
 * Never throws: a caller needs to distinguish "sent" from "not sent" and act
 * on it, not catch an exception and guess.
 */
export async function sendMail(message: MailMessage): Promise<MailResult> {
  const smtpUrl = process.env.SMTP_URL
  const resendKey = process.env.RESEND_API_KEY

  try {
    if (smtpUrl) return await sendViaSmtp(smtpUrl, message)
    if (resendKey) return await sendViaResend(resendKey, message)
  } catch (error) {
    /**
     * The error is logged for an operator and withheld from the user: an SMTP
     * failure message routinely contains the host, the username and sometimes
     * the credential that was rejected.
     */
    console.error('[mail] delivery failed', error)
    return {
      delivered: false,
      transport: smtpUrl ? 'smtp' : 'resend',
      error: error instanceof Error ? error.message : String(error),
    }
  }

  // No transport configured.
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      [
        '',
        '──────────────────────────────────────────────────────────────────',
        ' EMAIL NOT SENT — no SMTP_URL or RESEND_API_KEY configured.',
        ` to      : ${message.to}`,
        ` subject : ${message.subject}`,
        '',
        message.text,
        '──────────────────────────────────────────────────────────────────',
        '',
      ].join('\n'),
    )
  }

  return {
    delivered: false,
    transport: 'console',
    error: 'No mail transport configured',
  }
}

/** True when a real transport is configured. Drives the UI's honesty. */
export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_URL || process.env.RESEND_API_KEY)
}
