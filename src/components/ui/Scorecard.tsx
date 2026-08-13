import clsx from 'clsx'
import { facts } from '../../data/facts'
import type { FactId } from '../../data/facts'
import { ProvenanceChip } from './ProvenanceChip'

export interface ScorecardProps {
  /** 2–4 fact ids. More than 4 and it stops being scannable — use the statistics index. */
  ids: FactId[]
  /** Mono rail label above the grid, e.g. 'What the pilot returned'. */
  label?: string
}

const COLS: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

/**
 * A hairline grid, no container — the rules are the boundary. Consumes
 * `facts[id]` and renders `<ProvenanceChip>` per cell exactly like
 * StatCallout does, so a stat can never drift between the two components.
 *
 * Min viable width: 288px (single column at base). Each cell needs roughly
 * 10rem (160px) for a wrapping `text-h3` value plus its label, which fits
 * a 288px viewport with room for page padding either side.
 * Stacking breakpoint: `sm:` (640px) takes 2- and 3-fact grids straight to
 * their final column count. A 4-fact grid instead goes 1 → 2 at `sm:` and
 * 2 → 4 at `lg:`, because four ~10rem cells need ~40rem (640px) of row
 * width and `sm:`'s 640px viewport has too little left after page padding
 * to seat all four at once.
 */
export function Scorecard({ ids, label }: ScorecardProps) {
  return (
    <div className="border-y border-rule">
      {label && <p className="kicker border-b border-rule py-2.5">{label}</p>}
      {/* gap-px + bg-rule: the container's background shows through the 1px
          gaps between cells, drawing the hairline grid with no per-cell
          border arithmetic and no double borders at wrap points. */}
      <dl className={clsx('grid gap-px bg-rule', COLS[ids.length] ?? COLS[2])}>
        {ids.map((id) => {
          const fact = facts[id]
          return (
            <div key={id} className="min-w-0 bg-paper py-5 pr-4 sm:px-4 sm:first:pl-0">
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <p className="break-words font-display text-h3 leading-none text-ink">{fact.value}</p>
                <p className="mt-2 text-sm leading-snug text-ink-soft">{fact.label}</p>
                <div className="mt-2.5">
                  <ProvenanceChip provenance={fact.provenance} />
                </div>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
