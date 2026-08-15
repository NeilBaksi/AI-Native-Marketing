import type { Source } from '../../types'
import { Accordion } from './Accordion'

interface SourcesDisclosureProps {
  sources: Source[]
  /** Case/applied pages render open by default — the numbers are the argument. */
  openByDefault?: boolean
}

export function SourcesDisclosure({ sources, openByDefault }: SourcesDisclosureProps) {
  if (sources.length === 0) return null

  const body = (
    <ul className="flex flex-col gap-2">
      {sources.map((s) => (
        <li key={s.url}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-soft underline decoration-muted decoration-2 underline-offset-2 transition-colors hover:text-ember-deep hover:decoration-ember-deep"
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  )

  if (openByDefault) {
    return (
      <div className="border-t border-rule pt-6">
        <p className="kicker mb-3">Sources</p>
        {body}
      </div>
    )
  }

  return <Accordion items={[{ title: 'Sources', body }]} />
}
