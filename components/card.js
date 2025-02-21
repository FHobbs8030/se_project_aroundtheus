export default class Card {
  constructor(data, templateSelector, handleImageClick, openModal) {
    this._data = data;
    this._template = document.querySelector(templateSelector).content;
    this._handleImageClick = handleImageClick;
    this._openModal = openModal;
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

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const card = deleteButton.closest(".cards__card"); // Find the parent card element
      if (card) {
        card.remove(); // Remove the card from the DOM
      }
    });


    heartButton.addEventListener("click", () => {
      this._handleHeartButton(heartButton);
    });

    cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
      this._openModal(document.querySelector("#image-modal"));
    });

    return cardElement;
  }

  getElement() {
    return this.generateCard();
  }

  _handleHeartButton(heartButton) {
    heartButton.classList.toggle("cards__heart_active");
  }
}
