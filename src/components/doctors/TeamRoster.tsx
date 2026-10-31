import Image from 'next/image'
import Link from 'next/link'
import type { NavLink, TeamMember } from '@/types'
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
 * location and four have no stated experience, and those stay blank.
 *
 * ⚠️  THE PREFIX IS NOT COSMETIC. One member of this team is a yoga
 * therapist, not a physician, and `prefix` is empty for him. Rendering a
 * blanket "Dr." would be a false statement about a named person's clinical
 * status. It is printed only when the record carries one.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE CARD IS HORIZONTAL: portrait left, credentials right, action bottom
 * right. Two per row on desktop rather than three, which is what buys the
 * text column enough width to set a role and two qualification lines
 * without clamping them.
 *
 * ⚠️  THE PORTRAIT COLUMN IS A FIXED WIDTH WITH `object-contain`, NOT A
 * COVER CROP. These fifteen files run from 150x150 to 375x375 and several
 * are cut-outs on a flat backdrop rather than photographs that fill their
 * frame. A cover crop at this aspect took the top of the head off the tall
 * ones and blew the 150px files up past their resolution. Contained on a
 * tinted panel, every one sits at its own size and nothing is cropped.
 *
 * ⚠️  THE ACTION IS THE SAME LINK ON ALL FIFTEEN, BECAUSE THERE IS NO
 * PER-DOCTOR BOOKING. `routes.consultation` is `/#appointment`, the general
 * enquiry form. The label therefore says what it does rather than "Book
 * Dr. X", which would promise a flow that does not exist. Fifteen links
 * sharing one accessible name is allowed precisely because they share one
 * destination.
 *
 * THE CARDS ARE NOT LINKS. `routes.doctor(slug)` resolves for all fifteen
 * and not one of those pages exists, so linking them would be fifteen dead
 * ends. Only the action is a link.
 */
export function TeamRoster({
  eyebrow,
  title,
  intro,
  members,
  cta,
  surface = false,
}: {
  eyebrow: string
  title: string
  intro?: string
  members: TeamMember[]
  cta: NavLink
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
              <article className="group/card flex w-full overflow-hidden rounded-(--radius-card) border border-border bg-surface shadow-(--shadow-xs) transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-(--shadow-card-hover)">
                {member.photo ? (
                  <div className="relative w-32 shrink-0 self-stretch bg-surface-subtle sm:w-40">
                    <Image
                      src={member.photo.src}
                      alt={member.photo.alt}
                      width={member.photo.width}
                      height={member.photo.height}
                      sizes="160px"
                      /**
                       * ⚠️  `object-cover`, AND THE CROP IS HORIZONTAL, NOT
                       * VERTICAL. `object-contain` was tried first and is
                       * the obvious choice for a set of mixed sizes — until
                       * you see it: several of these files are cut-outs with
                       * a wide margin of backdrop around the subject, so
                       * contain sized them to the column's 160px WIDTH and
                       * left a third of a tall card empty above them. The
                       * portraits floated; they did not sit in the card.
                       *
                       * The column is portrait-shaped and the sources are
                       * square, so cover scales to the column's HEIGHT and
                       * trims the sides — margin, in the files that have it.
                       * `object-top` keeps the crop anchored at the
                       * hairline, which is the one edge that must never be
                       * lost.
                       *
                       * The two 150x150 files are upscaled by this and will
                       * look soft. They want re-shooting, not a different
                       * `object-fit`.
                       */
                      className="absolute inset-0 size-full object-cover object-top"
                    />
                  </div>
                ) : null}

                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-lg font-bold leading-snug text-text sm:text-xl">
                    {member.prefix ? `${member.prefix} ` : ''}
                    {member.name}
                  </h3>

                  {member.speciality ? (
                    <p className="mt-1 text-sm font-semibold text-primary-dark">
                      {member.speciality}
                    </p>
                  ) : null}

                  {/* Experience and location on one line, and only the parts
                      that exist: eleven records state no location, so the
                      separator has to belong to the location rather than sit
                      between it and nothing. */}
                  {member.experienceYears || member.location ? (
                    <p className="mt-2 text-sm text-text-muted">
                      {member.experienceYears ? (
                        <>
                          Exp:{' '}
                          <span className="font-bold text-text">
                            {member.experienceYears}+ years
                          </span>
                        </>
                      ) : null}
                      {member.experienceYears && member.location ? ' · ' : ''}
                      {member.location ? (
                        <span className="font-bold text-text">{member.location}</span>
                      ) : null}
                    </p>
                  ) : null}

                  {member.role ? (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                      {member.role}
                    </p>
                  ) : null}

                  {member.qualifications?.length ? (
                    <ul className="mt-2.5 space-y-1">
                      {member.qualifications.map((qualification) => (
                        <li
                          key={qualification}
                          className="text-sm leading-relaxed text-text-muted"
                        >
                          {qualification}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* `mt-auto` and `self-start sm:self-end`: the action sits
                      on the card's floor whatever the record above it holds,
                      so a member with one qualification line does not have
                      its button halfway up the card beside one with three. */}
                  <Link
                    href={cta.href}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-(--radius-pill) bg-accent px-5 text-sm font-bold text-white transition-colors hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:mt-auto sm:self-end"
                  >
                    {cta.label}
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-200 group-hover/card:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
