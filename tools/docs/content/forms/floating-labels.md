# Labels flotantes

> `.form-floating` es de Bootstrap y UiGas **no** lo redefine. El control recibe el estilo de UiGas; la etiqueta flotante queda con el aspecto de Bootstrap.

## Cómo funciona

El label se pone **después** del input y se posiciona sobre él. Cuando el campo tiene valor o foco, el label sube.

```html
<div class="form-floating mb-3">
  <input type="text" class="form-control" id="f1" placeholder="Nombre">
  <label for="f1">Nombre</label>
</div>
```

El `placeholder` no es opcional: es el texto que se ve mientras la etiqueta está arriba. Sin él, el input queda vacío.

## Con valor inicial

```html
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="f2" value="piloto@dominio.com">
  <label for="f2">Correo</label>
</div>
```

## Select

```html
<div class="form-floating mb-3">
  <select class="form-select" id="f3">
    <option value="1">Córdoba</option>
    <option value="2">Rojas</option>
  </select>
  <label for="f3">Circuito</label>
</div>
```

> Con un select, la etiqueta flotante se pone **encima** del `select` en lugar de después: es el orden que espera Bootstrap. Cambiarlo rompe el posicionamiento.

## Textarea

```html
<div class="form-floating">
  <textarea class="form-control" id="f4" placeholder="Notas"></textarea>
  <label for="f4">Notas</label>
</div>
```

El textarea necesita `height` explícito: con la altura por defecto la etiqueta no tiene espacio para subir.

```html
<style>
  textarea.form-control { height: 120px; }
</style>
```

## La mezcla visual

Este es el punto importante de esta página. `.form-floating` de Bootstrap posiciona el label con su propio color y tamaño, mientras el input que tiene debajo lleva el estilo de UiGas. El resultado es un input con la marca de UiGas y una etiqueta con el corte de Bootstrap.

No es un error: la etiqueta sigue siendo legible en ambos temas. Pero no hay una ajuste fino de la posición vertical, y en tema claro el label de Bootstrap queda más claro que el `--uig-text-soft` que usa el resto de UiGas.

Si la coherencia importa en tu proyecto, la alternativa es un label fijo normal:

```html
<div class="mb-3">
  <label for="alt1" class="form-label">Nombre</label>
  <input type="text" class="form-control" id="alt1">
</div>
```

Mismo costo de markup, dos voices tipográficas menos que mezclar, y el texto de ayuda tiene dónde vivir.

## Accesibilidad

- El label flotante es un label real, pero **cambia de tamaño y de contraste** al flotar. Un usuario con baja visión puede perderlo de vista.
- Un label fijo con `.form-label` mantiene siempre el mismo tamaño: es la opción más legible.
- Nunca uses el label flotante como único indicador del campo obligatorio.

## Qué sigue

- [Layout](/forms/layout.html)
- [Validación](/forms/validation.html)
- [Accesibilidad](/forms/accessibility.html)