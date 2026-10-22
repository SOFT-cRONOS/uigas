/**
 * Chrome compartido de la documentación.
 * Todo lo que se repite en las 89 páginas vive acá una sola vez.
 */

import { SITE, SECTIONS } from './nav.mjs';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const FONTS =
  'https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=Rajdhani:wght@400;500;600;700&display=swap';

const BOOTSTRAP = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3';

/** Script anti-flash: ?theme= → preferencia guardada → sistema → oscuro. */
const THEME_BOOT = `(function(){var q=new URLSearchParams(location.search).get('theme');
var s=localStorage.getItem('uig-theme');
var t=q||s||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
document.documentElement.setAttribute('data-bs-theme',t);})();`;

/** Sidebar: 9 secciones; las páginas sin archivo salen atenuadas y sin href. */
function sidebar(page, exists, depth) {
  const root = depth === 0 ? '' : '../'.repeat(depth);
  const items = SECTIONS.map(([id, title, pages]) => {
    const inSection = page && page.sectionId === id;
    const links = pages
      .map(([slug, label]) => {
        const href = `${root}${id}/${slug}.html`;
        const here = page && page.sectionId === id && page.slug === slug;
        if (!exists(`${id}/${slug}.html`)) {
          return `<span class="side-link is-off" aria-disabled="true">${esc(label)}</span>`;
        }
        return `<a class="side-link${here ? ' is-here' : ''}" href="${href}">${esc(label)}</a>`;
      })
      .join('');
    return (
      `<details class="side-group"${inSection ? ' open' : ''}>` +
      `<summary class="side-title">${esc(title)}<span class="side-count">${pages.length}</span></summary>` +
      `<div class="side-items">${links}</div>` +
      `</details>`
    );
  }).join('');

  return (
    `<aside class="sidebar" id="sidebar">` +
    `<div class="side-inner">${items}` +
    `<a class="side-ext" href="${root}showcase.html">→ Showcase</a>` +
    `</div></aside>`
  );
}

/** buscador: índice embebido, funciona con file:// sin fetch */
const SEARCH_BOOT = `
(function(){
  var idx = window.UIGAS_NAV || [];
  var box = document.getElementById('q'), out = document.getElementById('qout');
  function hide(){ out.hidden = true; out.innerHTML = ''; }
  function run(){
    var q = box.value.trim().toLowerCase();
    if (q.length < 2) return hide();
    var hit = idx.filter(function(p){
      return (p.title + ' ' + p.path).toLowerCase().indexOf(q) > -1;
    }).slice(0, 12);
    if (!hit.length) return hide();
    out.innerHTML = hit.map(function(p){
      return '<a href="' + p.href + '">' + p.title + '<small>' + p.path + '</small></a>';
    }).join('');
    out.hidden = false;
  }
  box.addEventListener('input', run);
  box.addEventListener('focus', run);
  document.addEventListener('click', function(e){
    if (!out.contains(e.target) && e.target !== box) hide();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') { box.value = ''; hide(); box.blur(); }
  });
})();`;

/**
 * @param {object} o
 * @param {object} o.page    página actual (o null para la home)
 * @param {string} o.depth   profundidad de ruta (0 en la home, 1 en sección)
 * @param {object} o.nav     índice de búsqueda ya resuelto
 */
export function page({ page, depth, navIndex, exists, body, description }) {
  const root = depth === 0 ? '' : '../'.repeat(depth);
  // dist/ vive fuera de doc/, así que siempre lleva un nivel más de retroceso
  const assets = '../'.repeat(depth + 1);
  const fullTitle = page ? `${page.title} · ${SITE.title}` : `${SITE.title} · ${SITE.tagline}`;
  const crumbs = page
    ? `<nav class="crumbs"><a href="${root}index.html">${SITE.title}</a>` +
      `<span>/</span><a href="${root}index.html#${page.sectionId}">${esc(page.sectionTitle)}</a>` +
      `<span>/</span><span class="here">${esc(page.title)}</span></nav>`
    : '';
  const prev = page?.prev;
  const next = page?.next;

  return `<!DOCTYPE html>
<html lang="es" data-bs-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description || SITE.tagline)}">
<link href="${BOOTSTRAP}/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="${FONTS}" rel="stylesheet">
<link rel="stylesheet" href="${assets}dist/uigas.min.css">
<link rel="stylesheet" href="${root}assets/docs.css">
<script>${THEME_BOOT}</script>
</head>
<body>
<a class="skip" href="#main">Ir al contenido</a>

<header class="topbar">
  <button class="burger" id="burger" aria-label="Menú" aria-expanded="false">☰</button>
  <a class="brandmark" href="${root}index.html">Ui<span>Gas</span></a>
  <div class="search">
    <input id="q" type="search" placeholder="Buscar en la documentación…" autocomplete="off" aria-label="Buscar">
    <div class="qout" id="qout" hidden></div>
  </div>
  <div class="top-actions">
    <a class="btn btn-outline-secondary btn-sm d-none d-lg-inline-flex" href="${root}showcase.html">Showcase</a>
    <a class="btn btn-outline-secondary btn-sm d-none d-md-inline-flex" href="https://github.com/${SITE.repo}" rel="noopener">GitHub</a>
    <button class="btn btn-outline-secondary btn-sm theme-btn" id="tt" aria-label="Cambiar tema">◐</button>
  </div>
</header>

<div class="shell">
${sidebar(page, exists, depth)}
<main class="main" id="main">
${crumbs}
${body}
${
  prev || next
    ? `<nav class="pager">` +
      (prev
        ? `<a class="p-prev" href="${root}${prev.path}"><small>Anterior</small>${esc(prev.title)}</a>`
        : '<span></span>') +
      (next
        ? `<a class="p-next" href="${root}${next.path}"><small>Siguiente</small>${esc(next.title)}</a>`
        : '<span></span>') +
      `</nav>`
    : ''
}
<footer class="docfoot">
  <p>UiGas · ${SITE.tagline} · MIT © 2026 softcronos.com.ar</p>
  <p>Bootstrap 5 es marca de sus autores. Korataki solo para logo y marca.</p>
</footer>
</main>
</div>

<div class="scrim" id="scrim" hidden></div>
<script src="${BOOTSTRAP}/dist/js/bootstrap.bundle.min.js"></script>
<script src="${assets}dist/uigas-select.js" defer></script>
<script>window.UIGAS_NAV = ${JSON.stringify(navIndex)};</script>
<script>
(function(){
  var tt = document.getElementById('tt');
  tt.addEventListener('click', function(){
    var el = document.documentElement;
    var next = el.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
    el.setAttribute('data-bs-theme', next);
    try { localStorage.setItem('uig-theme', next); } catch (e) {}
  });
  var burger = document.getElementById('burger'), scrim = document.getElementById('scrim');
  function close(){ document.body.classList.remove('nav-open'); scrim.hidden = true; burger.setAttribute('aria-expanded','false'); }
  burger.addEventListener('click', function(){
    var open = document.body.classList.toggle('nav-open');
    scrim.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
  });
  scrim.addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
})();
${SEARCH_BOOT}
</script>
</body>
</html>
`;
}

/**
 * CSS de la documentación.
 * Usa tokens de UiGas, así que el toggle de tema lo resuelve solo.
 */
export const DOCS_CSS = `/* ═══════════════════════════════════════════
   UiGas Docs — chrome de la documentación
   Todo el color sale de tokens: el tema se
   conmuta solo, no hay CSS duplicado.
   ═══════════════════════════════════════════ */
:root {
  --side-w: 268px;
  --top-h: 58px;
  --doc-max: 860px;
}
html { scroll-padding-top: calc(var(--top-h) + 1rem); }
body {
  background: var(--uig-bg);
  color: var(--uig-text);
  font-family: var(--uig-font-body);
  font-size: 0.975rem;
  line-height: 1.7;
}
a { color: var(--bs-link-color); text-decoration-thickness: 1px; text-underline-offset: 2px; }
a:hover { color: var(--bs-link-hover-color); }
:focus-visible { outline: 2px solid var(--uig-red); outline-offset: 2px; border-radius: 2px; }

.skip {
  position: absolute; left: -9999px; top: 0; z-index: 100;
  background: var(--uig-red-slab); color: #fff; padding: .6rem 1rem;
}
.skip:focus { left: 0; }

/* ── topbar ─────────────────────────────────── */
.topbar {
  position: sticky; top: 0; z-index: 40;
  height: var(--top-h);
  display: flex; align-items: center; gap: .75rem;
  padding: 0 1rem;
  background: var(--uig-nav-bg);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--uig-line);
}
.brandmark {
  font-family: var(--uig-font-brand); font-style: italic; font-weight: 700;
  font-size: 1.35rem; letter-spacing: .02em; color: var(--uig-heading);
  text-decoration: none; white-space: nowrap;
}
.brandmark span { color: var(--uig-red); }
.burger {
  display: none; background: none; border: 1px solid var(--uig-line);
  color: var(--uig-text); border-radius: 3px; padding: .25rem .5rem; font-size: 1rem;
}
.search { position: relative; flex: 1; max-width: 420px; }
.search input {
  width: 100%; background: var(--uig-surface); color: var(--uig-text);
  border: 1px solid var(--uig-line); border-radius: 3px;
  padding: .4rem .7rem; font-size: .875rem; font-family: inherit;
}
.search input::placeholder { color: var(--uig-text-muted); }
.qout {
  position: absolute; top: calc(100% + .35rem); left: 0; right: 0; z-index: 50;
  background: var(--uig-surface); border: 1px solid var(--uig-line-strong);
  border-radius: var(--bs-border-radius); box-shadow: var(--uig-shadow-2);
  max-height: 60vh; overflow: auto;
}
.qout a {
  display: block; padding: .5rem .7rem; text-decoration: none;
  color: var(--uig-text); border-bottom: 1px solid var(--uig-line);
}
.qout a:last-child { border-bottom: 0; }
.qout a:hover { background: var(--uig-surface-2); color: var(--uig-heading); }
.qout small { display: block; color: var(--uig-text-muted); font-size: .72rem; }
.top-actions { margin-left: auto; display: flex; align-items: center; gap: .4rem; }
.theme-btn { min-width: 38px; }

/* ── shell ──────────────────────────────────── */
.shell { display: flex; align-items: flex-start; }
.sidebar {
  position: sticky; top: var(--top-h); flex: 0 0 var(--side-w);
  width: var(--side-w); height: calc(100vh - var(--top-h));
  overflow-y: auto; border-right: 1px solid var(--uig-line);
  background: var(--uig-bg);
}
.side-inner { padding: 1rem .75rem 3rem; }
.side-group { margin-bottom: .15rem; }
.side-title {
  cursor: pointer; list-style: none;
  font-family: var(--uig-font-display); font-weight: 700;
  font-size: .78rem; letter-spacing: .12em; text-transform: uppercase;
  color: var(--uig-heading); padding: .45rem .5rem;
  display: flex; align-items: center; justify-content: space-between;
  border-radius: var(--bs-border-radius);
}
.side-title::-webkit-details-marker { display: none; }
.side-title::before {
  content: '›'; display: inline-block; margin-right: .4rem;
  color: var(--uig-text-muted); transition: transform .15s var(--uig-ease-out);
}
.side-group[open] > .side-title::before { transform: rotate(90deg); }
.side-title:hover { background: var(--uig-surface); }
.side-count { font-size: .68rem; color: var(--uig-text-muted); letter-spacing: 0; }
.side-items { margin: .1rem 0 .5rem; padding-left: .5rem; border-left: 1px solid var(--uig-line); }
.side-link {
  display: block; padding: .28rem .6rem; border-radius: var(--bs-border-radius-sm);
  color: var(--uig-text-dim); text-decoration: none; font-size: .875rem;
}
.side-link:hover { background: var(--uig-surface); color: var(--uig-heading); }
.side-link.is-here {
  color: var(--uig-heading); background: var(--uig-surface-2);
  box-shadow: inset 2px 0 0 var(--uig-red); font-weight: 600;
}
.side-link.is-off { color: var(--uig-text-muted); opacity: .5; cursor: default; }
.side-ext {
  display: block; margin-top: .5rem; padding: .5rem .6rem;
  border: 1px dashed var(--uig-line-strong); border-radius: var(--bs-border-radius);
  color: var(--uig-text-dim); text-decoration: none; font-size: .82rem; text-align: center;
}
.side-ext:hover { color: var(--uig-red); border-color: var(--uig-red); }

/* ── main ───────────────────────────────────── */
.main {
  flex: 1; min-width: 0; max-width: var(--doc-max);
  padding: 1.5rem 1.5rem 0; margin-inline: auto;
}
.crumbs {
  display: flex; gap: .45rem; align-items: center; flex-wrap: wrap;
  font-size: .78rem; color: var(--uig-text-muted); margin-bottom: 1.25rem;
}
.crumbs a { color: var(--uig-text-dim); text-decoration: none; }
.crumbs a:hover { color: var(--uig-red); }
.crumbs .here { color: var(--uig-heading); font-weight: 600; }

.lead { font-size: 1.12rem; color: var(--uig-text-soft); margin-bottom: 1.75rem; }
h1 {
  font-family: var(--uig-font-h1); font-weight: 900;
  letter-spacing: .02em; text-transform: uppercase;
  color: var(--uig-heading); margin: 0 0 .35rem;
}
h2 {
  font-family: var(--uig-font-display); font-weight: 700;
  letter-spacing: .05em; text-transform: uppercase;
  color: var(--uig-heading);
  margin: 2.75rem 0 .9rem; padding-bottom: .4rem;
  border-bottom: 1px solid var(--uig-line);
}
h3 {
  font-family: var(--uig-font-display); font-weight: 700; letter-spacing: .04em;
  color: var(--uig-heading); margin: 1.9rem 0 .6rem; font-size: 1.1rem;
}
h4 { font-family: var(--uig-font-display); color: var(--uig-text-soft); margin: 1.4rem 0 .4rem; font-size: .95rem; }
.doc-main p { margin-bottom: 1rem; }
.doc-list { margin: 0 0 1.1rem; padding-left: 1.25rem; }
.doc-list li { margin-bottom: .3rem; }
.doc-list li::marker { color: var(--uig-red); }
.doc-note {
  border-left: 2px solid var(--uig-red); background: var(--uig-surface);
  padding: .7rem 1rem; margin: 1.25rem 0; color: var(--uig-text-soft);
  border-radius: 0 var(--bs-border-radius) var(--bs-border-radius) 0;
}
/* link a una página que todavía no se escribió */
.dead-link { color: var(--uig-text-muted); cursor: default; text-decoration-style: dotted; }
code {
  font-family: 'Rajdhani', ui-monospace, monospace; font-weight: 600;
}
:not(pre) > code {
  font-size: .86em; padding: .1em .35em; border-radius: var(--bs-border-radius-sm);
}
.doc-pre {
  background: var(--uig-bg-deep); border: 1px solid var(--uig-line);
  border-radius: var(--bs-border-radius); padding: 1rem 1.1rem;
  font-size: .84rem; line-height: 1.55; overflow-x: auto; margin: 0 0 1.25rem;
}

/* ── ejemplos vivos ─────────────────────────── */
.ex { margin: 0 0 1.5rem; }
.ex-demo {
  padding: 1.25rem; border: 1px solid var(--uig-line);
  border-radius: var(--bs-border-radius); background: var(--uig-surface);
}
.ex-demo > :last-child { margin-bottom: 0; }
/* <link>/<script>/<style> de ejemplo: se muestran pero no se aplican */
.ex-stub {
  display: block; font-size: .78rem; line-height: 1.5; opacity: .7;
  color: var(--uig-text-dim); white-space: pre-wrap; word-break: break-all;
  padding: .2rem 0;
}
/* placeholder de imagen en un ejemplo */
.ex-img {
  display: flex; align-items: center; justify-content: center;
  min-height: 76px; padding: .75rem; text-align: center;
  border: 1px dashed var(--uig-line-strong); border-radius: var(--bs-border-radius);
  background: var(--uig-surface-2); color: var(--uig-text-muted);
  font-size: .78rem; font-family: 'Rajdhani', sans-serif; font-weight: 600;
}
.ex-code { margin-top: -1px; }
.ex-code > summary {
  cursor: pointer; list-style: none;
  font-family: var(--uig-font-display); font-weight: 700;
  font-size: .72rem; letter-spacing: .12em; text-transform: uppercase;
  color: var(--uig-text-muted);
  padding: .4rem .75rem; border: 1px solid var(--uig-line);
  border-radius: 0 0 var(--bs-border-radius) var(--bs-border-radius);
  background: var(--uig-surface-2);
}
.ex-code > summary::-webkit-details-marker { display: none; }
.ex-code > summary:hover { color: var(--uig-red); }
.ex-code[open] > summary { border-radius: 0; border-bottom-color: transparent; }
.ex-code pre {
  margin: 0; padding: 1rem 1.1rem; background: var(--uig-bg-deep);
  border: 1px solid var(--uig-line); border-radius: 0 0 var(--bs-border-radius) var(--bs-border-radius);
  font-size: .84rem; line-height: 1.55; overflow-x: auto; color: var(--uig-text);
}

/* ── tablas de la doc ───────────────────────── */
.table-wrap { overflow-x: auto; margin: 0 0 1.5rem; }
.doc-table { width: 100%; font-size: .87rem; }
.doc-table th {
  font-family: var(--uig-font-display); text-transform: uppercase;
  letter-spacing: .06em; font-size: .74rem; color: var(--uig-heading);
  padding: .5rem .6rem; border-bottom: 1px solid var(--uig-line-strong); white-space: nowrap;
}
.doc-table td { padding: .5rem .6rem; border-bottom: 1px solid var(--uig-line); vertical-align: top; }
.doc-table tr:last-child td { border-bottom: 0; }
.ta-right { text-align: right; } .ta-center { text-align: center; }

/* ── contents (índice generado) ──────────────────── */
.toc-sec { margin-bottom: 1.75rem; }
.toc-sec h2 { margin-top: 1.75rem; display: flex; align-items: baseline; gap: .6rem; }
.toc-n {
  font-family: var(--uig-font-data); font-size: .8rem; letter-spacing: 0;
  color: var(--uig-text-muted); text-transform: none;
}
.toc-sec ul { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: .3rem .4rem; }
.toc-sec li { margin: 0; }
.toc-sec li a, .toc-sec li.pending {
  display: inline-block; padding: .22rem .6rem; font-size: .84rem;
  border: 1px solid var(--uig-line); border-radius: var(--bs-border-radius);
  text-decoration: none; color: var(--uig-text-dim);
}
.toc-sec li a:hover { border-color: var(--uig-red); color: var(--uig-heading); }
.toc-sec li.pending { color: var(--uig-text-muted); opacity: .5; border-style: dashed; }

/* ── pager + footer ─────────────────────────── */
.pager {
  display: flex; justify-content: space-between; gap: 1rem;
  margin-top: 3rem; padding-top: 1.25rem; border-top: 1px solid var(--uig-line);
}
.pager a {
  text-decoration: none; padding: .55rem .85rem; min-width: 40%;
  border: 1px solid var(--uig-line); border-radius: var(--bs-border-radius);
  color: var(--uig-heading); font-weight: 600;
}
.pager a:hover { border-color: var(--uig-red); color: var(--uig-red); }
.pager small {
  display: block; font-family: var(--uig-font-display); font-weight: 400;
  font-size: .68rem; letter-spacing: .14em; text-transform: uppercase;
  color: var(--uig-text-muted); margin-bottom: .1rem;
}
.p-next { text-align: right; margin-left: auto; }
.docfoot {
  margin-top: 2.5rem; padding: 1.25rem 0 2.5rem;
  border-top: 1px solid var(--uig-line);
  font-size: .78rem; color: var(--uig-text-muted);
}
.docfoot p { margin: 0 0 .25rem; }

/* ── home ───────────────────────────────────── */
.hero { padding: 2.5rem 0 2rem; }
.hero h1 { font-size: 3rem; margin-bottom: .5rem; }
.hero .kicker {
  font-family: var(--uig-font-display); font-weight: 700;
  font-size: .74rem; letter-spacing: .2em; text-transform: uppercase;
  color: var(--uig-red); margin-bottom: .6rem;
}
.hero p.lead { max-width: 62ch; }
.hero-cta { display: flex; gap: .6rem; flex-wrap: wrap; margin-top: 1.5rem; }
.sec-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: .85rem; }
.sec-card {
  display: block; text-decoration: none; padding: 1rem 1.1rem;
  border: 1px solid var(--uig-line); border-radius: var(--bs-border-radius);
  background: var(--uig-surface); transition: transform .18s var(--uig-ease-out), border-color .18s;
}
.sec-card:hover { transform: var(--uig-lift); border-color: var(--uig-red); }
.sec-card h3 { margin: 0 0 .3rem; font-size: .95rem; text-transform: uppercase; letter-spacing: .08em; }
.sec-card p { margin: 0 0 .5rem; font-size: .82rem; color: var(--uig-text-muted); }
.sec-card .n { font-family: var(--uig-font-data); font-weight: 700; font-size: .8rem; color: var(--uig-red); }
.sec-card.is-empty { opacity: .55; cursor: default; }
.sec-card.is-empty:hover { transform: none; border-color: var(--uig-line); }

.scrim { position: fixed; inset: var(--top-h) 0 0; background: rgba(0,0,0,.5); z-index: 25; }

/* ── responsive ─────────────────────────────── */
@media (max-width: 991.98px) {
  .burger { display: inline-block; }
  .sidebar {
    position: fixed; top: var(--top-h); left: 0; z-index: 30;
    transform: translateX(-100%); transition: transform .22s var(--uig-ease-out);
  }
  .nav-open .sidebar { transform: none; box-shadow: var(--uig-shadow-3); }
  .main { padding-inline: 1.1rem; }
  .hero h1 { font-size: 2.25rem; }
}
@media (max-width: 575.98px) {
  .search { display: none; }
  .hero h1 { font-size: 1.9rem; }
  .pager { flex-direction: column; }
  .pager a { min-width: 0; }
}
@media print {
  .topbar, .sidebar, .pager, .scrim { display: none; }
  .main { max-width: none; }
}
`;