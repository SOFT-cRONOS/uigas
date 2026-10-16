#!/usr/bin/env node
/**
 * Verifica que no haya enlaces internos rotos en doc/.
 * Ignora anchors (#...), links externos y el contenido de <script>.
 *
 *   node tools/docs/check-links.mjs
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const DOCS = join(ROOT, 'doc');

/** Todos los .html bajo doc/. */
function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const stripScripts = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '');

let broken = 0;
let checked = 0;
const files = walk(DOCS);

for (const file of files) {
  const html = stripScripts(readFileSync(file, 'utf8'));
  const dir = dirname(file);
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:|javascript:)/.test(url)) continue;
    if (url.startsWith('#')) continue;
    const clean = url.split('#')[0].split('?')[0];
    if (!clean) continue;
    checked++;
    const target = resolve(dir, clean);
    // un href a directorio es válido si existe el index dentro
    const ok = existsSync(target) || existsSync(join(target, 'index.html'));
    if (!ok) {
      console.log(`  ROTO  ${file.replace(ROOT + '/', '')}  ->  ${url}`);
      broken++;
    }
  }
}

console.log(`\n${files.length} páginas · ${checked} enlaces internos · ${broken} rotos`);
process.exit(broken ? 1 : 0);