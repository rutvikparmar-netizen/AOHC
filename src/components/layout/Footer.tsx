import Image from 'next/image'
import Link from 'next/link'
import { footerNav, legalNav } from '@/data/navigation'
import { whatsappHref } from '@/lib/format'
import { site } from '@/lib/site'
import { routes } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'

/**
 * Site footer.
 *
 * Copy is section B of the content draft ("Global Footer Copy"), including its
 * "Important medical notice" verbatim.
 *
 * THE MEDICAL NOTICE IS HERE IN FULL, not as a link to a policy page, so it
 * appears on every page of the site including ones with no other clinical
 * furniture. Contact rows render only where `site.contact` holds a real value,
 * so the block shrinks rather than showing an empty label or a dead `tel:`.
 */
export function Footer() {
  const contactRows = [
    site.contact.email && {
      icon: 'mail' as const,
      label: site.contact.email,
      href: `mailto:${site.contact.email}`,
    },
    whatsappHref() && {
      icon: 'message-circle' as const,
      label: 'WhatsApp',
      href: whatsappHref('Hello, I would like to ask about a consultation.'),
    },
    site.contact.address && {
      icon: 'map-pin' as const,
      label: site.contact.address,
      href: '',
    },
  ].filter(Boolean) as Array<{
    icon: 'mail' | 'message-circle' | 'map-pin'
    label: string
    href: string
  }>

  return (
    <footer className="mt-auto bg-brand-teal-950 text-brand-teal-100">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div className="space-y-5">
            <Link href={routes.home} className="inline-block">
              <Image
                src="/aohc-logo.svg"
                alt={site.name}
                width={212}
                height={131}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed">
              Personalized cancer care begins with understanding the individual, the
              diagnosis, and the available clinical information.
            </p>

            {contactRows.length > 0 ? (
              <ul className="space-y-2.5 text-sm">
                {contactRows.map((row) => (
                  <li key={row.label} className="flex items-start gap-2.5">
                    <Icon name={row.icon} className="mt-0.5 size-4 text-brand-teal-300" />
                    {row.href ? (
                      <a href={row.href} className="text-brand-teal-100 hover:text-white hover:underline">
                        {row.label}
                      </a>
                    ) : (
                      <span>{row.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}

            {site.contact.hours ? (
              <p className="text-sm text-brand-teal-300">{site.contact.hours}</p>
            ) : null}

            <Button
              href={routes.consultation}
              variant="accent"
              icon="arrow-right"
              className="rounded-(--radius-pill)"
            >
              Request a Consultation
            </Button>

            {/* WhatsApp and email belong here too — the footer is where
                people look once they have stopped reading and want to act.
                There is no "Call us": see the note in `src/lib/site.ts`. */}
            <div className="flex flex-wrap gap-3">
              {whatsappHref() ? (
                <a
                  href={whatsappHref('Hello, I would like to ask about a consultation.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-(--radius-pill) border border-white/30 px-4 text-sm font-semibold hover:border-brand-teal-300 hover:text-white"
                >
                  <Icon name="message-circle" className="size-4" />
                  Chat on WhatsApp
                </a>
              ) : null}

              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-(--radius-pill) border border-white/30 px-4 text-sm font-semibold hover:border-brand-teal-300 hover:text-white"
              >
                <Icon name="mail" className="size-4" />
                Email us
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.label} aria-label={group.label}>
                <p className="text-eyebrow mb-3 uppercase text-brand-teal-300">{group.label}</p>
                <ul className="space-y-2.5 text-sm">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-brand-teal-100 hover:text-white hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/**
         * The "Important medical notice" block was removed from here on
         * request.
         *
         * ⚠️  The disclaimer is now reachable in exactly two places: the
         * "Read the medical disclaimer" link beside the enquiry form, and the
         * /medical-disclaimer page linked in the small print below. That is
         * thinner coverage than the content draft asks for — its checklist
         * item 35 wants the emergency position unmissable — so if a reviewer
         * pushes back, this block is what they will be asking for.
         */}

        {/* Registered office and GST number. Legally required on an Indian
            commercial site, and distinct from the clinic address above. */}
        <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 text-sm sm:grid-cols-2">
          {site.contact.registeredAddress ? (
            <div>
              <p className="text-brand-teal-300">Registered address</p>
              <p className="mt-1 text-brand-teal-100">
                {site.contact.registeredAddress}
              </p>
            </div>
          ) : null}

          {site.contact.gstin ? (
            <div className="sm:text-right">
              <p className="text-brand-teal-300">GSTIN</p>
              <p className="mt-1 font-medium tabular-nums text-brand-teal-100">
                {site.contact.gstin}
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-brand-teal-100 hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
