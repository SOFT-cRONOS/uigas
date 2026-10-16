# Options

> No hay un archivo de opciones. La configuración de UiGas son sus tokens, y están documentados uno por uno en [Variables CSS](/customize/css-variables.html).

## Lo que existe

```scss
// src/scss/_tokens.scss
:root,
[data-bs-theme="dark"] { /* … */ }

[data-bs-theme="light"] { /* … */ }
```

Dos literales, 254 líneas. Ese es el archivo de configuración del framework.

## Lo que no existe

| Archivo típico de otro framework | En UiGas |
|---|---|
| `_variables.scss` | ❌ |
| `_options.scss` | ❌ |
| `_config.scss` | ❌ |
| `$enable-*` flags | ❌ |
| `@mixin` de tema | ❌ |
| `@function` de color | ❌ |

Cero variables Sass, cero mixins, cero funciones. Verificado:

```bash
$ grep -rn '^\$|@mixin\|@function' src/scss/ | wc -l
0
```

## Por qué no

Porque los tokens tienen que ser runtime. Una variable Sass se resuelve cuando compila el Sass; un tema conmutable necesita que el valor se resuelva cuando el navegador cambia `data-bs-theme`.

Si UiGas tuviera `_variables.scss`, tendrías dos caminos para cambiar un valor y solo uno funcionaría en runtime. Es una decisión con un costo real —la falta de punto de extensión— y un beneficio concreto: un solo archivo CSS con los dos temas.

Ver [Sass](/customize/sass.html) para el argumento completo.

## Configurar en tu proyecto

Como UiGas no expone opciones, la configuración es redefinir tokens:

```css
/* después de UiGas */
[data-bs-theme="light"] {
  --uig-bg: #e6e6ea;
}
```

Tres reglas:

1. **Después de UiGas**, siempre. Antes no funciona.
2. **En el bloque del tema que estés cambiando**, o en `:root` si aplica a los dos.
3. **Por token**, no por componente. Si redefinís `--uig-surface`, cambia en cards, menús, campos y modales a la vez.

## El riesgo de redefinir tokens

Cambiar `--uig-surface` afecta a **todos** los consumidores. Es lo que querés si querés cambiar el framework; no lo que querés si solo querés que un componente se vea distinto.

Para eso, un token propio:

```css
:root { --mi-bg-panel: #1b2a1b; }
.mi-panel { background: var(--mi-bg-panel); }
```

## Qué sigue

- [Variables CSS](/customize/css-variables.html)
- [Sass](/customize/sass.html)
- [Color](/customize/color.html)