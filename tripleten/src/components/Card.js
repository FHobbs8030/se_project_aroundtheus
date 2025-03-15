export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._template = document.querySelector(templateSelector).content;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = this._template.cloneNode(true);
    this._cardElement = cardElement;
    this._cardImage = cardElement.querySelector(".cards__image");
    this._cardTitle = cardElement.querySelector(".cards__title");
    this._deleteButton = cardElement.querySelector(".cards__delete-button");
    this._heartButton = cardElement.querySelector(".cards__heart");
    return cardElement;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const card = this._deleteButton.closest(".cards__card");
      if (card) {
        card.remove();
      }
    });

    this._heartButton.addEventListener("click", () => {
      this._handleHeartButton(this._heartButton);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
    return this._cardElement;
  }

  getElement() {
    return this.generateCard();
  }

  _handleHeartButton(heartButton) {
    heartButton.classList.toggle("cards__heart_active");
  }
}
