import type { NextConfig } from 'next'

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
