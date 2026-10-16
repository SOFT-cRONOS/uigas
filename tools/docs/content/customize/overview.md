# Overview

> UiGas no tiene opciones de build. No hay `variables.scss`, ni mixins de tema, ni configuración. Hay una cosa: tokens.

## Qué es configurable

**Los tokens, y nada más.**

```css
[data-bs-theme="dark"] {
  --uig-red-slab: #e10600;
}
```

Todo lo demás está fijo. No existe:

- un `_variables.scss` con opciones de Sass
- un `@mixin theme-claro` que permita construir
- configuración de nada

## Por qué

Es la consecuencia directa de que los tokens sean **custom properties** en vez de variables Sass. Ver [Sass](/customize/sass.html) para el razonamiento completo, pero el resumen es:

| | Variable Sass | Custom property |
|---|---|---|
| Cuándo se resuelve | en build | en runtime |
| Cambiar de tema | recompilar dos archivos | `data-bs-theme` |
| Configurable por el consumidor | sí, con `!default` | sí, redefiniendo |

UiGas eligió la segunda fila. Gana la conmutación en runtime de tema —que es el objetivo— y pierde el punto de extensión de Sass.

## Customizar

### Los tokens del framework

```css
/* después de UiGas */
:root,
[data-bs-theme="dark"] {
  --uig-red:      #ff4400;
  --uig-red-slab: #e14400;
}

[data-bs-theme="light"] {
  --uig-red:   #c24000;
  --uig-red-lo: #993000;
}
```

Define la marca **una sola vez**, en el bloque que comparte los dos temas. Si un token aparece en ambos bloques, el claro gana por orden y deja de ser marca.

### Tus propias variables

```css
:root {
  --mi-radio: 6px;
  --mi-gap:   1rem;
}
```

### Los tokens de Bootstrap

UiGas redefine muchos `--bs-*`, así que cambiarlos después afecta al framework:

```css
[data-bs-theme="dark"] {
  --bs-border-radius-lg: 6px;
  --bs-body-font-family: 'Barlow', sans-serif;
}
```

> El orden importa:UiGas redefine los `--bs-*` de marca **y** los de capa semántica en el mismo bloque, **juntos**. Cambiar `--bs-border-radius-lg` en tu CSS después de UiGas funciona; cambiarlo **antes** no, porque UiGas lo pisa. Always UiGas primero.

## Lo que no hay

### Sass

```scss
$primary: #e10600;      // no existe
$enable-shadows: false; // no existe
```

Cero variables Sass en el código, cero mixins, cero funciones.

### Temas custom

```scss
@include theme("brand-x");   // no existe
```

Un tema nuevo son tokens nuevos en un bloque `[data-bs-theme="x"]`. Funciona, pero es escribir CSS a mano, no configurar.

### Componentes custom

No hay un punto de extensión. Un componente nuevo es un parcial nuevo en tu proyecto:

```scss
// tu-componente.scss
.mi-tarjeta {
  background: var(--uig-surface);
  border: 1px solid var(--uig-line);
  border-radius: var(--bs-border-radius-lg);
  color: var(--uig-text);
}
```

Por tokens, se adapta al tema sin trabajo extra.

## La extensión real: los tokens

La documentación de [Componentes UiGas](/extend/components.html) muestra las 27 clases propias del framework. Ese es el patrón para extender: **un componente que consume tokens, sin literales**.

```scss
/* el mismo componente con tu marca */
.mi-tarjeta {
  background: var(--mi-superficie, var(--uig-surface));
  border-color: var(--mi-borde, var(--uig-line));
}
```

Con eso, redefinir `--mi-superficie` cambia solo tu componente y UiGas sigue intacto.

## Qué sigue

- [Variables CSS](/customize/css-variables.html) — el mapa completo
- [Sass](/customize/sass.html)
- [Componentes UiGas](/extend/components.html) — el patrón de extensión