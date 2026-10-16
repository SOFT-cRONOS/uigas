# Toasts

> Aviso flotante que no interrumpe. Superficie del tema, borde hairline, borde de color a la izquierda para dar el estado.

## Básico

```html
<button type="button" class="btn btn-primary" data-bs-toggle="toast" data-bs-target="#live">
  Mostrar
</button>

<div class="toast" id="live" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <span class="badge badge-soft badge-soft-success">GUARDADO</span>
    <small class="text-muted">hace 5 s</small>
    <button type="button" class="btn-close ms-auto mb-1" data-bs-dismiss="toast" aria-label="Cerrar"></button>
  </div>
  <div class="toast-body">Inscripción confirmada. Número ARG-421.</div>
</div>
```

## Contenedor

```html
<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body">Guardado.</div>
  </div>
</div>
```

`.toast-container`, `position-fixed` y las utilidades son de Bootstrap. `.toast`, `.toast-header` y `.toast-body` son de UiGas.

## Colores

```html
<div class="toast align-items-center border-0 text-bg-success" role="alert">
  <div class="d-flex">
    <div class="toast-body">Operación correcta.</div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
  </div>
</div>
```

> `.text-bg-*` con `border-0` es la variante sin borde de color. El [botón de cierre](/components/close-button.html) con `.btn-close-white` no hace falta con UiGas: el SVG ya es gris metálico.

## Múltiples

```html
<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div class="toast" role="alert">…</div>
  <div class="toast" role="alert">…</div>
</div>
```

## Autocierre

```html
<div class="toast autohide" data-bs-delay="5000" role="alert">
```

`data-bs-delay` en milisegundos, `autohide` para que se cierre solo, `data-bs-autohide="false"` para que no lo haga.

> **Un toast que se autoclose nunca debería llevar la única copia de algo importante.** Si es un aviso de "guardado", perderlo no molesta. Si es un número de orden o un error que hay que reintentar, el toast no sirve: necesita algo persistente.

## UiGas

```scss
.toast {
  --bs-toast-bg:          var(--uig-surface);
  --bs-toast-border-color: var(--uig-line);
  --bs-toast-header-bg:   var(--uig-surface-2);
  --bs-toast-header-color: var(--uig-text-dim);
}
```

- El `.toast-header` usa `--uig-surface-2`: un peldaño por encima del cuerpo, que da la separación sin necesidad de borde.
- El cuerpo y el fondo salen de los tokens: se adapta al tema sin reescritura.
- El `.btn-close` del header funciona con la versión tematizada.

## Cuándo toast y cuándo alerta

| | Toast | Alerta |
|---|---|---|
| Interrumpe | no | sí |
| Bloquea la vista | no | no |
| Se puede descartar | sí | a veces |
| Ancla en el flujo | no | sí |
| Automático | opcional | no |

Un toast que aparece mientras el usuario está escribiendo en un campo genera un salto de foco si no lo manejás. Anclá el foco: el `role="alert"` con `aria-live="assertive"` interrumpe lo que el lector de pantalla esté leyendo.

## Accesibilidad

- `role="alert"` para lo urgente, `role="status"` (implícito) con `aria-live="polite"` para lo informativo.
- `aria-atomic="true"` para que se lea el toast entero, no solo la parte nueva.
- El `.btn-close` necesita `aria-label="Cerrar"`.
- **El foco no va al toast.** Es un aviso, no un diálogo: mandar el foco interrumpe lo que el usuario estaba haciendo. Bootstrap no mueve el foco.
- Un toast con acción necesita que la acción sea alcanzable por teclado. Un toast que solo se lee, con autoclose, no sirve a quien navega por teclado con lector de pantalla rápido.

## Qué sigue

- [Alertas](/components/alerts.html)
- [Botón de cierre](/components/close-button.html)
- [Modal](/components/modal.html)