import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'
import { MobileDrawer } from './MobileDrawer'
import { CommandPalette } from './CommandPalette'
import { getPage } from '../../data/pages'

const SITE_TITLE = 'The AI-Native Marketing Handbook'

interface SidebarLayoutProps {
  children: ReactNode
}

/** App shell: skip link, desktop sidebar / mobile header+drawer, search palette, main content. */
export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  // Opener element captured on open so focus can return to it on close.
  const openerRef = useRef<HTMLElement | null>(null)
  const searchOpenerRef = useRef<HTMLElement | null>(null)

  const firstRender = useRef(true)

  useEffect(() => {
    setDrawerOpen(false)
    // Reset scroll on navigation (prev/next pager, sidebar links) so each page opens at the top.
    // Explicit `instant` overrides the global `scroll-behavior: smooth` (index.css, for in-page
    // anchor/accordion jumps) — without it this animates and visibly races PageTransition's own
    // fade+rise, reading as janky rather than a clean cut to the top of the new page.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // A client-side route change is invisible to assistive tech unless something
    // says so: the document keeps its old title and focus stays wherever it was
    // (usually <body>), so a screen-reader user gets no signal that the whole page
    // just changed. Title + focus are the two halves of the standard SPA fix.
    const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '')
    const meta = getPage(slug)
    document.title = meta ? `${meta.title} — ${SITE_TITLE}` : SITE_TITLE

    // Not on first paint — moving focus on initial load fights the browser's own
    // restore behaviour and steals it from the skip link.
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    // <main>, not the <h1>: PageTransition wraps the route in AnimatePresence
    // mode="wait", so the incoming heading has not mounted yet when this runs —
    // focusing it here would hit the *outgoing* one and land on <body> the moment
    // it unmounts. <main> is outside the transition and always present.
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [location.pathname])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey
      const target = e.target as HTMLElement
      const inField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if ((isMeta && e.key === 'k') || (e.key === '/' && !inField)) {
        e.preventDefault()
        openSearch()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const openDrawer = () => {
    openerRef.current = document.activeElement as HTMLElement | null
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    openerRef.current?.focus()
  }

  const openSearch = () => {
    // ⌘K / `/` is a global listener, so it commonly fires with nothing focused —
    // and `body.focus()` is a no-op, which would silently drop focus on close.
    // Fall back to <main> so the return target is always something real.
    const active = document.activeElement as HTMLElement | null
    searchOpenerRef.current =
      active && active !== document.body ? active : document.getElementById('main')
    setSearchOpen(true)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    searchOpenerRef.current?.focus()
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 font-mono text-sm text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <Sidebar onSearch={openSearch} />
      <MobileHeader open={drawerOpen} onOpen={openDrawer} onSearch={openSearch} />
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
      <CommandPalette open={searchOpen} onClose={closeSearch} />

      <div className="md:pl-[260px]">
        {/* tabIndex -1 so the skip link and the search-close fallback can focus it. */}
        <main id="main" tabIndex={-1} className="mx-auto max-w-5xl px-5 pb-20 outline-none sm:px-8 sm:pb-24">
          {children}
        </main>
      </div>
    </>
  )
}
