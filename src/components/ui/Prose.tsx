import { toParagraphs } from '@/lib/format'
import { cn } from '@/lib/utils'

/**
 * Renders stored long-form text.
 *
 * NO `dangerouslySetInnerHTML`, ANYWHERE. Bodies are plain text with blank
 * lines between paragraphs, split and rendered as `<p>` elements. Nothing in
 * the content can inject markup — which matters because this content will be
 * editable from the admin console, and an editor field that can inject a
 * `<script>` into a patient-facing page is a stored XSS hole.
 *
 * A line wrapped in `**` becomes a subheading. That is the one piece of markup
 * supported, and it is handled by matching the whole line rather than by
 * parsing inline markdown, so a stray asterisk mid-sentence stays an asterisk.
 */
export function Prose({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const blocks = toParagraphs(text)

  return (
    <div className={cn('prose-body', className)}>
      {blocks.map((block, index) => {
        const heading = /^\*\*(.+)\*\*$/.exec(block)

        if (heading) {
          return (
            <h3 key={index} className="text-h4 mt-8 mb-3 first:mt-0">
              {heading[1]}
            </h3>
          )
        }

        return <p key={index}>{block}</p>
      })}
    </div>
  )
}
