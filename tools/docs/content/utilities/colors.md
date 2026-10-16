# Colores

> Los acentos de estado tienen dos versiones: la plana para oscuro y la oscura para claro. Esta página es el mapa.

## Texto de acento

```html
<div class="d-flex flex-wrap gap-3">
  <span class="text-primary">primary</span>
  <span class="text-secondary">secondary</span>
  <span class="text-success">success</span>
  <span class="text-danger">danger</span>
  <span class="text-warning">warning</span>
  <span class="text-info">info</span>
</div>
```

## Texto del cuerpo

```html
<p class="text-body">Body</p>
<p class="text-body-secondary">Body secundario</p>
<p class="text-body-emphasis">Body enfático</p>
<p class="text-muted">Muted</p>
```

Cuatro niveles de énfasis, de `--uig-heading` a `--uig-text-muted`. El muted es el único que roza el mínimo: 4.75:1 en oscuro, **5:1** en claro. Para texto que no sea accesorio, preferí `text-body-secondary`.

## La tabla de acentos

| Clase | Oscuro | Claro | Sobre superficie clara |
|---|---|---|---|
| `text-primary` | `#ff4d44` | `#b30500` | 6.28:1 |
| `text-danger` | `#ff4d44` | `#b30500` | 6.28:1 |
| `text-success` | `#22c55e` | **`#166534`** | 6.27:1 |
| `text-warning` | `#f59e0b` | **`#92400e`** | 6.23:1 |
| `text-info` | `#38bdf8` | **`#0369a1`** | 5.22:1 |
| `text-secondary` | `a1a1aa` → `--uig-text-dim` | `#52525b` | 7.1:1 |
| `text-light` | `--uig-text-soft` | `#3f3f46` | 9.18:1 |
| `text-dark` | `--uig-text` | `#2a2a2a` | 12.2:1 |
| `text-muted` | `#7d8593` | `#61646d` | 5.02:1 |

> Las tres filas en negrita son la corrección que hizo falta en `_theme-light.scss`. `text-success`, `text-warning` y `text-info` estaban escritos con los tonos planos en `_utilities.scss` — los mismos que funcionan sobre fondo oscuro. Sobre la superficie clara quedaban en **1.58:1 a 2.00:1**: prácticamente invisibles.
>
> Es el mismo defecto que aparece en [alertas](/components/alerts.html), [badges](/components/badges.html), [botones outline](/components/buttons.html) y [validación](/forms/validation.html). La regla que lo evita: **un acento plano nunca se usa como texto sobre superficie clara.**

## `.text-bg-*`

Color de fondo con el texto del grupo semántico:

```html
<span class="text-bg-primary">Principal</span>
<span class="text-bg-success">Confirmado</span>
<span class="text-bg-dark">Oscuro</span>
```

> En tema claro, `text-bg-secondary` y `text-bg-light` están redefinidos con `#e4e4e7` de fondo y texto `#141414`/`#3f3f46`: sobre el fondo oscuro que pone Bootstrap, el texto blanco no se leía. `text-bg-dark` mantiene el invertido (`#141414` con texto `#f4f4f5`), que es correcto en cualquier tema.
>
> Los otros cinco `text-bg-*` (primary, success, danger, warning, info) usan en claro los rellenos planos con texto blanco. `#22c55e` con blanco da **2.14:1** — el mismo defecto de [la barra de progreso](/components/progress.html). Es un pendiente conocido.

## Blancos y negros

```html
<p class="text-white">Blanco</p>
<p class="text-dark">Oscuro</p>
```

`text-white` y `text-dark` de Bootstrap son literales. En UiGas funcionan en oscuro, pero sobre la superficie clara ninguno se lee. Usá `text-body` en su lugar.

## Marca

```html
<p class="text-primary">La señal de marca es --uig-red</p>
```

`--uig-red` es `#f92121` en oscuro y `#b30500` en claro. No es el color de los botones: es el de enlaces, bordes, foco y glow.

## Accesibilidad

- **El color de texto no reemplaza al significado.** `text-danger` en un error sirve si además hay un ícono o una palabra.
- `.text-white` y `.text-dark` producen texto que no se lee en uno de los dos temas. Si lo usás, probá en ambos.
- Para texto muy pequeño (menos de 18px), el mínimo es 4.5:1. `text-muted` cumple en los dos temas, pero sin margen.
- Sobre un fondo de color (`.text-bg-*` o `.bg-primary`), el contraste lo define el par, no el texto suelto.

## Qué sigue

- [Color y fondo](/helpers/color-background.html) — las superficies
- [Colores](/customize/color.html) — la rampa de marca
- [Focus ring](/helpers/focus-ring.html)