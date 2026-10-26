import { whatsappHref } from '@/lib/format'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

/**
 * "Chat on WhatsApp" — the secondary contact action.
 *
 * THE "CALL US" ACTION WAS REMOVED, not disabled. AOHC takes enquiries by
 * email, WhatsApp and the form only, so a call button has nothing to point
 * at. Leaving a stub that renders a placeholder would keep implying a phone
 * line is coming.
 *
 * It still guards on an empty number: the component must not emit a
 * `https://wa.me/` link to nowhere if the config is ever cleared.
 */

const PREFILL = 'Hello, I would like to ask about a consultation at Art of Healing Cancer.'

const actionClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-(--radius-button) ' +
  'border border-border-strong px-5 font-semibold text-text transition-colors ' +
  'hover:border-accent hover:text-accent-dark ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function WhatsAppAction({
  className,
  compact,
}: {
  className?: string
  compact?: boolean
}) {
  const href = whatsappHref(PREFILL)
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(actionClass, className)}
    >
      <Icon name="message-circle" className="size-5" />
      {compact ? 'WhatsApp' : 'Chat on WhatsApp'}
    </a>
  )
}
