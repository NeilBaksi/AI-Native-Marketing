import type { ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { useExpandAll } from '../../lib/expand-all'

export interface AccordionItemData {
  /** Optional stable id for deep-linking (/#/slug#item-id). Falls back to a generated one. */
  id?: string
  title: string
  body: ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
}

const CLOSE_TRANSITION_MS = 300

function AccordionItem({ id, title, body }: AccordionItemData) {
  const [open, setOpen] = useState(false)
  const expandAll = useExpandAll()
  const rawId = useId()
  const itemId = id ?? rawId
  const triggerId = `${itemId}-trigger`
  const panelId = `${itemId}-panel`
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (expandAll !== undefined) setOpen(expandAll)
  }, [expandAll])

  // Ctrl+F / Cmd+F fix: collapsed content stays in the accessibility tree via
  // the grid-rows technique, but Chrome's find-in-page won't surface text
  // inside a 0-height clipped region unless it's marked `hidden="until-found"`.
  // Set that only once the close animation has visually finished, so the
  // open/close toggle itself still animates smoothly.
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    if (open) {
      el.removeAttribute('hidden')
      return
    }
    const timer = setTimeout(() => el.setAttribute('hidden', 'until-found'), CLOSE_TRANSITION_MS)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const handler = () => setOpen(true)
    el.addEventListener('beforematch', handler)
    return () => el.removeEventListener('beforematch', handler)
  }, [])

  return (
    <div id={itemId} className="scroll-mt-24 border-b border-rule">
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-[44px] w-full items-center justify-between gap-4 py-4 text-left font-medium text-ink transition-colors duration-200 hover:text-ember-deep"
        >
          <span>{title}</span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="shrink-0 text-muted"
          >
            <ChevronDown size={18} strokeWidth={1.75} />
          </motion.span>
        </button>
      </h3>
      <div
        id={panelId}
        ref={panelRef}
        role="region"
        aria-labelledby={triggerId}
        className="grid transition-[grid-template-rows] duration-300 ease-out-expo"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-[0.92rem] leading-relaxed text-ink-soft">{body}</div>
        </div>
      </div>
    </div>
  )
}

/**
 * Accessible disclosure group. Elaboration only, never load-bearing — a
 * chapter must teach its idea completely with every item shut. See CLAUDE.md.
 */
export function Accordion({ items }: AccordionProps) {
  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem key={item.id ?? i} {...item} />
      ))}
    </div>
  )
}
