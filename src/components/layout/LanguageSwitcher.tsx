import { LOCALES, LOCALE_INFO, localizedPath, type Locale } from '@/i18n/locales'
import { getLocale, t } from '@/i18n/request'
import { Icon } from '@/components/ui/Icon'

/**
 * THE LANGUAGE SWITCHER — in the header, beside "Request an Appointment".
 *
 * A `<details>` disclosure, so it opens and closes with no JavaScript and is
 * a native keyboard control. Each language is written in its own script
 * ("Français", "العربية") — someone looking for their language reads its
 * name, not its English name — with `lang` and `hreflang` set on each link.
 *
 * ⚠️  ONLY THE HOME PAGE IS TRANSLATED. Every entry links to that language's
 * home page; when more pages are translated (see `TRANSLATED_PATHS` in
 * `i18n/locales.ts`) this should link to the current page's counterpart.
 *
 * `overlay` matches the header's two states: white type over the hero,
 * dark type once the page has scrolled (the `group-data-[scrolled]/header`
 * variants, as on the nav links).
 */
export function LanguageSwitcher({ overlay = false }: { overlay?: boolean }) {
  const current: Locale = getLocale()

  return (
    <details className="group/lang relative">
      <summary
        aria-label={`${t('Language')}: ${LOCALE_INFO[current].name}`}
        className={`flex min-h-10 cursor-pointer list-none items-center gap-1 rounded-full px-2 text-sm font-semibold transition-colors [&::-webkit-details-marker]:hidden ${
          overlay
            ? 'text-white/85 hover:bg-white/10 hover:text-white group-data-[scrolled]/header:text-text group-data-[scrolled]/header:hover:bg-primary-subtle'
            : 'text-text hover:bg-primary-subtle'
        } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
      >
        <Icon name="globe" className="size-4.5" />
        <span className="uppercase">{current}</span>
      </summary>

      <ul className="absolute end-0 top-full z-50 mt-2 min-w-44 overflow-hidden rounded-(--radius-2xl) border border-border bg-surface py-1.5 shadow-(--shadow-card)">
        {LOCALES.map((l) => {
          const active = l === current
          return (
            <li key={l}>
              <a
                href={localizedPath('/', l)}
                lang={l}
                hrefLang={l}
                dir={LOCALE_INFO[l].dir}
                aria-current={active ? 'true' : undefined}
                className={`flex items-center justify-between gap-4 px-4 py-2.5 text-sm transition-colors hover:bg-primary-subtle focus-visible:bg-primary-subtle focus-visible:outline-none ${
                  active ? 'font-bold text-primary-dark' : 'text-text'
                }`}
              >
                <span>{LOCALE_INFO[l].name}</span>
                <span className="text-xs uppercase text-text-muted">{l}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </details>
  )
}
