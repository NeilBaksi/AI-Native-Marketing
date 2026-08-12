import type { ReactNode } from 'react'
import { facts } from '../../data/facts'
import type { FactId } from '../../data/facts'
import { ProvenanceChip } from './ProvenanceChip'

interface ExampleProps {
  id: FactId
  children: ReactNode
}

/**
 * Real-company inline treatment. `id` resolves subject + provenance from the
 * facts registry (single source of truth — no drift between this and
 * StatCallout); the narrative text is authored in MDX as children.
 */
export function Example({ id, children }: ExampleProps) {
  const fact = facts[id]
  return (
    <div className="border-l border-rule pl-5">
      <p className="kicker">{fact.subject ?? fact.label}</p>
      <div className="mt-2 max-w-prose text-base leading-relaxed text-ink-soft">{children}</div>
      <div className="mt-3">
        <ProvenanceChip provenance={fact.provenance} />
      </div>
    </div>
  )
}
