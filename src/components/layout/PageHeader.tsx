import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import { getPage } from '../../data/pages'
import { EASE_OUT_EXPO } from '../../lib/motion'

interface PageHeaderMeta {
  label: string
  value: string
}

interface PageHeaderLink {
  to: string
  label: string
}

interface PageHeaderProps {
  kicker?: string
  title: string
  /** The chapter's contract sentence — the one question this page answers. */
  question?: string
  subtitle?: string
  meta?: PageHeaderMeta[]
  /** Slugs of pages that should be read first. */
  prerequisites?: string[]
  prev?: PageHeaderLink
  next?: PageHeaderLink
  /** Wired to the page's accordions — present only when the page has any. */
  onExpandAll?: () => void
  expanded?: boolean
}

// Orchestrated one-shot entrance. Framer collapses this for reduced-motion users.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
}

/** Per-page hero: kicker, display title, the question, prereq chips, subtitle, meta row. Left-aligned. */
export function PageHeader({
  kicker,
  title,
  question,
  subtitle,
  meta,
  prerequisites,
  prev,
  next,
  onExpandAll,
  expanded,
}: PageHeaderProps) {
  const prereqPages = (prerequisites ?? []).map((slug) => getPage(slug)).filter((p) => p !== undefined)

  return (
    <motion.header className="pt-14 pb-10 sm:pt-20 sm:pb-14" variants={container} initial="hidden" animate="show">
      {(kicker || prev || next) && (
        <div className="flex items-center justify-between gap-4">
          {kicker ? (
            <motion.p variants={item} className="kicker">
              {kicker}
            </motion.p>
          ) : (
            <span />
          )}
          {(prev || next) && (
            <motion.nav variants={item} aria-label="Page navigation" className="flex items-center gap-2">
              {prev ? (
                <Link
                  to={prev.to}
                  aria-label={`Previous: ${prev.label}`}
                  title={prev.label}
                  className="flex size-11 items-center justify-center rounded-full border border-rule text-muted transition-colors hover:border-ember hover:text-ember-deep"
                >
                  <ArrowLeft size={16} aria-hidden />
                </Link>
              ) : (
                <span className="size-11" />
              )}
              {next ? (
                <Link
                  to={next.to}
                  aria-label={`Next: ${next.label}`}
                  title={next.label}
                  className="flex size-11 items-center justify-center rounded-full border border-rule text-muted transition-colors hover:border-ember hover:text-ember-deep"
                >
                  <ArrowRight size={16} aria-hidden />
                </Link>
              ) : null}
            </motion.nav>
          )}
        </div>
      )}

      <motion.h1 variants={item} className="mt-3 text-display-lg text-ink">
        {title}
      </motion.h1>

      {question && (
        <motion.p variants={item} className="mt-4 max-w-prose font-display text-h4 font-semibold text-ink-soft">
          {question}
        </motion.p>
      )}

      {subtitle && (
        <motion.p variants={item} className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
          {subtitle}
        </motion.p>
      )}

      {prereqPages.length > 0 && (
        <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-2">
          <span className="kicker">Read first</span>
          {prereqPages.map((p) => (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              className="rounded-full border border-rule bg-surface px-3 py-1 text-sm text-ink-soft transition-colors hover:border-ember hover:text-ember-deep"
            >
              {p.title}
            </Link>
          ))}
        </motion.div>
      )}

      {meta && meta.length > 0 && (
        <motion.dl variants={item} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{m.label}</dt>
              <dd className="text-sm font-medium text-ink">{m.value}</dd>
            </div>
          ))}
        </motion.dl>
      )}

      {onExpandAll && (
        <motion.button
          variants={item}
          type="button"
          onClick={onExpandAll}
          className="mt-8 flex min-h-[44px] items-center gap-2 rounded-full border border-rule px-4 text-sm text-ink-soft transition-colors hover:border-ember hover:text-ember-deep"
        >
          {expanded ? <ChevronsDownUp size={16} aria-hidden /> : <ChevronsUpDown size={16} aria-hidden />}
          {expanded ? 'Collapse all' : 'Expand all'}
        </motion.button>
      )}
    </motion.header>
  )
}
