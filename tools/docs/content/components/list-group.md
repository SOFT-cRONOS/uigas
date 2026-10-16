# List group

> Lista de superficie con divisores hairline. Cada item es flexible: soporta enlaces, botones y contenido arbitrario.

## Básico

```html
<div class="list-group" id="lg">
  <a href="#" class="list-group-item list-group-item-action active" aria-current="true">Córdoba</a>
  <a href="#" class="list-group-item list-group-item-action">Rojas</a>
  <a href="#" class="list-group-item list-group-item-action">Termas</a>
</div>
```

`active` + `aria-current="true"`: el activo queda con fondo `--uig-red-slab` y texto blanco.

## Con badges

```html
<a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
  <span>Córdoba</span>
  <span class="badge badge-soft badge-soft-success">DISPONIBLE</span>
</a>
```

## Con estado deshabilitado

```html
<a href="#" class="list-group-item list-group-item-action disabled">Rojas</a>
```

`.disabled` en un `<a>` **no deshabilita nada**: sigue siendo un enlace con tabindex y sigue siendo clicable. Bootstrap aplica `pointer-events: none`, que bloquea el clic pero no el teclado. Para deshabilitar de verdad:

```html
<a href="#" class="list-group-item list-group-item-action disabled"
   aria-disabled="true" tabindex="-1">Rojas</a>
```

> Ojo: `.list-group-item` y `.list-group` son de Bootstrap. UiGas reescribe el contenedor `.list-group` (los `--bs-list-group-*`), no el item. El fondo, el radio y los colores del item vienen de las variables que UiGas define en el padre.

## Con checkbox

```html
<div class="list-group">
  <label class="list-group-item d-flex gap-2 align-items-start">
    <input class="form-check-input flex-shrink-0 mt-1" type="checkbox" checked>
    <div>
      <div class="fw-semibold">Casco homologado</div>
      <div class="small text-muted">Obligatorio para todas las categorías</div>
    </div>
  </label>
</div>
```

## Con contenido enriquecido

```html
<div class="list-group">
  <div class="list-group-item">
    <div class="d-flex w-100 justify-content-between">
      <h6 class="mb-1">M. Rossi</h6>
      <small class="text-muted">1:32.480</small>
    </div>
    <p class="mb-1">58 vueltas · mejor en la 41.</p>
    <small class="badge badge-soft badge-soft-primary">PODIO</small>
  </div>
</div>
```

## Personalizado

```html
<div class="list-group">
  <div class="list-group-item list-group-item-action active">
    <div class="d-flex w-100 justify-content-between">
      <h6 class="mb-1">Falta de paso</h6>
      <span class="badge badge-soft badge-soft-danger">5.2 s</span>
    </div>
    <small class="text-muted">Vueltas 41 a 43</small>
  </div>
</div>
```

## UiGas en la lista

```scss
--bs-list-group-bg:            var(--uig-surface);
--bs-list-group-border-color:  var(--uig-line);
--bs-list-group-border-radius: var(--bs-border-radius-lg);
--bs-list-group-active-bg:     var(--uig-red-slab);
--bs-list-group-active-color:  #ffffff;
--bs-list-group-disabled-bg:   var(--uig-bg-deep);
--bs-list-group-action-hover-bg: rgba(249, 33, 33, 0.08);
```

El hover del item es un tinte rojo al 8%, no el gris de Bootstrap. Es la señal que conecta la lista con el resto del framework: el hover de un item y el de un botón se sienten de la misma familia.

> En tema claro ese tinte al 8% es muy tenue. Es coherente con `.dropdown-item`, que usa el mismo valor.

## Accesibilidad

- El `list-group` es una `<div>` o `<ul>`; **no** usa roles de lista por defecto. Si los items son enlaces entre sí y el orden importa, un `<ul>` con `<li>` es más correcto que un div de enlaces sueltos.
- El estado activo necesita `aria-current`, no solo la clase.
- `.disabled` en un enlace requiere `aria-disabled="true"` **y** sacarlo del orden de tabulación.
- Un item que hace algo debería ser un `<button>` o un enlace, no un `<div>` con un manejador.

## Qué sigue

- [Badges](/components/badges.html)
- [Dropdown](/components/dropdowns.html)