import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js"; // Corrected import

// Validation Configuration
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  saveButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__input-error_visible",
};

// Handle image click to open the modal
function handleImageClick(data) {
  const modalImage = document.querySelector(".modal__image");
  const modalCaption = document.querySelector(".modal__caption");

  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalCaption.textContent = data.name;

  openModal(document.querySelector("#image-modal"));
}

// Open modal function
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

// Close modal function
function closeModal(modalEl) {
  modalEl.classList.remove("modal_open");
  modalEl.classList.add("modal_hidden");
  document.removeEventListener("keydown", closeModalOnEscListener);
  modalEl.removeAttribute("data-listener-attached");
}

// Close modal on ESC key press
function closeModalOnEscListener(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

const initialCardsData = [
  // {
  //   name: "The Grand Canyon",
  //   link: "https://images.unsplash.com/photo-1547036346-addd3025caa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFRoZSUyMEdyYW5kJTIwQ2FueW9ufGVufDB8fDB8fHww",
  //   alt: "A beautiful landscape of the Grand Canyon",
  // },
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

// Cards container
const cardsContainer = document.querySelector("#cards-container");

initialCardsData.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  console.log(card.generateCard()); // Log the generated card
  cardsContainer.appendChild(card.getElement());
});

// Initialize FormValidator instances for the forms
const editForm = document.querySelector("#edit-form");
const addForm = document.querySelector("#add-form");

const editFormValidator = new FormValidator(validationConfig, editForm);
const addFormValidator = new FormValidator(validationConfig, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Open and close modals (edit, add, image)
const openEditModalButton = document.querySelector(".profile__edit-button");
const openAddModalButton = document.querySelector(".profile__add-button");

const editModal = document.getElementById("edit-modal");
const addModal = document.getElementById("add-modal");

openEditModalButton.addEventListener("click", () => {
  openModal(editModal);
});

openAddModalButton.addEventListener("click", () => {
  openModal(addModal);
});

const closeEditModalButton = document.querySelector("#edit-modal-close");
const closeAddModalButton = document.querySelector("#add-modal-close");

closeEditModalButton.addEventListener("click", () => {
  closeModal(editModal);
});

closeAddModalButton.addEventListener("click", () => {
  closeModal(addModal);
});

const closeImageModalButton = document.querySelector("#image-modal-close");

if (closeImageModalButton) {
  closeImageModalButton.addEventListener("click", () => {
    const imageModal = document.querySelector("#image-modal");
    closeModal(imageModal);
  });
}

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
