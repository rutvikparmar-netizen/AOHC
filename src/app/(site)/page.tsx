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
import { HeroPointsBand } from '@/components/home/HeroPointsBand'
import { DoctorsGrid } from '@/components/home/DoctorsGrid'
import { PressMarquee } from '@/components/home/PressMarquee'
import { NetworkMarquee } from '@/components/home/NetworkMarquee'
import { ReachSection } from '@/components/home/ReachSection'
import { StoryGrid } from '@/components/home/StoryGrid'
import { ProcessPanels } from '@/components/home/ProcessPanels'
import { BlogSection } from '@/components/home/BlogSection'
import { FaqSection } from '@/components/home/FaqSection'
import { ChecklistSection } from '@/components/home/ChecklistSection'
import { ApproachSection } from '@/components/home/ApproachSection'
import { CaseReviewSection } from '@/components/home/CaseReviewSection'
import { ClosingSection } from '@/components/home/ClosingSection'
import { Reveal } from '@/components/motion/Reveal'
import { Cta } from '@/components/home/Cta'

/**
 * Home page.
 *
 * ORDER: Hero → opening statement → Press → About → figures → One diagnosis →
 * Our approach → Case review → Reach → International → How it works → Who we
 * help → Doctors → Partners → Patient stories → When the next step is unclear
 * → Questions → Contact → Knowledge → Closing.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE SUPPLIED HOME-PAGE COPY IS NOW ALL ON THE PAGE. Five of its seven
 * sections had been sitting unrendered in `src/data/home.ts` since the copy
 * was first transcribed — `individual`, `approach`, `complexJourney`,
 * `closing`, and the hero's own body paragraphs. The data was right; the page
 * simply never reached for it.
 *
 * ⚠️  NOTHING EXISTING WAS REPLACED TO MAKE ROOM. In particular `process` —
 * the live site's four-stage treatment approach, with its twelve capability
 * sub-points — is untouched, and the new five-stage sequence sits beside it as
 * `caseReview`. They look similar and are not: one is what AOHC does
 * clinically, the other is what happens to a patient's records between an
 * enquiry and a plan. See the note on `caseReview` in `src/data/home.ts`
 * before merging them.
 *
 * WHERE THE NEW SECTIONS LANDED, AND WHY NOT IN DOCUMENT ORDER. The three
 * framing sections go after the figures, before the globe, so the page
 * explains how it thinks before it claims reach. "When the next step is not
 * clear" goes immediately after the patient stories instead of next to the
 * process: the stories are what a reader scrolls through when they are
 * weighing a second opinion, and that section answers the question those
 * stories raise. It then runs stories → "a review may help clarify…" →
 * questions → form, which is one argument rather than four adjacent topics.
 *
 * BACKGROUNDS STILL ALTERNATE through the insertions — page colour, white,
 * page colour — with one exception worth knowing about: `CaseReviewSection`
 * punches its connecting rule out behind each numbered badge with
 * `ring-background`, so that section has to stay on the page colour. Moving it
 * onto `bg-surface` shows the rings as off-white discs on white.
 *
 * DARK SECTIONS: the globe, the patient stories, and the footer. The closing
 * panel is deliberately light — see the note in `ClosingSection`.
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
      {/* The hero promotes the organisation, not any one doctor.

          ⚠️  NO `cancerTypes` PROP ANY MORE. The nine cancer-type chips
          that used to sit on the floor of the card were replaced by the
          four trust points, on request. `home.cancerTypes` is still in the
          data and nothing renders it; see the note there before deleting
          it or putting the chips back. */}
      <Hero content={home.hero} storyCount={home.testimonials.items.length} />

      {/* ── Hero trust points, phones only ───────────────────────────
          `lg:hidden`. From `lg` the same four render inside the card,
          under a rule, which is the supplied reference's arrangement.
          Inside the card on a 360x800 phone they take the hero to 132%
          of the viewport, so there they sit underneath it instead — see
          the component. */}
      <HeroPointsBand points={home.hero.points} />

      {/* ── Opening statement ─────────────────────────────────────────
          THE HERO'S OWN BODY COPY, which the hero card cannot hold.

          `hero.body` is three paragraphs in the supplied content, and the card
          has room for a headline, a standfirst and a button — on a 390px phone
          it is already capped at roughly one screen, and the whole point of
          that layout was getting the hero down from a screen and a half. The
          paragraphs open the page here instead of being dropped.

          NO HEADING, DELIBERATELY. A heading would make this a section the
          reader has to place; without one it reads as the hero finishing its
          sentence. There is no bottom padding because the press section below
          brings its own.

          ⚠️  SECOND LAYOUT. Three paragraphs capped at `--measure` left the
          right half of the screen empty and read as unstyled body text
          dumped under the hero. Setting the first in the display face as a
          standfirst and running the other two as columns beneath a rule
          makes it an opening statement and uses the width. */}
      <section className="pt-14 lg:pt-20">
        <Container>
          <Reveal>
            <p className="max-w-5xl font-display text-h3 font-bold leading-snug tracking-[-0.015em] text-text">
              {home.hero.body[0]}
            </p>
          </Reveal>

          <Reveal
            delay={80}
            className="mt-8 grid gap-x-14 gap-y-4 border-t border-border pt-8 lg:grid-cols-2"
          >
            {home.hero.body.slice(1).map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-relaxed text-neutral-700"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ── Press ─────────────────────────────────────────────────────
          "As featured in" and "In the news" merged into one section. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal>
            {/* From the data file, not a literal. This heading was written
                out twice — here in lower case and in `home.news.title` in
                title case — and only this copy was on screen, so the data
                value was dead and the two had already drifted. */}
            <SectionHeader title={home.news.title} />
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

      {/* ── Outcome figures ───────────────────────────────────────────
          Directly under "Who we are" on request. It reads as the evidence
          for the paragraph above it rather than as an interruption
          halfway down the page, which is where it used to sit.

          The figures count up the first time they scroll into view. See
          the note in `StatBand` on what they still need. */}
      <StatBand items={home.stats.items} footnote={home.stats.footnote} />

      {/* ── One diagnosis does not tell the whole story ───────────────
          The problem the rest of the page answers, and the right place for it
          is directly after the figures: the band above makes outcome claims,
          and this is the section that says outcomes depend on the individual
          case. Reading them the other way round would be worse. */}
      <ChecklistSection content={home.individual} />

      {/* ── Our approach to integrative cancer care ─────────────────── */}
      <ApproachSection content={home.approach} />

      {/* ── From medical records to informed decisions ────────────────
          Must stay on the page colour — see the note in the component and at
          the top of this file. */}
      <CaseReviewSection content={home.caseReview} />

      {/* ── Where patients come from ──────────────────────────────────
          The globe is a credibility beat and reads best shortly after the
          paragraph that claims the reach. The list is the content; the
          globe is aria-hidden illustration. */}
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

      {/* ── Care network ──────────────────────────────────────────────
          Breadth, immediately before the depth. This strip says how wide
          the network is; the section under it names two institutions with
          the relationship and the city and says who is responsible. CK
          Birla and RGCC appear in both on purpose — see the note on
          `network` in `src/data/home.ts` before removing either.

          ⚠️  THE COPY IN THIS SECTION IS THE ONLY UNREVIEWED TEXT ON THE
          SITE. It was requested from a screenshot of another clinic's
          page, so there was nothing supplied to reproduce; it is written
          plainly to hold the slot until AOHC writes its own. */}
      <NetworkMarquee content={home.network} />

      {/* ── Affiliations & accreditations ─────────────────────────────
          The two source lists merged and de-duplicated. No repeated icon —
          each entry is named in type with its role and location.

          ⚠️  LABELLED FROM `accreditations`, NOT `partners`, BECAUSE THAT IS
          WHAT IS IN IT. Every merged entry is an affiliation or an
          accreditation — "Clinical affiliation", "Accredited diagnostics
          partner", "Accredited partner network" — so "Partnering
          institutions" over "Where your care takes place" described
          something the section does not contain. The eyebrow and heading
          AOHC supplied for exactly this content were sitting unrendered in
          `accreditations` the whole time.

          The title now comes from the data rather than a literal typed
          here, which is the same fault the news heading had: a string
          written out twice drifts, and only one copy is on screen.

          ⚠️  THE INTRO IS STILL `partners.intro`, DELIBERATELY. It carries
          the one sentence on this page that says patients are told which
          clinician is responsible, which facility is involved and what the
          follow-up is — accountability copy that `accreditations.intro`
          does not have, and that is worth more here than a tighter match
          of heading to paragraph. `accreditations.intro` is therefore
          unrendered; it is kept in the data because it is AOHC's supplied
          wording and a reviewer may prefer it. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={home.accreditations.eyebrow}
              title={home.accreditations.title}
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
                      third party's logo is ever cropped or stretched.

                      ⚠️  CAPPED ON BOTH AXES, AND THE PLATE IS TALLER THAN
                      IT LOOKS IT NEEDS TO BE. Height alone was the only
                      limit here, which is the right rule for two long
                      wordmarks and the wrong one the moment a round seal
                      arrives: at the old 56px of plate, CK Birla rendered
                      153x56 and the NABH roundel 58x56 — a third of the
                      area, with ring type far too small to read, even
                      though 366px of plate width was going spare. Raising
                      the plate lets a compact mark earn its height, and the
                      width cap stops the wordmarks ballooning to match.
                      Measured after: 192x70, 136x88, 91x88. */}
                  <div className="flex h-28 items-center justify-center rounded-(--radius-lg) bg-white p-3">
                    {partner.logo ? (
                      <Image
                        src={partner.logo.src}
                        alt={partner.logo.alt}
                        width={partner.logo.width}
                        height={partner.logo.height}
                        sizes="192px"
                        className="max-h-full max-w-48 object-contain"
                      />
                    ) : (
                      <span className="font-display text-base font-bold text-text-muted">
                        {partner.name}
                      </span>
                    )}
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

      {/* ── When the next step is not clear ───────────────────────────
          IMMEDIATELY AFTER THE STORIES, not next to the process section where
          the content draft has it. Someone reading seven patient videos is
          usually weighing whether to ask for another opinion, and this is the
          section that answers that — including the sentence saying what a
          consultation cannot guarantee. No image: every photograph in the repo
          is already used above, and a seventh stock shot would add nothing. */}
      <ChecklistSection content={home.complexJourney} surface />

      {/* ── Questions ─────────────────────────────────────────────────
          Immediately before the form, because most of these are things
          someone would otherwise type into the message box and then wait
          to have answered. */}
      <FaqSection
        eyebrow={home.faqs.eyebrow}
        title={home.faqs.title}
        intro={home.faqs.intro}
        items={home.faqs.items}
      />

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

      {/* ── Knowledge ─────────────────────────────────────────────────
          LAST, BELOW THE FORM, ON REQUEST. It reads as the alternative to
          the form rather than competing with it: someone who is not ready
          to send an enquiry is exactly who wants to go and read first. */}
      <BlogSection
        eyebrow={home.knowledge.eyebrow}
        title={home.knowledge.title}
        intro={home.knowledge.intro}
        items={home.knowledge.items}
        cta={home.knowledge.cta}
      />

      {/* ── Start with a conversation ─────────────────────────────────
          The last word before the footer. Light rather than brand-dark, and
          the only section on the page with two buttons — both explained in
          the component. */}
      <ClosingSection content={home.closing} />
    </>
  )
}
