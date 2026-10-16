# Instalación

> Tres formas de consumir UiGas: CDN, archivo local o npm. Las tres necesitan Bootstrap 5 y las fuentes de Google Fonts.

UiGas son dos archivos: `dist/uigas.min.css` (50 KB minificado) y `dist/uigas.css` (expandido, para debug). No trae JavaScript.

## CDN

Lo más simple para probar. jsDelivr sirve el repo, así que no hay build ni registro.

```html
<!-- Bootstrap 5 — SIEMPRE primero -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- UiGas — después -->
<link href="https://cdn.jsdelivr.net/gh/softcronos/ui_gas@v1.0.0/dist/uigas.min.css" rel="stylesheet">

<!-- Bootstrap JS, para los componentes interactivos -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

Fijá la versión (`@v1.0.0`) en producción. `@latest` sirve el último tag del repo y puede cambiar sin aviso.

### Fuentes

UiGas usa cuatro familias. La de Google Fonts va en el `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Korataki no está en Google Fonts: se resuelve con `@font-face` + `local()` desde la fuente instalada en el sistema. Si no la tenés, cae a Barlow Condensed 900 itálica — que es justamente el fallback que ya usa el logo en el brandbook.

## Archivo local

Para builds sin red en runtime, o si querés servir todo desde tu propio dominio:

```html
<link href="css/uigas.min.css" rel="stylesheet">
```

## npm

```bash
npm install uigas
```

```js
import 'uigas/dist/uigas.min.css';
```

UiGas declara `bootstrap` como *peer dependency* (`^5.3.0`): no lo instala ni lo empaqueta, porque el proyecto que lo consume ya debería tener su propia versión de Bootstrap.

## Orden de carga

Este es el punto donde más se rompe. UiGas redefine las variables `--bs-*` con la **misma especificidad** que Bootstrap, así que gana el que aparece después en la cascada.

| Orden | Resultado |
|---|---|
| UiGas → Bootstrap | ❌ Bootstrap pisa los tokens: todo se ve genérico |
| Bootstrap → UiGas | ✅ |

Si ves botones azules o surfaces blancas cuando usando tokens de UiGas, revisá esto primero.

## Verificar la instalación

Abrí este ejemplo. Los cuatro botones deberían ser rojos y con versalitas; si alguno sale azul, el orden está invertido:

```html
<button class="btn btn-primary">Primario</button>
<button class="btn btn-success">Éxito</button>
<button class="btn btn-outline-danger">Peligro</button>
<button class="btn btn-ghost">Ghost</button>
```

Después probá el toggle de tema: el mismo HTML tiene que verse distinto en claro y oscuro sin tocar una sola clase.

## Qué sigue

- [Contenido](/getting-started/contents.html) — el mapa de las 89 páginas
- [Herramientas de build](/getting-started/build-tools.html) — para trabajar sobre el SCSS
- [Navegadores y dispositivos](/getting-started/browsers-devices.html) — qué soporta