# Figuras

> Una imagen con su pie. UiGas mantiene `.figure` de Bootstrap y le da color al pie desde los tokens, así que el texto del pie se lee en ambos temas.

## Figura básica

```html
<figure class="figure">
  <img src="motor.jpg" class="figure-img img-fluid rounded" alt="Motor de competition">
  <figcaption class="figure-caption">
    Unidad de potencia · <strong>2.0 turbo</strong>, 1.032 CV
  </figcaption>
</figure>
```

`.figure-caption` es de UiGas: usa `--uig-text-muted`, la misma cadena que `.text-muted` y `.form-text`. En oscuro mide 4.75:1 sobre la línea; en claro, 5:1 sobre la base.

> El pie de figura es texto secundario por definición, así que un gris medio es correcto. Si el pie lleva información que no se puede perder —un número, una advertencia—, subilo a `.figure-caption text-body-emphasis` o `--uig-text-soft`.

## Figura alineada a la derecha

Bootstrap trae `.figure-inline-block` para figuras chicas que Texto lleva apareciendo:

```html
<figure class="figure-inline-block">
  <img src="logo.png" class="figure-img rounded" alt="Logo del club">
  <figcaption class="figure-caption">Identidad 2027</figcaption>
</figure>
```

## Figura como tarjeta

La combinación más usada del framework — pie + marco + superficie:

```html
<figure class="card">
  <img src="podio.jpg" class="card-img-top" alt="Podio de la tercera fecha">
  <figcaption class="card-body figure-caption mb-0">
    Tercer puesto · GP de Córdoba
  </figcaption>
</figure>
```

## Accesibilidad

- El `<figure>` no cambia la lectura: es un contenedor semántico que agrupa imagen y descripción. Lo que aporta es el contexto cuando el `alt` es corto.
- Si el pie agrega información que **no** está en el `alt`, no lo declares como decorativo: `alt=""` + figura con texto es un patrón válido y común.
- No uses `.figure` para agrupar texto suelto: es para contenido ilustrado.

> Un caso frecuente de error: `<figure>` con un pie que solo dice "Figura 1". El número no aporta nada para quien usa lector de pantalla y desplaza el contenido útil. Si necesitás numerar, que el pie diga qué es.

## Qué sigue

- [Imágenes](/content/images.html) — tamaños y atributos
- [Reboot](/content/reboot.html) — los resets que sostienen todo esto