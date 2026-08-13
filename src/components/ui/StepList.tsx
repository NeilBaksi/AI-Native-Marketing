export interface StepListProps {
  steps: {
    title: string
    body: string
    /** Optional worked-example line, set in mono under the body. */
    example?: string
  }[]
}

/**
 * A numbered procedure — horizontal rules across every row, with a display
 * numeral in the margin. Not `aria-hidden`: Tailwind's preflight sets
 * `list-style: none`, which drops list semantics (and implicit numbering)
 * in Safari, so the visible `{i + 1}` is the only number a screen reader
 * gets.
 *
 * Single column at every viewport — no breakpoint. Min viable width is
 * 208px: an 8-10 (2rem-2.5rem) numeral column + 16-24px gap leaves ~160px
 * for title/body text, which is still wide enough to wrap English prose
 * without mid-word breaks.
 */
export function StepList({ steps }: StepListProps) {
  return (
    <ol className="flex flex-col">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-4 border-t border-rule py-5 last:border-b sm:gap-6">
          <span className="w-8 shrink-0 font-display text-h3 leading-none tabular-nums text-cobalt sm:w-10">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-h4 leading-snug text-ink">{s.title}</p>
            <p className="mt-1.5 max-w-prose text-base leading-relaxed text-ink-soft">{s.body}</p>
            {s.example && (
              <p className="mt-2.5 border-l border-rule pl-3 font-mono text-[0.82rem] leading-relaxed text-muted">
                {s.example}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
