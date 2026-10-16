# Color

> La rampa de marca no cambia entre temas. Lo que cambia es la capa semántica: superficies, líneas, texto y los tonos de cada estado.

## La rampa roja

```
--uig-red-hi       #ff2a1f
--uig-red          #f92121   Racing Red · señal de marca
--uig-red-slab     #e10600   relleno sólido con texto blanco
--uig-red-lo       #b30500   hover y activo sobre claro
--uig-red-deep     #8a0400
```

## Qué color va dónde

Es la decisión más importante del sistema, y hay una regla simple detrás:

| Uso | Token | Contraste |
|---|---|---|
| relleno de botón | `--uig-red-slab` | 4.97:1 con blanco |
| enlaces, foco, bordes | `--uig-red` | — |
| hover del link | `--uig-red-hi` | — |
| hover/activo en claro | `--uig-red-lo` / `--uig-red-deep` | 6.3:1 / 8.8:1 |

> **El rojo de señal no sostiene texto blanco.** `#f92121` da 3.2:1 y falla AA. Por eso el botón primario usa el slab: el rojo de la marca vive en los bordes, el foco y el hover, no en el relleno.

## La rampa neutra

```
--uig-bg          #dcdde2   base clara
--uig-surface-2   #e6e7eb   elevado / hover
--uig-surface     #f0f0f3   superficie elevada
--uig-line        #c9c9ce   hairline
--uig-line-strong #bdbdc4
--uig-text-dim    #52525b
--uig-text-soft   #3f3f46
--uig-text        #2a2a2a
--uig-heading     #141414   Asphalt Black
```

Es una rampa **invertida**: los valores suben en luminosidad de abajo hacia arriba del listado. Eso es porque está ordenada desde la superficie más cercana al usuario hasta el texto.

## La regla de los acentos en tema claro

> **Sobre superficie clara, un acento plano no se lee.** Los tonos que funcionan sobre fondo oscuro dan entre 1.5:1 y 2.8:1 sobre `#f0f0f3`.

Por eso cada familia de estado tiene dos valores:

| Familia | Dark | Light | Sobre superficie clara |
|---|---|---|---|
| primary / danger | `#ff4d44` | `#b30500` | 6.28:1 |
| success | `#4ade80` | `#166534` | 6.27:1 |
| warning | `#fbbf24` | `#92400e` | 6.23:1 |
| info | `#7dd3fc` | `#0369a1` | 5.22:1 |
| secondary | `#a1a1aa` | `#3f3f46` | 9.18:1 |

El versante oscuro se elige de la misma familia Tailwind (green-800, amber-800, sky-800, red-800), no al azar: mantienen el tono, cambian la luminosidad.

## Dónde vive la corrección

```scss
// _tokens.scss → --bs-*-text-emphasis, ya redefinidos por tema
[data-bs-theme="light"] {
  --bs-success-text-emphasis: #166534;
  --bs-warning-text-emphasis: #92400e;
}

// _theme-light.scss → todo lo que un token no alcanza
[data-bs-theme="light"] .alert-success { --bs-alert-color: #166534; }
[data-bs-theme="light"] .btn-outline-success { --bs-btn-color: #166534; }
```

**Dos lugares, no uno.** Los tokens resuelven el caso donde el color se hereda; `_theme-light.scss` resuelve donde hay que reescribir el valor de una variable de componente. Por eso el archivo está al final del `@use`: sus selectores ganan por orden.

## Componentes afectados

Una misma regla, aplicada en siete sitios:

| Componente | Qué se reescribe en claro |
|---|---|
| `.alert-*` (8) | `--bs-alert-color`, bg, border |
| `.btn-outline-*` (7) | `--bs-btn-color` y estados |
| `.badge-soft-*` (8) | `--uig-badge-fg` |
| `.text-success/warning/info` | color |
| validación de formularios | borde y feedback |
| `.btn-ghost` | color y hover |
| `.btn-close` | SVG embebido |

## Los pendientes

Tres cosas que **no** se corrigieron, y por qué:

| Qué | Problema | Por qué no |
|---|---|---|
| `.progress-bar.bg-success/warning/info` | texto blanco sobre plano: 2.1:1 | falla en **ambos** temas; cambiar el relleno es identidad visual |
| `.text-bg-success/warning/info` | igual que el anterior | ídem |
| `.border-primary` | 2.9:1 en claro, bajo el 3:1 de la WCAG | es el último borde de acento sin pasar por la reescritura por tema |

> Los dos primeros son un problema distinto al del resto: no es que el acento no se adapte, es que **el par color + blanco no tiene contraste suficiente en ningún tema**. La solución es bajar los rellenos a los tonos oscuros, no agregar un override por tema.

## Accesibilidad

- **Texto:** mínimo 4.5:1. Los tokens de texto del framework cumplen en los dos temas.
- **Bordes de componentes:** mínimo 3:1. `.border-primary` en claro queda en 2.9:1 — es el único que no llega.
- **Contraste no textual** (iconos, foco, gráficos): 3:1. El focus ring se corrigió a 6.28:1 en claro.
- **Nunca el color solo.** Un estado con `#166534` necesita además texto, ícono o posición.

## Qué sigue

- [Variables CSS](/customize/css-variables.html)
- [Colores](/utilities/colors.html)
- [Alertas](/components/alerts.html) — un ejemplo del patrón completo