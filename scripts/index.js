document.addEventListener("DOMContentLoaded", () => {
  // Universal functions to open and close modals
  function openPopup(popup) {
    popup.classList.add("modal_opened");
  }

  function closePopup(popup) {
    popup.classList.remove("modal_opened");
  }

  // Accessing forms using document.forms
  const profileForm = document.forms["profile-form"];
  const cardForm = document.forms["card-form"];

  // Other variables
  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about_me");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");
  const previewImage = document.querySelector("#preview-image");
  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");

  // Get the container element
  const cardsContainer = document.querySelector("#cards-container");
  console.log(cardsContainer); // Should not be null
  const template = document.querySelector("#card-template");
  const editModal = document.querySelector("#edit-modal");
  const addModal = document.querySelector("#add-modal");
  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  // Function to generate card element from template
  function getCardElement(data) {
    // Clone the template content
    const cardElement = template.content.cloneNode(true);

    // Get elements inside the card
    const image = cardElement.querySelector(".cards__image");
    const title = cardElement.querySelector(".cards__title");
    const deleteButton = cardElement.querySelector(".cards__delete-button");

    // Set image and title
    image.src = data.link;
    image.alt = data.name;
    title.textContent = data.name;

    // Add delete functionality
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    return cardElement;
  }

  // Initial cards data
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

initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });
});

  // Profile edit form submission
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
    closePopup(editModal);
  });

  // Add card form submission
  cardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newPlace = {
      name: placeInput.value || "Grand Canyon",
      link: linkInput.value.trim(),
    };
    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);
    placeInput.value = "";
    linkInput.value = "";
    previewImage.style.display = "none";
    closePopup(addModal);
  });

  // Image modal setup
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

  // Open profile edit modal
  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", () => {
      nameInput.value = profileName.textContent;
      aboutMeInput.value = profileAboutMe.textContent;
      openPopup(editModal);
    });

  // Open add card modal
  document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => {
      openPopup(addModal);
    });

  // Close modals
  document
    .querySelector("#add-modal .modal__close-button")
    .addEventListener("click", () => {
      closePopup(addModal);
    });

  document
    .querySelector("#edit-modal .modal__close-button")
    .addEventListener("click", () => {
      closePopup(editModal);
    });

  // URL input validation for preview
  linkInput.addEventListener("input", (event) => {
    const url = event.target.value.trim();
    if (isValidUrl(url)) {
      previewImage.src = url;
      previewImage.style.display = "block";
    } else {
      previewImage.style.display = "none";
    }
  });

  // Helper function to check if a URL is valid
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };