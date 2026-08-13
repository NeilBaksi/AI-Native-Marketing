export interface BeforeAfterProps {
  /** Column heads, e.g. 'Strategic architecture' / 'Operating architecture'. */
  beforeLabel: string
  afterLabel: string
  /** Row-wise contrast — each row compares ONE dimension across both sides. */
  rows: { dimension: string; before: string; after: string }[]
  /** Optional closing line: the argument the contrast makes. */
  verdict?: string
}

/**
 * A split with a centre rule, organised by row (dimension) rather than by
 * column. Two parallel columns of independent prose is exactly the shape
 * that broke FlowChain — narrow columns with no shared wrap points forcing
 * `break-words` mid-word. Organising by dimension keeps both halves of
 * every row short, and their content is sentences, so wrap points are
 * spaces, not `break-words` cuts.
 *
 * Min viable width: ~620px for the 2-up desktop layout (2 × 288px of prose
 * either side of the centre rule + ~40px of gutter/padding). The site's
 * ~720px content column clears that with margin.
 * Stacking breakpoint: `sm:` (640px) — below that every row drops to a
 * single stacked column, with the before/after label riding inside the
 * cell (`sm:hidden`) since the shared header row is hidden below `sm:`.
 */
export function BeforeAfter({ beforeLabel, afterLabel, rows, verdict }: BeforeAfterProps) {
  return (
    <div className="border-y border-rule">
      {/* heads — desktop only; on mobile the labels ride each cell */}
      <div className="hidden border-b border-rule sm:grid sm:grid-cols-2">
        <p className="py-2.5 pr-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
          {beforeLabel}
        </p>
        <p className="border-l border-rule py-2.5 pl-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-pine-deep">
          {afterLabel}
        </p>
      </div>

      <div className="divide-y divide-rule">
        {rows.map((r) => (
          <div key={r.dimension} className="py-4">
            <p className="kicker">{r.dimension}</p>
            {/* equal 1fr grid tracks, never flex-1 inside a sm:flex-row — the
                exact construct FlowChain's doc comment names as the root
                cause of the reflow bug — with min-w-0 on both children so
                they can shrink below their longest word. */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2">
              <div className="min-w-0 pr-0 sm:pr-5">
                <span className="mb-1 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted sm:hidden">
                  {beforeLabel}
                </span>
                <p className="text-base leading-relaxed text-ink-soft">{r.before}</p>
              </div>
              <div className="mt-3 min-w-0 border-t border-rule pt-3 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <span className="mb-1 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-pine-deep sm:hidden">
                  {afterLabel}
                </span>
                <p className="text-base leading-relaxed text-ink-soft">{r.after}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {verdict && (
        <p className="max-w-prose border-t border-rule py-4 text-base font-medium leading-relaxed text-ink">
          {verdict}
        </p>
      )}
    </div>
  )
}
