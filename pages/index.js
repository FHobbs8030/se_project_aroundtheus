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
const addForm = document.querySelector("#add-form");
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

const addFormValidator = new FormValidator(validationConfig, addForm);

document.addEventListener("DOMContentLoaded", () => {
  const editForm = document.querySelector("#edit-form");
  const editFormValidator = new FormValidator(validationConfig, editForm);
  const saveButton = document.querySelector(".modal__save-button"); 

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;

    editFormValidator.resetValidation();
    openModal(editModal);
  });

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newCardData = {
      name: titleInput.value,
      link: urlInput.value,
      alt: titleInput.value,
    };

    const newCard = new Card(newCardData, "#card-template", handleImageClick);
    const cardElement = newCard.getElement();
    cardsContainer.insertBefore(cardElement, cardsContainer.firstChild);

    addSaveButton.disabled = true;
    addSaveButton.classList.add(validationConfig.inactiveButtonClass);

    titleInput.value = "";
    urlInput.value = "";

    addFormValidator.resetValidation();

    closeModal(addModal);
  });

  saveButton.addEventListener("click", (e) => {
    e.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    saveButton.disabled = true;
    saveButton.classList.add(validationConfig.inactiveButtonClass);

    closeModal(editModal);
  });

  titleInput.addEventListener("input", () => {
    const title = titleInput.value.trim();
    if (titleToUrlMapping[title]) {
      urlInput.value = titleToUrlMapping[title];
    } else {
      urlInput.value = "";
    }

    if (titleInput.value.trim() && urlInput.validity.valid) {
      addSaveButton.disabled = false;
      addSaveButton.classList.remove(validationConfig.inactiveButtonClass);
    } else {
      addSaveButton.disabled = true;
      addSaveButton.classList.add(validationConfig.inactiveButtonClass);
    }
  });

  const titleToUrlMapping = {
    "Yosemite Valley":
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    "Lake Louise":
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    "Bald Mountains":
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    Latemar:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    "Vanoise National Park":
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    "Lago di Braies":
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  };

  function openModal(modal) {
    modal.classList.remove("modal_hidden");
    modal.classList.add("modal_open");

    if (!modal.hasAttribute("data-listener-attached")) {
      document.addEventListener("keydown", closeModalOnEscListener);
      modal.setAttribute("data-listener-attached", "true");
    }

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  }

  function closeModal(modalEl) {
    modalEl.classList.remove("modal_open");
    modalEl.classList.add("modal_hidden");
    document.removeEventListener("keydown", closeModalOnEscListener);
    modalEl.removeAttribute("data-listener-attached");
  }

  function closeModalOnEscListener(event) {
    if (event.key === "Escape") {
      const openModal = document.querySelector(".modal_open");
      if (openModal) {
        closeModal(openModal);
      }
    }
  }

  const closeButtons = document.querySelectorAll(".modal__close-button");

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal);
    });
  });

  cardData.forEach((card) => {
    const cardElement = new Card(
      card,
      "#card-template",
      handleImageClick
    ).getElement();
    cardsContainer.appendChild(cardElement);
  });

  openAddModalButton.addEventListener("click", () => {
    openModal(addModal);
  });

  const closeAddModalButton = document.querySelector("#add-modal-close");
  const closeEditModalButton = document.querySelector("#edit-modal-close");

  closeEditModalButton.addEventListener("click", () => {
    closeModal(editModal);
  });

  closeAddModalButton.addEventListener("click", () => {
    closeModal(addModal);
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openModal = document.querySelector(".modal_open");
      if (openModal) {
        closeModal(openModal);
      }
    }
  });
});

function handleImageClick(data) {
  const modalImage = document.querySelector(".modal__image");
  const modalCaption = document.querySelector(".modal__caption");

  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalCaption.textContent = data.name;

  openModal(document.querySelector("#image-modal"));
}
