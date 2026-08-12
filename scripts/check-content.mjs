#!/usr/bin/env node
/**
 * Content-integrity gate, run at the end of `npm run build` (package.json).
 * Fails the build rather than warning — see CLAUDE.md and
 * docs/BRIEF-AMENDMENTS.md A6. Checks, in order:
 *
 *   1. Every PAGES manifest slug has a matching MDX file, and vice versa.
 *   2. Every internal markdown link ([label](/slug)) resolves to a live slug.
 *   3. No 3+ consecutive bare paragraphs in a row — the chunking rule.
 *   4. Every <Stat id="..."> / <Example id="..."> resolves in facts.ts.
 *   5. Any <SyntheticBanner>/<Example> referencing a synthetic fact implies
 *      the host page declares PageMeta.synthetic.
 *   6. No TODO( markers on status:'live' pages.
 *
 * Deliberately regex/line-based, not a full MDX AST parse — this is a content
 * hygiene gate for a personal site, not a compiler. Ponytail: swap for a real
 * remark-mdx AST walk if the ruleset outgrows what regex can check cleanly.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const contentDir = join(root, 'src/content')
const pagesFile = join(root, 'src/data/pages.ts')
const factsFile = join(root, 'src/data/facts.ts')

let ok = true
const fail = (msg) => {
  console.error(`check-content: ${msg}`)
  ok = false
}

// --- Parse PAGES manifest (slug + status + synthetic presence) -----------
const pagesSrc = readFileSync(pagesFile, 'utf-8')
const pageBlocks = [...pagesSrc.matchAll(/\{\s*slug:\s*'([^']+)'[\s\S]*?\n {2}\},/g)].map((m) => m[0])
const pages = pageBlocks.map((block) => {
  const slug = block.match(/slug:\s*'([^']+)'/)?.[1]
  const status = block.match(/status:\s*'([^']+)'/)?.[1] ?? 'live'
  const hasSynthetic = /synthetic:\s*\{/.test(block)
  return { slug, status, hasSynthetic }
})
const slugs = new Set(pages.map((p) => p.slug))

// --- Parse facts.ts ids ----------------------------------------------------
const factsSrc = readFileSync(factsFile, 'utf-8')
const factIds = new Set([...factsSrc.matchAll(/^\s*'([a-z0-9-]+)':\s*\{/gm)].map((m) => m[1]))
const syntheticFactIds = new Set(
  [...factsSrc.matchAll(/'([a-z0-9-]+)':\s*\{[\s\S]*?kind:\s*'synthetic'/g)].map((m) => m[1]),
)

// --- Walk content files -----------------------------------------------------
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (entry.endsWith('.mdx')) out.push(full)
  }
  return out
}

const mdxFiles = existsSync(contentDir) ? walk(contentDir) : []
const mdxSlugs = new Set(mdxFiles.map((f) => relative(contentDir, f).replace(/\.mdx$/, '')))

// 1. Manifest <-> file parity
for (const page of pages) {
  if (!mdxSlugs.has(page.slug)) fail(`manifest slug "${page.slug}" has no matching src/content/${page.slug}.mdx`)
}
for (const slug of mdxSlugs) {
  if (!slugs.has(slug)) fail(`src/content/${slug}.mdx exists but is not listed in src/data/pages.ts`)
}

for (const file of mdxFiles) {
  const rel = relative(contentDir, file).replace(/\.mdx$/, '')
  const page = pages.find((p) => p.slug === rel)
  const text = readFileSync(file, 'utf-8')
  const lines = text.split('\n')

  // 2. Internal links resolve
  for (const m of text.matchAll(/\]\(\/([a-z0-9/-]+)\)/g)) {
    if (!slugs.has(m[1])) fail(`${rel}.mdx links to "/${m[1]}", which is not a page in the manifest`)
  }

  // 3. Chunking rule — no 3+ consecutive bare paragraph lines in a row.
  // Tracks whether we're inside a multi-line JSX opening tag (attribute
  // lines, inline object/array props like <DefinitionList items={[...]}>)
  // so those don't get misread as prose paragraphs.
  let run = 0
  let inTag = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.length === 0) continue // blank lines neither count nor reset

    if (inTag) {
      if (/\/?>\s*$/.test(trimmed)) inTag = false
      continue
    }
    if (/^<[A-Za-z]/.test(trimmed)) {
      if (!/\/?>\s*$/.test(trimmed)) inTag = true
      run = 0
      continue
    }

    const isParagraph =
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('-') &&
      !trimmed.startsWith('*') &&
      !trimmed.startsWith('|') &&
      !trimmed.startsWith('>') &&
      !trimmed.startsWith('<') // closing tags, e.g. </Example>

    if (isParagraph) {
      run += 1
      if (run > 2) {
        fail(`${rel}.mdx has 3+ consecutive paragraphs with no visual interrupt (diagram/callout/example/table/quote)`)
        run = 0
      }
    } else {
      run = 0
    }
  }

  // 4. Stat/Example ids resolve, and 5. synthetic implies page-level banner
  for (const m of text.matchAll(/<(Stat|Example)\s+id="([a-z0-9-]+)"/g)) {
    const [, tag, id] = m
    if (!factIds.has(id)) fail(`${rel}.mdx: <${tag} id="${id}"> does not resolve in src/data/facts.ts`)
    else if (syntheticFactIds.has(id) && page && !page.hasSynthetic) {
      fail(`${rel}.mdx uses synthetic fact "${id}" but its PageMeta has no \`synthetic\` field`)
    }
  }

  // 6. No TODO markers on live pages
  if (page?.status === 'live' && /TODO\(/.test(text)) {
    fail(`${rel}.mdx is status:'live' but still has a TODO( marker`)
  }
}

if (!ok) {
  console.error(`\ncheck-content: FAILED (checked ${mdxFiles.length} content files)`)
  process.exit(1)
}
console.log(`check-content: OK (${mdxFiles.length} content files, ${pages.length} manifest pages)`)
