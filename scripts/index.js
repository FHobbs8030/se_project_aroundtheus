document.addEventListener("DOMContentLoaded", () => {
  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  const template = document.querySelector("#card-template");

  const openAddModalButton = document.querySelector(".profile__add-button");
  const openEditModalButton = document.querySelector(".profile__edit-button");
  const addModal = document.getElementById("add-modal");
  const editModal = document.getElementById("edit-modal");
  const editForm = document.forms["profile-form"];

  const closeEditModalButton = editModal.querySelector(".modal__close-button");
  const closeAddModalButton = addModal.querySelector(".modal__close-button");
  const closeImageModalButton = document.querySelector("#image-modal-close");

  const cardForm = document.forms["card-form"];

  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about_me");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");

  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");
  const cardsContainer = document.querySelector("#cards-container");

  const saveButton = document.querySelector(".modal__button");

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

  closeImageModalButton.addEventListener("click", () => {
    closePopup(imageModal);
  });

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    openPopup(editModal);
    openEditModal();
  });

  closeEditModalButton.addEventListener("click", () => {
    closePopup(editModal);
  });

  openAddModalButton.addEventListener("click", () => {
    openPopup(addModal);
    setButtonState();
  });

  closeAddModalButton.addEventListener("click", () => {
    closePopup(addModal);
  });

const setButtonState = () => {
  if (editForm.checkValidity()) {
    saveButton.disabled = false;
    saveButton.classList.remove("button_inactive");
  } else {
    saveButton.disabled = true;
    saveButton.classList.add("button_inactive");
  }

  // Clear error messages when the user starts typing again
  nameInput.addEventListener("input", () => {
    nameInput.setCustomValidity("");
    nameInput.reportValidity();
  });

  aboutMeInput.addEventListener("input", () => {
    aboutMeInput.setCustomValidity("");
    aboutMeInput.reportValidity();
  });
};


  // Ensure the error messages are displayed
  nameInput.addEventListener("input", setButtonState);
  aboutMeInput.addEventListener("input", setButtonState);

  // Validate form on submit and show default error messages
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!editForm.checkValidity()) {
      nameInput.reportValidity(); // Show the validation error for the name field
      aboutMeInput.reportValidity(); // Show the validation error for the about me field
    } else {
      // If valid, update profile and close modal
      document.querySelector(".profile__name").textContent = nameInput.value;
      document.querySelector(".profile__about_me").textContent =
        aboutMeInput.value;
      closePopup(editModal);
    }
  });

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = document.querySelector(".profile__name").textContent;
    aboutMeInput.value =
      document.querySelector(".profile__about_me").textContent;
    setButtonState(); // Ensure the button is disabled on modal open
    openPopup(editModal);
  });

  closeEditModalButton.addEventListener("click", () => {
    closePopup(editModal);
  });

  // Modal open/close functions
  function openPopup(modal) {
    modal.classList.remove("modal_hidden");
    modal.classList.add("modal_open");
  }

  function closePopup(modal) {
    modal.classList.remove("modal_open");
    modal.classList.add("modal_hidden");
  }
});
