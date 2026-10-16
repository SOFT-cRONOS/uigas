# Variables CSS

> Todos los tokens de UiGas son custom properties. Este mapa es la referencia completa: lo que cambia por tema y lo que no.

## Cómo se conmutan

Dos bloques, dos propósitos:

```css
:root,
[data-bs-theme="dark"] { /* marca + capa semántica oscura */ }

[data-bs-theme="light"] { /* solo la capa semántica */ }
```

El primer bloque es la fuente única. El segundo **solo** reescribe lo que depende del tema. La paleta de marca nunca se duplica.

```html
<html data-bs-theme="light">
```

## Marca (idéntica en los dos temas)

| Token | Valor | Uso |
|---|---|---|
| `--uig-red` | `#f92121` | señal: enlaces, foco, bordes, glow |
| `--uig-red-hi` | `#ff2a1f` | hover del botón link |
| `--uig-red-lo` | `#b30500` | hover/activo sobre claro |
| `--uig-red-deep` | `#8a0400` | activo |
| `--uig-red-slab` | `#e10600` | relleno sólido con texto blanco |
| `--uig-white` | `#ffffff` | — |
| `--uig-ink` | `#141414` | texto oscuro sobre claro |

> `--uig-red` **no** se usa como relleno de botón. `#f92121` con blanco da 3.2:1 y falla; `--uig-red-slab` da 4.97:1 y pasa. La marca vive en bordes, foco y hover — no en el relleno.

## Superficies

| Token | Dark | Light |
|---|---|---|
| `--uig-bg` | `#141414` | `#dcdde2` |
| `--uig-bg-deep` | `#0c0c0c` | `#cfd0d6` |
| `--uig-surface` | `#111111` | `#f0f0f3` |
| `--uig-surface-2` | `#1a1a1a` | `#e6e7eb` |
| `--uig-surface-3` | `#1f1f1f` | `#d3d4da` |
| `--uig-nav-bg` | `rgba(20,20,20,.9)` | `rgba(20,20,20,.9)` |
| `--uig-menu-bg` | `rgba(17,17,17,.98)` | `rgba(17,17,17,.98)` |
| `--uig-backdrop` | `rgba(0,0,0,.7)` | `rgba(20,20,20,.45)` |

> **La superficie clara no es blanca.** Bajó de `#ffffff` a `#f0f0f3` a propósito: con blanco puro, card y fondo se separaban solo por el borde, y en pantallas de brillo alto el hairline desaparecía. El salto de valor es lo que da profundidad.
>
> `--uig-nav-bg` y `--uig-menu-bg` **no** están redefinidos en claro: son translúcidos sobre la base clara y funcionan igual en los dos temas. `--uig-backdrop` sí, porque un negro al 70% oscurece demasiado la página en claro.

## Líneas

| Token | Dark | Light |
|---|---|---|
| `--uig-line` | `#1f1f1f` | `#c9c9ce` |
| `--uig-line-strong` | `#2a2a2a` | `#bdbdc4` |

## Texto

| Token | Dark | Light | Sobre superficie |
|---|---|---|---|
| `--uig-heading` | `#ffffff` | `#141414` | — |
| `--uig-text` | `#ededed` | `#2a2a2a` | 14.4:1 / 12.2:1 |
| `--uig-text-soft` | `#d4d4d8` | `#3f3f46` | 9.2:1 |
| `--uig-text-dim` | `#a1a1aa` | `#52525b` | 7.1:1 |
| `--uig-text-muted` | `#7d8593` | `#61646d` | 4.75:1 / 5.02:1 |

> Los cinco aumentan en contraste al acercarse a `--uig-heading`. `--uig-text-muted` es el que roza el mínimo AA (4.5:1). Para texto que no sea accesorio, preferí `--uig-text-soft`.

## Tipografía

```css
--uig-font-h1:      'Barlow Condensed', sans-serif;
--uig-font-display: 'Barlow Condensed', sans-serif;
--uig-font-brand:   'Korataki', 'KoratakiW01-BoldItalic', 'Barlow Condensed', sans-serif;
--uig-font-body:    'Barlow', 'Segoe UI', sans-serif;
--uig-font-data:    'Rajdhani', sans-serif;
```

## Interacción

```css
--uig-btn-lit:     inset 0 1px 0 rgba(255,255,255,.16);
--uig-lift:        translateY(-2px);
--uig-press:       translateY(0) scale(0.985);
--uig-inset-press: inset 0 2px 8px rgba(0,0,0,.45);
--uig-ring:        0 0 0 3px rgba(249,33,33,.45);
--uig-ease-out:    cubic-bezier(.22, 1, .36, 1);
```

`--uig-lift`, `--uig-press` y `--uig-ease-out` **no** están redefinidos en claro: son transformaciones, no colores. `--uig-btn-lit`, `--uig-inset-press` y `--uig-ring` sí, porque son translúcidos y su mezcla cambia.

## Radios

La escala de Bootstrap, reescrita a valores chicos (Dark Sport Minimal, sin chaflán):

```css
--bs-border-radius-sm: 2px  ·  --bs-border-radius: 3px  ·  -lg: 4px
--bs-border-radius-xl: 6px  ·  --bs-border-radius-xxl: 8px  ·  -pill: 50rem
```

## Usar un token

```css
.mi-componente {
  background: var(--uig-surface);
  border: 1px solid var(--uig-line);
  color: var(--uig-text);
}
```

Nunca el valor literal: así el componente se adapta al tema solo.

## Sobrescribir

UiGas no tiene un punto de extensión documentado: **no hay archivo de "personalización"**. Para cambiar un token tenés que redefinirlo en tu CSS, después de UiGas:

```css
[data-bs-theme="dark"] { --uig-red: #ff4400; }
[data-bs-theme="light"] { --uig-red-lo: #c93a00; }
```

> Esa ausencia es deliberada en los tokens (que tienen que ser runtime, no build) pero es una carencia en la API: una propiedad `!default` de Sass habría dado el punto de extensión natural sin perder nada. Ver [Sass](/customize/sass.html).

## Qué sigue

- [Sass](/customize/sass.html) — la fuente SCSS
- [Color](/customize/color.html) — la rampa de marca
- [Componentes](/customize/components.html)