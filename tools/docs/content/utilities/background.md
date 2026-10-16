# Background

> `.bg-*` pone el color de fondo. Es la mitad de [color y fondo](/helpers/color-background.html); esta página es la lista de clases.

## Superficies

```html
<div class="bg-body p-3 mb-2">bg-body</div>
<div class="bg-body-secondary p-3 mb-2">bg-body-secondary</div>
<div class="bg-body-tertiary p-3">bg-body-tertiary</div>
```

## Paleta

```html
<div class="d-flex flex-wrap gap-2">
  <div class="bg-primary text-white p-2">bg-primary</div>
  <div class="bg-secondary text-white p-2">bg-secondary</div>
  <div class="bg-success text-white p-2">bg-success</div>
  <div class="bg-danger text-white p-2">bg-danger</div>
  <div class="bg-warning text-dark p-2">bg-warning</div>
  <div class="bg-info text-white p-2">bg-info</div>
</div>
```

## Especiales

```html
<div class="bg-black text-white p-2">bg-black</div>
<div class="bg-white text-dark p-2">bg-white</div>
<div class="bg-light p-2">bg-light</div>
<div class="bg-dark text-white p-2">bg-dark</div>
<div class="bg-transparent border p-2">bg-transparent</div>
```

## Implementación

```scss
.bg-body         { background-color: var(--uig-bg)         !important; }
.bg-body-secondary { background-color: var(--uig-surface)  !important; }
.bg-body-tertiary  { background-color: var(--uig-surface-2)!important; }
.bg-primary      { background-color: var(--uig-red-slab)  !important; }
.bg-secondary    { background-color: var(--uig-surface-2) !important; }
.bg-light        { background-color: var(--uig-surface-2) !important; }
```

> Todo con `!important`, como en Bootstrap. Es lo que hace que estas clases ganan sobre cualquier otra regla de fondo — y también lo que impide sobrescribirlas sin `!important`.

> `.bg-primary` usa `--uig-red-slab` (#e10600), no `--uig-red`. Igual que el botón primario: el slab es el único rojo que sostiene texto blanco con 4.97:1.

## Responsive

```html
<div class="bg-body-secondary p-3 mb-2 bg-dark-md">
  Cambia a grid de pista en md+
</div>
```

Las variantes responsive de Bootstrap (`bg-dark-md`) funcionan: el `!important` de la base y el de la variante compiten por orden, y la media query define cuál gana.

## Qué sigue

- [Color y fondo](/helpers/color-background.html)
- [Colores](/utilities/colors.html)
- [Bordes](/utilities/borders.html)