import type { ReactNode, ElementType } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  /** Polymorphic tag, e.g. 'div' | 'li' | 'section' | 'article' */
  as?: ElementType
  /** Stagger delay in seconds */
  delay?: number
  className?: string
}

/**
 * Fade + rise-in on first scroll into view. Transform/opacity only.
 * prefers-reduced-motion is honoured globally in index.css, and Framer also
 * respects it, so motion collapses to a plain fade for those users.
 */
export function Reveal({ children, as = 'div', delay = 0, className }: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as ElementType
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </MotionTag>
  )
}
