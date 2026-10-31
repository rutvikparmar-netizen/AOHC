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
  /** The ruled row of trust points under the hero card. */
  points: TrustPoint[]
}

/**
 * One of the four trust points in the ruled row beneath the hero.
 *
 * ⚠️  NO NUMBERS, AND THAT IS THE POINT OF THE SHAPE. There is no `value`
 * field, deliberately: the reference layout this row was taken from leads on
 * "1M+ patient outcomes" and a guaranteed 48-hour turnaround, and the brief
 * that supplied the copy said in terms to avoid claims like those "unless
 * AOHC can substantiate those services and figures". A figure cannot be
 * added here without someone also adding the field to hold it, which is the
 * moment to go and get the evidence. If AOHC later has numbers it can
 * evidence, they belong in `StatItem`, which carries a `basis`.
 *
 * Each point is a short label and one sentence describing how AOHC works —
 * not what it has achieved.
 */
export interface TrustPoint {
  title: string
  description: string
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
   * A photograph behind the hero, held well back behind the dark field.
   *
   * ⚠️  DECORATION, AND IT HAS TO STAY DECORATION. `PageHero` renders it
   * `aria-hidden` with `alt=""` under the teal, so it reads as a change of
   * subject between pages — never as evidence of anything. None of these is
   * AOHC staff, patients or premises, and none of them contains a face:
   * they are generated frames of hands, backs and empty rooms, briefed that
   * way because a recognisable face beside a clinical headline makes a claim
   * about a person who does not exist. Nothing on the page may caption or
   * refer to one. The `alt` on the record is an accurate note of what the
   * frame shows, for a reviewer — the page does not announce it. The same
   * rule governs every image on the home page; see the note on `hero.image`
   * in `src/data/home.ts`.
   *
   * Optional: a page without one keeps the plain dark field, which is a
   * perfectly good hero and was the only arrangement until now.
   */
  image?: ImageAsset
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
 * One entry in a two-column index — a name and one or two paragraphs.
 *
 * Shared by `/cancer-types` and `/treatments-and-therapies`, which list the
 * same shape of thing. Rendered by `EntryGrid`.
 *
 * ⚠️  `icon` IS A SCANNING AID, NOT ANATOMY, and it is optional because
 * only one of the two pages has an honest set. It helps a reader find a
 * row among a dozen headings and is always shown beside the name — never
 * on its own, never in a diagram, and never as though it illustrated the
 * organ. See the block comment above the cancer-type markers in
 * `src/components/ui/Icon.tsx`.
 */
export interface NamedEntry {
  icon?: string
  name: string
  body: string[]
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
   * A multi-line lockup rather than a single-line masthead, which the strip
   * gives roughly double the height so it carries the same optical weight.
   *
   * ⚠️  DECLARED, NOT INFERRED FROM THE ASPECT RATIO, BECAUSE THE RATIO DOES
   * NOT SEPARATE THEM. `PressMarquee` worked this out from width/height for
   * one commit; then a revised IPM mark arrived at 237x94 — ratio 2.52,
   * still three lines of type — while Zee News sits at 2.65 as a single
   * line that reads perfectly at the masthead height. There is no threshold
   * between 2.52 and 2.65 worth trusting, so the fact is stated per logo.
   */
  stacked?: boolean
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
 * TREATMENTS AND THERAPIES — `/treatments-and-therapies`.
 *
 * ⚠️  NOTHING ON THIS PAGE IS AN OFFER, AND THE HERO SAYS SO: the
 * treatments described are "categories that may be relevant to cancer
 * care" whose "availability through AOHC must be confirmed individually".
 * Every entry is written as what a discussion may consider, never as what
 * AOHC provides. Rewriting any of it into a service description would
 * claim a capability nobody has confirmed.
 *
 * ⚠️  THREE SENTENCES CARRY THE MOST WEIGHT and must survive any edit:
 *
 *   - "A molecular finding does not automatically mean that a matching
 *     medicine will be effective." (targeted therapy)
 *   - "Laboratory findings or proposed mechanisms alone do not prove that
 *     these approaches will benefit a patient." (metabolic)
 *   - `safety`, in full. It is the only place on the site that tells a
 *     patient outright not to change treatment on the strength of
 *     something they read here.
 */
export interface TreatmentsContent {
  hero: PageHeroContent

  /** The six conventional treatments, rendered through `EntryGrid`. */
  conventional: {
    eyebrow: string
    title: string
    entries: NamedEntry[]
  }

  /** A titled passage with its own sub-heading and prose. */
  molecular: TitledPassage
  procedures: TitledPassage
  supportive: TitledPassage

  /**
   * The two topics that need the most care — investigational/off-label
   * medicines and metabolic or repurposed ones. They share one dark band
   * because they are the same kind of warning and a reader who has
   * reached either is usually weighing a specific proposal.
   */
  caution: {
    eyebrow: string
    topics: TitledPassage[]
  }

  /** "How Treatment Options Are Evaluated" — a numbered sequence. */
  evaluation: {
    eyebrow: string
    title: string
    intro: string
    items: string[]
  }

  /** ⚠️  Shown in its own panel, never folded into another section. */
  safety: {
    title: string
    body: string
  }

  closing: {
    title: string
    cta: NavLink
  }
}

/**
 * One stage of the patient journey.
 *
 * ⚠️  NO `number` FIELD. The position in the array is the stage number, and
 * `JourneyDeck` prints the index — the supplied copy writes "Stage 1:
 * Make an Enquiry", but holding the numeral in the data as well as the
 * order is how a page comes to show "Stage 4" twice after someone inserts
 * one. Same reasoning as `EnquiryStep`.
 */
export interface JourneyStage {
  title: string
  body: string[]
}

/**
 * YOUR PATIENT JOURNEY — `/patient-journey`.
 *
 * ⚠️  THE WHOLE PAGE IS WRITTEN IN THE CONDITIONAL AND MUST STAY THERE.
 * Every stage says what *may* happen — "the clinical team may consider",
 * "if a treatment plan is proposed", "additional testing is not
 * automatically required". It describes a process, not a promise about
 * what any particular patient will be offered, and rewriting a "may" into
 * a "will" turns a description into a commitment.
 */
export interface PatientJourneyContent {
  hero: PageHeroContent

  stages: {
    eyebrow: string
    title: string
    items: JourneyStage[]
  }

  /** "What You Can Do to Prepare". */
  prepare: ListSection

  /**
   * "You Remain Part of Every Decision".
   *
   * ⚠️  `emphasis` IS A PATIENT-RIGHTS STATEMENT, NOT A PULL QUOTE. It is
   * the supplied line "You should never feel pressured to proceed with a
   * test, treatment, or procedure you do not understand", and it is the
   * only sentence on the page addressed to someone who is being pushed.
   * It gets its own panel for that reason and must not be folded back
   * into the prose to tidy the section.
   */
  consent: {
    eyebrow: string
    title: string
    body: string[]
    emphasis: string
  }

  closing: {
    title: string
    cta: NavLink
  }
}

/** A titled run of prose: heading on the left, paragraphs on the right. */
export interface TitledPassage {
  eyebrow?: string
  title: string
  /** The supplied sub-heading, where the draft has one. */
  subtitle?: string
  body: string[]
}

/**
 * DOCTORS AND SPECIALISTS — `/about-us/our-doctors`.
 *
 * ⚠️  THE ROSTER IS NOT IN THIS TYPE. It lives on `home.team.members`,
 * which is the transcription of artofhealingcancer.com/our-doctors and is
 * already rendered as a preview on the home page. One list, two views —
 * duplicating fifteen real people's names and credentials into a second
 * file is how the two copies start to disagree.
 *
 * ⚠️  THESE ARE REAL PEOPLE AND THEIR CREDENTIALS. `TeamMember` renders
 * each field only when present, so anything unverified must stay absent
 * rather than be filled with a plausible guess. The supplied draft's
 * per-doctor template — biography, areas of clinical focus, professional
 * registration, consultation availability — is reproduced in
 * `src/data/doctors-page.ts` as the spec for what still has to be
 * gathered. None of it may be written by anyone but the doctor or AOHC.
 */
export interface DoctorsPageContent {
  hero: PageHeroContent

  /** "A Multidisciplinary Perspective" — the ten disciplines. */
  disciplines: ListSection

  /** Heading for the roster, which is read from `home.team.members`. */
  team: {
    eyebrow: string
    title: string
    cta: NavLink
  }

  responsibility: TitledPassage

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
    types: NamedEntry[]
  }

  /** "What Information Helps Us Understand Your Case?" */
  documents: ListSection

  closing: {
    title: string
    cta: NavLink
  }
}

/**
 * One stage of the international enquiry process.
 *
 * ⚠️  THERE IS NO `number` OR `label` FIELD, ON PURPOSE. The supplied copy
 * writes "Step 1: Initial Enquiry", but the position in the array is the step
 * number and storing it twice is how the two come to disagree — insert a
 * stage and every label below it is wrong while the markup is still right.
 * `JourneySteps` prints the index.
 *
 * `body` is the prose before the list, `items` the list, `outro` the sentence
 * after it. Only step 2 has a list at all; nothing may assume one.
 *
 * ⚠️  `caution` IS FOR THE TWO SENTENCES THAT PROTECT THE PATIENT, not for a
 * limitation. It carries "do not send full medical records until the team has
 * provided an appropriate secure submission method" and "patients should not
 * travel for treatment without a clear plan" — an instruction a reader can
 * act on and be harmed by missing. The limiting sentences on steps 3 and 4
 * ("a preliminary review cannot guarantee…", "remote consultations… may not
 * replace an in-person examination") are ordinary second paragraphs: they
 * qualify what the step is, and putting four callouts in six cards would mean
 * none of them reads as one.
 */
export interface EnquiryStep {
  title: string
  body: string[]
  items?: string[]
  outro?: string
  caution?: string
}

/**
 * INTERNATIONAL PATIENTS — `/international-patients`.
 *
 * ⚠️  THIS PAGE DESCRIBES A PROCESS. IT CONFIRMS NO SERVICE. The hero's note
 * is the governing sentence — "acceptance for consultation or treatment
 * depends on clinical assessment, service availability, travel feasibility,
 * and applicable requirements" — and every stage below is written as what may
 * be arranged rather than what is provided. One sentence of the supplied
 * draft is deliberately not rendered because it is an instruction to AOHC
 * about what it may advertise; it is quoted in full in
 * `src/data/international-patients.ts`.
 *
 * ⚠️  THE SEVEN CHILD PAGES OF THIS SECTION DO NOT EXIST. `routes.ts` has
 * payments, accommodation, SIM, cash to carry, sightseeing, airport pickup
 * and medical visa, and the header renders them as a dropdown under this
 * page's label. Nothing here may link to them until they are written — step 5
 * names visas, accommodation and interpretation precisely because they are
 * things to ask about, not pages to visit.
 */
export interface InternationalPatientsContent {
  hero: PageHeroContent

  /**
   * The regions a patient may enquire from.
   *
   * `body` is the supplied sentence verbatim; `names` are the region names
   * out of that same sentence, set beside it as a scanning aid. See the
   * component for why both are shown.
   */
  regions: {
    eyebrow: string
    body: string
    names: string[]
  }

  process: {
    eyebrow: string
    title: string
    steps: EnquiryStep[]
  }

  /** "Important Considerations Before Travelling". */
  considerations: ListSection

  caregivers: TitledPassage

  /**
   * NOT A `ClosingPanel`, for the same reason as the other pages built from
   * this draft: that type requires lead paragraphs, two actions and a
   * disclaimer under the buttons, and the supplied copy is a heading and one
   * button.
   */
  closing: {
    title: string
    cta: NavLink
  }
}
