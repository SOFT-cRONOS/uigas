# Tarjetas

> Superficie elevada con borde hairline. Al hover se eleva. `.card-featured` es la extensión de UiGas: borde de marca y una línea roja de 2px arriba.

## Básica

```html
<div class="card">
  <div class="card-header">Temporada 2027</div>
  <div class="card-body">
    <h5 class="card-title">Gran Premio de Córdoba</h5>
    <p class="card-text">Cuarta fecha del campeonato. 12 de abril.</p>
    <a href="#" class="btn btn-outline-secondary btn-sm">Ver detalle</a>
  </div>
  <div class="card-footer">Última actualización hace 2 h</div>
</div>
```

## Sin encabezado ni pie

```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Sanciones</h5>
    <p class="card-text mb-0">Ninguna abierta al momento.</p>
  </div>
</div>
```

## `.card-featured`

Propia de UiGas. Para el elemento destacado de una vista:

```html
<div class="card card-featured">
  <div class="card-body">
    <span class="badge badge-soft badge-soft-primary mb-2">PRÓXIMA FECHA</span>
    <h5 class="card-title">Córdoba</h5>
    <p class="card-text">12 de abril · 1.032 CV</p>
    <a href="#" class="btn btn-primary btn-sm">Inscribirse</a>
  </div>
</div>
```

Qué cambia:

- borde a `rgba(249,33,33,.55)` en reposo → `--uig-red` al hover
- un `::before` de 2px en el borde superior, en rojo de marca
- sombra más profunda, y `--uig-glow-red` al hover

> El `::before` está posicionado en `absolute` con `left:0; right:0` y `pointer-events: none`. Sin esa última línea el pseudo-elemento **intercepta los clics** del contenido de la card. Es un detalle fácil de olvidar al reproducir el patrón.

> La línea roja no se repliega en tema claro y usa `--uig-red`, que en claro es `#b30500`. Se ve contra la superficie `#f0f0f3` a 6.3:1.

## Con imagen

```html
<div class="card">
  <span class="ex-img" role="img" aria-label="Podio">Podio</span>
  <div class="card-body">
    <h5 class="card-title">Fecha 3</h5>
    <p class="card-text">Podio de la fecha anterior.</p>
  </div>
</div>
```

En producción: `<img src="…" class="card-img-top" alt="…">`. `.card-img-top` y `.card-img-bottom` son de Bootstrap.

> **Las imágenes de la card son un punto ciego real del tema claro.** `.card-body` usa `--uig-surface` (`#f0f0f3`) y la imagen se apoya justo encima con el texto pegado al borde. Si la foto es clara, el texto se pierde contra el borde inferior. Mismo problema en `.card-footer`. Es una de las razones por las que la superficie clara dejó de ser blanco puro.

## Grupo de tarjetas

```html
<div class="row g-3">
  <div class="col-md-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">M. Rossi</h5>
        <p class="card-text mb-0">58 vueltas · 1:32.480</p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card h-100">…</div>
  </div>
</div>
```

`h-100` es de Bootstrap. Sin él, en una fila las cards se estiran a la altura de la más alta — que es exactamente lo que querés.

## Tarjeta horizontal

```html
<div class="card">
  <div class="row g-0">
    <div class="col-md-4">
      <span class="ex-img" role="img" aria-label="Circuito">Circuito</span>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Autódromo</h5>
        <p class="card-text mb-0">4.200 m · 12 curvas</p>
      </div>
    </div>
  </div>
</div>
```

`g-0` quita el gutter para que la imagen toque el borde de la card.

## Accesibilidad

- Una card que lleva a otra página: el enlace es el **título**, no un botón suelto.

```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title"><a class="stretched-link" href="#">Córdoba</a></h5>
    <p class="card-text">12 de abril</p>
  </div>
</div>
```

- `.stretched-link` (de Bootstrap) hace que toda la card sea clicable. **Va en el elemento que lleva el enlace**, con `position: relative` en el padre; por eso la card necesita esa utilidad.
- Con `stretched-link`, el enlace único debe ser el título. Si hay otros enlaces dentro, el `stretched-link` los tapa: poné `position: relative` en el que deba seguir funcionando.
- Una card puramente informativa no debería ser clicable. Que el usuario adivine que puede hacer clic cuesta más de lo que aporta.

## Qué sigue

- [Botones](/components/buttons.html)
- [Stretched link](/helpers/stretched-link.html)
- [Badges](/components/badges.html)