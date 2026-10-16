# Input group

> `.input-group` es de Bootstrap; `.input-group-text` sí es de UiGas. El contenedor de Bootstrap aporta el pegado de bordes, lo que UiGas estiliza es el texto que va al lado del control.

## Texto previo

```html
<div class="input-group">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="usuario" aria-label="Usuario">
</div>
```

`.input-group-text` usa fondo `--uig-surface-2`, borde `--uig-line` y texto `--uig-text-dim`. El contraste entre ese fondo y el del control es lo que separa visualmente el addon del campo.

## Casillas

```html
<div class="input-group">
  <span class="input-group-text">https://</span>
  <input type="text" class="form-control" aria-label="Dominio">
  <span class="input-group-text">.com.ar</span>
</div>
```

## Botón pegado

```html
<div class="input-group">
  <input type="text" class="form-control" placeholder="Buscar" aria-label="Buscar">
  <button class="btn btn-primary" type="button">Buscar</button>
</div>
```

> Un `.btn-primary` pegado a un `.form-control` queda con fondo rojo sólido contra el fondo del campo. El contraste entre ambos es alto y funciona, pero si querés que el botón se lea como parte del control, usá `.btn-outline-secondary`:UiGas le pone borde `--uig-line-strong` en tema claro y el conjunto se ve más unido.

## Tamaño compacto

```html
<div class="input-group input-group-sm">
  <span class="input-group-text">€</span>
  <input type="text" class="form-control" aria-label="Importe">
</div>
```

`.input-group-sm` y `.input-group-lg` son de Bootstrap. La altura cambia; el fondo del `.input-group-text` lo pone UiGas.

## Con textarea

```html
<div class="input-group">
  <span class="input-group-text align-self-start">Nota</span>
  <textarea class="form-control" rows="2" aria-label="Nota"></textarea>
</div>
```

`align-self-start` alinea el addon con el borde superior. Sin él, el texto queda centrado contra un textarea alto y se ve descolgado.

## Con checkbox o select

```html
<div class="input-group">
  <input type="checkbox" class="form-check-input mt-2 ms-2 me-2" id="verif" aria-label="Verificado">
  <input type="text" class="form-control" aria-label="Buscar">
</div>

<div class="input-group">
  <select class="form-select" style="max-width: 9rem" aria-label="Categoría">
    <option>Todas</option>
  </select>
  <input type="text" class="form-control" placeholder="Buscar" aria-label="Buscar">
</div>
```

> Con `max-width` en el select: los `form-select` por defecto ocupan todo el ancho disponible y dejan el campo de búsqueda aplastado. El ancho del selector depende de tu diseño, no del framework.

## Accesibilidad

- Cada control dentro del grupo necesita su propio nombre: `aria-label` o un `<label>` oculto con `.visually-hidden`.
- El texto del addon (`@`, `https://`) es decorativo si el label del campo ya lo dice. Si aporta información ("pesos", "USD"), es parte del nombre accesible.

## Qué sigue

- [Labels flotantes](/forms/floating-labels.html)
- [Layout](/forms/layout.html) — cómo usar la retícula
- [Accesibilidad](/forms/accessibility.html)