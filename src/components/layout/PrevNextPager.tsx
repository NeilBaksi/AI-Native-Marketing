import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface PagerLink {
  to: string
  label: string
}

interface PrevNextPagerProps {
  prev?: PagerLink
  next?: PagerLink
}

/**
 * Footer prev/next nav row. Missing sides render an empty spacer to keep
 * alignment (spacer only matters once the two sides sit in a row, at `sm:`).
 *
 * Stacked below `sm:`, side-by-side above it — not a 50/50 split at every
 * width. Two equal-width `flex-1` columns plus `break-words` let a long
 * single-word title with no internal space to wrap at ("Methodology",
 * "Orchestrate") get squeezed below its own width and cut mid-word
 * ("Methodolog/y") once `min-w-0` let the column shrink that far. Same root
 * cause as the FlowChain fix earlier this round, in a different component:
 * forcing two things to share a row that don't have room for both. Giving
 * each side the full row on narrow screens removes the squeeze instead of
 * papering over it with more hyphenation logic.
 */
export function PrevNextPager({ prev, next }: PrevNextPagerProps) {
  return (
    <nav
      aria-label="Page navigation"
      className="flex flex-col gap-3 py-12 sm:flex-row sm:items-stretch sm:justify-between sm:gap-4 sm:py-16"
    >
      {prev ? (
        <Link
          to={prev.to}
          className="group flex min-w-0 items-center gap-3 rounded-xl border border-rule bg-surface px-5 py-4 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-ember sm:flex-1"
        >
          <ArrowLeft size={18} className="shrink-0 text-muted transition-colors group-hover:text-ember-deep" aria-hidden />
          <span className="flex min-w-0 flex-col">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Previous</span>
            <span className="break-words text-sm font-medium text-ink">{prev.label}</span>
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block sm:flex-1" />
      )}

      {next ? (
        <Link
          to={next.to}
          className="group flex min-w-0 items-center gap-3 rounded-xl border border-rule bg-surface px-5 py-4 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-ember sm:flex-1 sm:justify-end sm:text-right"
        >
          <span className="flex min-w-0 flex-col">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Next</span>
            <span className="break-words text-sm font-medium text-ink">{next.label}</span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-muted transition-colors group-hover:text-ember-deep" aria-hidden />
        </Link>
      ) : (
        <div className="hidden sm:block sm:flex-1" />
      )}
    </nav>
  )
}
