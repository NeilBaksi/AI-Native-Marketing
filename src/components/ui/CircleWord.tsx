import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../../lib/motion'

// Hand-drawn ink convention (first use: the Home hero; this is the second
// consumer — PageHeader circling a word in a part-opener's title — so it's
// extracted here per the rule of two). Normalized 100u-tall viewBox with
// aspect matched to its target box, cubic beziers only with asymmetric
// control points, currentColor stroke.
//
// viewBox is 4.8:1, a reasonable match for most short display-weight words at
// this scale. `preserveAspectRatio="none"` stretches to whatever box the
// wrapped word occupies — safe as long as that box's own aspect stays in the
// same neighbourhood, which display-weight single/double words do. Don't add
// `vector-effect="non-scaling-stroke"` to fix a badly-off aspect; retune the
// viewBox instead — it pins the stroke to device pixels (stops scaling with
// the type) and its interaction with framer's pathLength normalization is
// untested cross-engine.
//
// Near-closed loop with a small crossing overshoot where the stroke closes
// past its own start — a real pen circle rarely lands exactly on its start
// point, it drifts a little and crosses over.
const CIRCLE_D =
  'M366 16C296 5 178 2 106 15C40 27 12 46 20 62C30 82 100 93 192 95C298 97 414 86 454 66C470 55 460 32 412 20C394 15 374 11 348 10'

/**
 * Circles a word or short phrase in place, behind the letterforms. Used
 * sparingly — one per page at most, on a title, not in running prose (that's
 * what `<Mark>` is for).
 */
export function CircleWord({ children }: { children: ReactNode }) {
  // <MotionConfig reducedMotion="user"> in App.tsx does NOT cover this: framer
  // only auto-suppresses "positional" keys (width/height/inset/transforms),
  // and pathLength isn't one of them. index.css's reduced-motion media block
  // can't help either — it kills CSS animation/transition, and this is WAAPI.
  // Has to be gated by hand.
  const reduceMotion = useReducedMotion()

  return (
    <span className="relative isolate inline-block">
      {children}
      {/*
        Positioned by `inset`, never `translate` — @media print forces
        `transform: none !important` site-wide, which would snap a
        translate-centred overlay to the wrong place on paper.

        `isolate` on the wrapping span + `-z-10` here is what puts the
        ellipse BEHIND the letterforms rather than over them: `relative`
        alone doesn't establish a stacking context (only `position` +
        an explicit z-index does), so a bare negative z-index would
        escape to the nearest ancestor that has one — `isolate` forces
        that context to exist right here, scoped to this word only.
      */}
      <svg
        aria-hidden
        viewBox="0 0 480 100"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute bottom-[-0.08em] left-[-0.2em] right-[-0.2em] top-[-0.06em] -z-10 overflow-visible text-ember/45"
      >
        <motion.path
          d={CIRCLE_D}
          stroke="currentColor"
          strokeWidth={6.5}
          strokeLinecap="round"
          // `animate` is an object, not a variant label, so it does NOT
          // inherit an ancestor's variants/animate="show" through framer's
          // variant propagation — this stays a separate gesture regardless
          // of whatever entrance animation the caller wraps it in.
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.65, ease: EASE_OUT_EXPO }}
        />
      </svg>
    </span>
  )
}
