import type { MDXComponents } from 'mdx/types'
import { Section } from './components/layout'
import {
  Callout,
  Example,
  StatCallout,
  PullQuote,
  Mark,
  SyntheticBanner,
  Quarantine,
  Accordion,
  Tabs,
  ComparisonTable,
  DefinitionList,
  Figure,
  FlowChain,
  LayerStack,
  Matrix2x2,
  Scorecard,
  Timeline,
  BeforeAfter,
  Checklist,
  StepList,
  Formula,
  DecisionTree,
  Prompt,
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
  p: (props) => <p className="prose-body break-words" {...props} />,
  ul: (props) => <ul className="ml-5 flex list-disc flex-col gap-2 text-base text-ink-soft" {...props} />,
  ol: (props) => <ol className="ml-5 flex list-decimal flex-col gap-2 text-base text-ink-soft" {...props} />,
  // `break-words` is a safety net, never the primary fix — reword an unbroken
  // token (a slash-chain, a long hyphenated compound) at the source first.
  // It's here because plain markdown prose has no other component wrapping it
  // the way every purpose-built block (Formula, PrevNextPager, Prompt's <pre>)
  // already gets one.
  li: (props) => <li className="max-w-prose break-words leading-relaxed" {...props} />,
  a: (props) => (
    <a
      className="text-ember-deep underline decoration-ember-deep/70 decoration-2 underline-offset-[0.18em] transition-colors hover:decoration-ember-deep"
      {...props}
    />
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
  Mark,
  SyntheticBanner,
  Quarantine,
  Accordion,
  Tabs,
  ComparisonTable,
  DefinitionList,
  Figure,
  FlowChain,
  LayerStack,
  Matrix2x2,
  Scorecard,
  Timeline,
  BeforeAfter,
  Checklist,
  StepList,
  Formula,
  DecisionTree,
  Prompt,
}
