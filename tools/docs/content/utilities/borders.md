# Bordes

> `.border-*` cambia el color del borde, no el grosor. El ancho y el estilo siguen siendo de Bootstrap.

## Uso

```html
<div class="border p-3 mb-2">border</div>
<div class="border border-primary p-3 mb-2">border-primary</div>
<div class="border border-top-0 p-3">border-top-0</div>
```

## Colores

```html
<div class="d-flex flex-wrap gap-2">
  <div class="border border-primary p-2">primary</div>
  <div class="border border-success p-2">success</div>
  <div class="border border-danger p-2">danger</div>
  <div class="border border-warning p-2">warning</div>
  <div class="border border-info p-2">info</div>
  <div class="border border-light p-2">light</div>
  <div class="border border-dark p-2">dark</div>
</div>
```

## Opacidad

```html
<div class="border border-success border-opacity-25 p-2">25%</div>
<div class="border border-success border-opacity-50 p-2">50%</div>
<div class="border border-success border-opacity-75 p-2">75%</div>
<div class="border border-success border-opacity-100 p-2">100%</div>
```

`border-opacity-*` es de Bootstrap y funciona porque UiGas escribe los bordes de color con `rgba(..., var(--bs-border-opacity))`.

> `.border-primary` fija `--bs-border-opacity: 1` explícitamente; los demás usan `var(--bs-border-opacity, 1)`. El resultado es el mismo, pero la diferencia se nota si heredás la variable de un padre.

## UiGas

```scss
.border        { border-color: var(--uig-line)        !important; }
.border-light  { border-color: var(--uig-line-strong) !important; }
.border-dark   { border-color: var(--uig-line)        !important; }
.border-white  { border-color: rgba(255,255,255,.15) !important; }
```

> `border-light` y `border-dark` **no son blanco y negro**: los dos reescriben el nombre para que apunten a la línea del tema. Es una decisión deliberada — en un framework con dos temas, `border-light` que signifique "blanco" es una trampa garantizada. Con UiGas los dos significan "línea".
>
> `border-white` es la excepción: es un blanco translúcido al 15%, pensado para separar algo sobre superficie oscura. En tema claro queda casi invisible.

## Los bordes de acento

```html
<div class="border border-danger p-2">rgba(249, 33, 33, opacidad)</div>
```

Los bordes de color de UiGas usan el tono **plano** de cada familia, no la versión oscura de claro:

| Clase | Color | Sobre superficie clara |
|---|---|---|
| `.border-primary` | `rgba(249,33,33, ·)` | **2.9:1** |
| `.border-success` | `rgba(34,197,94, ·)` | 2.0:1 |
| `.border-warning` | `rgba(245,158,11, ·)` | 1.9:1 |
| `.border-info` | `rgba(56,189,248, ·)` | 1.9:1 |

> La WCAG pide **3:1** para el borde de un componente que hay que identificar (un campo de formulario, el foco de un control). `.border-primary` queda en 2.9:1 — justo por debajo. Los otros tres no llegan.
>
> `_theme-light.scss` ya reescribió las [alertas](/components/alerts.html), los [badges](/components/badges.html), los [botones outline](/components/buttons.html) y el [texto de acento](/utilities/colors.html) con el mismo criterio. **Los bordes quedaron fuera de esa pasada.** Es el siguiente candidato natural.

## Uso correcto

- Un borde de acento **no reemplaza** el estado por sí solo: `.is-invalid` pone borde de color *y* mensaje.
- Para separar dos superficies se usa `--uig-line` (1.4:1), no un color de acento. El borde de acento significa algo.
- `border-0` sobre el lado que toca a otra card: dos bordes juntos se ven como uno de 2px.

## Qué sigue

- [Background](/utilities/background.html)
- [Colores](/utilities/colors.html)
- [Focus ring](/helpers/focus-ring.html)