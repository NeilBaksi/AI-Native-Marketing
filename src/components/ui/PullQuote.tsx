interface PullQuoteProps {
  quote: string
  attribution?: string
}

/** Quiet editorial pull quote — a restrained text-breaker, left-aligned. Max ~40 words (brief §3.1). */
export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <figure className="relative border-l border-rule pl-5">
      <blockquote className="font-display text-lg italic leading-relaxed text-ink sm:text-xl">
        {quote}
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
