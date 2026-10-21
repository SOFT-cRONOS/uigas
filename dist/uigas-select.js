/*!
 * UiGas · uigas-select
 * ─────────────────────────────────────────────────────────────
 * Convierte cada <select class="form-select"> en un menú UiGas
 * (dropdown-menu de Bootstrap) sin perder el select nativo, que
 * queda oculto como fuente de verdad para el submit y la
 * validación.
 *
 * Incluir después del CSS de UiGas:
 *   <script src="dist/uigas-select.js" defer></script>
 *
 * Opt-out por control: data-uig-select="off"
 * Contenido dinámico: uigasSelect.refresh()
 * ─────────────────────────────────────────────────────────────
 */
(function (global) {
  'use strict';

  var SELECTOR = 'select.form-select';
  var instances = [];
  var uid = 0;

  function each(list, fn) {
    Array.prototype.forEach.call(list, fn);
  }

  function isEnhanceable(select) {
    return (
      select &&
      select.tagName === 'SELECT' &&
      select.dataset.uigSelect !== 'off' &&
      !select.multiple &&
      !select.hasAttribute('size') &&
      !select.closest('.uig-select') &&
      !select.closest('.form-floating') &&
      !select.closest('.input-group') &&
      select.options.length > 0
    );
  }

  function nameControl(select, button) {
    var aria = select.getAttribute('aria-label');
    if (aria) {
      button.setAttribute('aria-label', aria);
      return;
    }
    var labels = select.labels ? Array.prototype.slice.call(select.labels) : [];
    if (labels.length) {
      var ids = labels.map(function (label) {
        if (!label.id) label.id = 'uig-label-' + (++uid);
        return label.id;
      });
      button.setAttribute('aria-labelledby', ids.join(' '));
      return;
    }
    button.setAttribute('aria-label', select.getAttribute('title') || select.name || 'Seleccionar');
  }

  function enhance(select) {
    if (!isEnhanceable(select)) return null;

    var typeBuffer = '';
    var typeTimer = null;
    var observer = null;
    var pairs = [];

    /* --- Estructura --- */
    var wrapper = document.createElement('div');
    wrapper.className = 'uig-select';

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'uig-select-toggle';
    if (select.classList.contains('form-select-sm')) button.classList.add('form-select-sm');
    if (select.classList.contains('form-select-lg')) button.classList.add('form-select-lg');
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    if (select.required) button.setAttribute('aria-required', 'true');
    nameControl(select, button);

    var valueEl = document.createElement('span');
    valueEl.className = 'uig-select-value';
    button.appendChild(valueEl);

    var menu = document.createElement('div');
    menu.className = 'dropdown-menu uig-select-menu';
    menu.setAttribute('role', 'listbox');
    var labelRef = button.getAttribute('aria-labelledby');
    if (labelRef) menu.setAttribute('aria-labelledby', labelRef);
    else if (button.getAttribute('aria-label')) menu.setAttribute('aria-label', button.getAttribute('aria-label'));

    /* --- Opciones --- */
    function makeOption(option) {
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'dropdown-item uig-select-option';
      el.setAttribute('role', 'option');
      el.tabIndex = -1;
      el.dataset.value = option.value;
      el.textContent = option.label || option.text;
      if (option.disabled) el.disabled = true;
      el.addEventListener('click', function () {
        choose(option.value);
      });
      pairs.push({ option: option, el: el });
      return el;
    }

    function rebuildOptions() {
      pairs = [];
      menu.textContent = '';
      each(select.children, function (node) {
        if (node.tagName === 'OPTGROUP') {
          var header = document.createElement('div');
          header.className = 'dropdown-header';
          header.setAttribute('role', 'presentation');
          header.textContent = node.label;
          menu.appendChild(header);
          each(node.children, function (child) {
            if (child.tagName === 'OPTION') menu.appendChild(makeOption(child));
          });
        } else if (node.tagName === 'OPTION') {
          menu.appendChild(makeOption(node));
        }
      });
    }

    /* --- Estado --- */
    function currentOption() {
      return select.options[select.selectedIndex] || null;
    }

    function updateState() {
      var option = currentOption();
      valueEl.textContent = option ? option.label || option.text : '';
      valueEl.classList.toggle('is-placeholder', !option || option.value === '');

      var validated = !!select.form && select.form.classList.contains('was-validated');
      var isInvalid =
        select.classList.contains('is-invalid') ||
        (validated && !select.checkValidity()) ||
        (select.required && !select.value && select.dataset.uigTouched === '1');
      var isValid =
        select.classList.contains('is-valid') ||
        (validated && select.checkValidity() && !isInvalid);

      button.classList.toggle('is-invalid', isInvalid);
      button.classList.toggle('is-valid', isValid);
      button.disabled = select.matches(':disabled');
      wrapper.classList.toggle('is-disabled', select.matches(':disabled'));

      pairs.forEach(function (pair) {
        pair.el.setAttribute('aria-selected', pair.option === option ? 'true' : 'false');
      });
    }

    function choose(value) {
      select.value = value;
      select.dataset.uigTouched = '1';
      updateState();
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
      close(true);
    }

    /* --- Abrir / cerrar --- */
    function isOpen() {
      return menu.classList.contains('show');
    }

    function place() {
      wrapper.classList.remove('uig-select--up');
      if (!isOpen()) return;
      var rect = button.getBoundingClientRect();
      var room = Math.min(menu.scrollHeight, 256) + 8;
      if (window.innerHeight - rect.bottom < room && rect.top > room) {
        wrapper.classList.add('uig-select--up');
      }
    }

    function enabledOptions() {
      return Array.prototype.slice.call(
        menu.querySelectorAll('.uig-select-option:not(:disabled)')
      );
    }

    function focusOption(index) {
      var options = enabledOptions();
      if (!options.length) return;
      options[Math.max(0, Math.min(index, options.length - 1))].focus();
    }

    function activeIndex() {
      var options = enabledOptions();
      for (var i = 0; i < options.length; i++) {
        if (options[i].getAttribute('aria-selected') === 'true') return i;
      }
      return 0;
    }

    function open() {
      instances.forEach(function (instance) {
        if (instance !== api) instance.close(false);
      });
      wrapper.classList.add('uig-select--open');
      menu.classList.add('show');
      button.setAttribute('aria-expanded', 'true');
      place();
      focusOption(activeIndex());
    }

    function close(refocus) {
      if (!isOpen()) return;
      wrapper.classList.remove('uig-select--open', 'uig-select--up');
      menu.classList.remove('show');
      button.setAttribute('aria-expanded', 'false');
      if (refocus) button.focus();
    }

    /* --- Teclado --- */
    function typeAhead(char) {
      typeBuffer += char.toLowerCase();
      clearTimeout(typeTimer);
      typeTimer = setTimeout(function () {
        typeBuffer = '';
      }, 600);
      var found = enabledOptions().filter(function (option) {
        return option.textContent.toLowerCase().indexOf(typeBuffer) === 0;
      })[0];
      if (found) found.focus();
    }

    button.addEventListener('click', function () {
      if (isOpen()) close(true);
      else open();
    });

    button.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!isOpen()) open();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (isOpen()) close(true);
        else open();
      }
    });

    menu.addEventListener('keydown', function (event) {
      var options = enabledOptions();
      var index = options.indexOf(document.activeElement);

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        focusOption(index + 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        focusOption(index - 1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        focusOption(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        focusOption(options.length - 1);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        var focused = document.activeElement;
        if (focused && focused.classList.contains('uig-select-option')) focused.click();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
      } else if (event.key === 'Tab') {
        close(false);
      } else if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        typeAhead(event.key);
      }
    });

    /* --- Sincronización con el select nativo --- */
    select.addEventListener('change', updateState);

    select.addEventListener('invalid', function () {
      select.dataset.uigTouched = '1';
      updateState();
    });

    if (select.form) {
      select.form.addEventListener('reset', function () {
        setTimeout(updateState, 0);
      });
    }

    if (select.labels) {
      each(select.labels, function (label) {
        label.addEventListener('click', function (event) {
          if (select.disabled) return;
          event.preventDefault();
          button.focus();
        });
      });
    }

    if (global.MutationObserver) {
      observer = new MutationObserver(function () {
        rebuildOptions();
        updateState();
      });
      observer.observe(select, {
        attributes: true,
        attributeFilter: ['disabled', 'required', 'class'],
        childList: true,
        subtree: true
      });
    }

    /* --- API --- */
    var api = {
      select: select,
      wrapper: wrapper,
      isOpen: isOpen,
      close: close,
      refresh: function () {
        rebuildOptions();
        updateState();
        place();
      },
      destroy: function () {
        if (observer) observer.disconnect();
        close(false);
        if (wrapper.parentNode) {
          wrapper.parentNode.insertBefore(select, wrapper);
          wrapper.parentNode.removeChild(wrapper);
        }
        var index = instances.indexOf(api);
        if (index > -1) instances.splice(index, 1);
      }
    };

    /* --- Montaje: el wrapper ocupa el lugar del select --- */
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    wrapper.appendChild(button);
    wrapper.appendChild(menu);

    rebuildOptions();
    updateState();
    instances.push(api);

    return api;
  }

  function init(scope) {
    each((scope || document).querySelectorAll(SELECTOR), enhance);
  }

  function refresh(scope) {
    instances.forEach(function (instance) {
      instance.refresh();
    });
    init(scope);
  }

  document.addEventListener('click', function (event) {
    instances.forEach(function (instance) {
      if (instance.isOpen() && !instance.wrapper.contains(event.target)) {
        instance.close(false);
      }
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
    });
  } else {
    init();
  }

  global.uigasSelect = {
    init: init,
    refresh: refresh,
    instances: instances
  };
})(window);
