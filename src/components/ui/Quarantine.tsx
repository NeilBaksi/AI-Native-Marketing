import { Ban } from 'lucide-react'

interface QuarantineProps {
  claim: string
  why: string
}

/**
 * Fabricated claims reproduced as teaching material — never as an assertion.
 * Struck, labelled, mono. Never inside a paragraph (CLAUDE.md).
 */
export function Quarantine({ claim, why }: QuarantineProps) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-4">
      <p className="flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-widest text-muted">
        <Ban size={14} aria-hidden />
        Fabricated claim — reproduced as evidence, not asserted
      </p>
      <p className="mt-2 font-mono text-sm text-ink-soft line-through decoration-muted">{claim}</p>
      <p className="mt-2 text-sm text-muted">{why}</p>
    </div>
  )
}
