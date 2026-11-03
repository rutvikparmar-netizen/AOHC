import type { ArticlePageContent, Breadcrumb } from '@/types'
import { EMERGENCY_NOTICE, MEDICAL_DISCLAIMER } from '@/lib/site'
import { routes } from '@/lib/routes'
import { breadcrumbSchema } from '@/lib/structured-data'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/shared/PageHero'
import { Article } from '@/components/shared/Article'
import { ClosingSection } from '@/components/home/ClosingSection'
import { migratedArticles } from '@/data/articles'

/**
 * The frame every migrated article shares — hero, body, closing CTA and
 * the medical disclaimer.
 *
 * ⚠️  THE DISCLAIMER IS RENDERED HERE RATHER THAN LEFT TO EACH PAGE, which
 * is the whole reason this component exists. Seven routes each pasting
 * their own copy of the notice is seven chances to forget it, and these
 * are the pages on the site that need it most: they describe hydrogen
 * inhalation, electro-capacitive therapy, 2-deoxyglucose and Ayurvedic
 * oncology to people deciding what to do about a cancer diagnosis. A
 * route cannot opt out, because there is no prop to opt out with.
 *
 * Both strings come from `lib/site.ts`, so they stay identical to the ones
 * on `/cancer-types` and `/treatments-and-therapies`.
 */
export function ArticleShell({
  content,
  trail,
}: {
  content: ArticlePageContent
  trail: Breadcrumb[]
}) {
  /**
   * The short overview is the article's own summary sentence from the
   * blog index — itself taken from the article — so the overview box says
   * nothing the article does not. Matched by object identity: every
   * route passes the same object the index holds.
   */
  const summary = migratedArticles.find((a) => a.content === content)?.summary
  const overview = summary ? [summary] : undefined

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(trail)]} />

      {/* ⚠️  THE `lang` WRAPPER COVERS THE HERO AND THE BODY AND NOTHING
          ELSE. Those are the translated parts. The breadcrumb inside the
          hero is English, which is a small inaccuracy and the lesser one:
          splitting the wrapper to exclude it would mean two wrappers
          around a heading and its own article, and a screen reader
          mispronouncing "Home › Blogs" matters far less than it
          mispronouncing a page of Hindi. The closing CTA and the medical
          disclaimer are outside it because they really are English. */}
      <div lang={content.lang}>
        <PageHero content={content.hero} trail={trail} />

        <Article
          lead={content.lead}
          sections={content.sections}
          references={content.references}
          image={content.image}
          overview={overview}
        />
      </div>

      {/* ⚠️  THE CTA GOES TO THE CONTACT PAGE, NOT THE CONSULTATION FORM.
          Someone who has just read an explainer on an unproven therapy is
          not at the point of booking a clinical review, and pushing them
          there would read as the page selling the therapy it just
          described. "Ask a question" is the honest next step. */}
      <ClosingSection
        content={{
          title: 'Have a Question About What You Have Read?',
          primaryCta: { label: 'Contact AOHC', href: routes.contact },
        }}
      />

      <section className="py-(--spacing-section)">
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
