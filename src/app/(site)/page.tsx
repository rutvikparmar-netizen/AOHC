import Image from 'next/image'
import Link from 'next/link'
import { contactRows, home } from '@/data/home'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatBand } from '@/components/ui/StatBand'
import { Todo } from '@/components/ui/Todo'
import { makeCaptcha } from '@/lib/forms/captcha'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { Hero } from '@/components/home/Hero'
import { DoctorsGrid } from '@/components/home/DoctorsGrid'
import { PressMarquee } from '@/components/home/PressMarquee'
import { ReachSection } from '@/components/home/ReachSection'
import { StoryGrid } from '@/components/home/StoryGrid'
import { ProcessPanels } from '@/components/home/ProcessPanels'
import { Reveal } from '@/components/motion/Reveal'
import { Cta } from '@/components/home/Cta'

/**
 * Home page.
 *
 * ORDER: Hero → Press → About → How it works → Who we help → Doctors →
 * Partners & accreditations → Patient stories → International → Contact.
 *
 * TWO DARK SECTIONS ON THE WHOLE PAGE, and no more: patient stories and the
 * footer. Everything else sits on warm off-white with white cards. The page
 * used to alternate dark/teal/light every section, which made it read as a
 * sequence of unrelated slides rather than one document — variety now comes
 * from layout, not background colour.
 *
 * The outcome-statistics band is in the tree but renders nothing: `StatBand`
 * gates itself on every figure having a cited source.
 */
export default function HomePage() {
  /* RGCC and CK Birla appear in both the partners and accreditations lists.
     Merged into one section, so de-duplicate by name. */
  const institutions = [
    ...home.partners.items,
    ...home.accreditations.items.map((a) => ({
      name: a.title,
      relationship: a.detail ?? '',
      location: undefined as string | undefined,
      logo: a.logo,
    })),
  ].filter(
    (entry, index, all) =>
      all.findIndex((other) =>
        other.name.toLowerCase().startsWith(entry.name.toLowerCase().slice(0, 8)),
      ) === index,
  )

  return (
    <>
      {/* The hero promotes the organisation, not any one doctor. */}
      <Hero
        content={home.hero}
        cancerTypes={home.cancerTypes}
        faces={home.testimonials.items.flatMap((item) =>
          item.thumbnail ? [item.thumbnail] : [],
        )}
        trust={home.heroTrust}
      />

      {/* ── Press ─────────────────────────────────────────────────────
          "As featured in" and "In the news" merged into one section. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal>
            <SectionHeader title="Art of Healing in the news" />
          </Reveal>

          <Reveal>
            <PressMarquee items={home.press} />
            <Todo>Masthead logos, each linking to the article</Todo>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.news.items.slice(0, 3).map((item, index) => (
              <Reveal as="li" key={item.headline} direction="up" delay={index * 70}>
                <article className="flex h-full flex-col gap-4 rounded-(--radius-2xl) border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-(--shadow-card-hover)">
                  <span className="inline-flex w-fit rounded-(--radius-badge) bg-primary-subtle px-2.5 py-1 text-xs font-semibold text-primary-dark">
                    {item.publication}
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-text">
                    {item.headline}
                  </h3>
                  <Todo className="mt-auto">Article link</Todo>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── About ─────────────────────────────────────────────────────── */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal direction="left" className="lg:col-span-5">
              <div className="overflow-hidden rounded-(--radius-3xl) bg-surface-subtle lg:aspect-4/5">
                <Image
                  src={home.whoWeAre.image.src}
                  alt={home.whoWeAre.image.alt}
                  width={home.whoWeAre.image.width}
                  height={home.whoWeAre.image.height}
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal direction="right" delay={100} className="lg:col-span-7">
              <SectionHeader
                eyebrow={home.whoWeAre.eyebrow}
                title={home.whoWeAre.title}
              />

              <div className="mt-6 max-w-(--measure) space-y-4">
                {home.whoWeAre.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-base text-neutral-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Button
                href={home.whoWeAre.cta.href}
                variant="secondary"
                icon="arrow-right"
                className="mt-8 rounded-(--radius-pill)"
              >
                {home.whoWeAre.cta.label}
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Where patients come from ──────────────────────────────────
          Moved up to sit directly under "Who we are": the globe is a
          credibility beat, and it reads best straight after the paragraph
          that claims the reach. It also breaks up what was otherwise a long
          run of light sections. The list is the content; the globe is
          aria-hidden illustration. */}
      <ReachSection />

      {/* ── International patients ──────────────────────────────────────
          Kept with the globe rather than left stranded at the foot of the
          page — the two are one topic and were adjacent before the move. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <SectionHeader
                eyebrow={home.international.eyebrow}
                title={home.international.title}
              />
              <div className="mt-6 max-w-(--measure) space-y-4">
                {home.international.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-base text-neutral-700">
                    {paragraph}
                  </p>
                ))}
              </div>
              <Button
                href={home.international.cta.href}
                variant="accent"
                icon="arrow-right"
                className="mt-8 rounded-(--radius-pill)"
              >
                {home.international.cta.label}
              </Button>
            </Reveal>

            <Reveal direction="right" delay={100}>
              <ol className="space-y-4">
                {home.international.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-4 rounded-(--radius-2xl) border border-border bg-background p-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-subtle font-display text-sm font-bold text-accent-dark">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-text">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── How it works ──────────────────────────────────────────────
          An expanding image accordion. See the component for the five
          layouts tried here before and why each was dropped. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal>
            <SectionHeader title={home.process.title} intro={home.process.intro} />
          </Reveal>

          <Reveal className="mt-12">
            <ProcessPanels steps={home.process.steps} />
          </Reveal>

          <Reveal>
            <Cta kind="expert" className="mt-12" />
          </Reveal>
        </Container>
      </section>

      {/* Renders only once every figure carries a source. */}
      <StatBand items={home.stats.items} footnote={home.stats.footnote} />

      {/* ── Who we help ───────────────────────────────────────────────── */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={home.whoWeServe.eyebrow}
              title={home.whoWeServe.title}
              intro={home.whoWeServe.intro}
            />
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {home.whoWeServe.items.map((item, index) => (
              <Reveal as="li" key={item.title} direction="up" delay={index * 60}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col gap-3 rounded-(--radius-2xl) border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary-subtle text-primary-dark transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon name={item.icon as IconName} className="size-5" />
                  </span>
                  <h3 className="text-lg font-bold text-text">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-700">
                    {item.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-accent-dark">
                    Learn more
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}

            {/* Fills what was an empty sixth cell in the three-column grid,
                and catches the reader who saw no card that fits them. */}
            <Reveal as="li" direction="up" delay={home.whoWeServe.items.length * 60}>
              <div className="flex h-full flex-col gap-3 rounded-(--radius-2xl) bg-brand-teal-950 p-6 text-white">
                <span className="flex size-12 items-center justify-center rounded-full bg-white/10 text-brand-teal-300">
                  <Icon name="stethoscope" className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-white">Not sure where you fit?</h3>
                <p className="text-sm leading-relaxed text-brand-teal-100">
                  Tell us about the diagnosis and a member of our clinical team will
                  help you work out the next step.
                </p>
                <div className="mt-auto pt-2">
                  <Cta kind="contact" />
                </div>
              </div>
            </Reveal>
          </ul>
        </Container>
      </section>

      {/* ── Doctors ───────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={home.team.eyebrow}
              title={home.team.title}
              intro={home.team.intro}
            />
          </Reveal>

          <DoctorsGrid members={home.team.members} />

          {/* One action per section. "See the full team" is already a text
              link above the carousel, so it no longer needs a button too. */}
          <Reveal>
            <Cta kind="expert" className="mt-10" />
          </Reveal>
        </Container>
      </section>

      {/* ── Partners & accreditations ─────────────────────────────────
          The two sections merged and de-duplicated. No repeated icon —
          each entry is named in type with its role and location. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={home.partners.eyebrow}
              title="Where your care takes place"
              intro={home.partners.intro}
            />
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {institutions.map((partner, index) => (
              <Reveal as="li" key={partner.name} direction="up" delay={index * 60}>
                <article className="flex h-full flex-col gap-3 rounded-(--radius-2xl) border border-border bg-background p-6">
                  {/* The mark sits on a white plate, because these logos are
                      supplied flat on white and would otherwise sit in a
                      tinted box that is not theirs. `object-contain` so no
                      third party's logo is ever cropped or stretched. */}
                  <div className="flex h-20 items-center justify-center rounded-(--radius-lg) bg-white p-3">
                    {partner.logo ? (
                      <Image
                        src={partner.logo.src}
                        alt={partner.logo.alt}
                        width={partner.logo.width}
                        height={partner.logo.height}
                        sizes="200px"
                        className="max-h-full w-auto object-contain"
                      />
                    ) : (
                      <span className="font-display text-base font-bold text-text-muted">
                        {partner.name}
                      </span>
                    )}
                    <Todo>Logo</Todo>
                  </div>
                  <h3 className="text-lg font-bold text-text">{partner.name}</h3>
                  {partner.relationship ? (
                    <p className="text-sm font-medium text-primary-dark">
                      {partner.relationship}
                    </p>
                  ) : null}
                  {partner.location ? (
                    <p className="inline-flex items-center gap-1.5 text-sm text-text-muted">
                      <Icon name="map-pin" className="size-4" />
                      {partner.location}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <Button
              href={home.partners.cta.href}
              variant="secondary"
              icon="arrow-right"
              className="mt-10 rounded-(--radius-pill)"
            >
              {home.partners.cta.label}
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* ── Patient stories ───────────────────────────────────────────
          DARK SECTION 1 OF 2 (the other is the footer). */}
      <section
        id="stories"
        className="scroll-mt-28 bg-brand-teal-950 py-(--spacing-section) text-white"
      >
        <Container>
          <Reveal>
            <SectionHeader
              onDark
              eyebrow={home.testimonials.eyebrow}
              title={home.testimonials.title}
            />
          </Reveal>

          <Reveal className="mt-10">
            <StoryGrid items={home.testimonials.items} />
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-(--measure) border-t border-white/15 pt-6 text-sm leading-relaxed text-brand-teal-100">
              These are individual experiences. No two patients have the same medical
              circumstances, and one person’s outcome cannot predict another’s. Each
              story is published with the patient’s permission.
            </p>
          </Reveal>

          <Reveal>
            <Cta kind="meeting" className="mt-8" />
          </Reveal>
        </Container>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────
          Details sticky on desktop. The form IS the call to action, so no
          CTA band follows it. */}
      <section
        id="appointment"
        className="scroll-mt-28 bg-surface py-(--spacing-section)"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* `min-w-0` is load-bearing: a grid item defaults to
                `min-width: auto`, so it will not shrink below its content's
                minimum — and the map iframe below has a 300px intrinsic
                width. Without this the column refuses to go under ~323px and
                the whole page scrolls sideways on a 320px phone. */}
            <Reveal
              direction="left"
              className="min-w-0 lg:sticky lg:top-32 lg:self-start"
            >
              <SectionHeader title={home.contact.title} intro={home.contact.subtitle} />

              <ul className="mt-8 space-y-3">
                {contactRows.map((row) => (
                  <li
                    key={row.label}
                    className="flex gap-4 rounded-(--radius-2xl) border border-border bg-background p-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-dark">
                      <Icon name={row.icon} className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-text">{row.label}</p>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="text-sm break-words text-neutral-700 underline-offset-2 hover:underline"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="text-sm text-neutral-700">{row.value}</p>
                      )}
                      {row.label === 'Visit Us' ? (
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(row.value)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark hover:underline"
                        >
                          <Icon name="map-pin" className="size-4" />
                          Open in Google Maps
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Map of the centre. `loading="lazy"` keeps a third-party
                  iframe off the critical path — it sits well below the fold
                  and would otherwise pull in Google's bundle on first paint.
                  Titled, because an untitled iframe is an unnamed landmark. */}
              {site.contact.mapEmbedUrl ? (
                <div className="mt-6 overflow-hidden rounded-(--radius-2xl) border border-border">
                  <iframe
                    src={site.contact.mapEmbedUrl}
                    title="Map showing the Art of Healing Cancer centre in Gurugram"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-64 w-full border-0"
                  />
                </div>
              ) : null}

              <div className="mt-6 rounded-(--radius-2xl) border border-border-brand bg-primary-subtle p-5">
                <p className="text-base font-bold text-text">
                  {home.contact.afterSubmit.title}
                </p>
                <ol className="mt-3 space-y-2">
                  {home.contact.afterSubmit.steps.map((step, index) => (
                    <li key={step} className="flex gap-2.5 text-sm text-neutral-700">
                      <span className="font-bold text-primary-dark">{index + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <Todo className="mt-4">Confirm against the real process</Todo>
              </div>
            </Reveal>

            <Reveal direction="right" delay={100} className="min-w-0">
              <div className="rounded-(--radius-3xl) border border-border bg-background p-6 sm:p-9">
                {/* A fresh challenge per render. The expected answer never
                    reaches the browser — only an HMAC of it. */}
                <EnquiryForm source="contact-page" captcha={makeCaptcha()} />

                <p className="mt-6 border-t border-border pt-5 text-sm text-text-muted">
                  Information on this site is general education, not medical advice.{' '}
                  <Link
                    href={routes.disclaimer}
                    className="font-semibold text-accent-dark underline underline-offset-2"
                  >
                    Read the medical disclaimer
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
