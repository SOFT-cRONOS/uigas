# Botón de cierre

> La equis de Bootstrap con tratamiento UiGas: opacidad baja en reposo, opaca y con giro de 90° al hover.

## Uso

```html
<div class="card">
  <div class="card-body">
    <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Cerrar"></button>
    <h5 class="card-title">Confirmar inscripción</h5>
    <p class="card-text mb-0">Revisá los datos antes de enviar.</p>
  </div>
</div>
```

`.btn-close` es de Bootstrap. UiGas redefine el color, el fondo y la opacidad:

```scss
--bs-btn-close-color: var(--uig-text-dim);
filter: none;          /* anula el filtro invert de Bootstrap */
opacity: 0.6;
```

> El `filter: none` importa. Bootstrap usa un SVG con `fill` negro y lo invierte por filtro para que se vea en fondos oscuros. UiGas lo desactiva y mete su propio SVG en `--bs-btn-close-bg`, con relleno `#a1a1aa`. Sin el `filter: none` las dos cosas se acumulan y la cruz desaparece.

## La clase invertida

Bootstrap trae `.btn-close-white` para fondos oscuros:

```html
<button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Cerrar"></button>
```

> Con UiGas no hace falta: el SVG ya usa el gris metálico en vez de negro, y la opacidad 0.6 lo hace legible sobre `--uig-bg` oscuro sin invertir nada. Si lo usás igual, el filtro invertido se suma al SVG gris y el resultado es un tono raro.

## En tema claro

> El SVG trae `#a1a1aa` fijo, pensado para fondo oscuro. Sobre la superficie clara `#f0f0f3` la cruz queda lavada. `_theme-light.scss` reescribe `--bs-btn-close-bg` con relleno `#52525b` y sube la opacidad a 0.75.

Es el mismo criterio de los [badges](/components/badges.html), las [alertas](/components/alerts.html) y los [botones outline](/components/buttons.html): **los SVGs embebidos no pueden leer un token, así que hay que mantener una versión por tema.**

## Tamaño

`.btn-close` mide 1em con padding. Para un objetivo táctil real hace falta más:

```html
<style>
  .btn-close-lg { width: 1.5em; height: 1.5em; padding: .5em; }
</style>
```

## Accesibilidad

- `aria-label="Cerrar"` es **obligatorio**. Sin él el botón es una equis sin nombre: un lector de pantalla anuncia "botón".
- Si el botón cierra algo que el usuario puede volver a abrir, el foco debería volver a quien lo abrió. Bootstrap no lo hace — cerrá un modal y el foco se cae al `<body>`. Gestionalo vos.
- No reemplaces la equis por una `×` de texto: la forma cambia, el tamaño optical no, y pierde el peso visual.
- Un cierre que descarta datos necesita confirmación. Si la acción es irreversible, el botón no debería existir en la barra del modal.

## Qué sigue

- [Alertas](/components/alerts.html)
- [Modal](/components/modal.html)
- [Toasts](/components/toasts.html)