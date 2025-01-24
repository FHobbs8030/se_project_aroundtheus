function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);

  if (inputEl.validity.valueMissing) {
    errorMessageEl.textContent = "Please fill out this field";
  } else if (inputEl.validity.tooShort) {
    errorMessageEl.textContent = `Minimum length is ${inputEl.minLength} characters`;
  } else if (inputEl.validity.tooLong) {
    errorMessageEl.textContent = `Maximum length is ${inputEl.maxLength} characters`;
  } else {
    errorMessageEl.textContent = inputEl.validationMessage;
  }

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
      console.log("Form submitted successfully!");
    });

    setEventListeners(formEl, options);

    const inputEls = formEl.querySelectorAll(options.inputSelector);
    const saveButton = formEl.querySelector(options.saveButtonSelector);
    toggleSaveButtonState(inputEls, saveButton, options);
  });
}

const config = {
  formSelector: "#edit-form, #add-form",
  inputSelector: ".modal__input",
  saveButtonSelector: ".modal__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
