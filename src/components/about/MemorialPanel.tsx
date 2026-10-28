import Image from 'next/image'
import type { AboutContent } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "In Loving Memory of Ruchika Jaiswal".
 *
 * ⚠️  THE PORTRAIT IS OF A REAL WOMAN WHO DIED OF CANCER, supplied by AOHC.
 * This section carried no image at all until it arrived, and the type had no
 * field for one, because every other picture in this repo is stock of models
 * and any of them here would have been read as her by her family among
 * others. That reasoning has not expired: nothing stock may be substituted
 * into this slot, and if the portrait is withdrawn the section goes back to
 * having no image rather than borrowing one.
 *
 * IT IS SHOWN WHOLE, ON A WHITE PLATE. The file arrives already in a gold
 * memorial surround on a white ground — the family's own framing, which is
 * not ours to crop out. Dropping that straight onto the dark band would put
 * a white rectangle on it, so the plate is pure white and padded: the
 * image's ground and the plate's are the same colour, there is no seam, and
 * the whole thing reads as a framed photograph resting on the panel.
 *
 * NO CAPTION, AND NO HEART ICON ANY MORE. The eyebrow directly beneath the
 * portrait reads "In loving memory of Ruchika Jaiswal", which names her
 * better than a caption repeating it; the icon was standing in for an image
 * that did not exist yet, and a gold filigree frame needs no second ornament.
 *
 * ⚠️  THE LINK 404s TODAY. `routes.memorial` has no page yet. It is left
 * pointing at the real path — see the note on `memorial.cta` in
 * `src/data/about.ts` — but that page should ship before this one goes live.
 *
 * DARK, NARROW, CENTRED, AND SHORT. The section before it is a seven-item
 * grid and the one after is a statement; this needs to stop the page rather
 * than continue it. Centred type on dark at a narrow measure is the quietest
 * way to do that, and the rule above the heading is the only ornament.
 *
 * `id="in-memory"` is the target of the story section's call to action
 * further up the page. Renaming it breaks that link silently.
 */
export function MemorialPanel({
  content,
}: {
  content: AboutContent['memorial']
}) {
  return (
    <section
      id="in-memory"
      className="scroll-mt-28 bg-brand-teal-950 py-(--spacing-section) text-white"
    >
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          {/* 500x402 displayed inside an 18rem plate, so the portrait lands
              at about 248px — comfortably under its native width. It must
              not be set wider than this; see the note on `memorial.image`
              in `src/data/about.ts`. */}
          <div className="mx-auto w-full max-w-72 rounded-(--radius-3xl) bg-white p-4 shadow-2xl shadow-black/30 ring-1 ring-white/15">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              sizes="288px"
              className="h-auto w-full"
            />
          </div>

          <p className="mt-9 text-eyebrow uppercase text-brand-teal-300">
            {content.eyebrow}
          </p>

          <h2 className="mt-4 font-display text-h2 font-bold tracking-[-0.02em] text-white">
            {content.title}
          </h2>

          <div className="mt-7 space-y-4">
            {content.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-relaxed text-brand-teal-100"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Button
            href={content.cta.href}
            variant="onDark"
            icon="arrow-right"
            className="mt-9 rounded-(--radius-pill)"
          >
            {content.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
