// Show input error with default browser message
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  console.log("showInputError called for:", inputEl); // Confirm that the function is running

  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  // Inspect the input element to check its structure and validity properties
  console.dir(inputEl); // Shows the structure of inputEl, including its validity states
  // Inspect the error message element to ensure it's targeting the right element
  console.dir(errorMessageEl); // Shows the properties of the errorMessageE

  // If the input is empty (required field)
  if (inputEl.validity.valueMissing) {
    errorMessageEl.textContent = "Please fill out this field";
  }
  // If the input is too short
  else if (inputEl.validity.tooShort) {
    errorMessageEl.textContent = `Minimum length is ${inputEl.minLength} characters`;
  }
  // If the input is too long
  else if (inputEl.validity.tooLong) {
    errorMessageEl.textContent = `Maximum length is ${inputEl.maxLength} characters`;
  }
  // For other types of invalidity (e.g., pattern mismatch)
  else {
    errorMessageEl.textContent = inputEl.validationMessage;
  }

  inputEl.classList.add(inputErrorClass);
  errorMessageEl.classList.add(errorClass); // Show the error message
}

// Hide input error
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = ""; // Clear the error message
  errorMessageEl.classList.remove(errorClass); // Remove the error class
}

function checkInputValidity(formEl, inputEl, options) {
  console.log("Checking input validity for:", inputEl); // Debugging line to check which input is being validated

  if (inputEl.validity.valid) {
    hideInputError(formEl, inputEl, options); // Hide the error if input is valid
  } else {
    showInputError(formEl, inputEl, options); // Show the error if input is invalid
  }
}

function toggleSaveButtonState(inputEls, saveButton, { inactiveButtonClass }) {
  // Check if all inputs are valid
  const isFormValid = Array.from(inputEls).every(
    (inputEl) => inputEl.validity.valid
  );

  console.log("Is form valid:", isFormValid); // Debugging line to check if the form is considered valid

  // Enable or disable the submit button based on form validity
  if (isFormValid) {
    saveButton.classList.remove(inactiveButtonClass); // Remove disabled class
    saveButton.disabled = false; // Enable the button
  } else {
    saveButton.classList.add(inactiveButtonClass); // Add disabled class
    saveButton.disabled = true; // Disable the button
  }
}

function setEventListeners(formEl, options) {
  const inputEls = formEl.querySelectorAll(options.inputSelector);
  const saveButton = formEl.querySelector(options.saveButtonSelector); // This targets the button inside the current form

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options); // Validate the input field
      toggleSaveButtonState(inputEls, saveButton, options); // Update button state
    });
  });
}

// Enable validation for all forms
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    // Prevent form submission by default
 formEl.addEventListener("submit", (evt) => {
   evt.preventDefault(); // Prevent default submission
   // Your custom logic for submitting the form goes here
   console.log("Form submitted successfully!");
 });



    // Set up event listeners for each form
    setEventListeners(formEl, options);

    // Initially check button state on load
    const inputEls = formEl.querySelectorAll(options.inputSelector);
    const saveButton = formEl.querySelector(options.saveButtonSelector);
    toggleSaveButtonState(inputEls, saveButton, options);
  });
}

// Configuration settings
const config = {
  formSelector: "#edit-form, #add-form", // Select all form elements within modal
  inputSelector: ".modal__input", // Select all input fields within modal
  saveButtonSelector: ".modal__save-button", // Select submit button within modal
  inactiveButtonClass: "popup__button_disabled", // Disabled button class
  inputErrorClass: "popup__input_type_error", // Error class for invalid input fields
  errorClass: "popup__error_visible", // Error class for displaying error messages
};

// Call the validation function with config
enableValidation(config);
