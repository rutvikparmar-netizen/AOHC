import type { ImageAsset, NavLink, Slug } from './common'
import type { FaqItem } from './treatment'

/**
 * Editorial content for composed pages.
 *
 * Copy lives in `src/data` as plain records rather than inside JSX, so a
 * wording change does not mean editing a component — which matters here
 * because every line is subject to clinical, legal and editorial review.
 */

export interface HeroContent {
  eyebrow: string
  /** Rendered in the display face, uppercase. */
  title: string
  /** The bold standfirst immediately under the title. */
  standfirst: string
  /** Supporting paragraphs, shown beside the title on wide screens. */
  body: string[]
  primaryCta: NavLink
  secondaryCta: NavLink
  image: ImageAsset
}

/** A quick-entry chip — on the home hero, the cancer-type shortcuts. */
export interface ChipLink {
  label: string
  slug: Slug
}

/** An icon + heading + body card. Used for the approach pillars and values. */
export interface PillarItem {
  icon: string
  title: string
  description: string
  href?: string
  /** Present on the approach cards, absent on the icon-only honesty band. */
  image?: ImageAsset
}

/** A numbered step in a process sequence. */
export interface ProcessStep {
  title: string
  description: string
  /** Sub-points listed under the step, as on the live site's process cards. */
  points?: string[]
  /**
   * Optional, because the same shape describes the international-patients
   * steps, which are a plain numbered list with no imagery.
   */
  image?: ImageAsset
}

/**
 * A headline figure.
 *
 * `basis` is REQUIRED and is not decorative. These are outcome claims on a
 * cancer-care site; a percentage with no stated source is a claim nobody can
 * check, and the content draft's checklist (items 28 and 30) asks for exactly
 * this provenance. The component renders it as a footnote.
 */
export interface StatItem {
  value: string
  label: string
  /**
   * The study, audit or dataset behind the figure, printed beneath it.
   *
   * `StatBand` used to hide the entire band while any of these was blank.
   * That gate was removed on the site owner's instruction; an empty string
   * now simply prints nothing. These are outcome claims about cancer
   * treatment, so filling this in is still the right thing to do — see the
   * note at the top of `StatBand`.
   */
  basis: string
  /** Optional link to the source, rendered with the basis. */
  sourceHref?: string
}

/** A titled section with a lead paragraph and a bulleted list. */
export interface ListSection {
  eyebrow: string
  title: string
  /** Paragraphs before the list. */
  intro: string[]
  items: string[]
  /** Paragraph after the list — usually the qualifying sentence. */
  outro?: string
  /**
   * A safety sentence set below `outro` in its own, louder panel.
   *
   * ⚠️  FOR THINGS THAT COULD HARM SOMEONE IF MISSED, not for a second
   * qualifier. It exists because the integrative-care page has two sentences
   * that are a different kind of statement from the rest — "an integrative
   * approach should not delay a time-sensitive, potentially beneficial
   * standard treatment", and the one about supplements interacting with
   * cancer medicines. Folded into `outro` they read as more hedging; a
   * reader who skips them has misread the list above as an offer.
   */
  warning?: string
  cta?: NavLink
  image?: ImageAsset
}

/**
 * The last panel on a page: two actions and the sentence that qualifies them.
 *
 * SHARED BY THE HOME AND ABOUT PAGES, which is why it is its own type rather
 * than inlined into `HomeContent`. Both end on the same ask with the same
 * caveat, and `ClosingSection` renders either.
 */
export interface ClosingPanel {
  eyebrow: string
  title: string
  body: string[]
  primaryCta: NavLink
  secondaryCta: NavLink
  /**
   * The disclaimer under the buttons — that an enquiry guarantees neither a
   * consultation nor an outcome. REQUIRED, and not decorative: it is the last
   * thing read before someone acts.
   */
  note: string
  image?: ImageAsset
}

/**
 * The dark, type-only hero at the top of an inner page.
 *
 * ⚠️  EVERY PAGE HAS TO OPEN ON SOMETHING DARK. `(site)/layout.tsx` renders
 * `<Header variant="overlay" />` for all routes — transparent until you
 * scroll, white wordmark, white nav — so a page that opens on the warm page
 * colour loses its header entirely.
 *
 * `body` takes two paragraphs. They are set as columns under a rule, which
 * is what keeps a type-only hero from leaving half the row empty; one
 * paragraph makes that row look short, and three make the hero a wall.
 */
export interface PageHeroContent {
  eyebrow: string
  title: string
  body: string[]
  /**
   * A qualifying line under the body, set small beside an icon.
   *
   * For the sentence that says what the page is NOT — "the information on
   * this page is educational, it is not a substitute for an individual
   * medical assessment". Kept out of `body` so it does not read as a third
   * selling paragraph, and kept in the hero rather than pushed to the foot
   * because a reader who acts on an educational page has usually acted
   * before reaching the disclaimer.
   */
  note?: string
}

/**
 * A heading with a label and a paragraph, listed as a definition rather than
 * a card. Used for the about page's "What May Be Considered" and "Our
 * Commitment" lists.
 */
export interface LabelledItem {
  icon: string
  label: string
  description: string
}

/* ==========================================================================
   SECTIONS TAKEN FROM THE LIVE SITE (artofhealingcancer.com)
   These have no equivalent in the content draft; the draft describes a
   different, more cautious home page. See the note in `src/data/home.ts`.
   ========================================================================== */

/** A publication that has covered AOHC. Logo strip under the hero. */
export interface PressMention {
  name: string
  /** Supplied once real logo files exist; the strip falls back to a wordmark. */
  logo?: ImageAsset
  /**
   * The article itself, where the URL has been verified. A name without a
   * link is still a claim that the outlet covered AOHC — see the provenance
   * note on each entry in `src/data/home.ts`.
   */
  href?: string
}

/** One of the "Who We Serve" categories. */
export interface ServeItem {
  icon: string
  title: string
  /**
   * `description` and `href` are REQUIRED. As bare titles these were five
   * dead ends — a patient recognised themselves in one, tapped, and nothing
   * happened. A category that cannot explain itself or lead anywhere should
   * be a chip, not a card.
   */
  description: string
  href: string
}

/** A video card in "Expert Insights on Cancer Healing". */
export interface VideoItem {
  /** Overlay title as it appears on the thumbnail. */
  title: string
  /** The caption under the card. */
  caption: string
  href?: string
  thumbnail?: ImageAsset
}

/** An accreditation or affiliation. */
export interface Accreditation {
  title: string
  /** Short qualifier under the title, e.g. the issuing body's country. */
  detail?: string
  logo?: ImageAsset
}

/**
 * A clinician on the "Our Doctors" row.
 *
 * `role`, `qualifications` and `registration` are OPTIONAL AND RENDER ONLY
 * WHEN PRESENT. They are representations about a named person's credentials,
 * and checklist item 25 of the content draft requires each to be verified
 * before publication — so a blank field disappears rather than being filled
 * with a plausible guess.
 */
export interface TeamMember {
  slug: Slug
  name: string
  /**
   * 'Dr.', 'Mr.', or ''.
   *
   * NOT COSMETIC. One member of this team is a yoga therapist, not a
   * physician; rendering "Dr." in front of his name would be a false
   * representation of a real person's clinical status.
   */
  prefix: string
  role?: string
  /** The heading this person appears under on the Our Doctors page. */
  speciality?: string
  /** Whole years, only where the source states a figure. */
  experienceYears?: number
  qualifications?: string[]
  photo?: ImageAsset
  /** Shown on the home-page grid; the rest live on the full team page. */
  featured?: boolean
}

/** A hospital, clinic or laboratory AOHC works with. */
export interface PartnerInstitution {
  name: string
  /** The nature of the relationship, stated accurately — §7 of the draft is
   *  explicit that a referral must not be described as a partnership. */
  relationship: string
  location?: string
  logo?: ImageAsset
}

/** A press article about cancer care. */
export interface NewsItem {
  publication: string
  headline: string
  href?: string
}

/**
 * A teaser for one of the blog's own articles.
 *
 * Deliberately not `BlogPost`. That model is for articles this site hosts —
 * it requires a slug, a body, an image, an author and a published date,
 * none of which a link out to the existing blog has. Forcing these into it
 * would mean inventing five fields to satisfy a type.
 *
 * `readingTime` is a string, not a number of minutes, because it is quoted
 * from the article rather than computed, and it is optional because only
 * some of them print one. An absent value renders nothing; it is never
 * estimated.
 */
export interface KnowledgeTeaser {
  title: string
  /** The article's own category where it prints one, else an editorial label. */
  category: string
  summary: string
  href: string
  readingTime?: string
  /**
   * Decorative only. The blog has no per-article artwork, so these are
   * stock already used elsewhere on the page and the alt text describes the
   * scene rather than the article. See the note in `src/data/home.ts`.
   */
  image: ImageAsset
}

export interface HomeContent {
  hero: HeroContent
  /** Cancer-type shortcuts shown as chips under the hero heading. */
  cancerTypes: ChipLink[]
  individual: ListSection
  approach: {
    eyebrow: string
    title: string
    intro: string
    pillars: PillarItem[]
    outro: string
  }
  process: {
    eyebrow: string
    title: string
    intro: string
    steps: ProcessStep[]
    cta: NavLink
  }
  /**
   * "A Structured Approach to Understanding Your Case".
   *
   * DELIBERATELY NOT `process`. That one is the live site's four-stage
   * TREATMENT approach; this is what happens to a patient's records and case
   * between the first enquiry and a plan. See the note in `src/data/home.ts`.
   *
   * No `intro` and no `cta`, because the supplied copy has neither — a field
   * that would only ever hold an invented sentence is not declared.
   */
  caseReview: {
    eyebrow: string
    title: string
    steps: ProcessStep[]
  }
  /** The live site's headline figures. See `StatItem` on why `basis` exists. */
  stats: {
    items: StatItem[]
    /** Shown under the row. Blank until a source is confirmed. */
    footnote: string
  }
  complexJourney: ListSection
  international: {
    eyebrow: string
    title: string
    body: string[]
    /** The same copy, broken into three short steps so it can be scanned. */
    steps: ProcessStep[]
    cta: NavLink
    image: ImageAsset
  }
  /**
   * The "What We Do Not Promise" band.
   *
   * Occupies the slot a marketing template gives to headline statistics. See
   * the note in `src/data/home.ts` for why it is not statistics.
   */
  honesty: {
    eyebrow: string
    title: string
    intro: string
    items: PillarItem[]
  }
  closing: ClosingPanel

  /* ---- Live-site sections ---- */

  press: PressMention[]

  whoWeAre: {
    eyebrow: string
    title: string
    body: string[]
    cta: NavLink
    image: ImageAsset
  }

  whoWeServe: {
    eyebrow: string
    title: string
    intro: string
    items: ServeItem[]
  }

  insights: {
    title: string
    items: VideoItem[]
  }

  accreditations: {
    eyebrow: string
    title: string
    intro: string
    items: Accreditation[]
  }

  team: {
    eyebrow: string
    title: string
    intro: string
    /** Documented disciplines — §6 of the content draft. */
    disciplines: string[]
    members: TeamMember[]
    cta: NavLink
    /** Shown while the roster is incomplete. Blank hides it. */
    note: string
  }

  partners: {
    eyebrow: string
    title: string
    intro: string
    items: PartnerInstitution[]
    cta: NavLink
  }

  news: {
    title: string
    items: NewsItem[]
  }

  /** The question block above the enquiry form. */
  faqs: {
    eyebrow: string
    title: string
    intro: string
    items: FaqItem[]
  }

  /** The reading section at the foot of the home page. */
  knowledge: {
    eyebrow: string
    title: string
    intro: string
    items: KnowledgeTeaser[]
    cta: NavLink
  }

  testimonials: {
    eyebrow: string
    title: string
    items: VideoItem[]
  }

  contact: {
    title: string
    subtitle: string
    /** "What happens after you submit" — reassurance beside the form. */
    afterSubmit: { title: string; steps: string[] }
  }
}

/* ==========================================================================
   ABOUT PAGE
   ========================================================================== */

/**
 * `/about-us`.
 *
 * ⚠️  THE STORY AND THE MEMORIAL ARE ABOUT A REAL PERSON WHO DIED. Ruchika
 * Jaiswal's journey is the organisation's founding story and is told here
 * with her name. Two rules follow from that and are enforced by the shape of
 * these types rather than left to whoever edits the copy:
 *
 *   - `memorial` HAS NO IMAGE FIELD. Every photograph on this site is stock,
 *     and a stock portrait beside her name would read as a picture of her.
 *     There is no circumstance in which that is acceptable, so the field a
 *     future editor would fill does not exist.
 *   - `story.dedication` is pulled out and set large on the page. It is the
 *     sentence that says what the story is for — a dedication, not a claim
 *     that a treatment worked. The content draft is explicit that her
 *     outcome must never be presented as a result.
 */
export interface AboutContent {
  hero: {
    eyebrow: string
    title: string
    standfirst: string
    /** Shown beneath the hero as the page's opening statement. */
    body: string[]
    image: ImageAsset
  }

  story: {
    eyebrow: string
    /** Two sub-headed passages: the journey, then what it became. */
    parts: { title: string; body: string[] }[]
    /** Set large, on its own. See the warning above. */
    dedication: string
    cta: NavLink
    image: ImageAsset
    /**
     * Who the photograph is of, printed under it.
     *
     * ⚠️  REQUIRED WHENEVER `image` IS A REAL, NAMED PERSON. An uncaptioned
     * face beside this story is read as Ruchika Jaiswal by default, which is
     * the one thing the rules at the top of `src/data/about.ts` forbid.
     */
    imageCaption?: string
  }

  purpose: ListSection

  philosophy: {
    eyebrow: string
    title: string
    intro: string
    principles: { title: string; body: string[] }[]
  }

  personalised: {
    eyebrow: string
    title: string
    body: string[]
    considerTitle: string
    considerIntro: string
    items: LabelledItem[]
    outro: string
    /** Sits between the argument and the list of what a discussion considers. */
    image?: ImageAsset
  }

  process: {
    eyebrow: string
    title: string
    intro: string
    steps: ProcessStep[]
    note: string
  }

  commitment: {
    eyebrow: string
    title: string
    intro: string
    items: LabelledItem[]
    note: string
  }

  /** "What We Do Not Promise" — prose, deliberately not a list of claims. */
  honesty: {
    eyebrow: string
    title: string
    /** The sentence to set apart; must appear in `body` too. */
    lead: string
    body: string[]
  }

  memorial: {
    eyebrow: string
    title: string
    body: string[]
    cta: NavLink
    /**
     * A photograph of Ruchika Jaiswal, supplied by AOHC.
     *
     * ⚠️  THIS FIELD EXISTS FOR EXACTLY ONE PICTURE. It was deliberately
     * absent until AOHC provided her portrait, because every other image in
     * this repo is stock of models and any of them placed here would have
     * been read as her. Nothing stock goes in this slot — if the portrait is
     * ever withdrawn, remove the field again rather than substituting.
     */
    image: ImageAsset
  }

  continuing: {
    eyebrow: string
    title: string
    body: string[]
  }

  closing: ClosingPanel

  disclaimer: {
    title: string
    body: string[]
  }
}

/**
 * INTEGRATIVE CANCER CARE — `/integrative-cancer-care`.
 *
 * ⚠️  THE MOST SAFETY-SENSITIVE PAGE ON THE SITE. It is the one that tells a
 * patient what AOHC thinks about treatments outside routine cancer care, and
 * the supplied copy is careful in a way that is easy to erode by accident.
 * Three things must survive any edit:
 *
 *   1. CONVENTIONAL ONCOLOGY IS NOT OPTIONAL in the copy's framing. "The
 *      objective is not to replace evidence-based oncology with unproven
 *      alternatives" is in the hero, and `conventional.warning` says an
 *      integrative approach "should not delay a time-sensitive, potentially
 *      beneficial standard treatment". Neither may be softened or dropped.
 *   2. NOTHING HERE IS OFFERED. `supportive.outro` says the services "must
 *      be confirmed with AOHC before they are represented as available".
 *      That sentence is what keeps the list above it a description rather
 *      than a menu.
 *   3. `caution` IS A WARNING SECTION, NOT A SERVICE SECTION. It names no
 *      therapy AOHC provides and promises nothing. Its `lead` — that a
 *      rationale or early study "does not establish that a treatment is
 *      safe or effective for a particular patient" — is the page's single
 *      most important sentence.
 */
export interface IntegrativeCareContent {
  hero: PageHeroContent

  definition: {
    eyebrow: string
    title: string
    body: string[]
  }

  conventional: ListSection
  supportive: ListSection

  /** "A Careful Approach to Emerging or Non-Standard Therapies". */
  caution: {
    eyebrow: string
    title: string
    body: string[]
    /** The sentence to set apart. Must also appear in `body`. */
    lead: string
    /** Introduces `items` — the copy's "the clinical team should assess:". */
    itemsIntro: string
    items: string[]
    outro: string
  }

  quality: {
    eyebrow: string
    title: string
    body: string[]
    image?: ImageAsset
  }

  /**
   * NOT A `ClosingPanel`. That type requires lead paragraphs, two actions
   * and a disclaimer under the buttons; the supplied copy for this page is
   * a heading and one button, and the rest would have had to be written.
   * The medical disclaimer that follows the band does the work `note` does
   * elsewhere.
   */
  closing: {
    title: string
    cta: NavLink
  }
}

/**
 * CANCER TYPES — `/cancer-types`.
 *
 * ⚠️  THIS PAGE DESCRIBES WHAT A REVIEW CONSIDERS. IT DOES NOT OFFER
 * TREATMENT FOR ANYTHING IT NAMES. Every entry in `types` is written as
 * "a review may consider…" rather than "we treat…", and the supplied draft
 * is explicit that a cancer type becomes a clinical service page "only
 * after confirming that the team accepts and assesses that cancer type".
 * Nothing here may be rewritten into an offer, and no entry may gain a
 * "Learn more" link until the page behind it exists and that confirmation
 * has happened — see the note on `types` in `src/data/cancer-types.ts`.
 *
 * ⚠️  BLOOD CANCERS CARRY AN EXTRA CONDITION in the draft, recorded with
 * that entry: a service page for them must identify the relevant clinical
 * expertise and scope of care before publication.
 */
export interface CancerTypesContent {
  hero: PageHeroContent

  index: {
    eyebrow: string
    title: string
    /**
     * The entries. Deliberately NOT links — see the warning above.
     *
     * `body` is one or two paragraphs; "Other Cancer Types" has one and
     * the rest have two, so nothing may assume a fixed count.
     *
     * ⚠️  `icon` IS A SCANNING AID, NOT ANATOMY. It helps a reader find
     * their own diagnosis among ten headings and is always shown beside
     * the name — never on its own, never in a diagram, and never as
     * though it illustrated the organ. See the block comment above the
     * cancer-type markers in `src/components/ui/Icon.tsx`.
     */
    types: { icon: string; name: string; body: string[] }[]
  }

  /** "What Information Helps Us Understand Your Case?" */
  documents: ListSection

  closing: {
    title: string
    cta: NavLink
  }
}
