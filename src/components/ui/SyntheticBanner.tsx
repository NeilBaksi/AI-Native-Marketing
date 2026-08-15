import { AlertTriangle } from 'lucide-react'

interface SyntheticBannerProps {
  subject: string
  note: string
  /** 'page' pins under PageHeader (rendered automatically from PageMeta.synthetic —
   *  the author cannot forget it). 'figure' repeats next to a specific figure. */
  scope: 'page' | 'figure'
}

/**
 * Not dismissible. The highest-risk content on the site is a real company
 * (e.g. Salesforce) with fabricated numbers — this banner is what stops a
 * reader quoting a synthetic figure as fact. See CLAUDE.md.
 */
export function SyntheticBanner({ subject, note, scope }: SyntheticBannerProps) {
  return (
    <div
      className={
        scope === 'page'
          ? 'flex items-start gap-3 rounded-2xl rounded-bl-none rounded-tr-none border border-ember-deep bg-surface p-5'
          : 'flex items-start gap-3 rounded-xl rounded-bl-none rounded-tr-none border border-ember-deep bg-surface p-4'
      }
    >
      <AlertTriangle size={18} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-ember-deep" />
      <div>
        <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-widest text-ember-deep">
          Synthetic data — {subject}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{note}</p>
      </div>
    </div>
  )
}
