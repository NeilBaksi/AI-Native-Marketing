import type { PageMeta } from '../types'

/**
 * The manifest. Single source of truth for routing, the sidebar, the pager,
 * prerequisite chips, and search — see docs/information-architecture.md for
 * the full planned 59-page tree. Home ('/') is not listed here; it's a
 * bespoke route (src/pages/Home.tsx), not a manifest-driven content page.
 */
export const PAGES: PageMeta[] = [
  {
    slug: 'start-here',
    title: 'Start Here',
    part: 'foundations',
    kind: 'static',
    index: '00',
    sources: [],
    status: 'live',
  },
  {
    slug: 'foundations/the-problem',
    title: 'The Problem',
    question: 'Why does marketing keep breaking even as budgets and headcount grow?',
    part: 'foundations',
    kind: 'chapter',
    index: '01',
    difficulty: 'foundational',
    readingTime: 4,
    prerequisites: [],
    concepts: ['four-symptoms', 'insight-without-action', 'content-without-context', 'measurement-without-learning', 'tools-without-governance'],
    diagrams: ['D6'],
    keywords: ['P&G', 'Honda', 'consent', 'digital ad spend'],
    sources: [
      { label: 'Adweek — When P&G Cut $200 Million in Digital Ad Spend', url: 'https://www.adweek.com/brand-marketing/when-procter-gamble-cut-200-million-in-digital-ad-spend-its-marketing-became-10-more-effective/' },
      { label: "AM-online — Honda fined over 'illegal' marketing emails", url: 'https://www.am-online.com/news/car-manufacturer-news/2017/03/28/honda-fined-over-illegal-marketing-emails' },
    ],
    status: 'live',
  },
  {
    slug: 'about/attribution',
    title: 'Attribution',
    part: 'about',
    kind: 'static',
    index: '—',
    sources: [],
    status: 'live',
  },
]

export function getPage(slug: string): PageMeta | undefined {
  return PAGES.find((p) => p.slug === slug)
}
