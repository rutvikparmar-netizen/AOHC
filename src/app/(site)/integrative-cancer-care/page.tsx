import Image from 'next/image'
import type { Metadata } from 'next'
import type { Breadcrumb } from '@/types'
import { integrativeCare } from '@/data/integrative-care'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER } from '@/lib/site'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/shared/PageHero'
import { ChecklistSection } from '@/components/home/ChecklistSection'
import { CautionSection } from '@/components/integrative/CautionSection'

/**
 * INTEGRATIVE CANCER CARE — `/integrative-cancer-care`
 *
 * ORDER, which is the supplied document's own: hero → what integrative care
 * is → conventional oncology → supportive and complementary care → emerging
 * and non-standard therapies → quality of life → closing → disclaimer.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE RUNNING ORDER IS AN ARGUMENT, NOT A LIST OF TOPICS. Conventional
 * oncology comes before supportive care, and both come before anything is
 * said about non-standard therapies. A reader who stops a third of the way
 * down has read "standard treatment first" and nothing else. Reordering
 * these sections — putting the interesting ones higher, say — changes what
 * the page says even though every sentence stays the same.
 *
 * ⚠️  THE DISCLAIMER IS NOT OPTIONAL HERE. The supplied copy does not carry
 * one, but this is the page that discusses complementary products and
 * emerging treatments, and `lib/site.ts` says the shared disclaimer "must
 * never be quietly dropped from a page that needs it". The emergency notice
 * goes with it — it is never shown on its own.
 *
 * IT OPENS ON `PageHero`, which is dark because the layout's overlay header
 * disappears on the warm page colour. See the note on that component.
 *
 * THE TWO LIST SECTIONS RENDER THROUGH THE HOME PAGE'S `ChecklistSection`,
 * because they are the same shape: lead, the things that bear on it, and the
 * sentence that qualifies the lot. The second is on `surface` so two long
 * list sections in a row do not read as one.
 */

const trail: Breadcrumb[] = [
  { label: 'Home', href: routes.home },
  { label: 'Integrative Cancer Care' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Integrative Cancer Care',
  description:
    'How AOHC approaches integrative cancer care: conventional oncology alongside appropriate supportive approaches, and a careful assessment of emerging or non-standard therapies.',
  canonicalPath: routes.integrativeCare,
})

export default function IntegrativeCancerCarePage() {
  const { definition, quality, closing } = integrativeCare

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      <PageHero content={integrativeCare.hero} trail={trail} />

      {/* ── 1. What is integrative cancer care? ───────────────────────
          Heading left, prose right. Three paragraphs at a reading measure
          with the heading above them would leave the right half of the row
          empty; beside them it fills the width and the reader can see what
          they are reading all the way down. */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-5">
              <SectionHeader
                eyebrow={definition.eyebrow}
                title={definition.title}
              />
            </Reveal>

            <Reveal direction="right" delay={80} className="lg:col-span-7">
              <div className="max-w-(--measure) space-y-5">
                {definition.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-base leading-relaxed text-neutral-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 2. Conventional oncology remains important ───────────────── */}
      <ChecklistSection content={integrativeCare.conventional} surface />

      {/* ── 3. Supportive and complementary care ─────────────────────── */}
      <ChecklistSection content={integrativeCare.supportive} />

      {/* ── 4. Emerging or non-standard therapies ────────────────────
          The one dark band in the body of the page. See the component —
          it is a warning, not a service. */}
      <CautionSection content={integrativeCare.caution} />

      {/* ── 5. Quality of life ───────────────────────────────────────
          Short, and the only section with a photograph, which is why it
          gets the split rather than one of the longer ones: two paragraphs
          beside a picture balance, where six list items beside one would
          not. */}
      <section className="bg-surface py-(--spacing-section)">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-6">
              <SectionHeader eyebrow={quality.eyebrow} title={quality.title} />

              <div className="mt-6 max-w-(--measure) space-y-5">
                {quality.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-base leading-relaxed text-neutral-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {quality.image ? (
              <Reveal direction="right" delay={80} className="lg:col-span-6">
                <div className="aspect-16/10 overflow-hidden rounded-(--radius-3xl) bg-surface-subtle">
                  <Image
                    src={quality.image.src}
                    alt={quality.image.alt}
                    width={quality.image.width}
                    height={quality.image.height}
                    sizes="(min-width: 1024px) 620px, 100vw"
                    className="size-full object-cover"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      {/* ── 6. Closing ───────────────────────────────────────────────
          ⚠️  DELIBERATELY THINNER THAN THE HOME AND ABOUT CLOSINGS, which
          render through `ClosingSection`. That component's `ClosingPanel`
          requires lead paragraphs, a second action and a disclaimer under
          the buttons; the supplied copy here is a heading and one button,
          and the rest would have had to be written. Send copy for those and
          this becomes a `ClosingPanel` like the others. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-h2 font-bold tracking-[-0.02em] text-text">
              {closing.title}
            </h2>

            <Button
              href={closing.cta.href}
              icon="arrow-right"
              className="mt-8 rounded-(--radius-pill)"
            >
              {closing.cta.label}
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* ── Medical disclaimer ────────────────────────────────────────
          ⚠️  LAST, AND NOT OPTIONAL ON THIS PAGE OF ALL PAGES. Quiet by
          design — it is a legal notice rather than something to sell — but
          it must not be dropped or shortened to tidy the foot of the page.
          Both strings come from `lib/site.ts` so they stay identical
          everywhere they appear. */}
      <section className="pb-(--spacing-section)">
        <Container>
          <Reveal className="border-t border-border pt-8">
            <h2 className="text-base font-bold text-text">Medical Disclaimer</h2>
            <div className="mt-3 max-w-4xl space-y-3">
              <p className="text-sm leading-relaxed text-text-muted">
                {MEDICAL_DISCLAIMER}
              </p>
              <p className="text-sm leading-relaxed text-text-muted">
                {EMERGENCY_NOTICE}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
