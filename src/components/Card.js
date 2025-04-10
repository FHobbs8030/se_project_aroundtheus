import heartIcon from "../images/heart.svg";
import heartFilledIcon from "../images/heart-filled.svg";
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
    this._ownerId = data.owner?._id || data.owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  generateCard() {
    this._element = this._getTemplate();
    if (!this._element) return null;

    this._likeButton = this._element.querySelector(".card__like-button");
    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    this._updateLikes(this._likes);

    return this._element;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    if (!template) return null;
    const clone = template.content.querySelector(".card").cloneNode(true);
    return clone;
  }

  _updateLikes(isLiked) {
    this._likeState = isLiked;
    this._updateLikeState();
  }

  _isLiked() {
    return this._likeState;
  }

  _updateLikeState() {
    if (!this._likeButton) {
      console.log("Like button not found");
      return;
    }

    if (this._likeState) {
      this._likeButton.style.backgroundImage = `url(${heartIcon})`;
    } else {
      this._likeButton.style.backgroundImage = `url(${heartFilledIcon})`;
    }
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => {
        this._handleLikeClick(this._cardId, this._isLiked())
          .then((updatedCard) => {
            if (updatedCard && updatedCard.isLiked !== undefined) {
              this._updateLikes(updatedCard.isLiked);
            }
          })
          .catch((err) => console.error("Like update failed:", err));
      });
    }
  }
}