import Image from 'next/image'
import Link from 'next/link'
import type { TeamMember } from '@/types'
import { routes } from '@/lib/routes'
import { CardRail } from '@/components/ui/CardRail'
import { Icon } from '@/components/ui/Icon'

/**
 * The doctors slider on the home page.
 *
 * A PREVIEW, NOT THE DIRECTORY. It shows the first seven of the team and
 * sends people to the doctors page for the rest, where the specialty filter
 * now lives. Filtering here duplicated that page's job and put a row of
 * controls in front of a reader who had not yet asked to narrow anything.
 *
 * No state, so no `'use client'` — `CardRail` is the only client component
 * involved.
 *
 * CARD TREATMENT FOLLOWS THE REFERENCE: a tall image with the name laid over
 * its foot and a circular arrow in the corner. The whole card is the link —
 * the arrow is an affordance, not a second target, so there is one tap area
 * rather than two overlapping ones.
 */

/** How many of the team appear before the link to the full directory. */
const PREVIEW_COUNT = 7

export function DoctorsGrid({ members }: { members: TeamMember[] }) {
  const shown = members.slice(0, PREVIEW_COUNT)

  return (
    <div className="mt-10">
      <CardRail
        label="Our doctors"
        autoplay
        aside={
          members.length > shown.length ? (
            <p className="text-sm text-text-muted">
              Showing {shown.length} of {members.length} specialists.{' '}
              <Link
                href={routes.doctors}
                className="font-semibold text-accent-dark underline-offset-4 hover:underline"
              >
                See the full team
              </Link>
              .
            </p>
          ) : null
        }
      >
        {shown.map((member) => (
          <li
            key={member.slug}
            className="w-[72vw] max-w-xs sm:w-[44vw] lg:w-[21rem]"
          >
            <Link
              href={routes.doctor(member.slug)}
              className="group relative block overflow-hidden rounded-(--radius-2xl) bg-brand-teal-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <div className="aspect-4/5 overflow-hidden">
                {member.photo ? (
                  <Image
                    src={member.photo.src}
                    alt={member.photo.alt}
                    width={member.photo.width}
                    height={member.photo.height}
                    sizes="(min-width: 1024px) 340px, 72vw"
                    className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : null}
              </div>

              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-brand-teal-950 via-brand-teal-950/70 to-transparent"
              />

              {member.speciality ? (
                <span className="absolute left-4 top-4 rounded-(--radius-badge) border border-white/20 bg-brand-teal-950/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {member.speciality}
                </span>
              ) : null}

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-snug text-white">
                    {member.prefix ? `${member.prefix} ` : ''}
                    {member.name}
                  </h3>
                  {member.role ? (
                    <p className="mt-1 line-clamp-2-safe text-xs leading-relaxed text-white/75">
                      {member.role}
                    </p>
                  ) : null}
                  {member.experienceYears ? (
                    <p className="mt-1.5 text-xs font-semibold text-brand-teal-300">
                      {member.experienceYears}+ years
                    </p>
                  ) : null}
                </div>

                {/* Affordance only — the card itself is the link. */}
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-teal-900 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <Icon name="arrow-right" className="size-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </CardRail>
    </div>
  )
}
