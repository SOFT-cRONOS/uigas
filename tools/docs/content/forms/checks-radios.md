# Checks y radios

> UiGas redefine el `input` (`.form-check-input`), no el contenedor. El marcado y el switch siguen siendo de Bootstrap.

## Checkbox

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="1" id="c1">
  <label class="form-check-label" for="c1">Usar casco homologado</label>
</div>
```

`.form-check` y `.form-check-label` son de Bootstrap. Lo que UiGas estiliza es el `input`:

- fondo `--uig-surface`, borde `--uig-line-strong`
- marcado → fondo `--uig-red-slab` (#e10600) con el tick en blanco
- foco → borde `--uig-red` + halo rojo

> El tick va en blanco porque el slab mide 4.97:1 contra blanco. Con el rojo de marca plano (#f92121) el tick sería invisible. Es el mismo criterio del botón primario.

## Radio

```html
<div class="form-check">
  <input class="form-check-input" type="radio" name="categoria" id="r1" checked>
  <label class="form-check-label" for="r1">Automovilismo</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="categoria" id="r2">
  <label class="form-check-label" for="r2">Motociclismo</label>
</div>
```

Los radios comparten `name`: es lo que los agrupa. El `checked` va en el que querés que venga seleccionado.

## Sin marcar

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="c2" disabled>
  <label class="form-check-label" for="c2">Opción no disponible</label>
</div>
```

## Switch

```html
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="sw1">
  <label class="form-check-label" for="sw1">Notificar por correo</label>
</div>
```

> `.form-switch` es de Bootstrap y **no** tiene tratamiento UiGas: el switch conserva su forma de Bootstrap con el `input` estilizado por UiGas. Funciona, pero el resultado es una mezcla visual. Si te importa la coherencia, el switch necesita trabajo propio en el tema claro — anotado como pendiente.

## Alineación horizontal

```html
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="i1">
  <label class="form-check-label" for="i1">Todos</label>
</div>
```

## Deshabilitado

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="c3" disabled checked>
  <label class="form-check-label" for="c3">Fijado por el reglamento</label>
</div>
```

Un check marcado y deshabilitado sigue siendo legible en ambos temas: el slab es un relleno sólido, no un tono plano.

## Accesibilidad

- Cada control necesita su `<label for>` con el `id` correspondiente.
- En un grupo de radios, agrupalos en un `<fieldset>` con `<legend>`: sin eso, un lector de pantalla anuncia opciones sueltas sin contexto.
- `role="switch"` en los switches para anunciar estado activado/desactivado.
- No dependas solo del color para marcar el estado: el check marcado también cambia la forma del control.

## Qué sigue

- [Range](/forms/range.html)
- [Accesibilidad](/forms/accessibility.html) — el panorama completo de formularios
- [Validación](/forms/validation.html)