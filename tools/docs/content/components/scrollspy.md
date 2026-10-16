# Scrollspy

> Marca el link de navegación correspondiente a la sección visible mientras el usuario scrollea. Es de Bootstrap; UiGas no lo reescribe.

## Básico

```html
<div class="row">
  <div class="col-3">
    <nav id="spy" class="nav flex-column nav-pills">
      <a class="nav-link active" href="#seccion-1">Sección 1</a>
      <a class="nav-link" href="#seccion-2">Sección 2</a>
    </nav>
  </div>
  <div class="col-9">
    <div data-bs-spy="scroll" data-bs-target="#spy" data-bs-smooth-scroll="true" tabindex="0">
      <h5 id="seccion-1">Sección 1</h5>
      <p>Contenido…</p>
      <h5 id="seccion-2">Sección 2</h5>
      <p>Contenido…</p>
    </div>
  </div>
</div>
```

## Requisitos

Tres cosas, y las tres son obligatorias:

1. **Un contenedor con `data-bs-spy="scroll"`.**
2. **Links que apuntan a `id`s dentro del contenedor.** `data-bs-target` es el selector del nav.
3. **`tabindex="0"` en el contenedor.** Sin él, el scrollspy no se inicializa si no hay nada enfocable dentro. Es el error más común y falla en silencio.

## Offset

```html
<div data-bs-spy="scroll" data-bs-target="#spy" data-bs-offset="80">
```

Con navbar fija, el cálculo por defecto pone el heading de la sección **debajo** de la navbar. `data-bs-offset` corrige el margen:

```css
/* el valor debe coincidir con la altura real de la navbar */
:root { --nav-h: 58px; }
[data-bs-spy] { scroll-margin-top: var(--nav-h); }
```

> `data-bs-offset` solo afecta **qué sección se considera activa**. Para que el click en un link no esconda el título detrás de la navbar, lo que hace falta es `scroll-margin-top` en CSS. Son dos problemas distintos y la documentación de Bootstrap los mezcla.

## Con navbar

```html
<div class="d-flex">
  <nav id="navSpy" class="navbar navbar-vertical flex-column">
    <a class="nav-link" href="#s1">Uno</a>
    <a class="nav-link" href="#s2">Dos</a>
  </nav>
  <div data-bs-spy="scroll" data-bs-target="#navSpy" data-bs-smooth-scroll="true"
       data-bs-spy-scroll-offset="80" tabindex="0" class="p-3 overflow-auto" style="height: 30rem;">
    <h6 id="s1">Uno</h6>
    <p>…</p>
    <h6 id="s2">Dos</h6>
    <p>…</p>
  </div>
</div>
```

`data-bs-spy-scroll-offset` es la variante del atributo cuando el contenedor **también** scrollea (tiene `overflow: auto`), que es el caso típico de una página de documentación.

## Con estilos de marca

```html
<nav id="spy2" class="nav flex-column">
  <a class="nav-link active" href="#a">A</a>
</nav>
```

UiGas no define un estilo de scrollspy propio. El link activo toma `.nav-link.active`, que en tema claro usa `--uig-red` como color: se ve en los dos temas.

> Para una columna lateral de índice, el patrón más común no es scrollspy sino una lista de links con `.active` que se gestiona con un `IntersectionObserver`. Scrollspy de Bootstrap recalcula posiciones en cada scroll y en contenedores con muchas secciones se nota.

## Accesibilidad

- `tabindex="0"` en el contenedor, además de hacer que funcione: hace que la región sea alcanzable por teclado. Sin él, quien navega solo con Tab no puede scrollear la zona.
- El link activo necesita `aria-current="true"` o `aria-current="location"`. Scrollspy **no** lo agrega: depende de vos.
- El contenedor es un `div` con contenido variable. Si es navegación real, un `<nav>` con una lista sería más correcto.
- `data-bs-smooth-scroll` usa scroll-behavior que respeta `prefers-reduced-motion` en los navegadores modernos. Si hacés scroll suave a mano con JS, tenés que respetarlo vos.

## Depende de JS

Sin `bootstrap.bundle.js`, los links **navegan** (es un `href="#id"` normal) pero nada se marca como activo. Es el comportamiento más elegante posible: el sitio sigue siendo navegable, solo se pierde la guía visual.

## Qué sigue

- [Navs y tabs](/components/navs-tabs.html)
- [Navbar](/components/navbar.html)
- [Stacks](/helpers/stacks.html)