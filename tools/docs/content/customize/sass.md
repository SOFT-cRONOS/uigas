# Sass

> La fuente SCSS son 28 parciales y cero abstracción. No hay variables Sass, ni mixins, ni funciones. Todo el sistema vive en custom properties.

## Estructura

```scss
// src/scss/style.scss
@use "fonts";        //          · @font-face Korataki (logo y marca)
@use "tokens";       // 1  + 1b · custom properties (dark + light)
@use "base";         // 2       · base, tipografía, links
@use "buttons";      // 3
...
@use "theme-light";  // 40      · overrides del tema claro (al final)
```

El orden de los `@use` **es** el orden de cascada. Los comentarios numerados del encabezado son los de la estructura original del framework: cada parcial corresponde a una sección.

## Cero variables Sass

```bash
$ grep -c '^\$' src/scss/*.scss | grep -v ':0' | wc -l
0
```

No hay una sola variable `$` en el código. La razón ya la conocés: los tokens son el mecanismo de conmutación de tema en runtime.

| | Variable Sass | Custom property |
|---|---|---|
| Cuándo se resuelve | en build | en runtime |
| Cambiar un tema | recompilar | `data-bs-theme` |
| Un solo archivo para dos temas | no | sí |
| Accesible desde JS | no | sí |

Si fueran variables Sass, el tema claro y el oscuro serían dos builds distintos y UiGas no podría conmutar en la página.

> Consecuencia: **Sass no es necesario para consumir UiGas**, solo para modificarlo. No hay "variables que sobreescribir", no hay `!default`, no hay mixins. Si esperabas una API tipo Bootstrap `_variables.scss`, no existe.

## Cero abstracción

```bash
$ grep -c "@mixin\|@each\|@function\|@include" src/scss/*.scss | grep -v ':0' | wc -l
0
```

Tampoco hay mixins ni funciones. Cada parcial es CSS plano con su cabecera de sección.

Con 26 familias de `.btn-*` y 10 de `.bg-*` esto habría pedido un `@each`. Está escrito a mano, y es una decisión discutible:

- **A favor:** cada familia tiene sus propios estados de hover y activo, no un patrón uniforme. Un `@each` tendría que recibir 8 valores por familia y terminar siendo ilegible.
- **En contra:** 26 selectores casi idénticos son exactamente el caso de uso de un `@each`. La repetición es real.

> Ver [Optimizar](/customize/optimize.html) para el impacto en el tamaño del bundle.

## Los dos bloques de tokens

```scss
/* fuente única: marca + semántica oscura */
:root,
[data-bs-theme="dark"] {
  --uig-red-slab: #e10600;
  --uig-bg:       #141414;
}

/* solo lo que depende del tema */
[data-bs-theme="light"] {
  --uig-bg:       #dcdde2;
}
```

La marca va **solo** en el primer bloque. Si un token aparece en los dos, el claro gana por estar después — lo que hace imposible usarlo como marca.

## `_theme-light.scss` va último

```scss
@use "utilities";    // 24–36
@use "layout";       // 37
@use "sector";       // 39
@use "theme-light";  // 40      · al final, a propósito
```

Los overrides de tema claro son selectores `[data-bs-theme="light"]` con la misma especificidad que las reglas base. Ganar por orden es lo único que los separa — si se moviera `@use "theme-light"` al principio, cada corrección del tema claro quedaría pisada por la regla base.

## Scripts

```bash
npm install
npm run build      # dist/uigas.min.css (comprimido)
npm run build:dev  # dist/uigas.css (expandido)
npm run watch      # recompila el minificado
```

## Modificar sin romper el orden

- Un parcial nuevo se agrega en `style.scss` **en la posición que le corresponde por cascada**, no al final.
- Un selector `[data-bs-theme="light"]` nuevo va en `_theme-light.scss`, nunca en el parcial de su componente.
- Un token nuevo de marca va en el bloque `:root, [data-bs-theme="dark"]`; uno semántico, en los dos.

## Verificar el build

```bash
npm run build && npm run build:dev
git add dist/
```

El build es **reproducible**: dos corridas seguidas dan archivos idénticos. Si no lo es, algo se está generando en orden no determinista.

## Qué sigue

- [Variables CSS](/customize/css-variables.html) — el mapa de tokens
- [Componentes](/customize/components.html)
- [Optimizar](/customize/optimize.html)