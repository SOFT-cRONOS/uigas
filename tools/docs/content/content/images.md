# Imágenes

> UiGas no redefine `.img-fluid`, `.rounded` ni los tamaños responsive de Bootstrap. Lo único que agrega es `.img-thumbnail`: un marco con la misma línea que el resto del framework.

## Responsive

`.img-fluid` es de Bootstrap y hace lo habitual: `max-width: 100%; height: auto`.

```html
<img src="auto.jpg" class="img-fluid" alt="Cuatrimoto en boxes">
```

SinConstraints, una imagen más ancha que su contenedor desborda la página. Agregá `.img-fluid` siempre que la imagen no tenga tamaño fijo.

## `.img-thumbnail`

Este sí es de UiGas. Aplica la superficie y la línea del tema:

```html
<img src="piloto.jpg" class="img-thumbnail" alt="Retrato del piloto">
```

El marco usa `--uig-surface` de fondo y `--uig-line` de borde, así que se adapta al tema sin reglas extra. Es la variante que encaja con una card; la imagen sola sobre la página se ve mejor sin marco.

## Formas

Bootstrap mantiene `.rounded`, `.rounded-circle`, `.rounded-top` y los `rounded-{top|end|bottom|start}-{0|1|2|3|4|5}`. UiGas no los toca.

```html
<img src="escudo.png" class="rounded-circle" alt="Escudo del club">
```

> Recordá que los radios de Bootstrap apuntan a `--bs-border-radius*`, y UiGas reescribió esa escala a valores chicos (2–8px). Un `.rounded-circle` sigue siendo un círculo porque usa `50%`, pero un `.rounded` sale mucho menos redondeado que en Bootstrap stock: 3px en vez de 4px, y `--bs-border-radius-lg` de UiGas es 4px.

## Relación de aspecto

`.ratio` y `.ratio-16x9` son de Bootstrap. Útil para reservar espacio y evitar el salto de layout cuando carga la imagen:

```html
<div class="ratio ratio-16x9">
  <img src="circuito.jpg" class="img-fluid" alt="Vista aérea del circuito">
</div>
```

## Fondos

`.bg-body`, `.bg-body-secondary` y `.bg-body-tertiary` son de Bootstrap, pero en UiGas apuntan a la cadena de superficies del tema: `bg` → `surface` → `surface-2`. Es la forma correcta de poner una imagen sobre un fondo que acompaña al tema sin nombrar un color.

```html
<div class="bg-body-secondary rounded p-4">
  <img src="podio.jpg" class="img-fluid rounded" alt="Podio de la fecha">
</div>
```

## Accesibilidad

- El `alt` es obligatorio. Si la imagen es puramente decorativa, `alt=""` y no la enlaces.
- No transmitas información solo por color en el `alt`: describe, no etiquetes.
- Para imágenes con texto encima, asegurate de que tenga contraste — ponle una superficie debajo, no la dejes sobre la foto cruda.

```html
<img src="chapa.png" class="img-fluid" alt="Chapa del Auto 7">
<img src="textura.png" class="img-fluid" alt="">
```

## Rendimiento

- `loading="lazy"` en todo lo que esté bajo el primer pantallazo.
- `width` y `height` siempre, para reservar espacio y evitar el CLS.
- `srcset` con variantes para pantallas densas: es donde más se gana en móvil.

```html
<img src="circuito-800.jpg"
     srcset="circuito-800.jpg 800w, circuito-1600.jpg 1600w"
     sizes="(max-width: 768px) 100vw, 800px"
     width="1600" height="900"
     loading="lazy" decoding="async"
     class="img-fluid"
     alt="Vista aérea del circuito">
```

## Qué sigue

- [Figuras](/content/figures.html)
- [Color y fondo](/helpers/color-background.html) — las utilidades `bg-*`