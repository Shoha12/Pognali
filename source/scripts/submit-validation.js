const REQUIRED_EMAIL_MESSAGE = 'Введите e-mail';
const DEFAULT_EMAIL_PLACEHOLDER = 'E-mail';
const EMAIL_ERROR_CLASS = 'submit__input--error';

const setEmailPlaceholderState = (emailInput) => {
  if (emailInput.validity.valueMissing) {
    emailInput.placeholder = REQUIRED_EMAIL_MESSAGE;
    emailInput.classList.add(EMAIL_ERROR_CLASS);
    return;
  }

  emailInput.placeholder = DEFAULT_EMAIL_PLACEHOLDER;
  emailInput.classList.remove(EMAIL_ERROR_CLASS);
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
    if (!emailInput.value.trim()) {
      evt.preventDefault();
      setEmailPlaceholderState(emailInput);
      emailInput.focus();
    }
  });

  emailInput.addEventListener('blur', () => {
    setEmailPlaceholderState(emailInput);
  });

  emailInput.addEventListener('input', () => {
    setEmailPlaceholderState(emailInput);
  });
};

export { initSubmitValidation };
