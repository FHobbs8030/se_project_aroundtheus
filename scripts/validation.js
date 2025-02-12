function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMessageEl.textContent = inputEl.validationMessage;
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.classList.add(errorClass); 
}


function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (inputEl.validity.valid) {
    hideInputError(formEl, inputEl, options);
  } else {
    showInputError(formEl, inputEl, options);
  }
}

function toggleSaveButtonState(inputEls, saveButton, { inactiveButtonClass }) {
  const isFormValid = Array.from(inputEls).every(
    (inputEl) => inputEl.validity.valid
  );

  if (isFormValid) {
    saveButton.classList.remove(inactiveButtonClass);
    saveButton.disabled = false;
  } else {
    saveButton.classList.add(inactiveButtonClass);
    saveButton.disabled = true;
  }
}

function setEventListeners(formEl, options) {
  const inputEls = formEl.querySelectorAll(options.inputSelector);
  const saveButton = formEl.querySelector(options.saveButtonSelector);
  toggleSaveButtonState(inputEls, saveButton, options);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleSaveButtonState(inputEls, saveButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: "modal__form",
  inputSelector: "modal__input",
  saveButtonSelector: "modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input-type-error",
  errorClass: "modal__input-error_visible",
};

enableValidation(config);
