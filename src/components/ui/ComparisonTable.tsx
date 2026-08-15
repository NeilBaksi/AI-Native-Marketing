import clsx from 'clsx'
import { AlertTriangle, Check, X } from 'lucide-react'

export interface TableCell {
  text: string
  /** Optional coverage state — renders a label, never colour alone. */
  state?: 'covered' | 'gap' | 'major-gap'
}

interface ComparisonTableProps {
  caption: string
  columns: string[]
  rows: { label: string; cells: (string | TableCell)[] }[]
}

/**
 * Three redundant codings per state — icon, wording, and (for the two that
 * matter) fill — so the escalation survives greyscale and colour-vision
 * deficiency alike. Icons are lucide, matching every other icon on the site;
 * these were `✓ ⚠ ✗` unicode glyphs, which is the "mixed icon families" the
 * brief bans outright.
 *
 * `covered` gets `muted` and no tint on purpose: the absence of a problem earns
 * no ink, and green would both invent a success semantic the palette doesn't
 * have and turn coverage tables 60% green. `gap` and `major-gap` share a text
 * colour — the escalation is carried by the cell fill, which is what keeps them
 * distinguishable without colour at all.
 */
const STATE: Record<
  NonNullable<TableCell['state']>,
  { icon: typeof Check; label: string; text: string; cell: string }
> = {
  covered: { icon: Check, label: 'Covered', text: 'text-muted', cell: '' },
  gap: { icon: AlertTriangle, label: 'Gap', text: 'text-ember-deep', cell: '' },
  'major-gap': { icon: X, label: 'Major gap', text: 'text-ember-deep', cell: 'bg-ember/10' },
}

/** Also serves the brief's CoverageGrid form via the per-cell `state` field. */
export function ComparisonTable({ caption, columns, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl rounded-bl-none rounded-tr-none border border-rule">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-rule bg-surface">
            <th scope="col" className="p-3 text-left font-medium text-ink">
              {' '}
            </th>
            {columns.map((c) => (
              <th key={c} scope="col" className="p-3 text-left font-medium text-ink">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-rule last:border-0 even:bg-surface/50">
              <th scope="row" className="p-3 text-left font-medium text-ink">
                {row.label}
              </th>
              {row.cells.map((cell, i) => {
                const isObj = typeof cell !== 'string'
                const text = isObj ? cell.text : cell
                const state = isObj ? cell.state : undefined
                const StateIcon = state ? STATE[state].icon : null
                return (
                  <td key={i} className={clsx('p-3 text-ink-soft', state && STATE[state].cell)}>
                    {text}
                    {state && StateIcon && (
                      <span
                        className={clsx(
                          'ml-2 inline-flex items-center gap-1 whitespace-nowrap align-middle font-mono text-[0.65rem] uppercase tracking-wider',
                          STATE[state].text,
                        )}
                      >
                        <StateIcon size={12} strokeWidth={2} aria-hidden />
                        {STATE[state].label}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
