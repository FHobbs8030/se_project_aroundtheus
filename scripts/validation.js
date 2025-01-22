// Show input error with default browser message
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage; // Use the browser's default error message
  errorMessageEl.classList.add(errorClass);
}

// Hide input error
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = ""; // Clear the error message
  errorMessageEl.classList.remove(errorClass);
}

// Check input validity
function checkInputValidity(formEl, inputEl, options) {
  // Trigger validation on input field
  if (inputEl.validity.valid) {
    hideInputError(formEl, inputEl, options); // Hide the error if input is valid
  } else {
    showInputError(formEl, inputEl, options); // Show the error if input is invalid
  }
}

// Toggle submit button state based on form validity
function toggleSubmitButtonState(
  inputEls,
  submitButton,
  { inactiveButtonClass }
) {
  const isFormValid = Array.from(inputEls).every(
    (inputEl) => inputEl.validity.valid
  ); // Check if all inputs are valid
  if (isFormValid) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }
}

// Set event listeners on form inputs
function setEventListeners(formEl, options) {
  const inputEls = formEl.querySelectorAll(options.inputSelector);
  const submitButton = formEl.querySelector(options.submitButtonSelector);

  inputEls.forEach((inputEl) => {
    // Check validity every time the user types in the field
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options); // Validate input field
      toggleSubmitButtonState(inputEls, submitButton, options); // Enable/disable submit button based on validity
    });
  });
}

// Enable validation for all forms
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    // Prevent form submission by default
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // Set up event listeners for each form
    setEventListeners(formEl, options);

    // Initially check button state on load
    const inputEls = formEl.querySelectorAll(options.inputSelector);
    const submitButton = formEl.querySelector(options.submitButtonSelector);
    toggleSubmitButtonState(inputEls, submitButton, options);
  });
}

// Configuration settings
const config = {
  formSelector: ".popup__form", // Select all form elements within modal
  inputSelector: ".popup__input", // Select all input fields within modal
  submitButtonSelector: ".popup__button", // Select submit button within modal
  inactiveButtonClass: "popup__button_disabled", // Disabled button class
  inputErrorClass: "popup__input_type_error", // Error class for invalid input fields
  errorClass: "popup__error_visible", // Error class for displaying error messages
};

// Call the validation function with config
enableValidation(config);
