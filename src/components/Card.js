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
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__heart");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;

    this._setEventListeners();
    this._toggleDeleteButtonVisibility();

    return this._element;
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _toggleDeleteButtonVisibility() {
    if (this._isCardLiked()) {
      this._deleteButton.classList.add("card__delete-button_hidden");
    } else {
      this._deleteButton.classList.remove("card__delete-button_hidden");
    }
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("card__heart_active");
    this._toggleDeleteButtonVisibility();
  }

  _isCardLiked() {
    return this._likeButton.classList.contains("card__heart_active");
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }
}