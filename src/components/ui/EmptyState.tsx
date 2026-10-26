import { cn } from '@/lib/utils'
import { Button } from './Button'
import { Icon, type IconName } from './Icon'

/**
 * Shown where a list has nothing in it.
 *
 * SAYS WHY, NOT JUST THAT. "No patient stories yet — none have been published
 * because written permission has not been recorded" tells a visitor something
 * true. "Nothing found" reads like a broken page, and on this site an empty
 * section that looks broken costs trust that is hard to win back.
 */
export function EmptyState({
  icon = 'info',
  title,
  description,
  action,
  className,
}: {
  icon?: IconName
  title: string
  description?: string
  action?: { label: string; href: string }
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 rounded-(--radius-panel) border border-dashed border-border-strong bg-surface-subtle px-6 py-12 text-center',
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-primary-subtle text-primary-dark">
        <Icon name={icon} />
      </span>

      <p className="text-h5 text-text">{title}</p>

      {description ? (
        <p className="max-w-md text-sm text-text-muted">{description}</p>
      ) : null}

      {action ? (
        <Button href={action.href} variant="secondary" size="sm" className="mt-1">
          {action.label}
        </Button>
      ) : null}
    </div>
  )
}
