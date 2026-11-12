import { makeCaptcha } from '@/lib/forms/captcha'
import { EnquiryForm } from '@/components/forms/EnquiryForm'

/**
 * The enquiry form on every migrated article — the sidebar on desktop,
 * after the article on mobile (placement is `Article`'s job).
 *
 * ⚠️  "ASK", NOT "BOOK". Same reasoning as the closing CTA in
 * `ArticleShell`: a reader of an explainer on an investigational therapy
 * is asking a question, and a booking form here would read as the page
 * selling the therapy it describes.
 *
 * `lang="en"` because the form is English on the Hindi articles too, and
 * sits inside their `lang="hi"` wrapper.
 *
 * The captcha is made when the page is built (the articles are static), as
 * on the home page; its token does not expire, so a built page keeps
 * working. The rate limits in the action are the real defence.
 */
export function ArticleEnquiry() {
  return (
    <section
      lang="en"
      aria-labelledby="article-enquiry-title"
      className="rounded-(--radius-2xl) border border-border bg-surface p-5 shadow-(--shadow-xs) sm:p-6"
    >
      <h2 id="article-enquiry-title" className="font-display text-xl font-bold leading-snug text-text">
        Ask Our Care Team
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Have a question about what you have read, or about your own diagnosis? Send it here and a member of our team will contact you.
      </p>
      <div className="mt-5">
        <EnquiryForm source="article-page" captcha={makeCaptcha()} submitLabel="Send My Question" />
      </div>
    </section>
  )
}
