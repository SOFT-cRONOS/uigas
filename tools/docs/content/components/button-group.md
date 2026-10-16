# Grupo de botones

> Un conjunto de acciones mutuamente excluyentes pegadas entre sí. La estructura es de Bootstrap; el color y el foco, de UiGas.

## Básico

```html
<div class="btn-group" role="group" aria-label="Vista">
  <button type="button" class="btn btn-outline-secondary active" aria-pressed="true">Lista</button>
  <button type="button" class="btn btn-outline-secondary" aria-pressed="false">Tabla</button>
  <button type="button" class="btn btn-outline-secondary" aria-pressed="false">Mapa</button>
</div>
```

## Con `role="group"`

Cuando el grupo es un conjunto de controles, el `aria-label` es lo que dice a un lector de pantalla qué agrupa. Sin él, los botones se anuncian sueltos.

Si el grupo es un **selector de estado** —solo uno puede estar activo— `aria-pressed` en cada botón describe el estado individual mejor que `role="group"`. Lo correcto es combinarlos:

```html
<div class="btn-group" role="group" aria-label="Vista">
  <button type="button" class="btn btn-outline-secondary active" aria-pressed="true">…</button>
</div>
```

## Unir inputs

```html
<div class="btn-group" role="group" aria-label="Rango">
  <input type="text" class="form-control" placeholder="Desde" aria-label="Vuelta desde">
  <span class="input-group-text">–</span>
  <input type="text" class="form-control" placeholder="Hasta" aria-label="Vuelta hasta">
</div>
```

> `.btn-group` y `.input-group` se comportan igual en la unión de bordes. La diferencia: `input-group` usa `--uig-surface-2` para los addons, `btn-group` usa `--uig-line`. Para campos, `input-group` es la que corresponde.

## Toolbar

```html
<div class="btn-toolbar" role="toolbar" aria-label="Edición">
  <div class="btn-group me-2" role="group" aria-label="Alinear">
    <button type="button" class="btn btn-outline-secondary">⯇</button>
    <button type="button" class="btn btn-outline-secondary">↕</button>
    <button type="button" class="btn btn-outline-secondary">⯈</button>
  </div>
  <div class="btn-group" role="group" aria-label="Formato">
    <button type="button" class="btn btn-outline-secondary"><strong>B</strong></button>
    <button type="button" class="btn btn-outline-secondary"><em>I</em></button>
  </div>
</div>
```

`btn-toolbar` es de Bootstrap. Los grupos se separan con `me-2`.

## Tamaño y vertical

```html
<div class="btn-group btn-group-sm" role="group" aria-label="Compacto">…</div>
<div class="btn-group-vertical" role="group" aria-label="Apilado">…</div>
```

Ambos de Bootstrap. El focus ring de UiGas se ve en los bordes internos también; los radios chicos (2–4px) hacen que el grupo se lea como una pieza.

## Botones con estado

```html
<div class="btn-group" role="group" aria-label="Carga">
  <input type="radio" class="btn-check" name="carga" id="c1" checked>
  <label class="btn btn-outline-secondary" for="c1">Ligera</label>
  <input type="radio" class="btn-check" name="carga" id="c2">
  <label class="btn btn-outline-secondary" for="c2">Completa</label>
</div>
```

`.btn-check` es de Bootstrap: un input invisible que toma el estado del `<label>`. Funciona sin JS, y a diferencia de una pestaña activa con JS, el estado es real en el formulario.

> Limitación de Bootstrap: el botón marcado usa `.btn-check:checked + .btn` con el fondo de la variante. En tema claro eso significa el fondo sólido de marca con texto blanco — legible, pero no es el mismo tratamiento que el estado hover del resto de UiGas. Si te importa, hay que reescribir `.btn-check:checked + .btn` por tema.

## Accesibilidad

- `role="group"` + `aria-label`: sin esto el grupo no se anuncia.
- `aria-pressed` en cada botón de un selector de estado. `active` sola es visual.
- Los separadores visuales entre grupos de un toolbar no son texto: no los agregues como `|` en el HTML.
- Un grupo con más de cinco botones es difícil de recorrer con Tab. Considerá un `<select>`.

## Qué sigue

- [Botones](/components/buttons.html)
- [Input group](/forms/input-group.html)