import Image from 'next/image'
import type { NavLink, TeamMember } from '@/types'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The full team directory on `/about-us/our-doctors`.
 *
 * ⚠️  THESE ARE REAL PEOPLE AND THEIR CREDENTIALS. Every field renders only
 * when present, and that is deliberate: a blank qualification or a missing
 * experience figure must disappear rather than be filled with a plausible
 * guess. The draft is explicit — "include only information that has been
 * verified and approved by the doctor or the organization". Nobody adds a
 * biography, a registration number or a consultation time here from
 * inference; the four fields the draft's template asks for and the roster
 * does not yet carry are listed in `src/data/doctors-page.ts`.
 *
 * ⚠️  THE PREFIX IS NOT COSMETIC. One member of this team is a yoga
 * therapist, not a physician, and `prefix` is empty for him. Rendering a
 * blanket "Dr." would be a false statement about a named person's clinical
 * status. It is printed only when the record carries one.
 *
 * ⚠️  THE CARDS ARE NOT LINKS. `routes.doctor(slug)` resolves for all
 * fifteen and not one of those pages exists, so linking them would be
 * fifteen dead ends. The home-page rail still links them, which is a
 * pre-existing problem on that component rather than something to copy
 * here.
 *
 * FLAT GRID, NOT GROUPED BY SPECIALITY, even though `TeamMember.speciality`
 * is described as the heading a person appears under on this page. Fifteen
 * members spread across ten disciplines means six groups of one: grouping
 * produced rows with a single card and three empty cells, repeatedly. A
 * flat grid of three columns divides into fifteen exactly, and the
 * speciality rides on each card instead, so nothing is lost but the
 * headings — and the section above this one already lists the disciplines.
 *
 * `object-top` on a square crop, because the portraits arrive at four
 * different sizes and aspect ratios (375x375 down to 150x150) and a centre
 * crop takes the top off the taller ones. Two of them are 6KB files that
 * will look soft at this size; they want re-shooting, not upscaling.
 */
export function TeamRoster({
  eyebrow,
  title,
  members,
  cta,
  surface = false,
}: {
  eyebrow: string
  title: string
  members: TeamMember[]
  cta: NavLink
  surface?: boolean
}) {
  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        <Reveal className="max-w-4xl">
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <Reveal
              as="li"
              key={member.slug}
              direction="up"
              delay={(index % 3) * 60}
              className="flex"
            >
              <article className="flex w-full flex-col overflow-hidden rounded-(--radius-card) border border-border bg-surface shadow-(--shadow-card)">
                {member.photo ? (
                  <div className="aspect-square overflow-hidden bg-surface-subtle">
                    <Image
                      src={member.photo.src}
                      alt={member.photo.alt}
                      width={member.photo.width}
                      height={member.photo.height}
                      sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"
                      className="size-full object-cover object-top"
                    />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-6">
                  {member.speciality ? (
                    <p className="text-eyebrow uppercase text-primary-dark">
                      {member.speciality}
                    </p>
                  ) : null}

                  <h3 className="mt-2.5 font-display text-xl font-bold leading-snug text-text">
                    {member.prefix ? `${member.prefix} ` : ''}
                    {member.name}
                  </h3>

                  {member.role ? (
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">
                      {member.role}
                    </p>
                  ) : null}

                  {member.qualifications?.length ? (
                    <ul className="mt-3 space-y-1">
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

                  {member.experienceYears ? (
                    <p className="mt-3 text-sm font-bold text-accent-dark">
                      {member.experienceYears}+ years
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Button
            href={cta.href}
            icon="arrow-right"
            className="mt-12 rounded-(--radius-pill)"
          >
            {cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
