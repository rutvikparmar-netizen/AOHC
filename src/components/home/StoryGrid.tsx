import Image from 'next/image'
import type { VideoItem } from '@/types'
import { CardRail } from '@/components/ui/CardRail'
import { Icon } from '@/components/ui/Icon'
import { Todo } from '@/components/ui/Todo'

/**
 * Patient stories — a slider, matching the doctors rail.
 *
 * REPLACES THE FEATURED-PLUS-GRID LAYOUT, which gave the first story four
 * times the weight of the others for no editorial reason and left the
 * remaining six in a cramped block beneath it. Seven stories of equal
 * standing read better as a rail of equals.
 *
 * THE TITLE SITS BELOW THE VIDEO, NOT ON IT. The play button used to land on
 * top of the words baked into the YouTube still. Keeping the title out means
 * the button can never cover it, whatever thumbnail is swapped in later.
 *
 * The link's accessible name is the story title rather than "play", so a
 * screen reader announces which story it is about to open.
 */
export function StoryGrid({ items }: { items: VideoItem[] }) {
  return (
    <div>
      <CardRail
        label="Patient stories"
        onDark
        autoplay
        aside={
          <Todo as="p">
            Thumbnails have titles baked into the image, so the play button sits over
            artwork. Supply clean stills — and check for duplicate portraits.
          </Todo>
        }
      >
        {items.map((item) => (
          <li key={item.href} className="w-[80vw] max-w-sm sm:w-[48vw] lg:w-[24rem]">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-(--radius-2xl) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <div className="relative aspect-16/9 overflow-hidden rounded-(--radius-2xl) border border-white/15 bg-brand-teal-900">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail.src}
                    /* Decorative: the link is named by the visible title. */
                    alt=""
                    width={item.thumbnail.width}
                    height={item.thumbnail.height}
                    sizes="(min-width: 1024px) 384px, 80vw"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : null}

                <span
                  aria-hidden
                  className="absolute inset-0 bg-brand-teal-950/25 transition-colors group-hover:bg-brand-teal-950/5"
                />

                {/* Bottom-right, away from the title text most stills carry
                    on the left. */}
                <span
                  aria-hidden
                  className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-white text-brand-teal-900 shadow-(--shadow-modal) transition-transform duration-300 group-hover:scale-110"
                >
                  <Icon name="play" className="ml-0.5 size-5" />
                </span>
              </div>

              <div className="mt-4">
                {item.caption ? (
                  <span className="inline-flex rounded-(--radius-badge) border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-brand-teal-100">
                    {item.caption}
                  </span>
                ) : null}
                <h3 className="mt-3 text-base font-bold leading-snug text-white group-hover:underline">
                  {item.title}
                </h3>
              </div>
            </a>
          </li>
        ))}
      </CardRail>
    </div>
  )
}
