/**
 * FORM STATE TYPES AND INITIAL VALUES
 * ----------------------------------------------------------------------------
 * These live here, in a plain module, rather than beside the actions that
 * produce them — because a `'use server'` file may only export async
 * functions. Exporting an `initialEnquiryState` object from the action file
 * fails the build with `invalid-use-server-value`, which is Next refusing to
 * expose a non-callable as a server reference.
 *
 * Types would in fact be fine there (they are erased), but keeping the type
 * and its initial value together is worth more than the distinction.
 *
 * Imported by both sides: the server actions return these shapes, and the
 * client forms seed `useActionState` with the initial values.
 */

export interface EnquiryFormState {
  status: 'idle' | 'success' | 'error'
  /** Shown above the form. */
  message?: string
  /** Keyed by field name. */
  errors?: Partial<Record<string, string>>
  /** Echoed back so a rejected form does not lose what someone typed. */
  values?: Record<string, string>
  /** On success: the reference to quote. */
  reference?: string
  /** On success: whether the acknowledgement email was really sent. */
  emailSent?: boolean
}

export const initialEnquiryState: EnquiryFormState = { status: 'idle' }

export interface RegistrationFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<string, string>>
  values?: Record<string, string>
  reference?: string
  emailSent?: boolean
  alreadyRegistered?: boolean
}

export const initialRegistrationState: RegistrationFormState = { status: 'idle' }

export interface AdminLoginState {
  status: 'idle' | 'error'
  message?: string
  email?: string
}

export const initialAdminLoginState: AdminLoginState = { status: 'idle' }
