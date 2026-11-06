import type { NextConfig } from 'next'

/** [original Hindi URL segment, ASCII route folder under `src/app/(site)`]. */
const HINDI_PAGES: [string, string][] = [
  ['फेफड़ों-के-कैंसर-के-लिए-अभ-6', 'hi-lung-cancer-neemrana'],
  ['आयुर्वेदिक-जादू-उजागर-सा-2', 'hi-lung-cancer-harrai'],
  ['आयुर्वेदिक-फेफड़ों-के-कै-57', 'hi-lung-cancer-vidya-nagar'],
  ['आयुर्वेदिक-उपचार-से-फेफड-6', 'hi-lung-cancer-mandawa'],
  ['नवीनीकृत-जीवन-शक्ति-आयुर', 'hi-lung-cancer-charkhi-dadri'],
]

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Fail the production build on type errors rather than shipping them.
  // Next 16 no longer runs ESLint during `next build` — lint is a separate
  // `npm run lint` step (and belongs in CI).
  typescript: { ignoreBuildErrors: false },

  images: {
    // Every asset is served from /public while the site runs on demo content.
    // When media moves to a CDN or the old WordPress library, add the host
    // here — no component changes.
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * ⚠️  `/knowledge/blogs` IS STILL LINKED FROM OUTSIDE THIS CODEBASE. It
   * was the blog index's URL until it moved to `/blogs`, and it was
   * deployed to staging in the meantime — so a bookmark, a shared link or
   * a crawler may already hold it. Permanent, so search engines move
   * whatever they have indexed to the new path.
   */
  async redirects() {
    return [
      { source: '/knowledge/blogs', destination: '/blogs', permanent: true },
      /* The menu linked /knowledge/videos before /videos (the WordPress URL) was built. */
      { source: '/knowledge/videos', destination: '/videos', permanent: true },
      /* The WordPress site served the team at /our-doctors and that is
         the URL Google holds, so the page moved back there. */
      { source: '/about-us/our-doctors', destination: '/our-doctors', permanent: true },
      { source: '/about-us/who-we-are', destination: '/who-we-are', permanent: true },
      /* The ASCII folders behind the Hindi URLs (see `rewrites`) are not
         addresses anyone should land on — send them to the real one, so
         there is only ever one URL for each page. Redirects run before
         rewrites and only on the incoming request, so this cannot loop. */
      ...HINDI_PAGES.map(([hindi, folder]) => ({
        source: `/${folder}`,
        destination: `/${encodeURI(hindi)}`,
        permanent: true,
      })),
    ]
  },

  /**
   * ⚠️  DEVANAGARI URLS FROM THE WORDPRESS SITE. Next does not route a
   * folder named in Devanagari — it 404s — so each page lives in an ASCII
   * folder and is served at its original Hindi URL from here. The source
   * is the percent-encoded form, which is what arrives on the wire.
   */
  async rewrites() {
    return HINDI_PAGES.map(([hindi, folder]) => ({
      source: `/${encodeURI(hindi)}`,
      destination: `/${folder}`,
    }))
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        /**
         * The console shows patient enquiries — names, phone numbers and
         * what someone has written about their diagnosis. None of it may sit
         * in a shared cache, and none of it belongs in a search index.
         */
        source: '/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, private' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },
}

export default nextConfig
