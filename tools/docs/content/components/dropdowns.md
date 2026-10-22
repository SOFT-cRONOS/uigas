# Dropdowns

> Menú flotante sobre `--uig-surface`, borde `--uig-line`, radio chico y tipografía de UI (13px). El item se tiñe de rojo al hover; el activo va sobre el rojo de marca.

## Básico

```html
<div class="dropdown">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button"
          data-bs-toggle="dropdown" aria-expanded="false">
    Opciones
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Editar perfil</a></li>
    <li><a class="dropdown-item" href="#">Cambiar contraseña</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
  </ul>
</div>
```

## Con encabezado

```html
<ul class="dropdown-menu">
  <li><h6 class="dropdown-header">Circuitos</h6></li>
  <li><a class="dropdown-item" href="#">Córdoba</a></li>
</ul>
```

`.dropdown-header` y `.dropdown-divider` son de Bootstrap. UiGas los reescribe en color (`--uig-text-muted` y `--uig-line`).

## Alineado

```html
<div class="dropdown">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Derecha</button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="#">Alineado al borde derecho</a></li>
  </ul>
</div>
```

- `dropdown-menu-end` — a la derecha del botón
- `dropdown-menu-start` — a la izquierda
- `dropup` — hacia arriba

Los cuatro son de Bootstrap.

## Split button

```html
<div class="btn-group">
  <button type="button" class="btn btn-primary">Guardar</button>
  <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Abrir menú</span>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Guardar y duplicar</a></li>
  </ul>
</div>
```

El `dropdown-toggle-split` recorta la flecha del borde. El `<span class="visually-hidden">` es **necesario**: el botón no tiene texto visible.

## Colocación automática

```html
<div class="dropdown">
  <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside">
    Con auto-cierre
  </button>
  <ul class="dropdown-menu">…</ul>
</div>
```

`data-bs-auto-close` acepta `true`, `false`, `inside` u `outside`. Con `true` (el default), el menú se cierra al hacer clic en cualquier lado — incluso dentro del propio menú, lo que rompe los items con acción.

## Menú dentro de una navbar

El menú hereda el fondo de la navbar si el contenedor tiene `.navbar-nav`:

```html
<nav class="navbar navbar-expand-lg">
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Temporada</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">2027</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

## UiGas en el menú

```scss
--bs-dropdown-font-size:          0.8125rem;
--bs-dropdown-item-padding-y:     0.35rem;
--bs-dropdown-link-hover-bg:      rgba(239, 29, 36, 0.1);
--bs-dropdown-link-active-bg:     var(--uig-red-slab);
```

- item en hover → fondo rojo al 10%, texto `--uig-heading`
- item activo → fondo `--uig-red-slab`
- item con foco de teclado → outline rojo de 2px
- item deshabilitado → texto `--uig-text-muted` al 55%

> En tema claro el tinte rojo al 10% sobre `#f0f0f3` es casi imperceptible: el hover se nota poco más que un gris. El mismo patrón que en `.list-group-action-hover-bg`. Funciona —el activo sí se distingue— pero el hover es más tímido en claro que en oscuro.

## Accesibilidad

- El disparador necesita `aria-expanded`; Bootstrap lo mantiene solo.
- `aria-label="Abrir menú"` en el split button, que no tiene texto.
- `.dropdown-header` es un `<h6>` dentro de un `<li>`: es un heading real, lo que permite saltar al grupo con el teclado.
- El menú abre con `Escape` y devuelve el foco al disparador. Bootstrap lo resuelve.
- El componente `uig-select` usa este mismo menú para reemplazar el popup nativo de un `<select>`: ver [Select](/forms/select.html).

## Qué sigue

- [Navbar](/components/navbar.html)
- [Botones](/components/buttons.html)