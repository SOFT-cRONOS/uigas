/**
 * Árbol de navegación de la documentación.
 * Fuente única de verdad: de acá salen el sidebar, el breadcrumb,
 * el prev/next y el índice de búsqueda.
 *
 * Formato: [id, título, [[slug, título], ...]]
 * El orden de las secciones y de las páginas es el de la documentación.
 */

export const SITE = {
  title: 'UiGas',
  tagline: 'CSS framework · override de Bootstrap 5',
  repo: 'softcronos/ui_gas',
};

export const SECTIONS = [
  ['getting-started', 'Primeros pasos', [
    ['introduction', 'Introducción'],
    ['installation', 'Instalación'],
    ['contents', 'Contenido'],
    ['browsers-devices', 'Navegadores y dispositivos'],
    ['build-tools', 'Herramientas de build'],
  ]],
  ['layout', 'Layout', [
    ['breakpoints', 'Breakpoints'],
    ['containers', 'Contenedores'],
    ['grid', 'Grid'],
    ['columns', 'Columnas'],
    ['gutters', 'Gutters'],
    ['utilities-for-layout', 'Utilidades de layout'],
  ]],
  ['content', 'Contenido', [
    ['reboot', 'Reboot'],
    ['typography', 'Tipografía'],
    ['images', 'Imágenes'],
    ['tables', 'Tablas'],
    ['figures', 'Figuras'],
  ]],
  ['forms', 'Formularios', [
    ['overview', 'Overview'],
    ['form-control', 'Form control'],
    ['select', 'Select'],
    ['checks-radios', 'Checks y radios'],
    ['range', 'Range'],
    ['input-group', 'Input group'],
    ['floating-labels', 'Labels flotantes'],
    ['layout', 'Layout'],
    ['validation', 'Validación'],
    ['accessibility', 'Accesibilidad'],
  ]],
  ['components', 'Componentes', [
    ['accordion', 'Acordeón'],
    ['alerts', 'Alertas'],
    ['badges', 'Badges'],
    ['breadcrumb', 'Breadcrumb'],
    ['buttons', 'Botones'],
    ['button-group', 'Grupo de botones'],
    ['card', 'Tarjetas'],
    ['carousel', 'Carrusel'],
    ['close-button', 'Botón de cierre'],
    ['collapse', 'Collapse'],
    ['dropdowns', 'Dropdowns'],
    ['list-group', 'List group'],
    ['modal', 'Modal'],
    ['navs-tabs', 'Navs y tabs'],
    ['navbar', 'Navbar'],
    ['offcanvas', 'Offcanvas'],
    ['pagination', 'Paginación'],
    ['placeholders', 'Placeholders'],
    ['popovers', 'Popovers'],
    ['progress', 'Progreso'],
    ['scrollspy', 'Scrollspy'],
    ['spinners', 'Spinners'],
    ['toasts', 'Toasts'],
    ['tooltips', 'Tooltips'],
  ]],
  ['helpers', 'Helpers', [
    ['clearfix', 'Clearfix'],
    ['color-background', 'Color y fondo'],
    ['colored-links', 'Enlaces de color'],
    ['focus-ring', 'Focus ring'],
    ['icon-link', 'Icon link'],
    ['position', 'Posición'],
    ['ratio', 'Ratio'],
    ['stacks', 'Stacks'],
    ['stretched-link', 'Stretched link'],
    ['text-truncation', 'Truncado de texto'],
    ['vertical-rule', 'Regla vertical'],
  ]],
  ['utilities', 'Utilidades', [
    ['api', 'API'],
    ['background', 'Background'],
    ['borders', 'Bordes'],
    ['colors', 'Colores'],
    ['display', 'Display'],
    ['flex', 'Flex'],
    ['float', 'Float'],
    ['interactions', 'Interacciones'],
    ['opacity', 'Opacidad'],
    ['overflow', 'Overflow'],
    ['position', 'Posición'],
    ['shadows', 'Sombras'],
    ['sizing', 'Sizing'],
    ['spacing', 'Espaciado'],
    ['text', 'Texto'],
    ['vertical-align', 'Alineación vertical'],
    ['visibility', 'Visibilidad'],
    ['z-index', 'Z-index'],
  ]],
  ['customize', 'Customizar', [
    ['overview', 'Overview'],
    ['sass', 'Sass'],
    ['options', 'Opciones'],
    ['color', 'Color'],
    ['components', 'Componentes'],
    ['css-variables', 'Variables CSS'],
    ['optimize', 'Optimizar'],
  ]],
  ['extend', 'Extender', [
    ['approach', 'Enfoque'],
    ['icons', 'Iconos'],
    ['components', 'Componentes UiGas'],
  ]],
];

/** Aplana el árbol a la lista ordenada de páginas. */
export function flatten() {
  const out = [];
  for (const [sectionId, sectionTitle, pages] of SECTIONS) {
    pages.forEach(([slug, title], i) => {
      out.push({
        sectionId,
        sectionTitle,
        slug,
        title,
        path: `${sectionId}/${slug}.html`,
        indexInSection: i,
      });
    });
  }
  return out;
}

export const TOTAL_PAGES = flatten().length;