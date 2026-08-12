import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { NavLinks } from './NavLinks'

interface SidebarProps {
  onSearch: () => void
}

/** Desktop-only fixed left rail: wordmark, search trigger, grouped nav, footer note. */
export function Sidebar({ onSearch }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[260px] flex-col border-r border-rule bg-surface md:flex">
      <div className="px-6 pt-8 pb-6">
        <Link to="/" className="font-display text-xl font-extrabold leading-tight text-ink">
          AI-Native
          <br />
          Marketing
        </Link>
        <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          The Handbook
        </p>
      </div>

      <div className="px-4">
        <button
          type="button"
          onClick={onSearch}
          className="flex min-h-[44px] w-full items-center gap-2 rounded-lg border border-rule bg-paper px-3 text-sm text-muted transition-colors hover:border-ember hover:text-ember-deep"
        >
          <Search size={15} aria-hidden />
          Search
          <kbd className="ml-auto font-mono text-[0.65rem] text-muted">⌘K</kbd>
        </button>
      </div>

      <nav aria-label="Handbook navigation" className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
        <NavLinks layoutId="sidebar-active" />
      </nav>

      <div className="border-t border-rule px-6 py-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
          By Neil Baksi
        </p>
      </div>
    </aside>
  )
}
