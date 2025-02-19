import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"; // Import FormValidator class

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

// Complete initial cards data
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

// Create and add cards to the container
initialCardsData.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardsContainer.appendChild(card.getElement());
});

// Form validation settings
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  saveButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__input-error_visible",
};

// Select form elements to apply validation
const editForm = document.querySelector("#edit-form");
const addForm = document.querySelector("#add-form");

// Create FormValidator instances for each form
const editFormValidator = new FormValidator(validationConfig, editForm);
const addFormValidator = new FormValidator(validationConfig, addForm);

// Enable validation for each form
editFormValidator.enableValidation();
addFormValidator.enableValidation();
