'use client'

import { useId, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { NavLink, TeamMember } from '@/types'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The team directory on `/about-us/our-doctors` — search, filter by
 * discipline, sort, and a card per specialist.
 *
 * ⚠️  THESE ARE REAL PEOPLE AND THEIR CREDENTIALS. Every field renders only
 * when present, and that is deliberate: a blank qualification or a missing
 * experience figure must disappear rather than be filled with a plausible
 * guess. The draft is explicit — "include only information that has been
 * verified and approved by the doctor or the organization". Nobody adds a
 * biography, a registration number or a consultation time here from
 * inference; the fields the draft's template asks for and the roster does
 * not yet carry are listed in `src/data/doctors-page.ts`.
 *
 * ⚠️  THE PREFIX IS NOT COSMETIC. One member of this team is a yoga
 * therapist, not a physician, and `prefix` is empty for him. Rendering a
 * blanket "Dr." would be a false statement about a named person's clinical
 * status. It is printed only when the record carries one.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THERE IS NO CITY FILTER, AND THERE MUST NOT BE ONE UNTIL THE DATA
 * EXISTS. `TeamMember` carries no location, and several roles name a
 * hospital rather than a city ("Batra Hospital, Delhi", "Fortis Vasant
 * Kunj") — an affiliation, not a consulting address. Deriving a city from
 * those, or assigning one to the members whose role names no hospital at
 * all, would be publishing a made-up fact about where a named doctor can
 * be seen. Add the filter when AOHC supplies the field.
 *
 * ⚠️  FILTERING REPLACED GROUPING, WHICH IS WHY THE GRID IS STILL FLAT.
 * `TeamMember.speciality` is described as the heading a person appears
 * under on this page, but fifteen members across ten disciplines means six
 * groups of one: rendering it as headings produced rows with a single card
 * and two empty cells, repeatedly. The chips give the same grouping on
 * demand — pick a discipline and you get exactly that group — without the
 * empty cells, and the count on each chip says how large the group is
 * before you commit to the click.
 *
 * THE CARDS ARE NOT LINKS. `routes.doctor(slug)` resolves for all fifteen
 * and not one of those pages exists, so linking them would be fifteen dead
 * ends. Only the per-card action is a link, and it goes to the one
 * appointment form.
 *
 * ⚠️  THAT ACTION IS THE SAME LINK ON ALL FIFTEEN CARDS, BECAUSE THERE IS
 * NO PER-DOCTOR BOOKING. `routes.consultation` is `/#appointment`, the
 * general enquiry form. The label therefore says "Request an appointment"
 * and not "Book Dr. X", which would promise a flow that does not exist.
 * Fifteen links sharing one accessible name is allowed precisely because
 * they share one destination. If per-doctor booking is ever built, the
 * honest version carries the name through and the label can change.
 *
 * `object-top` on a square crop, because the portraits arrive at four
 * different sizes and aspect ratios (375x375 down to 150x150) and a centre
 * crop takes the top off the taller ones. Two of them are 6KB files that
 * will look soft at this size; they want re-shooting, not upscaling.
 */

/** Sorts offered above the grid. `roster` is the curated order in the data. */
type Sort = 'roster' | 'name'

const ALL = 'All disciplines'

export function DoctorDirectory({
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
  const uid = useId()
  const [query, setQuery] = useState('')
  const [discipline, setDiscipline] = useState(ALL)
  const [sort, setSort] = useState<Sort>('roster')

  /**
   * The disciplines are DERIVED FROM THE ROSTER, not from the ten-item list
   * in `doctorsPage.disciplines` above this section. That list describes
   * the disciplines a review may involve and carries its own warning that
   * not all of them are available through AOHC directly — using it here
   * would offer chips that filter to nobody, which reads as a roster with
   * people missing rather than as a discipline AOHC does not staff.
   */
  const disciplines = useMemo(() => {
    const counts = new Map<string, number>()
    for (const member of members) {
      if (!member.speciality) continue
      counts.set(member.speciality, (counts.get(member.speciality) ?? 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [members])

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase()

    const matches = members.filter((member) => {
      if (discipline !== ALL && member.speciality !== discipline) return false
      if (!needle) return true

      /* Searched across every field on the card, so that what a reader can
         see is what they can search. Someone who has been told to look for
         "a nuclear medicine physician" rather than a name should still
         land on Dr. Sen. */
      return [
        member.name,
        member.prefix,
        member.role,
        member.speciality,
        ...(member.qualifications ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })

    return sort === 'name'
      ? [...matches].sort((a, b) => a.name.localeCompare(b.name))
      : matches
  }, [members, query, discipline, sort])

  const filtered = query.trim() !== '' || discipline !== ALL
  const reset = () => {
    setQuery('')
    setDiscipline(ALL)
  }

  /* `whitespace-nowrap`: a discipline name that wraps to two lines INSIDE
     its own pill stops reading as a chip and starts reading as a broken
     button — "Ayurveda & Naturopathic Medicine" did exactly that. The row
     wraps; the label does not. */
  const chip = (active: boolean) =>
    `inline-flex min-h-11 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-(--radius-pill) border px-4 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
      active
        ? 'border-accent bg-accent text-white'
        : 'border-border bg-surface text-text-muted hover:border-border-strong hover:text-text'
    }`

  return (
    <section className={`py-(--spacing-section) ${surface ? 'bg-surface' : ''}`}>
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
        </Reveal>

        {/* ── Controls ────────────────────────────────────────────────
            In a panel of their own, because a bare input and a row of
            chips floating on the page read as three unrelated controls.
            The panel is the thing you aim at.

            ⚠️  NOT STICKY. A control bar that follows the reader down a
            fifteen-card grid sounds helpful and is the single most common
            way to cover the focused element — WCAG 2.2's "focus not
            obscured" — on a short list that barely scrolls on a laptop. */}
        <Reveal className="mt-10">
          <div className="rounded-(--radius-2xl) border border-border bg-surface-subtle p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              {/* Search. A visible label, not a placeholder doing the
                  label's job: the placeholder is gone the moment anyone
                  types, and this field is the one a reader returns to. */}
              <div className="lg:max-w-xl lg:flex-1">
                <label
                  htmlFor={`${uid}-search`}
                  className="block text-sm font-bold text-text"
                >
                  Search the team
                </label>
                <div className="relative mt-2">
                  <Icon
                    name="search"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    id={`${uid}-search`}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Name, role or discipline"
                    /* `h-12` rather than a py pair: this is a touch target
                       before it is a text field, and 48px is the floor. */
                    className="h-12 w-full rounded-(--radius-pill) border border-border bg-surface pl-10.5 pr-10 text-base text-text placeholder:text-text-subtle focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-muted hover:text-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                    >
                      <Icon name="x" label="Clear the search" className="size-4" />
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Sort. Two options, so a segmented pair rather than a
                  select: both are readable at a glance and neither costs
                  a click to discover. */}
              <div>
                <p className="text-sm font-bold text-text" id={`${uid}-sort`}>
                  Order
                </p>
                <div
                  role="group"
                  aria-labelledby={`${uid}-sort`}
                  className="mt-2 inline-flex rounded-(--radius-pill) border border-border bg-surface p-1"
                >
                  {(
                    [
                      ['roster', 'Team order'],
                      ['name', 'Name A–Z'],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={sort === value}
                      onClick={() => setSort(value)}
                      className={`min-h-10 cursor-pointer rounded-(--radius-pill) px-4 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        sort === value
                          ? 'bg-primary-subtle text-accent-dark'
                          : 'text-text-muted hover:text-text'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Discipline chips ──────────────────────────────────
                Chips rather than a closed select, because the whole
                taxonomy is ten items and showing it IS the answer to
                "what kind of specialist might I need" — a question this
                page exists to answer. A select hides all ten behind a
                click and tells you nothing about how many people are
                under each.

                `flex-wrap` and never a clipped single row: a chip row
                that cuts off at the container edge hides filter values
                outright, and the labels are discipline names that must
                not be truncated to fit. */}
            <div className="mt-5 border-t border-border pt-5">
              <p className="text-sm font-bold text-text" id={`${uid}-disciplines`}>
                Discipline
              </p>
              {/* ⚠️  A NATIVE PICKER ON PHONES, CHIPS FROM `sm` UP — AND THE
                  SPLIT IS NOT DECORATION. Ten chips at 375px each take a
                  row of their own: the filter became an 800px column that
                  pushed the doctors, which are the point of the page, off
                  the bottom of the screen. The longest discipline name is
                  also wider than the panel at that width, so it wrapped
                  inside its own pill.

                  A `<select>` is the right control there: it is the
                  system's own picker, it costs one line whatever the list
                  length, and it hides nothing — every option is still in
                  it. Chips are better where they fit, because seeing the
                  whole taxonomy at once is itself an answer. Both write
                  the same state. */}
              <div className="mt-2.5 sm:hidden">
                <select
                  aria-labelledby={`${uid}-disciplines`}
                  value={discipline}
                  onChange={(event) => setDiscipline(event.target.value)}
                  className="h-12 w-full cursor-pointer rounded-(--radius-pill) border border-border bg-surface px-4 text-base font-semibold text-text focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                >
                  <option value={ALL}>All disciplines ({members.length})</option>
                  {disciplines.map(([name, count]) => (
                    <option key={name} value={name}>
                      {name} ({count})
                    </option>
                  ))}
                </select>
              </div>

              <div
                role="group"
                aria-labelledby={`${uid}-disciplines`}
                className="mt-2.5 hidden flex-wrap gap-2 sm:flex"
              >
                <button
                  type="button"
                  aria-pressed={discipline === ALL}
                  onClick={() => setDiscipline(ALL)}
                  className={chip(discipline === ALL)}
                >
                  All
                  {/* ⚠️  NO OPACITY ON THE COUNT. It was `opacity-75`, which
                      is how a number that carries real information ends up
                      under 4.5:1 — on the inactive chip it is already the
                      muted text colour, and 75% of that on cream does not
                      pass. The size and weight make it secondary; the
                      colour does not have to. */}
                  <span className="text-xs font-normal">{members.length}</span>
                </button>

                {disciplines.map(([name, count]) => (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={discipline === name}
                    onClick={() => setDiscipline(name)}
                    className={chip(discipline === name)}
                  >
                    {name}
                    <span className="text-xs font-normal">{count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Result count ──────────────────────────────────────────────
            ⚠️  A SENTENCE, NOT A NUMBER, AND `role="status"` RATHER THAN A
            BARE LIVE REGION. Filtering changes the grid silently for
            anyone not watching it; this is the only thing that reports it.
            Announcing "3" on its own tells a screen-reader user nothing,
            so the count is announced as a whole phrase, atomically, and
            without moving focus away from the control just used. */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p role="status" aria-atomic="true" className="text-sm text-text-muted">
            {shown.length === members.length
              ? `All ${members.length} specialists`
              : `${shown.length} of ${members.length} specialists`}
            {discipline === ALL ? '' : ` in ${discipline.toLowerCase()}`}
          </p>

          {filtered ? (
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-semibold text-accent-dark underline underline-offset-4 transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icon name="x" className="size-4" />
              Clear filters
            </button>
          ) : null}
        </div>

        {shown.length === 0 ? (
          /* ⚠️  AN EMPTY RESULT IS A DEAD END UNLESS IT CARRIES THE WAY
             OUT. "No results" and a blank page leaves a reader who is
             already anxious with nothing to press. */
          <div className="mt-8 rounded-(--radius-2xl) border border-dashed border-border-strong bg-surface-subtle p-10 text-center">
            <p className="font-display text-xl font-bold text-text">
              No one matches that yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
              Try a discipline rather than a name, or clear the filters to see the
              whole team. If you are not sure which specialist you need, the care
              team will point you to the right one.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-(--radius-pill) bg-accent px-5 text-sm font-bold text-white transition-colors hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Show the whole team
              </button>
              <Link
                href={cta.href}
                className="inline-flex min-h-11 items-center rounded-(--radius-pill) border border-border-strong bg-surface px-5 text-sm font-bold text-text transition-colors hover:border-accent hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {cta.label}
              </Link>
            </div>
          </div>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((member, index) => (
              <Reveal
                as="li"
                key={member.slug}
                direction="up"
                delay={(index % 3) * 60}
                className="flex"
              >
                <article className="group/card flex w-full flex-col overflow-hidden rounded-(--radius-card) border border-border bg-surface shadow-(--shadow-xs) transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-(--shadow-card-hover)">
                  {member.photo ? (
                    /* The portrait is INSET rather than bled to the card
                       edge: a square photo meeting three hard corners is
                       what made the old card read as a tile of faces, and
                       the frame is what lets a 150x150 file and a 375x375
                       one sit in the same row without the small one
                       looking broken. */
                    <div className="p-3 pb-0">
                      <div className="aspect-square overflow-hidden rounded-(--radius-lg) bg-surface-subtle">
                        <Image
                          src={member.photo.src}
                          alt={member.photo.alt}
                          width={member.photo.width}
                          height={member.photo.height}
                          sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw"
                          className="size-full object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.03]"
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                      {member.speciality ? (
                        <p className="text-eyebrow uppercase text-primary-dark">
                          {member.speciality}
                        </p>
                      ) : null}

                      {/* Only three of the fifteen records carry a figure,
                          so this is an occasional accent rather than a
                          column — and an absent one must stay absent. */}
                      {member.experienceYears ? (
                        <span className="rounded-(--radius-pill) bg-primary-subtle px-2 py-0.5 text-xs font-bold text-accent-dark">
                          {member.experienceYears}+ yrs
                        </span>
                      ) : null}
                    </div>

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

                    {/* `mt-auto` so the action sits on the card's floor
                        whatever the record above it holds — otherwise the
                        member with one qualification line has its link
                        halfway up the card beside one that has three. */}
                    <Link
                      href={cta.href}
                      className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 text-sm font-bold text-accent-dark transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
        )}
      </Container>
    </section>
  )
}
