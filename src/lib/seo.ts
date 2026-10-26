import type { Metadata } from 'next'
import type { SeoMeta } from '@/types'
import { absoluteUrl, site } from './site'

/**
 * Page metadata, built from one record.
 *
 * Every page calls this rather than assembling a `Metadata` object by hand, so
 * canonical URLs, Open Graph and Twitter cards cannot drift apart — the
 * classic failure being an OG title that still says what the page used to.
 */
export function buildMetadata({
  title,
  description,
  canonicalPath,
  ogImage,
  noIndex,
}: SeoMeta): Metadata {
  const url = canonicalPath ? absoluteUrl(canonicalPath) : site.url
  const image = ogImage?.src ? absoluteUrl(ogImage.src) : absoluteUrl('/aohc-logo.png')

  return {
    title,
    description,
    alternates: canonicalPath ? { canonical: canonicalPath } : undefined,
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url,
      locale: site.locale,
      images: [
        {
          url: image,
          width: ogImage?.width ?? 1200,
          height: ogImage?.height ?? 630,
          alt: ogImage?.alt ?? site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    /**
     * `noIndex` also sets `nofollow`.
     *
     * The only pages that pass it are error states and not-found results —
     * there is nothing on them worth following either, and a crawler that
     * follows links out of a 404 wastes budget on paths that do not exist.
     */
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}
