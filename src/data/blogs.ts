import type { BlogPost } from '@/types'

/**
 * JOURNAL CONTENT
 * ----------------------------------------------------------------------------
 * Empty, awaiting the real thing. Read by
 * `lib/repositories/demo/blog-repository.ts`.
 *
 * `content` is plain text with blank lines between paragraphs, rendered
 * through `components/ui/Prose.tsx` as `<p>` elements — never through
 * `dangerouslySetInnerHTML`. A line wrapped in `**` becomes a subheading;
 * that is the only markup supported, and it is matched per whole line so a
 * stray asterisk mid-sentence stays an asterisk.
 *
 * `readingTime` is in whole minutes and is stored rather than computed, so
 * cards do not run text analysis at render time.
 */
export const blogPosts: BlogPost[] = []
