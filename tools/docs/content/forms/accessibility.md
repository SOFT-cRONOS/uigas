# Accesibilidad

> Lo mínimo para que un formulario sea usable sin mouse, sin ver bien los colores y con lector de pantalla.

UiGas aporta el foco visible en rojo y los contrastes medidos. El resto son reglas de HTML, no de CSS.

## Etiquetas

Cada control tiene un `<label for>` con el `id` del control.

```html
<label for="email" class="form-label">Correo</label>
<input type="email" class="form-control" id="email">
```

El `placeholder` **no** es un label: desaparece al escribir, muchos navegadores lo muestran en gris bajo, y no sobrevive a la lectura automática. Es un ejemplo, no un rótulo.

Sin label visible, usá `.visually-hidden` (de Bootstrap):

```html
<label for="q" class="visually-hidden">Buscar pilotos</label>
<input type="search" class="form-control" id="q" placeholder="Buscar…">
```

## Foco

El foco de UiGas es borde rojo + halo `0 0 0 3px rgba(249,33,33,.2)`. Visible contra superficie y suficiente contraste.

Un problema conocido: el `input[type=range]` **no muestra foco por teclado** sobre el pulgar. Cubrilo:

```html
<style>
  .form-range:focus-visible { outline: 2px solid var(--uig-red); outline-offset: 4px; }
</style>
```

## No te guíes solo por el color

Es la regla que más se incumple. `.is-invalid` pinta el borde de rojo y `.is-valid` de verde: quien no distingue esos colores no sabe qué estado tiene el campo.

Sumale texto. El `.invalid-feedback` de Bootstrap ya abre con "Error:", lo que cubre el caso:

```html
<div class="invalid-feedback">Necesitás un correo válido.</div>
```

## Anunciar errores

Tres atributos, y son acumulativos:

```html
<input type="email" class="form-control is-invalid" id="email"
       aria-describedby="email-error" aria-invalid="true">
<div class="invalid-feedback d-block" id="email-error">Ese correo ya está registrado.</div>
```

- `aria-describedby` — el mensaje se lee cuando el campo recibe foco
- `aria-invalid="true"` — el estado se anuncia
- `aria-live="polite"` en un contenedor si los mensajes aparecen tras enviar

## Errores a nivel de formulario

Un error de servidor que impide el envío no pertenece a un campo. Va arriba, y en muchos casos el foco debería moverse a ese bloque:

```html
<div class="alert alert-danger" role="alert" tabindex="-1" id="err-global">
  No pudimos guardar los cambios. Revisá los campos marcados.
</div>
```

`role="alert"` hace que el lector de pantalla lo anuncie al aparecer. `tabindex="-1"` permite enfocarlo por script.

## Errores que llegan después

Si la validación la hace el servidor, el mensaje no puede existir solo en el markup: hay que insertarlo y actualizar `aria-describedby` y `aria-invalid` por JS. Es lo único que un formulario no resuelve solo.

## Contrastes ya resueltos

| Elemento | Oscuro | Claro |
|---|---|---|
| Texto de ayuda (`.form-text`) | 4.75:1 | 5:1 |
| Label (`.form-label`) | `--uig-text-dim` | `--uig-text-dim` |
| Borde válido | — | 6.3:1 (bajado de 2:1) |
| Borde inválido | -- | 6.3:1 |
| Tick del check marcado | 4.97:1 | 4.97:1 |

## Tamaño de toque

Los objetivos táctiles deberían medir **44×44px** como mínimo. Con `.form-control-sm` (altura reducida) no llegás en móvil. En pantallas táctiles, andá con el tamaño normal.

## Autocompletado

```html
<input type="text" class="form-control" autocomplete="organization" aria-label="Organización">
<input type="text" class="form-control" autocomplete="off">
```

Usá los tokens de HTML correctos: sin `autocomplete`, el navegador no ofrece guardar ni rellenar, que es buena parte de la experiencia de formulario.

## Qué sigue

- [Labels flotantes](/forms/floating-labels.html) — el caso donde la etiqueta no acompaña
- [Validación](/forms/validation.html) — los atributos, en detalle
- [Alertas](/components/alerts.html) — avisos de formulario