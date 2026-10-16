# Color y fondo

> `.bg-*` pone superficies; `.text-*` pone color de texto. UiGas redefine los dos para que la página entera siga al tema con una sola clase.

## Superficies del cuerpo

```html
<div class="bg-body p-3">bg-body</div>
<div class="bg-body-secondary p-3">bg-body-secondary</div>
<div class="bg-body-tertiary p-3">bg-body-tertiary</div>
```

Estas tres son las que importan: forman la cadena de superficies del tema y están alineadas a los tokens.

| Clase | Token | Oscuro | Claro |
|---|---|---|---|
| `.bg-body` | `--uig-bg` | `#141414` | `#dcdde2` |
| `.bg-body-secondary` | `--uig-surface` | `#111111` | `#f0f0f3` |
| `.bg-body-tertiary` | `--uig-surface-2` | `#1a1a1a` | `#e6e7eb` |

> Es la relación correcta: **una superficie elevada es más clara que el fondo en oscuro y más clara también en claro**. Los tres valores aumentan monotonamente en los dos temas. Por eso la profundidad no depende de la sombra sino del salto de valor.
>
> El nombre viene de Bootstrap, donde `bg-body-secondary` no existía: aquí UiGas lo usa como el peldaño intermedio de la propia cadena. Es la manera de decir "esto es una superficie, no la página".

## Rellenos de color

```html
<div class="bg-primary text-white p-3">primary</div>
<div class="bg-success text-white p-3">success</div>
<div class="bg-warning text-dark p-3">warning</div>
```

> `bg-success`, `bg-warning` y `bg-info` usan los rellenos planos (`#22c55e`, `#f59e0b`, `#38bdf8`). Con texto blanco dan 2.14:1, 2.10:1 y 1.90:1 — **fallan AA en los dos temas**. Con `text-dark` el contraste mejora mucho: `#2a2a2a` sobre `#22c55e` da 5.4:1.
>
> Para un bloque de estado, preferí `text-bg-success` y revisá el par, o usá [badges soft](/components/badges.html), que ya resuelven el problema con el texto en la versión oscura.

## Especiales

```html
<div class="bg-light p-3">bg-light</div>
<div class="bg-dark p-3 text-white">bg-dark</div>
<div class="bg-black p-3 text-white">bg-black</div>
<div class="bg-white p-3">bg-white</div>
<div class="bg-transparent p-3">bg-transparent</div>
```

> `.bg-dark` es el **grid de pista** del brandbook: líneas finas paralelas inclinadas 105° con tinte rojo al 5.5% cada 34px, sobre un fondo `#0c0c0c`. No es "un fondo oscuro": es un elemento estructural de la identidad, y es el único lugar del framework con un patrón.
>
> En tema claro `.bg-dark` sigue siendo oscuro — es correcto: es un bloque invertido a propósito, como `text-bg-dark`. Si lo usás junto con texto, `text-white` es obligatorio.

## `background-color` con opacidad

UiGas no define utilidades de opacidad de fondo. Bootstrap tampoco las tiene para `background-color`; usa `bg-opacity` vía variable:

```html
<div class="text-bg-dark">Fondo sólido</div>
```

Para un tinte propio, CSS:

```html
<style>
  .bg-tint-red { background-color: rgba(249, 33, 33, 0.08); }
</style>
```

Es el mismo valor que usa `.list-group-item-action` en hover.

## Fondos y superficies: cuándo cada uno

| Quiero | Uso |
|---|---|
| La página | `bg-body` |
| Una card, un panel, un menú | `bg-body-secondary` |
| Hover, addon de input, campo deshabilitado | `bg-body-tertiary` |
| Un bloque de marca | `bg-primary` |
| Un bloque invertido | `bg-dark` |

> La tentación es usar `bg-secondary` para "un gris". `.bg-secondary` apunta a `--uig-surface-2`, que es exactamente el mismo valor que `.bg-body-tertiary`. Los dos nombres existen y significan lo mismo: usá `bg-body-tertiary`, que al menos dice qué nivel de la cadena estás usando.

## Accesibilidad

- Un fondo de color **arrastra** el color del texto. `bg-warning` con texto blanco es ilegible: el texto por defecto de un `div` es `--uig-text`, que en oscuro es claro sobre ámbar claro.
- Toda superficie necesita contraste de borde si va a quedar junto a otra. `--uig-line` contra `--uig-surface` da 1.4:1: es un hairline de guía visual, no un límite de lectura. Para separar dos superficies visibles, sumá una sombra o un borde con más contraste.
- `background-image` con gradientes decorativos está desaconsejado por el brandbook. `.bg-dark` es la excepción controlada, y es geométrica, no decorativa.

## Qué sigue

- [Colores](/utilities/colors.html)
- [Bordes](/utilities/borders.html)
- [Color](/customize/color.html) — la rampa completa