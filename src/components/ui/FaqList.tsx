import type { FaqItem } from '@/types'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

/**
 * FAQ accordion, built on native `<details>`/`<summary>`.
 *
 * NO JAVASCRIPT AND NO CLIENT COMPONENT. The browser handles the open/closed
 * state, the keyboard interaction and the ARIA semantics, which a hand-built
 * React accordion has to reimplement and usually gets subtly wrong.
 *
 * It also means the answers are in the HTML whether or not JavaScript ran — so
 * they are searchable in the page with Ctrl-F, printable, and readable by a
 * crawler. For a page whose job is answering a frightened person's questions,
 * content that only exists after hydration is the wrong trade.
 */
export function FaqList({
  items,
  className,
}: {
  items: FaqItem[]
  className?: string
}) {
  if (items.length === 0) return null

  return (
    <div className={cn('divide-y divide-border rounded-(--radius-panel) border border-border bg-surface', className)}>
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-semibold text-text [&::-webkit-details-marker]:hidden">
            {item.question}
            <Icon
              name="chevron-down"
              className="size-5 shrink-0 text-text-subtle transition-transform group-open:rotate-180"
            />
          </summary>

          <div className="pb-4 text-neutral-700">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}
