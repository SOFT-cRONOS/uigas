# Breadcrumb

> Versalitas como los badges y `.btn`. Marca el camino desde la raíz; no es navegación con flechas.

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Inicio</a></li>
    <li class="breadcrumb-item"><a href="#">Temporada 2027</a></li>
    <li class="breadcrumb-item active" aria-current="page">Córdoba</li>
  </ol>
</nav>
```

## Reglas de markup

Tres cosas que no son opcionales:

- El contenedor es `<ol>`: el orden importa y una lista lo dice.
- `<nav aria-label="breadcrumb">` alrededor: si hay más de un `<nav>` en la página (la navbar, por ejemplo), sin el label no se distinguen.
- `aria-current="page"` en la última. `.active` es solo visual; para el lector de pantalla la marca es el atributo.

> El separador es el `content` de `::before` de Bootstrap: `/`. UiGas no lo cambia.

## Con iconos

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb mb-0">
    <li class="breadcrumb-item"><a href="#" class="d-inline-flex align-items-center gap-1">
      <i class="bi bi-house-door"></i> Inicio
    </a></li>
    <li class="breadcrumb-item active" aria-current="page">Pilotos</li>
  </ol>
</nav>
```

## Centrado y con línea

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb justify-content-center">
    <li class="breadcrumb-item"><a href="#">Inicio</a></li>
    <li class="breadcrumb-item active" aria-current="page">Detalle</li>
  </ol>
</nav>
```

`justify-content-center` es de Bootstrap. **No hay `.breadcrumb-divider`** en Bootstrap 5.3: laspersonalizaciones de separador no existen desde la v4.

## Cuándo usarlo y cuándo no

> Breadcrumb sirve cuando el usuario necesita **saber dónde está dentro de una jerarquía**. En una página de detalle con un solo nivel de padre no aporta nada y agrega ruido.

Tres condiciones para que valga la pena:

1. La jerarquía tiene dos o más niveles.
2. El usuario puede volver a un nivel superior sin usar el botón atrás.
3. La ruta es estable entre sesiones.

Si el sitio tiene tres páginas, el breadcrumb es decoración.

## En tema claro

> `.breadcrumb-item.active` de Bootstrap usa `--bs-breadcrumb-item-active-color`, que UiGas no redefinió: sigue apuntando al gris de texto de Bootstrap. Se lee bien en ambos temas, pero es la única pieza de la ruta que no viene de un token de UiGas. Si querés que encaje con el resto, definí `--bs-breadcrumb-item-active-color: var(--uig-text-soft)` en `_tokens.scss`.

## Accesibilidad

- La última migaja no es enlace: `.active` + `aria-current="page"`.
- Cada nivel, un enlace real. No uses `<span>` para niveles intermedios: el usuario tiene que poder subir.
- No trunques la ruta con `text-truncate` sin un título con la ruta completa: en móvil se vuelve ilegible.

## Qué sigue

- [Paginación](/components/pagination.html)
- [Navbar](/components/navbar.html)