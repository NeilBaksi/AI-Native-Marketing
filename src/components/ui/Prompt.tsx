import type { ReactNode } from 'react'
import { CopyButton } from './CopyButton'
import { prompts, type PromptId } from '../../data/prompts'

/**
 * `[bracketed]` spans render as marks. This is the one place on the site where
 * colour carries an *instruction* rather than a category: the prompt body is a
 * template with slots, and an unmarked template gets pasted into a model with
 * `[PASTE TRANSCRIPTS]` still in it. Ember, not pine — a placeholder is what
 * *you* must supply, which is a stake, not a mechanism.
 *
 * The brackets are literal characters in the text, so with colour stripped the
 * placeholders are still unambiguously marked, and CopyButton receives the raw
 * unmodified string either way.
 */
const highlight = (s: string): ReactNode[] =>
  s.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith('[') ? (
      <mark key={i} className="rounded-[2px] bg-ember/10 px-1 text-ember-deep">
        {part}
      </mark>
    ) : (
      part
    ),
  )

/**
 * A copy-pasteable prompt, resolved from the typed registry by id.
 *
 * Not a card: two hairlines top and bottom, a header rail with the control
 * right-aligned, and a single `bg-surface` tonal step behind the payload only.
 * `rounded-2xl` is reserved for genuine cards (Callout/StatCallout), so the
 * sibling project's card shell is deliberately not ported.
 *
 * Min viable width 260px; no stacking breakpoint — the header rail is
 * `flex-wrap`, so the CopyButton drops below the title on narrow screens
 * without a media query.
 */
export function Prompt({ id }: { id: PromptId }) {
  const p = prompts[id]
  const titleId = `prompt-${id}`

  return (
    <section aria-labelledby={titleId} className="border-y border-rule">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 border-b border-rule py-3">
        <div className="min-w-0">
          <p className="kicker text-pine-deep">Prompt</p>
          <h4 id={titleId} className="mt-1 font-display text-h4 leading-snug text-ink">
            {p.title}
          </h4>
        </div>
        <CopyButton text={p.body} label={`Copy prompt: ${p.title}`} />
      </div>

      <p className="max-w-prose py-3 text-sm leading-relaxed text-ink-soft">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">Use when </span>
        {p.useWhen}
      </p>

      <pre className="whitespace-pre-wrap break-words border-t border-rule bg-surface px-4 py-4 font-mono text-[0.82rem] leading-relaxed text-ink">
        {highlight(p.body)}
      </pre>

      {p.tip && (
        <p className="max-w-prose border-t border-rule py-3 text-sm leading-relaxed text-muted">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em]">Then </span>
          {p.tip}
        </p>
      )}
    </section>
  )
}
