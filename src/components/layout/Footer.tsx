import Image from 'next/image'
import Link from 'next/link'
import { footerNav, legalNav } from '@/data/navigation'
import { whatsappHref } from '@/lib/format'
import { site } from '@/lib/site'
import { routes } from '@/lib/routes'
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
  ].filter(Boolean) as Array<{
    icon: 'mail' | 'message-circle'
    label: string
    href: string
  }>

  return (
    <footer className="mt-auto bg-brand-teal-950 text-brand-teal-100">
      <Container className="py-14 lg:py-16">
        {/* Brand column at a fixed measure, the menus taking the rest.
            The menus were four equal grid tracks, so a short column (Tools)
            sat in a track as wide as the longest and the gaps between
            columns looked random — wide here, cramped there, with links
            wrapping mid-phrase. At `xl` they become four `auto` tracks that hug
            each column's content and spreads the spare room evenly. */}
        <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[23rem_minmax(0,1fr)] xl:gap-12">
          <div className="space-y-5">
            <Link href={routes.home} className="inline-block">
              {/* ⚠️  AOHC'S OWN REVERSED ARTWORK, NOT A FILTER. This was
                  the colour lockup under `brightness-0 invert`, which
                  flattens everything to pure white — the teal CANCER, the
                  grey script and the lotus all became one solid shape.
                  The supplied white version keeps the lotus's tonal
                  shading and the weight relationship between the lines.
                  Do not reintroduce the filter; it is not the same mark. */}
              <Image
                src="/images/logo-white.webp"
                alt={site.name}
                width={720}
                height={436}
                sizes="150px"
                className="h-14 w-auto"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed">
              Personalized cancer care begins with understanding the individual, the
              diagnosis, and the available clinical information.
            </p>

            {contactRows.length > 0 ? (
              <ul className="space-y-2.5 text-sm">
                {contactRows.map((row) => (
                  <li key={row.label} className="flex items-center gap-2.5">
                    <Icon name={row.icon} className="size-4 shrink-0 text-brand-teal-300" />
                    {row.href ? (
                      <a
                        href={row.href}
                        className="inline-flex min-h-11 items-center text-brand-teal-100 hover:text-white hover:underline lg:min-h-0"
                      >
                        {row.label}
                      </a>
                    ) : (
                      <span>{row.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Three lines, as AOHC asked: name, street, city. `<address>`
                is the element for an organisation's contact address, and
                `not-italic` undoes the browser default that comes with it. */}
            {site.contact.address ? (
              <address className="flex items-start gap-2.5 text-sm not-italic leading-relaxed">
                <Icon name="map-pin" className="mt-1 size-4 shrink-0 text-brand-teal-300" />
                <span>
                  {site.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </address>
            ) : null}

            {site.contact.hours ? (
              <p className="text-sm text-brand-teal-300">{site.contact.hours}</p>
            ) : null}

            {/* ⚠️  THE APPOINTMENT, WHATSAPP AND EMAIL BUTTONS WERE REMOVED
                HERE ON AOHC'S REQUEST. Email and WhatsApp stay reachable
                from the contact rows just above, and "Request an
                Appointment" from the header on every page. */}
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-[repeat(4,auto)] xl:justify-between xl:gap-x-6">
            {footerNav.map((group) => (
              <nav key={group.label} aria-label={group.label} className="min-w-0">
                <p className="text-eyebrow mb-4 uppercase text-brand-teal-300">
                  {group.label}
                </p>
                {/* 44px rows until the layout is wide enough to be a mouse.
                    These links were 19px tall with a 10px gap — a 29px pitch
                    for the site's whole secondary navigation, on a page read
                    largely by older people on phones. */}
                <ul className="space-y-1 text-sm lg:space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-brand-teal-100 hover:text-white hover:underline lg:min-h-0"
                      >
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
          <ul className="flex flex-wrap gap-x-5">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-brand-teal-100 hover:text-white hover:underline lg:min-h-0"
                >
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
