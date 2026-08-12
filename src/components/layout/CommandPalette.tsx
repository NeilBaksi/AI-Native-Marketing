import type { KeyboardEvent } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { search } from '../../lib/search'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { EASE_OUT_EXPO } from '../../lib/motion'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

/**
 * ⌘K / Ctrl-K / `/` search over the page manifest — title, question,
 * concepts, keywords. See src/lib/search.ts for what it does and doesn't
 * cover.
 */
export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  useFocusTrap(panelRef, open, onClose)
  useLockBodyScroll(open)

  const results = search(query)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      // Focus after the enter transition starts so the caret doesn't jump mid-animation.
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setActiveIndex(0), [query])

  const go = (slug: string) => {
    navigate(`/${slug}`)
    onClose()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const result = results[activeIndex]
      if (result) go(result.page.slug)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="fixed inset-0 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="fixed left-1/2 top-24 w-[min(560px,92vw)] -translate-x-1/2 rounded-2xl border border-rule bg-paper shadow-xl"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          >
            <div className="flex items-center gap-3 border-b border-rule px-4">
              <Search size={18} className="shrink-0 text-muted" aria-hidden />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls={listId}
                aria-activedescendant={results[activeIndex] ? `${listId}-${results[activeIndex].page.slug}` : undefined}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search the handbook…"
                className="min-h-[52px] w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
              />
            </div>
            <ul id={listId} role="listbox" aria-label="Search results" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && query.trim().length >= 2 && (
                <li className="px-3 py-6 text-center text-sm text-muted">No results for "{query}"</li>
              )}
              {results.map((r, i) => (
                <li key={r.page.slug} id={`${listId}-${r.page.slug}`} role="option" aria-selected={i === activeIndex}>
                  <button
                    type="button"
                    onClick={() => go(r.page.slug)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex min-h-[44px] w-full flex-col items-start rounded-lg px-3 py-2 text-left transition-colors ${
                      i === activeIndex ? 'bg-surface' : ''
                    }`}
                  >
                    <span className="text-sm font-medium text-ink">{r.page.title}</span>
                    {r.page.question && <span className="text-xs text-muted">{r.page.question}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
