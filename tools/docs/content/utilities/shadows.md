# Sombras

> Tres pasos, todos con negro fijo. En tema oscuro funcionan; en claro la sombra casi no se ve.

```html
<div class="shadow-sm p-3 mb-3">shadow-sm</div>
<div class="shadow p-3 mb-3">shadow</div>
<div class="shadow-lg p-3">shadow-lg</div>
```

## Los tres valores

```scss
.shadow-sm { box-shadow: 0 2px 6px  rgba(0,0,0,.35) !important; }
.shadow    { box-shadow: 0 6px 18px rgba(0,0,0,.5)  !important; }
.shadow-lg { box-shadow: 0 12px 32px rgba(0,0,0,.65) !important; }
```

## Qué hace la sombra

**En tema oscuro, casi nada.** Sobre `#141414`, un negro al 50% no separa nada: oscurece un fondo que ya es el más oscuro. La profundidad en UiGas oscuro viene de dos cosas:

1. el **salto de valor** entre `--uig-bg` y `--uig-surface` (`#141414` → `#111111`),
2. el **hairline** de `--uig-line` (`#1f1f1f`).

La sombra es la tercera capa, no la principal.

**En tema claro, es invisible.** Negro al 50% sobre `#f0f0f3` apenas oscurece. Por eso las superficies claras de este framework bajaron de blanco puro a `#f0f0f3`: para que el salto de valor —y no la sombra— sea lo que define la profundidad.

> Consecuencia práctica: **`.shadow-lg` en tema claro no aporta nada que no aporte `.shadow-sm`.** Si tu layout depende de que la sombra se vea, la sombra no es la herramienta correcta en claro.

## La sombra de la card

```html
<div class="card"><div class="card-body">Card</div></div>
<div class="card card-featured"><div class="card-body">Card destacada</div></div>
```

`.card-featured` sí lleva una sombra propia (`0 16px 34px rgba(0,0,0,.55)`) más el glow rojo al hover. Es la excepción: un componente que **sí** usa la sombra para jerarquizar, porque tiene un borde de color que lo sostiene.

## Con el grid de pista

```html
<div class="bg-dark shadow-lg p-4">
  El negro al 65% sí separa sobre un fondo ya negro
</div>
```

Sobre `.bg-dark` (`#0c0c0c`), la sombra se ve: es el único fondo del framework oscuro donde funciona.

## Accesibilidad

- No uses sombra para indicar hover o foco. Son señales de estado, y la sombra no se anuncia.
- Una sombra muy difusa puede difícilmente leerse en pantallas de bajo contraste o con brillo alto.
- El contraste entre texto y fondo no cambia con la sombra: si el par no llega a 4.5:1, la sombra no lo arregla.

## Qué sigue

- [Focus ring](/helpers/focus-ring.html)
- [Tarjetas](/components/card.html)
- [Color y fondo](/helpers/color-background.html) — el salto de valor que sí define la profundidad