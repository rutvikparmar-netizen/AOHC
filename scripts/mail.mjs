#!/usr/bin/env node
/**
 * MAIL TOOL
 * ----------------------------------------------------------------------------
 *   npm run mail:check                 report which transport is configured
 *   npm run mail:send you@example.com  send a real test message
 *
 * WORTH RUNNING BEFORE LAUNCH, not after. Email on this site carries webinar
 * joining links and enquiry acknowledgements. A misconfigured transport does
 * not throw anywhere a visitor can see — the app is written to say "we could
 * not email you" and carry on — so a silent mail failure can run for weeks.
 * This is how you find out.
 */

import { readFile } from 'node:fs/promises'
import { createTransport } from 'nodemailer'

async function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    try {
      const contents = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
      for (const line of contents.split('\n')) {
        const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line)
        if (!match) continue
        const [, key, rawValue] = match
        if (process.env[key] !== undefined) continue
        process.env[key] = rawValue.replace(/^(['"])(.*)\1$/, '$2')
      }
    } catch {
      // Absent file is fine.
    }
  }
}

await loadEnv()

const smtpUrl = process.env.SMTP_URL
const resendKey = process.env.RESEND_API_KEY
const from = process.env.MAIL_FROM ?? '(MAIL_FROM not set)'

/** Hides the password in an SMTP URL before printing it. */
function redact(url) {
  try {
    const parsed = new URL(url)
    if (parsed.password) parsed.password = '***'
    return parsed.toString()
  } catch {
    return '(unparseable SMTP_URL)'
  }
}

async function check() {
  console.log('')

  if (!smtpUrl && !resendKey) {
    console.log('  ✗ No transport configured.')
    console.log('    Set SMTP_URL or RESEND_API_KEY in .env.local.')
    console.log('    Until then, messages are printed to the server console and')
    console.log('    every form tells the visitor no email was sent.\n')
    process.exit(1)
  }

  console.log(`  From: ${from}`)

  if (smtpUrl) {
    console.log(`  SMTP: ${redact(smtpUrl)}`)
    try {
      await createTransport(smtpUrl).verify()
      console.log('  ✓ SMTP server accepted the connection and credentials.\n')
    } catch (error) {
      console.log(`  ✗ SMTP verification failed: ${error.message}\n`)
      process.exit(1)
    }
    return
  }

  console.log('  Transport: Resend HTTP API')
  console.log(`  Key: ${resendKey.slice(0, 6)}…\n`)
  console.log('  (Resend is verified by sending — run: npm run mail:send you@example.com)\n')
}

async function send(to) {
  if (!to) {
    console.error('\n  ✗ Give a recipient: npm run mail:send you@example.com\n')
    process.exit(1)
  }

  const message = {
    from,
    to,
    subject: 'Art of Healing Cancer — mail test',
    text: [
      'This is a test message from the Art of Healing Cancer website.',
      '',
      'If you received it, enquiry acknowledgements and webinar joining links',
      'will reach patients.',
      '',
      `Sent: ${new Date().toISOString()}`,
    ].join('\n'),
  }

  if (smtpUrl) {
    await createTransport(smtpUrl).sendMail(message)
    console.log(`\n  ✓ Sent via SMTP to ${to}\n`)
    return
  }

  if (resendKey) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${resendKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: message.subject,
        text: message.text,
      }),
    })

    if (!response.ok) {
      console.error(`\n  ✗ Resend returned ${response.status}: ${await response.text()}\n`)
      process.exit(1)
    }

    console.log(`\n  ✓ Sent via Resend to ${to}\n`)
    return
  }

  console.error('\n  ✗ No transport configured. Run: npm run mail:check\n')
  process.exit(1)
}

const command = process.argv[2]

if (command === 'check') await check()
else if (command === 'send') await send(process.argv[3])
else {
  console.log(
    [
      '',
      '  Usage: node scripts/mail.mjs <command>',
      '',
      '    check              report which transport is configured and verify it',
      '    send <address>     send a real test message',
      '',
    ].join('\n'),
  )
  process.exit(1)
}
