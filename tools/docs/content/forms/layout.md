# Layout

> La retícula de formularios es de Bootstrap; el tratamiento visual de los controles, de UiGas. Aqui lo importante es qué combinás.

## Una columna

```html
<form class="row g-3">
  <div class="col-12">
    <label for="l1" class="form-label">Nombre y apellido</label>
    <input type="text" class="form-control" id="l1">
  </div>
  <div class="col-12">
    <label for="l2" class="form-label">Correo</label>
    <input type="email" class="form-control" id="l2">
  </div>
  <div class="col-12">
    <button class="btn btn-primary">Guardar</button>
  </div>
</form>
```

## Dos columnas

```html
<form class="row g-3">
  <div class="col-md-6">
    <label for="a1" class="form-label">Circuito</label>
    <input type="text" class="form-control" id="a1">
  </div>
  <div class="col-md-6">
    <label for="a2" class="form-label">Vueltas</label>
    <input type="number" class="form-control" id="a2" value="58">
  </div>
</form>
```

## Tamaño automático

```html
<div class="row g-3">
  <div class="col-auto">
    <input type="text" class="form-control" placeholder="Buscar">
  </div>
  <div class="col">
    <input type="text" class="form-control" placeholder="Filtrar por piloto">
  </div>
</div>
```

`col-auto` toma lo que necesita el contenido; `col` toma el resto. Es la forma de alinear un campo de búsqueda corto con uno largo.

## Anotaciones horizontales

Bootstrap trae `.form-floating` y también el patrón horizontal con `.col-form-label`:

```html
<form class="row g-2 align-items-center">
  <div class="col-auto">
    <label for="h1" class="col-form-label">Piloto</label>
  </div>
  <div class="col">
    <input type="text" class="form-control" id="h1" value="M. Rossi">
  </div>
</form>
```

> `.col-form-label` es de Bootstrap y conserva su estilo: no adopta la voz `.form-label` de UiGas (versalitas, 0.85rem). Si querés el mismo tratamiento tipográfico en horizontal, poné `.form-label` y alineá con utilidades flex en vez de usar `.col-form-label`:

```html
<div class="row g-2 align-items-center">
  <div class="col-auto">
    <label for="h2" class="form-label mb-0">Piloto</label>
  </div>
  <div class="col">
    <input type="text" class="form-control" id="h2" value="M. Rossi">
  </div>
</div>
```

## Qué usar y qué evitar

| Necesitás | Usá |
|---|---|
| Campos de ancho fijo | `.col-md-6`, `.col-lg-4` |
| Un campo corto junto a uno largo | `.col-auto` + `.col` |
| Label a la izquierda | `.form-label` + flex (no `.col-form-label`) |
| Separación entre campos | `g-3` en la `.row` |

`mb-3` en cada columna funciona igual que `g-3` en la fila, pero `g-3` también junta las columnas horizontalmente. Con varios campos en fila, `g-3` es lo correcto.

> Evitá mezclar `mb-3` dentro de las columnas **y** `g-3` en la fila: los dos de spacing se suman y la separación vertical queda el doble que la horizontal.

## Qué sigue

- [Validación](/forms/validation.html)
- [Accesibilidad](/forms/accessibility.html)
- [Grid](/layout/grid.html) — las columnas en detalle