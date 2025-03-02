import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  saveButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input-type-error",
  errorClass: "modal__input-error_visible",
};

const cardData = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Yosemite Valley",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Lake Louise",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Bald Mountains",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Latemar",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Vanoise National Park",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "Lago di Braies",
  },
];

const cardsContainer = document.querySelector("#cards-container");

const addModal = document.getElementById("add-modal");
const addForm = document.forms["add-form"];
const titleInput = addForm.querySelector("#place");
const urlInput = addForm.querySelector("#link");
const addSaveButton = addForm.querySelector(".modal__save-button");

const editModal = document.getElementById("edit-modal");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const openAddModalButton = document.querySelector(".profile__add-button");
const openEditModalButton = document.querySelector(".profile__edit-button");

const closeButtons = document.querySelectorAll(".modal__close-button");

const editForm = document.querySelector("#edit-form");

const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");

const saveButton = document.querySelector(".modal__save-button");
const previewImageModal = document.querySelector("#image-modal");

function handleImageClick(data) {
  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalCaption.textContent = data.name;
  openModal(document.querySelector("#image-modal"));
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
  formValidators["card-form"].toggleSubmitButtonState();
  closeModal(addModal);
});

openEditModalButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openModal(editModal);
});

saveButton.addEventListener("submit", (e) => {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closeModal(editModal);
});

function openModal(modal) {
  modal.classList.remove("modal_hidden");
  modal.classList.add("modal_open");
}

function closeModal(modalEl) {
  modalEl.classList.remove("modal_open");
  modalEl.classList.add("modal_hidden");
}

function createCard(item) {
  const newCard = new Card(item, "#card-template", handleImageClick);
  return newCard.getElement();
}

cardData.forEach((card) => {
  const cardElement = createCard(card);
  cardsContainer.prepend(cardElement);
});

openAddModalButton.addEventListener("click", () => {
  openModal(addModal);
});

document.querySelectorAll(".modal__close-button").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// document.addEventListener("keydown", (e) => {
//   if (e.key === "Escape") {
//     const openModal = document.querySelector(".modal_open");
//     if (openModal) {
//       closeModal(openModal);
//     }
//   }
// });

function handleEscapeClose(e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function openModal(modal) {
  modal.classList.remove("modal_hidden");
  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleEscapeClose);
}

function closeModal(modalEl) {
  modalEl.classList.remove("modal_open");
  modalEl.classList.add("modal_hidden");
  document.removeEventListener("keydown", handleEscapeClose);
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});
