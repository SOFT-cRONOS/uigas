# Collapse

> El motor que hay detrás del acordeón, la navbar y el offcanvas. Es de Bootstrap y UiGas no lo reescribe.

## Un collapse

```html
<button class="btn btn-outline-secondary" type="button"
        data-bs-toggle="collapse" data-bs-target="#demo"
        aria-expanded="false" aria-controls="demo">
  Mostrar detalle
</button>

<div class="collapse" id="demo">
  <div class="card card-body">
    <strong>1.032 CV</strong> a 8.500 rpm.
  </div>
</div>
```

## Horizontal

```html
<div class="collapse collapse-horizontal" id="h" data-bs-parent="#hw">
  <div class="collapse-body bg-body-tertiary">
    <strong>Visible al desplegar</strong>
  </div>
</div>
```

`collapse-horizontal` es de Bootstrap. Requiere que el contenedor tenga altura o ancho definidos, si no no se ve nada.

## Multi-colapso

```html
<div class="collapse" id="a">
  <div class="collapse" id="b">
    <div class="collapse" id="c">
      <div class="collapse-body">Tres niveles.</div>
    </div>
  </div>
</div>
```

Cada nivel necesita su disparador. `.collapse` anidado sin disparador propio no se abre solo.

## Automático

```html
<div class="collapse" id="au">
  <div class="collapse-body">Se abre al cargar la página.</div>
</div>
```

Con `data-bs-parent` en un `.accordion` y sin disparador, el panel se despliega con el resto.

## Clases del plugin

| Clase | Cuándo |
|---|---|
| `.collapse` | oculto |
| `.show` | visible |
| `.collapsing` | durante la transición |
| `.collapse.show` | visible |

`.collapsing` está en el DOM durante la animación: si un selector tuyo apunta a `.collapse` sin `:not(.collapsing)`, puede.capturear a mitad de transición.

## Transiciones en tema claro

> Bootstrap anima `height` de 0 a su valor final. La duración y el easing son los de Bootstrap (`0.35s ease`). UiGas no los cambia en el acordeón más allá de `--bs-accordion-transition: all 0.2s ease`.
>
> `.collapse-horizontal` anima `width`, que **no tiene transición por defecto** en muchos navegadores: hay que declararla.

```html
<style>
  .collapse-horizontal { transition: width .35s ease; }
</style>
```

## Accesibilidad

- El disparador necesita `aria-expanded` y `aria-controls`.
- `aria-controls` apunta al `id` del panel: es lo que permite a un lector de pantalla saltar directo.
- El contenido oculto con `.collapse` (sin `.show`) tiene `display: none`: no se encuentra buscándolo en la página. Para contenido importante, considera no ocultarlo.
- Con varios disparadores sobre el mismo panel, todos necesitan conocer el estado: `aria-expanded` hay que actualizarlo en el `shown.bs.collapse` y en el `hidden.bs.collapse`.

## Sin JavaScript

Todo lo de esta página depende de `bootstrap.bundle.js`. Sin él:

- los botones no hacen nada,
- un panel con `.show` en el HTML **se ve abierto**,
- un panel sin `.show` queda oculto para siempre.

Esa última es la trampa: si el JS falla, el contenido sigue ahí pero invisible. Para contenido crítico, la alternativa sin JS es `<details>` + `<summary>`.

## Qué sigue

- [Acordeón](/components/accordion.html)
- [Offcanvas](/components/offcanvas.html)
- [Navbar](/components/navbar.html)