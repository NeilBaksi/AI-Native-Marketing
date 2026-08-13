import { PAGES } from '../data/pages'

/**
 * Prev/next derived from PAGES order, so the pager can never drift from the
 * sidebar. Skips stub pages — there's nothing to read there yet.
 *
 * `to` is an absolute path, leading slash included. It used to be a bare slug,
 * which every consumer then had to remember to prefix — PrevNextPager did,
 * PageHeader didn't, and a relative `to` inside the `/*` splat route resolves
 * against the *full* matched pathname, so the top arrows navigated to
 * `/spine/insight-gap/foundations/four-layer-stack` and bounced to Home.
 * Returning the path already-formed makes that class of bug unreachable.
 */
export function pager(slug: string): {
  prev?: { to: string; label: string }
  next?: { to: string; label: string }
} {
  const live = PAGES.filter((p) => p.status === 'live')
  const i = live.findIndex((p) => p.slug === slug)
  if (i < 0) return {}
  const prev = live[i - 1]
  const next = live[i + 1]
  return {
    prev: prev ? { to: `/${prev.slug}`, label: prev.title } : undefined,
    next: next ? { to: `/${next.slug}`, label: next.title } : undefined,
  }
}
