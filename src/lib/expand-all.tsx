import { createContext, useContext } from 'react'

/**
 * Broadcasts the page-level "Expand all" toggle (PageHeader) to every
 * Accordion rendered inside that page's MDX body, without the content
 * author having to wire each one manually. `undefined` = no page-level
 * override; each Accordion manages its own open state.
 */
export const ExpandAllContext = createContext<boolean | undefined>(undefined)

export function useExpandAll() {
  return useContext(ExpandAllContext)
}
