import { cn } from '@/lib/utils'
import { Eyebrow } from './Badge'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'start',
  onDark,
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: string
  align?: 'start' | 'center'
  onDark?: boolean
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}

      <Tag
        className={cn(
          Tag === 'h1' ? 'text-h1' : 'text-h2',
          onDark ? 'text-white' : 'text-text',
        )}
      >
        {title}
      </Tag>

      {subtitle ? (
        <p
          className={cn(
            'text-lg',
            // Not `max-w-prose` on a centred heading: a measure that ends
            // mid-sentence under a centred title looks like a layout bug.
            align === 'center' ? 'max-w-2xl' : 'max-w-(--container-prose)',
            onDark ? 'text-brand-teal-100' : 'text-text-muted',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
