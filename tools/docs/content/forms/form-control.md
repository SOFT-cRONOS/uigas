# Form control

> Texto, password, número, fecha, archivo y áreas. Todos comparten el mismo tratamiento: superficie del tema, línea del tema, foco rojo.

## Estados

```html
<input type="text" class="form-control" placeholder="Nombre">
<input type="text" class="form-control" disabled>
<input type="text" class="form-control" readonly value="No editable">
```

- **normal** — fondo `--uig-surface`, borde `--uig-line`
- **foco** — borde `--uig-red`, halo `0 0 0 3px rgba(249,33,33,.2)`, sin `outline`
- **deshabilitado** — fondo `--uig-bg-deep`, opacidad 0.6, cursor por defecto
- **solo lectura** — se ve normal pero no acepta escritura

## Tamaños

Bootstrap mantiene `.form-control-sm` y `.form-control-lg`. UiGas no los redefine: funcionan sobre el mismo fondo y borde.

```html
<input type="text" class="form-control form-control-sm" placeholder="Chico">
<input type="text" class="form-control form-control-lg" placeholder="Grande">
```

## Tipos

```html
<input type="email" class="form-control" placeholder="correo@dominio.com">
<input type="password" class="form-control" placeholder="Contraseña">
<input type="number" class="form-control" placeholder="58">
<input type="date" class="form-control">
<input type="tel" class="form-control" placeholder="+54 351 ...">
```

> Los tipos nativos que muestran icono o *spinner* (`number`, `date`, `time`) los dibuja el navegador y **no** heredan el color del tema. En oscuro el icono del spinner queda gris sobre fondo oscuro y se ve, pero el calendario abre con la UI del sistema. Si necesitás control total sobre eso, construí el control a mano con `inputmode` y un `<input type="text">`.

## Áreas de texto

```html
<textarea class="form-control" rows="3" placeholder="Notas de la carrera"></textarea>
```

`rows` fija la altura inicial; el textarea sigue siendo redimensionable salvo que le pongas `resize-none` de Bootstrap.

## Archivos

```html
<input type="file" class="form-control">
```

> El botón nativo del selector de archivos no se puede estilizar: es chrome del sistema operativo. Para un estilo consistente hace falta un `<label>` con `.btn` que dispare un input oculto — es un patrón propio del proyecto, no viene con UiGas ni con Bootstrap.

## Valor fijo

```html
<input type="text" class="form-control" value="ARG-421">
```

## Con texto de ayuda

```html
<label for="cbu" class="form-label">CBU</label>
<input type="text" class="form-control" id="cbu" maxlength="22" inputmode="numeric">
<div class="form-text">Sin guiones ni espacios.</div>
```

`.form-text` va debajo y usa `--uig-text-muted`. Para asociarlo formalmente al control, apuntá `aria-describedby="cbu-help"` y dále ese `id` al texto de ayuda.

## Accesibilidad

- `<label for>` siempre. El `placeholder` no reemplaza al label.
- `maxlength` e `inputmode` ayudan en móvil sin quitar control.
- Los campos de contraseña necesitan un toggle visible, no solo un icono: un botón con `aria-pressed`.

## Qué sigue

- [Select](/forms/select.html)
- [Checks y radios](/forms/checks-radios.html)
- [Input group](/forms/input-group.html)