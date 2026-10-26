import { cn } from '@/lib/utils'
import { Icon, type IconName } from './Icon'

type Tone = 'info' | 'warning' | 'clinical' | 'neutral'

const tones: Record<Tone, { wrap: string; icon: string; defaultIcon: IconName }> = {
  info: {
    wrap: 'border-border-brand bg-primary-subtle',
    icon: 'text-primary-dark',
    defaultIcon: 'info',
  },
  warning: {
    wrap: 'border-warning/30 bg-warning-subtle',
    icon: 'text-warning',
    defaultIcon: 'alert-triangle',
  },
  /** Reserved for risks and side effects. See `--color-clinical` in tokens. */
  clinical: {
    wrap: 'border-clinical/25 bg-clinical-subtle',
    icon: 'text-clinical',
    defaultIcon: 'alert-triangle',
  },
  neutral: {
    wrap: 'border-border bg-surface-subtle',
    icon: 'text-text-muted',
    defaultIcon: 'info',
  },
}

/**
 * A bordered aside for information that must not be skimmed past — the medical
 * disclaimer, an unreviewed-content notice, a safety-netting instruction.
 *
 * Rendered as an `<aside>` with a heading rather than a styled paragraph, so
 * it is reachable as a landmark and announced as a distinct region rather than
 * running on from the body text.
 */
export function Callout({
  title,
  children,
  tone = 'info',
  icon,
  className,
}: {
  title?: string
  children: React.ReactNode
  tone?: Tone
  icon?: IconName
  className?: string
}) {
  const style = tones[tone]

  return (
    <aside
      className={cn(
        'flex gap-3 rounded-(--radius-card) border p-4 sm:gap-4 sm:p-5',
        style.wrap,
        className,
      )}
    >
      <Icon name={icon ?? style.defaultIcon} className={cn('mt-0.5 size-5', style.icon)} />

      <div className="min-w-0 space-y-1.5">
        {title ? <p className="text-h6 text-text">{title}</p> : null}
        <div className="text-sm leading-relaxed text-neutral-700 [&_a]:font-medium [&_a]:text-primary-dark [&_a]:underline">
          {children}
        </div>
      </div>
    </aside>
  )
}
