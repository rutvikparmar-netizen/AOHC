'use server'

import { revalidatePath } from 'next/cache'
import type { LeadStatus } from '@/types'
import { getAdminSession } from '@/lib/admin/session'
import { setEnquiryNotes, setEnquiryStatus } from '@/lib/leads/store'
import { routes } from '@/lib/routes'

/**
 * CONSOLE MUTATIONS
 * ----------------------------------------------------------------------------
 * EVERY ACTION IN THIS FILE CHECKS THE SESSION ITSELF.
 *
 * A server action is a POST endpoint with a generated URL. It does not run the
 * `(admin)` layout, and it does not run the page's `requireAdminSession()`
 * call. An action that trusted the layout to have authenticated the caller
 * would be an unauthenticated write to patient records — reachable by anyone
 * who found the action id in the page source.
 *
 * So the guard is here, in each function, and it is not optional.
 */

const STATUSES: LeadStatus[] = ['new', 'contacted', 'consulting', 'closed']

export interface LeadActionResult {
  ok: boolean
  message?: string
}

export async function updateLeadStatus(formData: FormData): Promise<LeadActionResult> {
  const admin = await getAdminSession()
  if (!admin) return { ok: false, message: 'Not signed in.' }

  const id = (formData.get('id') ?? '').toString()
  const status = (formData.get('status') ?? '').toString()

  if (!id) return { ok: false, message: 'Missing enquiry id.' }
  if (!(STATUSES as string[]).includes(status)) {
    return { ok: false, message: 'Unknown status.' }
  }

  try {
    await setEnquiryStatus(id, status as LeadStatus)
  } catch (error) {
    console.error('[admin] status update failed', error)
    return { ok: false, message: 'Could not save that. Please try again.' }
  }

  // Both the list and the detail view show status, so both are revalidated.
  revalidatePath(routes.adminLeads)
  revalidatePath(routes.adminLead(id))
  revalidatePath(routes.admin)

  return { ok: true }
}

export async function saveLeadNotes(formData: FormData): Promise<LeadActionResult> {
  const admin = await getAdminSession()
  if (!admin) return { ok: false, message: 'Not signed in.' }

  const id = (formData.get('id') ?? '').toString()
  const notes = (formData.get('notes') ?? '').toString()

  if (!id) return { ok: false, message: 'Missing enquiry id.' }
  if (notes.length > 10_000) {
    return { ok: false, message: 'Notes are too long to save.' }
  }

  try {
    await setEnquiryNotes(id, notes)
  } catch (error) {
    console.error('[admin] notes update failed', error)
    return { ok: false, message: 'Could not save those notes. Please try again.' }
  }

  revalidatePath(routes.adminLead(id))
  return { ok: true }
}
