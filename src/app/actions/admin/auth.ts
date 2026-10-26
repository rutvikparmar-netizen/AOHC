'use server'

import { redirect } from 'next/navigation'
import {
  endAdminSession,
  isAdminConfigured,
  startAdminSession,
  verifyAdminCredentials,
} from '@/lib/admin/session'
import {
  RATE_LIMITS,
  callerIp,
  consumeRateLimit,
  describeRetry,
} from '@/lib/auth/rate-limit'
import { isDatabaseConfigured } from '@/lib/db/mongo'
import type { AdminLoginState } from '@/lib/forms/state'

/**
 * ADMIN SIGN-IN
 * ----------------------------------------------------------------------------
 * The password in `ADMIN_PASSWORD` is the only thing between the internet and
 * every patient enquiry in the database, so this action is written to be
 * boring and tight.
 *
 * RATE LIMITED BEFORE THE PASSWORD IS CHECKED. The limit is per network and it
 * is what makes guessing impractical — there is no second factor. It is
 * consumed on every attempt, including the ones that fail, so a script cannot
 * spend an unlimited budget on wrong passwords.
 *
 * ONE ERROR MESSAGE FOR EVERY FAILURE. Wrong email, wrong password, unknown
 * email: all return the same sentence. Distinguishing them would turn this
 * form into an oracle for which address is the administrator's.
 */

export async function signInAdmin(
  _previous: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const email = (formData.get('email') ?? '').toString().trim()
  const password = (formData.get('password') ?? '').toString()

  if (!isDatabaseConfigured()) {
    return {
      status: 'error',
      email,
      message:
        'The console needs a database to store sessions. Set DATA_SOURCE=mongodb and MONGODB_URI, then try again.',
    }
  }

  if (!isAdminConfigured()) {
    /**
     * Locked, not open.
     *
     * With `ADMIN_EMAIL`/`ADMIN_PASSWORD` unset — or a password under ten
     * characters — every sign-in is refused. A deploy that forgot the
     * variables must not leave the console reachable.
     */
    return {
      status: 'error',
      email,
      message:
        'Console sign-in is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 10 characters) in the environment.',
    }
  }

  const ip = await callerIp()
  const limit = await consumeRateLimit(`admin:login:${ip}`, RATE_LIMITS.adminLoginIp)

  if (!limit.allowed) {
    return {
      status: 'error',
      email,
      message: `Too many sign-in attempts. Try again ${describeRetry(limit.retryAfter)}.`,
    }
  }

  if (!verifyAdminCredentials(email, password)) {
    // Logged without the password, and without saying which field was wrong.
    console.warn('[admin] failed sign-in attempt', { ip })
    return {
      status: 'error',
      email,
      message: 'Those details were not recognised.',
    }
  }

  await startAdminSession()

  /**
   * `redirect()` throws, so it must be the last statement and must be outside
   * any try/catch — a surrounding catch would swallow the control-flow signal
   * and the sign-in would appear to do nothing.
   */
  redirect('/admin')
}

export async function signOutAdmin(): Promise<void> {
  await endAdminSession()
  redirect('/admin/login')
}
