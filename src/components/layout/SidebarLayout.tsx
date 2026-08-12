import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'
import { MobileDrawer } from './MobileDrawer'
import { CommandPalette } from './CommandPalette'

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

  useEffect(() => {
    setDrawerOpen(false)
    // Reset scroll on navigation (prev/next pager, sidebar links) so each page opens at the top.
    window.scrollTo(0, 0)
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
    searchOpenerRef.current = document.activeElement as HTMLElement | null
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
      <MobileHeader onOpen={openDrawer} onSearch={openSearch} />
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
      <CommandPalette open={searchOpen} onClose={closeSearch} />

      <div className="md:pl-[260px]">
        <main id="main" className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 sm:pb-24">
          {children}
        </main>
      </div>
    </>
  )
}
