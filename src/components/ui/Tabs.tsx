import type { ReactNode, KeyboardEvent } from 'react'
import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  label: string
  items: TabItem[]
}

/**
 * ARIA tablist with roving tabindex. Only for mutually exclusive parallel
 * variants — never nest an accordion inside a tab panel (CLAUDE.md).
 */
export function Tabs({ label, items }: TabsProps) {
  const [active, setActive] = useState(0)
  const rawId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const move = (next: number) => {
    const clamped = (next + items.length) % items.length
    setActive(clamped)
    tabRefs.current[clamped]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); move(active + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); move(active - 1) }
    else if (e.key === 'Home') { e.preventDefault(); move(0) }
    else if (e.key === 'End') { e.preventDefault(); move(items.length - 1) }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="-mx-1 flex gap-1 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const isActive = i === active
          const tabId = `${rawId}-tab-${item.id}`
          const panelId = `${rawId}-panel-${item.id}`
          return (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[i] = el }}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={clsx(
                'min-h-[44px] shrink-0 rounded-full border px-4 text-sm font-medium transition-colors',
                isActive
                  ? 'border-ember bg-ember/5 text-ember-deep'
                  : 'border-rule text-ink-soft hover:border-ember hover:text-ember-deep',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {items.map(
            (item, i) =>
              i === active && (
                <motion.div
                  key={item.id}
                  id={`${rawId}-panel-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`${rawId}-tab-${item.id}`}
                  tabIndex={0}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.content}
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
