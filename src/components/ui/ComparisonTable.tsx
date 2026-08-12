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

const STATE_LABEL: Record<NonNullable<TableCell['state']>, string> = {
  covered: '✓ Covered',
  gap: '⚠ Gap',
  'major-gap': '✗ Major gap',
}

/** Also serves the brief's CoverageGrid form via the per-cell `state` field. */
export function ComparisonTable({ caption, columns, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-rule">
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
                return (
                  <td key={i} className="p-3 text-ink-soft">
                    {text}
                    {state && <span className="ml-2 text-xs text-muted">{STATE_LABEL[state]}</span>}
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
