const findAncestor  = (el) => {
  if (el.type && el.type === 'hidden') {
    return null;
  }

  while ((el = el.parentElement) && !(el.querySelector('.invalid-input')));
  return el;
};

const getErrorEl = (el) => {
  const parentEl = findAncestor(el);
  if (!parentEl) {
    return null;
  }

  if (parentEl.classList.contains('cc-field-group') && !el.classList.contains('cc-number')) {
    return null;
  }

  const children = parentEl.children;
  for (let i = 0; i < children.length; ++i) {
    if (children[i].classList.contains('invalid-input')) {
      return children[i];
    }
  }

  return null;
};

export function validate(form) {

  if (!form.checkValidity()) {
    let hasFocusedOnError = false;
    for (let i = 0; i < form.length; i++) {
      const el = form[i];
      const errorEl = getErrorEl(el);
      const parentEl = findAncestor(el);
      if (errorEl && el.nodeName.toLowerCase() !== 'button') {
        if (!el.validity.valid) {
          errorEl.textContent = el.title || el.validationMessage;
          parentEl.classList.add('has-error');
          if (!hasFocusedOnError) {
            hasFocusedOnError = true;
            el.classList.add('first-error');
          }
        } else {
          errorEl.textContent = "";
          parentEl.classList.remove('has-error');
          el.classList.remove('first-error');
        }
      }
    }
    return false
  } else {
    for (let i = 0; i < form.length; i++) {
      const el = form[i];
      const errorEl = getErrorEl(el);
      if (errorEl && el.nodeName.toLowerCase() !== "button") {
        errorEl.textContent = "";
      }
    }
    return true;
  }

}
