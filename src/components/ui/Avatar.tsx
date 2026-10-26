import Image from 'next/image'
import type { ImageAsset } from '@/types'
import { cn } from '@/lib/utils'

/**
 * A portrait, or initials when there is no photograph.
 *
 * The initials fallback is not decoration: the team records in `src/data` ship
 * with no real photographs, and a missing file would otherwise render as a
 * broken-image icon on a specialist's profile. Initials look deliberate.
 */
export function Avatar({
  name,
  photo,
  size = 'md',
  className,
}: {
  name: string
  photo?: ImageAsset
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizes = {
    sm: { box: 'size-9', text: 'text-xs', px: 36 },
    md: { box: 'size-12', text: 'text-sm', px: 48 },
    lg: { box: 'size-20', text: 'text-lg', px: 80 },
    xl: { box: 'size-28 sm:size-36', text: 'text-h3', px: 144 },
  }[size]

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  // The generated placeholder counts as "no photograph" — it is a graphic, not
  // a likeness, and initials read better than a stock pattern on a face.
  const hasPhoto = Boolean(photo?.src) && !photo!.src.startsWith('/placeholder/')

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-subtle',
        sizes.box,
        className,
      )}
    >
      {hasPhoto ? (
        <Image
          src={photo!.src}
          alt={photo!.alt || name}
          width={sizes.px}
          height={sizes.px}
          className="size-full object-cover"
        />
      ) : (
        <span
          className={cn('font-bold tracking-wide text-primary-dark', sizes.text)}
          aria-hidden
        >
          {initials}
        </span>
      )}
    </span>
  )
}
