# Progreso

> Barra de 0.6rem con radio de píldora. El relleno por defecto es el slab rojo con texto blanco.

## Básico

```html
<label class="form-label" for="p1">Carga del Pioneer</label>
<div class="progress" role="progressbar" aria-labelledby="lbl" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 75%"></div>
</div>
```

## Etiquetada

```html
<div class="progress mb-2" role="progressbar" aria-label="Carga" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 50%"></div>
</div>
```

`aria-label` cuando no hay texto visible. Con `<label for>`, `aria-labelledby` con el `id` del label.

## Altura fina

```html
<div class="progress" style="height: 3px">…</div>
```

## Colores

```html
<div class="progress">
  <div class="progress-bar bg-success" style="width: 35%">35%</div>
</div>
```

> **Limitación real, medida.** `.progress-bar.bg-success`, `.bg-warning` y `.bg-info` usan los colores planos `#22c55e`, `#f59e0b` y `#38bdf8` con `--bs-progress-bar-color: #ffffff`. El texto blanco sobre esos rellenos da:
>
> | Relleno | Contrasto con blanco |
> |---|---|
> | `#22c55e` | **2.14:1** |
> | `#f59e0b` | **2.10:1** |
> | `#38bdf8` | **1.90:1** |
>
> Los tres fallan AA. El texto del porcentaje dentro de la barra no se lee. El relleno de la barra sí se ve: el problema es solo la etiqueta.
>
> Dos arreglos, ninguno aplicado: bajá el relleno a los tonos oscuros (`#166534`, `#92400e`, `#0369a1`), o poné el texto **fuera** de la barra:
>
> ```html
> <div class="d-flex justify-content-between">
>   <span class="small">Descargando</span>
>   <span class="small">35%</span>
> </div>
> <div class="progress">
>   <div class="progress-bar bg-success" style="width:35%"></div>
> </div>
> ```

## Con etiquetas dentro

```html
<div class="progress" role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 35%">35%</div>
</div>
```

El texto dentro de la barra es opcional. Si lo ponés, es invisible para lectores de pantalla salvo que repitas el valor en `aria-valuenow` — que es obligatorio siempre.

## Animada

```html
<div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 45%"></div>
```

- `progress-bar-striped` — bandas diagonales
- `progress-bar-animated` — las bandas se mueven

> Igual que `placeholder-glow`, la animación no respeta `prefers-reduced-motion`. Las bandas en movimiento son de las animaciones más problemáticas para personas con vestibulares, y un `.progress-bar-animated` suele quedar en bucle indefinido.

## Múltiples barras

```html
<div class="progress">
  <div class="progress-bar bg-primary" style="width: 35%">35%</div>
  <div class="progress-bar bg-success" style="width: 20%">20%</div>
  <div class="progress-bar" style="width: 15%">15%</div>
</div>
```

> Varias barras con el mismo `--bs-progress-bar-color: #ffffff` sobre rellenos claros: la suma de `#38bdf8` + `#22c55e` + `#e10600` da un punto de color que no significa nada. Si vas a apilar, poné los porcentajes **fuera**.

## UiGas

```scss
--bs-progress-bg:    var(--uig-surface-2);
--bs-progress-bar-bg: var(--uig-red-slab);
--bs-progress-height: 0.6rem;
box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);
```

- La pista usa `--uig-surface-2`, el mismo fondo que los addons de [input group](/forms/input-group.html)
- La sombra interior es un `inset` de negro fijo: en tema claro apenas se nota. Es un detalle menor que quedó del tema oscuro.
- Altura de 0.6rem con radio `50rem`: barra fina y redondeada en los dos extremos.

## Accesibilidad

- `role="progressbar"` es obligatorio. Sin él, es un `div` con un ancho.
- `aria-valuenow`, `aria-valuemin` y `aria-valuemax`: sin ellos el lector no sabe cuánto falta.
- `aria-labelledby` o `aria-label`: "Carga del Pioneer", no "progreso".
- **Actualizá `aria-valuenow` con JS.** Es el único atributo que cambia; si queda en 0, la barra anuncia 0% mientras muestra 75%.

## Qué sigue

- [Placeholders](/components/placeholders.html)
- [Botones](/components/buttons.html) — `.btn-loading`