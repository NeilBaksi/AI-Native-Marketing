import { RefreshCcw } from 'lucide-react'

export interface FlowChainProps {
  nodes: string[]
  /** Caption on the feedback-loop indicator, e.g. "Learn writes back to Sense". */
  loopBackLabel?: string
  /** Optional band caption beneath the whole chain, e.g. "GOVERN — runs beneath every workflow". */
  band?: string
}

/**
 * A directed sequence of nodes with an optional feedback loop — the shape
 * behind D1 (the seven workflows) and D6 (the four symptoms), generalised
 * per the rule of two (CLAUDE.md) the moment a second diagram wanted it.
 * Built as HTML/CSS flex, not SVG, so it genuinely reflows (row → column).
 * Row layout only kicks in at `xl:` (1280px). Worked from the actual
 * numbers, not a guess: 7 nodes (D1) + 6 arrow icons need roughly 844px of
 * flex content alone even at minimal per-node width; add the 260px sidebar,
 * main padding, and this card's own padding and the row genuinely has
 * nowhere to fit before ~1216px. `break-words`/`min-w-0` on the label stay
 * as a safety net, not the primary fix — a breakpoint with too little room
 * just makes every label wrap mid-word instead of overflowing.
 */
export function FlowChain({ nodes, loopBackLabel, band }: FlowChainProps) {
  return (
    <div className="rounded-2xl border border-rule bg-surface p-4 sm:p-6">
      <div className="flex flex-col gap-2 xl:flex-row xl:items-stretch xl:gap-0">
        {nodes.map((label, i) => (
          <div key={label} className="flex min-w-0 flex-1 flex-col items-center gap-2 xl:flex-row">
            <div className="flex w-full min-w-0 flex-1 items-center justify-center rounded-xl border border-ember/40 bg-ember/5 px-3 py-4 text-center">
              <span className="min-w-0 break-words font-display text-sm font-bold text-ink sm:text-base">{label}</span>
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden className="text-muted">
                <svg className="size-4 rotate-90 xl:rotate-0" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 8h11M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      {loopBackLabel && (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-paper px-4 py-2 text-center">
          <RefreshCcw size={14} className="shrink-0 text-ember-deep" aria-hidden />
          <span className="text-xs text-ink-soft">{loopBackLabel}</span>
        </div>
      )}

      {band && (
        <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{band}</p>
      )}
    </div>
  )
}
