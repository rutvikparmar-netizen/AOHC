import type { Metadata, Viewport } from 'next'
import { Fraunces, Lexend } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { StickyHeaderShell } from '@/components/layout/StickyHeaderShell'
import { MobileBottomBar } from '@/components/layout/MobileBottomBar'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'
import { site } from '@/lib/site'
import '@/styles/globals.css'

/**
 * PUBLIC SITE ROOT LAYOUT
 * ----------------------------------------------------------------------------
 * One of TWO root layouts — the admin console has its own in `(admin)`. Being
 * separate roots is the point: the console renders none of this chrome and
 * loads none of these fonts, and navigating between the two is a full page
 * load by design. There is deliberately no `src/app/layout.tsx` above them.
 *
 * Inter carries the UI and body text; Fraunces is used only for the accent
 * phrase in display headings. Both are self-hosted by next/font, so there is
 * no third-party request and no layout shift as they load.
 */

/**
 * Lexend carries all reading text.
 *
 * It is a variable font, so weights 300–700 come from one file rather than
 * five — and it was drawn specifically to reduce reading effort, which is the
 * right bias for pages read under stress by people who are unwell or
 * frightened.
 */
const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
  weight: ['300', '400', '500', '600', '700'],
})

/**
 * Fraunces is the FALLBACK for display headings, not the intended face.
 *
 * The brief calls for P22 Mackinac Pro, which is commercial and must be
 * self-hosted from licensed files (see `styles/fonts.css`). Until those files
 * exist, `--font-display` falls through to this. Both are contemporary serifs
 * with a high-contrast axis, so the layout holds either way.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  style: ['normal', 'italic'],
  weight: ['600', '700'],
})

export const metadata: Metadata = {
  // Lets every relative canonical/OG URL resolve absolutely.
  metadataBase: new URL(site.url),
  ...buildMetadata({
    title: site.title,
    description: site.description,
    canonicalPath: '/',
  }),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  /**
   * No `icons` entry, deliberately. Next's file convention picks up
   * `src/app/icon.png` — the lotus cropped out of the logo — and generates
   * the correct `<link>` tags with a content hash.
   *
   * Declaring `icons` here would override that and point back at the old
   * placeholder SVG. The lockup itself is not usable as a favicon: the
   * wordmark is illegible below about 64px, so only the mark is used.
   */
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // No maximum-scale: capping pinch-zoom fails WCAG 1.4.4, and this audience
  // includes a lot of people who zoom.
  themeColor: '#0e9caf',
}

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lexend.variable} ${fraunces.variable}`}>
      <head>
        {/* Identity of the organisation and the site, stated once for the whole
            app. Page-level nodes reference the organisation by `@id` rather
            than repeating it. */}
        <JsonLd nodes={[organizationSchema(), websiteSchema()]} />

        {/**
         * NO-JAVASCRIPT SAFETY NET for the scroll-reveal system.
         *
         * `globals.css` starts every `[data-reveal]` element at `opacity: 0`
         * and waits for `<Reveal>` to add `data-revealed`. Without JavaScript
         * that attribute never arrives and the page would render BLANK — a
         * catastrophic failure mode for a decorative effect, and one that also
         * hits any crawler running CSS but not JS.
         *
         * This is the smallest possible fix and it cannot be forgotten: it
         * ships in the same HTML as the rule it neutralises.
         */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.rule-draw{transform:scaleX(1)!important}`}</style>
        </noscript>
      </head>
      <body>
        {/* First tab stop, so keyboard users can bypass the header nav. */}
        <a href="#main-content" className="sr-only-focusable">
          Skip to main content
        </a>

        {/**
         * THE LAYOUT OWNS THE HEADER, and there is exactly one of it.
         *
         * It used to be nested inside the home page's hero card, absolutely
         * positioned over the video, which meant it scrolled away with the
         * hero and the rest of a very long page had no navigation at all.
         * `StickyHeaderShell` fixes it to the viewport instead and toggles
         * `data-scrolled`; the header is transparent over the hero and
         * frosts into a compact bar below it. See that component for why it
         * is one header rather than two, and fixed rather than sticky.
         *
         * ⚠️  THE TRANSPARENT STATE ASSUMES A DARK THING AT THE TOP OF THE
         * PAGE. The home page opens with the hero card, so white type reads.
         * A future page that opens on the warm background wants
         * `<Header />` without `variant="overlay"`, which is solid from the
         * start — pass it from the page then rather than from here.
         *
         * `pb-20 lg:pb-0` reserves room for the mobile action bar, which is
         * fixed to the bottom of the viewport. Without it the bar covers the
         * last row of the footer.
         */}
        <StickyHeaderShell>
          <Header variant="overlay" />
        </StickyHeaderShell>

        <div className="flex min-h-dvh flex-col pb-20 lg:pb-0">
          <main id="main-content" className="flex-1">
            {children}
          </main>

          <Footer />
        </div>

        <MobileBottomBar />

        {/**
         * After the bottom bar in the DOM on purpose: both sit at
         * `--z-sticky`, so source order is what decides which wins if the
         * offsets are ever changed into an overlap.
         */}
        <WhatsAppFab />
      </body>
    </html>
  )
}
