# Acordeón

> Superficie elevada, borde `--uig-line`, y la sección abierta se tiñe de rojo al 6%. El chevron es propio: gris cerrado, rojo abierto.

## Básico

```html
<div class="accordion" id="acc">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#p1">
        ¿Cómo se abona?
      </button>
    </h2>
    <div id="p1" class="accordion-collapse collapse show" data-bs-parent="#acc">
      <div class="accordion-body">Hasta 48 h antes de la fecha.</div>
    </div>
  </div>
</div>
```

## Elementos

| Clase | Rol |
|---|---|
| `.accordion` | contenedor: define todos los tokens a la vez |
| `.accordion-item` | cada bloque |
| `.accordion-header` | wrapper del botón |
| `.accordion-button` | el disparador — **debe ser `<button>`** |
| `.accordion-collapse` | el panel |
| `.accordion-body` | el contenido |

`.accordion-item`, `.accordion-collapse` y `.accordion-body` son de Bootstrap. UiGas reescribe `.accordion` (los `--bs-accordion-*`) y `.accordion-button`.

## Personalización

```html
<div class="accordion accordion-flush" id="acc2">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
        Reglamento
      </button>
    </h2>
    <div id="q1" class="accordion-collapse collapse" data-bs-parent="#acc2">
      <div class="accordion-body">…</div>
    </div>
  </div>
</div>
```

`accordion-flush` quita el borde exterior y el radio. Con eso queda como lista divisoria.

> `.collapsed` en el botón de un panel cerrado es obligatorio: es la clase que Bootstrap usa para rotar el chevron y poner el texto atenuado. Sin ella el panel cerrado se ve como abierto.

## Siempre abierto

```html
<div class="accordion" id="acc3">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#r1">
        Contacto
      </button>
    </h2>
    <div id="r1" class="accordion-collapse collapse" data-bs-parent="#acc3">
      <div class="accordion-body">…</div>
    </div>
  </div>
</div>
```

`always-open` es de Bootstrap: con el mismo `data-bs-parent`, abrir un panel no cierra los demás.

## Múltiples abiertos

```html
<div class="accordion" id="acc4">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#s1">Uno</button>
    </h2>
    <div id="s1" class="accordion-collapse collapse" data-bs-parent="#acc4"><div class="accordion-body">…</div></div>
  </div>
</div>
```

Sin `data-bs-parent`, cada panel se comporta independiente.

## UiGas en el botón

```scss
--bs-accordion-btn-color:        var(--uig-text);
--bs-accordion-btn-bg:           var(--uig-surface);
--bs-accordion-active-color:     var(--uig-red);
--bs-accordion-active-bg:        rgba(249, 33, 33, 0.06);
--bs-accordion-btn-focus-box-shadow: 0 0 0 3px rgba(249, 33, 33, 0.2);
```

- cerrado → texto `--uig-text`, chevron `#a1a1aa`
- abierto → texto `--uig-red`, fondo con tinte rojo al 6%, chevron rojo

> El chevron es un data-URI propio (no el de Bootstrap): `%23a1a1aa` cerrado y `%23f92121` abierto. Con `--uig-red` adaptativo, en tema claro el chevron abierto queda en `#b30500` sobre el tinte `#f92121` al 6% de una superficie clara. Se lee, pero el rojo abierto no cambia con el tema porque está fijo en la imagen embebida — igual que la flecha del [select](/forms/select.html).

## Accesibilidad

- El disparador **es un `<button>`**: necesita ser enfocable y responder a Enter y Espacio. Un `<div>` con la clase no lo es.
- Cada `.accordion-header` debe ser un heading (`h2`, `h3`… según el nivel de la página). Es lo que permite saltar de sección con el teclado o el lector de pantalla.
- `aria-expanded` lo pone Bootstrap. No lo dupliques a mano.
- Los paneles cerrados con `collapse` (sin `show`) están ocultos para el lector: `display:none`. Correcto para ahorro de contexto, pero significa que el texto no se encuentra con la búsqueda del navegador.

## Qué sigue

- [Collapse](/components/collapse.html)
- [Botones](/components/buttons.html)