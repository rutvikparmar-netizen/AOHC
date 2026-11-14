import type { Metadata } from 'next'
import { HomePage } from '@/components/home/HomePage'
import { hreflangFor } from '@/i18n/locales'

/** The English home page. The page itself is `components/home/HomePage`,
 *  shared with the translated home pages under `(intl)/[lang]`. */

/* hreflang: the four translations and x-default (this page). Title and
   description still come from the layout. */
export const metadata: Metadata = {
  alternates: { canonical: '/', languages: hreflangFor('/') },
}

export default function Page() {
  return <HomePage />
}
