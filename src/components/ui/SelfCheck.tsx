import { useId, useState } from 'react'

export interface SelfCheckProps {
  /** Mono rail label, e.g. 'Self-diagnostic'. */
  label?: string
  /** The shared scale, weakest → strongest. Array index IS the level. */
  levels: string[]
  /** One radio group per dimension. */
  dimensions: { id: string; question: string }[]
  /** Rendered on completion, indexed by level. Must match `levels.length`. */
  verdicts: string[]
  /** The sentence explaining the placement rule. Defaults to the weakest-link line. */
  rule?: string
}

const DEFAULT_RULE =
  'Your placement is the lowest level you selected — a system is only as orchestrated as its weakest workflow.'

/**
 * A stacked self-diagnostic questionnaire, one native radio group per
 * dimension, computing placement as Math.min(...answers) — the weakest-link
 * rule is the teaching, so there is no weighting or scoring engine to hide it
 * behind. Deliberately NOT a dimensions × levels matrix: level labels (e.g.
 * "Workflow Orchestration") can't fit a 5rem column head, which forces
 * abbreviation, rotation, or horizontal scroll — the FlowChain reflow bug in
 * a new costume. Stacked reads identically at every width, so there is no
 * stacking breakpoint to document. Min viable width is 240px: the longest
 * realistic question/option text plus the 18px radio and its 12px gap still
 * wraps cleanly at that width (same arithmetic as Checklist).
 *
 * Native <input type="radio"> inside a real <fieldset>/<legend> gives
 * arrow-key roving within a group, group labelling for screen readers, and
 * focus rings for free — no role="radiogroup", no keyboard handler, no
 * roving tabIndex (contrast Tabs.tsx, which hand-rolls all three because
 * tabs have no native element).
 */
export function SelfCheck({ label, levels, dimensions, verdicts, rule }: SelfCheckProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const uid = useId()

  const done = dimensions.every((d) => answers[d.id] !== undefined)
  const placement = done ? Math.min(...dimensions.map((d) => answers[d.id])) : -1

  return (
    <div className="border-y border-rule">
      {label && <p className="kicker border-b border-rule py-2.5">{label}</p>}

      <div className="flex flex-col gap-7 py-5">
        {dimensions.map((d) => (
          <fieldset key={d.id} className="min-w-0 border-0 p-0">
            <legend className="font-display text-h4 leading-snug text-ink">{d.question}</legend>
            <div className="mt-3 flex flex-col">
              {levels.map((lv, li) => (
                <label key={lv} className="flex cursor-pointer items-start gap-3 border-b border-rule py-3 last:border-0">
                  <input
                    type="radio"
                    name={`${uid}-${d.id}`}
                    value={li}
                    checked={answers[d.id] === li}
                    onChange={() => setAnswers((a) => ({ ...a, [d.id]: li }))}
                    className="mt-[3px] size-[18px] shrink-0 accent-cobalt"
                  />
                  <span className="min-w-0">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                      {String(li + 1).padStart(2, '0')}
                    </span>
                    <span className="ml-2 text-base leading-relaxed text-ink-soft">{lv}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {/*
        Mounted unconditionally, always in the DOM: a role="status" node
        inserted only once the reader finishes is unreliably announced by
        screen readers, but changing the contents of one already present is
        announced reliably. So this div exists from first render; only its
        children are conditional.
      */}
      <div role="status" aria-live="polite" className="border-t border-cobalt">
        {done && (
          <div className="py-4">
            <p className="kicker text-cobalt-deep">Your placement</p>
            <p className="mt-1.5 font-display text-h3 text-ink">{levels[placement]}</p>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-soft">{verdicts[placement]}</p>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{rule ?? DEFAULT_RULE}</p>
            <button
              type="button"
              onClick={() => setAnswers({})}
              className="mt-4 inline-flex min-h-[44px] items-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cobalt-deep underline decoration-rule underline-offset-4 hover:decoration-cobalt-deep"
            >
              Clear answers
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
