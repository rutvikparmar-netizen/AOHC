import Image from 'next/image'
import type { TeamMember } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The team roster on `/about-us/our-doctors`.
 *
 * ⚠️  THESE ARE REAL PEOPLE AND THEIR CREDENTIALS. Every field renders only
 * when present, and that is deliberate: a blank qualification or a missing
 * experience figure must disappear rather than be filled with a plausible
 * guess. The draft is explicit — "include only information that has been
 * verified and approved by the doctor or the organization". The figures and
 * locations here were transcribed from artofhealingcancer.com/our-doctors,
 * which AOHC pointed at as the source; eleven of the fifteen have no stated
 * location and two have no stated experience, and those stay blank.
 *
 * ⚠️  THE PREFIX IS NOT COSMETIC. One member of this team is a yoga
 * therapist, not a physician, and `prefix` is empty for him. Rendering a
 * blanket "Dr." would be a false statement about a named person's clinical
 * status. It is printed only when the record carries one.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * 40 / 60, PORTRAIT TO CREDENTIALS, ON INSTRUCTION. The portrait column was
 * a fixed 160px, which at two cards per row left the picture looking like a
 * thumbnail stuck to the side of a paragraph. A proportional split keeps the
 * same relationship at every width.
 *
 * ⚠️  `object-cover`, AND THE CROP IS HORIZONTAL, NOT VERTICAL.
 * `object-contain` was tried first and is the obvious choice for a set of
 * mixed sizes — until you see it: several of these files are cut-outs with a
 * wide margin of backdrop around the subject, so contain sized them to the
 * column's WIDTH and left a third of a tall card empty above them. The
 * portraits floated; they did not sit in the card. The column is
 * portrait-shaped and the sources are square, so cover scales to the
 * column's HEIGHT and trims the sides — margin, in the files that have it.
 * `object-top` keeps the crop anchored at the hairline, which is the one
 * edge that must never be lost.
 *
 * The two 150x150 files are upscaled by this and will look soft. They want
 * re-shooting, not a different `object-fit`.
 *
 * ⚠️  NO ACTION ON THE CARD. There was a "Request an Appointment" button on
 * every one, removed on instruction — and it was the right call for a
 * reason worth recording: there is no per-doctor booking, so all fifteen
 * went to the same general enquiry form. Fifteen identical buttons promised
 * a choice the site cannot honour. The closing panel carries the action for
 * the page.
 *
 * THE CARDS ARE NOT LINKS EITHER. `routes.doctor(slug)` resolves for all
 * fifteen and not one of those pages exists, so linking them would be
 * fifteen dead ends.
 */

/**
 * ⚠️  ICONS LABEL THE FACTS, THEY DO NOT DECORATE THE CARD. One glyph per
 * KIND of fact — discipline, experience, place, training — so the eye can
 * find "how long has this person been doing this" in fifteen cards without
 * reading fifteen cards. They are `aria-hidden` throughout: every one sits
 * beside text that already says what it is, so announcing them would make a
 * screen reader read each fact twice.
 */
const FACT_ICON = {
  speciality: 'stethoscope',
  experience: 'clock',
  location: 'map-pin',
  qualification: 'award',
} as const

export function TeamRoster({
  eyebrow,
  title,
  intro,
  members,
  surface = false,
}: {
  eyebrow: string
  title: string
  intro?: string
  members: TeamMember[]
  surface?: boolean
}) {
  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
        </Reveal>

        <ul className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2">
          {members.map((member, index) => (
            <Reveal
              as="li"
              key={member.slug}
              direction="up"
              delay={(index % 2) * 70}
              className="flex"
            >
              <article className="flex w-full overflow-hidden rounded-(--radius-card) border border-border bg-surface shadow-(--shadow-xs) transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-(--shadow-card-hover)">
                {member.photo ? (
                  <div className="relative w-2/5 shrink-0 self-stretch bg-surface-subtle">
                    <Image
                      src={member.photo.src}
                      alt={member.photo.alt}
                      width={member.photo.width}
                      height={member.photo.height}
                      sizes="(min-width: 1024px) 280px, 40vw"
                      className="absolute inset-0 size-full object-cover object-top"
                    />
                  </div>
                ) : null}

                <div className="flex min-w-0 w-3/5 flex-1 flex-col gap-2 p-4 sm:p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-text sm:text-lg">
                    {member.prefix ? `${member.prefix} ` : ''}
                    {member.name}
                  </h3>

                  {member.speciality ? (
                    <p className="flex items-start gap-2 text-sm font-semibold text-primary-dark">
                      <Icon
                        name={FACT_ICON.speciality}
                        className="mt-0.5 size-4 shrink-0"
                      />
                      <span className="min-w-0">{member.speciality}</span>
                    </p>
                  ) : null}

                  {member.experienceYears ? (
                    <p className="flex items-start gap-2 text-sm text-text-muted">
                      <Icon
                        name={FACT_ICON.experience}
                        className="mt-0.5 size-4 shrink-0 text-accent-dark"
                      />
                      <span className="min-w-0">
                        <span className="font-bold text-text">
                          {member.experienceYears}+ years
                        </span>{' '}
                        experience
                      </span>
                    </p>
                  ) : null}

                  {member.location ? (
                    <p className="flex items-start gap-2 text-sm text-text-muted">
                      <Icon
                        name={FACT_ICON.location}
                        className="mt-0.5 size-4 shrink-0 text-accent-dark"
                      />
                      <span className="min-w-0 font-bold text-text">
                        {member.location}
                      </span>
                    </p>
                  ) : null}

                  {member.role ? (
                    <p className="flex items-start gap-2 text-sm leading-relaxed text-neutral-700">
                      <Icon
                        name="user"
                        className="mt-0.5 size-4 shrink-0 text-text-subtle"
                      />
                      <span className="min-w-0">{member.role}</span>
                    </p>
                  ) : null}

                  {member.qualifications?.length ? (
                    <ul className="space-y-1.5">
                      {member.qualifications.map((qualification) => (
                        <li
                          key={qualification}
                          className="flex items-start gap-2 text-sm leading-relaxed text-text-muted"
                        >
                          <Icon
                            name={FACT_ICON.qualification}
                            className="mt-0.5 size-4 shrink-0 text-text-subtle"
                          />
                          <span className="min-w-0">{qualification}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
