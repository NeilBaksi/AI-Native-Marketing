import { useEffect } from 'react'
import type { RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Traps Tab/Shift+Tab focus inside `ref` while `active` is true, and closes
 * via `onClose` on Escape. Does not manage initial or return focus — the
 * caller owns that.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return
    const node = ref.current
    if (!node) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      // `tabindex="-1"` must be excluded by element too, not just by the
      // `[tabindex]` clause: `button:not([disabled])` matches a -1 button anyway,
      // which made the trap treat a programmatically-focusable-only element as its
      // Tab boundary. Native Tab then skipped it and walked straight out of the
      // dialog. Anything not in the tab order cannot be a trap edge.
      const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null && el.getAttribute('tabindex') !== '-1',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [ref, active, onClose])
}
