interface Layer {
  name: string
  metaphor: string
  role: string
}

interface LayerStackProps {
  /** Top to bottom, e.g. Governance first, Shared Memory last (D3). */
  layers: Layer[]
}

/**
 * One-off for D3 (the four-layer stack) — not generalised into a variant
 * component per CLAUDE.md's rule of two, since nothing else on the site
 * wants a stacked-band shape yet. Governance sits visually apart (dashed
 * ember border) because it's an envelope around the other three, not a
 * fourth peer layer.
 */
export function LayerStack({ layers }: LayerStackProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-rule bg-surface p-4 sm:p-6">
      {layers.map((layer, i) => (
        <div
          key={layer.name}
          className={
            i === 0
              ? 'rounded-xl border border-dashed border-ember/60 bg-ember/5 p-4'
              : 'rounded-xl border border-rule bg-paper p-4'
          }
        >
          <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="break-words font-display text-sm font-bold text-ink sm:text-base">{layer.name}</span>
            <span className="break-words font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{layer.metaphor}</span>
          </div>
          <p className="mt-1 break-words text-sm leading-relaxed text-ink-soft">{layer.role}</p>
        </div>
      ))}
    </div>
  )
}
