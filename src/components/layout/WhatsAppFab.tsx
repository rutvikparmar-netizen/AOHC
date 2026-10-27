import { whatsappHref } from '@/lib/format'
import { Icon } from '@/components/ui/Icon'

/**
 * Floating "chat on WhatsApp" button, pinned to the bottom-right corner.
 *
 * WHY IT SITS HIGHER ON PHONES. `MobileBottomBar` is fixed to the bottom of
 * the viewport below `lg`, so a button at `bottom-6` would land on top of it.
 * The offset clears that bar and the iPhone home indicator with it; from `lg`
 * up the bar is gone and the button drops to the normal corner inset.
 *
 * THE GREEN IS WHATSAPP'S DARK BRAND GREEN (#128C7E), NOT ITS BRIGHT ONE.
 * White on the familiar #25D366 measures 1.98:1, which fails the 3:1 that
 * WCAG 1.4.11 asks of a non-text graphic — the glyph would be legible to the
 * person who designed it and washed out to everyone else. #128C7E is also an
 * official brand colour, measures 4.14:1 against white, and sits closer to
 * the page's teal accent.
 *
 * THE GLYPH IS THE GENERIC CHAT BUBBLE, DELIBERATELY. WhatsApp's real mark is
 * a handset inside a bubble, and drawing an approximation of it here would be
 * inventing a third party's trademark — the same reason `src/data/home.ts`
 * ships no press mastheads. Every other WhatsApp affordance on the site
 * (header, footer, bottom bar) already uses `message-circle`, so this is
 * consistent rather than merely cautious. Drop the official asset in from
 * WhatsApp's brand resources to make it authentic.
 *
 * It guards on an empty number for the same reason `WhatsAppAction` does: a
 * cleared config must render nothing, not a `https://wa.me/` link to nowhere.
 *
 * Server component. The pulse is CSS, and so is switching it off.
 */

const PREFILL = 'Hello, I would like to ask about a consultation at Art of Healing Cancer.'

export function WhatsAppFab() {
  const href = whatsappHref(PREFILL)
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="wa-fab fixed right-4 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-(--z-sticky) inline-flex size-14 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-[0_8px_24px_rgba(6,42,49,0.28)] transition-transform duration-200 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:right-6 lg:bottom-6"
    >
      {/**
       * The ring is painted by the parent's ::before so it cannot intercept a
       * tap, and it is `aria-hidden` by virtue of being a pseudo-element —
       * there is nothing here for a screen reader to announce twice.
       */}
      <Icon name="message-circle" className="relative size-7" />
    </a>
  )
}
