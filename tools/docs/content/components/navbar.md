# Navbar

> Fondo translúcido con blur, borde inferior hairline. `.brandmark` es la extensión de UiGas para la marca. Colapsa en `lg`.

## Completa

```html
<nav class="navbar navbar-expand-lg">
  <div class="container">
    <a class="navbar-brand brandmark" href="#">Ui<span>Gas</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#nav" aria-controls="nav" aria-expanded="false"
            aria-label="Abrir menú">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Temporada</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Pilotos</a></li>
      </ul>
      <span class="badge badge-soft badge-soft-danger">EN VIVO</span>
      <a href="#" class="btn btn-primary btn-sm">Inscribirse</a>
    </div>
  </div>
</nav>
```

## `.brandmark`

Propia de UiGas. Marca en Korataki itálica, con el "Gas" en rojo de marca:

```html
<a class="navbar-brand brandmark" href="#">Ui<span>Gas</span></a>
```

> La tipografía es `--uig-font-brand`: Korataki con `local()`, fallback Barlow Condensed 900 itálica. Como el logo real usa la fuente instalada, el `brandmark` en texto **no** usa la imagen del logo — es el mismo tratamiento tipográfico. Para el logo real: un `<img>` con su `alt`.

## `.nav-item-custom`

Para items con etiqueta propia —un botón de acción, un estado:

```html
<ul class="navbar-nav">
  <li class="nav-item-custom"><a class="nav-link" href="#">Cronograma</a></li>
  <li class="nav-item-custom"><a class="nav-link" href="#">Resultados</a></li>
</ul>
```

`.nav-item-custom` es propia de UiGas. `.nav-item` es de Bootstrap. La diferencia no es de estilo sino semántica en la lectura: el item de acción se separa del grupo de navegación sin necesidad de un separador visible.

## Fondo

```scss
--uig-nav-bg: rgba(20, 20, 20, 0.9);   /* tema oscuro */
```

Con `backdrop-filter: blur(10px)` y un `border-bottom` de `--uig-line`. El contenido que pasa por debajo se ve difuminado.

> En tema claro la opacidad es `0.9` sobre la base: la navbar es casi opaca y el blur apenas se nota. Funciona, pero pierde el efecto de vidrio. Si querés el mismo efecto en claro, bajá la opacidad a 0.75 y subí el contraste del texto.

## Colapso

```html
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav"
        aria-controls="nav" aria-expanded="false" aria-label="Abrir menú">
```

`navbar-expand-lg` define el punto en que deja de colapsar. `navbar-expand` lo hace siempre horizontal.

> La hamburguesa de Bootstrap es un SVG con trazo blanco fijo. UiGas lo reemplaza con su propio SVG en `rgba(24,24,27,.8)` para tema claro — un detalle que evita el icono invisible.

## Fija arriba

```html
<nav class="navbar navbar-expand-lg fixed-top">
```

UiGas no lo reescribe: `fixed-top` y `sticky-top` son de Bootstrap. Con `fixed-top` necesitás padding en el `body`, o el contenido queda debajo:

```html
<style>
  body { padding-top: 4rem; }
</style>
```

## Colores

`.navbar-dark` y `.navbar-light` son de Bootstrap. Con `navbar-expand-lg`, el comportamiento por defecto cambia según la caja:

- **con** `.navbar-expand-lg`: `navbar-light` siempre
- **sin** él: el color se decide en JS según el fondo

Si usás la navbar con superficie oscura del framework, conviene poner `data-bs-theme="dark"` en el `<nav>` y `navbar-light`:

```html
<nav class="navbar navbar-expand-lg" data-bs-theme="dark">
```

Así los `.nav-link` y el `.navbar-brand` toman los colores del tema oscuro sin pelearse con el tema de la página.

## `.top-bar` y `.app-*`

UiGas trae un layout de aplicación completo para paneles:

```html
<div class="app-wrapper">
  <aside class="app-sidebar">
    <div class="sidebar-header">CVR 2027</div>
    <nav class="app-content">…</nav>
    <div class="sidebar-footer">v1.0.0</div>
  </aside>
  <main class="app-main">
    <div class="top-bar"><h1 class="top-bar">Circuito</h1></div>
    <div class="app-content">…</div>
  </main>
</div>
```

> Estos **no** son navbar: son un shell de aplicación con sidebar fijo. Se documentan en [Componentes UiGas](/extend/components.html).

## Accesibilidad

- `navbar` con un `<a class="navbar-brand">` es el enlace "volver al inicio". Sin él, no hay forma de volver.
- El `navbar-toggler` necesita `aria-controls` apuntando al `id` del collapse y `aria-expanded` (lo mantiene Bootstrap).
- En móvil, el menú colapsado usa `collapse` sin `show`: su contenido está en `display: none` y no se encuentra buscándolo. Aceptable para navegación, no para contenido informativo.
- `aria-current="page"` en el link activo.
- Marca de salto al contenido principal (`<main id="main">`) antes del `nav`: en el layout de la doc hay una.

## Qué sigue

- [Navs y tabs](/components/navs-tabs.html)
- [Dropdowns](/components/dropdowns.html)
- [Componentes UiGas](/extend/components.html) — `.app-*`, `.stat-*`