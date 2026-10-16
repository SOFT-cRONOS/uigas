# Overview

> UiGas reescribe el aspecto de los controles pero no su estructura. Todo lo que depende de Bootstrap sigue siendo de Bootstrap.

## Qué reescribe UiGas

De los controles de Bootstrap, UiGas redefine:

`form-control` · `form-select` · `form-range` · `form-check-input` · `form-label` · `form-text` · `input-group-text` · `valid-feedback` · `invalid-feedback` · los estados `is-valid` / `is-invalid`

## Qué no reescribe

`.form-check` (el contenedor) · `.form-switch` · `.input-group` (el contenedor) · `.form-floating` · `.col-form-label` · `.invalid-tooltip` · `.input-group-sm|lg`

Esas siguen siendo de Bootstrap. Funcionan —el HTML es el mismo— pero no tienen el tratamiento de UiGas.

## La anatomía

```html
<form>
  <div class="mb-3">
    <label for="patente" class="form-label">Patente</label>
    <input type="text" class="form-control" id="patente" placeholder="ARG-421">
    <div class="form-text">Se muestra en la lista de entrada.</div>
  </div>

  <button class="btn btn-primary" type="submit">Guardar</button>
</form>
```

Tres piezas, en este orden: `.form-label` versalita, el control, y el texto de ayuda con `.form-text`.

## Lo que cambia el aspecto

| Pieza | UiGas |
|---|---|
| `.form-label` | versalitas, tracking 0.04em, 0.85rem, `--uig-text-dim` |
| `.form-control` | fondo `--uig-surface`, borde `--uig-line`, peso 500 |
| foco | borde `--uig-red` + halo \`0 0 0 3px rgba(249,33,33,.2)\` |
| `:disabled` | fondo `--uig-bg-deep`, opacidad 0.6 |
| `.form-text` | `--uig-text-muted` |

El foco es lo que más se nota: UiGas no usa el anillo azul de Bootstrap sino el rojo de marca, con halo suave. Es consistente con los botones, que también enfocan en rojo.

## Deshabilitado

```html
<input type="text" class="form-control" disabled>
<input type="text" class="form-control" readonly value="Calculado">
```

\`readonly\` vs \`disabled\`: el primero se puede copiar y sigue llegando al servidor; el segundo no. Para un campo calculado, \`readonly\` es lo correcto — \`disabled\` además saca el campo del envío del formulario.

## En el tema claro

Los controles usan \`--uig-surface\` y \`--uig-line\`, que ya están redefinidos para claro, así que el contraste se resuelve solo.

La excepción es la **validación**: el verde plano \`#22c55e\` mide 2:1 sobre la superficie clara. UiGas lo baja a \`#166534\` (6.3:1) en el tema claro. El rojo ya pasa por \`--bs-danger-text-emphasis\`, que estaba redefinido.

> Es el mismo criterio que en [alertas](/components/alerts.html): sobre base clara todo acento plano se reemplaza por el versante oscuro de su familia.

## Accesibilidad

- Siempre un \`<label for>\` con \`id\` en el control. El \`placeholder\` no es un label: desaparece al escribir y no lo lee consistente la mayoría de lectores.
- Mensajes de validación asociados con \`aria-describedby\`.
- El texto de ayuda con \`.form-text\` va **después** del control, dentro del mismo \`.mb-3\`.

## Qué sigue

- [Form control](/forms/form-control.html) — texto, password, áreas, archivos
- [Select](/forms/select.html)
- [Validación](/forms/validation.html)