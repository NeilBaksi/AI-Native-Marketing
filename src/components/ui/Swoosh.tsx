export type SwooshVariant = 1 | 2 | 3 | 4 | 5

interface Layer {
  d: string
  className: string
}

/**
 * Five decorative background curves, each a genuinely different silhouette,
 * so a reader moving page to page doesn't see the same shape twice in a
 * row — one hue throughout (ember), single-tone per variant, no mixing.
 * Pure geometry (bezier fills), never a texture or a picture — opacity
 * stays low enough that it never touches text contrast, since ink text
 * always sits on a barely-tinted paper, not on the curve's own hue.
 */
const VARIANTS: Record<SwooshVariant, Layer[]> = {
  // Wave — one broad, even swell.
  1: [
    {
      d: 'M0,0 L1440,0 L1440,420 C1220,500 1040,320 840,380 C640,440 480,300 300,350 C160,390 70,350 0,410 Z',
      className: 'fill-ember/[0.04]',
    },
  ],
  // Diagonal — a single steep slash, left-high to right-low.
  2: [
    {
      d: 'M0,0 L1440,0 L1440,180 C1100,320 900,120 700,260 C500,400 260,180 0,320 Z',
      className: 'fill-ember/[0.04]',
    },
  ],
  // Corner arc — mass concentrated toward the right, low and quiet on the left.
  3: [
    {
      d: 'M0,0 L1440,0 L1440,300 C1300,260 1180,480 1000,460 C820,440 760,220 560,240 C360,260 200,300 0,260 Z',
      className: 'fill-ember/[0.04]',
    },
  ],
  // Twin swell — two close, shallow crests instead of one broad one.
  4: [
    {
      d: 'M0,0 L1440,0 L1440,300 C1300,340 1220,220 1080,240 C980,254 940,340 820,340 C700,340 660,254 560,240 C420,220 340,340 200,300 C120,276 60,286 0,300 Z',
      className: 'fill-ember/[0.04]',
    },
  ],
  // Deep dip — one tall, slow valley.
  5: [
    {
      d: 'M0,0 L1440,0 L1440,460 C1240,560 1080,340 900,420 C720,500 620,300 440,380 C280,450 140,420 0,460 Z',
      className: 'fill-ember/[0.04]',
    },
  ],
}

/**
 * Deterministic pseudo-random variant per page — same slug always gets the
 * same curve (no reshuffle on revisit or back-navigation), distributed
 * across all 5 by a simple string hash rather than assigned by hand.
 */
export function variantForSlug(slug: string): SwooshVariant {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0
  }
  return ((Math.abs(hash) % 5) + 1) as SwooshVariant
}

/**
 * Full-bleed background curve for a page hero. Renders behind content via
 * `-z-10`; the parent must be `relative` (or an ancestor establishes the
 * stacking context) for the `absolute` positioning to anchor correctly.
 * `body`'s `overflow-x: hidden` (index.css) is what makes the `w-screen`
 * bleed-past-the-content-column trick safe — no horizontal scrollbar.
 */
export function Swoosh({ variant }: { variant: SwooshVariant }) {
  const layers = VARIANTS[variant]
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 -top-14 -z-10 h-[600px] w-screen -translate-x-1/2 overflow-hidden sm:-top-20 sm:h-[680px]"
    >
      <svg viewBox="0 0 1440 680" preserveAspectRatio="none" className="h-full w-full">
        {layers.map((layer) => (
          <path key={layer.d} d={layer.d} className={layer.className} />
        ))}
      </svg>
    </div>
  )
}
