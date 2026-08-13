import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id?: string
  /** Editorial numeral, e.g. "01" */
  index?: string
  kicker?: string
  title: string
  intro?: string
  children: ReactNode
}

/**
 * Editorial section shell: numeral runs inline with the kicker on one
 * line ("01 — THE PATTERN") instead of living in its own column — a
 * dedicated gutter reserves width the 68ch content measure can't spare.
 * Heading and content share the full column; nothing is indented to
 * align under a numeral that no longer exists.
 */
/**
 * Falls back to a slug of the title so every section is linkable without the
 * author having to remember an `id` — not one of the 160 `<Section>`s in the
 * content tree had ever set one, which made `scroll-mt-24` above dead code and
 * left no section of the handbook with a URL you could send to someone.
 */
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export function Section({ id, index, kicker, title, intro, children }: SectionProps) {
  const sectionId = id ?? slugify(title)
  return (
    <section id={sectionId} className="scroll-mt-24 border-t border-rule py-12 sm:py-16">
      <Reveal>
        {(index || kicker) && (
          <div className="flex items-baseline gap-2" aria-hidden>
            {index && <span className="font-mono text-sm font-bold text-ember-deep">{index}</span>}
            {index && kicker && <span className="text-rule">—</span>}
            {kicker && <span className="kicker">{kicker}</span>}
          </div>
        )}
        <h2 className="group mt-2 text-h2 text-ink">
          {title}
          <a
            href={`#${sectionId}`}
            aria-label={`Link to section: ${title}`}
            // Visible on hover or keyboard focus only — a permanent ¶ on every
            // heading is chrome the reading register doesn't want.
            className="ml-2 align-middle font-mono text-base text-rule opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          >
            #
          </a>
        </h2>
        {intro && <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">{intro}</p>}
      </Reveal>
      <div className="mt-8 flex flex-col gap-5 sm:mt-10">
        {children}
      </div>
    </section>
  )
}
