import type { ComponentType } from 'react'
import { lazy, Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getPage } from '../data/pages'
import { PARTS } from '../types'
import { pager } from '../lib/pager'
import { ErrorBoundary, PageHeader, PageSkeleton, PrevNextPager } from '../components/layout'
import { SyntheticBanner, SourcesDisclosure } from '../components/ui'

// Every MDX body in the site, lazily — Vite code-splits each into its own
// chunk automatically. Adding a page is one manifest row + one file here,
// no new route.
const BODIES = import.meta.glob<{ default: ComponentType }>('../content/**/*.mdx')

// lazy() must run once per module, not per render — calling it inside the
// component body creates a fresh promise each render and the Suspense
// boundary never resolves. Cache the lazy wrapper per slug instead.
const LAZY_BODIES = new Map<string, ComponentType>()

// A chunk fetch fails with "Failed to fetch dynamically imported module"
// when a browser holds an old cached index.html pointing at a hashed
// filename a newer deploy no longer serves. One full reload picks up the
// current index.html and its correct hashes; the flag stops a reload loop
// if the chunk is genuinely missing.
function lazyImportWithReload(loader: () => Promise<{ default: ComponentType }>) {
  return lazy(async () => {
    try {
      const mod = await loader()
      sessionStorage.removeItem('chunk-reload')
      return mod
    } catch (error) {
      // Only the built site goes stale like this — in dev a failed import
      // is a real MDX/syntax error, and reloading would just hide Vite's
      // error overlay behind a fresh reload loop.
      if (import.meta.env.DEV || sessionStorage.getItem('chunk-reload')) throw error
      sessionStorage.setItem('chunk-reload', '1')
      window.location.reload()
      return new Promise<never>(() => {})
    }
  })
}

function getBody(slug: string): ComponentType | undefined {
  if (!LAZY_BODIES.has(slug)) {
    const loader = BODIES[`../content/${slug}.mdx`]
    if (!loader) return undefined
    LAZY_BODIES.set(slug, lazyImportWithReload(loader as () => Promise<{ default: ComponentType }>))
  }
  return LAZY_BODIES.get(slug)
}

export default function Page() {
  const location = useLocation()
  const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '')
  const meta = getPage(slug)

  if (!meta) return <Navigate to="/" replace />

  const Body = getBody(slug)
  if (!Body) return <Navigate to="/" replace />

  const { prev, next } = pager(slug)

  return (
    <>
      <PageHeader
        kicker={PARTS[meta.part]}
        title={meta.title}
        question={meta.question}
        prerequisites={meta.prerequisites}
        prev={prev}
        next={next}
      />

      {meta.synthetic && <SyntheticBanner scope="page" subject={meta.synthetic.subject} note={meta.synthetic.note} />}

      <ErrorBoundary key={slug}>
        <Suspense fallback={<PageSkeleton />}>
          <div className="flex flex-col gap-8">
            <Body />
          </div>
        </Suspense>
      </ErrorBoundary>

      {meta.sources.length > 0 && (
        <div className="mt-10">
          <SourcesDisclosure sources={meta.sources} openByDefault={meta.kind === 'case' || meta.kind === 'applied'} />
        </div>
      )}

      <PrevNextPager prev={prev} next={next} />
    </>
  )
}
