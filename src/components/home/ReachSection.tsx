import { reach } from '@/data/reach'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'
import { ReachExplorer } from './ReachExplorer'

/**
 * "Our Patients Come From" — a draggable globe beside the country list.
 *
 * THE LIST IS THE CONTENT, THE GLOBE IS THE ILLUSTRATION. A canvas cannot be
 * read by a screen reader, so every country is also present as text. The
 * globe is `aria-hidden`; remove it and nothing is lost but the pleasure.
 *
 * ONE LIST, NOT TWO. An earlier version split the countries into "treated"
 * and "enquiries accepted from", because only two are evidenced in AOHC's own
 * published material. Merging them was an explicit instruction and the single
 * list is what ships — but the claim is now a factual statement about the
 * business, so the warning at the top of `src/data/reach.ts` asks for it to be
 * checked against patient records before launch.
 *
 * This stays a server component; only `<ReachExplorer>` needs the client, for
 * the hover state the globe reads.
 */
export function ReachSection() {
  return (
    <section className="relative overflow-hidden bg-brand-teal-950 py-(--spacing-section) text-white">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            onDark
            align="center"
            eyebrow={reach.eyebrow}
            title={reach.title}
            intro={reach.intro}
            className="max-w-3xl"
          />
        </Reveal>

        <Reveal direction="scale" delay={120}>
          <ReachExplorer />
        </Reveal>
      </Container>
    </section>
  )
}
