import Link from 'next/link'
import type { Breadcrumb } from '@/types'
import { cn } from '@/lib/utils'
import { Icon } from './Icon'

/**
 * Breadcrumb trail.
 *
 * `<nav aria-label>` plus an ordered list, because the order is the meaning.
 * The last crumb is the current page and carries `aria-current="page"` with no
 * link — linking a page to itself is a dead control for anyone navigating by
 * keyboard or screen reader.
 */
export function Breadcrumbs({
  trail,
  onDark,
  className,
}: {
  trail: Breadcrumb[]
  onDark?: boolean
  className?: string
}) {
  if (trail.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1

          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <Icon
                  name="chevron-right"
                  className={cn('size-3.5', onDark ? 'text-brand-teal-300' : 'text-text-subtle')}
                />
              ) : null}

              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className={cn(
                    'rounded-(--radius-xs) hover:underline',
                    onDark ? 'text-brand-teal-100' : 'text-text-muted',
                  )}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn('font-medium', onDark ? 'text-white' : 'text-text')}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
