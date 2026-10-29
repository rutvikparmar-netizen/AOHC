import type { InternationalPatientsContent } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The regions an international patient may enquire from.
 *
 * ⚠️  IT IS NOT A LIST OF WHO IS ELIGIBLE, and the sentence beside the labels
 * is what says so: patients from these regions "may contact our team to
 * enquire about eligibility and available services". Nothing here may be
 * restyled as a coverage map, a set of offices, or a row of flags — AOHC has
 * no presence in any of them and the supplied copy claims none.
 *
 * ⚠️  "OTHER REGIONS" IS THE LAST LABEL AND MUST STAY. The supplied sentence
 * ends "and other regions"; eight country labels on their own tell a reader
 * in Japan or Brazil that they are not welcome to ask, which is the opposite
 * of what the page says.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE LABELS AND THE SENTENCE SAY THE SAME NAMES, SIDE BY SIDE, DELIBERATELY.
 * This paragraph is the one line on the page that answers "is this page for
 * me", and it answers it thirty words in — a reader looking for their own
 * country should not have to read a sentence about eligibility to find out
 * whether their country is in it. Set as two columns of one row, the labels
 * read as the sentence's list rather than as a repetition of it: the eye
 * takes the names from the right and the condition from the left, which is
 * also why they are not stacked. They are not links, not filters and not
 * selectable; there is nothing behind them.
 *
 * A STRIP, NOT A SECTION. `py-14` rather than `--spacing-section`, because
 * this is the third paragraph of the hero wearing a different shirt — it was
 * held out of `PageHero` only because four paragraphs make that hero a wall,
 * not because it earns a full section's air.
 */
export function RegionBand({
  content,
}: {
  content: InternationalPatientsContent['regions']
}) {
  return (
    <section className="bg-surface py-14 lg:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal direction="left" className="lg:col-span-5">
            <p className="flex items-center gap-2.5 text-eyebrow uppercase text-primary-dark">
              <Icon name="map-pin" className="size-4" />
              {content.eyebrow}
            </p>

            <p className="mt-4 max-w-(--measure) text-base leading-relaxed text-neutral-700">
              {content.body}
            </p>
          </Reveal>

          {/* `lg:self-center` so a two-line wrap of labels sits on the
              paragraph's optical centre rather than its first line. */}
          <Reveal
            direction="right"
            delay={80}
            className="lg:col-span-7 lg:self-center"
          >
            <ul className="flex flex-wrap gap-2.5">
              {content.names.map((name) => (
                <li
                  key={name}
                  className="rounded-(--radius-pill) border border-border-brand bg-primary-subtle px-4 py-2 text-sm font-bold text-text"
                >
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
