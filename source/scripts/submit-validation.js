const REQUIRED_EMAIL_MESSAGE = 'Введите e-mail';
const DEFAULT_EMAIL_PLACEHOLDER = 'E-mail';
const EMAIL_ERROR_CLASS = 'submit__input--error';

const isValidEmailValue = (value) => {
  const probe = document.createElement('input');
  probe.type = 'email';
  probe.required = true;
  probe.value = value;
  return probe.checkValidity();
};

const applyEmailError = (emailInput) => {
  emailInput.classList.add(EMAIL_ERROR_CLASS);
  if (emailInput.validity.valueMissing) {
    emailInput.placeholder = REQUIRED_EMAIL_MESSAGE;
  } else {
    emailInput.placeholder = DEFAULT_EMAIL_PLACEHOLDER;
  }
};

const clearEmailError = (emailInput) => {
  emailInput.classList.remove(EMAIL_ERROR_CLASS);
  emailInput.placeholder = DEFAULT_EMAIL_PLACEHOLDER;
};

const initSubmitValidation = () => {
  const submitForm = document.querySelector('.submit__form');

  if (!submitForm) {
    return;
  }

  const emailInput = submitForm.querySelector('.submit__input[type="email"]');

  if (!emailInput) {
    return;
  }

  submitForm.addEventListener('submit', (evt) => {
    emailInput.value = emailInput.value.trim();

    if (!emailInput.checkValidity()) {
      evt.preventDefault();
      applyEmailError(emailInput);
      emailInput.focus();
      return;
    }

    clearEmailError(emailInput);
  });

  emailInput.addEventListener('input', () => {
    if (!emailInput.classList.contains(EMAIL_ERROR_CLASS)) {
      return;
    }
    const trimmed = emailInput.value.trim();
    if (trimmed && isValidEmailValue(trimmed)) {
      clearEmailError(emailInput);
    }
  });
};

export { initSubmitValidation };
