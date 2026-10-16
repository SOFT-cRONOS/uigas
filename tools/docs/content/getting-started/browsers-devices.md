# Navegadores y dispositivos

> UiGas necesita custom properties y `:focus-visible`: todo navegador moderno. No soporta Internet Explorer.

## Soporte

UiGas hereda el piso de soporte de Bootstrap 5.3 y no agrega requisitos nuevos por su cuenta:

| Navegador | Versiones |
|---|---|
| Chrome, Edge, Firefox | últimas versiones |
| Safari | 12+ en macOS, 12.2+ en iOS |
| Firefox | ESR |
| Samsung Internet | últimas versiones |

**Internet Explorer 11 no está soportado.** Bootstrap 5 lo dropeó y UiGas también: depende de custom properties CSS, que IE no implementa.

## Qué necesita UiGas específicamente

- **Custom properties** (`--bs-*`, `--uig-*`) — el mecanismo completo del tema depende de esto.
- **`:focus-visible`** — el anillo de foco solo aparece para navegación por teclado, no al hacer clic.
- **`gap` en flexbox** — en los contenedores flex y grid.
- **`inset`** — en sombras y overlays.

Todo eso está cubierto por las versiones de la tabla.

## Móviles

UiGas no define el `meta` de viewport: eso es responsabilidad de tu HTML. Sin él, la página se ve como escritorio en el móvil.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Los componentes tienen los puntos de quiebre de Bootstrap:

| Sufijo | Ancho | Comportamiento |
|---|---|---|
| `sm` | ≥ 576px | phones grandes |
| `md` | ≥ 768px | tablets |
| `lg` | ≥ 992px | laptops |
| `xl` | ≥ 1200px | desktops |
| `xxl` | ≥ 1400px | desktops grandes |

Sin sufijo la regla aplica a **todos** los anchos, que es como se comportan los valores por defecto de la mayoría de los componentes.

```html
<!-- colapsa en desktop, se apila en mobile -->
<button class="btn btn-primary btn-sm d-lg-inline-flex">Ver detalle</button>

<!-- siempre visible -->
<button class="btn btn-primary">Comprar</button>
```

## Tema del sistema

El tema por defecto sale de `prefers-color-scheme` cuando no hay preferencia guardada. Eso significa que un visitante con el sistema en claro ve la versión clara sin que tengas que hacer nada.

```html
<html data-bs-theme="dark">
```

Si fijás el atributo en el HTML, estás sobrescribiendo la preferencia del sistema: el visitante ve siempre ese tema. Es lo correcto para un panel de control o una app con su propio switch.

## Impresión

El CSS de esta documentación se adapta a papel: sin barra superior, sin sidebar y sin paginación. UiGas como framework no define reglas de impresión — si necesitás un ajuste para tus documentos, agregalo en tu hoja de estilos después de UiGas.

## Qué sigue

- [Tipografía](/content/typography.html) — cómo se ve el texto en cada tamaño
- [Reboot](/content/reboot.html) — los resets que aporta Bootstrap