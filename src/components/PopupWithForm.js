import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitButton = this._form.querySelector(".popup__save-button");
    this._defaultSubmitText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // _checkInputValidity() {
  //   const isValid = this._inputList.every((input) => input.value.trim() !== "");
  //   if (isValid) {
  //     this.enableSubmitButton();
  //   } else {
  //     this.disableSubmitButton();
  //   }
  // }

  setEventListeners() {
    super.setEventListeners();

    // this._inputList.forEach((input) => {
    //   input.addEventListener("input", () => {
    //     this._checkInputValidity();
    //   });
    // });

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // this.disableSubmitButton();
      const formValues = this._getInputValues();
      const result = this._handleFormSubmit(formValues);

      if (result instanceof Promise) {
        result
          .then(() => {
            this._form.reset();
            this._checkInputValidity();
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this._form.reset();
        this._checkInputValidity();
      }
    });
  }

  // disableSubmitButton() {
  //   this._submitButton.disabled = true;
  //   this._submitButton.textContent = "Saving...";
  // }

  // enableSubmitButton() {
  //   this._submitButton.disabled = false;
  //   this._submitButton.textContent = this._defaultSubmitText;
  // }

  open() {
    super.open();
    // this._checkInputValidity();
  }

}
