'use client'

import { createContext, useContext } from 'react'

/**
 * Translation for the forms' built-in words ("(optional)", "(required)").
 * `EnquiryForm` provides it from its `dict` prop; with no provider every
 * string is returned as it is, so English pages need nothing.
 */
export const FormTextContext = createContext<(text: string) => string>((text) => text)

export function useFormText() {
  return useContext(FormTextContext)
}
