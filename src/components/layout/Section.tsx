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
 * Editorial section shell: a big numeral in a narrow gutter column, a
 * kicker, a heading, an optional intro, then content indented to align
 * under the heading (not the numeral). Asymmetric on desktop, never
 * centered — the numeral gutter pattern from PromptToolkit's Section.
 */
export function Section({ id, index, kicker, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-rule py-12 sm:py-16">
      <Reveal>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
          {index && (
            <div className="lg:col-span-3" aria-hidden>
              <div className="flex items-baseline gap-3 lg:flex-col lg:gap-1">
                <span className="font-display text-4xl font-black leading-none text-ember sm:text-5xl">
                  {index}
                </span>
                {kicker && <span className="kicker lg:mt-2">{kicker}</span>}
              </div>
            </div>
          )}
          <div className={index ? 'lg:col-span-9' : 'lg:col-span-12'}>
            {!index && kicker && <p className="kicker mb-2">{kicker}</p>}
            <h2 className="text-h2 text-ink">{title}</h2>
            {intro && <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">{intro}</p>}
          </div>
        </div>
      </Reveal>
      <div className={index ? 'mt-8 flex flex-col gap-5 sm:mt-10 lg:pl-[25%]' : 'mt-8 flex flex-col gap-5 sm:mt-10'}>
        {children}
      </div>
    </section>
  )
}
