# Componentes

> Qué redefine UiGas y qué hereda. La misma frontera que atraviesa toda esta documentación, junta en una tabla.

## Cómo se reescribe un componente

UiGas usa **dos mecanismos**, y entender cuál toca cuándo es lo más importante de esta página.

### 1. Custom properties de Bootstrap

Bootstrap expone el estado de cada componente como variables. UiGas las reescribe sin tocar la regla que las consume:

```scss
.btn-primary {
  --bs-btn-bg:          var(--uig-red-slab);
  --bs-btn-hover-bg:    var(--uig-red-lo);
  --bs-btn-active-bg:   var(--uig-red-deep);
}
```

Bootstrap aplica después `background-color: var(--bs-btn-bg)`. La regla de UiGas y la de Bootstrap tienen la misma especificidad, así que **gana la que aparece después en el CSS** — y UiGas se carga después.

Es el mecanismo preferred: no hay pelea de cascada, y el tema se resuelve por token.

### 2. Selectores propios

Cuando el componente necesita más que cambiar un color:

```scss
.alert {
  border: 1px solid var(--bs-alert-border-color, var(--uig-line));
  padding: 1rem 1.25rem 1rem 3rem;   /* espacio para el marcador */
  position: relative;
}
.alert::before { /* cuadrado de 0.6rem, el marcador de estado */ }
```

### 3. El tercer mecanismo: `_theme-light.scss`

Cuando un valor de tema oscuro no sirve en claro y un token no alcanza:

```scss
[data-bs-theme="light"] .alert-success {
  --bs-alert-color: #166534;
}
```

Estos tienen la misma especificidad que la regla base y ganan por orden. Por eso `@use "theme-light"` es **la última línea** de `style.scss`.

## El mapa completo

### Redefinidos por UiGas

| Componente | Mecanismo |
|---|---|
| `.alert`, `.alert-*` (8) | selectores + `--bs-alert-*` |
| `.btn`, `.btn-*` (26) | `--bs-btn-*` |
| `.badge`, `.badge-soft-*` (8) | `--uig-badge-*` |
| `.card`, `.card-featured` | selectores |
| `.accordion`, `.accordion-button` | `--bs-accordion-*` |
| `.dropdown-menu`, `.dropdown-item` | `--bs-dropdown-*` |
| `.form-control`, `.form-select`, `.form-range` | selectores |
| `.form-check-input` | selectores |
| `.input-group-text` | selectores |
| `.modal-*`, `.offcanvas-*` | selectores |
| `.navbar-*`, `.nav-link`, `.nav-tabs`, `.nav-pills` | `--bs-nav-*` |
| `.pagination`, `.page-link` | `--bs-pagination-*` |
| `.progress`, `.progress-bar` | `--bs-progress-*` |
| `.toast`, `.tooltip`, `.popover` | selectores |
| `.spinner-*`, `.placeholder`, `.table` | selectores |
| `.list-group` | `--bs-list-group-*` |
| `.btn-close` | SVG propio + `filter: none` |

### Heredados de Bootstrap

`.container` · `.row` · `.col-*` · `.g-*` · `.d-*` · `.m-*` · `.p-*` · `.w-*` · `.h-*` · `.position-*` · `.opacity-*` · `.z-*` · `.ratio` · `.vr` · `.clearfix` · `.stack` · `.text-truncate` · `.form-check` (contenedor) · `.form-switch` · `.form-floating` · `.input-group` (contenedor) · `.col-form-label` · `.link-*` · `.focus-ring` · `.icon-link`

### Propios de UiGas (sin equivalente en Bootstrap)

27 clases. Ver [Componentes UiGas](/extend/components.html).

## Los tres mecanismos en la práctica

| Necesitás | Usá |
|---|---|
| Cambiar un color de estado | variable `--bs-*-*` |
| Cambiar forma, tamaño o estructura | selector propio |
| Algo que en claro no funciona con tokens | `_theme-light.scss` |

El tercer caso es el que más se subestima. Antes de escribir un override por tema, probá si un token no alcanza: si alcanza, es mejor — funciona para cualquier consumidor que redefina ese token.

## Agregar un componente

1. Nuevo parcial en `src/scss/_componente.scss`
2. `@use "componente";` en `style.scss`, **en la posición que le corresponde por cascada**
3. Preferí las variables `--bs-*-*` de Bootstrap si existen; si no, definí tus propias custom properties

```scss
/* parcial nuevo */
.mi-componente {
  background: var(--uig-surface);
  border: 1px solid var(--uig-line);
  color: var(--uig-text);
}
```

Nunca uses valores literales: así hereda el tema sin trabajo extra.

## Qué sigue

- [Variables CSS](/customize/css-variables.html)
- [Extender](/extend/approach.html) — la filosofía
- [Optimizar](/customize/optimize.html)