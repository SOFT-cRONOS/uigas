# Validación

> Tres formas: clases `is-valid` / `is-invalid`, el pseudo-clase `:invalid` con `was-validated`, o los *native* del navegador. UiGas redefine las dos primeras.

## Clases manuales

```html
<div class="mb-3">
  <label for="v1" class="form-label">Correo</label>
  <input type="email" class="form-control is-invalid" id="v1" value="piloto@">
  <div class="invalid-feedback">Falta el dominio.</div>
</div>

<div class="mb-3">
  <label for="v2" class="form-label">Patente</label>
  <input type="text" class="form-control is-valid" id="v2" value="ARG-421">
  <div class="valid-feedback">Disponible.</div>
</div>
```

Lo que UiGas redefine:

| Estado | Borde (oscuro) | Borde (claro) |
|---|---|---|
| `.is-valid` | `#22c55e` | `#166534` |
| `.is-invalid` | `--uig-red` | `#b30500` vía `--bs-danger-text-emphasis` |
| foco válido | halo `rgba(34,197,94,.2)` | halo `rgba(22,101,52,.2)` |
| foco inválido | halo rojo | halo rojo |

`.valid-feedback` y `.invalid-feedback` cambian de color y de `display` según el estado del control. Bootstrap muestra el feedback solo cuando el input tiene la clase correspondiente.

> En tema claro el verde plano mide **2:1** sobre la superficie: ni el borde ni el mensaje se leían. UiGas lo baja a `#166534` (6.3:1). Es el mismo criterio aplicado en alertas y botones outline.

## `was-validated`

Más cómodo para formularios largos: poné la clase en el `<form>` y el navegador aplica los estados solo.

```html
<form class="row g-3 was-validated" novalidate>
  <div class="col-12">
    <label for="w1" class="form-label">Correo</label>
    <input type="email" class="form-control" id="w1" required>
    <div class="invalid-feedback">Necesitás un correo válido.</div>
  </div>
  <div class="col-12">
    <label for="w2" class="form-label">Edad</label>
    <input type="number" class="form-control" id="w2" min="18" required>
    <div class="invalid-feedback">Mínimo 18 años.</div>
  </div>
  <button class="btn btn-primary" type="submit">Enviar</button>
</form>
```

Dos condiciones:

- `required` y los demás atributos de validación HTML **en el input**, no solo en la clase.
- `novalidate` en el `<form>` para que el navegador no muestre su burbuja propia — el mensaje lo ponés vos con `.invalid-feedback`.

UiGas cubre `:valid` e `:invalid` en `.form-control`; también extienden a `.form-select`.

## Native sin JS

La opción más simple, sin una sola clase:

```html
<form>
  <input type="email" class="form-control" required>
</form>
```

El navegador muestra su propio mensaje. Es lo menos bonito y lo más robusto: no depende de que el JS haya marcado nada.

## Servidor

Si la validación real la hace el servidor, el mensaje de error **no puede vivir solo en un `.invalid-feedback`** de cliente: hay que insertarlo en el DOM. El patrón mínimo:

```html
<div class="invalid-feedback d-block" id="err-email">Ese correo ya está registrado.</div>
<input type="email" class="form-control is-invalid" id="email"
       aria-describedby="err-email" aria-invalid="true">
```

Dos cosas que no son opcionales:

- `aria-invalid="true"` en el control.
- El mensaje con `aria-describedby`, para que el lector de pantalla lo anuncie al enfocarse el campo.

Usá `d-block` para forzar la visibilidad del feedback cuando la validación viene del servidor.

## Accesibilidad

- El mensaje de error va en un elemento con `id` referenciado por `aria-describedby`.
- `aria-invalid="true"` en el campo con error; `aria-live="polite"` en el contenedor de mensajes si aparecen tras un envío.
- **No uses el color como único indicador.** El borde rojo no lo ve quien no distingue rojo de verde. Sumá texto, ícono, o el texto de Bootstrap con `:invalid`, que ya trae el prefijo "Error:".
- No borres el mensaje al escribir: que se actualice cuando el campo pase a válido, no cuando el usuario toca una tecla.

## Qué sigue

- [Accesibilidad](/forms/accessibility.html)
- [Alertas](/components/alerts.html) — errores a nivel de formulario
- [Foco ring](/helpers/focus-ring.html)