import type { NextConfig } from 'next'

/** [original Hindi URL segment, ASCII route folder under `src/app/(site)`]. */
const HINDI_PAGES: [string, string][] = [
  ['फेफड़ों-के-कैंसर-के-लिए-अभ-6', 'hi-lung-cancer-neemrana'],
  ['आयुर्वेदिक-जादू-उजागर-सा-2', 'hi-lung-cancer-harrai'],
  ['आयुर्वेदिक-फेफड़ों-के-कै-57', 'hi-lung-cancer-vidya-nagar'],
  ['आयुर्वेदिक-उपचार-से-फेफड-6', 'hi-lung-cancer-mandawa'],
  ['नवीनीकृत-जीवन-शक्ति-आयुर', 'hi-lung-cancer-charkhi-dadri'],
  ['आयुर्वेदिक-जादू-उजागर-सा', 'hi-lung-cancer-mulana'],
  ['आयुर्वेदिक-फेफड़ों-के-कै-19', 'hi-lung-cancer-jwalapur'],
  ['आयुर्वेदिक-चमत्कार-खोजें', 'hi-breast-cancer-aravali'],
]

/**
 * ⚠️  TEMPORARY (307) REDIRECTS FOR MENU LINKS WITH NO PAGE YET.
 * The Our Expertise mega-menu and the International Patients menu link ~37
 * pages that were declared but never built; every one was a 404 on every
 * page of the site. Each now goes to the closest page that exists — the
 * matching migrated article where there is one (leukaemia → haematological
 * malignancies, antisense → /aot), otherwise its section. 307, not 308, so
 * nothing is cached for good: when a real page is built at one of these
 * paths, delete its line here and it takes over.
 */
const MENU_FALLBACKS: [string, string][] = [
  ['/international-patients/:sub+', '/international-patients'],
  ['/our-expertise', '/treatments-and-therapies'],
  ['/centre-of-excellence', '/about-us'],
  ['/advanced-breast-cancer-program', '/cancer-types'],
  ['/multiple-myeloma', '/hematological-malignancies'],
  ['/non-hodgkins-lymphoma', '/hematological-malignancies'],
  ['/leukemia', '/hematological-malignancies'],
  ['/antisense-oligonucleotide-therapy', '/aot'],
  ['/diagnosis', '/cancer-types'],
  ['/head-and-neck-cancer', '/cancer-types'],
  ['/imaging', '/advanced-diagnostics'],
  ['/hypoxia-mapping', '/advanced-diagnostics'],
  ['/blood-based-tests-and-markers', '/circulating-tumor-cell'],
  ['/treatment', '/treatments-and-therapies'],
  ['/surgery', '/treatments-and-therapies'],
  ['/targeted-therapy', '/targeted-therapy-in-cancer'],
  ['/immunotherapy', '/treatments-and-therapies'],
  ['/radiation-therapy', '/treatments-and-therapies'],
  ['/supportive-therapy', '/integrative-cancer-care'],
  ['/diet-and-nutrition', '/integrative-cancer-care'],
  ['/spiritual-healing', '/yoga-and-meditation'],
  ['/precision-oncology', '/next-generation-sequencing-ngs'],
  ['/genomic-sequencing-ngs', '/next-generation-sequencing-ngs'],
  ['/chemosensitivity', '/advanced-diagnostics'],
  ['/tissue-banking', '/advanced-diagnostics'],
  ['/metabolic-therapy', '/metabolomics'],
  ['/research', '/research-2'],
  ['/integrative-oncology', '/integrative-cancer-care'],
  ['/mistletoe-therapy', '/mistletoe_therapy'],
  ['/hyperthermia', '/treatments-and-therapies'],
  ['/knowledge/documents', '/knowledge'],
]

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* ⚠️  HOSTINGER'S BUILD BOX CANNOT SPAWN A WORKER PER CORE. Next sized
     the static-generation pool from the machine's CPU count ("Collecting
     page data using 63 workers") and the build died with "OS can't spawn
     worker thread: Resource temporarily unavailable". Two workers is plenty
     for ~120 static pages and stays inside the host's thread limit. */
  experimental: {
    cpus: 2,
  },

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
      /* The footer linked /media before /press-release (the WordPress URL) was built. */
      { source: '/media', destination: '/press-release', permanent: true },
      ...MENU_FALLBACKS.map(([source, destination]) => ({ source, destination, permanent: false })),
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
          /* HTTPS only, for a year, subdomains included. Not preload: the
             preload list is hard to leave, and that is a decision for the
             domain owner, not a build. Hostinger redirects http to https;
             this stops a browser ever trying http again. */
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
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
