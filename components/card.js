export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._template = document.querySelector(templateSelector).content;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = this._template.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const cardImage = cardElement.querySelector(".cards__image");
    const cardTitle = cardElement.querySelector(".cards__title");
    const deleteButton = cardElement.querySelector(".cards__delete-button");
    const heartButton = cardElement.querySelector(".cards__heart");

    cardImage.src = this._data.link;
    cardImage.alt = this._data.alt;
    cardTitle.textContent = this._data.name;

    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(cardElement);
    });

    heartButton.addEventListener("click", () => {
      this._handleHeartButton(heartButton);
    });

    cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });

    return cardElement;
  }

  getElement() {
    return this.generateCard();
  }

  _handleDeleteCard(cardElement) {
    cardElement.remove(); 
  }

  _handleHeartButton(heartButton) {
    heartButton.classList.toggle("cards__heart_active");
  }
}
