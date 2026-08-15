import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getPage } from '../../data/pages'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { CircleWord } from '../ui'

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
  /** Exact substring of `title` to wrap in the hand-drawn CircleWord mark. */
  circleWord?: string
  /** The chapter's contract sentence — the one question this page answers. */
  question?: string
  subtitle?: string
  meta?: PageHeaderMeta[]
  /** Slugs of pages that should be read first. */
  prerequisites?: string[]
  prev?: PageHeaderLink
  next?: PageHeaderLink
}

/**
 * Splits `title` around the first occurrence of `word` so the middle piece
 * can be wrapped in <CircleWord>. Plain substring match, not a regex — title
 * text is authored, not user input, and a literal match is all `circleWord`
 * values ever need (see the 7 part-opener entries in data/pages.ts).
 */
function splitOnWord(title: string, word: string | undefined): [string, string, string] | null {
  if (!word) return null
  const i = title.indexOf(word)
  if (i === -1) return null
  return [title.slice(0, i), word, title.slice(i + word.length)]
}

// Orchestrated one-shot entrance. Framer collapses this for reduced-motion users.
//
// Fade only — deliberately no `y`. PageTransition already rises the entire page
// subtree (y: 12 → 0) on every route change, so a second per-child rise here
// compounded to ~26px of visible title travel and read as the header lurching
// upward after load. One movement per navigation, owned by PageTransition; this
// stagger contributes sequence, not displacement.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
}
const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
}

/** Per-page hero: kicker, display title, the question, prereq chips, subtitle, meta row. Left-aligned. */
export function PageHeader({
  kicker,
  title,
  circleWord,
  question,
  subtitle,
  meta,
  prerequisites,
  prev,
  next,
}: PageHeaderProps) {
  const prereqPages = (prerequisites ?? []).map((slug) => getPage(slug)).filter((p) => p !== undefined)
  const titleParts = splitOnWord(title, circleWord)

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
        {titleParts ? (
          <>
            {titleParts[0]}
            <CircleWord>{titleParts[1]}</CircleWord>
            {titleParts[2]}
          </>
        ) : (
          title
        )}
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
    </motion.header>
  )
}
