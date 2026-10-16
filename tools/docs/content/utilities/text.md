# Texto

> Alineación, transformación, truncado y peso. El color lo cubre [colores](/utilities/colors.html); aquí es todo lo demás.

## Alineación

```html
<p class="text-start">Izquierda</p>
<p class="text-center">Centro</p>
<p class="text-end">Derecha</p>
```

Con responsive:

```html
<p class="text-start text-md-center">Centro desde md</p>
```

## Transformación

```html
<p class="text-lowercase">minúscula</p>
<p class="text-uppercase">MAYÚSCULA</p>
<p class="text-capitalize">Primera Letra</p>
```

> Son de Bootstrap y no las reescribe UiGas. Se combinan con la escala de UiGas: un `<h2 class="text-uppercase">` sale en Barlow Condensed 700 mayúscula — que es exactamente lo que hace `.form-label` y `.alert-heading` de forma nativa. Si vas a poner `text-uppercase` en todos los títulos, estás reimplementando a mano lo que el framework ya hace.

## Peso y estilo

```html
<p class="fw-light">Ligera</p>
<p class="fw-normal">Normal</p>
<p class="fw-bold">Negrita</p>
<p><em>Cursiva</em> · <strong>Negrita</strong> · <small>Pequeña</small></p>
```

## Tamaño

```html
<p class="fs-1">Grande</p>
<p class="fs-4">Mediano</p>
<p class="fs-6">Pequeño</p>
<p class="fs-italic">Itálica</p>
```

> `.fs-*` son de Bootstrap y usan `$font-sizes`. UiGas no redefine esa escala. La diferencia real en UiGas está en **qué familia se aplica**, no en el tamaño: un `h4` ya viene en Barlow Condensed 700.

## Truncado

```html
<p class="text-truncate" style="max-width: 20ch;">
  Este texto se corta con puntos suspensivos cuando no entra
</p>
```

`text-truncate` necesita un ancho **definido**: con el contenedor en auto, `text-truncate` no hace nada porque el texto nunca desborda. `max-width` + `overflow: hidden` + `text-overflow: ellipsis`.

> Con truncado, el texto completo sigue en el DOM y es legible por lector de pantalla, pero no por vista. Si el texto es un dato que importa, no lo trunques: reducí el contenido.

## `.text-body-emphasis`

```html
<p class="text-body-emphasis">Texto con más peso visual sin ser un heading</p>
```

Es propia de Bootstrap 5.3 y UiGas la mapea a `--uig-heading`. Útil dentro de un párrafo: da jerarquía sin subir a un `<h3>` y romper la estructura del documento.

## Responsive

```html
<p class="text-center text-lg-start">Centro en móvil, izquierda en desktop</p>
<p class="text-truncate text-md-nowrap">Se trunca solo hasta md</p>
```

## Lo que UiGas no redefine

Todo lo de esta página viene de Bootstrap salvo `.text-body-emphasis`, que UiGas remapea:

```scss
.text-body-emphasis { color: var(--uig-heading) !important; }
```

Los `.text-*` de **color** sí son de UiGas — ver [colores](/utilities/colors.html), donde está la tabla de los acentos y la corrección del tema claro.

## Accesibilidad

- Alineación y mayúsculas son visuales: el texto en el DOM no cambia. No alinees con `text-end` algo que necesita lectura de izquierda a derecha — RTL tiene su propia lógica.
- El truncado esconde información visualmente. Nunca para un dato o una acción.
- El tamaño de fuente por encima de `fs-4` debería reservarse para títulos reales (`h1`, `h2`), no para párrafos: saltan la escala de headings y rompen el orden de lectura de la pantalla.

## Qué sigue

- [Colores](/utilities/colors.html)
- [Tipografía](/content/typography.html)
- [Truncado de texto](/helpers/text-truncation.html)