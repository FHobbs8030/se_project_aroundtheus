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

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
  
      const formValues = this._getInputValues();
      const result = this._handleFormSubmit(formValues);

      if (result instanceof Promise) {
        result
          .then(() => {
            this._form.reset();
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this._form.reset();
      }
    });
  }

  open() {
    super.open();
  }

}
