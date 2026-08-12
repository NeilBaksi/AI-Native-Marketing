import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { PAGES } from '../../data/pages'
import { PARTS } from '../../types'
import type { PartId } from '../../types'
import { EASE_OUT_EXPO } from '../../lib/motion'

interface NavLinksProps {
  layoutId: string
  onNavigate?: () => void
}

const PART_ORDER: PartId[] = ['foundations', 'spine', 'workflows', 'cases', 'applied', 'toolkit', 'reference', 'about']

/**
 * Renders PAGES grouped by part, with collapsible groups — the current part
 * auto-opens, the rest start collapsed. A real change from the sibling
 * sites' flat NAV list, needed once the tree grows past a handful of pages.
 * The active-state pill is shared between Sidebar and MobileDrawer via
 * `layoutId`, same pattern both siblings use.
 */
export function NavLinks({ layoutId, onNavigate }: NavLinksProps) {
  const location = useLocation()
  const currentSlug = location.pathname.replace(/^\//, '').replace(/\/$/, '')
  const currentPart = PAGES.find((p) => p.slug === currentSlug)?.part

  const [openParts, setOpenParts] = useState<Set<PartId>>(new Set(currentPart ? [currentPart] : ['foundations']))

  const toggle = (part: PartId) => {
    setOpenParts((prev) => {
      const next = new Set(prev)
      next.has(part) ? next.delete(part) : next.add(part)
      return next
    })
  }

  return (
    <>
      {PART_ORDER.map((part) => {
        const pages = PAGES.filter((p) => p.part === part)
        if (pages.length === 0) return null
        const isOpen = openParts.has(part)

        return (
          <div key={part}>
            <button
              type="button"
              onClick={() => toggle(part)}
              aria-expanded={isOpen}
              className="flex min-h-[44px] w-full items-center justify-between gap-2 px-3 text-left"
            >
              <span className="kicker">{PARTS[part]}</span>
              <ChevronRight
                size={14}
                className={clsx('shrink-0 text-muted transition-transform', isOpen && 'rotate-90')}
                aria-hidden
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out-expo"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <ul className="flex flex-col gap-1 pb-2">
                  {pages.map((page) => (
                    <li key={page.slug}>
                      <NavLink
                        to={`/${page.slug}`}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          clsx(
                            'relative flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm transition-colors',
                            isActive
                              ? 'font-semibold text-ember-deep'
                              : page.status === 'stub'
                                ? 'text-muted'
                                : 'text-ink-soft hover:bg-surface hover:text-ember-deep',
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <motion.span
                                layoutId={layoutId}
                                className="absolute inset-0 rounded-lg bg-ember/10"
                                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                              />
                            )}
                            <span className="relative font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                              {page.index}
                            </span>
                            <span className="relative">{page.title}</span>
                            {page.status === 'stub' && (
                              <span className="relative ml-auto size-1.5 shrink-0 rounded-full bg-muted" aria-label="Drafting" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
