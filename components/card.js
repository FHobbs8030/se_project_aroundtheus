export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data; // Store card data (name, link, alt)
    this._cardSelector = cardSelector; // The selector for the template element
    this._handleImageClick = handleImageClick; // Image click handler passed from index.js

    // Clone the template and populate it
    this._element = this._getTemplate();
    this._setEventListeners();
  }

  // Method to get the card's template and populate it with data
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true).firstElementChild;

    this._cardImageElement = cardElement.querySelector(".cards__image");
    this._cardTitleElement = cardElement.querySelector(".cards__title");
    this._cardDeleteButton = cardElement.querySelector(".cards__delete-button");
    this._cardHeartButton = cardElement.querySelector(".cards__heart");

    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.alt;
    this._cardTitleElement.textContent = this._data.name;

    return cardElement;
  }

  // Method to set up event listeners for the card
  _setEventListeners() {
    // Handle delete button click
    this._cardDeleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this._element.remove();
    });

    // Handle like button click
    this._cardHeartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this._cardHeartButton.classList.toggle("cards__heart__active");
    });

    // Handle image click to open the modal
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  // Public method to return the fully populated card element
  getElement() {
    return this._element;
  }
}
