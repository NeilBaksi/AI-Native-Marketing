/**
 * Content model. See docs/BRIEF-AMENDMENTS.md A6 and the approved migration
 * plan for the reasoning: prose lives in MDX, facts live in a typed registry
 * referenced by id, and PAGES is the single manifest driving routing, the
 * sidebar, the pager, prerequisites, and search.
 */

export interface Source {
  label: string
  url: string
}

/** Every fact carries one of these. TypeScript refuses an incomplete one. */
export type Provenance =
  | { kind: 'verified'; source: Source }
  | { kind: 'course'; year: number }
  | { kind: 'synthetic'; subject: string; note: string }

export interface Fact {
  /** Company/entity name, for the Example component's kicker. Omit for non-company stats. */
  subject?: string
  value: string
  label: string
  context?: string
  provenance: Provenance
}

export interface PromptEntry {
  /** Sentence-case title, e.g. 'Signal audit for a Sense layer'. */
  title: string
  /** The situation this prompt is for. Rendered after the label "Use when". */
  useWhen: string
  /** Exact text written to the clipboard. `[bracketed]` spans render as placeholders. */
  body: string
  /** Optional follow-up move, rendered after the label "Then". */
  tip?: string
}

export type PartId =
  | 'foundations'
  | 'spine'
  | 'workflows'
  | 'cases'
  | 'applied'
  | 'toolkit'
  | 'reference'
  | 'about'

export const PARTS: Record<PartId, string> = {
  foundations: 'Part I — Foundations',
  spine: 'Part II — The Spine',
  workflows: 'Part III — The Workflows',
  cases: 'Part IV — Cases',
  applied: 'Part V — Applied',
  toolkit: 'Part VI — Toolkit',
  reference: 'Part VII — Reference',
  about: 'About',
}

export type CalloutKind = 'note' | 'caution' | 'key'

export type PageKind = 'chapter' | 'case' | 'applied' | 'template' | 'index' | 'static'

export interface PageMeta {
  /** 'foundations/the-problem' — route becomes '/foundations/the-problem' */
  slug: string
  title: string
  /** The chapter's contract sentence — the one question this page answers. */
  question?: string
  part: PartId
  kind: PageKind
  /** Mono rail label, e.g. '01'. */
  index: string
  /**
   * Exact substring of `title` to circle with the hand-drawn CircleWord mark.
   * Reserved for part-openers — one per part, not every chapter, or the mark
   * stops reading as emphasis (.impeccable.md Principle 5).
   */
  circleWord?: string
  difficulty?: 'foundational' | 'intermediate' | 'advanced'
  readingTime?: number
  /** Slugs of pages that should be read first — rendered as linked chips. */
  prerequisites?: string[]
  concepts?: string[]
  /** D-numbers used on this page — cross-checked against the MDX by check-content.mjs. */
  diagrams?: string[]
  /** Search-only terms, not rendered. */
  keywords?: string[]
  /** Presence makes the SyntheticBanner mandatory at the layout level — the author cannot forget it. */
  synthetic?: { subject: string; note: string }
  sources: Source[]
  status: 'live' | 'stub'
}
