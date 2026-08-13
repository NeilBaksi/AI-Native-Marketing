export interface FormulaProps {
  /** Left-hand side, e.g. 'iROAS'. */
  name: string
  /** Right-hand side as authored, e.g. 'Incremental Revenue ÷ Marketing Spend'. */
  expression: string
  /** Optional term glossary, rendered as a mono legend under a hairline. */
  terms?: { symbol: string; meaning: string }[]
  /** Optional single interpretive line, e.g. 'Below 1.0, the spend cost more than it produced.' */
  note?: string
}

/**
 * Pure typography — no border, no fill, no rule, no radius. That's
 * deliberate: an equation is mechanism, and this is the one block on the
 * site that carries no container at all.
 *
 * No `whitespace-nowrap`, no `overflow-x-auto`. These expressions are
 * word-based English ("Incremental Contribution Margin ÷ Marketing Spend"
 * is ~55 characters, ~500px at 0.95rem mono), so they wrap at spaces on
 * mobile like any other text and never need a scroll region — adding one
 * would reintroduce the horizontal-scroll bug this round fixes.
 *
 * Min viable width: 260px for the equation line. Stacking breakpoint: none
 * for the equation; the optional `terms` legend goes label-above-value
 * below `sm:` (640px) and label-beside-value (a 176px/44 fixed column) above it.
 */
export function Formula({ name, expression, terms, note }: FormulaProps) {
  return (
    <div className="py-1">
      <p className="font-mono text-[0.95rem] leading-[1.7] text-ink sm:text-[1.05rem]">
        <span className="text-cobalt-deep">{name}</span>
        <span className="mx-2 text-muted">=</span>
        <span>{expression}</span>
      </p>

      {terms && (
        <dl className="mt-3 border-t border-rule pt-3">
          {terms.map((t) => (
            <div key={t.symbol} className="flex flex-col py-1 sm:flex-row sm:gap-x-4">
              <dt className="font-mono text-[0.75rem] uppercase tracking-wider text-cobalt-deep sm:w-44 sm:shrink-0">
                {t.symbol}
              </dt>
              <dd className="min-w-0 max-w-prose text-sm leading-relaxed text-ink-soft">{t.meaning}</dd>
            </div>
          ))}
        </dl>
      )}

      {note && <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{note}</p>}
    </div>
  )
}
