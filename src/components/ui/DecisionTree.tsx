import clsx from 'clsx'
import { OctagonX } from 'lucide-react'

export interface DecisionOutcome {
  /** The condition, short and mono, e.g. 'Reversible within an hour'. */
  when: string
  /** The outcome, e.g. 'Fully Autonomous (L4)'. */
  then: string
  /** Optional one-line justification. */
  because?: string
  /** Marks a terminal "do not proceed" outcome — renders in ember with a stop icon. */
  stop?: boolean
}

export interface DecisionNode {
  question: string
  branches: DecisionOutcome[]
}

export interface DecisionTreeProps {
  root: {
    question: string
    /** One nested question per branch, at most. Depth is capped at 2 by the type. */
    branches: (DecisionOutcome & { next?: DecisionNode })[]
  }
  /** Mono caption under the tree. */
  caption?: string
}

/**
 * One outline row: the elbow connector, the If/then/because text, and — for
 * a branch carrying `next` — its nested question rendered as a second
 * <ul> one gutter further in. Recursing through this single component
 * (rather than duplicating it for root vs. nested branches) is what keeps
 * the depth-2 cap enforced only by the type (DecisionNode.branches has no
 * `next`, so this function can never be called a third level deep) instead
 * of also needing a runtime check here.
 */
function Branch({ b, isLast }: { b: DecisionOutcome & { next?: DecisionNode }; isLast: boolean }) {
  return (
    <li className="relative pl-6 sm:pl-8">
      {/*
        The elbow is the whole trick: a ~12×18px box with only its
        bottom-left corner drawn (border-b + border-l + rounded-bl-[6px])
        reads as a ⌐ connector in pure CSS — no SVG, no layout engine, no
        measurement. It sits in a fixed-width gutter (pl-6/24px, sm:pl-8/32px)
        that never resizes, so nothing can constrain it below its content
        width — the structural fix for the reflow bug FlowChain's doc
        comment describes.
      */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-[1.15rem] w-3 rounded-bl-[6px] border-b border-l border-rule sm:w-4"
      />
      {/* continuation stem down to the next sibling's elbow, omitted on the last branch */}
      {!isLast && <span aria-hidden className="absolute bottom-0 left-0 top-[1.15rem] w-px bg-rule" />}
      <div className="py-2.5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-pine-deep">If · {b.when}</p>
        <p
          className={clsx(
            'mt-1 flex items-center gap-1.5 font-display text-base font-semibold',
            b.stop ? 'text-ember-deep' : 'text-ink',
          )}
        >
          {/* stop is never colour-alone: OctagonX carries the same meaning for colour-blind readers */}
          {b.stop && <OctagonX size={14} strokeWidth={2} aria-hidden className="shrink-0" />}
          {b.then}
        </p>
        {b.because && <p className="mt-1 max-w-prose text-sm leading-relaxed text-ink-soft">{b.because}</p>}
        {b.next && (
          <div className="mt-3 min-w-0 pl-6 sm:pl-8">
            <p className="font-display text-h4 text-ink">{b.next.question}</p>
            <ul className="mt-3 flex flex-col">
              {b.next.branches.map((nb, i) => (
                <Branch key={nb.when} b={nb} isLast={i === b.next!.branches.length - 1} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  )
}

/**
 * A vertical decision outline — file-tree style borders with elbow
 * connectors, not a chain of boxed nodes. No node has a border, fill, or
 * radius; the only geometry is the 1px elbow living in its gutter.
 *
 * Min viable width: 184px (24px gutter + 160px content). Stacking
 * breakpoint: none — this is a vertical outline at every viewport, by
 * design, so there is no horizontal arrangement to fall back from. At depth
 * 2 the gutter compounds to 48px (24px + 24px), leaving 240px of content at
 * a 288px viewport (iPhone SE minus body padding) — still comfortably above
 * the 160px floor, which is why depth is capped at 2 rather than left open.
 */
export function DecisionTree({ root, caption }: DecisionTreeProps) {
  return (
    <div>
      <p className="font-display text-h4 text-ink">{root.question}</p>
      <ul className="mt-3 flex flex-col">
        {root.branches.map((b, i) => (
          <Branch key={b.when} b={b} isLast={i === root.branches.length - 1} />
        ))}
      </ul>
      {caption && (
        <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{caption}</p>
      )}
    </div>
  )
}
