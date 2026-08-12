import { PAGES } from '../data/pages'
import type { PageMeta } from '../types'

export interface SearchResult {
  page: PageMeta
  score: number
}

/**
 * Search over the PAGES manifest — title, question, part, concepts,
 * keywords. No full-text index: that data is already in the main bundle
 * (it drives the router and sidebar), so this costs nothing extra to ship.
 * ponytail: substring/token match, not fuzzy or ranked by relevance beyond
 * field weight. Add lazy full-text (a generated index chunk) if headings
 * and keywords ever stop being enough surface to find things by.
 */
export function search(query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []

  const results: SearchResult[] = []
  for (const page of PAGES) {
    if (page.status !== 'live') continue
    let score = 0
    if (page.title.toLowerCase().includes(q)) score += 3
    if (page.question?.toLowerCase().includes(q)) score += 2
    for (const c of page.concepts ?? []) if (c.toLowerCase().includes(q)) score += 2
    for (const k of page.keywords ?? []) if (k.toLowerCase().includes(q)) score += 1
    if (score > 0) results.push({ page, score })
  }
  return results.sort((a, b) => b.score - a.score).slice(0, 8)
}
