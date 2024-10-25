document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector("#cards-container");
  const template = document.querySelector("#card-template");
  const editModal = document.querySelector("#edit-modal");
  const addModal = document.querySelector("#add-modal");
  const openEditModalButton = document.querySelector(".profile__edit-button");
  const closeEditModalButton = editModal.querySelector(".modal__close-button");
  const openAddModalButton = document.querySelector(".profile__add-button");
  const closeAddModalButton = addModal.querySelector(".modal__close-button");
  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about_me");
  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");
  const previewImage = document.querySelector("#preview-image");
  const profileForm = document.forms["profile-form"];
  const cardForm = document.forms["card-form"];
  const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];

  // Universal functions for opening and closing modals
  function openPopup(modal) {
    modal.classList.add("modal_opened");
  }

  function closePopup(modal) {
    modal.classList.remove("modal_opened");
  }

  // Close button handling for both edit and add modals
  closeEditModalButton.addEventListener("click", () => closePopup(editModal));
  closeAddModalButton.addEventListener("click", () => closePopup(addModal));

  // Function to create card element
  function getCardElement(data) {
    const cardElement = template.content.cloneNode(true).firstElementChild;

    const image = cardElement.querySelector(".cards__image");
    const title = cardElement.querySelector(".cards__title");
    const deleteButton = cardElement.querySelector(".cards__delete-button");
    const heartButton = cardElement.querySelector(".cards__heart");

    // Set image and title
    image.src = data.link;
    image.alt = data.name;
    title.textContent = data.name;

    // Add delete button functionality
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      cardElement.remove();
    });

    // Add heart button toggle functionality
    heartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      heartButton.classList.toggle("cards__heart__active");
    });

    return cardElement;
  }

  // Render initial cards
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  // Open profile edit modal
  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    openPopup(editModal);
  });

  // Open add card modal
  openAddModalButton.addEventListener("click", () => openPopup(addModal));

  // Add card form submission
  document.querySelector("#add-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const newPlace = {
      name: placeInput.value || "Grand Canyon",
      link: linkInput.value.trim(),
    };

    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);

    event.target.reset();
    previewImage.style.display = "none";
    closePopup(addModal);
  });

  // Profile edit form submission
  document.querySelector("#edit-form").addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;

    event.target.reset();
    closePopup(editModal);
  });

  // Image modal setup
  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  cardsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("cards__image")) {
      modalImage.src = event.target.src;
      modalImage.alt = event.target.alt;
      modalCaption.textContent = event.target.alt;
      openPopup(imageModal);
    }
  });

  // Close image modal
  document.querySelector("#image-modal-close").addEventListener("click", () => {
    closePopup(imageModal);
  });

  // URL input validation for preview
  linkInput.addEventListener("input", (event) => {
    const url = event.target.value.trim();
    if (isValidUrl(url)) {
      previewImage.src = url;
      previewImage.classList.add("modal__image-preview-img_visible");
    } else {
      previewImage.classList.remove("modal__image-preview-img_visible");
    }
  });
});

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}
