import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HomePage } from '@/components/home/HomePage'
import { LOCALE_INFO, hreflangFor, isLocale } from '@/i18n/locales'
import { setLocale, t } from '@/i18n/request'
import { site } from '@/lib/site'

/**
 * The home page in French, Spanish, Russian or Arabic: the same page as `/`
 * (`components/home/HomePage`), rendered after `setLocale` so its content and
 * built-in text come from the language's dictionary.
 *
 * SEO: its own canonical (/fr …), hreflang links to every language version
 * and x-default to English, and a title and description in the language.
 */
export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  setLocale(lang)
  const title = `${t('A More Personalized Approach to Cancer Care')} | ${site.name}`
  const description = t("Learn about AOHC's personalized approach to cancer care, including clinical information review, conventional oncology, and appropriate integrative support.")
  const url = `/${lang}`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: hreflangFor('/') },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url,
      locale: LOCALE_INFO[lang].ogLocale,
      images: [{ url: `/og?title=${encodeURIComponent(site.name)}`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function LocalizedHome({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang) || lang === 'en') notFound()
  /* Again here, not only in the layout: the two can render in parallel. */
  setLocale(lang)
  return <HomePage />
}
