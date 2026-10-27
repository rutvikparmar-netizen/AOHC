import { cn } from '@/lib/utils'

/**
 * Horizontal page frame.
 *
 * Three widths, matching the containers in `tokens.css`:
 *   site    page chrome and wide grids
 *   content composed sections
 *   prose   long-form reading, held to a ~70-character measure
 *
 * The horizontal gutter comes from `--gutter` — 15px on phones, 40px from
 * 768px up — so it is set in one place and every section inherits it. Nothing
 * should hard-code its own side padding; that is how pages end up with edges
 * that almost line up.
 */
/**
 * ⚠️  ANYTHING ELSE PASSED IS FORWARDED, and that is not decoration.
 *
 * `data-header-row` was being set on a `<Container>` and silently thrown
 * away, because the props were listed exhaustively and there was nothing to
 * spread. TypeScript does not catch it: a JSX attribute containing a hyphen
 * is exempt from excess-property checking, so `data-*` on a component type
 * checks whether or not the component does anything with it.
 */
export function Container({
  children,
  width = 'site',
  className,
  id,
  as: Tag = 'div',
  ...rest
}: {
  children: React.ReactNode
  width?: 'site' | 'content' | 'prose'
  className?: string
  /** Anchor target, for in-page links such as `#appointment`. */
  id?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'article'
} & React.HTMLAttributes<HTMLElement>) {
  const widths = {
    site: 'max-w-(--container-site)',
    content: 'max-w-(--container-content)',
    prose: 'max-w-(--container-prose)',
  }

  return (
    <Tag
      id={id}
      className={cn('mx-auto w-full px-(--gutter)', widths[width], className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
