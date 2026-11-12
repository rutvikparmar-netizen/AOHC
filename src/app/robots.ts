import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { absoluteUrl } from '@/lib/site'

/**
 * robots.txt, decided per request by the host it is served on.
 *
 * ⚠️  ONLY THE REAL DOMAIN IS CRAWLABLE. The Hostinger staging host
 * (`*.hostingersite.com`), localhost and any preview host get "disallow
 * everything": a second crawlable copy of every page is duplicate content,
 * canonical tags notwithstanding. Production needs no setting — any host
 * that is not one of those is treated as the live site.
 */
const NON_PRODUCTION = /(^|\.)hostingersite\.com$|^localhost$|^127\.|\.vercel\.app$/

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = ((await headers()).get('host') ?? '').split(':')[0] ?? ''

  if (NON_PRODUCTION.test(host)) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
