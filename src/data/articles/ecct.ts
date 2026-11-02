import type { ArticlePageContent } from '@/types'

/**
 * WHAT IS ECCT? — ELECTRO-CAPACITIVE CANCER THERAPY
 * ----------------------------------------------------------------------------
 * Migrated from https://artofhealingcancer.com/ecct/ and kept at that URL.
 *
 * ⚠️  THE SOURCE PAGE'S OPENING SENTENCE IS TRUNCATED MID-SENTENCE, AND
 * THAT IS NOT A TRANSCRIPTION FAULT. The live HTML reads, in full:
 *
 *     "ECCT (Electro-Capacitive Cancer Therapy) is a method for treating
 *      cancer using low intensity and low frequency source (frequency"
 *
 * — and then the element ends. Checked against the raw markup, not a text
 * extraction. IT IS OMITTED HERE. Reproducing a sentence that stops in the
 * middle of a parenthesis would carry a visible defect onto a new site,
 * and finishing it would mean inventing the frequency and intensity
 * figures for a cancer therapy, which is the last thing anyone should
 * guess at. The page therefore opens on the "Principles" paragraph, which
 * does define ECCT. RESTORE THE FULL SENTENCE WHEN AOHC SUPPLIES IT.
 *
 * ⚠️  THE WHOLE PAGE IS ONE PARAGRAPH. The source prints that paragraph
 * twice — a collapsed copy and an expanded one behind a "Read More" — and
 * it is rendered once here.
 *
 * ⚠️  THE SAFETY CLAIM IS THE PAGE'S LAST SENTENCE AND NEEDS A CLINICIAN:
 * "With its low frequency and low intensity, ECCT is essentially safe,
 * relatively no side effects and no harm to normal cells." The page offers
 * no citation, no trial, and no regulatory status for a device therapy.
 * The site's own meta description goes further still — "a safe and
 * effective cancer treatment" — which is an efficacy claim nothing on the
 * page supports.
 *
 * ⚠️  NO REFERENCES AND NO EVIDENCE OF ANY KIND. See the note in
 * `hydrogen-inhalation-therapy.ts`; this page fails the editorial
 * standards published on `/knowledge` in exactly the same way.
 */
export const ecct: ArticlePageContent = {
  /**
   * Both sentences are the page's own, taken from the paragraph below.
   * The second opens "The ECCT is basically the technique to generate
   * such electric field" in the source; "such" is changed to "an" because
   * the clause it refers back to is not in the hero. That is the only
   * word altered anywhere on this page.
   */
  hero: {
    title: 'What Is ECCT?',
    body: [
      'One of the most prominent characteristics of cancer cell is its un-controlled cell division.',
      'The ECCT is basically the technique to generate an electric field from non-contact capacitive electrodes placed surrounding the location of the tumor with right frequency and intensity to interfere the process of cell division and eventually destroy the cancer cells.',
    ],
  },

  sections: [
    {
      title: 'Principles of ECCT',
      body: [
        'One of the most prominent characteristics of cancer cell is its un-controlled cell division. The cell division is linked closely with nanoscale biomolecular activity governed by periodic structural formation and destruction of micro-tubule polymers. The micro-tubule polymers are constructed from micro-tubulin dimers which are highly electrically polarized, thus are sensitive to external electric field. The ECCT is basically the technique to generate such electric field from non-contact capacitive electrodes placed surrounding the location of the tumor with right frequency and intensity to interfere the process of cell division and eventually destroy the cancer cells. With its low frequency and low intensity, ECCT is essentially safe, relatively no side effects and no harm to normal cells.',
      ],
    },
  ],
}
