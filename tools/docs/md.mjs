/**
 * Mini Markdown → HTML para la documentación.
 *
 * Soporta: headings, párrafos, listas, tablas, blockquotes,
 * código inline, links, negrita y bloques cercados ```html
 * que se renderizan como ejemplo vivo (preview + código plegable).
 *
 * Dialecto pensado para escribir rápido, no para ser completo.
 */

const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Escribe `depth` niveles de heading. */
const headings = ['', 'h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * Un ejemplo vivo: el markup se ve arriba y su código, abajo.
 *
 * <link>, <script> y <style> no se emiten tal cual: dentro del <body>
 * el navegador los vuelve a aplicar de verdad, y un ejemplo con un
 * <link> a Bootstrap pisaría al framework que estamos documentando.
 * Se muestran como stub inerte.
 */
function inertPreview(markup) {
  return markup
    .replace(/<link\b[^>]*>/gi, (t) => `<code class="ex-stub">${esc(t)}</code>`)
    .replace(/<script\b[\s\S]*?<\/script>/gi, (t) => `<code class="ex-stub">${esc(t)}</code>`)
    .replace(/<style\b[\s\S]*?<\/style>/gi, (t) => `<code class="ex-stub">${esc(t)}</code>`)
    // las imágenes de ejemplo son rutas de relleno: se muestran como
    // recuadro con el alt, no como imágenes rotas
    .replace(/<img\b([^>]*?)>/gi, (_t, attrs) => {
      const alt = (attrs.match(/alt="([^"]*)"/) || [, ''])[1];
      const src = (attrs.match(/src="([^"]*)"/) || [, ''])[1];
      const label = alt || src || 'imagen';
      return `<span class="ex-img" role="img" aria-label="${esc(label)}">${esc(label)}</span>`;
    });
}

function example(markup, lang = 'html') {
  return (
    `<div class="ex">` +
    `<div class="ex-demo">${inertPreview(markup.trim())}</div>` +
    `<details class="ex-code">` +
    `<summary>Código</summary>` +
    `<pre><code class="lang-${lang}">${esc(markup.trim())}</code></pre>` +
    `</details>` +
    `</div>`
  );
}

/** Tabla pipe: | a | b |  con separador |---|---| */
function table(raw) {
  // separa celdas y normaliza
  const cells = (l) =>
    l
      .trim()
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((c) => c.trim());
  // alineación desde la fila separadora
  const align = cells(raw[1]).map((c) => {
    const s = c.trim();
    if (/^:-+:$/.test(s)) return 'center';
    if (/^-+:$/.test(s)) return 'right';
    return '';
  });
  const head = cells(raw[0])
    .map((c, k) => `<th${align[k] ? ` class="ta-${align[k]}"` : ''}>${inline(esc(c))}</th>`)
    .join('');
  const body = raw
    .slice(2)
    .map((l) => `<tr>${cells(l).map((c, k) => `<td${align[k] ? ` class="ta-${align[k]}"` : ''}>${inline(esc(c))}</td>`).join('')}</tr>`)
    .join('');
  return `<div class="table-wrap"><table class="doc-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

/** Inline: `code`, **negrita**, [texto](url). Se aplica sobre texto ya escapado. */
function inline(s) {
  return s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

/**
 * Convierte markdown a HTML.
 * @returns {{html: string, title: string|null, description: string}}
 */
export function render(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let title = null;
  let description = '';
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // --- párrafo (líneas en blanco = separador) ---
    if (!line.trim()) {
      i++;
      continue;
    }

    // --- bloque cercado → ejemplo vivo ---
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const lang = fence[1] || 'html';
      const buf = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) buf.push(lines[i++]);
      i++;
      const body = buf.join('\n');
      out.push(lang === 'html' ? example(body) : `<pre class="doc-pre"><code>${esc(body)}</code></pre>`);
      continue;
    }

    // --- heading ---
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const depth = h[1].length;
      // en un heading el código no se resalta: solo se le saca el backtick,
      // si no el <code> se come el fondo del título
      const text = h[2].trim().replace(/`([^`]+)`/g, '$1');
      if (depth === 1) {
        title = text;
      } else {
        out.push(`<${headings[depth - 1]} id="${slugify(text)}">${inline(esc(text))}</${headings[depth - 1]}>`);
      }
      i++;
      continue;
    }

    // --- lead: primera línea en cursiva tras el H1 ---
    const lead = line.match(/^>\s*(.*)$/);
    if (lead) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      description = buf.join(' ').trim();
      out.push(`<p class="lead">${inline(esc(description))}</p>`);
      continue;
    }

    // --- blockquote ---
    if (/^>\s/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote class="doc-note">${inline(esc(buf.join(' ')))}</blockquote>`);
      continue;
    }

    // --- tabla ---
    if (line.includes('|') && /^\s*\|?[\s:-]*\|[\s:|-]*$/.test(lines[i + 1] || '')) {
      const buf = [];
      while (i < lines.length && lines[i].includes('|')) buf.push(lines[i++]);
      out.push(table(buf));
      continue;
    }

    // --- listas ---
    const bullet = line.match(/^(\s*)([-*])\s+(.*)$/);
    const ordered = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (bullet || ordered) {
      const tag = bullet ? 'ul' : 'ol';
      const items = [];
      while (i < lines.length) {
        const m = bullet
          ? lines[i].match(/^\s*[-*]\s+(.*)$/)
          : lines[i].match(/^\s*\d+\.\s+(.*)$/);
        if (!m) break;
        items.push(`<li>${inline(esc(m[1]))}</li>`);
        i++;
      }
      out.push(`<${tag} class="doc-list">${items.join('')}</${tag}>`);
      continue;
    }

    // --- párrafo normal ---
    const buf = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6}\s|```|>|\s*[-*]\s|\s*\d+\.\s)/.test(lines[i])
    ) {
      buf.push(lines[i++]);
    }
    out.push(`<p>${inline(esc(buf.join(' ')))}</p>`);
  }

  return { html: out.join('\n'), title, description };
}

export function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}