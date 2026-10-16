# Tooltips

> Caja de `--uig-surface-2` con borde `--uig-line-strong` y flecha del mismo color. Oscuro en tema oscuro, con borde en tema claro.

## Básico

```html
<button type="button" class="btn btn-outline-secondary"
        data-bs-toggle="tooltip" data-bs-placement="top"
        title="Última actualización: hace 2 minutos">
  Info
</button>
```

Con el atributo `title` HTML, el tooltip funciona **sin JavaScript**: el navegador lo muestra. No es tan bonito, pero es un fallback real.

> Inicializar con JS:
> ```js
> document.querySelectorAll('[data-bs-toggle="tooltip"]')
>   .forEach(function (el) { new bootstrap.Tooltip(el); });
> ```

## Contenido

```html
<button data-bs-toggle="tooltip" data-bs-placement="bottom"
        data-bs-title="Vueltas quick lap del Auto 7.">
  ⓘ
</button>
```

`data-bs-title` tiene prioridad sobre `title`. Si están los dos, el `title` nativo puede aparecer además y duplicar el texto.

## Posiciones

```html
<div class="d-flex gap-2">
  <button class="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Arriba">Top</button>
  <button class="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Abajo">Bottom</button>
  <button class="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="start" data-bs-title="Izquierda">Start</button>
  <button class="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="end" data-bs-title="Derecha">End</button>
</div>
```

En la página de esta doc: **top** y **start** no se ven, porque la caja recortaría el borde superior e izquierdo. `auto` (el default de Bootstrap) repositiona para evitarlo.

## Contenedor

```html
<div class="tooltip" id="t" role="tooltip">
  <div class="tooltip-arrow"></div>
  <div class="tooltip-inner">…</div>
</div>
```

`.tooltip-inner`, `.tooltip-arrow` y los cuatro `.bs-tooltip-*` son de UiGas.

## UiGas

```scss
.tooltip-inner {
  background-color: var(--uig-surface-2);
  color:            var(--uig-text);
  border:           1px solid var(--uig-line-strong);
  font-size:        0.85rem;
  font-weight:      500;
}
```

> **El tooltip de UiGas es un cambio de fondo, no un overlay.** Bootstrap usa negro con texto blanco y la flecha del mismo negro. UiGas invierte el modelo: superficie elevada, texto del tema, borde visible.
>
> La razón es que el tooltip no es un modal: informa, no bloquea. Un negro puro encima de una superficie oscura se lee como un agujero. Con `--uig-surface-2` el tooltip pertenece a la misma página.
>
> En tema claro queda `#e6e7eb` con texto `#2a2a2a`: la caja **se distingue por el borde**, no por el fondo. El borde es el que hace el trabajo.

## Accesibilidad

Este es el punto crítico de la página, y la razón por la que muchos equipos evitan los tooltips:

- **Un tooltip no es accesible con teclado por defecto.** Bootstrap 5.3 muestra el tooltip con `focus` solo si el elemento es enfocable. En un `<span>` o un `<i>`, no lo es: nunca se muestra con Tab.
- Por eso la regla es: **el disparador tiene que ser un `<button>` o un enlace**, con `tabindex="0"` si no lo es. Un tooltip sobre un ícono decorativo necesita un botón envolviendo al ícono.
- El texto no puede estar **solo** en el tooltip. Si es información necesaria, va en el contenido visible o en un `aria-describedby` apuntando a un elemento oculto.
- Bootstrap genera `role="tooltip"` y lo conecta con `aria-describedby` al mostrarlo: eso ya lo hace bien.

## Cuándo no usarlo

- **Para contenido importante.** Es invisible hasta que alguien hace hover o Tab, y no sobrevive a una impresión.
- **En móvil.** No hay hover; el tooltip aparece y desaparece al tocar. En táctil, un tooltip debería ser un popover o algo persistente.
- **Dentro de una tabla o lista larga.** El tooltip se reposiciona con Popper en cada scroll y puede parpadear.
- Para contenido que necesita interacción, es un [popover](/components/popovers.html).

## Qué sigue

- [Popovers](/components/popovers.html)
- [Botones](/components/buttons.html)
- [Accesibilidad de formularios](/forms/accessibility.html)