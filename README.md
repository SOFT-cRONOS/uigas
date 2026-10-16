# UiGas — CSS Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-blue)](https://cdn.jsdelivr.net/gh/softcronos/ui_gas@latest/dist/uigas.min.css)

Framework CSS para temas dark sport minimal basado en el Brandbook CVR 2027 (Club Vuelta Rápida). Override de Bootstrap 5 con sistema de_tokens, cuatro voces tipográficas y componentes de simulación.

## Instalación

### CDN (recomendado)

```html
<!-- Versión más reciente -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/softcronos/ui_gas@latest/dist/uigas.min.css">

<!-- Versión fija (para producción) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/softcronos/ui_gas@v1.0.0/dist/uigas.min.css">
```

> Las fuentes UiGas (Barlow Condensed, Barlow, Rajdhani) se cargan aparte con el `<link>` de Google Fonts — ver la sección [Uso](#uso).

### Local

Copia `dist/uigas.min.css` a tu proyecto e inclúyelo **después** de Bootstrap 5, junto con las fuentes UiGas:

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/uigas.min.css">
```

## Uso

El framework se enlaza **después** de Bootstrap 5, y las fuentes UiGas van en el `<head>`:

```html
<!-- 1 · Fuentes UiGas (Barlow Condensed · Barlow · Rajdhani) -->
<link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- 2 · Bootstrap 5 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- 3 · UiGas — SIEMPRE después de Bootstrap -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/softcronos/ui_gas@latest/dist/uigas.min.css">

<!-- 4 · Bootstrap JS — modal, dropdown, carousel, accordion, offcanvas, toast, tooltip -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

### Requisitos

UiGas es una **capa de override visual**, no un reemplazo. Necesita Bootstrap 5 presente:

- **Bootstrap CSS** — UiGas no incluye reboot, grid (`.row`, `.col-*`) ni utilidades de layout. Viene **siempre después** de `bootstrap.min.css` porque redefine los custom properties `--bs-*` y las variables de cada componente con la misma especificidad.
- **Bootstrap JS** — los componentes interactivos (modal, dropdown, carousel, accordion, offcanvas, toast, tooltip) dependen de `bootstrap.bundle.min.js`. UiGas es solo CSS y no lo incluye.
- **Las fuentes UiGas** — `<link>` de Google Fonts en el `<head>`.

> Korataki (solo logo y menciones de marca) no vive en Google Fonts: se resuelve desde la fuente instalada en el sistema vía `@font-face` + `local()`, con Barlow Condensed 900 itálica como fallback. Los H1 y display usan Barlow Condensed.

## Estructura del repositorio

```
UI_GAS/
├── src/scss/              # Fuente SCSS (parciales por componente)
│   ├── style.scss         # Entrada: importa los parciales en orden de cascada
│   ├── _fonts.scss        # @font-face Korataki (logo y marca)
│   ├── _tokens.scss       # Custom properties (dark + light)
│   ├── _base.scss         # Base y tipografía
│   ├── _buttons.scss … _theme-light.scss
├── dist/
│   ├── uigas.css          # Build expandido (dev / debug)
│   └── uigas.min.css      # Build minificado (publicar)
├── doc/
│   ├── index.html         # Home de la documentación (generada)
│   ├── showcase.html      # Showcase de componentes
│   ├── assets/docs.css    # Chrome de la doc (generada)
│   ├── getting-started/ … extend/   # 89 páginas (generadas)
│   ├── banners.html · cards.html · forms.html
├── tools/docs/
│   ├── nav.mjs            # Árbol de secciones y páginas
│   ├── md.mjs             # Markdown → HTML
│   ├── layout.mjs         # Chrome compartido
│   ├── derived.mjs        # Páginas que UiGas no redefine
│   ├── build.mjs          # Generador
│   ├── check-links.mjs    # Verificador de enlaces
│   └── content/**.md      # Una página = un .md
├── brandbook-cvr_2027.html     # Brandbook CVR 2027 (fuente de verdad de marca)
├── uigas-design-reference.txt  # Referencia rápida de tokens
├── package.json           # Scripts de build (dart-sass)
├── LICENSE                # MIT
└── README.md
```

## Desarrollo

Requiere Node.js (probado con v20).

```bash
npm install          # instala dart-sass
npm run watch        # recompila dist/uigas.min.css al guardar
```

- Editá los parciales en `src/scss/` (cada componente en su `_*.scss`).
- `npm run build` → `dist/uigas.min.css` (comprimido, publicar).
- `npm run build:dev` → `dist/uigas.css` (expandido, debug).
- Probá localmente con los archivos en `doc/`.

### Documentación

La doc se **genera**: se editan los `.md` de `tools/docs/content/` y se compila.

```bash
npm run docs          # genera doc/**/*.html + doc/assets/docs.css
npm run docs:check    # verifica que no haya enlaces rotos
npm run docs:watch    # recompila al guardar
```

- Una página = un `.md`. El chrome (sidebar, buscador, tema, prev/next) sale de `layout.mjs`.
- Las clases que UiGas **no** redefine (grid, utilidades, helpers) se documentan como `DERIVED` en `derived.mjs`: breve y con enlace a Bootstrap.
- El sidebar y los links internos enumeran las 89 páginas siempre; las que faltan salen apagadas y se vuelven enlaces solas al escribirlas. Por eso `npm run docs:check` da 0 rotas en cualquier estado del proyecto.
- `dist/` se versiona porque es lo que sirve el CDN. Si editás `src/scss/`, reconstruí y commiteá `dist/` en el mismo commit.
- Al publicar un cambio, bump + tag:

  ```bash
  npm run build && npm run build:dev   # regenerá dist/
  npm version patch                    # 1.0.0 → 1.0.1, actualiza package.json
  git add -A && git commit -m "..."
  git push --follow-tags               # el tag es lo que publica en jsDelivr
  ```

- `dist/` se versiona en el repo: es lo que sirve el CDN. Si editás `src/scss/`, reconstruí y commiteá `dist/` en el mismo commit.
- `.agents/` y `skills-lock.json` están en `.gitignore` — no se publican.

## Licencia

MIT — © 2026 softcronos.com.ar
