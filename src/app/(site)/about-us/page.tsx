import Image from 'next/image'
import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { about } from '@/data/about'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { ChecklistSection } from '@/components/home/ChecklistSection'
import { ClosingSection } from '@/components/home/ClosingSection'
import { AboutHero } from '@/components/about/AboutHero'
import { StorySection } from '@/components/about/StorySection'
import { PrinciplesSection } from '@/components/about/PrinciplesSection'
import { LabelledList } from '@/components/about/LabelledList'
import { StepsBand } from '@/components/about/StepsBand'
import { MemorialPanel } from '@/components/about/MemorialPanel'

/**
 * ABOUT US — `/about-us`
 *
 * ORDER, which is the supplied document's own: hero → opening statement →
 * the story → our purpose → our philosophy → why personalised → the four
 * steps → our commitment → what we do not promise → in loving memory → our
 * continuing purpose → learn more → disclaimer.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE PAGE MUST OPEN ON SOMETHING DARK. `(site)/layout.tsx` renders
 * `<Header variant="overlay" />` for every route: transparent at rest, white
 * wordmark, white nav. On the warm page colour the entire header disappears.
 * The layout's own note says to pass a solid header from the page instead,
 * but the layout owns the header and the page cannot — so `AboutHero` is
 * dark, and anything that ever replaces it has to be too.
 *
 * ⚠️  IT NAMES A REAL PERSON WHO DIED OF CANCER. Ruchika Jaiswal's story is
 * told twice, as the founding story and as the memorial. Her own portrait,
 * supplied by AOHC, appears once — in the memorial — and nothing stock may
 * ever stand in for her; the other face on the page is Arpan Talwar's and is
 * captioned as his. Her outcome is never presented as a treatment result.
 * The full set of rules is at the top of `src/data/about.ts`; read it before
 * editing either section.
 *
 * ⚠️  ONE LINK ON THIS PAGE 404s. The memorial's "Read Her Story" points at
 * `routes.memorial`, which has no page yet. The story section's CTA jumps to
 * `#in-memory` on this page instead, so only the one link is dangling — it
 * is kept pointing at the real path so no edit is needed once that page
 * ships, but it should ship before this page goes live.
 *
 * NOTHING HERE IS A CARD. The page is long and almost entirely prose, so the
 * grouping is done with rules, numerals and one dark band rather than with
 * borders — the same decision taken across the home page, and the reason
 * `LabelledList` exists instead of two grids of tiles.
 *
 * TWO COMPONENTS ARE SHARED WITH THE HOME PAGE rather than reimplemented:
 * `ChecklistSection` renders "Our Purpose", which is a `ListSection` like the
 * two on the home page, and `ClosingSection` renders "Learn More About Your
 * Options", which is a `ClosingPanel`. Both pages end on the same ask with
 * the same caveat.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'About Us' },
]

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description:
    'The story behind Art of Healing Cancer, our purpose and philosophy, how we approach cancer-care discussions, and what we do and do not promise.',
  canonicalPath: routes.about,
})

export default function AboutPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <AboutHero content={about.hero} trail={trail} />

      {/* ── Opening statement ─────────────────────────────────────────
          The rest of the introduction, which the hero has no room for.
          First paragraph in the display face as a standfirst, the second
          beneath it — the same opener the home page uses, so the two pages
          start the same way. */}
      {/* ⚠️  IT NEEDS BOTTOM PADDING AND THE HOME PAGE'S COPY OF IT DOES NOT.
          This opener was lifted from the home page, where the section below
          shares the page background, so the gap under the last line is just
          the next section's own top padding and no edge is visible. Here the
          story section is `bg-surface`, so there IS an edge — and without
          padding it sat tight against the final line, which read as the
          colour change having been cropped. */}
      <section className="pb-16 pt-14 lg:pb-24 lg:pt-20">
        <Container>
          <Reveal>
            <p className="max-w-5xl font-display text-h3 font-bold leading-snug tracking-[-0.015em] text-text">
              {about.hero.body[0]}
            </p>
          </Reveal>

          <Reveal
            delay={80}
            className="mt-8 max-w-(--measure) border-t border-border pt-8"
          >
            <p className="text-base leading-relaxed text-neutral-700">
              {about.hero.body[1]}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── 1. The story behind AOHC ──────────────────────────────────── */}
      <StorySection content={about.story} />

      {/* ── 2. Our purpose ────────────────────────────────────────────
          A `ListSection`, so it renders through the home page's component. */}
      <ChecklistSection content={about.purpose} />

      {/* ── 3. Our philosophy ─────────────────────────────────────────── */}
      <PrinciplesSection content={about.philosophy} />

      {/* ── 4. Why a personalised approach matters ────────────────────
          Prose first, at a reading measure in two columns, then the list of
          what a discussion may consider. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={about.personalised.eyebrow}
              title={about.personalised.title}
            />
          </Reveal>

          {/* `lg:columns-2` rather than a grid: these five paragraphs are one
              argument read top to bottom, and a grid would split them into
              two independent columns that each start at the top. */}
          <Reveal delay={80} className="mt-8 max-w-5xl lg:columns-2 lg:gap-14">
            {about.personalised.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mb-4 break-inside-avoid text-base leading-relaxed text-neutral-700"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          {/* Breaks up the longest unbroken stretch of prose on the page.
              Wide and shallow rather than a column-height picture, so it
              reads as a rule between the argument and the list that
              follows it instead of competing with either. */}
          {about.personalised.image ? (
            <Reveal delay={120} className="mt-12">
              <div className="overflow-hidden rounded-(--radius-3xl) bg-surface-subtle">
                <Image
                  src={about.personalised.image.src}
                  alt={about.personalised.image.alt}
                  width={about.personalised.image.width}
                  height={about.personalised.image.height}
                  sizes="(min-width: 1024px) 1120px, 100vw"
                  className="aspect-16/9 size-full object-cover lg:aspect-[21/8]"
                />
              </div>
            </Reveal>
          ) : null}

          <Reveal className="mt-14">
            <h3 className="font-display text-h3 font-bold tracking-[-0.02em] text-text">
              {about.personalised.considerTitle}
            </h3>
            <p className="mt-4 max-w-(--measure) text-base leading-relaxed text-neutral-700">
              {about.personalised.considerIntro}
            </p>
          </Reveal>

          <div className="mt-10">
            <LabelledList items={about.personalised.items} />
          </div>

          <Reveal>
            <p className="mt-10 flex max-w-(--measure) gap-3 border-t border-border pt-6 text-sm leading-relaxed text-text-muted">
              <Icon
                name="info"
                className="mt-0.5 size-4 shrink-0 text-primary-dark"
              />
              {about.personalised.outro}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── 5. Understand. Review. Discuss. Plan. ─────────────────────
          The one dark band in the middle of the page. See the component. */}
      <StepsBand content={about.process} />

      {/* ── 6. Our commitment ─────────────────────────────────────────── */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <SectionHeader
                eyebrow={about.commitment.eyebrow}
                title={about.commitment.title}
              />
            </Reveal>
            <Reveal delay={80} className="lg:col-span-5 lg:self-end">
              <p className="max-w-(--measure) text-base leading-relaxed text-neutral-700">
                {about.commitment.intro}
              </p>
            </Reveal>
          </div>

          <div className="mt-12">
            <LabelledList items={about.commitment.items} columns={3} />
          </div>

          <Reveal>
            <p className="mt-10 flex max-w-(--measure) gap-3 border-t border-border pt-6 text-sm leading-relaxed text-text-muted">
              <Icon
                name="info"
                className="mt-0.5 size-4 shrink-0 text-primary-dark"
              />
              {about.commitment.note}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── 7. What we do not promise ─────────────────────────────────
          ⚠️  PROSE, NOT TILES. The home page has a four-item version of this
          material; here the supplied paragraphs are left whole, because
          "we do not promise a cure, a particular survival period, a
          guaranteed treatment response…" is one careful sentence and
          breaking it into cards turns its qualifications into slogans.

          The heading is sticky beside the copy so the reader can see what
          they are reading all the way down it, and `lead` is set large —
          that sentence is the single most important line on the page. */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal
              direction="left"
              className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-accent-subtle text-accent-dark">
                <Icon name="alert-triangle" className="size-5" />
              </span>
              <SectionHeader
                eyebrow={about.honesty.eyebrow}
                title={about.honesty.title}
                className="mt-7"
              />
            </Reveal>

            <Reveal direction="right" delay={80} className="lg:col-span-7">
              <div className="max-w-(--measure) space-y-5">
                {about.honesty.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className={
                      paragraph === about.honesty.lead
                        ? 'border-l-2 border-accent pl-5 font-display text-xl font-bold leading-snug text-text'
                        : 'text-base leading-relaxed text-neutral-700'
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 8. In loving memory ───────────────────────────────────────
          Carries `id="in-memory"`, which the story section links to. */}
      <MemorialPanel content={about.memorial} />

      {/* ── 9. Our continuing purpose ─────────────────────────────────
          A statement, not a section of content: four short paragraphs set
          large, with the last one — "Every treatment decision deserves
          careful consideration" — carrying the page out. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-eyebrow uppercase text-primary-dark">
              {about.continuing.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-h2 font-bold tracking-[-0.02em] text-text">
              {about.continuing.title}
            </h2>

            <div className="mt-7 space-y-4">
              {about.continuing.body.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={
                    index === about.continuing.body.length - 1
                      ? 'font-display text-xl font-bold leading-snug text-text'
                      : 'text-base leading-relaxed text-neutral-700'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 10. Learn more about your options ─────────────────────────
          A `ClosingPanel`, so it renders through the home page's component. */}
      <ClosingSection content={about.closing} />

      {/* ── Medical disclaimer ────────────────────────────────────────
          ⚠️  LAST, AND NOT OPTIONAL. Quiet by design — it is a legal notice
          rather than something to sell — but it must not be dropped or
          shortened to tidy the foot of the page. */}
      <section className="pb-(--spacing-section)">
        <Container>
          <Reveal className="border-t border-border pt-8">
            <h2 className="text-base font-bold text-text">
              {about.disclaimer.title}
            </h2>
            <div className="mt-3 max-w-4xl space-y-3">
              {about.disclaimer.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-sm leading-relaxed text-text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
