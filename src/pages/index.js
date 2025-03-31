import { v4 as uuidv4 } from "uuid";
import Section from "../components/Section.js";
import { validationConfig } from "../utils/constants.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import profileImagePath from "../images/jacques-cousteau.jpg";
import logoPath from "../images/logo.svg";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "370afff2-dc2e-4ff4-9a42-bff9c2721dd0",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__image",
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => console.error(err));

document.querySelector(".header__logo").src = logoPath;

const addpopup = document.getElementById("add-popup");
const addForm = document.forms["add-form"];
const cardNameInput = addForm.querySelector("#place");
const cardLinkInput = addForm.querySelector("#link");

const editpopup = document.getElementById("edit-popup");
const profileNameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const openAddpopupButton = document.querySelector(".profile__add-button");
const openEditpopupButton = document.querySelector(".profile__edit-button");

const imagePopup = new PopupWithImage("#image-popup");
const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm("#add-popup", handleAddCardFormSubmit);

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

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

api
  .getInitialCards()
  .then((cards) => {
    cards.reverse().forEach((cardData) => {
      renderCard(cardData);
    });
  })
  .catch((err) => console.error(err));

function handleProfileFormSubmit(formData) {
  api
    .updateUserInfo(formData)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });
}

function handleAddCardFormSubmit(formData) {
  api
    .addNewCard(formData)
    .then((cardData) => {
      renderCard(cardData);
      addCardPopup.close();
    })
    .catch((err) => console.error(err));
}

function handleImageClick(data) {
  imagePopup.open(data);
}

openEditpopupButton.addEventListener("click", () => {
  formValidators["edit-form"].resetValidation();
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  editProfilePopup.open();
});

openAddpopupButton.addEventListener("click", () => {
  formValidators["add-form"].resetValidation();
  addCardPopup.open();
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
    handleDeleteClick,
    handleLikeClick
  );
  return card.generateCard();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

document.addEventListener("DOMContentLoaded", () => {
  cardSection.renderItems();
});

function handleAvatarFormSubmit(formData) {
  api
    .updateAvatar({ avatar: formData.avatar })
    .then((res) => {
      userInfo.setUserInfo({ avatar: res.avatar });
      avatarPopup.close();
    })
    .catch((err) => console.error("Error:", err));
}

const avatarPopup = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit);
avatarPopup.setEventListeners();

document.querySelector(".profile__image").addEventListener("click", () => {
  formValidators["avatar-form"].resetValidation();
  avatarPopup.open();
});

function handleLikeClick(cardId, isLiked, updateLikesCallback) {
  const likeAction = isLiked ? api.removeLike(cardId) : api.addLike(cardId);
  likeAction
    .then((updatedCard) => {
      updateLikesCallback(updatedCard.likes);
    })
    .catch((err) => console.error(err));
}

function handleDeleteClick(cardId) {
  return api.deleteCard(cardId).catch((err) => console.error(err));
}
