# Navs y tabs

> Tiras de enlaces. UiGas reescribe `.nav-link`, `.nav-pills` y `.nav-tabs`; el comportamiento de pestañas es de Bootstrap.

## Tabs

```html
<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#t1"
            type="button" role="tab" aria-selected="true">General</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#t2"
            type="button" role="tab" aria-selected="false">Documentación</button>
  </li>
</ul>

<div class="tab-content pt-3">
  <div class="tab-pane fade show active" id="t1" role="tabpanel">Contenido de General.</div>
  <div class="tab-pane fade" id="t2" role="tabpanel">Contenido de Documentación.</div>
</div>
```

## Pills

```html
<ul class="nav nav-pills">
  <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Todos</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Pendientes</a></li>
</ul>
```

## Con enlaces

```html
<ul class="nav">
  <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Inicio</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Pilotos</a></li>
</ul>
```

## Tabs verticales

```html
<div class="d-flex">
  <ul class="nav nav-tabs flex-column" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#v1" type="button" role="tab">Uno</button>
    </li>
  </ul>
  <div class="tab-content p-3 flex-grow-1">
    <div class="tab-pane fade show active" id="v1" role="tabpanel">…</div>
  </div>
</div>
```

## UiGas en los links

```scss
.nav-tabs {
  --bs-nav-tabs-border-color:      var(--uig-line);
  --bs-nav-tabs-link-active-color: var(--uig-heading);
  --bs-nav-tabs-link-active-bg:    var(--uig-surface);
  --bs-nav-tabs-link-active-border-color: var(--uig-red) var(--uig-red) var(--uig-surface);
}
.nav-pills {
  --bs-nav-pills-link-active-bg:   var(--uig-red-slab);
  --bs-nav-pills-link-active-color: #ffffff;
}
```

- **tabs**: el activo se destaca con un borde rojo arriba y a los costados. El fondo se funde con el contenido, así que no hay corte.
- **pills**: relleno sólido slab con texto blanco, la misma pareja del botón primario.

> Los tabs usan `var(--uig-red)`, que en tema claro es `#b30500` a 6.3:1 sobre la superficie. El borde se ve en ambos temas sin ajuste adicional: es uno de los pocos casos donde el token adaptativo resuelve solo.

## Con badges

```html
<a class="nav-link active" href="#">Mensajes <span class="nav-badge">4</span></a>
```

`.nav-badge` es propia de UiGas: píldora con fondo slab y texto blanco.

## Fill

```html
<ul class="nav nav-fill">
  <li class="nav-item"><a class="nav-link" href="#">Uno</a></li>
</ul>
```

`nav-fill` y `nav-justified` son de Bootstrap. `nav-fill` reparte el ancho disponible entre los items; `nav-justified` los estira a la misma medida.

## Píldoras en scroll

```html
<div class="nav nav-pills flex-nowrap overflow-auto pb-2"></div>
```

Para listas largas de filtros: `flex-nowrap` + `overflow-auto` las mantiene en una línea con scroll horizontal.

## Accesibilidad

- `role="tablist"` en el contenedor, `role="tab"` en cada botón, `role="tabpanel"` en cada panel.
- `aria-selected` en los botones y `aria-controls` apuntando al panel.
- Exactamente un `.active` y un `.show` al cargar.
- **Las flechas del teclado son de Bootstrap**: ← → mueven entre tabs, `Home`/`End` saltan a los extremos. Solo funcionan si los botones están enfocados.
- `.fade` sin `.show` oculta el panel. Con JS ausente, solo se ve la primera pestaña: la misma trampa que en el [collapse](/components/collapse.html).

## Qué sigue

- [Navbar](/components/navbar.html)
- [Acordeón](/components/accordion.html)
- [Contenido de tabs](/forms/layout.html)