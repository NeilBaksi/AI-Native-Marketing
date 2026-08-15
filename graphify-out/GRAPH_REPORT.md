# Graph Report - .  (2026-08-15)

## Corpus Check
- 130 files · ~94,769 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 419 nodes · 572 edges · 68 communities (29 shown, 39 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.8)
- Token cost: 21,453 input · 2,099 output

## Community Hubs (Navigation)
- Page Header & Nav Chrome
- Build Tooling & Lint Config
- Command Palette & Mobile Nav
- NPM Dependencies
- TypeScript/Vite Compiler Config
- Page Transitions & Accordion UI
- Content Integrity Check Script
- Node/Vite Build Config
- Case Study Pages
- Quote & Before/After UI
- Example & Stat Display UI
- Prompt Copy-Button UI
- App Shell & List UI Components
- Site Infra, Licensing & CI
- Error Boundary Component
- Decision Tree UI
- Design Workflow Diagrams
- Comparison Table UI
- Brand Palette & Entry Assets
- Layer Stack UI
- Mark Highlight UI
- Matrix 2x2 UI
- Tabs UI
- Timeline UI
- About / Attribution Pages
- Figure Wrapper UI
- Formula Display UI
- Quarantine Callout UI
- Synthetic-Data Banner UI
- Peloton Five-State Case
- Root TS Config
- CDW & Course Attribution
- Foundations: Problem & Architectures
- MDX Type Declarations
- Content Chunking Rule
- I-MOS Core Framework Names
- Nike SNKRS Case
- Oracle Eloqua Case
- ServiceNow Case
- Maturity Model Chapter
- Insight Gap Chapter
- 30-60-90 Roadmap Template
- Agent Design Framework Template
- AI Hallucination Guardrails Template
- Brand DNA Spec Template
- Data Readiness Audit Template
- Decision-Narrative Persona Template
- Economics of Error Worksheet
- Experiment Design Checklist
- Governance Table Template
- ICP Scoring Rubric Template
- Journey State Model Template
- Measurement Humility Worksheet
- Messaging Pillar Spec Template
- Positioning Statement Template
- ROMI Formulas Template
- Attract Workflow Chapter
- Build Workflow Chapter
- Adobe GenStudio / Pfizer Example
- Execute & Learn Workflow Chapter
- Focus Workflow Chapter
- Govern Workflow Chapter
- Orchestrate Workflow Chapter
- Sense Workflow Chapter
- Messaging & Positioning Deep Dive

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `compilerOptions` - 16 edges
3. `EASE_OUT_EXPO` - 10 edges
4. `getPage()` - 7 edges
5. `scripts` - 6 edges
6. `CommandPalette()` - 6 edges
7. `ErrorBoundary` - 6 edges
8. `FactId` - 6 edges
9. `Page()` - 6 edges
10. `Case Studies Index` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Favicon — three connected circles, one in ember accent` --shares_data_with--> `Ink & Ember Design Palette (light-mode only)`  [EXTRACTED]
  public/favicon.svg → CLAUDE.md
- `index.html entry point` --references--> `Favicon — three connected circles, one in ember accent`  [EXTRACTED]
  index.html → public/favicon.svg
- `CI Build Job` --references--> `Content Integrity Check (scripts/check-content.mjs build gate)`  [EXTRACTED]
  .github/workflows/deploy.yml → CLAUDE.md
- `CC BY-NC-SA 4.0 License (written content & facts)` --shares_data_with--> `Typed Fact/Provenance Registry (src/data/facts.ts)`  [EXTRACTED]
  NOTICE.md → CLAUDE.md
- `README.md project overview` --shares_data_with--> `Site Tech Stack (Vite+React+TS+Tailwind+framer-motion+HashRouter)`  [EXTRACTED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **I-MOS Core Framework** — src_content_foundations_what_is_imos, src_content_spine_seven_workflows, src_content_spine_four_layer_stack [EXTRACTED 1.00]
- **I-MOS Decision Logic** — src_content_spine_insight_gap, src_content_spine_economics_of_error, src_content_spine_govern_envelope [INFERRED 0.90]
- **Toolkit Operational Templates** — src_content_toolkit_agent_design_framework, src_content_toolkit_brand_dna_spec, src_content_toolkit_governance_table, src_content_toolkit_journey_state_model, src_content_toolkit_icp_scoring_rubric [INFERRED 0.90]
- **AEO Citation Signals** — src_content_workflows_attract, src_content_toolkit_brand_dna_spec, src_content_toolkit_ai_hallucination_guardrails [EXTRACTED 0.85]
- **I-MOS Workflow Loop** — src_content_workflows_sense, src_content_workflows_focus, src_content_workflows_orchestrate, src_content_workflows_attract, src_content_workflows_execute_and_learn, src_content_workflows_govern [EXTRACTED 1.00]
- **Orchestration and Journey State Cases** — src_content_cases_further_examples_oracle_eloqua_buying_committee, src_content_cases_further_examples_servicenow_mql_sql, src_content_cases_peloton_peloton_five_state_model [EXTRACTED 0.90]
- **Design Workflow Core Concepts** — src_content_reference_glossary_brand_dna, src_content_reference_diagrams_d36, src_content_reference_diagrams_d41 [EXTRACTED 1.00]

## Communities (68 total, 39 thin omitted)

### Community 0 - "Page Header & Nav Chrome"
Cohesion: 0.08
Nodes (33): NavLinksProps, PART_ORDER, container, item, PageHeader(), PageHeaderLink, PageHeaderMeta, PageHeaderProps (+25 more)

### Community 1 - "Build Tooling & Lint Config"
Cohesion: 0.05
Nodes (37): autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @mdx-js/rollup, devDependencies (+29 more)

### Community 2 - "Command Palette & Mobile Nav"
Cohesion: 0.11
Nodes (23): CommandPalette(), CommandPaletteProps, MobileDrawer(), MobileDrawerProps, MobileHeader(), MobileHeaderProps, NavLinks(), PageSkeleton() (+15 more)

### Community 3 - "NPM Dependencies"
Cohesion: 0.08
Nodes (25): clsx, framer-motion, lucide-react, @mdx-js/react, dependencies, clsx, framer-motion, lucide-react (+17 more)

### Community 4 - "TypeScript/Vite Compiler Config"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, mdx, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly (+16 more)

### Community 5 - "Page Transitions & Accordion UI"
Cohesion: 0.12
Nodes (16): PageTransition(), PageTransitionProps, AccordionItem(), AccordionItemData, AccordionProps, CircleWord(), FlowChain(), FlowChainProps (+8 more)

### Community 6 - "Content Integrity Check Script"
Cohesion: 0.09
Nodes (19): contentDir, factBlocks, factIds, factsFile, factsSrc, knownComponents, mdxComponentsFile, mdxComponentsSrc (+11 more)

### Community 7 - "Node/Vite Build Config"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 8 - "Case Study Pages"
Cohesion: 0.13
Nodes (16): Agentforce Capstone, Auranis Case Study, Case Studies Index, Coca-Cola Case Study, Six Governance Failures, L'Oréal Case Study, National Australia Bank Case Study, OpenAI Sycophancy Incident (+8 more)

### Community 9 - "Quote & Before/After UI"
Cohesion: 0.19
Nodes (10): Accordion(), BeforeAfter(), BeforeAfterProps, PullQuote(), PullQuoteProps, SourcesDisclosure(), SourcesDisclosureProps, StepList() (+2 more)

### Community 10 - "Example & Stat Display UI"
Cohesion: 0.24
Nodes (10): Example(), ExampleProps, ProvenanceChip(), COLS, Scorecard(), ScorecardProps, StatCallout(), FactId (+2 more)

### Community 11 - "Prompt Copy-Button UI"
Cohesion: 0.23
Nodes (9): CopyButton(), CopyButtonProps, highlight(), Prompt(), PROMPT_IDS, PromptId, prompts, registry (+1 more)

### Community 12 - "App Shell & List UI Components"
Cohesion: 0.22
Nodes (6): App(), Checklist(), ChecklistProps, DefinitionList(), DefinitionListProps, mdxComponents

### Community 13 - "Site Infra, Licensing & CI"
Cohesion: 0.25
Nodes (9): Content Integrity Check (scripts/check-content.mjs build gate), Typed Fact/Provenance Registry (src/data/facts.ts), Site Tech Stack (Vite+React+TS+Tailwind+framer-motion+HashRouter), CI Build Job, CI Deploy Job (GitHub Pages), CC BY-NC-SA 4.0 License (written content & facts), MIT License (site code), README.md project overview (+1 more)

### Community 14 - "Error Boundary Component"
Cohesion: 0.29
Nodes (3): ErrorBoundary, ErrorBoundaryProps, ErrorBoundaryState

### Community 15 - "Decision Tree UI"
Cohesion: 0.33
Nodes (4): DecisionNode, DecisionOutcome, DecisionTree(), DecisionTreeProps

### Community 16 - "Design Workflow Diagrams"
Cohesion: 0.33
Nodes (6): D35: 14-Day Content Lag, D36: Machine-Readability Test, D41: Three-Layer Prompt Architecture, D42: Seven Steps from Signal to Delivery, Brand DNA, Unilever BrandDNAi

### Community 17 - "Comparison Table UI"
Cohesion: 0.40
Nodes (4): ComparisonTable(), ComparisonTableProps, STATE, TableCell

### Community 18 - "Brand Palette & Entry Assets"
Cohesion: 0.67
Nodes (4): Ink & Ember Design Palette (light-mode only), index.html entry point, 404.html hash-routing redirect logic, Favicon — three connected circles, one in ember accent

### Community 19 - "Layer Stack UI"
Cohesion: 0.50
Nodes (3): Layer, LayerStack(), LayerStackProps

### Community 20 - "Mark Highlight UI"
Cohesion: 0.50
Nodes (3): Mark(), MarkProps, TONE

### Community 21 - "Matrix 2x2 UI"
Cohesion: 0.50
Nodes (3): Matrix2x2(), Matrix2x2Props, Quadrant

### Community 22 - "Tabs UI"
Cohesion: 0.50
Nodes (3): TabItem, Tabs(), TabsProps

### Community 23 - "Timeline UI"
Cohesion: 0.50
Nodes (3): Timeline(), TimelineEntry, TimelineProps

### Community 24 - "About / Attribution Pages"
Cohesion: 0.50
Nodes (4): About the Handbook, Attribution & Licensing, Methodology, Privacy Policy

### Community 29 - "Peloton Five-State Case"
Cohesion: 0.67
Nodes (3): Peloton Five-State Model, D73: Peloton's Five-State Model, Next-Best-Action

## Knowledge Gaps
- **210 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+205 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Build Tooling & Lint Config` to `NPM Dependencies`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `EASE_OUT_EXPO` connect `Page Transitions & Accordion UI` to `Page Header & Nav Chrome`, `Command Palette & Mobile Nav`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _210 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Header & Nav Chrome` be split into smaller, more focused modules?**
  _Cohesion score 0.07751937984496124 - nodes in this community are weakly interconnected._
- **Should `Build Tooling & Lint Config` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `Command Palette & Mobile Nav` be split into smaller, more focused modules?**
  _Cohesion score 0.11092436974789915 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._