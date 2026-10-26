import { cn } from '@/lib/utils'

type Tone = 'brand' | 'neutral' | 'success' | 'warning' | 'clinical'

const tones: Record<Tone, string> = {
  brand: 'bg-primary-subtle text-primary-dark',
  neutral: 'bg-surface-muted text-text-muted',
  success: 'bg-success-subtle text-success',
  warning: 'bg-warning-subtle text-warning',
  clinical: 'bg-clinical-subtle text-clinical',
}

export function Badge({
  children,
  tone = 'brand',
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-(--radius-badge) px-2.5 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Uppercase label above a heading. */
export function Eyebrow({
  children,
  onDark,
  className,
}: {
  children: React.ReactNode
  onDark?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-eyebrow uppercase',
        onDark ? 'text-brand-teal-300' : 'text-primary-dark',
        className,
      )}
    >
      {children}
    </p>
  )
}
