import { routes } from '@/lib/routes'
import { whatsappHref } from '@/lib/format'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/**
 * A section's single call to action.
 *
 *   meeting  Schedule a Free Meeting — the enquiry form
 *   expert   Connect to an Expert   — WhatsApp, pre-filled to ask for a specialist
 *   contact  Contact Us             — the contact details beside the form
 *
 * ONE BUTTON PER SECTION, BY DESIGN. Three side by side read as a menu and
 * split the reader's attention; one reads as "this is the next step". The
 * three actions are spread across the page instead, each where it fits the
 * content above it.
 *
 * `expert` falls back to `meeting` if the WhatsApp number is ever cleared,
 * rather than rendering a link to nowhere.
 */

export type CtaKind = 'meeting' | 'expert' | 'contact'

const EXPERT_PREFILL =
  'Hello, I would like to speak with one of your cancer specialists about my case.'

export function Cta({
  kind,
  className,
}: {
  kind: CtaKind
  className?: string
}) {
  const expertHref = whatsappHref(EXPERT_PREFILL)
  const resolved: CtaKind = kind === 'expert' && !expertHref ? 'meeting' : kind

  const shared = cn('w-full rounded-(--radius-pill) sm:w-fit', className)

  if (resolved === 'expert') {
    return (
      <Button
        href={expertHref}
        variant="accent"
        icon="stethoscope"
        iconPosition="start"
        className={shared}
      >
        Connect to an Expert
      </Button>
    )
  }

  if (resolved === 'contact') {
    return (
      <Button
        href={routes.contact}
        variant="accent"
        icon="mail"
        iconPosition="start"
        className={shared}
      >
        Contact Us
      </Button>
    )
  }

  return (
    <Button
      href={routes.consultation}
      variant="accent"
      icon="calendar"
      iconPosition="start"
      className={shared}
    >
      Schedule a Free Meeting
    </Button>
  )
}
