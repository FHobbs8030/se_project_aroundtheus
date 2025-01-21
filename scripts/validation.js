// Function to validate the inputs
function validateInput(inputEl, errorElement, inputErrorClass, errorClass) {
  if (!inputEl.validity.valid) {
    showInputError(
      inputEl,
      inputEl.validationMessage,
      errorElement,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(inputEl, errorElement, inputErrorClass, errorClass);
  }
}

// Show error message
function showInputError(
  inputEl,
  errorMessage,
  errorElement,
  inputErrorClass,
  errorClass
) {
  inputEl.classList.add(inputErrorClass); // Add red border to invalid input
  errorElement.textContent = errorMessage; // Display the error message
  errorElement.classList.add(errorClass); // Make the error message visible
}

// Hide error message
function hideInputError(inputEl, errorElement, inputErrorClass, errorClass) {
  inputEl.classList.remove(inputErrorClass); // Remove the red border from valid input
  errorElement.textContent = ""; // Clear the error message
  errorElement.classList.remove(errorClass); // Hide the error message
}

// Check if all inputs are valid
function isValid(inputEls) {
  return [...inputEls].every((inputEl) => inputEl.validity.valid);
}

// Handle form submission
function handleSubmit(evt) {
  evt.preventDefault();
  const formEl = evt.target;
  const inputEls = formEl.querySelectorAll(".popup__input");
  const submitButton = formEl.querySelector(".popup__button");

  inputEls.forEach((inputEl) => {
    const errorElement = document.querySelector(`#${inputEl.id}-error`);
    validateInput(
      inputEl,
      errorElement,
      "popup__input_type_error",
      "popup__error_visible"
    );
  });

  if (isValid(inputEls)) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// Attach event listeners to form and inputs
function setEventListeners(formEl, options) {
  const inputEls = formEl.querySelectorAll(options.inputSelector);
  const submitButton = formEl.querySelector(options.submitButtonSelector);

  // Disable submit button initially
  submitButton.disabled = true;

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      const errorElement = document.querySelector(`#${inputEl.id}-error`);
      validateInput(
        inputEl,
        errorElement,
        options.inputErrorClass,
        options.errorClass
      );
    });
  });

  formEl.addEventListener("submit", handleSubmit);
}

// Enable validation on all forms
function enableValidation(options) {
  const formEls = document.querySelectorAll(options.formSelector);
  formEls.forEach((formEl) => {
    setEventListeners(formEl, options);
  });
}

// Validation configuration
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Initialize validation
enableValidation(config);
