import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { NavLinks } from './NavLinks'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { EASE_OUT_EXPO } from '../../lib/motion'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

/** Mobile nav drawer: dimmed backdrop + slide-in panel, focus-trapped and a11y-complete. */
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, open, onClose)
  useLockBodyScroll(open)

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="md:hidden">
          <motion.div
            className="fixed inset-0 z-40 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            tabIndex={-1}
            className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-xs flex-col bg-surface shadow-xl"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <span className="font-display text-lg font-extrabold text-ink">AI-Native Marketing</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-ink transition-colors hover:bg-paper"
              >
                <X size={22} aria-hidden />
              </button>
            </div>
            <nav aria-label="Handbook navigation" className="flex-1 overflow-y-auto px-4 pb-6">
              <NavLinks layoutId="mobile-nav-active" onNavigate={onClose} />
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
