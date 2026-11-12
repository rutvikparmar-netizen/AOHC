import type { PageHeroContent } from '@/types'

/**
 * PRESS — `/press-release`, migrated from the WordPress page at that URL.
 *
 * The live page is a grid of outlet logos, each with a "Read More" link to
 * an article in which AOHC or its doctors appear. It carries no text of its
 * own. Two cards link the same article twice (India TV; one India Today
 * card has no link at all); each article is listed once here.
 *
 * ⚠️  THE HEADLINES ARE READ FROM EACH ARTICLE'S URL, not copied from the
 * article — the live page shows only logos, and the articles are other
 * publishers' pages. The words are the URL's own, in its order; the case,
 * the hyphens and a few connecting words ("to", "a", "of", "the") change.
 * Check them against the articles before this page is promoted.
 *
 * ⚠️  NO LOGOS. Outlet mastheads are those publishers' trademarks; the page
 * names each outlet in text instead.
 */

export interface PressItem {
  outlet: string
  headline: string
  href: string
}

export const pressPage: { hero: PageHeroContent; items: PressItem[] } = {
  hero: {
    title: 'In the Press',
    body: ['Articles and interviews in which Art of Healing Cancer and its doctors appear.'],
  },
  items: [
    {
      outlet: 'News18',
      headline: 'A Simple Blood Test That Can Detect Cancer: Understanding Liquid Biopsy',
      href: 'https://www.news18.com/lifestyle/health-and-fitness/a-simple-blood-test-that-can-detect-cancer-understanding-liquid-biopsy-9343760.html',
    },
    {
      outlet: 'The Times of India',
      headline: 'Cervical Cancer Surgery: Bet on Robotic Surgery for Better Aesthetics and Swift Recovery',
      href: 'https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/cervical-cancer-surgery-bet-on-robotic-surgery-for-better-aesthetics-and-swift-recovery/articleshow/121361647.cms',
    },
    {
      outlet: 'The Times of India',
      headline: 'Can the Right Food Bring Down Your Risk of Cancer?',
      href: 'https://timesofindia.indiatimes.com/life-style/health-fitness/diet/can-the-right-food-bring-down-your-risk-of-cancer/articleshow/123785675.cms',
    },
    {
      outlet: 'India TV',
      headline: 'What Are the Symptoms of Liver Cancer? Know Which People Are Most at Risk and Preventive Measures',
      href: 'https://www.indiatvnews.com/health/what-are-the-symptoms-of-liver-cancer-know-which-people-are-most-at-risk-and-preventive-measures-2025-05-30-992637',
    },
    {
      outlet: 'India Today',
      headline: 'All About Liquid Biopsy: How a Simple Blood Test Can Spot Cancer Tumours Early',
      href: 'https://www.indiatoday.in/health/story/all-about-liquid-biopsy-how-a-simple-blood-test-can-spot-cancer-tumours-early-2721648-2025-05-08',
    },
    {
      outlet: 'Drug Today',
      headline: 'Voice Saved: A New Breakthrough in Treating Laryngopharyngeal Cancer',
      href: 'https://drugtodayonline.com/medical-news/news-topic/24263-voice-saved-a-new-breakthrough-in-treating-laryngopharyngeal-cancer',
    },
    {
      outlet: 'OnlyMyHealth',
      headline: 'Annual Tests to Detect Pancreatic Cancer Early',
      href: 'https://www.onlymyhealth.com/annual-tests-to-detect-pancreatic-cancer-early-12977836242',
    },
    {
      outlet: 'OnlyMyHealth',
      headline: 'How to Differentiate Between a Mosquito Bite and Melanoma',
      href: 'https://www.onlymyhealth.com/how-to-differentiate-between-mosquito-bite-and-melanoma-12977838228',
    },
    {
      outlet: 'OnlyMyHealth',
      headline: 'New Vaccine Prevents Pancreatic and Colorectal Cancer Recurrence, Study Finds',
      href: 'https://www.onlymyhealth.com/new-vaccine-prevents-pancreatic-and-colorectal-cancer-recurrence-study-finds-12977836756',
    },
    {
      outlet: 'YouTube',
      headline: 'Video interview',
      href: 'https://youtu.be/RhSG0tGlJcs',
    },
    {
      outlet: 'The Indian Express',
      headline: 'Sanjay Dutt’s Reaction to Cancer: An Oncologist on Coping with the Initial Shock of a Diagnosis',
      href: 'https://indianexpress.com/article/lifestyle/health/sanjay-dutt-reaction-cancer-oncologist-coping-with-initial-shock-diagnosis-10237453/',
    },
    {
      outlet: 'Mint',
      headline: 'Eating Healthy? Hidden Cancer Risks in Your Diet That No One Warned You About',
      href: 'https://www.livemint.com/news/trends/eating-healthy-hidden-cancer-risks-in-your-diet-that-no-one-warned-you-about-11757754079602.html',
    },
    {
      outlet: 'Mint',
      headline: 'Thyroid Cancer Awareness Month: The “Good Cancer” Narrative',
      href: 'https://www.livemint.com/mint-lounge/wellness/thyroid-cancer-awareness-month-good-cancer-narrative/amp-11758448028718.html',
    },
  ],
}
