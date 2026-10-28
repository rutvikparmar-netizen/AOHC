import Image from 'next/image'
import type { AboutContent } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "The Story Behind AOHC" — the founding story, told as an article.
 *
 * ⚠️  THIS IS ABOUT A REAL PERSON WHO DIED. Ruchika Jaiswal is named in the
 * first sentence, so any uncaptioned face in this rail is read as her. The
 * image here is Arpan Talwar — her husband, named in the copy — and it is
 * captioned with whose it is. A stock portrait must never go in this slot,
 * captioned or not; her own portrait belongs to the memorial lower down the
 * page. See the rules at the top of `src/data/about.ts`.
 *
 * SET AS AN ARTICLE, NOT AS A SECTION OF CARDS. Ten paragraphs across two
 * sub-headed passages is reading material, so it gets the shape reading
 * material has: a sticky heading rail on the left holding the eyebrow and
 * the photograph, and a single measured column on the right. A reader who is
 * halfway down the second passage still has the heading in view.
 *
 * THE DEDICATION IS PULLED OUT AND SET LARGE. "AOHC is dedicated to the
 * patient community in her memory" is the sentence the whole section exists
 * for. It also appears in its paragraph, where the supplied copy puts it —
 * it is quoted here rather than moved, so the prose still reads whole.
 */
export function StorySection({ content }: { content: AboutContent['story'] }) {
  return (
    <section className="bg-surface py-(--spacing-section)">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal
            direction="left"
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-eyebrow uppercase text-primary-dark">
              {content.eyebrow}
            </p>

            {/* SQUARE, ON WHITE. The portrait is a 460x460 cut-out on a
                white ground, so the plate is white to match it seamlessly
                and the ratio is square — the old `aspect-4/3` crop was set
                for a landscape stock photograph and would take the top of
                his head and his shoulders off. */}
            <div className="mt-7 overflow-hidden rounded-(--radius-3xl) bg-white">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={content.image.width}
                height={content.image.height}
                sizes="(min-width: 1024px) 420px, 100vw"
                className="aspect-square size-full object-cover"
              />
            </div>

            {/* ⚠️  NOT DECORATION. An uncaptioned face beside a story that
                opens on Ruchika Jaiswal's name is read as Ruchika. */}
            {content.imageCaption ? (
              <p className="mt-3 text-sm text-text-muted">
                {content.imageCaption}
              </p>
            ) : null}

            <p className="mt-7 border-l-2 border-accent pl-5 font-display text-xl font-bold leading-snug text-text">
              {content.dedication}
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            {content.parts.map((part, index) => (
              <Reveal
                key={part.title}
                direction="right"
                delay={index * 80}
                className={index > 0 ? 'mt-14 border-t border-border pt-14' : ''}
              >
                <h2 className="font-display text-h2 font-bold tracking-[-0.02em] text-text">
                  {part.title}
                </h2>

                <div className="mt-6 max-w-(--measure) space-y-5">
                  {part.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-base leading-relaxed text-neutral-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal>
              <Button
                href={content.cta.href}
                variant="secondary"
                icon="arrow-right"
                className="mt-10 rounded-(--radius-pill)"
              >
                {content.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
