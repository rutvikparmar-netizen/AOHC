import type { BlogPost, Breadcrumb, Doctor, Treatment, Webinar } from '@/types'
import { absoluteUrl, site } from './site'
import { routes } from './routes'

/**
 * JSON-LD graph nodes.
 *
 * SCHEMA CHOICES ARE NOT ARBITRARY HERE. Google treats medical content under
 * its own guidelines, and `MedicalProcedure` / `Physician` / `MedicalWebPage`
 * are the types it reads for it. Marking a treatment page up as a `Product`
 * would be both inaccurate and, for a cancer procedure, grotesque.
 *
 * Each node carries an `@id` so pages can reference the organisation rather
 * than repeating it — one entity, described once.
 */

const ORG_ID = `${site.url}/#organization`
const SITE_ID = `${site.url}/#website`

type JsonLdNode = Record<string, unknown>

export function organizationSchema(): JsonLdNode {
  /**
   * `MedicalOrganization`, not `Organization`.
   *
   * Contact details are included only when `site.contact` actually holds them.
   * An empty `telephone` in structured data is worse than none: it can surface
   * in a knowledge panel as a blank or malformed number.
   */
  const node: JsonLdNode = {
    '@type': 'MedicalOrganization',
    '@id': ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: absoluteUrl('/aohc-logo.png'),
    description: site.description,
    medicalSpecialty: 'Oncologic',
  }

  /* No `telephone`. Schema.org's telephone is a number a caller can ring,
     and AOHC has none — publishing the WhatsApp number there would put a
     "Call" button in search results that reaches a line nobody answers. */
  if (site.contact.email) node.email = site.contact.email
  if (site.contact.address) {
    node.address = { '@type': 'PostalAddress', streetAddress: site.contact.address }
  }

  const social = Object.values(site.social).filter(Boolean)
  if (social.length) node.sameAs = social

  return node
}

export function websiteSchema(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: site.url,
    name: site.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  }
}

export function breadcrumbSchema(trail: Breadcrumb[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  }
}

export function treatmentSchema(treatment: Treatment): JsonLdNode {
  return {
    '@type': 'MedicalProcedure',
    '@id': absoluteUrl(routes.treatment(treatment.slug)) + '#procedure',
    name: treatment.fullName,
    alternateName: treatment.name,
    description: treatment.summary,
    url: absoluteUrl(routes.treatment(treatment.slug)),
    procedureType: 'Percutaneous',
    /** What it is used for, as plain labels. */
    indication: treatment.treats.map((item) => ({
      '@type': 'MedicalIndication',
      name: item,
    })),
    /**
     * Risks are published in the markup as well as on the page.
     *
     * Omitting them while publishing the benefits would present a one-sided
     * summary to anything consuming this feed — an AI answer engine included.
     */
    seriousAdverseOutcome: treatment.risks.map((risk) => ({
      '@type': 'MedicalEntity',
      name: risk,
    })),
    howPerformed: treatment.steps.map((step) => step.title).join('; '),
    provider: { '@id': ORG_ID },
  }
}

export function doctorSchema(doctor: Doctor): JsonLdNode {
  const node: JsonLdNode = {
    '@type': 'Physician',
    '@id': absoluteUrl(routes.doctor(doctor.slug)) + '#physician',
    name: doctor.prefix ? `${doctor.prefix} ${doctor.name}` : doctor.name,
    url: absoluteUrl(routes.doctor(doctor.slug)),
    description: doctor.summary,
    image: absoluteUrl(doctor.photo.src),
    jobTitle: doctor.role,
    medicalSpecialty: doctor.specialities,
    worksFor: { '@id': ORG_ID },
  }

  if (doctor.qualifications.length) {
    node.honorificSuffix = doctor.qualifications.join(', ')
  }

  return node
}

export function articleSchema(post: BlogPost): JsonLdNode {
  return {
    '@type': 'MedicalWebPage',
    '@id': absoluteUrl(routes.article(post.slug)) + '#article',
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(routes.article(post.slug)),
    image: absoluteUrl(post.image.src),
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author.name },
    publisher: { '@id': ORG_ID },
    /** Stated only when a clinician actually signed off. */
    ...(post.review
      ? {
          reviewedBy: { '@type': 'Person', name: post.review.reviewedBy },
          lastReviewed: post.review.reviewedAt,
        }
      : {}),
  }
}

export function webinarSchema(webinar: Webinar): JsonLdNode {
  return {
    '@type': 'Event',
    '@id': absoluteUrl(routes.webinar(webinar.slug)) + '#event',
    name: webinar.title,
    description: webinar.summary,
    url: absoluteUrl(routes.webinar(webinar.slug)),
    startDate: webinar.startsAt,
    endDate: webinar.endsAt,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    /**
     * `VirtualLocation` with the SITE url, not the join link.
     *
     * The join link is sent to registrants by email. Publishing it in
     * structured data would put it in Google's index.
     */
    location: {
      '@type': 'VirtualLocation',
      url: absoluteUrl(routes.webinar(webinar.slug)),
    },
    organizer: { '@id': ORG_ID },
    isAccessibleForFree: true,
  }
}

export function faqSchema(items: Array<{ question: string; answer: string }>): JsonLdNode {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/** Wraps nodes into a single `@graph` document. */
export function jsonLdDocument(nodes: JsonLdNode[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })
}
