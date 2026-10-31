import Image from 'next/image'
import type { ImageAsset, NavLink } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * The last word before the footer, on every page.
 *
 * ⚠️  THIS IS THE THIRD LAYOUT, AND THE SECOND ONE AOHC REJECTED. Worth
 * knowing what has already been tried:
 *
 *   1. Centred copy in a pale `primary-subtle` box. Washed out — a 1360x580
 *      panel holding four short centred lines, with the page's final call to
 *      action floating in the middle of nothing.
 *   2. A split panel, photograph on one side and the ask on the other. The
 *      shape read as another content row rather than as a closing beat, and
 *      the picture and the words competed for the same width.
 *   3. This: ONE photograph, the ask sitting on it. The image stops being a
 *      sibling of the text and becomes the ground it stands on, which is
 *      what makes a closing panel feel like the end of the page rather than
 *      one more section of it.
 *
 * ⚠️  THE SCRIM IS LOAD-BEARING, NOT STYLING. White text straight onto a
 * photograph is the classic way to ship a contrast failure, because the
 * worst pixel decides and a photograph has no single value. The gradient is
 * opaque brand teal where the words are and thins out to the right, so the
 * picture still reads while the text column never sits on anything lighter
 * than `brand-teal-950/90`. Measured, not assumed — see the note on
 * `--color-text-inverted` usage in `tokens.css`. If the photograph is ever
 * swapped for a lighter one, re-measure rather than trusting this.
 *
 * ⚠️  IT IS DARK, AND THE SECTION PADDING IS WHAT KEEPS IT OFF THE FOOTER.
 * The footer is `brand-teal-950`. The panel is inset inside
 * `py-(--spacing-section)` on the page background and has a 3xl radius, so
 * there is always a band of warm page between the two. Take the padding
 * away and they merge into one dark block with a seam through it — which is
 * exactly why the earlier note on this component insisted it stay light.
 * The inset solves it; a full-bleed dark band here would not.
 *
 * ONE COMPONENT FOR ALL EIGHT PAGES. Six of them used to repeat a thin
 * centred heading-plus-button inline in the page file, which is how the
 * closing beat ended up looking like two different things depending on
 * where you landed. Everything but `title` and `primaryCta` is optional, so
 * a page with only a heading and a button still renders through here.
 *
 * ⚠️  THE NOTE UNDER THE BUTTONS IS NOT DECORATIVE. "A consultation request
 * does not establish a doctor–patient relationship or guarantee acceptance
 * for treatment" is the last thing someone reads before acting, which is
 * exactly where it belongs. It must not be dropped to tidy the panel up.
 */

/**
 * The shared backdrop, used when a page supplies none of its own.
 *
 * ⚠️  ONE PHOTOGRAPH ACROSS THE WHOLE SITE, DELIBERATELY. The closing panel
 * is the same promise on every page; eight different pictures behind it
 * would read as eight different offers. `content.image` is still honoured
 * so a page can override, but nothing does today.
 */
const BACKDROP: ImageAsset = {
  src: '/images/cta-backdrop.webp',
  alt: '',
  width: 1942,
  height: 809,
}

/**
 * Everything but the heading and the first action is optional.
 *
 * `ClosingPanel` from `@/types` satisfies this structurally, so the two
 * rich pages pass theirs straight in; the six thin ones pass a heading and
 * a button and get the same panel with less in it.
 */
export interface ClosingContent {
  eyebrow?: string
  title: string
  body?: string[]
  primaryCta: NavLink
  secondaryCta?: NavLink
  note?: string
  image?: ImageAsset
}

export function ClosingSection({ content }: { content: ClosingContent }) {
  const image = content.image ?? BACKDROP

  return (
    <section className="py-(--spacing-section)">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-(--radius-3xl) px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            {/* `alt=""` and `aria-hidden`: the photograph carries no
                information the words do not, and announcing it would put a
                description between the reader and the action. */}
            <Image
              src={image.src}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 1360px) 1300px, 100vw"
              className="-z-20 object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-linear-to-r from-brand-teal-950 via-brand-teal-950/92 to-brand-teal-950/55"
            />

            {/* The column is narrower than the panel on purpose: it keeps
                the words over the opaque end of the scrim and leaves the
                photograph somewhere to be seen. */}
            <div className="max-w-2xl">
              <SectionHeader
                eyebrow={content.eyebrow}
                title={content.title}
                onDark
              />

              {content.body?.length ? (
                <div className="mt-6 space-y-4">
                  {content.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-base leading-relaxed text-white/85"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                {/* ⚠️  `onDark`, NOT `accent`. The accent button is
                    brand-teal-600 and this panel is brand-teal-950: the
                    label stays legible but the button's own edge nearly
                    disappears into the background, so the primary action
                    stops looking like a button. `onDark` is the white fill
                    that variant exists for. */}
                <Button
                  href={content.primaryCta.href}
                  variant="onDark"
                  size="lg"
                  icon="calendar"
                  iconPosition="start"
                  className="rounded-(--radius-pill)"
                >
                  {content.primaryCta.label}
                </Button>

                {content.secondaryCta ? (
                  /* ⚠️  NOT `variant="secondary"`. That button is drawn for
                     the warm page — a dark label inside a pale outline,
                     which on this panel is a grey ghost. Outlined in white
                     it reads as the second of two actions rather than as a
                     disabled one. */
                  <Button
                    href={content.secondaryCta.href}
                    variant="ghost"
                    size="lg"
                    icon="mail"
                    iconPosition="start"
                    className="rounded-(--radius-pill) border border-white/35 text-white hover:border-white hover:bg-white/10 hover:text-white"
                  >
                    {content.secondaryCta.label}
                  </Button>
                ) : null}
              </div>

              {content.note ? (
                <p className="mt-8 flex gap-3 border-t border-white/20 pt-6 text-sm leading-relaxed text-white/75">
                  <Icon name="info" className="mt-0.5 size-4 shrink-0 text-white/60" />
                  {content.note}
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
