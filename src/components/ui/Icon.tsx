import { cn } from '@/lib/utils'

/**
 * Inline icon set.
 *
 * Hand-drawn paths rather than an icon package: the site needs about fifteen
 * icons, and a dependency would ship a few hundred and a tree-shaking problem.
 * Every path here is stroke-based on a 24-grid so they share one visual weight.
 *
 * `aria-hidden` by default. An icon beside a label is decoration, and
 * announcing it duplicates the label for a screen-reader user. Where an icon
 * is the only content of a control, the CONTROL carries the accessible name.
 */

const paths: Record<string, string> = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-left': 'M19 12H5M11 18l-6-6 6-6',
  check: 'M20 6 9 17l-5-5',
  'alert-triangle':
    'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9v4M12 17h.01',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 16v-4M12 8h.01',
  'shield-check': 'M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8ZM9 12l2 2 4-4',
  scale: 'M12 3v18M7 7l-4 7h8L7 7ZM17 7l-4 7h8l-4-7ZM7 21h10',
  'message-circle': 'M21 11.5a8.4 8.4 0 0 1-9 8.4 9.9 9.9 0 0 1-4-.8L3 21l1.9-5a8.4 8.4 0 0 1 16.1-4.5Z',
  target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  'file-search': 'M14 2v6h6M15.5 21 19 17.5M4 8V4a2 2 0 0 1 2-2h8l6 6v4M11.5 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  presentation: 'M2 3h20M4 3v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3M8 21l4-5 4 5',
  'book-open': 'M12 7v14M2 5h7a3 3 0 0 1 3 2 3 3 0 0 1 3-2h7v13h-7a3 3 0 0 0-3 2 3 3 0 0 0-3-2H2V5Z',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 7v5l3 2',
  mail: 'M3 7l9 6 9-6M3 5h18v14H3V5Z',
  phone: 'M15.5 21A13.5 13.5 0 0 1 3 8.5 3 3 0 0 1 6 5.5h2l1.5 4-2 1.5a10 10 0 0 0 5 5l1.5-2 4 1.5v2a3 3 0 0 1-2.5 3.5Z',
  'map-pin': 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  play: 'M6 3l14 9-14 9V3Z',
  pause: 'M8 4v16M16 4v16',
  menu: 'M3 6h18M3 12h18M3 18h18',
  x: 'M18 6 6 18M6 6l12 12',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-right': 'M9 6l6 6-6 6',
  'external-link': 'M15 3h6v6M10 14 21 3M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6',
  printer: 'M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6v-8Z',
  stethoscope:
    'M4 3v6a5 5 0 0 0 10 0V3M9 14v2a5 5 0 0 0 10 0v-2M19 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  /** Rosette with ribbons — accreditations, not outcome claims. */
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM8.2 13.9 7 22l5-3 5 3-1.2-8.1',
  hospital:
    'M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M12 7v6M9 10h6M9 21v-4h6v4',
}

export type IconName = keyof typeof paths

export interface IconProps {
  name: IconName
  className?: string
  /** Supply only when the icon is the sole content of its container. */
  label?: string
  strokeWidth?: number
}

export function Icon({ name, className, label, strokeWidth = 2 }: IconProps) {
  const path = paths[name]
  // A missing name renders nothing rather than an empty box — a typo should
  // not leave a mystery square in the middle of a page.
  if (!path) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-5 shrink-0', className)}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <path d={path} />
    </svg>
  )
}
