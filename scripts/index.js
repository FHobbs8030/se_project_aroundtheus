document.addEventListener("DOMContentLoaded", () => {
  // Helper functions to open and close modals
  function openPopup(popup) {
    popup.classList.add("modal_opened");
  }

  function closePopup(popup) {
    popup.classList.remove("modal_opened");
  }

  // Further code logic goes here...
});


  function closePopup(popup) {
    popup.classList.remove("modal_opened");
  }

  // Find all close buttons
  const closeButtons = document.querySelectorAll(".modal__close");

  closeButtons.forEach((button) => {
    // Find the closest popup only once
    const popup = button.closest(".modal");
    // Set the listener
    button.addEventListener("click", () => closePopup(popup));
  });

  // Form elements and modal elements
  const profileForm = document.forms["profile-form"];
  const cardForm = document.forms["card-form"];
  const cardsContainer = document.querySelector("#cards-container");
  const template = document.querySelector("#card-template");
  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");
  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about_me");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");
  const previewImage = document.querySelector("#preview-image");
  const editModal = document.querySelector("#edit-modal");
  const addModal = document.querySelector("#add-modal");
  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  // Ensure cardsContainer and template are found in the DOM
  if (!cardsContainer || !template) {
    console.error("Cards container or template not found in the DOM.");
    return;
  }

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

  // Function to generate card element
  function getCardElement(data) {
    const cardElement = template.content.cloneNode(true).firstElementChild;

    // Get elements inside the card
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
      event.stopPropagation(); // Prevents modal from opening
      console.log("Delete button clicked");
      cardElement.remove(); // Removes the card from the DOM
    });

    // Add heart button toggle functionality
    heartButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevents modal from opening
      console.log("Heart button clicked");
      heartButton.classList.toggle("cards__heart__active");
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

  // Render initial cards
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
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

    // Reset the form using the reset method
    event.target.reset();
    previewImage.style.display = "none"; // Hide the preview image
    closePopup(addModal); // Use closePopup here
  });

  // Profile edit form submission
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;

    // Reset the form using the reset method
    event.target.reset();
    closePopup(editModal); // Use closePopup here
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
}
