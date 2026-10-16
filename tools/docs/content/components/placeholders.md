# Placeholders

> Bloques grises con un pulso. Es de Bootstrap; UiGas solo les da el color de línea del tema. Sirven para el estado de carga.

## Línea

```html
<p class="placeholder-glow">
  <span class="placeholder col-6"></span>
</p>
<p class="placeholder-glow">
  <span class="placeholder col-9"></span>
</p>
```

## Con forma

```html
<div class="placeholder-glow">
  <div class="row">
    <div class="col-md-4">
      <span class="placeholder col-12" style="height: 120px"></span>
    </div>
  </div>
</div>
```

## Con un botón real

```html
<p class="placeholder-glow mb-2">
  <span class="placeholder col-6"></span>
</p>
<button class="btn btn-primary disabled" disabled>Inscribirse</button>
```

## Sin el pulso

```html
<span class="placeholder col-6"></span>
```

Sin el wrapper `.placeholder-glow` el bloque es estático. Útil cuando el contenido va a aparecer ya — un placeholder que desaparece y vuelve a parpadear es peor que esperar.

## Color

```scss
.placeholder { background-color: var(--uig-line); }
```

> Es el único punto de todo el framework donde `--uig-line` se usa como relleno. Suena raro, pero es correcto: un placeholder **debe** verse como una superficie sin contenido, y la línea es exactamente eso.
>
> En tema oscuro `--uig-line` es `#1f1f1f`, apenas por encima del fondo `#141414`: el contraste es bajo a propósito. En claro `#c9c9ce` sobre `#f0f0f3`. En los dos casos se distingue lo suficiente sin competir con el contenido que va a aparecer.

## Anchos

Las columnas son de Bootstrap: `col-1` a `col-12`, `w-25`, `w-50`, `w-75`, `w-100`.

```html
<span class="placeholder w-75"></span>
```

## Accesibilidad

Este es el punto importante de la página: **un placeholder no es contenido**.

```html
<div class="placeholder-glow" role="status" aria-live="polite">
  <span class="placeholder col-6"></span>
  <span class="visually-hidden">Cargando resultados…</span>
</div>
```

- `aria-busy="true"` en el contenedor mientras carga
- Un texto real en `.visually-hidden` que diga qué está cargando
- `aria-live="polite"` para que el cambio a contenido real se anuncie

Sin nada de esto, un usuario de lector de pantalla ve una zona muda y no sabe si la página funcionó.

> La animación `placeholder-glow` no respeta `prefers-reduced-motion`. Un pulso infinito es una de las pocas animaciones que causa malestar real a personas con ALTERaciones vestibulares. Es un fix de una línea:

```html
<style>
  @media (prefers-reduced-motion: reduce) {
    .placeholder-glow .placeholder { animation: none; }
  }
</style>
```

## Cuándo usarlo

- Contenido que tarda **más de 300 ms** si el layout se va a mover. Antes de eso, un placeholder es un parpadeo.
- La forma importa: un placeholder con la misma geometría del contenido real evita el salto cuando llega.
- **No** como botón de carga. Un `<button class="btn btn-loading">` comunica acción; un rectángulo gris no dice si se puede cancelar.

## Qué sigue

- [Spinners](/components/spinners.html)
- [Botones](/components/buttons.html) — `.btn-loading`