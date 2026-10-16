# Modal

> Diálogo sobre un backdrop al 70%. Contenido en `--uig-surface`, borde `--uig-line`, radio chico. Requiere `bootstrap.bundle.js`.

## Básico

```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl">
  Confirmar inscripción
</button>

<div class="modal fade" id="mdl" tabindex="-1" aria-labelledby="mdl-t" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="mdl-t">Confirmar inscripción</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        Vas a inscribirte como <strong>M. Rossi</strong> en la fecha 4.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-ghost" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Confirmar</button>
      </div>
    </div>
  </div>
</div>
```

## Diálogo grande

```html
<div class="modal-dialog modal-lg">
```

`.modal-dialog`, `.modal-lg`, `.modal-sm` y `.modal-xl` son de Bootstrap. UiGas reescribe `.modal-content`, `.modal-header`, `.modal-title`, `.modal-footer` y `.modal-backdrop`.

> `modal-dialog-centered` centra **verticalmente**. Sin él el modal arranca pegado al borde superior, y en pantallas bajas se ve cortado.

## Centrado vertical

```html
<div class="modal-dialog modal-dialog-centered">
```

## Encabezado, cuerpo y pie

Tres bloques, todos de Bootstrap: `.modal-header`, `.modal-body`, `.modal-footer`. El `.modal-title` sí es de UiGas.

> El `.modal-footer` usa `border-top: 0` y margen plano de Bootstrap. UiGas le pone `--uig-line` al borde. En tema claro, contra `#f0f0f3`, la separación entre cuerpo y pie queda casi imperceptible: la separación real la hace el espacio, no la línea.

## Scroll en pantallas bajas

```html
<div class="modal-dialog modal-dialog-scrollable">
```

Con `scrollable`, si el contenido no entra, el scroll ocurre **dentro** del `.modal-body` y el footer queda fijo. Sin eso, el footer se va fuera de la pantalla y el modal se vuelve inusable.

## Atributos que no son opcionales

| Atributo | Para qué |
|---|---|
| `tabindex="-1"` | el foco entra al abrir |
| `aria-labelledby` | apunta al `id` del título |
| `aria-hidden="true"` | Bootstrap lo gestiona, pero decláralo |

Sin `aria-labelledby`, un lector de pantalla anuncia "dialog" sin nombre.

## Accesibilidad

- **Bootstrap mueve el foco al modal al abrir y lo devuelve al disparador al cerrar.** Eso es correcto y no hay que tocarlo. El problema aparece cuando hay dos modales anidados o cuando cerrás por JS sin evento.
- `aria-labelledby` al título, siempre.
- Botón de cierre con `aria-label="Cerrar"` — ver [botón de cierre](/components/close-button.html).
- `Escape` cierra. `Tab` queda atrapado dentro mientras está abierto: eso es lo correcto en un modal.
- El fondo tiene `overflow: hidden` mientras el modal está abierto: la página no scrollea detrás. Sin JS, el modal no se abre en absoluto.

## Trampas

1. **Sin JavaScript no hay modal.** No hay fallback. Si la información es imprescindible, no la pongas ahí.
2. **Modales anidados**: el segundo toma el foco y el primero queda accesible por Tab. Funcional pero confuso. Evitalos.
3. **El fondo es `rgba(0,0,0,.7)` fijo.** En tema claro oscurece mucho la página detrás. Es la decisión de Bootstrap y UiGas no la cambia.

## Qué sigue

- [Offcanvas](/components/offcanvas.html)
- [Toasts](/components/toasts.html)
- [Formularios en modal](/forms/overview.html)