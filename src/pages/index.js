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
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "89e3ea2e-5a94-459a-80b5-15d1125b7b24",
    "Content-Type": "application/json",
  },
});

document.querySelector(".header__logo").src = logoPath;
document.querySelector(".profile__image").src = profileImagePath;

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__image",
});

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

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  api
    .addNewCard({ name, link })
    .then((cardData) => {
      renderCard(cardData);
      addCardPopup.close();
      evt.target.reset();
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

function createCard(item) {
  const newCard = new Card(item, "#card-template", handleImageClick);
  return newCard.generateCard();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

document.addEventListener("DOMContentLoaded", () => {
  cardSection.renderItems();
});
