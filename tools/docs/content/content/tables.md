# Tablas

> Hairline de 1px, encabezado en versalitas y cifras en Rajdhani. UiGas no usa el zebra de Bootstrap: el contraste lo pone el fondo de la superficie.

## Tabla base

```html
<table class="table">
  <thead>
    <tr><th scope="col">Piloto</th><th scope="col">Vueltas</th><th scope="col">Tiempo</th></tr>
  </thead>
  <tbody>
    <tr><td>M. Rossi</td><td>58</td><td>1:32.480</td></tr>
    <tr><td>J. Álvarez</td><td>58</td><td>1:32.911</td></tr>
  </tbody>
</table>
```

La `.table` de UiGas sustituye el fondo deBootstrap con `--uig-surface` y el borde con `--uig-line`. Sobre superficie oscura las filas se separan por hairline, no por bandas: es más silencioso y sigue leyéndose bien en pantallas chicas.

## Tabla oscura

Para tablas dentro de una superficie elevada, `.table-dark` invierte el fondo:

```html
<table class="table table-dark">
  <thead><tr><th scope="col">Sector</th><th scope="col">Velocidad</th></tr></thead>
  <tbody><tr><td>1</td><td>291 km/h</td></tr></tbody>
</table>
```

## Variantes semánticas

Bootstrap ofrece `.table-primary`, `.table-success` y compañía. UiGas mantiene los selectores: la fila entera toma el tinte y el color del estado. El `caption` es el lugar natural para el texto de estado.

```html
<table class="table table-success">
  <caption class="caption-top">Sector cerrado</caption>
  <tbody><tr><td>Vuelta rápida</td><td>Completa</td></tr></tbody>
</table>
```

## Tabla dentro de una card

```html
<div class="card">
  <div class="card-body">
    <table class="table mb-0">…</table>
  </div>
</div>
```

Quita el margen inferior de la tabla (`mb-0`) para que no quede una franja vacía contra el borde de la card.

## Tabla responsive

`.table-responsive` es de Bootstrap y UiGas no lo redefine. Envuelve la tabla para que desplace en horizontal en pantallas chicas en vez de romper el layout:

```html
<div class="table-responsive">
  <table class="table">…</table>
</div>
```

## Accesibilidad

- `scope="col"` en cada `th` del encabezado. Sin eso, un lector de pantalla no anuncia a qué columna pertenece cada celda.
- `scope="row"` en el primer `td` de cada fila cuando esa celda identifica la fila.
- No uses el color como único portador de información: `.table-success` y `.table-danger` se distinguen también por el texto del `caption`.
- Los datos tabulados leen mejor con `text-align: right` en las columnas numéricas y la fuente de datos.

```html
<table class="table">
  <caption>Tiempos por vuelta · <strong>Última actualización 14:32</strong></caption>
  <thead><tr><th scope="col">Vuelta</th><th scope="col" class="text-end">Tiempo</th></tr></thead>
  <tbody>
    <tr><th scope="row" class="fw-normal">57</th><td class="text-end">1:32.480</td></tr>
  </tbody>
</table>
```

## Qué sigue

- [Figuras](/content/figures.html) — imágenes con pie y pie de figura
- [Tipografía](/content/typography.html) — por qué las cifras usan Rajdhani