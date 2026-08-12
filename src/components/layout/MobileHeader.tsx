import { Link } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'

interface MobileHeaderProps {
  onOpen: () => void
  onSearch?: () => void
}

/** Sticky mobile top bar: wordmark, search button, hamburger that opens the drawer. */
export function MobileHeader({ onOpen, onSearch }: MobileHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md md:hidden"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="font-display text-base font-extrabold leading-tight text-ink">
          AI-Native Marketing
        </Link>
        <div className="flex items-center gap-1">
          {onSearch && (
            <button
              type="button"
              onClick={onSearch}
              aria-label="Search"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface"
            >
              <Search size={20} aria-hidden />
            </button>
          )}
          <button
            type="button"
            onClick={onOpen}
            aria-label="Open navigation"
            aria-expanded={false}
            aria-controls="mobile-nav"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface"
          >
            <Menu size={22} aria-hidden />
          </button>
        </div>
      </div>
    </header>
  )
}
