import { v4 as uuidv4 } from "uuid";
import "./index.css";
import Section from "../components/Section.js";
import { validationConfig } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import logoPath from "../images/logo.svg";
import Api from "../components/Api.js";
import profileImagePath from "../images/jacques-cousteau.jpg";

document.querySelector(".header__logo").src = logoPath;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "49b1b68f-7c8f-45c7-9c0e-4dcf6a213fcc",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");
const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm("#add-popup", handleAddCardFormSubmit);
const avatarPopup = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit);
const confirmPopup = new PopupWithConfirm("#confirm-popup");

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards"
);

cardSection.setItems = function (items) {
  this._items = items;
};

const loadingText = document.querySelector(".loading-text");

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar || profileImagePath,
      _id: userData._id,
    });
    return api.getInitialCards();
  })
  .then((cards) => {
    cardSection.setItems(cards.reverse());
    cardSection.renderItems();
    if (loadingText) {
      loadingText.style.display = "none";
    }
  })
  .catch((err) => {
    showError(err);
    if (loadingText) {
      loadingText.textContent = "Failed to load cards. Please try again later.";
    }
  });

const addForm = document.forms["add-form"];
const profileNameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");
const cardNameInput = addForm.querySelector("#place");
const cardLinkInput = addForm.querySelector("#link");

const openAddpopupButton = document.querySelector(".profile__add-button");
const openEditpopupButton = document.querySelector(".profile__edit-button");

openEditpopupButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  formValidators["edit-form"].resetValidation();
  editProfilePopup.open();
});

openAddpopupButton.addEventListener("click", () => {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  formValidators["add-form"].resetValidation();
  addCardPopup.open();
});

document.querySelector(".profile__image").addEventListener("click", () => {
  formValidators["avatar-form"].resetValidation();
  avatarPopup.open();
});

const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(validationConfig);

function createCard(data) {
  const card = new Card(
    data,
    userInfo.getUserId(),
    "#card-template",
    handleImageClick,
    (cardId, cardElement) => {
      return new Promise((resolve, reject) => {
        confirmPopup.setSubmitAction(() => {
          confirmPopup.renderLoading(true);
          api
            .deleteCard(cardId)
            .then(() => {
              cardElement.remove();
              resolve();
              confirmPopup.close();
            })
            .catch((err) => {
              showError(err);
              reject(err);
            })
            .finally(() => confirmPopup.renderLoading(false));
        });
        confirmPopup.open();
      });
    },
    handleLikeClick
  );

  return card.generateCard();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

function handleProfileFormSubmit(formData) {
  editProfilePopup.renderLoading(true);
  api
    .updateUserInfo(formData)
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, about: res.about });
      editProfilePopup.close();
    })
    .catch((err) => showError(err))
    .finally(() => editProfilePopup.renderLoading(false));
}

function handleAddCardFormSubmit(formData) {
  addCardPopup.renderLoading(true);
  api
    .addNewCard(formData)
    .then((cardData) => {
      renderCard(cardData);
      addCardPopup.close();
    })
    .catch((err) => showError(err))
    .finally(() => addCardPopup.renderLoading(false));
}

function handleAvatarFormSubmit(formData) {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar({ avatar: formData.avatar })
    .then((res) => {
      userInfo.setUserInfo({ avatar: res.avatar });
      avatarPopup.close();
    })
    .catch((err) => showError(err))
    .finally(() => avatarPopup.renderLoading(false));
}

function handleLikeClick(cardId, isLiked, cardInstance) {
  const action = isLiked ? api.removeLike(cardId) : api.addLike(cardId);

  action
    .then((updatedCard) => {
      console.log("API Like Response:", updatedCard);

      let likes = Array.isArray(updatedCard.likes) ? updatedCard.likes : [];

      if (!likes.length) {
        console.log("Fallback: manually updating likes...");
        const currentUserId = userInfo.getUserId();

        likes = isLiked
          ? cardInstance._likes.filter((user) => user._id !== currentUserId)
          : [...cardInstance._likes, { _id: currentUserId }];
      }

      cardInstance.updateLikes(likes);
    })
    .catch((err) => {
      showError(err);
    });
}

function showError(error) {
  alert(`An error occurred: ${error}`);
  console.error(error);
}
