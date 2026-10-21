#!/usr/bin/env node
/**
 * Copia los componentes JS de UiGas a dist/.
 *
 * No hay bundler: los archivos son vanilla y se sirven tal cual.
 *   node tools/build-js.mjs
 */

import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src/js');
const DIST = join(ROOT, 'dist');

mkdirSync(DIST, { recursive: true });

const files = readdirSync(SRC).filter((file) => file.endsWith('.js'));

for (const file of files) {
  copyFileSync(join(SRC, file), join(DIST, file));
  const kb = (statSync(join(DIST, file)).size / 1024).toFixed(1);
  console.log(`  dist/${file}  ${kb} KB`);
}

console.log(`✓ ${files.length} archivo(s) JS copiados a dist/`);
