# Popovers

> Como el tooltip, pero con encabezado y borde completo. Superficie elevada con `--uig-line`, encabezado con tinte.

## Básico

```html
<button type="button" class="btn btn-outline-secondary"
        data-bs-toggle="popover" data-bs-placement="right"
        data-bs-content="El Auto 7 y las motos comparten cronómetro.">
  Detalle
</button>
```

## Con HTML

```html
<button type="button" class="btn btn-primary"
        data-bs-toggle="popover" data-bs-title="Córdoba"
        data-bs-content="Cuarta fecha · 12 de abril · 4.200 m">
  Ver
</button>
```

> `data-bs-html="true"` es necesario para que el contenido sea HTML. Con `data-bs-content` sin ese flag, el texto va escapado. El punto rojo final del ejemplo anterior es a propósito: sin `data-bs-html`, los caracteres se muestran literalmente.

## Estructura

```html
<div class="popover" role="tooltip" id="pop">
  <div class="popover-header">Córdoba</div>
  <div class="popover-body">Cuarta fecha · 12 de abril</div>
</div>
```

## Posiciones

`top` · `bottom` · `start` · `end` · `right` · `left`. Con `auto` (default) Popper reposiciona.

## Descartable

```html
<button data-bs-toggle="popover" data-bs-title="Ayuda"
        data-bs-content="Clic en cualquier lado para cerrar.">
  ?
</button>
```

Con `data-bs-trigger="click"` el popover se queda hasta que hacés clic afuera, en vez de desaparecer al salir. Es el comportamiento correcto en táctil.

## UiGas

```scss
--bs-popover-bg:           var(--uig-surface);
--bs-popover-border-color: var(--uig-line);
--bs-popover-border-radius: var(--bs-border-radius-lg);
--bs-popover-header-bg:    var(--uig-tint);
--bs-popover-header-color: var(--uig-heading);
backdrop-filter: blur(8px);
```

- El fondo es la superficie del tema: en oscuro `#111111`, en claro `#f0f0f3`.
- El encabezado usa `--uig-tint`, que es blanco al 3% en oscuro y negro al 3.5% en claro: una separación apenas perceptible, por diseño.
- El cuerpo es `--uig-text`, el mismo del párrafo.

> A diferencia del [tooltip](/components/tooltips.html), el popover sí tiene fondo propio y `backdrop-filter`. Es coherente: el popover es más grande y contiene estructura, el tooltip es una etiqueta.

## Accesibilidad

- Igual que el tooltip: el disparador debe ser un `<button>` o un enlace enfocable.
- Con `data-bs-trigger="click"`, Bootstrap **no** gestiona el foco dentro del popover. Si tiene un enlace o un botón, `Tab` lo recorre, pero el popover puede cerrarse antes. Para contenido interactivo, un modal es más seguro.
- El popover no atrapa el foco: no es un diálogo. `Escape` lo cierra.
- `data-bs-trigger` acepta `click`, `hover`, `focus`, `manual`, o una lista. `"hover focus"` es el combo útil para teclado y mouse.

## Popover o modal

| | Popover | Modal |
|---|---|---|
| Tamaño | chico | completo |
| Foco | no lo atrapa | lo atrapa |
| Bloquea la página | no | sí |
| Contenido interactivo | con cuidado | sí |
| Se cierra con Escape | sí | sí |

> La diferencia de tamaño importa más que la técnica: si el contenido necesita scrolling o tiene varios campos, es un modal. Un popover con scroll dentro es una mala experiencia en móvil.

## Qué sigue

- [Tooltips](/components/tooltips.html)
- [Modal](/components/modal.html)
- [Focus ring](/helpers/focus-ring.html)