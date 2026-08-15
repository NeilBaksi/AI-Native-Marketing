import type { ReactNode } from 'react'

const TONE = {
  // Same rationing as everywhere else: ember = consequence, pine = construction.
  ember: 'from-ember/25 via-ember/25 to-ember/0',
  pine: 'from-pine/25 via-pine/25 to-pine/0',
} as const

interface MarkProps {
  tone?: keyof typeof TONE
  children: ReactNode
}

/**
 * Felt-tip swipe, not a selection block: the tint fills the bottom 40% of the
 * line box and feathers out by 60%, so it reads as ink laid along the baseline
 * rather than a rectangle behind the glyph box. ::selection is bg-ember/15 at
 * full line-box height with a hard edge — 25% over 40% of the height with a
 * soft top is unmistakably a different object.
 *
 * Three load-bearing details:
 *
 * 1. `box-decoration-clone` — required, not cosmetic. A wrapped <mark> without
 *    it gets ONE background box across all its line fragments, so `to top`
 *    measures against the full multi-line height and only the last line gets
 *    a swipe. With it, every fragment repaints the whole gradient.
 * 2. `bg-transparent` — Preflight doesn't reset `mark { background: yellow }`,
 *    and this gradient is fully transparent above 60%, so the UA yellow would
 *    show through the top without an explicit override (see the same bug,
 *    live, in Prompt.tsx before this pass).
 * 3. `to-{tone}/0`, never `to-transparent` — the `transparent` keyword is
 *    rgba(0,0,0,0); interpolating an oklch stop toward it drags the feather
 *    through grey. Same hue at alpha 0 does not.
 */
export function Mark({ tone = 'ember', children }: MarkProps) {
  return (
    <mark
      className={`box-decoration-clone -mx-[0.14em] rounded-[0.08em] bg-transparent bg-gradient-to-t from-0% via-40% to-60% px-[0.14em] text-ink ${TONE[tone]}`}
    >
      {children}
    </mark>
  )
}
