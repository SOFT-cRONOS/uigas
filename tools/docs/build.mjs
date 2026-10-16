#!/usr/bin/env node
/**
 * Generador de la documentación UiGas.
 *
 *   node tools/docs/build.mjs
 *
 * Lee tools/docs/nav.mjs (árbol), tools/docs/content/**\/*.md (páginas
 * escritas a mano) y tools/docs/derived.mjs (páginas breves), y escribe
 * doc/**\/*.html más doc/assets/docs.css.
 *
 * El sidebar lista siempre las 89 páginas; las que todavía no existen
 * salen atenuadas y sin href, así que ninguna entrega intermedia deja 404.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SECTIONS, SITE, flatten, TOTAL_PAGES } from './nav.mjs';
import { render } from './md.mjs';
import { page, DOCS_CSS } from './layout.mjs';
import { DERIVED, DERIVED_NOTE_TITLE } from './derived.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const CONTENT = join(ROOT, 'tools/docs/content');
const DOCS = join(ROOT, 'doc');

/** Descripción por defecto de cada sección, para la home. */
const SECTION_BLURB = {
  'getting-started': 'Qué es UiGas, cómo se instala y qué hace falta para empezar.',
  layout: 'Breakpoints, contenedores, grid y columnas. Estructura de Bootstrap, tema de UiGas.',
  content: 'Tipografía, tablas, imágenes y figuras con la voz del framework.',
  forms: 'Controles, validación, layout y accesibilidad de formularios.',
  components: 'Los 24 componentes: de la alerta al tooltip, con el aspecto UiGas.',
  helpers: 'Pequeñas utilidades Bootstrap que UiGas no redefine.',
  utilities: 'API, fondo, bordes, color, flex, spacing, texto y el resto.',
  customize: 'Tokens, Sass, variables CSS y cómo.optimizar el bundle.',
  extend: 'Filosofía del framework, iconos y los componentes propios de UiGas.',
};

/**
 * Los links del markdown se escriben con raíz (/seccion/pagina.html).
 * Acá se vuelven relativos a la profundidad de la página, para que
 * la doc funcione abriendo el archivo desde el disco.
 */
function relativize(html, depth) {
  const prefix = '../'.repeat(depth);
  return html.replace(/href="\/(?!\/)/g, `href="${prefix}`);
}

/**
 * Mismo criterio que el sidebar: un link a una página que todavía no
 * existe no se rompe, se apaga. Las secciones van apareciendo a medida
 * que se escriben y el link revive solo al compilar.
 */
function neutralizeDead(html) {
  return html.replace(/<a\b([^>]*)>/g, (tag, attrs) => {
    const m = attrs.match(/\shref="([^"]+\.html)(#[^"]*)?"/);
    if (!m) return tag;
    const rel = m[1].split('#')[0].replace(/^(\.\.\/)+/, '');
    if (READY.has(rel)) return tag;
    const rest = attrs.replace(/\shref="[^"]*"/, '');
    const cls = rest.match(/class="([^"]*)"/)
      ? rest.replace(/class="([^"]*)"/, 'class="$1 dead-link"')
      : rest + ' class="dead-link"';
    return `<a${cls} data-pending="${rel}" aria-disabled="true">`;
  });
}

const exists = (rel) => existsSync(join(DOCS, rel));

/** Rutas del árbol que van a existir en esta compilación. */
let READY = new Set();
const write = (rel, content) => {
  const file = join(DOCS, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content, 'utf8');
  return rel;
};

/** Índice de búsqueda: solo páginas que existen. */
function buildSearchIndex() {
  const out = [{ title: 'Inicio', href: 'index.html' }];
  for (const p of flatten()) {
    if (exists(p.path)) {
      out.push({ title: `${p.title} · ${p.sectionTitle}`, href: `../${p.path}` });
    }
  }
  return out;
}

/** Body de una página derivada: breve, honesta y con link a Bootstrap. */
function derivedBody(entry) {
  const ver = entry.ver
    ? `<p><a href="${entry.ver}" rel="noopener">Ver la documentación de Bootstrap →</a></p>`
    : '';
  return (
    `<div class="doc-note"><strong>${DERIVED_NOTE_TITLE}.</strong> ${entry.nota}</div>\n` +
    `${render(entry.cuerpo).html}\n${ver}`
  );
}

/* ── home ─────────────────────────────────────────── */
function buildHome(navIndex) {
  const cards = SECTIONS.map(([id, title, pages]) => {
    const ready = pages.filter(([slug]) => READY.has(`${id}/${slug}.html`)).length;
    const first = pages.find(([slug]) => READY.has(`${id}/${slug}.html`));
    // sin páginas escritas la tarjeta queda inerte, igual que en el sidebar
    const open = first ? ` href="${id}/${first[0]}.html"` : '';
    const cls = first ? 'sec-card' : 'sec-card is-empty';
    return (
      `<a class="${cls}" id="${id}"${open}>` +
      `<h3>${title}</h3><p>${SECTION_BLURB[id] || ''}</p>` +
      `<span class="n">${ready}/${pages.length} páginas</span></a>`
    );
  }).join('\n');

  const body = `<div class="doc-main">
<div class="hero">
  <div class="kicker">${SITE.tagline}</div>
  <h1>UiGas</h1>
  <p class="lead">Framework CSS que se apoya en Bootstrap 5 y reemplaza su capa visual: tipografía, superficies, estados y componentes con los tokens del Brandbook CVR 2027.</p>
  <div class="hero-cta">
    <a class="btn btn-primary" href="getting-started/introduction.html">Empezar</a>
    <a class="btn btn-outline-secondary" href="getting-started/installation.html">Instalación</a>
    <a class="btn btn-outline-secondary" href="showcase.html">Ver showcase</a>
  </div>
</div>

<h2 id="secciones">Secciones</h2>
<div class="sec-grid">
${cards}
</div>

<h2 id="que-es">Qué es y qué no es</h2>
<p>UiGas <strong>no</strong> es un reemplazo de Bootstrap: es una capa de override. Necesitás Bootstrap 5 (CSS y JS) cargado antes, y UiGas encima. Lo que UiGas redefine son las variables \`--bs-*\` y los tokens \`--uig-*\`, más los estilos de los componentes. Lo que no redefine —el grid, el reboot, las utilidades de layout— lo hereda y lo tematiza.</p>
<p>Esa frontera es deliberada y está documentada página por página: cada sección marca si la clase es de UiGas o viene de Bootstrap.</p>

<h2 id="temas">Dos temas</h2>
<p>El tema se conmuta con <code>data-bs-theme</code> en <code>&lt;html&gt;</code>. La paleta de marca es idéntica en ambos; lo que cambia es la capa semántica (superficies, líneas, texto y los tonos de cada estado), así que ningún componente necesita reglas nuevas para verse bien en claro.</p>

<h2 id="creditos">Créditos</h2>
<p>Construido sobre <a href="https://getbootstrap.com" rel="noopener">Bootstrap 5.3</a>, tipografías de Google Fonts y Korataki (solo logo y marca, vía <code>local()</code>). MIT.</p>
</div>`;

  return page({ page: null, depth: 0, navIndex, exists, body: neutralizeDead(body), description: SITE.tagline });
}

/* ── contents: se genera desde nav.mjs, nunca a mano ─────────── */
function contentsBody() {
  const rows = SECTIONS.map(([id, title, pages]) => {
    const items = pages
      .map(([slug, label]) => {
        const rel = `${id}/${slug}.html`;
        return READY.has(rel)
          ? `<li><a href="/${rel}">${label}</a></li>`
          : `<li class="pending">${label}</li>`;
      })
      .join('');
    const n = pages.filter(([s]) => READY.has(`${id}/${s}.html`)).length;
    return (
      `<section class="toc-sec">` +
      `<h2 id="${id}">${title} <span class="toc-n">${n}/${pages.length}</span></h2>` +
      `<ul>${items}</ul></section>`
    );
  }).join('\n');

  return `<div class="doc-main">
<p class="lead">El mapa completo de la documentación: ${TOTAL_PAGES} páginas en ${SECTIONS.length} secciones. Lo que UiGas no redefine se documenta en gris.</p>
${rows}
</div>`;
}

/* ── páginas ──────────────────────────────────────── */
function buildPage(p, navIndex) {
  const mdFile = join(CONTENT, `${p.sectionId}/${p.slug}.md`);
  let body, description;

  if (existsSync(mdFile)) {
    const parsed = render(readFileSync(mdFile, 'utf8'));
    body = parsed.html;
    description = parsed.description;
  } else if (p.path === 'getting-started/contents.html') {
    body = contentsBody();
    description = 'El mapa completo de la documentación de UiGas.';
  } else if (DERIVED[p.path]) {
    body = derivedBody(DERIVED[p.path]);
    description = DERIVED[p.path].nota.slice(0, 160);
  } else {
    return null;
  }

  return page({
    page: p,
    depth: 1,
    navIndex,
    exists,
    body: `<div class="doc-main">\n${neutralizeDead(relativize(body, 1))}\n</div>`,
    description,
  });
}

/* ── main ─────────────────────────────────────────── */
function main() {
  const all = flatten();
  const navIndex = [];

  // 0 · qué páginas van a existir en esta compilación
  // Incluye los HTML sueltos que no pertenecen al árbol (home, showcase, demos).
  const ready = all.filter(
    (p) =>
      existsSync(join(CONTENT, `${p.sectionId}/${p.slug}.md`)) ||
      DERIVED[p.path] ||
      p.path === 'getting-started/contents.html'
  );
  const STANDALONE = ['index.html', 'showcase.html', 'banners.html', 'cards.html', 'forms.html'];
  READY = new Set([...ready.map((p) => p.path), ...STANDALONE]);

  // 1 · búsqueda (solo lo que ya existe)
  navIndex.push({ title: 'Inicio', href: 'index.html' });
  for (const p of all) if (exists(p.path)) navIndex.push({ title: `${p.title} · ${p.sectionTitle}`, href: `../${p.path}` });

  // 2 · CSS de la doc
  write('assets/docs.css', DOCS_CSS);

  // 3 · home
  write('index.html', buildHome(navIndex));

  // 4 · páginas (con prev/next sobre las que existen)
  let written = 0;
  for (const p of ready) {
    const idx = ready.indexOf(p);
    const html = buildPage({ ...p, prev: ready[idx - 1], next: ready[idx + 1] }, navIndex);
    if (html) {
      write(p.path, html);
      written++;
    }
  }

  const pending = all.length - ready.length;
  console.log(`docs → ${written} páginas · home · assets/docs.css`);
  console.log(`      ${ready.length}/${all.length} del árbol listas · ${pending} pendientes`);
}

main();