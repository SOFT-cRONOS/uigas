# Botones

> Versalitas, tracking amplio y relleno plano en reposo. El hover los eleva; el activo los hunde. UiGas agrega tres variantes propias: `.btn-ghost`, `.btn-loading` y `.btn-link`.

## Primario

```html
<div class="d-flex gap-2 flex-wrap">
  <button class="btn btn-primary">Inscribirse</button>
  <button class="btn btn-primary" disabled>Inscribirse</button>
</div>
```

El primario usa `--uig-red-slab` (#e10600), no el rojo de señal (#f92121). La razón es el contraste: #f92121 con texto blanco da 3.2:1 y falla; el slab da **4.97:1** y pasa AA. La marca vive en el hover, en el foco y en los bordes — no en el relleno del botón.

## Contenido

```html
<div class="d-flex gap-2 flex-wrap align-items-center">
  <button class="btn btn-primary btn-lg">Comprar entrada</button>
  <button class="btn btn-primary">Guardar</button>
  <button class="btn btn-primary btn-sm">Guardar</button>
  <button class="btn btn-primary" disabled>Guardar</button>
</div>
```

`.btn-lg` y `.btn-sm` son de Bootstrap; UiGas no los redefine. El fondo, el borde y la tipografía sí son suyos.

## Outline

```html
<div class="d-flex gap-2 flex-wrap">
  <button class="btn btn-outline-secondary">Secundario</button>
  <button class="btn btn-outline-danger">Eliminar</button>
  <button class="btn btn-outline-light">Claro</button>
</div>
```

> En tema oscuro el outline usa el color plano de cada familia como texto: `#22c55e`, `#f59e0b`, `#38bdf8`. Sobre fondo oscuro se leen. Sobre el claro no: por eso `_theme-light.scss` reescribe los siete outlines con el versante oscuro de su familia. Es la misma regla que en [alertas](/components/alerts.html).

## Estados

```html
<div class="d-flex gap-2 flex-wrap">
  <button class="btn btn-secondary">Secundario</button>
  <button class="btn btn-secondary">Light</button>
  <button class="btn btn-secondary">Dark</button>
  <button class="btn btn-secondary">Info</button>
  <button class="btn btn-secondary">Warning</button>
  <button class="btn btn-secondary">Success</button>
</div>
```

## `.btn-ghost`

Propia de UiGas. Sin fondo ni borde: solo texto que se enciende al hover.

```html
<div class="d-flex gap-2">
  <button class="btn btn-ghost">Cancelar</button>
  <button class="btn btn-ghost">Ver detalle</button>
</div>
```

> Sus valores originales son blancos translúcidos, pensados para fondo oscuro. En tema claro el texto queda en 2.25:1: ilegible. `_theme-light.scss` lo reescribe con el equivalente oscuro (`#3f3f46`, hover con tinte negro al 5%). En oscuro va `#a1a1aa` → blanco.

## `.btn-loading`

Propia de UiGas. Oculta el texto y muestra un spinner, sin necesidad de JavaScript.

```html
<button class="btn btn-primary btn-loading">Guardando…</button>
```

Funciona con `color: transparent` + un `::after` que gira. `.btn-loading` además pone `pointer-events: none`, así que no se puede double-clickear mientras corre.

> El spinner es blanco. En tema claro `_theme-light.scss` lo pasa a borde oscuro con la punta en rojo de marca, porque blanco sobre claro desaparece.

> El texto sigue en el DOM (bueno para lectores de pantalla) pero es invisible. Si la acción es larga, agregá `aria-busy="true"` y un aviso `aria-live` fuera del botón.

## `.btn-link`

```html
<button class="btn btn-link">Ver todos los resultados</button>
```

Único botón que **no** va en versalitas: es texto con relleno de enlace, con el offset de subrayado de 3px. Hereda `--uig-red` y sube a `--uig-red-hi` al hover.

## Con iconos

Bootstrap Icons da la clase `.bi`:

```html
<button class="btn btn-primary">
  <i class="bi bi-arrow-right"></i> Continuar
</button>
```

UiGas añade `.btn > .bi { font-size: 1.05em; line-height: 1 }` para que el ícono no descuadre la capital. **Bootstrap Icons no viene incluido**: hay que cargarlo aparte.

## Deshabilitado

```html
<button class="btn btn-primary" disabled>Inscribirse</button>
```

> Bootstrap pone `opacity: 0.65` al deshabilitado. Sobre el slab rojo eso baja el contraste del texto blanco por debajo de AA. Si la legibilidad del estado deshabilitado te importa, bajá la opacidad a 0.5 explícitamente o cambiá el color: el usuario ya sabe que no puede hacer clic, no necesita un botón de bajo contraste.

## Movimiento

```html
<button class="btn btn-primary">Hover me</button>
```

- reposo: plano, sin sombra
- hover: `translateY(-2px)` + sombra
- activo: `translateY(0) scale(0.985)` + sombra interior, en 0.06s

El `:active` va **último** en el archivo, después de todos los hovers, para que gane sobre ellos sin necesidad de `!important`.

## En formularios

```html
<button type="submit" class="btn btn-primary">Enviar</button>
<button type="reset" class="btn btn-ghost">Limpiar</button>
<button type="button" class="btn btn-ghost">Cancelar</button>
```

## Accesibilidad

- `<button>` para acciones, `<a>` para navegación. Un `<div class="btn">` no es enfocable ni responde al teclado.
- `type` explícito: dentro de un `<form>`, un botón sin `type` es `submit` por defecto y manda el formulario sin querer.
- El área de toque: `.btn-sm` mide ~31px de alto. Menos de 44px falla la recomendación táctil en móvil.
- Con `.btn-loading`, sumá `aria-busy="true"`.
- No pongas dos botones primarios lado a lado: compiten. Uno primario y el resto outline o ghost.

## Qué sigue

- [Grupo de botones](/components/button-group.html)
- [Badges](/components/badges.html)
- [Foco ring](/helpers/focus-ring.html)