# Spinners

> Un anillo y un punto, ambos en `--uig-red`. Es la variante más pequeña de UiGas: tres reglas.

```html
<div class="spinner-border" role="status">
  <span class="visually-hidden">Cargando…</span>
</div>
<div class="spinner-grow" role="status">
  <span class="visually-hidden">Cargando…</span>
</div>
```

## Tamaño y color

```html
<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
  <span class="visually-hidden">Cargando…</span>
</div>
<div class="spinner-border text-danger" role="status">
  <span class="visually-hidden">Cargando…</span>
</div>
```

`.spinner-border-sm` es de Bootstrap. El tamaño grande necesita el `style` inline: no hay una clase para 3rem.

## En línea con texto

```html
<div class="d-flex align-items-center gap-2">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden">Cargando…</span>
  </div>
  <span>Actualizando telemetría…</span>
</div>
```

## En botón

Preferí `.btn-loading`:

```html
<button class="btn btn-primary btn-loading">Guardando…</button>
```

> La diferencia es de tamaño y de encaje: un `.spinner-border-sm` dentro de un botón queda desalineado y no tapa el ancho del texto, así que el botón **cambia de tamaño** al cargar. `.btn-loading` oculta el texto y pone el spinner centrado: el botón no se mueve. Es la razón por la que existe.

## El color

```scss
.spinner-border { color: var(--uig-red); }
.spinner-grow   { color: var(--uig-red); }
```

> `--uig-red` es `#f92121` en oscuro y `#b30500` en claro. Sobre `--uig-bg` mide 3.1:1 en oscuro y **6.3:1** en claro — el mismo token resuelve los dos casos. Es uno de los pocos elementos del framework donde no hizo falta una reescritura por tema.
>
> `.text-primary .spinner-border` también fuerza el rojo: un spinner dentro de un badge o un alert de marca sigue siendo rojo, no toma el color del contenedor.

## Animación

Ambos giran con `animation: .75s linear infinite` (Bootstrap) más la de UiGas. **Ninguno respeta `prefers-reduced-motion`.**

```html
<style>
  @media (prefers-reduced-motion: reduce) {
    .spinner-border, .spinner-grow { animation-duration: 1.5s; }
  }
</style>
```

Reducir la velocidad en vez de eliminar la animación mantiene el indicador: un elemento estático no comunica "trabajando". Es un punto medio razonable para un spinner, a diferencia del pulso de [placeholders](/components/placeholders.html) o las bandas de [progreso](/components/progress.html).

## Accesibilidad

- `role="status"` **más** un texto en `.visually-hidden`. El spinner es un borde vacío: sin texto, un lector de pantalla anuncia un rol sin contenido.
- El texto debería decir **qué** está cargando, no solo "cargando": "Actualizando telemetría…" en vez de "Cargando…".
- Para operaciones que se pueden cancelar, el spinner no alcanza: hace falta un botón de cancelar. `[aria-busy]` en la región que se está actualizando.

## Qué sigue

- [Placeholders](/components/placeholders.html) — para carga de contenido, no de acciones
- [Botones](/components/buttons.html) — `.btn-loading`