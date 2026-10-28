import type { AboutContent } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "In Loving Memory of Ruchika Jaiswal".
 *
 * ⚠️  NO PHOTOGRAPH, AND THE TYPE HAS NO FIELD FOR ONE. Every image in this
 * repo is Unsplash stock of models. Anything placed beside this heading
 * would be read as a picture of a real woman who died of cancer, by her
 * family among others. If a photograph is ever supplied by the family, with
 * their permission, it goes in then and not before.
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
          <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-teal-200">
            <Icon name="heart" className="size-5" />
          </span>

          <p className="mt-7 text-eyebrow uppercase text-brand-teal-300">
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
