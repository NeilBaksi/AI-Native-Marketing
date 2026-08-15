interface Quadrant {
  tier: string
  description: string
}

interface Matrix2x2Props {
  xLabel: string
  yLabel: string
  /** Top-left, top-right, bottom-left, bottom-right. */
  quadrants: [Quadrant, Quadrant, Quadrant, Quadrant]
}

/**
 * One-off for D13 (the Economics of Error 2x2) — not generalised into a
 * variant component per CLAUDE.md's rule of two; nothing else on the site
 * wants a quadrant shape yet. Axis arrows are the only geometry; the
 * quadrants themselves are plain cards, not precisely plotted points — the
 * course source gives qualitative placement, not coordinates.
 */
export function Matrix2x2({ xLabel, yLabel, quadrants }: Matrix2x2Props) {
  const [tl, tr, bl, br] = quadrants
  return (
    <div className="rounded-2xl rounded-bl-none rounded-tr-none border border-rule bg-surface p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {[tl, tr, bl, br].map((q) => (
          // Hairline on paper. Four identically tinted boxes was precisely the
          // "every element on the page is tinted" problem — a quadrant grid gets
          // its meaning from position against the axes, never from fill.
          <div key={q.tier} className="min-w-0 rounded-xl rounded-bl-none rounded-tr-none border border-rule bg-paper p-3 sm:p-4">
            <p className="break-words font-display text-sm font-bold text-ink sm:text-base">{q.tier}</p>
            <p className="mt-1 break-words text-xs leading-relaxed text-ink-soft sm:text-sm">{q.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
        <span>← Low</span>
        <span>{xLabel} →</span>
      </div>
      <p className="mt-1 text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
        {yLabel} — high at top, low at bottom
      </p>
    </div>
  )
}
