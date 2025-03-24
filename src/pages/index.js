import { v4 as uuidv4 } from "uuid";
import { initialCards } from "../components/data.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import profileImagePath from "../images/jacques-cousteau.jpg";
import logoPath from "../images/logo.svg";

document.querySelector(".header__logo").src = logoPath;
document.querySelector(".profile__image").src = profileImagePath;

document.querySelector(".header__logo").addEventListener("load", () => {});
document.querySelector(".profile__image").addEventListener("load", () => {});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__input-error_visible",
};

const cardsContainer = document.querySelector("#cards-container");

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
  profileName.textContent = formData.name;
  profileAbout.textContent = formData.about;
  editProfilePopup.close();
}

function handleAddCardFormSubmit(formData) {
  const newCardData = {
    name: formData.place,
    link: formData.link,
    alt: formData.place,
    id: uuidv4(),
  };

  const cardElement = createCard(newCardData);
  cardsContainer.prepend(cardElement);
  addCardPopup.close();
}

function handleImageClick(data) {
  imagePopup.open(data);
}

openEditpopupButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  editProfilePopup.open();
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

openAddpopupButton.addEventListener("click", () => {
  addCardPopup.open();
});

document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    cardsContainer.append(cardElement);
  });
});

window.addEventListener("load", () => {});