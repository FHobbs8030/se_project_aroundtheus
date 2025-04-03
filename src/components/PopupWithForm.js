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

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Saving...";
      const formValues = this._getInputValues();
      const result = this._handleFormSubmit(formValues);

      if (result instanceof Promise) {
        result
          .then(() => {
            this._form.reset();
            this.close();
          })
          .catch((err) => console.error(err))
          .finally(() => {
            this._submitButton.textContent = this._defaultSubmitText;
          });
      } else {
        this._form.reset();
        this.close();
        this._submitButton.textContent = this._defaultSubmitText;
      }
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
  }
}
