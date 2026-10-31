import type { ListSection } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * "A Multidisciplinary Perspective" — the ten disciplines a cancer review
 * may involve, on `/about-us/our-doctors`.
 *
 * ⚠️  THIS EXISTS BECAUSE `ChecklistSection` WAS WRONG FOR THIS CONTENT, NOT
 * BECAUSE IT IS BROKEN. That component renders eight other sections and
 * still should: its list is a set of CONSIDERATIONS — "the available
 * evidence", "what the patient wants" — sentences that are read, where a
 * repeated tick and a hairline rule are exactly right.
 *
 * These ten are not sentences. They are the NAMES OF MEDICAL DISCIPLINES,
 * two or three words each, and run through that component they came out as
 * ten near-identical ticks over ten fragments of text in a three-column
 * grid that left one orphan on the last row. Ten ticks say nothing; the
 * tick is the same mark ten times, so the eye has no way to tell oncology
 * from nutrition without reading every label. AOHC's note was blunt about
 * it and correct.
 *
 * ⚠️  ONE ICON PER DISCIPLINE, AND THE GRID IS FIVE WIDE. Distinct glyphs
 * give the grid ten different shapes to recognise rather than one repeated
 * ten times, which is the whole point — a reader scanning for "is there a
 * nutritionist" finds the leaf before they have read a word. Five columns
 * because there are exactly ten items: 5x2 fills both rows completely,
 * where three columns left a single card stranded on a third row.
 *
 * The icons are `aria-hidden`. Each sits above the discipline's own name,
 * so announcing them would read every item twice.
 *
 * ⚠️  THE OUTRO IS NOT SMALL PRINT AND MUST SURVIVE ANY REDESIGN. "Not
 * every patient requires every specialist, and not all disciplines may be
 * available through AOHC directly" is the sentence that keeps this grid a
 * description of the disciplines a case may involve rather than a menu of
 * ten services AOHC staffs. Ten cards with no caveat is a claim.
 */

/**
 * ⚠️  KEYED BY THE ITEM TEXT, AND THAT IS DELIBERATE RATHER THAN LAZY.
 *
 * The alternative was a parallel `itemIcons` array in the data file, which
 * is a list that silently goes wrong the moment somebody inserts a
 * discipline in the middle — every icon after it shifts by one and nothing
 * fails. Keying on the text cannot shift: an edited label simply falls back
 * to the neutral glyph, which looks slightly plain and is obviously safe.
 *
 * If a discipline is renamed, add the new text here. Nothing breaks until
 * someone notices, which is the right failure mode for decoration.
 */
const DISCIPLINE_ICON: Record<string, IconName> = {
  'Medical oncology.': 'stethoscope',
  'Surgical oncology.': 'hospital',
  'Radiation oncology.': 'target',
  'Pathology.': 'file-search',
  'Radiology and diagnostic imaging.': 'presentation',
  'Molecular diagnostics.': 'droplet',
  'Interventional oncology or radiology.': 'activity',
  'Supportive and palliative care.': 'heart',
  'Nutrition and rehabilitation.': 'leaf',
  'Other relevant medical specialties.': 'users',
}

export function DisciplineGrid({
  content,
  surface = false,
}: {
  content: ListSection
  surface?: boolean
}) {
  const { eyebrow, title, intro, items, outro } = content

  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            intro={intro.join(' ')}
          />
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-12 lg:grid-cols-5">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              direction="up"
              /* Across the row rather than down the column: the stagger
                 should read the way the grid does. */
              delay={(index % 5) * 50}
              className="flex"
            >
              <div className="flex w-full flex-col items-start gap-3 rounded-(--radius-2xl) border border-border bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-border-brand hover:shadow-(--shadow-card)">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-(--radius-lg) bg-primary-subtle text-accent-dark">
                  <Icon
                    name={DISCIPLINE_ICON[item] ?? 'check'}
                    className="size-5"
                  />
                </span>

                {/* The source writes each discipline as a sentence with a
                    full stop. As a card label the stop is noise, so it is
                    trimmed for display only — the data keeps AOHC's
                    wording exactly as supplied. */}
                <span className="text-sm font-semibold leading-snug text-text">
                  {item.replace(/\.$/, '')}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        {outro ? (
          <Reveal>
            <div className="mt-8 flex gap-4 rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-6 sm:gap-5 sm:p-7">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary-dark">
                <Icon name="info" className="size-5" />
              </span>
              <p className="max-w-5xl self-center text-base leading-relaxed text-neutral-700">
                {outro}
              </p>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
