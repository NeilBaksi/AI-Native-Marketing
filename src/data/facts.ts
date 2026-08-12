import type { Fact } from '../types'

/**
 * Every stat, real-company example, and synthetic figure on the site, keyed
 * by an id referenced from MDX (`<Stat id="pg-200m" />`). TypeScript refuses
 * an entry with an incomplete Provenance; check-content.mjs refuses an MDX
 * reference to an id that isn't here.
 */
const registry = {
  'pg-200m': {
    subject: 'P&G',
    value: '$200M',
    label: "cut from P&G's digital ad budget in 2017 — with no drop in reach",
    context: 'Reach rose 10% after the cut; the removed spend had been buying placements no human ever saw.',
    provenance: {
      kind: 'verified',
      source: {
        label: 'Adweek — When P&G Cut $200 Million in Digital Ad Spend, Its Marketing Became 10% More Effective',
        url: 'https://www.adweek.com/brand-marketing/when-procter-gamble-cut-200-million-in-digital-ad-spend-its-marketing-became-10-more-effective/',
      },
    },
  },
  'honda-289k': {
    subject: 'Honda',
    value: '289,790',
    label: 'customers Honda emailed in 2017 to ask about email consent — itself an act of marketing with no consent on file',
    context: '£13,000 ICO fine under PECR. Honda believed the emails were service messages, not marketing.',
    provenance: {
      kind: 'verified',
      source: {
        label: "AM-online — Honda fined over 'illegal' marketing emails (ICO, March 2017)",
        url: 'https://www.am-online.com/news/car-manufacturer-news/2017/03/28/honda-fined-over-illegal-marketing-emails',
      },
    },
  },
} as const satisfies Record<string, Fact>

export type FactId = keyof typeof registry

// Widened to `Fact` (not the literal `registry` type) so optional fields like
// `subject` type-check as `string | undefined` at call sites — the literal
// type has every field always-present, which makes TS narrow `?? fallback`
// branches to `never`.
export const facts: Record<FactId, Fact> = registry
