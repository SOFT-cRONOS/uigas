# Optimizar

> 50 KB minificado. No hay CDN con purga por subpath: son dos archivos, uno para producción y otro para debug.

## Los dos artefactos

| Archivo | Tamaño | Uso |
|---|---|---|
| `dist/uigas.min.css` | **50.451 B** | producción, CDN |
| `dist/uigas.css` | 71.859 B | debug: leer reglas, inspección |

Se generan con:

```bash
npm run build      # minificado, compressed
npm run build:dev  # expandido
```

## Lo que incluye y lo que no

UiGas es **una capa de override**, no un framework completo. Eso tiene una consecuencia práctica:

> Los 50 KB no te dan grid, ni utilidades de layout, ni reboot. Necesitás Bootstrap aparte (~230 KB minificado), así que el total real del sitio es **Bootstrap + UiGas**, no 50 KB.

El bundle completo no es más chico que el de Bootstrap solo. Lo que UiGas agrega son 50 KB que reemplazan la capa de valores por defecto. La ganancia real depende de cuánta capa visual de Bootstrap dejes de mantener.

## Purgar

No hay build con purga: el CSS es un artefacto único, con todo dentro. Las tres vías reales:

### 1. No usar clases

La forma más simple y la más efectiva. El CSS pesa lo que pese en disco, pero solo descarga el navegador lo que **usa el usuario** cuando lo servís por HTTP con compresión.

```html
<!-- en vez de importar todo -->
<link rel="stylesheet" href="/assets/uigas.css">
```

Con gzip o brotli, 71 KB de CSS bajan a ~12 KB. El minificado a ~8 KB.

### 2. PostCSS con purga

```js
// postcss.config.js
module.exports = {
  plugins: {
    purgecss: require('@fullhuman/postcss-purgecss'),
  },
};
```

```js
purgecss({
  content: ['./src/**/*.html', './src/**/*.js'],
  safelist: [/^data-bs-/, /^modal/, /^offcanvas/, /^tooltip/, /^popover/, /^carousel/, /^collapse/],
});
```

> **El `safelist` no es opcional.** Los componentes de Bootstrap aparecen y desaparecen por JS: un modal, un offcanvas o un tooltip pueden existir en el HTML solo después de una acción. Si la purga corre sobre el HTML estático, se los lleva. Por eso todo lo que empieza con `data-bs-` tiene que sobrevivir.
>
> `.show` y `.collapsing` tienen el mismo problema: los añade el JS en runtime.

### 3. CSS modular

Partiendo del SCSS:

```scss
// tu-proyecto.scss
@use "uigas/src/scss/tokens";
@use "uigas/src/scss/buttons";
@use "uigas/src/scss/cards";
```

Cada parcial es independiente y el orden de `@use` es el orden de cascada, así que esto funciona sin cambios.

> La vantaja: no estás usando `style.scss`, estás usando el framework como biblioteca de parciales. El resultado **no es byte-idéntico** a `uigas.min.css` — es un CSS distinto con el mismo aspecto en los componentes incluidos. Verificalo antes de asumir que son equivalentes.

## Compresión

El CSS ya tiene mucho `rgba()` y custom properties: comprime bien.

```bash
gzip -9 -k dist/uigas.min.css    # ~8 KB
brotli -q 11 dist/uigas.min.css   # ~7 KB
```

## Lo que no se puede quitar

- **Los tokens.** Son la capa semántica completa. Sacar uno rompe lo que lo consuma.
- **Los dos bloques de tema.** Sin `[data-bs-theme="light"]` no hay tema claro, y sin `:root, [data-bs-theme="dark"]` no hay nada.
- **`_theme-light.scss`.** Los overrides viven al final por una razón de cascada: si se purgan, el tema claro deja de funcionar sin error visible. Fallo silencioso.

## Lo repetido que se podría reducir

El SCSS tiene **cero abstracción**: ni mixins, ni `@each`, ni funciones. Concretamente:

| Repetición | Cantidad |
|---|---|
| familias `.btn-*` | 26 selectores casi idénticos |
| `rgba(249, 33, 33, …)` | 54 apariciones |
| `.bg-*` / `.text-bg-*` | 20 |
| `.alert-*` | 10 |
| `.badge-soft-*` | 8 |

Un `@each` sobre las familias de color eliminaría la mayor parte de eso. **No lo hice, y es discutible:**

- A favor: 26 bloques que solo cambian 8 valores son el caso de uso exacto de un `@each`.
- En contra: cada familia tiene sus estados de hover y activo propios, no un patrón uniforme. El `@each` terminaría recibiendo 8 argumentos por familia, más ilegible que los 8 selectores que reemplaza.

> El impacto en tamaño sería de unos pocos cientos de bytes después de la minificación. **No es un problema de performance; es una de legibilidad del código fuente.** Decidilo mirando `_buttons.scss`: si los 26 selectores te molestan al leerlo, es hora del `@each`.

## Qué sigue

- [Sass](/customize/sass.html)
- [API de utilidades](/utilities/api.html)
- [Componentes](/customize/components.html)