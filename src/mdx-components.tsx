import type { MDXComponents } from 'mdx/types'
import { Section } from './components/layout'
import {
  Callout,
  Example,
  StatCallout,
  PullQuote,
  SyntheticBanner,
  Quarantine,
  Accordion,
  Tabs,
  ComparisonTable,
  DefinitionList,
  Figure,
  FlowChain,
} from './components/ui'

/**
 * The full component map available inside every MDX file — default markdown
 * elements restyled to the type scale, plus every custom block component,
 * with no per-file import needed. See CLAUDE.md: content is prose in MDX,
 * facts in the typed registry.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="text-h2 text-ink" {...props} />,
  h3: (props) => <h3 className="text-h3 text-ink" {...props} />,
  h4: (props) => <h4 className="text-h4 text-ink" {...props} />,
  p: (props) => <p className="prose-body" {...props} />,
  ul: (props) => <ul className="ml-5 flex list-disc flex-col gap-2 text-base text-ink-soft" {...props} />,
  ol: (props) => <ol className="ml-5 flex list-decimal flex-col gap-2 text-base text-ink-soft" {...props} />,
  li: (props) => <li className="max-w-prose leading-relaxed" {...props} />,
  a: (props) => (
    <a className="text-ember-deep underline decoration-rule underline-offset-2 hover:decoration-ember-deep" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  hr: () => <hr className="border-rule" />,
  // ponytail: plain-text quote only (no nested markdown/emphasis inside `>`).
  // Prefer authoring <PullQuote quote="..." attribution="..." /> directly;
  // this exists so a stray markdown `>` doesn't render unstyled.
  blockquote: (props) => <PullQuote quote={String(props.children ?? '')} />,

  Section,
  Callout,
  Example,
  Stat: StatCallout,
  PullQuote,
  SyntheticBanner,
  Quarantine,
  Accordion,
  Tabs,
  ComparisonTable,
  DefinitionList,
  Figure,
  FlowChain,
}
