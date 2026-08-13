import type { PromptEntry } from '../types'

/**
 * Every copy-pasteable prompt on the site, keyed by an id referenced from MDX
 * (`<Prompt id="sense-signal-audit" />`). Same contract as facts.ts: the id is
 * the single source of truth, so a prompt can never drift between the chapter
 * that teaches it and the index that aggregates it.
 *
 * House style for `body`, so they read as one voice:
 *   - open with a role assignment ("You are acting as a marketing operations analyst")
 *   - one `Produce:` clause, semicolon-separated deliverables, ending with the
 *     single most important thing
 *   - close with a grounding constraint ("mark anything that's inference rather
 *     than fact") — this handbook's whole argument is that unsourced confidence
 *     is the failure mode, so the prompts have to model the fix
 *   - every variable `[bracketed]`; final line is a `[PASTE X]` marker in caps
 *   - 90–130 words
 */
const registry = {
  'sense-signal-audit': {
    title: 'Signal audit for a Sense layer',
    useWhen:
      'You are inventorying what your organization already collects, before deciding what to instrument next. Feed it your real tool list and field names, not a tidied summary — the gaps are usually in the mess.',
    body: `You are acting as a marketing operations analyst. Below is the current tool and data-source inventory for [company], a [category] business. Sort every source into behavioral, transactional, qualitative, or environmental signal, and then produce: which of those four categories is thinnest and what that blindness costs in practice; the signals being collected that nothing downstream actually consumes; the ones that would need a shared customer identifier before they could be joined, and which identifier; the three additions that would most improve decision quality, ranked by effort against value; and the single source you would instrument first. Ground every claim in the inventory itself, and mark anything that is inference rather than something the list states.

[PASTE YOUR TOOL AND DATA-SOURCE LIST]`,
    tip: 'Ask it to re-rank the gaps by which ones a single shared customer object would close at once — that reframing usually collapses a long list into one project.',
  },
  'focus-icp-builder': {
    title: 'ICP from fit, readiness, and friction',
    useWhen:
      'You have closed-won and closed-lost data and want a scoring definition an AI system could actually operate, rather than a persona slide.',
    body: `You are acting as a B2B marketing strategist. Below is account-level data on [N] closed-won and [N] closed-lost opportunities for [product]. Using the model ICP Score = Fit x Readiness - Friction, produce: the three to five firmographic or behavioral attributes that most separate won from lost, with the actual separation for each; which belong to fit, which to readiness, and which are friction; a scoring definition precise enough that someone could implement it without asking you a follow-up question; the attributes that look predictive but are probably artifacts of how the data was collected; and the single attribute you would test first. Say plainly where the sample is too small to support a claim.

[PASTE ACCOUNT DATA]`,
    tip: 'Then ask it to write the three disqualifying criteria — the accounts you should refuse. A definition that excludes nothing is not a definition.',
  },
  'execute-incrementality-check': {
    title: 'Pressure-test a performance claim',
    useWhen:
      'A channel, campaign, or agency is reporting a result and you need to know how much of it would have happened anyway.',
    body: `You are acting as a marketing measurement analyst with a sceptical brief. Below is the reported performance for [campaign or channel] over [period]. Produce: what this result would look like if the true incremental effect were zero, and how you would tell that apart from the reported figure; every mechanism by which the attribution model could be crediting conversions that would have happened regardless; which of those mechanisms the data provided can rule out and which it cannot; the smallest experiment — geo holdout, PSA test, or staggered rollout — that would settle it, with the sample and duration it needs; and the one number you would ask for that is not here. Mark each conclusion as supported by the data, plausible but untested, or unfalsifiable as measured.

[PASTE PERFORMANCE DATA]`,
    tip: 'Follow up with "argue the opposite case as strongly as you can" — if the rebuttal is weak, the original result is probably real.',
  },
  'economics-of-error-autonomy-classifier': {
    title: 'Autonomy tier classifier for a marketing decision',
    useWhen:
      'You have a specific recurring decision — a workflow, a content type, a bid rule — and need to know which of the four autonomy tiers it actually belongs to, rather than guessing from instinct.',
    body: `You are acting as a marketing operations analyst applying a cost-of-error framework. Below is a description of [decision or workflow] currently run at [company]. Using the four-question test, cost of a wrong decision, reversibility, value of acting faster, and confidence in the AI's judgment, produce: which of the four tiers, Human in Command, Human in the Loop, Human on the Loop, or Fully Autonomous, the decision belongs in; the single factor that placed it there; what breaks if it were run one tier more autonomous; and what breaks if it were run one tier less autonomous, which is the case worth checking first. Mark any judgment that rests on your assumption rather than something stated in the description.

[PASTE DECISION OR WORKFLOW DESCRIPTION]`,
    tip: 'Ask it to name the second-most-defensible tier and what would have to change for the decision to move there.',
  },
  'shared-memory-object-audit': {
    title: 'Shared Memory object audit',
    useWhen:
      "You want to know which of the five core object types actually exist as one authoritative record in your stack, versus fragmented across systems that don't know about each other.",
    body: `You are acting as a marketing operations analyst. Below is a list of the systems [company] uses to store customer data, along with what each one holds. Sort the holdings against the five Shared Memory object types, identity, state, decision, content, and learning, and produce: which object type has no single authoritative source and instead exists in more than one system; what a customer record looks like differently in each of those systems; the specific question about a customer this fragmentation makes currently unanswerable; and the one integration that would close the largest gap first. Mark anything you infer about how the systems connect rather than something the list states directly.

[PASTE SYSTEM AND DATA INVENTORY]`,
    tip: 'Ask it to draft the single Identity Profile schema that would need to exist for the fragmented answer to become answerable.',
  },
  'four-layer-stack-trace-audit': {
    title: 'Trace one signal through your own stack',
    useWhen:
      'You want to see whether a single customer signal actually reaches all four layers in your own stack, or stalls at one of them, before diagnosing anything more specific.',
    body: `You are acting as a marketing operations analyst. Below is a description of the tools and systems [company] uses across data, execution, and review. Pick one real signal, for example a website visit or a support ticket, and trace it through four layers: Governance (is consent or eligibility checked before anything runs), Agentic Services (what actually processes the signal), Orchestration (what decides the next step and in what order), and Shared Memory (where the result is written for later use). Produce: which layer the trace stalls or breaks at first; what a person currently does by hand to bridge that gap; and the one layer, if any, that is entirely missing rather than just manual. Mark anything you infer about the stack rather than something stated below.

[PASTE STACK DESCRIPTION]`,
    tip: 'Ask it to name the cheapest fix for the first stall, not the most complete one — the goal tonight is finding the gap, not closing it.',
  },
  'build-archetype-selector': {
    title: 'Match a data landscape to an implementation archetype',
    useWhen:
      'You are choosing which spine, Adobe, Salesforce, or a composable warehouse stack, to build I-MOS on top of, before committing budget to one vendor.',
    body: `You are acting as a martech solutions architect. Below is a description of [company]'s current data landscape: the primary CRM, the CDP or data warehouse in use, the content and campaign tools, and where first-party customer data actually lives today. Using the three implementation archetypes (Adobe AEP plus Real-Time CDP, Salesforce CRM plus Account Intelligence, and a composable warehouse plus best-of-breed stack), produce: which archetype the current landscape is already closest to, with the specific evidence for that read; the two biggest gaps between the current stack and that archetype; whether a hybrid is more honest than a single pick; and the first integration that would matter most. Mark anything assumed rather than stated in the description.

[PASTE CURRENT DATA LANDSCAPE]`,
    tip: 'Ask it to name the vendor lock-in risk specific to whichever archetype it recommends — that risk is usually the real reason to pick composable instead.',
  },
  'build-four-pass-decomposition': {
    title: 'Decompose a workflow into sub-workflows and tasks',
    useWhen:
      'You have a marketing workflow you want to hand to AI agents but no agent design yet — you need Passes 1 and 2 before anyone can talk about which agent does what.',
    body: `You are acting as an agentic systems architect. Below is a description of [workflow name], a marketing workflow currently run by [team or process] at [company]. Using Passes 1 and 2 of the four-pass decomposition method, produce: 3 to 6 sequential or parallel sub-workflows that form this workflow's structural skeleton; for each sub-workflow, 3 to 8 atomic tasks specific enough to implement but not yet tied to a tool or model; which tasks look like they could share one agent rather than needing their own; and the single task boundary most likely to cause downstream rework if it is drawn wrong. Stop before assigning autonomy levels, and mark any boundary you are inferring rather than one the description states.

[PASTE WORKFLOW DESCRIPTION]`,
    tip: 'Run Pass 3 next — set autonomy per task using the Economics of Error before letting anyone start building.',
  },
  'design-machine-readability-rewrite': {
    title: 'Rewrite a brand guideline against the machine-readability test',
    useWhen:
      'You have brand guideline language written for a person to interpret and need it specific enough for an AI agent to check itself against before generating anything.',
    body: `You are acting as a brand operations analyst. Below are lines from [company]'s brand guidelines. Apply the machine-readability test to each one, asking whether an agent could act on it without a person translating it first, and produce: a pass or fail verdict per line; for every failing line, a rewrite as a binary or numeric spec, such as an angle, a color value, a sentence length, a reading level, or a frequency cap, that preserves the original creative intent; and a flag on any line whose intent is ambiguous even to a person, which no rewrite can fix. Do not invent a specific detail the guideline never implied; where a number is needed and none exists, say so instead of guessing one.

[PASTE BRAND GUIDELINE LINES]`,
    tip: 'Ask it to sort the fails by how often that guideline line would actually get invoked in generation — fix the highest-frequency ones first.',
  },
  'focus-messaging-cascade': {
    title: 'Build a five-layer messaging cascade',
    useWhen:
      'You have a positioning statement, or a first draft of one, and need to cascade it down into pillars, proof, objections, and stories an AI system can actually assemble content from.',
    body: `You are acting as a messaging strategist. Below is a positioning statement for [product], sold to [ICP or persona]. Using the five-layer cascade, positioning statement, value pillars, claims and proof, objections and rebuttals, and stories, produce: 3 to 4 value pillars that follow logically from the statement; for each pillar, the evidence needed before AI could use it in a claim, and whether that evidence exists yet; the two objections a buyer would raise but never say aloud, with a rebuttal for each; and one candidate customer story that would make a pillar concrete. Flag any pillar you cannot trace back to the statement, and mark every proof point as sourced, missing, or assumed.

[PASTE POSITIONING STATEMENT AND PRODUCT CONTEXT]`,
    tip: 'Feed it a real objection from a lost deal and ask which pillar the rebuttal should live under — if none fits, the cascade is missing a pillar, not the objection missing an answer.',
  },
  'govern-kill-switch-design': {
    title: 'Draft a kill-switch design for an AI marketing system',
    useWhen:
      'You are running, or about to run, an AI agent that can act without a human in the loop, and no one has written down what stops it, who can stop it, or how it restarts.',
    body: `You are acting as an AI governance analyst. Below is a description of [system or agent] and what it is allowed to do without a person in the loop. Produce: four to six concrete triggers, stated as measurable thresholds rather than vague warning signs; the halt scope each trigger should invoke, from a single-agent pause to full system suspension; who holds authority to pull each one, and which should auto-fire without waiting for a person; and the recovery steps required before restart, including the evidence that proves the root cause is fixed. Mark any threshold you are proposing rather than one the description already implies.

[PASTE SYSTEM OR AGENT DESCRIPTION]`,
    tip: 'Ask it to write the one sentence a customer-facing team would need to say the moment the kill switch fires — silence after a halt is its own governance failure.',
  },
  'govern-regulatory-gap-check': {
    title: 'Gap-check an AI marketing system against four regulatory frameworks',
    useWhen:
      'You are running AI-driven targeting, content generation, or personalization and need to know where it is exposed before a regulator or a plaintiff finds the gap first.',
    body: `You are acting as a marketing compliance analyst. Below is a description of how [system] uses AI, what data it processes, what decisions it makes, and which markets it serves. Check it against the EU AI Act, FTC rules, GDPR, and CCPA/CPRA, and produce: which requirements are already satisfied, with the mechanism that satisfies each; the requirements not yet satisfied, ranked by regulatory exposure; whether an audit trail could reconstruct any single decision after the fact; and the one gap to close first. Mark each finding as confirmed by the description, likely but unconfirmed, or a guess that needs legal review.

[PASTE SYSTEM DESCRIPTION AND MARKETS SERVED]`,
    tip: 'Have a lawyer review anything it flags as "likely but unconfirmed" before treating it as settled — this prompt finds gaps, it does not close them.',
  },
  'orchestrate-policy-stack': {
    title: 'Draft a next-best-action policy stack',
    useWhen:
      'You are designing or auditing the rules that decide who receives what message when, before a customer receives three competing offers in the same week because no single system arbitrates.',
    body: `You are acting as a lifecycle marketing strategist. Below is a description of [company]'s current customer journey states, the channels it markets through, and any existing suppression or compliance rules. Using the four-gate policy stack, right customer, right moment, compliance, and frequency caps, produce: a specific pass or fail test for each gate, precise enough for a system to evaluate automatically; the two gaps in the current rules most likely to let a bad message through; how competing offers from different teams would be arbitrated when more than one clears all four gates; and the ranking factor expected value should weigh first. Mark any rule you are proposing rather than one already implied by the description.

[PASTE CURRENT JOURNEY STATES AND CHANNEL RULES]`,
    tip: 'Test it against a real conflict from last quarter, two campaigns that both technically qualified for the same customer, and see whether the stack would have caught it.',
  },
  'attract-citation-audit': {
    title: 'Audit a page against the four citation signals',
    useWhen:
      'You have existing content that ranks or once ranked in search and want to know why an AI answer engine is not citing it, before rewriting it blind.',
    body: `You are acting as an answer-engine-optimization analyst. Below is the text of a live page for [company or product]. Score it against the four citation signals: provenance, whether every claim is attributed to a named, checkable source; structure, whether a machine can parse headings, direct answers, and claim-evidence pairs without narrative padding; specificity, whether each statistic would survive being quoted out of context; and recency, whether a reader would assume this was updated this year. Produce: a pass or fail per signal with the sentence that earns it; the single rewrite that would most improve citation odds; and any claim with no source that should be cut or attributed. Mark any judgment about how an AI system would treat this page as an estimate, not a measured fact.

[PASTE PAGE TEXT]`,
    tip: 'Run the rewritten version back through the same prompt — a page that cannot pass its own audit twice was patched, not fixed.',
  },
  'roadmap-30-60-90-draft': {
    title: 'Draft a 30-60-90 roadmap from a maturity stage',
    useWhen:
      'You have just placed your organization at a stage on the maturity model and need the next three months turned into a concrete plan, not a target architecture.',
    body: `You are acting as a marketing operations analyst. Below is [company]'s current stage on the I-MOS maturity model, its existing tool stack, and the workflow pair you intend to pilot first. Produce: a 30/60/90-day roadmap across five workstreams (Instrument, Pilot, Measure, Govern, Org shift), reading left to right as one sequence rather than five independent checklists; the single shared object the 30-day column should stand up; the earliest point governance can add a real blocking check on the pilot's output; and, most important, the one Org shift action that stops the pilot reverting the moment its champion changes roles. Mark any milestone that assumes a resourcing decision nobody has actually made yet.

[PASTE STAGE, TOOL STACK, AND PILOT WORKFLOW]`,
    tip: 'Ask it to flag which of the fifteen cells depends on a cell earlier in the same row — that dependency chain is usually where a roadmap actually slips.',
  },
  'agent-design-four-pass': {
    title: 'Run the Four-Pass Decomposition on a workflow',
    useWhen:
      'You are scoping a new AI-driven workflow from scratch, before any tool, model, or vendor decision gets made, and need it broken into sub-workflows, tasks, agents, and connections.',
    body: `You are acting as an agentic-systems architect. Below is a description of [workflow] as it runs today, including who is involved and what triggers it. Produce: Pass 1, three to six operational sub-workflows; Pass 2, three to eight atomic, platform-agnostic tasks per sub-workflow; Pass 3, which agent handles each task, its autonomy tier per the Economics of Error, and the one action it must never take; and Pass 4, every connection between agents, to shared memory, and to governance. Run the passes strictly in order and do not assign an agent to a task before Pass 2 has named it. Mark any task where the autonomy tier is a guess rather than a documented cost-of-error judgment.

[PASTE WORKFLOW DESCRIPTION]`,
    tip: 'Ask it to name the forbidden action for every agent before moving on — a spec with no "must not" row is not finished.',
  },
  'guardrails-draft-check': {
    title: 'Run the hallucination guardrail check on a draft',
    useWhen:
      'AI-generated copy is about to move from draft to submission and every claim needs to trace to a named, dated source before it ships.',
    body: `You are acting as a claims-verification editor. Below is a draft of [asset type] and the verified claims registry or product spec sheet it must be checked against. Produce: a pass/fail/N-A result for each of six checks, every number traces to a named source, every product claim matches the current spec, no forbidden-phrase-list word appears, quotes are verbatim and attributed, comparative claims are legal-cleared, required disclaimers are present; the exact sentence responsible for each failure; and, most important, a rewritten version of any failed sentence using only what the registry actually supports. Treat a prior AI draft as no source at all, and mark anything you cannot verify against the supplied registry.

[PASTE DRAFT AND CLAIMS REGISTRY]`,
    tip: 'Run it again after each fix — a corrected draft can introduce a new unsourced claim the first pass never saw.',
  },
  'brand-dna-draft': {
    title: 'Draft a Brand DNA spec from a style guide',
    useWhen:
      'An existing brand guide is adjectives a person has to interpret, and you need it turned into fields an agent can check its own output against.',
    body: `You are acting as a brand systems analyst. Below is [company]'s current brand guide, style examples, and any claims or legal constraints you know of. Produce: tone-of-voice rules stated as binary, testable constraints, not adjectives; visual grammar as hex codes and measurable specs, not mood-board language; the single approved source proof cues must be pulled from; a permitted/prohibited claims list with the reason each prohibited claim fails; the exact disclaimer text and its trigger condition; and, most important, a starter violation-words list of terms the guide's own language implies are off-brand. Mark every field where you inferred a rule the guide never states outright rather than quoting it directly.

[PASTE BRAND GUIDE AND STYLE EXAMPLES]`,
    tip: 'Feed the output back with a draft asset and ask it to flag which field the draft would fail — that is the real test of whether the spec is enforceable.',
  },
  'data-readiness-audit-run': {
    title: 'Audit data readiness across the five object types',
    useWhen:
      'You are about to commit to building a workflow, agent, or automation that assumes Identity, State, Decision, Content, and Learning objects already exist and are trustworthy.',
    body: `You are acting as a data architecture analyst. Below is an inventory of [company]'s current systems, what each one stores, and how they connect. Produce: for each of the five Shared Memory object types, what it requires, what the inventory shows you actually have, and a verdict of blocking, limits-not-blocking, or ready; the specific match rate or staleness figure behind any Identity or State verdict, not just an impression; and, most important, which single object type is the weakest link that determines whether autonomy can scale past a demo. Mark any verdict you reached by inference rather than a number stated in the inventory.

[PASTE SYSTEMS INVENTORY]`,
    tip: 'Ask it to name the one system that would close the largest gap if it were connected first — that is usually a cheaper fix than it looks.',
  },
  'persona-trio-draft': {
    title: 'Draft a decision-narrative persona trio',
    useWhen:
      'You have qualitative research or sales-call notes and need a persona built from reasoning paths, not demographics, before designing a journey or writing copy against it.',
    body: `You are acting as a B2B or B2C research analyst. Below are call notes, survey responses, or CRM notes for [segment]. Produce: a primary, secondary, and negative persona, each scored across the same five fields, JTBD, Anxiety, Proof, Channel, Tone, written as instructions a content system could act on, not a biography; the specific evidence in the notes each field draws from; and, most important, the negative persona's exclusion criteria, stated as plainly as the primary persona's inclusion case. A trio with no negative entry is not finished. Mark any field you generalised from a small number of sources rather than a pattern that repeated.

[PASTE CALL NOTES OR RESEARCH]`,
    tip: 'Ask it to write the one message that would work for the primary persona and fail for the negative one — that contrast is the real test of the split.',
  },
  'economics-of-error-run': {
    title: 'Run the four diagnostic questions on a decision',
    useWhen: 'A decision is about to be handed to an AI agent for the first time, or two people disagree about how much autonomy it deserves.',
    body: `You are acting as a governance analyst applying the Economics of Error framework. Below is a description of [decision] as it is made today. Produce: an answer to each of the four questions, cost of a wrong decision, reversibility, value of acting faster, and the AI's actual confidence in this specific call; a check for whether the decision is really one action or two that should be scored separately, the way pausing and resuming a campaign split apart; the resulting autonomy tier for each sub-decision; and, most important, which single answer you are least certain of. Mark any answer that is an assumption rather than something stated in the description.

[PASTE DECISION DESCRIPTION]`,
    tip: 'If any answer feels like it is arguing with itself, that is the signal to split the decision and run the four questions twice.',
  },
  'experiment-design-draft': {
    title: 'Draft an experiment design from a test idea',
    useWhen: 'A test idea exists but has not been forced through the seven fields a holdout test needs before it can launch.',
    body: `You are acting as an experimentation analyst. Below is a description of [test idea] and the metric or business question it is meant to answer. Produce: a falsifiable hypothesis that names a specific number, not a direction; exactly what changes and what stays untouched; a primary metric and at least one guardrail metric; the test design and the population it runs on; a duration long enough for the effect to mature; a pre-registered success threshold; and, most important, the decision the result enables on both a clear pass and a clear miss. Refuse to produce a hypothesis that cannot fail, and mark anything assumed rather than stated in the description.

[PASTE TEST IDEA AND BUSINESS QUESTION]`,
    tip: "Run the result through this checklist's Decision Enabled field before the test launches, not after it reports — that is the field most under deadline pressure.",
  },
  'governance-table-draft': {
    title: 'Draft governance table rows for an agent',
    useWhen:
      'A new agentic workflow is about to go live and needs a named failure mode, control, and measurable kill-switch before it touches customer-facing output.',
    body: `You are acting as an AI governance analyst. Below is a description of [agent or workflow], its content type, and the governance zone it sits in per the Economics of Error. Produce: the highest-risk failure this specific agent could actually produce, named specifically rather than generically; the control that catches it before publish; a measurable kill-switch trigger stated as a number or event, not a feeling; and, most important, at least two things deliberately left outside this agent's scope, each with the risk of that omission stated plainly. An unnamed gap is not a safe gap. Mark any control you inferred rather than one the description confirms exists.

[PASTE AGENT OR WORKFLOW DESCRIPTION]`,
    tip: 'Ask it to argue why the exclusions are actually safe to leave out — a weak argument there is the reason to automate sooner than planned.',
  },
  'icp-rubric-score': {
    title: 'Score an account against the ICP rubric',
    useWhen:
      'A specific account needs a documented, auditable Fit x Readiness minus Friction score, not a gut call about whether it is worth sales time.',
    body: `You are acting as a revenue operations analyst. Below is everything known about [account], firmographics, discovery-call notes, and any competitive or budget signals. Produce: a 0-5 score for each of the nine sub-criteria across Fit, need intensity and profile match, Readiness, intent signal, engagement depth, and urgency, and Friction, procurement complexity, switching cost, and barriers; each subtotal; the final ICP Score computed exactly as Fit times Readiness minus Friction; and, most important, the resulting tier and what it should trigger next. Mark every score you inferred from tone or context rather than something explicitly stated in the notes.

[PASTE ACCOUNT NOTES]`,
    tip: 'Ask it to flag the sub-criterion with the weakest evidence behind its score — that is usually worth one more discovery question before the tier is trusted.',
  },
  'journey-state-draft': {
    title: 'Define a journey state before wiring it',
    useWhen: 'A new state needs defining for an orchestration workflow, before any trigger gets built against it.',
    body: `You are acting as a lifecycle orchestration analyst. Below is a description of [customer behavior or moment] you want to turn into a journey state. Produce: a system-detectable entry condition stated as a boolean, not a judgment call; a dwell minimum that stops the state re-evaluating on every event; every exit path and the state each one leads to, checked so no two exits can fire at once; the content or next-best-action attached to the state, with an autonomy tier per the Economics of Error; and, most important, a regression rule with a cooldown that stops a customer flapping back in immediately. Mark any condition that is not actually observable in the data you have today.

[PASTE BEHAVIOUR DESCRIPTION AND AVAILABLE DATA]`,
    tip: 'Ask it to name the single event most likely to fire this state accidentally — that is the edge case the entry condition usually needs tightening against.',
  },
  'messaging-pillars-draft': {
    title: 'Draft messaging pillars from a positioning statement',
    useWhen:
      'A positioning statement exists and a content pipeline needs three or four fixed themes to draw from, each with its own proof and boundary.',
    body: `You are acting as a brand messaging strategist. Below is [company]'s positioning statement, particularly its Because and Unlike slots, and any existing proof points. Produce: three or four messaging pillars, each with two distinct support points, two named and checkable proof sources, and a do-not-say line naming the specific overclaim that pillar invites; a check that no pillar is really a support point for another pillar wearing a new name; and, most important, confirmation that every support point traces back to the Because or Unlike in the positioning statement rather than inventing new territory. Mark any support point you could not trace to the supplied statement.

[PASTE POSITIONING STATEMENT AND PROOF POINTS]`,
    tip: 'Ask it to write one piece of ad copy per pillar and check whether the do-not-say line would actually catch a violation — an untestable boundary is not a boundary.',
  },
  'positioning-statement-draft': {
    title: 'Draft a positioning statement in seven slots',
    useWhen:
      'A new product, category launch, or repositioning needs a single source-of-truth claim precise enough for a person or an AI system to reuse without interpreting it first.',
    body: `You are acting as a positioning strategist. Below is [product], who it is built for, what it replaces, and any evidence of why it works. Produce: the seven slots filled in plainly, For, the specific buyer by role and firmographic detail; Who, their concrete cost or friction; [Product] is, the category; That, the outcome, not a feature list; Because, the mechanism that makes it believable; Unlike, the specific alternative displaced; and, most important, Our difference is, what the alternative structurally cannot do, not just does worse. Refuse any slot that resolves to an adjective instead of a fact, and mark anything inferred rather than supplied.

[PASTE PRODUCT DETAILS AND COMPETITIVE CONTEXT]`,
    tip: 'Read it end to end as one sentence — if it does not argue its own case without your help, a slot is still doing too little work.',
  },
  'govern-claims-audit': {
    title: 'Audit a draft against its authorised claims',
    useWhen:
      'You have a marketing draft and a short list of what the product is actually allowed to claim, and you need to catch anything invented before it ships.',
    body: `You are acting as a claims auditor. Below is the authorised claim list for [product] and a draft of [asset type, e.g. a positioning statement or ad script]. Check every factual or clinical assertion in the draft against the authorised list and produce: each claim with no direct match in the source list, flagged by exact sentence; each claim that technically matches but implies more through a word like restore, heal, or fix than the source actually supports; the single most severe fabrication, ranked by how citable or clinical it reads; and a corrected version of only the flagged sentences. Mark every flag as either unsupported or overclaimed, and leave anything already covered by the source list untouched.

[PASTE DRAFT AND AUTHORISED CLAIM LIST]`,
    tip: 'Then ask it to rewrite the single worst flagged sentence twice: once corrected, once cut entirely, so keeping any diluted version has to be a deliberate choice.',
  },
} as const satisfies Record<string, PromptEntry>

export type PromptId = keyof typeof registry

// Widened to PromptEntry (not the literal registry type) so optional fields
// like `tip` type-check as `string | undefined` at call sites — same reason
// facts.ts does it.
export const prompts: Record<PromptId, PromptEntry> = registry
export const PROMPT_IDS = Object.keys(registry) as PromptId[]
