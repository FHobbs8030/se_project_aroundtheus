export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._element.querySelector(".card__title").textContent = this._data.name;
    this._setEventListeners();
    return this._element;
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector(".card__heart");
    likeButton.classList.toggle("card__heart_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._data);
      });

    this._element
      .querySelector(".card__heart")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });
  }
}
