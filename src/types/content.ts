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
  cta?: NavLink
  image?: ImageAsset
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
  closing: {
    eyebrow: string
    title: string
    body: string[]
    primaryCta: NavLink
    secondaryCta: NavLink
    note: string
    /** Optional: the closing panel currently runs on brand colour, not a photo. */
    image?: ImageAsset
  }

  /* ---- Live-site sections ---- */

  press: PressMention[]

  /**
   * Credential chips under the hero.
   *
   * Every entry is a verifiable statement about an accreditation, affiliation
   * or award — never an outcome, a rating or a round number. `href` carries
   * the citation where one exists.
   */
  heroTrust: { icon: string; label: string; href?: string }[]

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
