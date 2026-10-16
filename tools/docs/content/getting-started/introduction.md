# Introducción

> UiGas es una capa de override visual sobre Bootstrap 5. Reemplaza tipografía, superficies, estados y componentes, y deja el grid y las utilidades de layout como están.

UiGas no reemplaza Bootstrap. Se apoya en él. La diferencia está en **qué** se reescribe:

- **UiGas redefine** los tokens (`--uig-*`), los custom properties de Bootstrap (`--bs-*`) y los estilos visuales de los componentes. Ahí es donde aparece el tema.
- **UiGas no redefine** el reboot, el grid (`.row`, `.col-*`) ni las utilidades de layout. Las hereda de Bootstrap y las tematiza con sus propios tokens.

Esa frontera importa porque define qué puedes esperar de cada sección de esta documentación. Cuando una página dice *lo trae Bootstrap*, es literal.

## Requisitos

Necesitás Bootstrap 5.3 cargado **antes** de UiGas, porque UiGas redefine variables que Bootstrap aplica con la misma especificidad: gana el que viene último.

```html
<!-- 1 · Fuentes -->
<link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- 2 · Bootstrap 5 — SIEMPRE primero -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- 3 · UiGas — SIEMPRE después -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/softcronos/ui_gas@v1.0.0/dist/uigas.min.css">

<!-- 4 · Bootstrap JS, para los componentes interactivos -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

Si invertís el orden de los estilos, UiGas se aplica pero Bootstrap pisa los valores por defecto: los componentes se ven genéricos y los tokens de marca no toman efecto.

## El resultado

Este botón es un `.btn-primary` de Bootstrap. No hay HTML especial: el aspecto sale entero de los tokens.

```html
<div class="d-flex gap-2 flex-wrap">
  <button class="btn btn-primary">Primario</button>
  <button class="btn btn-outline-primary">Outline</button>
  <button class="btn btn-ghost">Ghost</button>
  <button class="btn btn-primary" disabled>Deshabilitado</button>
</div>
```

Probá a cambiar el tema con el botón de arriba a la derecha. El mismo HTML se ve distinto sin tocar una sola clase, porque las dos capas del tema —superficies y texto— se reescriben juntas.

## Los dos temas

`data-bs-theme` en `<html>` conmuta todo. No hay que cambiar ni una clase en el HTML:

```html
<html data-bs-theme="light">
```

La paleta de marca —el rojo CVR, la rampa de grises— es idéntica en los dos temas. Lo que cambia es la capa semántica:

| Capa | Dark | Light |
|---|---|---|
| Fondo base | #141414 | #ececf0 |
| Superficie elevada | #111111 | #ffffff |
| Línea | #1f1f1f | #d8d8dc |
| Texto | #ededed | #2a2a2a |

Los acentos de estado también cambian: en oscuro se usan tonos planos brillantes, en claro el versante oscuro del mismo color, porque sobre base clara un `#4ade80` no llega a 2:1 de contraste.

## Qué sigue

- [Instalación](/getting-started/installation.html) — las tres formas de consumirlo
- [Contenido](/getting-started/contents.html) — el mapa completo de esta documentación
- [Tipografía](/content/typography.html) — las cinco voces del framework
- [Componentes](/components/buttons.html) — alertas, botones, cards y el resto