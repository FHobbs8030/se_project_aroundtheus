import heartIcon from "../images/heart.svg";
import heartFilledIcon from "../images/heart-filled.svg";
console.log("Heart icon webpack path:", heartIcon);
console.log("Heart filled icon webpack path:", heartFilledIcon);
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

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    if (!template) return null;
    const clone = template.content.querySelector(".card").cloneNode(true);
    return clone;
  }

  _updateLikes(likes) {
    this._likes = likes || [];
    const likeCountElement = this._element.querySelector(".card__like-count");
    if (likeCountElement) {
      if (this._likes.length === 0) {
        likeCountElement.textContent = "";
      } else {
        likeCountElement.textContent = this._likes.length;
      }
    }
    this._updateLikeState();
  }

  _isLiked() {
    return (
      Array.isArray(this._likes) &&
      this._likes.some(
        (like) => like._id === this._userId || like === this._userId
      )
    );
  }

  _updateLikeState() {
    if (!this._likeButton) return;

    this._likeButton.style.backgroundImage = this._isLiked()
      ? `url(${heartFilledIcon})`
      : `url(${heartIcon})`;
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
            if (updatedCard && updatedCard.likes) {
              this._updateLikes(updatedCard.likes);
            }
          })
          .catch((err) => console.error("Like update failed:", err));
      });
    }

    if (this._cardImage) {
      this._cardImage.addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
    }

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._cardId)
          .then(() => {
            this._removeCard();
          })
          .catch((err) => console.error("Delete failed:", err));
      });
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    if (!this._element) return null;

    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__heart");
    this._likeCount = this._element.querySelector(".card__like-count");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.onerror = () => {
      console.error(`Failed to load image: ${this._link}`);
      this._cardImage.src = "path/to/fallback-image.jpg";
    };
    this._cardImage.alt = this._name;

    if (this._likeCount) {
      if (this._likes.length === 0) {
        this._likeCount.textContent = "";
      } else {
        this._likeCount.textContent = this._likes.length;
      }
    }

    if (this._ownerId !== this._userId && this._deleteButton) {
      this._deleteButton.remove();
    }

    this._updateLikeState();
    this._setEventListeners();

    return this._element;
  }
}
