# Herramientas de build

> UiGas se escribe en SCSS con dart-sass. Si solo vas a consumir el CSS compilado, esta página no hace falta.

El repositorio expone el SCSS como fuente y el CSS como artefacto. Para consumirlo no hace falta nada de esto; para modificarlo sí.

## Estructura

El framework son 29 parciales y una entrada. El orden de los `@use` **es** el orden de cascada: por eso los comentarios numerados van en el `@import`.

```scss
// src/scss/style.scss
@use "fonts";        //          · @font-face Korataki (logo y marca)
@use "tokens";       // 1  + 1b · custom properties (dark + light)
@use "base";         // 2       · base, tipografía, links
@use "buttons";      // 3
...
@use "theme-light";  // 40      · overrides del tema claro (al final)
```

Un parcial por componente, nombrado por lo que define. Si agregás uno, agregalo en `style.scss` en la posición que le corresponde por cascada.

## Scripts

```bash
npm install        # instala dart-sass
npm run build      # → dist/uigas.min.css (comprimido, publicar)
npm run build:dev  # → dist/uigas.css (expandido, debug)
npm run watch      # recompila el minificado al guardar
```

## Los tokens son custom properties, no variables SCSS

Esto es lo más importante de entender antes de tocar `_tokens.scss`.

Los valores de marca y de capa semántica viven como **custom properties CSS**, no como variables de Sass:

```scss
// así se declara
[data-bs-theme="light"] {
  --uig-bg: #dcdde2;
  --uig-surface: #f0f0f3;
}
```

La razón es práctica: los tokens son el mecanismo de conmutación de tema en runtime. `data-bs-theme="light"` en `<html>` reescribe la capa semántica y todos los componentes se adaptan solos, sin recompilar y sin una sola regla extra por componente.

Si los fueran variables SCSS, el tema quedaría fijo en build y habría que generar dos archivos.

## Agregar un valor a la marca

La paleta de marca no cambia entre temas. Si agregás un tono, va en el bloque `:root, [data-bs-theme="dark"]`, que es la fuente única para ambos:

```scss
:root,
[data-bs-theme="dark"] {
  /* --- Marca (idéntica en ambos temas) --- */
  --uig-red-slab: #e10600;
  --mi-token:    #valor;
}
```

Y consumilo siempre por variable, nunca con el valor literal:

```scss
.bloque {
  color: var(--mi-token);   // ✅ se adapta al tema
}
```

## Agregar un valor semántico

Si el valor depende del tema, va en los dos bloques: el de marca y el de tema claro.

```scss
/* en el bloque dark */
--mi-estado: #ff4d44;

/* en el bloque light: el versante oscuro del mismo tono */
[data-bs-theme="light"] {
  --mi-estado: #b30500;
}
```

No es un detalle estético. Sobre la base clara, `#ff4d44` mide 2.79:1 de contraste: ilegible. Sobre base oscura el mismo valor mide bien. Por eso cada acento tiene dos versiones y la de claro siempre es la más oscura de su familia.

## Ajustes del tema claro

Lo que no se resuelve con tokens vive en `_theme-light.scss`, al final del `@use`. Ahí van las correcciones de componentes que con tokens no alcanzan — por ejemplo, reescribir los botones outline, cuyo color de texto es el color plano de la familia.

El orden importa: `_theme-light.scss` va **último** a propósito, para que sus selectores `[data-bs-theme="light"]` ganan sobre las reglas base de igual especificidad.

## Verificar el build

`dist/` se versiona porque es lo que sirve el CDN. Después de tocar SCSS:

```bash
npm run build && npm run build:dev
git add dist/ && git commit
```

El build es reproducible: dos corridas seguidas dan archivos idénticos. Si no, es que algo se está generando en orden no determinista.

## Estructura de salida

| Archivo | Tamaño | Uso |
|---|---|---|
| `dist/uigas.min.css` | ~50 KB | producción, CDN |
| `dist/uigas.css` | ~72 KB | debug: leer reglas, inspección |

## Qué sigue

- [Variables CSS](/customize/css-variables.html) — el mapa completo de tokens
- [Color](/customize/color.html) — la rampa de marca