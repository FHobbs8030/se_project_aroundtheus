import { v4 as uuidv4 } from "uuid";
import Section from "../components/Section.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import profileImagePath from "../images/jacques-cousteau.jpg";
import logoPath from "../images/logo.svg";

document.querySelector(".header__logo").src = logoPath;
document.querySelector(".profile__image").src = profileImagePath;

document.querySelector(".header__logo").addEventListener("load", () => {});
document.querySelector(".profile__image").addEventListener("load", () => {});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__image",
});

const addpopup = document.getElementById("add-popup");
const addForm = document.forms["add-form"];
const titleInput = addForm.querySelector("#place");
const urlInput = addForm.querySelector("#link");

const editpopup = document.getElementById("edit-popup");
const nameInput = document.querySelector("#name");
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

function handleProfileFormSubmit(formData) {
userInfo.setUserInfo({
  name: formData.name,
  about: formData.about,
});
  editProfilePopup.close();
}

function handleAddCardFormSubmit(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
  addCardPopup.close();
}

function handleImageClick(data) {
  imagePopup.open(data);
}

openEditpopupButton.addEventListener("click", () => {
  formValidators["edit-form"].resetValidation();
  const currentUserInfo = userInfo.getUserInfo();
  console.log("Current user info:", currentUserInfo); 
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  editProfilePopup.open();
});

// openEditpopupButton.addEventListener("click", () => {
//   console.log("Edit button clicked"); 
//   formValidators["edit-form"].resetValidation(); 
//   const userData = userInfo.getUserInfo();
//   nameInput.value = userData.name;
//   aboutInput.value = userData.about;
//   editProfilePopup.open();
// });

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

openAddpopupButton.addEventListener("click", () => {
  console.log("Add button clicked");
  formValidators["add-form"].resetValidation(); 
  addCardPopup.open();
});

document.addEventListener("DOMContentLoaded", () => {
  cardSection.renderItems();
});

window.addEventListener("load", () => {});