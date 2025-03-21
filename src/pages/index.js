import { initialCards } from "./components/data.js";
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import profileImagePath from "../images/jacques-cousteau.jpg";
import logoPath from "../images/logo.svg";

document.querySelector(".header__logo").src = logoPath;
document.querySelector(".profile__image").src = profileImagePath;

document.querySelector(".header__logo").addEventListener("load", () => {
});
document.querySelector(".profile__image").addEventListener("load", () => {
});

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input-type-error",
  errorClass: "modal__input-error_visible",
};
  
const cardsContainer = document.querySelector("#cards-container");

const addModal = document.getElementById("add-modal");
const addForm = document.forms["add-form"];
const titleInput = addForm.querySelector("#place");
const urlInput = addForm.querySelector("#link");

const editModal = document.getElementById("edit-modal");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const openAddModalButton = document.querySelector(".profile__add-button");
const openEditModalButton = document.querySelector(".profile__edit-button");

const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");

const previewImageModal = document.querySelector("#image-modal");

function handleImageClick(data) {
  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalCaption.textContent = data.name;
  openModal(previewImageModal);
}

openEditModalButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openModal(editModal);
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

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCardData = {
    name: titleInput.value,
    link: urlInput.value,
    alt: titleInput.value,
  };

  const cardElement = createCard(newCardData);
  cardsContainer.prepend(cardElement);

  addForm.reset();
  formValidators["card-form"].resetValidation();
  closeModal(addModal);
});

document.querySelector("#edit-form").addEventListener("submit", (e) => {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closeModal(editModal);
});

function closeModal(modalEl) {
  modalEl.classList.remove("modal_open");
  modalEl.classList.add("modal_hidden");
  document.removeEventListener("keydown", handleEscapeClose);

  if (modalEl === addModal) {
    addForm.reset();
  }
}

function openModal(modal) {
  modal.classList.remove("modal_hidden");
  modal.classList.add("modal_open");

  if (modal === addModal) {
    formValidators["card-form"].resetValidation();
  } else if (modal === editModal) {
    formValidators["profile-form"].resetValidation();
  }

  document.addEventListener("keydown", handleEscapeClose);
}

function handleEscapeClose(e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function createCard(item) {
  const newCard = new Card(item, "#card-template", handleImageClick);
  return newCard.generateCard();
}

openAddModalButton.addEventListener("click", () => {
  openModal(addModal);
});

document.querySelectorAll(".modal__close-button").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    cardsContainer.append(cardElement);
  });
});

window.addEventListener("load", () => {
});
