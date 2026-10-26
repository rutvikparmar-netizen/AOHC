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
export function Container({
  children,
  width = 'site',
  className,
  id,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  width?: 'site' | 'content' | 'prose'
  className?: string
  /** Anchor target, for in-page links such as `#appointment`. */
  id?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'article'
}) {
  const widths = {
    site: 'max-w-(--container-site)',
    content: 'max-w-(--container-content)',
    prose: 'max-w-(--container-prose)',
  }

  return (
    <Tag
      id={id}
      className={cn('mx-auto w-full px-(--gutter)', widths[width], className)}
    >
      {children}
    </Tag>
  )
}
