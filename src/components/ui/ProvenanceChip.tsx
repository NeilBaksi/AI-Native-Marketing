import { Link2, GraduationCap, FlaskConical } from 'lucide-react'
import type { Provenance } from '../../types'

/**
 * Every fact on the site carries one of these, always icon + text label —
 * never colour alone. See CLAUDE.md and docs/design-direction.md §1.
 */
export function ProvenanceChip({ provenance }: { provenance: Provenance }) {
  const base = 'inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wider'

  if (provenance.kind === 'verified') {
    let host = provenance.source.url
    try {
      host = new URL(provenance.source.url).hostname.replace(/^www\./, '')
    } catch {
      /* keep raw url as fallback */
    }
    return (
      <a
        href={provenance.source.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} text-cobalt-deep underline decoration-rule underline-offset-2 hover:text-ember-deep`}
        title={provenance.source.label}
      >
        <Link2 size={12} aria-hidden />
        {host}
      </a>
    )
  }

  // `muted`, not an accent: course-sourced is ~90% of the facts on this site, and
  // colouring the default tier would tint every page. Verified (cobalt) and
  // synthetic (ember) are the two tiers that earn a colour; this is the baseline.
  if (provenance.kind === 'course') {
    return (
      <span className={`${base} text-muted`}>
        <GraduationCap size={12} aria-hidden />
        Course-sourced · {provenance.year}
      </span>
    )
  }

  return (
    <span className={`${base} text-ember-deep`} title={provenance.note}>
      <FlaskConical size={12} aria-hidden />
      Synthetic
    </span>
  )
}
