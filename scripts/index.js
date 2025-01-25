document.addEventListener("DOMContentLoaded", () => {
  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  const template = document.querySelector("#card-template");

  const openAddModalButton = document.querySelector(".profile__add-button");
  const openEditModalButton = document.querySelector(".profile__edit-button");
  const addModal = document.getElementById("add-modal");
  const editModal = document.getElementById("edit-modal");
  const editForm = document.forms["edit-form"];

  const closeEditModalButton = editModal.querySelector(".modal__close-button");
  const closeAddModalButton = addModal.querySelector(".modal__close-button");
  const closeImageModalButton = document.querySelector("#image-modal-close");

  const cardForm = document.forms["card-form"];

  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");

  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");
  const cardsContainer = document.querySelector("#cards-container");

  const imageLibrary = {
    "The Grand Canyon": {
      name: "The Grand Canyon",
      link: "https://images.unsplash.com/photo-1547036346-addd3025caa4?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "A beautiful landscape of the Grand Canyon",
    },
    "Yosemite Valley": {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
      alt: "Yosemite Valley",
    },
    "Lake Louise": {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
      alt: "Lake Louise",
    },
    "Bald Mountains": {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
      alt: "Bald Mountains",
    },
    Latemar: {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
      alt: "Latemar",
    },
    "Vanoise National Park": {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
      alt: "Vanoise National Park",
    },
    "Lago di Braies": {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
      alt: "Lago di Braies",
    },
  };

  const initialCards = [
    imageLibrary["Yosemite Valley"],
    imageLibrary["Lake Louise"],
    imageLibrary["Bald Mountains"],
    imageLibrary["Latemar"],
    imageLibrary["Vanoise National Park"],
    imageLibrary["Lago di Braies"],
  ];

  function getCardElement(data) {
    const cardElement = template.content.cloneNode(true).firstElementChild;
    const image = cardElement.querySelector(".cards__image");
    const title = cardElement.querySelector(".cards__title");
    const deleteButton = cardElement.querySelector(".cards__delete-button");
    const heartButton = cardElement.querySelector(".cards__heart");

    image.src = data.link;
    image.alt = data.alt;
    title.textContent = data.name;

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      cardElement.remove();
    });

    heartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      heartButton.classList.toggle("cards__heart__active");
    });

    image.addEventListener("click", () => {
      modalImage.src = data.link;
      modalImage.alt = data.name;
      modalCaption.textContent = data.name;
      openPopup(imageModal);
    });

    return cardElement;
  }

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  placeInput.addEventListener("input", () => {
    const placeName = placeInput.value.trim();
    if (imageLibrary[placeName]) {
      linkInput.value = imageLibrary[placeName].link;
    } else {
      linkInput.value = "";
    }
  });

  function openPopup(modal) {
    modal.classList.remove("modal_hidden");
    modal.classList.add("modal_open");
  }

  function closePopup(modal) {
    modal.classList.remove("modal_open");
    modal.classList.add("modal_hidden");
  }

  // Function to reset the form inside the modal
  function resetModal(modal) {
    const form = modal.querySelector("form");
    form.reset(); // Clear all the form inputs

    // Remove error messages
    const errorMessages = modal.querySelectorAll(".modal__input-error");
    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = "";
    });

    // Remove error styles from inputs
    const inputs = form.querySelectorAll(".modal__input");
    inputs.forEach((input) => {
      input.classList.remove("popup__input_type_error");
    });

    // Disable the save button
    const saveButton = modal.querySelector(".modal__save-button");
    saveButton.disabled = true;
    saveButton.classList.add("popup__button_disabled");
  }

  // Reset the Add and Edit modals when they are closed
  closeAddModalButton.addEventListener("click", () => {
    closePopup(addModal);
    resetModal(addModal); // Reset Add Modal
  });

  closeEditModalButton.addEventListener("click", () => {
    closePopup(editModal);
    resetModal(editModal); // Reset Edit Modal
  });

  // Close Add modal if the user clicks on the background
  addModal.addEventListener("click", (event) => {
    if (event.target === addModal) {
      // Check if the click is on the background
      closePopup(addModal);
      resetModal(addModal); // Reset Add Modal
    }
  });

  // Close Edit modal if the user clicks on the background
  editModal.addEventListener("click", (event) => {
    if (event.target === editModal) {
      // Check if the click is on the background
      closePopup(editModal);
      resetModal(editModal); // Reset Edit Modal
    }
  });

  // Close Image modal if the user clicks on the background
  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      // Check if the click is on the background
      closePopup(imageModal);
    }
  });

  // Close Image modal if the user clicks the close button
  closeImageModalButton.addEventListener("click", () => {
    closePopup(imageModal);
  });

  // Open Edit Profile Modal
  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    openPopup(editModal);

    // Reset Save button to be disabled
    const saveButton = editForm.querySelector("button[type='submit']");
    saveButton.disabled = true;
    saveButton.classList.add("popup__button_disabled");

    // Trigger validation immediately after opening the modal
    checkInputValidity(editForm, nameInput, config);
    checkInputValidity(editForm, aboutMeInput, config);
  });

  // Open Add Place Modal
  openAddModalButton.addEventListener("click", () => {
    openPopup(addModal);

    // Reset Save button to be disabled
    const saveButton = cardForm.querySelector("button[type='submit']");
    saveButton.disabled = true;
    saveButton.classList.add("popup__button_disabled");

    // Don't trigger validation immediately, only when the user starts interacting
  });

  // Handle Edit Profile Form Submission
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;

    closePopup(editModal);
  });

  // Handle Add Place Form Submission
  cardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const placeName = placeInput.value.trim();
    const link = linkInput.value.trim();

    if (!isValidUrl(link)) {
      alert("Please enter a valid URL.");
      return;
    }

    let newPlace;
    if (imageLibrary[placeName]) {
      newPlace = imageLibrary[placeName];
    } else {
      newPlace = {
        name: placeName,
        link: link,
        alt: placeName,
      };
    }

    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);

    placeInput.value = "";
    linkInput.value = "";

    closePopup(addModal);
  });

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Function to enable closing the modal with Esc key
  function closePopupOnEsc(popupEl) {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closePopup(popupEl);
      }
    });
  }

  // Enable escape key to close modals
  closePopupOnEsc(addModal);
  closePopupOnEsc(editModal);
  closePopupOnEsc(imageModal);
});
