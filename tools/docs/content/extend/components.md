# Componentes UiGas

> 27 clases propias del framework, sin equivalente en Bootstrap: los componentes de simulación del Brandbook CVR.

## Botones

### `.btn-ghost`

Sin fondo ni borde, solo texto que se enciende al hover.

```html
<div class="d-flex gap-2">
  <button class="btn btn-ghost">Cancelar</button>
  <button class="btn btn-ghost">Ver detalle</button>
</div>
```

En tema claro se reescribe: el gris del tema oscuro daba 2.25:1 de contraste.

### `.btn-loading`

Oculta el texto y muestra un spinner, sin JavaScript.

```html
<button class="btn btn-primary btn-loading">Guardando…</button>
```

`pointer-events: none` impide el doble clic. El texto queda en el DOM para lectores de pantalla: sumale `aria-busy="true"`.

### `.btn-link`

Único botón que no va en versalitas: es texto con relleno de enlace, para acciones terciarias dentro de un párrafo.

## Badges

### `.badge-soft-*`

Ocho variantes con fondo teñido al 14%, borde al 42% y texto en la versión legible de cada familia.

```html
<span class="badge badge-soft badge-soft-primary">EN PISTA</span>
<span class="badge badge-soft badge-soft-success">HABILITADO</span>
<span class="badge badge-soft badge-soft-warning">REVISAR</span>
<span class="badge badge-soft badge-soft-danger">FUERA</span>
<span class="badge badge-soft badge-soft-info">INFO</span>
<span class="badge badge-soft badge-soft-secondary">N/A</span>
<span class="badge badge-soft badge-soft-light">CLARO</span>
<span class="badge badge-soft badge-soft-dark">OSCURO</span>
```

## Tarjetas

### `.card-featured`

El elemento destacado de una vista: borde de marca y una línea roja de 2px arriba.

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

El `::before` de la línea roja lleva `pointer-events: none` — sin eso intercepta los clics del contenido.

## Datos

### `.stat` y familia

Bloque de KPI con cifras tabulares.

```html
<div class="row g-3">
  <div class="col-md-4">
    <div class="stat">
      <span class="stat-label">Vueltas</span>
      <span class="stat-value">58</span>
      <span class="stat-delta text-success">+3 mejor</span>
    </div>
  </div>
  <div class="col-md-4">
    <div class="stat">
      <span class="stat-label">Tiempo total</span>
      <span class="stat-value">1:32.480</span>
      <span class="stat-mini">mejor en la 41</span>
    </div>
  </div>
</div>
```

| Clase | Qué es |
|---|---|
| `.stat` | el contenedor, flex column con `gap: .4rem` |
| `.stat-value` | la cifra grande, en Rajdhani |
| `.stat-label` | el rótulo, versalitas |
| `.stat-delta` | la variación, inline-flex con ícono |
| `.stat-mini` | nota secundaria |

> Las cifras usan `font-variant-numeric: tabular-nums`: los dígitos ocupan el mismo ancho, así que una columna de números no baila al actualizarse. Es la razón de que exista `--uig-font-data`.

### `.table-custom`

Tabla de telemetría: encabezado en versalitas sobre tinte, celdas en la fuente de datos.

```html
<table class="table-custom w-100">
  <thead><tr><th scope="col">Vuelta</th><th scope="col">Sector 1</th></tr></thead>
  <tbody>
    <tr><td>41</td><td>28.104</td></tr>
  </tbody>
</table>
```

## Layout de aplicación

### `.app-*`

El shell de panel: sidebar fijo y contenido.

```html
<div class="app-wrapper">
  <aside class="app-sidebar">
    <div class="sidebar-header">CVR 2027</div>
    <nav class="app-content">…</nav>
    <div class="sidebar-footer">v1.0.0</div>
  </aside>
  <main class="app-main">
    <div class="top-bar">Circuito</div>
    <div class="app-content">…</div>
  </main>
</div>
```

| Clase | Rol |
|---|---|
| `.app-wrapper` | flex con sidebar + main |
| `.app-sidebar` | columna fija, con su propio fondo |
| `.sidebar-header` / `.sidebar-footer` | zonas fijas del sidebar |
| `.app-main` | contenido, con scroll |
| `.app-content` | área con padding del contenedor |
| `.top-bar` | barra superior con título |
| `.sidebar-overlay` | velo del sidebar en móvil |

## Marca

### `.brandmark`

```html
<a class="navbar-brand brandmark" href="#">Ui<span>Gas</span></a>
```

Korataki itálica, con el segundo término en rojo de marca. El `<span>` es lo que recibe el color.

### `.uig-sector`

La firma de marca del club: línea de 2px en el borde superior.

```html
<div class="uig-sector card">
  <div class="card-body">…</div>
</div>
```

Un `::before` absoluto de 2px en `--uig-red`. La clase ya pone `position: relative`, que es lo que lo permite.

### `.nav-badge`

Contador en un enlace de navegación.

```html
<a class="nav-link active" href="#">Mensajes <span class="nav-badge">4</span></a>
```

### `.nav-item-custom`

Item de navegación para acciones, separado del grupo de links sin separador visible.

```html
<ul class="navbar-nav">
  <li class="nav-item"><a class="nav-link" href="#">Temporada</a></li>
  <li class="nav-item-custom"><a class="nav-link" href="#">Cronograma</a></li>
</ul>
```

## Menores

| Clase | Qué es |
|---|---|
| `.unit` | sufijo de unidad junto a una cifra |
| `.org` | bloque de organización |
| `.w3` | wrapper de tres columnas del layout de marca |
| `.mobile-toggle` | botón de menú en móvil |

## Cómo se escriben

Todos consumen tokens, ninguno tiene literales:

```scss
.stat-value {
  font-family: var(--uig-font-data);
  font-variant-numeric: tabular-nums;
}
```

Si alguien tiene que mantener esto, **copia el patrón**: custom properties, y `!important` solo cuando compite con una utilidad de Bootstrap.

## Qué sigue

- [Enfoque](/extend/approach.html) — las decisiones de diseño
- [Iconos](/extend/icons.html)
- [Componentes](/customize/components.html) — qué hereda UiGas de Bootstrap