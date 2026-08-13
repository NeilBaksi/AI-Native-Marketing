import clsx from 'clsx'
import { RefreshCcw } from 'lucide-react'

export interface FlowChainProps {
  nodes: string[]
  /** Caption on the feedback-loop indicator, e.g. "Learn writes back to Sense". */
  loopBackLabel?: string
  /** Optional band caption beneath the whole chain, e.g. "GOVERN — runs beneath every workflow". */
  band?: string
}

// A node whose label is a short single/two-word token ("Sense", "At-Risk") fits fine
// squeezed into an equal-width row cell. A node whose label is a clause ("Governance
// verifies consent") does not — `flex-1` still divides the row equally regardless of
// content, so the long label gets squeezed below its own text width and wraps to 2-3
// lines while its short siblings sit on one line, producing exactly the jagged,
// uneven-height row Neil flagged (D6, D23, D62). No CSS floor fixes that without also
// letting the row overflow sideways, because the two failures are the same tradeoff.
// Root fix: don't force a row for chains that were never going to fit one — stack
// vertically always, arrows included, the moment any node is a clause rather than a
// label. Word count is measured on the raw label, so a hyphenated compound
// ("At-Risk") still counts as one word.
const isDense = (nodes: string[]) => nodes.some((label) => label.trim().split(/\s+/).length >= 3)

/**
 * A directed sequence of nodes with an optional feedback loop — the shape
 * behind D1 (the seven workflows) and D6 (the four symptoms), generalised
 * per the rule of two (CLAUDE.md) the moment a second diagram wanted it.
 * Built as HTML/CSS flex, not SVG, so it genuinely reflows (row → column).
 * Clause-length chains never get the row treatment at any width; see
 * `isDense` above.
 *
 * Row mode sizes every box to its OWN content (`xl:w-auto`, no `flex-1`,
 * no `min-w-fit` floor) instead of dividing the row equally — equal
 * division was the actual bug, not a rounding error in it. `main` caps at
 * `max-w-5xl` at every viewport ≥ that width, so "give it more room" isn't
 * available past a point; seven equal-width cells in that fixed space have
 * almost no slack left over their own min-content size once padding and
 * six arrows are subtracted, so every box sits flush against its neighbour
 * with zero breathing room regardless of how wide the browser window is —
 * confirmed identical at 1280/1366/1440/1920px. Content-sized boxes don't
 * have that problem: "Learn" stays small, "Orchestrate" stays exactly as
 * wide as it needs, and the real `gap-3` between them is never squeezed
 * out to make room. `xl:flex-wrap` is the safety net if a future short
 * chain's total natural width ever does exceed the column — it drops to a
 * second centred row instead of reproducing the crush this replaced.
 */
export function FlowChain({ nodes, loopBackLabel, band }: FlowChainProps) {
  const dense = isDense(nodes)
  return (
    <div className="rounded-2xl border border-rule bg-surface p-4 sm:p-6">
      <div
        className={clsx(
          'flex flex-col gap-2',
          !dense && 'xl:flex-row xl:flex-wrap xl:items-center xl:justify-center xl:gap-x-2 xl:gap-y-3',
        )}
      >
        {nodes.map((label, i) => (
          <div
            key={label}
            className={clsx('flex flex-col items-stretch gap-2', !dense && 'xl:w-auto xl:flex-row xl:items-center')}
          >
            {/*
              Hairline on paper, not a tint — every node the same, no entry-node accent.
              A chain is mechanism, and mechanism is pine's register, but that's carried
              by the loop-back icon and band caption below, not by singling out node one.
            */}
            <div
              className={clsx(
                'flex w-full items-center justify-center rounded-xl border border-rule bg-paper px-4 py-4 text-center sm:px-5',
                !dense && 'xl:w-auto xl:px-3',
              )}
            >
              <span className="break-words font-display text-sm font-bold text-ink sm:text-base">{label}</span>
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden className="flex items-center justify-center text-muted">
                <svg className={clsx('size-4 rotate-90', !dense && 'xl:rotate-0')} viewBox="0 0 16 16" fill="none">
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
          <RefreshCcw size={14} className="shrink-0 text-pine-deep" aria-hidden />
          <span className="text-xs text-ink-soft">{loopBackLabel}</span>
        </div>
      )}

      {band && (
        <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{band}</p>
      )}
    </div>
  )
}
