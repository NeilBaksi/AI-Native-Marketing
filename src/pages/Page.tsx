import type { ComponentType } from 'react'
import { lazy, Suspense, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getPage } from '../data/pages'
import { PARTS } from '../types'
import { pager } from '../lib/pager'
import { ExpandAllContext } from '../lib/expand-all'
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
function getBody(slug: string): ComponentType | undefined {
  if (!LAZY_BODIES.has(slug)) {
    const loader = BODIES[`../content/${slug}.mdx`]
    if (!loader) return undefined
    LAZY_BODIES.set(slug, lazy(loader as () => Promise<{ default: ComponentType }>))
  }
  return LAZY_BODIES.get(slug)
}

export default function Page() {
  const location = useLocation()
  const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '')
  const meta = getPage(slug)
  const [expanded, setExpanded] = useState(false)

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
        onExpandAll={() => setExpanded((e) => !e)}
        expanded={expanded}
      />

      {meta.synthetic && <SyntheticBanner scope="page" subject={meta.synthetic.subject} note={meta.synthetic.note} />}

      <ExpandAllContext.Provider value={expanded}>
        <ErrorBoundary key={slug}>
          <Suspense fallback={<PageSkeleton kicker={PARTS[meta.part]} title={meta.title} />}>
            <div className="flex flex-col gap-8">
              <Body />
            </div>
          </Suspense>
        </ErrorBoundary>
      </ExpandAllContext.Provider>

      {meta.sources.length > 0 && (
        <div className="mt-10">
          <SourcesDisclosure sources={meta.sources} openByDefault={meta.kind === 'case' || meta.kind === 'applied'} />
        </div>
      )}

      <PrevNextPager prev={prev} next={next} />
    </>
  )
}
