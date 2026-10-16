# Offcanvas

> Panel lateral que entra sobre un backdrop. Es el modal de Bootstrap rotado: misma lógica, misma dependencia de JS.

## Derecha

```html
<button class="btn btn-outline-secondary" type="button"
        data-bs-toggle="offcanvas" data-bs-target="#panel" aria-controls="panel">
  Abrir panel
</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="panel" aria-labelledby="panel-t">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="panel-t">Detalle del piloto</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
  </div>
  <div class="offcanvas-body">
    <dl class="row mb-0">
      <dt class="col-4">Nombre</dt><dd class="col-8">M. Rossi</dd>
      <dt class="col-4">Vueltas</dt><dd class="col-8">58</dd>
    </dl>
  </div>
</div>
```

## Posiciones

| Clase | Lado |
|---|---|
| *(sin clase)* | izquierda |
| `.offcanvas-end` | derecha |
| `.offcanvas-top` | arriba |
| `.offcanvas-bottom` | abajo |

## Con scroll

```html
<div class="offcanvas offcanvas-end" tabindex="-1" id="p2">
  <div class="offcanvas-header">…</div>
  <div class="offcanvas-body">…</div>
  <div class="offcanvas-footer border-top p-3">…</div>
</div>
```

`.offcanvas-footer` es un contenedor de Bootstrap; UiGas no lo estiliza. El borde por `.border-top` viene de las utilidades, con el color de línea del tema.

## Como modal

```html
<div class="offcanvas offcanvas-end" data-bs-scroll="false" data-bs-backdrop="static" tabindex="-1" id="p3">
```

- `data-bs-scroll="false"` — el fondo no scrollea
- `data-bs-backdrop="static"` — no se cierra clic afuera; hay que usar `Escape` o un botón

## UiGas en el panel

`.offcanvas-header`, `.offcanvas-title` y `.offcanvas-backdrop` son de UiGas. El fondo del panel es `--uig-bg`, el borde `--uig-line`.

> El backdrop de UiGas tiene su propio color: `rgba(20,20,20,.45)` en tema claro y el de Bootstrap en oscuro. Sobre la superficie clara oscurece menos que el `rgba(0,0,0,.7)` de un modal: dos overlays distintos en la misma página se sienten distintos, y en claro eso es lo correcto.

## Cuando usar offcanvas y cuándo modal

| | Offcanvas | Modal |
|---|---|---|
| El contenido es largo | sí | no |
| Se consulta mientras se trabaja | sí | raro |
| Interrumpe y pide decisión | no | sí |
| Ancho máximo | pantalla completa en móvil | centrado |

El patrón habitual es offcanvas para **ver** y modal para **confirmar**. Un modal de 800px de alto con un formulario es un offcanvas disfrazado.

## Accesibilidad

- `tabindex="-1"` y `aria-labelledby` al `id` del `.offcanvas-title`, igual que el modal.
- Bootstrap mueve el foco al panel al abrir y lo devuelve al disparador al cerrar.
- `Escape` cierra. Con `data-bs-backdrop="static"` sigue funcionando: solo se desactiva el clic.
- El offcanvas no atrapa el foco como el modal. En móvil, donde ocupa toda la pantalla, se comporta casi igual; en escritorio el usuario puede tabular fuera del panel sin cerrarlo.
- Con contenido largo, un `aria-label` en el disparador ("Ver detalle de M. Rossi") evita abrir y cerrar para adivinar de qué es.

## Dependencia de JS

Igual que el modal: **sin `bootstrap.bundle.js` no hay offcanvas**. No hay fallback CSS. El panel queda en el flujo de la página y el botón no hace nada — un estado visible pero inerte, que es peor que no tener el componente.

## Qué sigue

- [Modal](/components/modal.html)
- [Collapse](/components/collapse.html)
- [Componentes UiGas](/extend/components.html)