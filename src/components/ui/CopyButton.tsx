import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  /** exact text written to the clipboard */
  text: string
  /** accessible context, e.g. "Copy prompt: Signal audit for a Sense layer" */
  label?: string
}

/** Small secondary control that copies `text` to the clipboard, with a11y-friendly status feedback. */
export function CopyButton({ text, label }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleClick = async () => {
    try {
      // Must be an explicit check: `navigator.clipboard?.writeText()` short-circuits to
      // undefined on insecure origins rather than throwing, which would report a false "Copied".
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable')
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch {
      // ponytail: no execCommand fallback; add only if insecure-origin usage turns out to be real
      setStatus('error')
    }
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setStatus('idle'), 2000)
  }

  const visibleLabel =
    status === 'copied' ? 'Copied' : status === 'error' ? 'Press ⌘/Ctrl+C' : 'Copy'

  return (
    <>
      <button
        type="button"
        aria-label={label}
        onClick={handleClick}
        // `rounded-[4px]`, not the sibling project's `rounded-lg`: this sits inside a
        // square-cornered slab, and a soft radius here reads as a mini-card.
        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[4px] border border-rule bg-surface px-3 font-mono text-[0.7rem] uppercase tracking-wider text-cobalt-deep transition-colors hover:border-cobalt hover:text-cobalt"
      >
        {status === 'copied' ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
        {visibleLabel}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === 'copied' ? 'Copied to clipboard' : status === 'error' ? visibleLabel : ''}
      </span>
    </>
  )
}
