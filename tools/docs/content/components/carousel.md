# Carrusel

> Contenedor de slides con indicadores. Las flechas y los indicadores tienen tratamiento UiGas; el motor de slide es de Bootstrap.

## Básico

```html
<div id="car" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#car" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#car" data-bs-slide-to="1" aria-label="Slide 2"></button>
  </div>

  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="ex-img" role="img" aria-label="Córdoba">Córdoba</div>
      <div class="carousel-caption d-none d-md-block">
        <h5>GP de Córdoba</h5>
        <p>12 de abril · Fecha 4</p>
      </div>
    </div>
    <div class="carousel-item">
      <div class="ex-img" role="img" aria-label="Rojas">Rojas</div>
    </div>
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#car" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#car" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
  </button>
</div>
```

## Elementos

| Clase | Qué es |
|---|---|
| `.carousel` | contenedor + sincronización de hijos |
| `.carousel-inner` | las slides |
| `.carousel-item` | **cada slide**, exactamente una con `.active` |
| `.carousel-indicators` | los puntitos |
| `.carousel-control-prev/next` | las flechas |
| `.carousel-caption` | texto sobre la imagen |

`.carousel-item` y `.carousel-caption` son de Bootstrap. UiGas reescribe `.carousel-indicators` y las dos `-icon`.

## Elementos requeridos

Tres cosas que, si faltan, rompen el carrusel sin error visible:

1. **El `id`** tiene que coincidir con todos los `data-bs-target`.
2. **Exactamente un `.active`** entre las `.carousel-item`. Sin él, Bootstrap no sabe dónde empezar.
3. **Bootstrap JS cargado.** Sin `bootstrap.bundle.js` solo se ve la primera slide y las flechas no hacen nada.

## Autopase

```html
<div id="car2" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
```

- `carousel-fade` — transición de opacidad en vez de deslizamiento
- `data-bs-ride="carousel"` — arranca solo
- `data-bs-interval="4000"` — milisegundos entre slides
- `data-bs-pause="hover"` — pausa al pasar el mouse

> **El autopase es un problema de accesibilidad, no de gusto.** Un carrusel que cambia solo el contenido mientras alguien lo lee hace la lectura imposible. Mínimo: `data-bs-pause="hover"`, un intervalo de 4 s o más, y botón de pausa.

## Pausa manual

Bootstrap no trae un botón de pausa. Es un poco de JavaScript:

```html
<button class="btn btn-ghost btn-sm" id="pause" type="button">Pausar</button>
```

```js
var c = document.getElementById('car');
document.getElementById('pause').addEventListener('click', function () {
  if (c.classList.contains('slide')) {
    bootstrap.Carousel.getInstance(c).pause();
    this.textContent = 'Reanudar';
  } else {
    bootstrap.Carousel.getInstance(c).cycle();
    this.textContent = 'Pausar';
  }
});
```

## Controles

UiGas redefine las flechas con su propio SVG:

```scss
.carousel-control-prev-icon { background-image: url("data:image/svg+xml,…"); }
.carousel-control-next-icon { background-image: url("data:image/svg+xml,…"); }
```

> Igual que el resto de los SVGs embebidos del framework, el color está fijo en la imagen y **no cambia con el tema**. En tema oscuro la flecha es gris metálico sobre `--uig-bg`; sobre la superficie clara `#f0f0f3` se ve algo peor pero sigue siendo legible. Es un punto conocido pendiente, de los pocos donde el embebido no se ha separado por tema.

Los indicadores son barras de 2px con `--uig-red` en el activo.

## Cuando no usar carrusel

Tres señales de que necesitás otra cosa:

- **El contenido es obligatorio** (un aviso de cierre de inscripción) → no puede desaparecer solo.
- **Nadie lo va a mirar** → un carrusel casi nunca se recorre entero. Si la información importa, va en la página.
- **Hay muchos slides** → por encima de cinco, nadie llega al último.

## Accesibilidad

- `aria-hidden="true"` en los iconos de las flechas y `visually-hidden` con el texto real.
- `aria-current="true"` en el indicador activo.
- `aria-label` en cada indicador: "Slide 1", "Slide 2" — no "Punto 1".
- `role="region"` + `aria-label` en el contenedor cuando hay más de un carrusel en la página.
- **Autopase con pausa** y con un control de pausa disponible.
- El caption dentro del slide necesita contraste propio: Bootstrap no garantiza nada sobre texto sobre foto. Ponle una superficie detrás.

## Qué sigue

- [Indicadores de progreso](/components/progress.html)
- [Imágenes](/content/images.html) — el `srcset` de las slides