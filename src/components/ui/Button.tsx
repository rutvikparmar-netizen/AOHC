import Link from 'next/link'
import { cn } from '@/lib/utils'
import { isExternalHref } from '@/lib/routes'
import { Icon, type IconName } from './Icon'

/**
 * `accent` is the PRIMARY call to action and nothing else.
 *
 * Exactly one visual treatment means "this is the next step", so a patient
 * scanning the page finds it without reading. `primary` (teal) is for
 * secondary navigation actions; `secondary` and `ghost` are quieter still.
 */
type Variant = 'accent' | 'primary' | 'secondary' | 'ghost' | 'onDark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-(--radius-button) font-semibold ' +
  'transition-colors cursor-pointer ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'disabled:cursor-not-allowed disabled:opacity-55'

const variants: Record<Variant, string> = {
  accent: 'bg-accent text-white hover:bg-accent-dark',
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary:
    'border border-border-strong bg-surface text-text hover:border-accent hover:text-accent-dark',
  ghost: 'text-primary-dark hover:bg-primary-subtle',
  onDark: 'bg-white text-brand-teal-900 hover:bg-brand-teal-50',
}

/**
 * EVERY SIZE CLEARS 44px, including `sm`, which used to be 36.
 *
 * WCAG 2.2 sets 24px as the web floor and Apple/Material ask for 44–48. This
 * audience is older and largely on phones, so the generous figure wins —
 * there is no size here that produces a target someone will miss.
 */
const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-12 px-5 text-base',
  lg: 'min-h-14 px-7 text-base sm:text-lg',
}

interface CommonProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: IconName
  /** Icons sit after the label by default — before it for "back" affordances. */
  iconPosition?: 'start' | 'end'
}

type ButtonAsLink = CommonProps & { href: string; type?: never; disabled?: never }
type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon,
    iconPosition = 'end',
    ...rest
  } = props

  const classes = cn(base, variants[variant], sizes[size], className)

  const content = (
    <>
      {icon && iconPosition === 'start' ? <Icon name={icon} className="size-4.5" /> : null}
      {children}
      {icon && iconPosition === 'end' ? <Icon name={icon} className="size-4.5" /> : null}
    </>
  )

  if ('href' in rest && rest.href) {
    const { href, ...linkRest } = rest as { href: string }
    void linkRest

    /**
     * An external href gets a plain anchor, not `next/link`.
     *
     * `next/link` prefetches and client-navigates, neither of which is
     * meaningful off-site, and `mailto:`/`tel:` through the router is broken
     * outright.
     */
    if (isExternalHref(href)) {
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </a>
      )
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} {...buttonProps}>
      {content}
    </button>
  )
}
