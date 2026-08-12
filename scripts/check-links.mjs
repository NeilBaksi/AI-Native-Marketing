#!/usr/bin/env node
/**
 * Runs against the BUILT dist/ output with the production base path applied —
 * not the dev server, which hides base-path bugs (astro.config.mjs's `base`
 * isn't enforced the same way in `astro dev`). See docs/ADR-001-stack.md.
 *
 * Checks:
 *   1. Every internal href/src in dist/ HTML resolves to a real file, and is
 *      base-path-correct (starts with BASE, not a raw "/...").
 *   2. tokens.css's hard-coded font paths match astro.config.mjs's BASE
 *      constant — the one deliberate duplication, and the one place it could
 *      silently drift.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(root, 'dist');

const configSrc = readFileSync(join(root, 'astro.config.mjs'), 'utf-8');
const baseMatch = configSrc.match(/const BASE = '([^']+)'/);
if (!baseMatch) {
  console.error('check-links: could not find `const BASE = \'...\'` in astro.config.mjs');
  process.exit(1);
}
const BASE = baseMatch[1];

const tokensSrc = readFileSync(join(root, 'src/styles/tokens.css'), 'utf-8');
const fontPaths = [...tokensSrc.matchAll(/url\('([^']+)'\)/g)].map((m) => m[1]);
let ok = true;

for (const path of fontPaths) {
  if (!path.startsWith(BASE)) {
    console.error(`check-links: tokens.css font path "${path}" does not start with BASE "${BASE}" — these must stay in sync (see astro.config.mjs comment).`);
    ok = false;
  }
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

function resolvesToFile(urlPath) {
  // Strip the base, strip query/hash, map trailing-slash routes to index.html
  let rel = urlPath.slice(BASE.length);
  rel = rel.split(/[?#]/)[0];
  if (rel === '' || rel.endsWith('/')) rel += 'index.html';
  else if (!rel.includes('.')) rel += '/index.html';
  return existsSync(join(distDir, rel));
}

if (!existsSync(distDir)) {
  console.error('check-links: dist/ not found — run `astro build` first.');
  process.exit(1);
}

const htmlFiles = walk(distDir);
const attrPattern = /(?:href|src)="([^"]+)"/g;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  for (const match of html.matchAll(attrPattern)) {
    const url = match[1];
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('#') || url.startsWith('data:')) continue;
    if (!url.startsWith('/')) continue; // relative — not the base-path failure mode we're guarding against
    if (!url.startsWith(BASE)) {
      console.error(`check-links: ${file.replace(distDir, 'dist')} references "${url}" which does not start with base "${BASE}" — this will 404 in production.`);
      ok = false;
      continue;
    }
    if (!resolvesToFile(url)) {
      console.error(`check-links: ${file.replace(distDir, 'dist')} references "${url}" which does not resolve to a built file.`);
      ok = false;
    }
  }
}

if (!ok) {
  console.error(`\ncheck-links: FAILED (checked ${htmlFiles.length} pages)`);
  process.exit(1);
}
console.log(`check-links: OK (${htmlFiles.length} pages, base "${BASE}" verified)`);
