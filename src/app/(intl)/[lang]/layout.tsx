import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Fraunces, Lexend, Noto_Naskh_Arabic, Noto_Sans, Noto_Sans_Arabic, Noto_Serif } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { StickyHeaderShell } from '@/components/layout/StickyHeaderShell'
import { MobileBottomBar } from '@/components/layout/MobileBottomBar'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'
import { site } from '@/lib/site'
import { LOCALE_INFO, OTHER_LOCALES, isLocale } from '@/i18n/locales'
import { setLocale, t } from '@/i18n/request'
import '@/styles/globals.css'

/**
 * ROOT LAYOUT FOR THE TRANSLATED PAGES — /fr, /es, /ru, /ar
 * ----------------------------------------------------------------------------
 * A third root layout beside `(site)` and `(admin)`, because the root layout
 * owns `<html lang>` and `dir`, and the English layout must keep
 * `lang="en"`. Same chrome as `(site)/layout.tsx` — header, footer, bottom
 * bar, WhatsApp button — in the page's language. Moving between English and
 * a translated page is a full page load, which a language change is anyway.
 *
 * ⚠️  ENGLISH URLS DO NOT CHANGE. English stays unprefixed in `(site)`;
 * only the other languages are under `[lang]`. `dynamicParams = false`
 * means anything that is not one of the four codes is a 404 here, so this
 * segment can never swallow an English page.
 *
 * FONTS. Lexend and Fraunces have no Cyrillic or Arabic letters, so Russian
 * gets Noto Sans / Noto Serif and Arabic gets Noto Sans Arabic / Noto Naskh
 * Arabic — under the SAME CSS variables (`--font-lexend`, `--font-fraunces`),
 * so every component picks them up through the existing tokens.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return OTHER_LOCALES.map((lang) => ({ lang }))
}

const lexend = Lexend({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--font-lexend', weight: ['300', '400', '500', '600', '700'] })
const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--font-fraunces', style: ['normal', 'italic'], weight: ['600', '700'] })
const notoSans = Noto_Sans({ subsets: ['latin', 'cyrillic'], display: 'swap', variable: '--font-lexend', weight: ['300', '400', '500', '600', '700'] })
const notoSerif = Noto_Serif({ subsets: ['latin', 'cyrillic'], display: 'swap', variable: '--font-fraunces', weight: ['600', '700'] })
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], display: 'swap', variable: '--font-lexend', weight: ['300', '400', '500', '600', '700'] })
const naskh = Noto_Naskh_Arabic({ subsets: ['arabic'], display: 'swap', variable: '--font-fraunces', weight: ['600', '700'] })

const FONTS: Record<string, string> = {
  fr: `${lexend.variable} ${fraunces.variable}`,
  es: `${lexend.variable} ${fraunces.variable}`,
  ru: `${notoSans.variable} ${notoSerif.variable}`,
  ar: `${notoArabic.variable} ${naskh.variable}`,
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e9caf',
}

export default async function IntlLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang) || lang === 'en') notFound()
  setLocale(lang)

  return (
    <html lang={lang} dir={LOCALE_INFO[lang].dir} className={FONTS[lang]}>
      <head>
        <JsonLd nodes={[organizationSchema(), websiteSchema()]} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.rule-draw{transform:scaleX(1)!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main-content" className="sr-only-focusable">
          {t('Skip to main content')}
        </a>

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
        <WhatsAppFab />
      </body>
    </html>
  )
}
