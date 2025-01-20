document.addEventListener("DOMContentLoaded", () => {
  // Image Modal
  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  // Card Template
  const template = document.querySelector("#card-template");

  // Modals
  const openAddModalButton = document.querySelector(".profile__add-button");
  const openEditModalButton = document.querySelector(".profile__edit-button");
  const addModal = document.getElementById("add-modal");
  const editModal = document.getElementById("edit-modal");

  const saveButtonAdd = document.querySelector("#add-modal .modal__button"); // Ensure you're selecting the correct button inside the add modal
  const saveButtonEdit = document.querySelector("#edit-modal .modal__button");

  const closeEditModalButton = editModal.querySelector(".modal__close-button");
  const closeAddModalButton = addModal.querySelector(".modal__close-button");
  const closeImageModalButton = document.querySelector("#image-modal-close");


  
  // Card Form and Inputs
  const cardForm = document.forms["card-form"];
  const editForm = document.forms["edit-form"];
  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about_me");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");

  // Profile Section
  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");
  const cardsContainer = document.querySelector("#cards-container");

  // Save Button
  const saveButton = document.querySelector(".modal__button");

  // Image Library (predefined locations)
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

  // Function to get card element
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

  // Add initial cards to container
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  // Update link input based on place input
  placeInput.addEventListener("input", () => {
    const placeName = placeInput.value.trim();
    if (imageLibrary[placeName]) {
      linkInput.value = imageLibrary[placeName].link;
    } else {
      linkInput.value = "";
    }
  });

  // Popup open/close functionality
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

  // Open Edit Modal
  openEditModalButton.addEventListener("click", () => {
    openPopup(editModal);
    saveButtonEdit.disabled = true; // Disable the button initially
    saveButtonEdit.classList.add("button_inactive");
    setButtonStateEdit();
  });

  closeEditModalButton.addEventListener("click", () => {
    closePopup(editModal);
  });

  // Open Add Modal
  openAddModalButton.addEventListener("click", () => {
    openPopup(addModal); // Open the add modal
    saveButtonAdd.disabled = true; // Disable the button initially
    saveButtonAdd.classList.add("button_inactive"); // Apply the inactive class
    setButtonStateAdd(); // Ensure the button state is checked for the add modal
  });

  closeAddModalButton.addEventListener("click", () => {
    closePopup(addModal);
  });

const setButtonStateAdd = () => {
  const saveButtonAdd = document.querySelector("#add-modal .modal__button");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");

  if (placeInput.value.trim() && linkInput.value.trim()) {
    saveButtonAdd.disabled = false; // Enable if both fields are filled
    saveButtonAdd.classList.remove("button_inactive");
    saveButtonAdd.classList.add("button_active");
  } else {
    saveButtonAdd.disabled = true; // Disable if the fields are empty
    saveButtonAdd.classList.remove("button_active");
    saveButtonAdd.classList.add("button_inactive");
  }
};

// Ensure that the button state is checked when the user types in the fields
document.querySelector("#place").addEventListener("input", setButtonStateAdd);
document.querySelector("#link").addEventListener("input", setButtonStateAdd);


  // Add input event listeners to handle validation for the modals
  placeInput.addEventListener("input", setButtonStateAdd);
  linkInput.addEventListener("input", setButtonStateAdd);
  nameInput.addEventListener("input", setButtonStateEdit);
  aboutMeInput.addEventListener("input", setButtonStateEdit);

  // Form submissions for the modals
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
    closePopup(editModal);
  });

  cardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const placeName = placeInput.value.trim();
    const link = linkInput.value.trim();
    if (!isValidUrl(link)) {
      alert("Please enter a valid URL.");
      return;
    }
    let newPlace = { name: placeName, link: link, alt: placeName };
    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);
    placeInput.value = "";
    linkInput.value = "";
    closePopup(addModal);
    setButtonStateAdd();
  });

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
});