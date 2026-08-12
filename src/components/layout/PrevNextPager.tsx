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

/** Footer prev/next nav row. Missing sides render an empty spacer to keep alignment. */
export function PrevNextPager({ prev, next }: PrevNextPagerProps) {
  return (
    <nav aria-label="Page navigation" className="flex items-stretch justify-between gap-4 py-12 sm:py-16">
      {prev ? (
        <Link
          to={`/${prev.to}`}
          className="group flex flex-1 items-center gap-3 rounded-xl border border-rule bg-surface px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-ember"
        >
          <ArrowLeft size={18} className="shrink-0 text-muted transition-colors group-hover:text-ember-deep" aria-hidden />
          <span className="flex min-w-0 flex-col">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Previous</span>
            <span className="break-words text-sm font-medium text-ink">{prev.label}</span>
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          to={`/${next.to}`}
          className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-rule bg-surface px-5 py-4 text-right transition-all hover:-translate-y-0.5 hover:border-ember"
        >
          <span className="flex min-w-0 flex-col">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Next</span>
            <span className="break-words text-sm font-medium text-ink">{next.label}</span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-muted transition-colors group-hover:text-ember-deep" aria-hidden />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
