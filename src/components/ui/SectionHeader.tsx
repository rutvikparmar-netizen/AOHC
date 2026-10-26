import { cn } from '@/lib/utils'

/**
 * Section heading, used by every section on the page.
 *
 * THE EYEBROW IS OPTIONAL AND SHOULD STAY RARE. A small uppercase label above
 * every heading flattens the page — once everything is announced the same
 * way, nothing reads as more important than anything else. Use it where a
 * section genuinely needs a category ("Our doctors"), not as default
 * furniture.
 *
 * `intro` is capped at `--measure` (~65ch) so no paragraph runs wider than a
 * comfortable line, whatever container it sits in.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  onDark,
  align = 'start',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  intro?: string
  onDark?: boolean
  align?: 'start' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  const centered = align === 'center'

  return (
    <div className={cn(centered && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'text-xs font-bold uppercase tracking-[0.12em]',
            onDark ? 'text-brand-teal-300' : 'text-primary-dark',
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <Tag
        className={cn(
          'font-display font-bold tracking-[-0.02em]',
          Tag === 'h1' ? 'text-h1' : 'text-h2',
          eyebrow && 'mt-3',
          onDark ? 'text-white' : 'text-text',
        )}
      >
        {title}
      </Tag>

      {intro ? (
        <p
          className={cn(
            'mt-5 max-w-(--measure) text-lg',
            centered && 'mx-auto',
            onDark ? 'text-brand-teal-100' : 'text-neutral-700',
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}
