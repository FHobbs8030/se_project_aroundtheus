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

openEditModalButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

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
  cardsContainer.appendChild(cardElement);

  closeModal(addModal);
});

const saveButton = document.querySelector(".modal__save-button");

saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closeModal(editModal);
});

const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

titleInput.addEventListener("input", () => {
  if (titleInput.value.trim() === "The Grand Canyon") {
    urlInput.value =
      "https://images.unsplash.com/photo-1547036346-addd3025caa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFRoZSUyMEdyYW5kJTIwQ2FueW9ufGVufDB8fDB8fHww";
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

urlInput.addEventListener("input", () => {
  if (urlInput.validity.valid && titleInput.value.trim()) {
    addSaveButton.disabled = false;
    addSaveButton.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    addSaveButton.disabled = true;
    addSaveButton.classList.add(validationConfig.inactiveButtonClass);
  }
});

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

const cards = document.querySelectorAll(".cards__card");

cardData.forEach((card) => {
  const cardElement = new Card(
    card,
    "#card-template",
    handleImageClick
  ).getElement();
  cardsContainer.appendChild(cardElement);
});

function handleImageClick(data) {
  const modalImage = document.querySelector(".modal__image");
  const modalCaption = document.querySelector(".modal__caption");

  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalCaption.textContent = data.name;

  openModal(document.querySelector("#image-modal"));
}

const editForm = document.querySelector("#edit-form");

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

// Open Add Modal when clicking on "Add" button
openAddModalButton.addEventListener("click", () => {
  openModal(addModal);
});

// Close Modal Event Listeners for Add and Edit modals
const closeAddModalButton = document.querySelector("#add-modal-close");
const closeEditModalButton = document.querySelector("#edit-modal-close");

closeEditModalButton.addEventListener("click", () => {
  closeModal(editModal);
});

closeAddModalButton.addEventListener("click", () => {
  closeModal(addModal);
});

// Close modal when clicking outside modal content
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
