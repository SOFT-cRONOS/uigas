/**
 * Páginas "derivadas": las que documentan clases que UiGas **no** redefine.
 *
 * UiGas es una capa de override visual. Trae la estructura de Bootstrap
 * (grid, utilidades de layout, helpers) y la tematiza con sus tokens,
 * pero no redefine esas clases. Documentarlas como si fueran suyas sería
 * mentir, así que se documentan breve: qué usás, de dónde viene, y un link
 * a la documentación original.
 *
 * Formato de cada entrada:
 *   'seccion/pagina.html': { nota, cuerpo (markdown), ver: url de Bootstrap }
 */

export const DERIVED = {
  'layout/grid.html': {
    nota:
      'UiGas no redefine el grid. `.row`, `.col-*` y los gutters vienen de Bootstrap ' +
      'y funcionan sin cambios: lo único que UiGas hace es teñir los backgrounds con sus tokens.',
    cuerpo: `El grid de Bootstrap es de 12 columnas con 6 breakpoints. UiGas no lo toca.

Cuando lo combines con los componentes UiGas, el fondo sale de \`--uig-surface\` y los bordes de \`--uig-line\`, así que las cards se adaptan solas al tema.

> En el tema claro la superficie elevada es \`#f0f0f3\` sobre una base \`#dcdde2\`: el contraste entre card y fondo es lo que da profundidad, no la sombra.`,
    ver: 'https://getbootstrap.com/docs/5.3/layout/grid/',
  },

  'layout/breakpoints.html': {
    nota:
      'Los breakpoints son los de Bootstrap y UiGas no los redefine. ' +
      'Lo que UiGas hace es ajustar el layout de sus propios componentes a esos seis cortes.',
    cuerpo: `Los seis breakpoints de Bootstrap, con su variable \`$grid-breakpoints\`:

| Sufijo | Ancho | Ventana | Nombre |
|---|---|---|---|
| xs | 0 | — | extra pequeño |
| sm | ≥ 576px | 576–767px | teléfono grande |
| md | ≥ 768px | 768–991px | tablet |
| lg | ≥ 992px | 992–1199px | laptop |
| xl | ≥ 1200px | 1200–1399px | desktop |
| xxl | ≥ 1400px | 1400px+ | desktop grande |

Una regla sin sufijo aplica a todos los anchos. Los componentes de UiGas respetan los cortes: la navbar colapsa en \`lg\`, el grid pasa de una a dos columnas en \`md\`, y así.

> \`xs\` es un alias de \`@media (min-width: 0)\`. No existe como variable Sass: es el valor por defecto.`,
    ver: 'https://getbootstrap.com/docs/5.3/layout/breakpoints/',
  },

  'layout/containers.html': {
    nota:
      '`.container` es de Bootstrap. UiGas no lo redefine, pero las superficies que pone adentro ' +
      'sí usan los tokens del tema, así que se adaptan al conmutar.',
    cuerpo: `El container centra el contenido y le pone un ancho máximo por breakpoint:

| Sufijo | Ancho máximo | Gutter lateral |
|---|---|---|
| — | 100% | 12px |
| sm | 540px | 12px |
| md | 720px | 12px |
| lg | 960px | 12px |
| xl | 1140px | 12px |
| xxl | 1320px | 12px |

Dos variantes: \`.container\` es el que se adapta solo; \`.container-{sm|md|lg|xl|xxl}\` fija un ancho máximo desde ese breakpoint en adelante.

> UiGas no redefine ninguno de los dos. El fondo del container es transparente: el color lo aporta la card o el componente que pongas adentro, y ese sí usa \`--uig-surface\`.`,
    ver: 'https://getbootstrap.com/docs/5.3/layout/containers/',
  },

  'layout/columns.html': {
    nota:
      'Las columnas, los `offset-` y los `order-` son de Bootstrap. ' +
      'UiGas los usa en sus layouts de app pero no los redefine.',
    cuerpo: `Doce columnas por fila. \`.col-auto\` toma el ancho del contenido; \`.col-{n}\` y \`.col-{bp}-{n}\` toman \`n/12\` del ancho.

- \`col-6 col-md-4 col-lg-3\` — media columna en mobile, un tercio en tablet, un cuarto en laptop.
- \`offset-md-2\` — empuja la columna dos columnas desde \`md\`.
- \`order-lg-2\` — cambia el orden visual desde \`lg\` sin tocar el DOM.

> Importante: el orden visual y el orden del DOM son cosas distintas. Reordenar con \`order-*\` cambia la lectura visual pero no la de lectores de pantalla, que siguen el DOM. Para contenido que importa, reordená el HTML.`,
    ver: 'https://getbootstrap.com/docs/5.3/layout/columns/',
  },

  'layout/gutters.html': {
    nota: 'Los gutters (`g-*`, `gx-*`, `gy-*`) son de Bootstrap. UiGas no los redefine.',
    cuerpo: `El gutter es el espacio entre columnas. Se aplica al \`.row\`, no a las columnas:

- \`g-0\` a \`g-5\` — en ambos ejes
- \`gx-3\` — solo horizontal
- \`gy-2\` — solo vertical

El gutter se implementa con márgenes negativos en el \`.row\` y padding en las columnas: por eso el \`.row\` se sale del container por el gutter y el container lo compensa.

> Si usás gutters junto con los layouts de UiGas (\`.app-wrapper\`, \`.stat-*\`), no apliques \`g-*\`: esos layouts ya definieron su propio espaciado interno y se van a sumar.`,
    ver: 'https://getbootstrap.com/docs/5.3/layout/gutters/',
  },

  'layout/utilities-for-layout.html': {
    nota:
      'Las utilidades de layout (`display`, `flex`, `gap`, `position`, `float`) son de Bootstrap. ' +
      'UiGas no las redefine: funcionan idéntico.',
    cuerpo: `Lo que UiGas **sí** estiliza dentro de esa familia son los componentes propios que las usan por dentro: la navbar colapsable, el dropdown, el modal y el offcanvas respetan \`d-*\` y \`flex-*\` sin cambios.

Ejemplos que sí son de UiGas porque forman parte de un componente suyo:

\`\`\`html
<nav class="navbar navbar-expand-lg">
  <div class="app-wrapper">
    <aside class="app-sidebar">
      <span class="sidebar-header">Panel</span>
    </aside>
    <main class="app-main"></main>
  </div>
</nav>
\`\`\`

> \`.app-wrapper\`, \`.app-sidebar\`, \`.app-main\`, \`.sidebar-header\` y \`.stat-*\` sí son de UiGas: son layouts de aplicación y no tienen equivalente en Bootstrap. Se documentan en [Componentes UiGas](/extend/components.html).`,
    ver: 'https://getbootstrap.com/docs/5.3/layout/utilities-for-layout/',
  },

  'content/reboot.html': {
    nota:
      'El reboot es de Bootstrap y UiGas no lo redefine. Es lo que pone el html en baseline ' +
      'antes de que UiGas aplique sus tokens encima.',
    cuerpo: `El reboot normaliza lo que cada navegador hace distinto: márgenes del body, estilos de encabezado, listas, tablas, \`box-sizing\`, imágenes fluidas y foco visible.

UiGas entra **después**, sobre ese baseline, y ajusta lo que le importa:

| Elemento | Qué hace UiGas encima |
|---|---|
| \`body\` | fondo y color desde \`--uig-bg\` / \`--uig-text\` |
| \`h1\` | Barlow Condensed 900, versalitas |
| \`h2\`–\`h6\` | Barlow Condensed 700, versalitas |
| \`code\` | rojo de marca, fondo rojo tenue |
| \`a\` | \`--bs-link-color\` |
| \`hr\` | \`--uig-line\`, sin la opacidad por defecto de Bootstrap |

> \`box-sizing: border-box\` y \`img { max-width: 100% }\` vienen del reboot, no de UiGas. Si algún día se deja de cargar Bootstrap, esas dos cosas desaparecen y el layout se rompe.`,
    ver: 'https://getbootstrap.com/docs/5.3/content/reboot/',
  },

  'helpers/clearfix.html': {
    nota:
      '`.clearfix` es una utilidad de Bootstrap sin equivalente en UiGas. ' +
      'No la necesitas casi nunca: los contenedores flex y grid ya resuelven el problema.',
    cuerpo: `Aplica \`::after\` con \`clear: both\`. Si estás maquetando con \`.row\`/ flex, el problema que resuelve no aparece.

UiGas define sus propios layouts de app (\`.app-wrapper\`, \`.app-sidebar\`, \`.app-main\`) que ya traen \`min-height\` y \`overflow\` resueltos.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/clearfix/',
  },

  'helpers/colored-links.html': {
    nota:
      'Los `link-*` de Bootstrap no tienen equivalente en UiGas. El color de enlace sale de ' +
      '`--bs-link-color`, que sí está redefinido para el tema claro.',
    cuerpo: `\`link-primary\`, \`link-secondary\`, \`link-success\`, \`link-danger\`, \`link-warning\`, \`link-info\`, \`link-light\`, \`link-dark\`, \`link-underline\`.

UiGas **no** los define: si los usás, Bootstrap los aplica con su color plano. Sobre superficie clara eso queda ilegible — el mismo problema que [el texto de acento](/utilities/colors.html).

Dos formas correctas en UiGas:

| En vez de | Usá |
|---|---|
| \`link-primary\` | \`text-primary\` |
| \`link-danger\` | \`text-danger\` |
| \`link-secondary\` | \`text-body-secondary\` |

> La razón de fondo: el color de enlace del framework sale de \`--bs-link-color\`, que UiGas define por tema (#b30500 en claro, #f92121 en oscuro). Los \`link-*\` de Bootstrap ignoran ese token y usan su propia paleta.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/colored-links/',
  },

  'helpers/focus-ring.html': {
    nota:
      '`.focus-ring` y `.focus-ring-primary` son de Bootstrap y UiGas no los redefine. ' +
      'Lo que UiGas trae es un anillo de foco global, sin clases.',
    cuerpo: `En vez de \`.focus-ring\`, UiGas aplica el foco rojo a todo elemento enfocable:

\`\`\`scss
:focus-visible { outline: 2px solid rgba(249, 33, 33, 0.7); outline-offset: 3px; }
.btn:focus-visible, a:focus-visible { box-shadow: var(--uig-ring); outline: none; }
\`\`\`

Es una decisión de diseño: el foco no se activa por elemento, se activa globalmente y toma la marca.

> **Corrección aplicada en el tema claro.** El rojo al 70% se mezcla con la superficie clara y quedaba en 2.46:1 – 2.75:1, por debajo del 3:1 que pide la WCAG para contraste no textual. \`_theme-light.scss\` lo pasa a \`#b30500\` pleno (6.28:1).

Usá \`.focus-ring\` solo si necesitás el anillo de Bootstrap *además* del global — por ejemplo en un control dentro de un canvas.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/focus-ring/',
  },

  'helpers/icon-link.html': {
    nota:
      '`.icon-link` es de Bootstrap y UiGas no lo redefine. ' +
      'El caso más común en UiGas es un botón con ícono, que sí es propio.',
    cuerpo: `\`icon-link\` pone un pseudo-elemento \`::after\` de 1em con un guion largo como flecha, que se desplaza al hover.

No hay equivalente en UiGas. Las dos alternativas del framework:

1. **Botón con ícono**, que es lo idiomático en UiGas:

\`\`\`html
<button class="btn btn-ghost">Ver detalle <i class="bi bi-arrow-right"></i></button>
\`\`\`

2. **Enlace con flecha propia**, si necesitás el comportamiento de \`.icon-link\`:

> \`.bi\` implica Bootstrap Icons, que **no viene incluido**. Hay que cargarlo aparte.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/icon-link/',
  },

  'helpers/position.html': {
    nota:
      'Las utilidades de `position` son de Bootstrap. UiGas no las redefine; ' +
      'el único detalle propio es que `--uig-backdrop` y `--uig-nav-bg` están tematizados.',
    cuerpo: `Los cuatro valores: \`static\` (default), \`relative\`, \`absolute\`, \`fixed\`, \`sticky\`, más \`position-{start|end}-{0|50|100}\` para los offsets.

Dos usos habituales:

1. **Nav o barra fija**: \`.fixed-top\` / \`.sticky-top\`. Con \`fixed-top\` hay que compensar el alto en el body.
2. **Badge sobre un botón**: \`.position-absolute\` + \`.top-0 .start-100 .translate-middle\`.

> \`.card-featured\` de UiGas usa \`position: relative\` con un \`::before\` absoluto de 2px arriba. El \`pointer-events: none\` en ese pseudo-elemento es lo que evita que intercepte los clics del contenido.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/position/',
  },

  'helpers/ratio.html': {
    nota: '`.ratio` y sus variantes son de Bootstrap y UiGas no los redefine.',
    cuerpo: `Reservan espacio con \`aspect-ratio\` para que la imagen no salte al cargar:

\`\`\`html
<div class="ratio ratio-16x9">
  <img src="circuito.jpg" class="img-fluid" alt="Vista aérea del circuito">
</div>
\`\`\`

Variantes: \`ratio-1x1\`, \`ratio-4x3\`, \`ratio-16x9\`, \`ratio-21x9\`.

> Es una de las pocos razones por las que conviene \`background-image\` en lugar de \`<img>\`: el div no necesita saber el tamaño de la imagen.

Con la retícula: \`ratio\` acepta utilidades de children (\`ratio-4x3\` dentro de un \`col-md-6\`), porque el contenedor hereda el ancho de la columna y calcula la altura.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/ratio/',
  },

  'helpers/stacks.html': {
    nota:
      '`.stack` es de Bootstrap. UiGas no lo redefine, pero es la forma correcta de superponer ' +
      'contenido en la card destacada.',
    cuerpo: `\`stack\` crea un contenedor con \`display: grid\` donde **todos los hijos se apilan en la misma celda**:

\`\`\`html
<div class="stack">
  <div class="card">
    <img src="podio.jpg" class="card-img-top" alt="Podio">
    <div class="card-body">
      <span class="stack-item justify-content-center">
        <span class="badge badge-soft badge-soft-danger">ÚLTIMA FECHA</span>
      </span>
    </div>
  </div>
</div>
\`\`\`

La ventaja frente a \`position: absolute\` es que los hijos **conservan su lugar en el flujo de accesibilidad**: el orden de lectura del DOM se mantiene y no hace falta \`z-index\`.

> Las utilidades \`stack-item\`, \`justify-content-center\` y \`align-self-end\` son de Bootstrap.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/stacks/',
  },

  'helpers/stretched-link.html': {
    nota:
      '`.stretched-link` es de Bootstrap y UiGas no lo redefine. ' +
      'Requiere un detalle de posicionamiento que suele olvidarse.',
    cuerpo: `Convierte todo el contenedor en zona clicable, usando un \`::after\` que cubre el padre:

\`\`\`html
<div class="card position-relative">
  <div class="card-body">
    <h5 class="card-title"><a class="stretched-link" href="#">Córdoba</a></h5>
    <p class="card-text">12 de abril</p>
  </div>
</div>
\`\`\`

Dos reglas:

1. El padre necesita \`position: relative\` — de ahí el \`position-relative\` en el ejemplo.
2. El enlace va en el **título**, no en un botón suelto: un botón dentro de un stretched-link es un enlace dentro de un enlace.

> Si la card tiene otro enlace (un "ver detalle"), ese enlace necesita \`position: relative\` con \`z-index\` para quedar por encima del \`::after\`. Sin eso el clic va al stretched-link y el segundo enlace deja de funcionar.

Cuando el contenido es solo informativo y no hay destino, **no lo hagas clicable**. Que el usuario adivine cuesta más de lo que aporta.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/stretched-link/',
  },

  'helpers/text-truncation.html': {
    nota:
      '`.text-truncate` es de Bootstrap y UiGas no lo redefine. ' +
      'El detalle que se suele perder: necesita un ancho definido.',
    cuerpo: `Aplica \`overflow: hidden\`, \`text-overflow: ellipsis\` y \`white-space: nowrap\`.

\`\`\`html
<div style="max-width: 20ch;">
  <p class="text-truncate">Este texto se corta con puntos suspensivos</p>
</div>
\`\`\`

> **El ancho tiene que estar definido.** Con el contenedor en ancho automático, \`text-truncate\` no hace nada: el texto nunca desborda porque el contenedor crece con él. Es el fallo más común.

Dos utilidades más:

- \`.text-truncate\` — una línea
- \`line-clamp\` — multilínea, requiere \`display: -webkit-box\` y no está en Bootstrap

> Truncar es una decisión visual, no de contenido: el texto sigue completo en el DOM y lo lee el lector de pantalla, pero no lo ve quien está mirando. Para datos, no trunques: reducí el contenido o poné el dato completo en un \`title\`.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/text-truncation/',
  },

  'helpers/vertical-rule.html': {
    nota:
      '`.vr` (vertical rule) es de Bootstrap y UiGas **no** lo redefine — pero la superficie clara ' +
      'le deja poco contraste.',
    cuerpo: `\`vr\` es un separador vertical de 1px y 1rem de alto, pensado paraBootstrap 4. Bootstrap 5.3 lo conserva como utilidad.

\`\`\`html
<div class="vr mx-2"></div>
\`\`\`

En tema oscuro usa \`--bs-border-color\`, que UiGas no redefinió: queda el color de Bootstrap. En tema claro, sobre \`#f0f0f3\`, ese borde es prácticamente invisible.

La alternativa en UiGas es un divisor con token:

\`\`\`html
<div style="border-left: 1px solid var(--uig-line);"></div>
\`\`\`

> Ojo: \`border-left\` en tema oscuro es \`#1f1f1f\` sobre \`#141414\`, 1.4:1. El contraste bajo es intencional: un separador que compita con el contenido es peor que uno que acompañe.`,
    ver: 'https://getbootstrap.com/docs/5.3/helpers/vertical-rule/',
  },

  'utilities/api.html': {
    nota:
      'La API de las utilidades es de Bootstrap y UiGas no la cambia. ' +
      'Las diferencias están en qué clases reescribe y cuáles no.',
    cuerpo: `Las utilidades se escriben como \`[propiedad]-[valor]-[responsive]\`:

| Parte | Ejemplo |
|---|---|
| propiedad | \`text\` · \`bg\` · \`border\` · \`p\` · \`m\` · \`d\` |
| valor | \`primary\` · \`3\` · \`sm\` · \`start\` |
| responsive | \`-md\` · \`-lg\` (aplica **desde** ese breakpoint en adelante) |
| importante | \`!\` sufijo: \`text-danger!\` |

Y el orden va de más general a más específico: **primero el valor, después el breakpoint, después el \`!\`**.

\`\`\`html
<div class="mt-2 mt-md-0 mt-lg-4 p-2 p-md-3">…</div>
\`\`\`

## Qué reescribe UiGas

Solo las utilidades **de color**, y solo en \`_utilities.scss\`:

- \`text-*\` de color (13 clases) — ver [colores](/utilities/colors.html)
- \`bg-*\` (16 clases) — ver [background](/utilities/background.html)
- \`border-*\` de color (10 clases) — ver [bordes](/utilities/borders.html)
- \`shadow\` · \`shadow-sm\` · \`shadow-lg\`

## Qué no toca

Espaciado (\`m-*\`, \`p-*\`, \`g-*\`), display, flex, grid, tamaños, posición, overflow, opacidad, z-index, alineación vertical, visibilidad. Todas funcionan igual que en Bootstrap.

> Esa línea divisoria es la misma que separa las páginas "de UiGas" de las "derivadas" en esta documentación.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/api/',
  },

  'utilities/display.html': {
    nota: 'Las utilidades `display` son de Bootstrap y UiGas no las redefine.',
    cuerpo: `Las cuatro bases y sus variantes:

\`\`\`html
<div class="d-none d-md-block">Oculto en móvil, bloque en md+</div>
<div class="d-flex justify-content-between">Flex con reparto</div>
<div class="d-inline-block">Inline-block</div>
<div class="d-grid">Grid</div>
\`\`\`

Valores: \`none\` · \`inline\` · \`inline-block\` · \`block\` · \`grid\` · \`inline-grid\` · \`table\` · \`table-row\` · \`table-cell\` · \`flex\` · \`inline-flex\`.

> Las clases \`display\` no existen en el CSS de UiGas: no hay ni una regla \`.d-*\` en \`dist/uigas.css\`. Todo lo que uses viene de Bootstrap.

Los componentes de UiGas **sí** las usan por dentro (\`d-flex\` en el \`.stat\`, \`d-none\` en los toggles), así que combinarlas con sus clases funciona sin conflicto.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/display/',
  },

  'utilities/flex.html': {
    nota: 'Las utilidades flex son de Bootstrap y UiGas no las redefine.',
    cuerpo: `Toda la familia \`flex-{direction|wrap|fill}\`, \`justify-content-*\`, \`align-items-*\`, \`align-self-*\` y \`flex-{grow|shrink}-{0|1|auto}\`:

\`\`\`html
<div class="d-flex justify-content-center align-items-center gap-2 flex-wrap">
  <button class="btn btn-ghost">Uno</button>
  <button class="btn btn-ghost">Dos</button>
</div>
\`\`\`

> No hay una sola regla \`justify-*\` o \`align-*\` en el CSS de UiGas. Todo viene de Bootstrap.

Lo que **sí** es de UiGas es el modelo de espaciado que los componentes asumen: \`.stat\` usa \`gap: 0.4rem\` interno y \`.card\` usa el padding de Bootstrap. Si sobreescribís el display de uno de esos componentes, el espaciado interno se mantiene: los gaps son del componente, no del flex.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/flex/',
  },

  'utilities/float.html': {
    nota: 'Las utilidades `float` son de Bootstrap y UiGas no las redefine.',
    cuerpo: `\`float-start\`, \`float-end\`, \`float-none\`, con variantes responsive.

> En un framework con dos temas, el nombre "start/end" importa: **"start" es izquierda en LTR y derecha en RTL**, mientras que \`left\` es izquierda siempre. Bootstrap 5 usa \`start\`/\`end\`; UiGas no cambia eso.

En la práctica:

\`\`\`html
<div class="float-end">
  <img src="escudo.png" class="img-thumbnail" alt="Escudo">
</div>
<p>Texto que fluye alrededor del bloque flotado.</p>
\`\`\`

> Preferencia: en layouts nuevos, \`d-flex\` con \`justify-content-between\` cubre casi todos los casos de \`float\` sin la complejidad del flujo de texto y sin el \`clearfix\` de cleanup.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/float/',
  },

  'utilities/interactions.html': {
    nota:
      'Las utilidades de interacción son de Bootstrap y UiGas no las redefine. ' +
      'El único detalle propio es el reconocimiento por `:focus-visible`.',
    cuerpo: `Dos clases:

\`\`\`html
<div class="pointer-events-none">No recibe eventos del puntero</div>
<div class="pe-none">Igual, versión corta</div>
<div class="user-select-none">Texto no seleccionable</div>
<div class="pe-auto">Vuelve a recibir eventos</div>
\`\`\`

Lo habitual es un bloqueo temporal mientras se guarda:

\`\`\`html
<form id="f">
  <button class="btn btn-primary btn-loading">Guardando…</button>
</form>
<script>
  document.getElementById('f').addEventListener('submit', function () {
    this.classList.add('pe-none');
  });
</script>
\`\`\`

> \`.btn-loading\` ya pone \`pointer-events: none\` por CSS, así que para deshabilitar el botón alcanza con esa clase. \`.pe-none\` es para bloquear la región más amplia.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/interactions/',
  },

  'utilities/opacity.html': {
    nota: 'Las utilidades `opacity` son de Bootstrap y UiGas no las redefine.',
    cuerpo: `De \`opacity-0\` a \`opacity-100\`, en pasos de 10, más \`opacity-25\` · \`opacity-50\` · \`opacity-75\`.

\`\`\`html
<div class="opacity-25">25%</div>
<div class="opacity-50">50%</div>
<div class="opacity-75">75%</div>
\`\`\`

> **Cuidado con el estado deshabilitado.** Bootstrap aplica \`opacity: 0.65\` a los botones deshabilitados. Sobre el slab rojo, eso baja el texto blanco por debajo de AA. Si la legibilidad del estado deshabilitado importa, bajá la opacidad a 0.5 con CSS o cambiá el color — el usuario ya sabe que no puede hacer clic.

Aplicar opacidad baja el contraste **de todo** el elemento, incluido el texto y los bordes. Para atenuar un componente, un color de texto muted suele ser mejor que una opacidad.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/opacity/',
  },

  'utilities/overflow.html': {
    nota: 'Las utilidades `overflow` son de Bootstrap y UiGas no las redefine.',
    cuerpo: `\`overflow-{visible|hidden|scroll|auto}\`, más las variantes por eje \`overflow-x-*\` y \`overflow-y-*\`.

El caso más común: tabla que scrollea en horizontal sin romper el layout.

\`\`\`html
<div class="table-responsive">
  <table class="table">…</table>
</div>
\`\`\`

> \`.table-responsive\` es de Bootstrap. Con \`overflow-x: auto\` aparece una barra de scroll solo cuando hace falta, y a diferencia de \`overflow: hidden\` no oculta contenido de forma silenciosa — que es el problema real de \`hidden\` en tablas.

En tema claro la barra de scroll usa el estilo del navegador, que sobre \`#f0f0f3\` se ve apenas. El scrollbar personalizado del showcase es una decisión de la demo, no del framework.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/overflow/',
  },

  'utilities/position.html': {
    nota: 'Las utilidades `position` son de Bootstrap. Ver [helpers/position](/helpers/position.html).',
    cuerpo: `Mismo contenido que la página de helpers: \`static\` · \`relative\` · \`absolute\` · \`fixed\` · \`sticky\` más los offsets \`-{start|end}-{0|50|100}\`.

> Duplicada a propósito: en Bootstrap están en \`helpers/position\` **y** en \`utilities/position\`. Mantengo las dos páginas para que el índice refleje la estructura de Bootstrap.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/position/',
  },

  'utilities/sizing.html': {
    nota: 'Las utilidades `sizing` son de Bootstrap y UiGas no las redefine.',
    cuerpo: `Ancho y alto:

\`\`\`html
<div class="w-25">25%</div>
<div class="w-50">50%</div>
<div class="w-75">75%</div>
<div class="w-100">100%</div>

<div class="h-25">25%</div>
<div class="h-100">100%</div>
\`\`\`

Con viewport:

\`\`\`html
<div class="vw-100">Ancho del viewport</div>
<div class="vh-100">Alto del viewport</div>
<div class="min-vh-100">Mínimo, un alto de pantalla</div>
\`\`\`

> \`h-100\` dentro de un padre sin altura definida no hace nada: el padre se estira para contener al hijo y el hijo toma la altura del padre. Es un ciclo que se resuelve como "sin altura".
>
> \`.col-auto\` de la [retícula](/layout/grid.html) suele ser mejor que un ancho en porcentaje cuando lo que se quiere es "lo justo que ocupa".`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/sizing/',
  },

  'utilities/spacing.html': {
    nota:
      'Las utilidades de espaciado (`m-*`, `p-*`, `g-*`) son de Bootstrap. ' +
      'UiGas no las redefine, pero los componentes que sí reescribe las usan internamente con su propia escala.',
    cuerpo: `Márgenes y padding usan la escala \`$spacer\` de Bootstrap (\`0\` a \`5\`, más \`auto\`).

UiGas no altera esta escala. Lo que sí cambia es el espaciado interno de sus componentes, que está definido en los parciales y no es modificable por estas clases salvo que uses selectores más específicos.

La regla práctica: **el espaciado externo lo manejás vos con \`m-*\`/\`p-*\`; el interno es del componente.**`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/spacing/',
  },

  'utilities/vertical-align.html': {
    nota: 'Las utilidades de alineación vertical son de Bootstrap y UiGas no las redefine.',
    cuerpo: `Solo funcionan en contenedores **inline** (\`inline\`, \`inline-block\`, \`inline-flex\`, o \`table-cell\`):

\`\`\`html
<div>
  <span class="align-baseline">Baseline</span>
  <span class="align-top">Top</span>
  <span class="align-middle">Middle</span>
  <span class="align-bottom">Bottom</span>
  <span class="align-text-top">Text top</span>
</div>
\`\`\`

La diferencia entre las dos últimas familias:

- \`align-top\` / \`align-middle\` / \`align-bottom\` alinean la **caja** del elemento.
- \`align-text-top\` / \`align-text-bottom\` alinean solo la **línea de texto** dentro de la caja.

> Dentro de un componente UiGas ya resuelto, aplicarlas suele romper la alineación. En \`.stat\`, por ejemplo, el valor y la etiqueta dependen del flex interno con \`gap: 0.4rem\`: un \`align-middle\` externo no afecta al bloque, solo mueve la etiqueta.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/vertical-align/',
  },

  'utilities/visibility.html': {
    nota: 'Las utilidades de visibilidad son de Bootstrap y UiGas no las redefine.',
    cuerpo: `Dos clases con efectos distintos, y confundirlas es un error frecuente:

\`\`\`html
<div class="invisible">Oculto visualmente, sigue en el flujo y en el DOM</div>
<div class="visible">Visible de nuevo</div>
\`\`\`

- \`.invisible\` → \`visibility: hidden\`. El elemento **ocupa su lugar** y su texto lo lee el lector de pantalla.
- Para sacarlo del flujo y de la lectura: \`.d-none\` (\`display: none\`).

\`\`\`html
<div class="d-none">No existe para sighted ni para lectores</div>
\`\`\`

> La distinción importa en formularios: un campo oculto con \`.invisible\` se sigue enviando; con \`.d-none\`, también, pero no se anuncia. Para un campo que el usuario no debe completar, \`readonly\` + \`d-none\` es más explícito que esconderse.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/visibility/',
  },

  'utilities/z-index.html': {
    nota: 'Las utilidades `z-index` son de Bootstrap y UiGas no las redefine.',
    cuerpo: `De \`z-0\` a \`z-3\` más \`z-n1\` y \`z-auto\`, con variantes responsive (\`z-md-3\`).

La escala corta es lo correcto en la mayoría de los casos: el problema aparece cuando dos capas de un componente de terceros pelean por el mismo nivel.

> En UiGas hay una sola regla que depende del z-index y es propia: el \`::before\` de \`.card-featured\`, que dibuja la línea roja de 2px arriba. Va con \`pointer-events: none\` justamente para que **no necesite** un \`z-index\` alto: al no capturar eventos, no compite con el contenido.`,
    ver: 'https://getbootstrap.com/docs/5.3/utilities/z-index/',
  },
};

export const DERIVED_NOTE_TITLE = 'Lo trae Bootstrap, no UiGas';