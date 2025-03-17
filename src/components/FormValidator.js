export class FormValidator {
  constructor(settings, formElement) {
    console.log("FormValidator initialized with form:", formElement.id);
    this._settings = settings;
    this._formElement = formElement;
    this._inputs = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    this._submitButton = formElement.querySelector(settings.saveButtonSelector);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement);
    }
  }

  _showInputError(inputElement, errorElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement, errorElement) {
    errorElement.textContent = "";
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
  }

  toggleSubmitButtonState() {
    const isValid = this._inputs.every((input) => input.validity.valid);
     console.log(
       "Form validity state:",
       isValid,
       "for form:",
       this._formElement.id
     );
    if (isValid) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleSubmitButtonState();
      });
    });
  }

  enableValidation() {
    console.log("Form validation enabled for:", this._formElement.id);
    this._setEventListeners();
    this.toggleSubmitButtonState();
  }

  resetValidation() {
    this._inputs.forEach((inputElement) => {
      this._hideInputError(
        inputElement,
        this._formElement.querySelector(`#${inputElement.id}-error`)
      );
    });
    this.toggleSubmitButtonState();
  }
}
