# Iconos

> Bootstrap Icons **no viene incluido**. UiGas estiliza la clase `.bi` pero no carga la fuente. Sin el `<link>`, los íconos no aparecen.

## Cargar Bootstrap Icons

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
```

```html
<i class="bi bi-check-circle"></i>
```

## Lo que UiGas hace

Una sola regla, en `_buttons.scss`:

```scss
.btn > .bi { font-size: 1.05em; line-height: 1; }
```

Alinea el ícono dentro del botón sin que la capital lo descentre. Nada más: no hay clase de ícono propia, ni estilos de estado, ni reescritura por tema.

## En botones

```html
<div class="d-flex gap-2">
  <button class="btn btn-primary"><i class="bi bi-arrow-right"></i> Continuar</button>
  <button class="btn btn-ghost"><i class="bi bi-x-lg"></i> Cancelar</button>
</div>
```

> El gap entre ícono y texto lo pone el `gap: 0.5rem` del `.btn`, no un margen. Si agregás muchos íconos seguidos, ese es el espacio que se ajusta.

## Tamaño

`.bi` usa el tamaño de fuente del contexto:

```html
<i class="bi bi-check"></i>                      <!-- hereda -->
<i class="bi bi-check fs-4"></i>                 <!-- Bootstrap fs-4 -->
<i class="bi bi-check" style="font-size:2rem"></i> <!-- inline -->
```

## Alternativa sin Bootstrap Icons

Si preferís SVG inline:

```html
<svg class="bi" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M2 5.5L5.5 9 14 1.5" stroke="currentColor" fill="none"
        stroke-width="2" stroke-linecap="round"/>
</svg>
```

`fill="currentColor"` hace que el ícono herede el color del texto: en un `.btn-primary` blanco, en un `.text-danger` rojo. Es la razón principal para preferir SVG inline cuando necesitás íconos teñidos.

## Corregir un ícono SVG a mano

```css
/* el relleno viene de un data-URI embebido en el framework */
.form-select { --bs-form-select-bg-img: url("data:image/svg+xml,…stroke='%23a1a1aa'…"); }
```

> Los SVG embebidos **no pueden leer una custom property**: el color está escrito en la URL como `%23a1a1aa`. Por eso hay que mantener una versión por tema, como se hizo con la flecha del select, la cruz del botón de cierre y los chevrons del acordeón.

Si querés que tome un token, pasalo a SVG inline:

```html
<select class="form-select" style="--bs-form-select-bg-img:none">
  …
</select>
```

…y dibujá la flecha con un `background-image` propio en CSS, donde sí podés usar `currentColor`.

## Accesibilidad

- **Un ícono decorativo va con `aria-hidden="true"`.** El texto del botón ya dice lo mismo.
- **Un ícono que es el único contenido necesita `aria-label`.** Un `<button>` con solo un `<i>` se anuncia como "botón".
- No uses íconos solos para acciones destructivas sin texto: la cruz sola no distingue "cerrar" de "eliminar".

```html
<button class="btn btn-ghost" aria-label="Cerrar">
  <i class="bi bi-x-lg" aria-hidden="true"></i>
</button>
```

## Qué sigue

- [Botones](/components/buttons.html)
- [Alertas](/components/alerts.html)
- [Componentes UiGas](/extend/components.html)