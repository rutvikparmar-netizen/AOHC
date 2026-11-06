import type { PageHeroContent, VideoItem } from '@/types'

/**
 * VIDEOS — `/videos`, migrated from the WordPress page at the same URL.
 *
 * The live page is twelve embedded YouTube videos from the AOHC channel:
 * three patient stories, then nine Shorts under "Shorts Videos", with a
 * "Watch Other Videos" link to the channel after each group. Titles are the
 * page's own headings, in its order; the IDs come from its embeds and the
 * thumbnails from `img.youtube.com`, as for the home page's videos.
 *
 * ⚠️  CHANGES:
 *   • Embeds become linked thumbnails (`VideoGrid`, as on Testimonials):
 *     twelve YouTube iframes load several megabytes before anyone presses
 *     play.
 *   • The hero line and the two captions ("Patient story", "Short") are
 *     written labels, not supplied copy; they say only what each video is.
 *   • ⚠️ THE FIRST TITLE MAKES A CLINICAL CLAIM ("Complete Remission from
 *     Stage 3 Cervical Cancer in 8 Weeks"). It is the video's published
 *     title, reproduced as on the home page, with the same disclaimer
 *     directly beneath the stories.
 */

const thumb = (id: string, alt: string) => ({
  src: `/images/testimonials/${id}.jpg`,
  alt,
  width: 1280,
  height: 720,
})

export const videosPage: {
  hero: PageHeroContent
  stories: VideoItem[]
  shorts: VideoItem[]
} = {
  hero: {
    title: 'Videos',
    body: ['Patient stories and short explainers from the Art of Healing Cancer YouTube channel.'],
  },
  stories: [
    {
      title: 'Complete Remission from Stage 3 Cervical Cancer in 8 Weeks | Art of Healing Cancer, Gurugram',
      caption: 'Patient story',
      href: 'https://youtu.be/hvsElxx_9so',
      thumbnail: thumb('hvsElxx_9so', 'Video thumbnail: cervical cancer patient story'),
    },
    {
      title: 'From Diagnosis to Recovery | Guided by Precision, Powered by Care | Art of Healing Cancer, Gurugram',
      caption: 'Patient story',
      href: 'https://youtu.be/Sx2FBrcDoYQ',
      thumbnail: thumb('Sx2FBrcDoYQ', 'Video thumbnail: from diagnosis to recovery'),
    },
    {
      title: 'Survivor’s Journey | Strength Through Precision & Care | Art of Healing Cancer, Gurugram',
      caption: 'Patient story',
      href: 'https://youtu.be/nsHSdzPVQG0',
      thumbnail: thumb('nsHSdzPVQG0', 'Video thumbnail: a survivor’s journey'),
    },
  ],
  shorts: ([
    ['hE7HfuGOnM0', 'Pregnancy After Breast Cancer Treatment: The Possibilities & Challenges'],
    ['TdWeib4mewg', 'Surgery: A vital tool in oral cancer treatment'],
    ['7qFv6nWQU3s', 'Breast conservation surgery: Preserving femininity in breast cancer treatment'],
    ['wokJ-KaGYCo', 'Oropharyngeal Cancer: Understanding Head and Neck Cancer'],
    ['kNr6vSCH4ak', 'Paranasal Sinus & Nasal Cavity Cancer: Head and Neck Cancer Explained'],
    ['LSkRV6f13Us', 'Lip and Oral Cavity Cancer: A Closer Look at Head and Neck Cancer'],
    ['fbVHcHUy4RE', 'Salivary Gland Cancer: Uncovering Head and Neck Cancer Types'],
    ['KloDL0FM_aQ', 'Understanding Hypopharyngeal Cancer: Causes and Development in Head and Neck Cancer'],
    ['x7WVlCn1T0s', 'Understanding Laryngeal Cancer in Head and Neck'],
  ] as const).map(([id, title]) => ({
    title,
    caption: 'Short',
    href: `https://www.youtube.com/shorts/${id}`,
    thumbnail: thumb(id, `Video thumbnail: ${title}`),
  })),
}
