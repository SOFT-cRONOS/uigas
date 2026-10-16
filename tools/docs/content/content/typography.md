# Tipografía

> Cinco voces tipográficas. Los H1 y display usan Barlow Condensed; el cuerpo, Barlow; las cifras, Rajdhani; la marca, Korataki.

UiGas no "usa la tipografía de Bootstrap": redefine por completo la escala y asigna una familia distinta a cada rol.

## Las cinco voces

| Token | Familia | Peso | Dónde |
|---|---|---|---|
| `--uig-font-h1` | Barlow Condensed | 900 | H1, `.h1` |
| `--uig-font-display` | Barlow Condensed | 700 | H2–H6, `.h2`–`.h6`, `.badge`, `.btn`, `.alert-heading`, `.form-label` |
| `--uig-font-brand` | Korataki → Barlow Condensed it. | 700 | solo logo y nombre de marca |
| `--uig-font-body` | Barlow | 400 | párrafo, `.form-control` |
| `--uig-font-data` | Rajdhani | 400–700 | cifras, tiempos, datos de tablero |

Korataki no está en Google Fonts: se resuelve con `@font-face` + `local()` desde la fuente instalada. Sin ella, cae a Barlow Condensed 900 itálica.

## Escala

```html
<h1>Heading 1 · Barlow Condensed 900</h1>
<h2>Heading 2 · Barlow Condensed 700</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<p class="lead">Lead · 1.12rem, texto suave</p>
<p>Body · Barlow 400, line-height 1.7</p>
```

El `line-height` del cuerpo es **1.7**, deliberadamente alto: es lo que hace legible un texto gris claro sobre superficie oscura sin necesidad de subir el peso.

Las clases `.display-1` a `.display-6` de Bootstrap se mantienen con el aspecto de UiGas. La más común en landings es la `.display-5`.

## Versalitas

Botones, badges, breadcrumbs, `.form-label` y `.alert-heading` van en mayúsculas con tracking amplio. Es la señal que más distingue UiGas de un Bootstrap pelado.

```html
<span class="badge badge-soft badge-soft-success">EN PISTA</span>
<span class="badge badge-soft badge-soft-danger">FUERA DE CIRCUITO</span>
<button class="btn btn-primary">CARGAR</button>
<label class="form-label">PATENTE</label>
```

## Texto en línea

```html
<p>Usá <code>--uig-red</code> para la señal de marca y <mark>así</mark> para resaltar.</p>
<a href="/components/buttons.html">Un enlace</a> · <strong>negrita</strong>
```

El `code` inline lleva fondo rojo tenue y color rojo claro en oscuro, rojo profundo en claro. El `mark` usa el mismo tratamiento.

> En el tema claro los inline cambian a `--bs-primary-text-emphasis` (#b30500, 6.3:1 sobre la base) porque el rojo plano de oscuro no se lee sobre superficie clara.

## Listas y citas

```html
<ul>
  <li>Ítem con marker rojo</li>
  <li>El segundo</li>
</ul>

<blockquote class="blockquote">
  <p>Cita corta.</p>
  <footer class="blockquote-footer">— Autor, <cite>Fuente</cite></footer>
</blockquote>
```

El `blockquote` de UiGas lleva una barra roja de 2px a la izquierda en vez de la cita textual: es más discreto y no interrumpe la lectura en pantalla estrecha.

## Alineación y transformación

Bootstrap ofrece `.text-uppercase`, `.text-lowercase`, `.text-capitalize` y las utilidades `.text-start|center|end`. UiGas no las redefine: funcionan igual y se combinan con lo de arriba.

```html
<h2 class="text-uppercase text-danger">Sector Danger</h2>
```

## Accesibilidad

No uses `.display-*` para cuerpo de texto: son títulos, y saltan de tamaño de forma brusca entre escalas. El salto de H3 a H4 dentro de un bloque es más brusco que el de `.display-5` a `.display-6`.

> Un error tipográfico frecuente: `.text-muted` en el tema claro mide 5:1 sobre la base, justo por encima del mínimo AA. Para texto que no sea accesorio, preferí `--uig-text-soft`.

## Qué sigue

- [Tablas](/content/tables.html) — donde la tipografía se nota más
- [Color](/customize/color.html) — la rampa detrás de cada rol
- [Botones](/components/buttons.html) — las versalitas en acción