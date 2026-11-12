import { ImageResponse } from 'next/og'

/**
 * Share-preview image (Open Graph / Twitter card), 1200 × 630, drawn from
 * the page title: `/og?title=…&eyebrow=…`. `buildMetadata` points every page
 * without its own `ogImage` here, so a shared link shows what the page is
 * about instead of the logo on every page.
 *
 * Text only — no photograph, nothing that could read as a clinical result.
 *
 * ⚠️  DEVANAGARI. The built-in font has no Devanagari glyphs; a Hindi title
 * would render as empty boxes. Such titles fall back to the site name.
 *
 * Next 16.4.6 or later: GHSA-vcvr-r3jv-pc5j (RCE in next/og) is fixed there.
 */
export const runtime = 'nodejs'

const clamp = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s)

export function GET(req: Request) {
  const params = new URL(req.url).searchParams
  let title = (params.get('title') ?? '').trim()
  const eyebrow = clamp((params.get('eyebrow') ?? 'Art of Healing Cancer').trim(), 60)
  if (!title || /[ऀ-ॿ]/.test(title)) title = 'Integrative and Precision Cancer Care, Gurugram'
  title = clamp(title, 120)
  const size = title.length > 80 ? 54 : title.length > 50 ? 62 : 72

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0b3a43 0%, #0e6875 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, textTransform: 'uppercase', color: '#9fe3ea' }}>
          {eyebrow}
        </div>
        <div style={{ display: 'flex', fontSize: size, fontWeight: 700, lineHeight: 1.12, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26, color: '#d5f3f6' }}>
          <span>artofhealingcancer.com</span>
          <span>Gurugram, India</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable' },
    },
  )
}
