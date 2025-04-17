import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._submitButton = this._formElement.querySelector(".popup__save-button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }
}