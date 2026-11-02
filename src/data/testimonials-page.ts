import type { PageHeroContent } from '@/types'

/**
 * TESTIMONIALS PAGE
 * ----------------------------------------------------------------------------
 * Migrated from https://artofhealingcancer.com/testimonials/ and kept at
 * that URL, which was already in the main menu and the footer of every
 * page on this site and was a 404.
 *
 * ⚠️  THESE ARE REAL, NAMED PATIENTS AND THE QUOTES ARE REPRODUCED WORD
 * FOR WORD. That is not a stylistic choice. A testimonial that has been
 * tidied, shortened or smoothed is no longer a testimonial — it is the
 * clinic speaking in a patient's name. Nothing below has been edited,
 * including the spelling ("reccurence", "loosing", "advices", "Thankyou").
 *
 * ⚠️  CONSENT TRAVELS WITH THE CONTENT, BUT CHECK IT ANYWAY. AOHC
 * published these on its own site, so consent for publication plainly
 * exists. Whether it covers a rebuilt site is a question for whoever
 * holds the consent forms, and it is worth asking, because these are
 * named individuals' health data — the most sensitive category there is.
 * If any consent was time-limited or has been withdrawn, that person's
 * quote comes out of this file and nothing else changes.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THREE OF THE FIVE DISCOURAGE MASTECTOMY, AND ONE CALLS IT "A MYTH".
 * This needs a decision from a clinician before launch, and it is the
 * reason this page renders the site's standard disclaimer pair.
 *
 *   • Mrs. Gurjit: "please don't go for Mastectomy as it is a myth"
 *   • Ms. Suvidha: "Mastectomy if it's not necessary, one should not
 *     vouch for that because it will leave a wound on your body for your
 *     lifetime"
 *   • Ms. Rajni: describes the belief that removing the whole breast
 *     lowers recurrence as "a myth"
 *
 * For many breast cancers mastectomy is the indicated operation, and a
 * woman deciding between procedures could read "mastectomy is a myth" on
 * a cancer clinic's own website and refuse one she needs. Each of the
 * five does also tell the reader to follow and trust their own doctor,
 * which is the saving grace and the reason the quotes can stand at all —
 * but "follow your doctor" and "don't have a mastectomy" are in the same
 * paragraph, and the second is the more specific instruction.
 *
 * `EMERGENCY_NOTICE` in `lib/site.ts` already carries the exact sentence
 * this page needs — "Do not stop, delay, or change prescribed treatment
 * based solely on information on this website" — and the page renders it
 * with `MEDICAL_DISCLAIMER` directly under the quotes rather than at the
 * very foot, so it is read in the same breath.
 *
 * The real fix is editorial, not technical: AOHC can ask these patients
 * for a line that says the same thing without telling other women what
 * surgery to refuse. That is a conversation with them, not an edit here.
 *
 * ⚠️  THE VIDEOS ARE NOT MIGRATED FROM THIS PAGE, DELIBERATELY. The live
 * page's video section is a Smash Balloon widget pulling the AOHC
 * YouTube channel's latest uploads — nine of them at the time of
 * migration, under headings like "Complete Remission from Stage 3
 * Cervical Cancer in 8 Weeks". It is an automatic feed, not an editorial
 * selection, so there is nothing to transcribe: whatever it showed last
 * week is not what it shows now. This page uses the curated rail from
 * `home.testimonials` instead — seven videos with checked titles and
 * local thumbnails. Reinstating a live channel feed would also mean
 * embedding a third-party script that sets cookies before anyone has
 * agreed to them, which the privacy policy does not currently cover.
 */

export const testimonialsPage: {
  hero: PageHeroContent
  written: { quote: string; name: string; context: string }[]
} = {
  hero: {
    title: 'What Our Patients Say',
    body: [
      'These are the words of people who have been through it, in their own words and unedited.',
      'Every cancer and every person is different. What happened to one patient is not a prediction of what will happen to another.',
    ],
  },

  /**
   * ⚠️  VERBATIM. See the warnings above before changing a character.
   * `context` is the attribution exactly as the live page gives it —
   * "Breast Cancer Survivor" for all five.
   */
  written: [
    {
      quote:
        'Hi everyone, I have also gone through this phase. And believe me this phase lasts shortly, & passes but when we overcome this, we are more strong, brave, & courageous. On this note, I would like to say this for sure is that please don’t go for Mastectomy as it is a myth & rather you should follow your doctor’s advice & follow his guidelines. And life will be more cheerful and happier. Thankyou!',
      name: 'Mrs. Gurjit',
      context: 'Breast Cancer Survivor',
    },
    {
      quote:
        'I am Amanpreet Cheema, & I got a lumpectomy procedure done at the age of 43. It’s almost been 7 years now & I am so happy of the decision that I took. I am very confident physically, mentally, sexually. So, my advice to anybody out there, who is debating on whether to go for lumpectomy or mastectomy, do not be scared of lumpectomy. If your doctor advices you, it’s a right thing to do. Thankyou & God bless.',
      name: 'Mrs. Amanpreet Cheema',
      context: 'Breast Cancer Survivor',
    },
    {
      quote:
        'The phase of life you are going through, it’s not easy but trust me it’s not difficult too. Only your positive attitude, the trust on your own self and your doctor. Mastectomy if it’s not necessary, one should not vouch for that because it will leave a wound on your body for your lifetime. It’s one of the life’s struggle & a bit of challenge & it will pass with time, leaving behind some sweet & sour memories. So, enjoy your womanhood & femininity. Take care.',
      name: 'Ms. Suvidha',
      context: 'Breast Cancer Survivor',
    },
    {
      quote:
        'I am a cancer survivor, 5 years of treatment getting over. Breast conservation is very important, getting the right treatment is most important. Trust your doctor, & go for what he says because if you don’t have the trust, nothing will work for you. The world is really beautiful, so go for everything that the doctor is suggesting with complete faith & you will come out of it rather even stronger, with full enthusiasm, more wisdom & strength with a fighter spirit.',
      name: 'Mrs. Shikha Singh',
      context: 'Breast Cancer Survivor',
    },
    {
      quote:
        'I am Rajni, a breast cancer survivor, It’s been 7 years of my surgery & throughout the time, I met so many cancer patients & I have seen people, who thinks that if we get remove the full part then the chances of reccurence decrease, which is a myth. Mine only affected part was removed, & I have no complications. And I am very happy that, I won this battle without loosing my breast. So, being as a woman be positive, be strong & believe in your doctor.',
      name: 'Ms. Rajni',
      context: 'Breast Cancer Survivor',
    },
  ],
}
