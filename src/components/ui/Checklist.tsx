import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export interface ChecklistProps {
  /** Mono rail label, e.g. 'Pre-launch gate — all seven required'. */
  label?: string
  items: { text: string; hint?: string }[]
}

/**
 * A flush list of native checkboxes — hairlines between rows, no container, no
 * radius. Native `input[type=checkbox]` so keyboard operation, `:focus-visible`,
 * the accessibility tree, and forced-colors mode all come free.
 *
 * Ticks persist to localStorage, keyed by route. The original build deliberately
 * had no persistence, on the argument that the toolkit's real save story is
 * "copy the blank version into a spreadsheet". A design review found the
 * concrete failure that argument misses: the MDX body remounts on every route
 * change, so ticking eight boxes, following a link, and coming back silently
 * discards all of it. A control that offers state and then loses it is worse
 * than a printed list — so it keeps the state, and offers a visible way to
 * clear it.
 *
 * Storage is per-origin and never leaves the device; see /about/privacy.
 * ponytail: keyed on route + item text, so re-wording an item resets that row.
 * Fine — an edited item is a different item.
 *
 * Single column at every viewport, so there's no reflow arithmetic to do —
 * min viable width is 240px (longest realistic item text plus the 18px
 * control and its 12px gap still wraps cleanly at that width).
 */
export function Checklist({ label, items }: ChecklistProps) {
  const { pathname } = useLocation()
  const storageKey = `checklist:${pathname}:${label ?? ''}`
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  // Read after mount, not in a useState initialiser: this has to be safe under
  // a pre-render with no `window`, and Safari's private mode throws on access.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      setChecked(raw ? JSON.parse(raw) : {})
    } catch {
      setChecked({})
    }
  }, [storageKey])

  const toggle = (text: string) => {
    setChecked((prev) => {
      const next = { ...prev, [text]: !prev[text] }
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        /* private mode / quota — the ticks still work for this session */
      }
      return next
    })
  }

  const clear = () => {
    setChecked({})
    try {
      window.localStorage.removeItem(storageKey)
    } catch {
      /* nothing to clear if we could never write */
    }
  }

  const doneCount = items.filter((it) => checked[it.text]).length

  return (
    <div className="border-y border-rule">
      {label && (
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule py-2.5">
          <p className="kicker">{label}</p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
            {doneCount} / {items.length}
          </p>
        </div>
      )}
      <ul className="divide-y divide-rule">
        {items.map((it) => (
          <li key={it.text}>
            <label className="flex cursor-pointer items-start gap-3 py-3.5">
              <input
                type="checkbox"
                checked={checked[it.text] ?? false}
                onChange={() => toggle(it.text)}
                className="peer mt-[3px] size-[18px] shrink-0 accent-pine"
              />
              {/* Ticked rows drop to `muted` — never strikethrough, which is a
                  to-do-app tic and makes completed items harder to re-read. */}
              <span className="min-w-0 text-base leading-relaxed text-ink-soft transition-colors duration-200 peer-checked:text-muted">
                {it.text}
                {it.hint && <span className="mt-0.5 block text-sm text-muted">{it.hint}</span>}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {doneCount > 0 && (
        <div className="border-t border-rule">
          <button
            type="button"
            onClick={clear}
            className="inline-flex min-h-[44px] items-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-pine-deep underline decoration-rule underline-offset-4 hover:decoration-pine-deep"
          >
            Clear ticks
          </button>
        </div>
      )}
    </div>
  )
}
