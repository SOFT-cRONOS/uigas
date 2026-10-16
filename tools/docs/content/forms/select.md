# Select

> La flecha es un SVG embebido que UiGas colorea de gris metálico. Sobre superficie oscura el gris se ve; es el único detalle del control que no viene de un token.

## Básico

```html
<select class="form-select" aria-label="Circuito">
  <option selected>Elegí un circuito</option>
  <option value="cordoba">Córdoba</option>
  <option value="rojas">Rojas</option>
  <option value="termas">Termas de Río Hondo</option>
</select>
```

Comparte tratamiento con `.form-control`: mismo fondo, mismo borde, mismo foco rojo.

## Con grupos

```html
<select class="form-select">
  <optgroup label="Fórmula">
    <option>Mono</option>
    <option>Auto</option>
  </optgroup>
  <optgroup label="Moto">
    <option>MotoGP</option>
  </optgroup>
</select>
```

## Múltiple

```html
<select class="form-select" multiple size="4">
  <option selected>Vueltas rápidas</option>
  <option selected>Safety car</option>
</select>
```

## Tamaño

`.form-select-sm` y `.form-select-lg` son de Bootstrap. UiGas no los redefine, pero el fondo y el foco se mantienen.

```html
<select class="form-select form-select-sm" aria-label="Sector">…</select>
```

## La flecha

```scss
.form-select {
  --bs-form-select-bg-img: url("data:image/svg+xml,…stroke='%23a1a1aa'…");
}
```

UiGas reemplaza el SVG de Bootstrap por uno propio en chevron, coloreado `#a1a1aa` (gris metálico). Es una excepción consciente: el color está fijo en el data-URI porque no se puede interpolar una variable CSS dentro de una imagen embebida.

> Consecuencia práctica: la flecha es la misma en oscuro y en claro. Funciona en los dos, pero si algún día querés que se funda con el texto, hay que pasar a un SVG inline o a un `mask`.

## Validación

`.is-valid` / `.is-invalid` funcionan en `select` como en cualquier control. En tema claro UiGas baja el verde a `#166534`; el rojo viene de `--bs-danger-text-emphasis`.

## Accesibilidad

- El `select` necesita un nombre accesible: `<label for>` o `aria-label` si no hay label visible.
- "Elegí un circuito" como primera opción `selected` es un patrón útil: obliga a una elección explícita. Alternativa igualmente válida: la primera opción real ya `selected`, sin texto de relleno.

## Qué sigue

- [Checks y radios](/forms/checks-radios.html)
- [Range](/forms/range.html)
- [Validación](/forms/validation.html)