export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._cardId = data._id;
    this._ownerId = data.owner?._id;
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  _isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  _updateLikeState() {
    if (this._isLiked()) {
      this._likeButton.classList.add("card__heart_active");
    } else {
      this._likeButton.classList.remove("card__heart_active");
    }
    this._likeCount.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._cardId, this._isLiked(), (newLikes) => {
        this._likes = newLikes;
        this._updateLikeState();
      });
    });

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });

    if (this._userId === this._ownerId) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._cardId).then(() => {
          this._element.remove();
          this._element = null;
        });
      });
    } else {
      this._deleteButton.remove();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__heart");
    this._likeCount = this._element.querySelector(".card__like-count");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._element.querySelector(".card__title").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._updateLikeState();
    this._setEventListeners();

    return this._element;
  }
}
