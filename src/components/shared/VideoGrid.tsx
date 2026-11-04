import Image from 'next/image'
import type { VideoItem } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Patient testimonial videos as a grid, for light pages.
 *
 * ⚠️  NOT `VideoCarousel`. That one is the home page's rail and is styled
 * for the dark band it sits on — white titles, white arrow buttons. Put on
 * a light page it rendered as thumbnails with invisible titles and a row
 * running off the right edge; AOHC asked for a grid instead. Same data
 * (`home.testimonials.items`), so the two cannot list different videos.
 *
 * Each card is a plain link to YouTube; nothing here needs JavaScript.
 */
export function VideoGrid({ items }: { items: VideoItem[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal as="li" key={item.href} delay={Math.min(index, 5) * 50} className="min-w-0">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-(--radius-2xl) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <div className="relative aspect-16/9 overflow-hidden rounded-(--radius-2xl) border border-border bg-brand-teal-900 shadow-(--shadow-card) transition-shadow duration-300 group-hover:shadow-(--shadow-card-hover)">
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail.src}
                  alt=""
                  width={item.thumbnail.width}
                  height={item.thumbnail.height}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="size-full object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.04]"
                />
              ) : null}
              <span
                aria-hidden
                className="absolute inset-0 bg-brand-teal-950/20 transition-colors group-hover:bg-brand-teal-950/5"
              />
              <span
                aria-hidden
                className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-white/95 text-brand-teal-900 shadow-(--shadow-modal) transition-transform duration-500 ease-(--ease-back-out) group-hover:scale-110"
              >
                <Icon name="play" className="ml-0.5 size-5" />
              </span>
            </div>

            {item.caption ? (
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary-dark">
                {item.caption}
              </p>
            ) : null}
            <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-text transition-colors group-hover:text-accent-dark">
              {item.title}
              <span className="sr-only"> (opens YouTube in a new tab)</span>
            </h3>
          </a>
        </Reveal>
      ))}
    </ul>
  )
}
