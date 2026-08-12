import type { ReactNode } from 'react'

interface FigureProps {
  /** D-number cross-reference to /reference/diagrams. */
  d: string
  caption: string
  /** Prose equivalent for screen readers — must teach the same idea as the visual. */
  alt: string
  children: ReactNode
}

/**
 * Every diagram wraps itself in this — role="img", the accessible label, and
 * the caption are handled once here, not re-implemented per diagram.
 */
export function Figure({ d, caption, alt, children }: FigureProps) {
  return (
    <figure>
      <div role="img" aria-label={alt} className="overflow-x-auto">
        {children}
      </div>
      <figcaption className="mt-2 text-xs text-muted">
        <span className="font-mono uppercase tracking-wider">{d}</span> — {caption}
      </figcaption>
    </figure>
  )
}
