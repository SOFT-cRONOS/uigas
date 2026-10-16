# Badges

> Un solo badge sólido y ocho `badge-soft-*`. El soft es el que más se usa: tinte del color de la familia sobre la superficie, con el texto en la versión legible de ese color.

## Sólidos

```html
<span class="badge text-bg-primary">Principal</span>
<span class="badge text-bg-secondary">Secundario</span>
<span class="badge text-bg-success">Confirmado</span>
<span class="badge text-bg-danger">Vencido</span>
<span class="badge text-bg-warning">Pendiente</span>
<span class="badge text-bg-info">Nuevo</span>
<span class="badge text-bg-light">Claro</span>
<span class="badge text-bg-dark">Oscuro</span>
```

UiGas los pone en versalitas con tracking 0.06em y peso 700, y los alinea en línea con un `gap` para que el texto no quede pegado al borde.

## `badge-soft-*`

La variante propia. Fondo teñido al 14%, borde al 42%, texto en la versión legible:

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

Cada uno define tres custom properties que el `.badge-soft` consume:

```scss
--uig-badge-fg: #f92121;              /* texto */
--uig-badge-bg: rgba(249, 33, 33, .14); /* fondo */
--uig-badge-bd: rgba(249, 33, 33, .42); /* borde */
```

## Tema claro

> En oscuro, `--uig-badge-fg` usa el tono plano de la familia (#ff4d44, #4ade80…). Sobre la superficie clara esos valores no se leen: los ocho `badge-soft` tienen su reescritura en `_theme-light.scss` con el versante oscuro (#b30500, #166534, #92400e, #0369a1).

```html
<span class="badge badge-soft badge-soft-success">APTO</span>
<span class="badge badge-soft badge-soft-danger">DESAPTO</span>
```

Es el mismo criterio de [alertas](/components/alerts.html). Por eso hay tres capas del mismo patrón: alertas, badges y botones outline.

## Dentro de un botón

```html
<button class="btn btn-primary position-relative">
  Bandeja
  <span class="badge text-bg-light position-absolute top-0 start-100 translate-middle">12</span>
</button>
```

## Con punto

```html
<span class="badge badge-soft badge-soft-success">
  <i class="bi bi-circle-fill" style="font-size:.55em"></i> En vivo
</span>
```

> El punto no tiene componente propio: es un ícono con tamaño relativo. Para que no dependa de Bootstrap Icons, un `<span>` con `border-radius:50%` y un fondo alcanza.

## `.nav-badge`

Contador dentro de un elemento de navegación:

```html
<ul class="nav">
  <li class="nav-item">
    <a class="nav-link active" href="#">Mensajes <span class="nav-badge">4</span></a>
  </li>
</ul>
```

`.nav-badge` es propia de UiGas: fondo `--uig-red-slab`, texto blanco, forma de píldora. Es el contador que aparece en la barra lateral de la app.

## Píldoras

```html
<span class="badge rounded-pill text-bg-primary">100%</span>
```

`rounded-pill` es de Bootstrap y usa `50rem` de radio. Sobre el badge de UiGas (que tiene 3px de radio) produce una cápsula completa.

## Accesibilidad

- El texto del badge **no** es un color, es un estado. `VENCIDO` se lee; un punto rojo solo no.
- Los badges decorativos que acompañan a un texto que ya dice lo mismo van con `aria-hidden="true"`. Repetir "12" en el botón y en su `aria-label` duplica la lectura.
- No uses el color como única diferencia entre dos badges. `APTO` y `REVISAR` en verde y ámbar: sin texto, es ruido.

## Qué sigue

- [Botones](/components/buttons.html)
- [Alertas](/components/alerts.html)
- [Paginación](/components/pagination.html) — donde los `.nav-badge` también aparecen