# Range

> El pulgar usa `--uig-red`, así que en tema claro baja solo a `#b30500` (de 3.5:1 a 6.3:1). La pista y el relleno salen de los tokens.

## Básico

```html
<label for="v" class="form-label">Vueltas</label>
<input type="range" class="form-range" id="v" min="1" max="70" value="58">
```

UiGas redefine los tres pseudo-elementos del range:

| Parte | Selector | Valor |
|---|---|---|
| Pulgar (WebKit) | `::-webkit-slider-thumb` | `--uig-red` |
| Pulgar (Firefox) | `::-moz-range-thumb` | `--uig-red` |
| Pista (WebKit) | `::-webkit-slider-runnable-track` | `--uig-line` |
| Pista (Firefox) | `::-moz-range-track` | `--uig-line` |

## Con valor visible

```html
<label for="v2" class="form-label">Temperatura</label>
<output class="stat-value" for="v2" id="out">120</output>
<input type="range" class="form-range" id="v2" min="80" max="140" value="120" oninput="out.textContent=this.value">
```

La cifra va en un `<output>` con la fuente de datos (Rajdhani) para que se lea como número y no como párrafo.

## Pasos discretos

```html
<input type="range" class="form-range" min="0" max="5" step="1" value="3">
```

`step` implícito es 1. Si el rango es de 0 a 100 con decimales, `step="0.5"`.

## Doble mando

```html
<div class="d-flex gap-2">
  <input type="range" class="form-range" id="from" min="0" max="100" value="20">
  <input type="range" class="form-range" id="to" min="0" max="100" value="80">
</div>
```

Dos inputs normales: el "range dual" de Bootstrap no existe como componente. Dos `input[type=range]` con JS es la forma honesta de armarlo.

> Tachar dos rangos superpuestos encima requiere JavaScript que los sincronice y maneje el cruce. Si lo necesitás, va como componente propio, no con CSS.

## Accesibilidad

- Un range **no** muestra su valor. Poné el número visible al lado o en un `<output>`: si no, quien navega con teclado no sabe dónde está.
- `aria-valuetext` cuando el valor tiene unidad: `aria-valuetext="58 vueltas"`.
- El foco por teclado no se ve sobre el pulgar por defecto. Agregá:

```html
<style>
  .form-range:focus-visible { outline: 2px solid var(--uig-red); outline-offset: 4px; }
</style>
```

## Qué sigue

- [Input group](/forms/input-group.html)
- [Labels flotantes](/forms/floating-labels.html)
- [Accesibilidad](/forms/accessibility.html)