# Alertas

> Hairline completo, superficie teñida y un marcador de estado. No hay franja lateral: en superficies oscuras una franja de 4px compite con el borde y las esquinas se ven torcidas.

## Anatomía

```html
<div class="alert alert-success" role="alert">
  <strong class="alert-heading">Inscripción confirmada</strong>
  Tu número de piloto es <strong>ARG-421</strong>.
</div>
```

Tres piezas: el marcador (el `::before` cuadrado de 0.6rem), el `.alert-heading` opcional en versalitas, y el texto. Todohereda `--bs-alert-color`.

## Variantes

```html
<div class="alert alert-primary" role="alert">Marcador de color de marca.</div>
<div class="alert alert-secondary" role="alert">Nota informativa neutra.</div>
<div class="alert alert-success" role="alert">Operación correcta.</div>
<div class="alert alert-danger" role="alert">Algo falló.</div>
<div class="alert alert-warning" role="alert">Revisá antes de continuar.</div>
<div class="alert alert-info" role="alert">Dato de contexto.</div>
<div class="alert alert-light" role="alert">Aviso neutro.</div>
<div class="alert alert-dark" role="alert">Aviso de máxima importancia.</div>
```

## Tema claro: por qué cambia

> El caso más importante de esta página. En tema oscuro los acentos usan tonos planos brillantes: `#ff4d44`, `#4ade80`, `#fbbf24`, `#7dd3fc`. Sobre una superficie oscura se leen bien. Sobre la superficie clara miden **1.93:1** y **2.79:1**: el texto de la alerta desaparece.
>
> `_theme-light.scss` reescribe las ocho variantes con el versante oscuro de cada familia — `#b30500`, `#166534`, `#92400e`, `#0369a1`. Medidos entre 4.26:1 y 6.07:1.

```html
<div class="alert alert-success" role="alert">La misma alerta, en tema claro.</div>
```

Es el mismo criterio que en [botones outline](/components/buttons.html), [validación de formularios](/forms/validation.html) y en `btn-ghost`: **sobre base clara, todo acento plano se reemplaza por su versión oscura.**

## Estructura

```html
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong class="alert-heading">Faltan documentos</strong>
  <p class="mb-0">Subí el permiso de conducir antes del viernes.</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
</div>
```

Tres cosas:

- `.alert-dismissible` suma padding a la derecha para que el `.btn-close` no pise el texto.
- `fade show` hace la transición de Bootstrap. Con JS ausente el `fade` sin `show` deja la alerta invisible — **si no cargás `bootstrap.bundle.js`, quitá el `fade`**.
- `role="alert"` hace que un lector de pantalla anuncie la alerta al aparecer. Sin JS no hay necesidad de `role="alert"`: el contenido ya está en el DOM.

> El `.btn-close` de Bootstrap trae la cruz en un SVG con gris fijo. `_theme-light.scss` lo reescribe con `#52525b` para que no se pierda sobre fondo claro.

## Enlaces dentro

```html
<div class="alert alert-info" role="alert">
  Hay una <a href="#" class="alert-link">reglamentación nueva</a> para esta categoría.
</div>
```

`.alert` pone `a { color: inherit }`, así que el enlace hereda el color de la variante y se diferencia por el subrayado. El hover lo aclara.

## En una card

```html
<div class="card">
  <div class="card-body">
    <div class="alert alert-danger mb-0" role="alert">No pudimos guardar los cambios.</div>
  </div>
</div>
```

`mb-0` evita la franja vacía contra el borde de la card.

## Cuándo usar cada variante

| Variante | Para |
|---|---|
| `success` | la operación se completó |
| `danger` | error, con lo que hay que hacer al lado |
| `warning` | algo bloquea pero tiene solución |
| `info` | contexto, no requiere acción |
| `primary` | el color de marca, para lo más importante de la vista |
| `secondary` / `light` / `dark` | notas neutras |

> Reservá el rojo. Una página con cuatro `.alert-danger` no comunica urgencia: comunica CET 7. Si todo es urgente, nada lo es.

## Accesibilidad

- `role="alert"` para alertas que aparecen por JS. `role="status"` si son menos urgentes.
- Un cierre por teclado debe devolver el foco a algo razonable. Bootstrap lo deja en el `body`, lo que pierde la posición: si tenés muchos cerrables, gestionalo vos.
- La alerta no debería ser el **único** lugar donde vive información importante: si se puede descartar, algo se perdió.
- No uses solo el color: el marcador, el encabezado en versalitas y el texto distinguen cada variante.

## Qué sigue

- [Toast](/components/toasts.html) — avisos que no bloquean
- [Progreso](/components/progress.html)