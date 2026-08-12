import { facts } from '../../data/facts'
import type { FactId } from '../../data/facts'
import { ProvenanceChip } from './ProvenanceChip'

/**
 * Never renders a figure without its provenance chip — `id` must resolve in
 * the facts registry (check-content.mjs enforces this at build time too).
 */
export function StatCallout({ id }: { id: FactId }) {
  const fact = facts[id]
  return (
    <div className="rounded-2xl border border-rule bg-surface p-6">
      <p className="font-display text-h1 leading-none text-ink">{fact.value}</p>
      <p className="mt-2 max-w-prose text-base text-ink-soft">{fact.label}</p>
      {fact.context && <p className="mt-1 text-sm text-muted">{fact.context}</p>}
      <div className="mt-3">
        <ProvenanceChip provenance={fact.provenance} />
      </div>
    </div>
  )
}
