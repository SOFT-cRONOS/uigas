# Paginación

> Números con `.page-link`. El activo usa el slab rojo con texto blanco; el resto es superficie con borde hairline.

## Básico

```html
<nav aria-label="Página">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
    </li>
    <li class="page-item active" aria-current="page">
      <a class="page-link" href="#">1</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Siguiente</a>
    </li>
  </ul>
</nav>
```

## Con los dos lados

```html
<nav aria-label="Página">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled"><a class="page-link" href="#" tabindex="-1">Anterior</a></li>
    <li class="page-item active" aria-current="page"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
  </ul>
</nav>
```

`pagination-lg` y `pagination-sm` son de Bootstrap. UiGas reescribe `.pagination` (los `--bs-pagination-*`) y `.page-link`.

## Elipsis

```html
<li class="page-item disabled">
  <a class="page-link" href="#" tabindex="-1">…</a>
</li>
```

## En tema claro

> `.page-link` de Bootstrap usa `--bs-pagination-color` y `--bs-pagination-border-color`, con valores fijos. UiGas los redefine a tokens, así que el número inactivo toma `--uig-text` y `--uig-line`, y se adapta solo. El activo es `--bs-pagination-active-bg: var(--uig-red-slab)` con texto blanco: legible en los dos temas.

Lo que **no** está redefinido es `.page-item.disabled .page-link`: queda con `--bs-pagination-disabled-color` y `--bs-pagination-disabled-bg` de Bootstrap. Se lee, pero es el único eslabón de la tira con otro origen.

## Con etiquetas

```html
<ul class="pagination">
  <li class="page-item"><span class="page-link">58 filas</span></li>
  <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
</ul>
```

Un `<span class="page-link">` dentro de un `<li>` sin `.page-item` da un elemento que no es ni botón ni enlace: informacional.

## Accesibilidad

- El contenedor es `<nav>` con `aria-label="Página"` — si hay más de un `<nav>`, sin el label no se distinguen.
- La página activa lleva `aria-current="page"`. `.active` es solo visual.
- `.disabled` necesita `tabindex="-1"` **y** `aria-disabled="true"`. Con `pointer-events: none` el clic se bloquea pero el teclado sigue llegando al enlace: es un enlace activo que no hace nada.
- Cada `.page-link` necesita un nombre accesible. "Siguiente" y "…" ("Anterior") están bien; un número desnudo también.
- Una fila de más de 7 páginas es mucho Tab. `…` no es un destino: es un `.page-item.disabled` con elipsis como texto.

## Consideraciones de uso

- Mostrá siempre: **primera, última, actual ±1, y las flechas**. El resto, `…`.
- El número total de páginas importa menos que la posición. "¿Página 47 de 312?" es la pregunta real.
- En tablas con filtro, la paginación y el filtro se borran entre sí: al cambiar el filtro hay que volver a la página 1.

## Qué sigue

- [List group](/components/list-group.html)
- [Tablas](/content/tables.html) — el par más común