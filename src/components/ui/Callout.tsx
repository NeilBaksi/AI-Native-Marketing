import type { ReactNode } from 'react'
import { Info, Sparkles, AlertTriangle } from 'lucide-react'
import type { CalloutKind } from '../../types'

const CONFIG: Record<CalloutKind, { icon: typeof Info; accent: string; label: string; tint: boolean }> = {
  note: { icon: Info, accent: 'text-slate', label: 'Note', tint: false },
  key: { icon: Sparkles, accent: 'text-ember-deep', label: 'Key', tint: true },
  caution: { icon: AlertTriangle, accent: 'text-ember-deep', label: 'Caution', tint: true },
}

interface CalloutProps {
  kind: CalloutKind
  title: string
  children: ReactNode
}

/** Full tinted panel — kind is signalled by icon + mono label, never colour alone. */
export function Callout({ kind, title, children }: CalloutProps) {
  const { icon: Icon, accent, label, tint } = CONFIG[kind]

  return (
    <div className={`rounded-2xl border border-rule p-5 ${tint ? 'bg-ember/5' : 'bg-surface'}`}>
      <div className="flex items-start gap-3">
        <Icon size={18} strokeWidth={1.75} aria-hidden className={`mt-0.5 shrink-0 ${accent}`} />
        <div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className={`font-mono text-[0.7rem] font-semibold uppercase tracking-widest ${accent}`}>
              {label}
            </span>
            <p className="font-medium text-ink">{title}</p>
          </div>
          <div className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{children}</div>
        </div>
      </div>
    </div>
  )
}
