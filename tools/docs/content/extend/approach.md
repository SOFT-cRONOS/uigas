# Enfoque

> UiGas no quiere ser un framework. Quiere ser **la capa de valores por defecto** de Bootstrap para una marca concreta, sin obligar a nadie a tirar Bootstrap.

## La decisión de fondo

La pregunta que ordena todo lo demás: **¿UiGas reemplaza Bootstrap o lo adopta?**

Adopta. Y esa elección tiene consecuencias en cada decisión del framework:

- **Los componentes se reescriben con las variables de Bootstrap** (`--bs-btn-bg`), no con selectores propios. El HTML no cambia, así que un proyecto existente migra cambiando un `<link>`.
- **El grid, el reboot y las utilidades no se tocan.** Redefinirlos sin necesidad sería una fragilidad gratuita: si Bootstrap los cambia, UiGas quedaría atrás.
- **El nombre de las clases es el de Bootstrap.** `.btn-primary` no es `.uigas-btn-primary`.

> La prueba de que la adopting funciona: cambiar a UiGas es borrar un `<link>` y agregar otro. Ninguna clase de tu HTML se renombra.

## La segunda decisión: custom properties, no Sass

Los tokens son custom properties CSS. Eso no es una preferencia de estilo — es lo que hace posible el tema conmutable.

Ver el argumento completo en [Sass](/customize/sass.html).

## La tercera: superficie sobre sombra

En un framework oscuro, la profundidad viene del **salto de valor**, no de la sombra:

```
--uig-bg        #141414   base
--uig-surface   #111111   elevada
--uig-line      #1f1f1f   borde
```

Tres niveles separados por 5 y 6 unidades. Ninguno se ve a simple vista, y el conjunto se ve.

Y en tema claro, la superficie elevada **no es blanca**: es `#f0f0f3` sobre una base `#dcdde2`. Con blanco puro, card y fondo se separaban solo por un borde que desaparece con brillo alto. Esa decisión tiene un costo —una superficie "blanca" que no es blanca— y una ganancia: la profundidad no depende de la pantalla en la que se vea.

## La cuarta: una sola voz por rol

Cinco familias tipográficas, cinco roles, sin solapamiento:

| Rol | Familia | Por qué |
|---|---|---|
| H1 / display | Barlow Condensed 900 | versalitas condensadas: impacto en poco ancho |
| Secciones | Barlow Condensed 700 | la misma voz, un peso abajo |
| Cuerpo | Barlow 400 | legible a 16px con line-height 1.7 |
| Datos | Rajdhani | cifras tabulares que no bailan |
| Marca | Korataki | el nombre del club, y solo eso |

Korataki no está en Google Fonts: se resuelve con `local()`. Si el visitante no la tiene, cae a Barlow Condensed 900 itálica — que es exactamente el mismo gesto gráfico.

## La quinta: el rojo tiene reglas

No es un color de reemplazo, es una señal con jerarquía:

| Uso | Token | Por qué |
|---|---|---|
| relleno de botón | `--uig-red-slab` | 4.97:1 con blanco; `#f92121` daría 3.2:1 y fallaría |
| bordes, foco, enlaces | `--uig-red` | la señal |
| hover/activo claro | `--uig-red-lo` / `--uig-red-deep` | contraste suficiente en base clara |

La regla general que se desprende, y que aparece en siete lugares del framework:

> **Sobre superficie clara, un acento plano no se lee.** Siempre el versante oscuro de la familia.

## Lo que UiGas no hace

- **No trae JavaScript.** Ni 6 KB de "helpers". Los overlays son de Bootstrap.
- **No es standalone.** Sin Bootstrap no hay grid, ni utilidades, ni reboot.
- **No ofrece un tema nuevo.** Los dos están escritos; un tercero son tokens nuevos a mano.
- **No tiene punto de extensión Sass.** No hay `_variables.scss`. Es la carencia más real del diseño.

## La coherencia es el producto

Lo que hace que UiGas se vea como un sistema y no como una colección de overrides son decisiones repetidas sin excepción:

1. Radios chicos (2–8px), sin chaflán.
2. Versalitas con tracking amplio en botones, badges, labels y migas.
3. Hairline de `--uig-line` como único borde.
4. Hover de rojo, sin excepción — en botones, en items de lista, en menús.
5. Acentos con dos versiones según el tema.

> La prueba de la 5 es la que más costó: hubo que corregir siete componentes uno por uno, porque cada uno tenía su propio color plano del tema oscuro. Ninguno estaba mal por descuido; todos estaban mal por la misma razón.

## Qué sigue

- [Iconos](/extend/icons.html)
- [Componentes UiGas](/extend/components.html)
- [Variables CSS](/customize/css-variables.html)