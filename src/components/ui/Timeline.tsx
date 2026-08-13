import clsx from 'clsx'

export interface TimelineEntry {
  /** Rail marker: '30 days', 'Stage 1', 'Q1 2024'. Max ~10 characters. */
  marker: string
  title: string
  body: string
  /** Optional structured detail — e.g. the roadmap's five columns per period. */
  fields?: { label: string; value: string }[]
}

export interface TimelineProps {
  entries: TimelineEntry[]
  /** Mono note under the last node, e.g. 'Then repeat from 30 days.' */
  footnote?: string
}

/**
 * A left rail with markers, separated from the body by a real 1px spine —
 * no card, no radius, no fill. Built as a three-column flex row per entry
 * that never changes shape at any width, which is the deliberate answer to
 * the FlowChain reflow bug: there is no row-to-column collapse here to fail.
 *
 * Min viable width: 265px = 72px rail (4.5rem) + 16px gap + 1px spine +
 * 16px gap + 160px minimum body content.
 * Stacking breakpoint: none. Only the rail widens from 4.5rem to 6rem at
 * `sm:` (640px) for a longer marker; the flex structure itself is
 * identical at 320px and 1600px.
 */
export function Timeline({ entries, footnote }: TimelineProps) {
  return (
    <ol className="flex flex-col">
      {entries.map((e, i) => {
        const isLast = i === entries.length - 1
        return (
          <li key={e.marker} className="flex gap-4 sm:gap-6">
            {/* rail — marker, right-aligned into the margin */}
            <div className="w-[4.5rem] shrink-0 pt-[3px] text-right sm:w-24">
              <span className="font-mono text-[0.7rem] uppercase leading-5 tracking-[0.14em] text-cobalt-deep">
                {e.marker}
              </span>
            </div>

            {/* spine — 1px axis with a node collar */}
            <div aria-hidden className="flex w-px shrink-0 flex-col items-center">
              {/* bg-paper collar knocks the spine out behind the dot — a tonal
                  step, not a shadow or ring, so the dot reads as sitting on the axis */}
              <span className="block bg-paper py-1">
                <span className="block size-[7px] rounded-full bg-cobalt" />
              </span>
              <span className={clsx('w-px flex-1', isLast ? 'bg-transparent' : 'bg-rule')} />
            </div>

            {/* body */}
            <div className={clsx('min-w-0 flex-1', isLast ? 'pb-0' : 'pb-8')}>
              <p className="font-display text-h4 leading-snug text-ink">{e.title}</p>
              <p className="mt-1.5 max-w-prose text-base leading-relaxed text-ink-soft">{e.body}</p>
              {e.fields && (
                <dl className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  {e.fields.map((f) => (
                    <div key={f.label} className="min-w-0 border-t border-rule py-2">
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{f.label}</dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-ink-soft">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </li>
        )
      })}
      {footnote && (
        <li className="ml-[5.5rem] pt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted sm:ml-[7rem]">
          {footnote}
        </li>
      )}
    </ol>
  )
}
