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
  const addForm = document.forms["add-form"];

  const closeEditModalButton = editModal.querySelector("#edit-modal-close");
  const closeAddModalButton = addModal.querySelector("#add-modal-close");
  const closeImageModalButton = document.querySelector("#image-modal-close");

  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about");

  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");
  const cardsContainer = document.querySelector("#cards-container");

  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");

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
    imageLibrary["The Grand Canyon"], // Initially included but will be hidden
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
      openmodal(imageModal);
    });

    return cardElement;
  }

  // Add all cards, including The Grand Canyon
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  // Hide the "The Grand Canyon" card after adding it
  const grandCanyonCard = Array.from(cardsContainer.children).find(
    (card) =>
      card.querySelector(".cards__title").textContent === "The Grand Canyon"
  );
  if (grandCanyonCard) {
    grandCanyonCard.style.display = "none"; // Hide The Grand Canyon card
  }

  // Handle opening the edit modal
  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;

    // Open the edit modal
    openmodal(editModal);

    // Disable the save button when the modal is opened
    const saveButton = editForm.querySelector(".modal__save-button");
    saveButton.disabled = true;
    saveButton.classList.add("modal__save-button_disabled"); // Add the disabled class to reflect the state

    // Validate the form inputs
    validateFormInputs(editForm, saveButton);

    // Add event listeners for input changes to check for changes
    nameInput.addEventListener("input", () =>
      checkAndEnableSaveButton(saveButton)
    );
    aboutMeInput.addEventListener("input", () =>
      checkAndEnableSaveButton(saveButton)
    );
  });

  openAddModalButton.addEventListener("click", () => {
    openmodal(addModal);

    const saveButton = addForm.querySelector(".modal__save-button");
    saveButton.disabled = true;
    saveButton.classList.add("modal__save-button_disabled");

    validateFormInputs(addForm, saveButton);
  });

  closeAddModalButton.addEventListener("click", () => closeModal(addModal));
  closeEditModalButton.addEventListener("click", () => closeModal(editModal));
  closeImageModalButton.addEventListener("click", () => closeModal(imageModal));

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
    closeModal(editModal);
  });

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const placeTitle = document.querySelector("#place").value.trim();
    const imageUrl = document.querySelector("#link").value.trim();

    if (!isValidUrl(imageUrl)) {
      alert("Please enter a valid URL.");
      return;
    }

    const newPlace = {
      name: placeTitle,
      link: imageUrl,
      alt: placeTitle,
    };

    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);

    document.querySelector("#place").value = "";
    document.querySelector("#link").value = "";

    const saveButton = addForm.querySelector(".modal__save-button");
    saveButton.disabled = true;
    saveButton.classList.add("modal__save-button_disabled");
    closeModal(addModal);
  });

  // Automatically fill the URL when the title is filled out
  placeInput.addEventListener("input", () => {
    const title = placeInput.value.trim().toLowerCase(); // Make the title lowercase for case-insensitive comparison
    const matchingPlace = Object.keys(imageLibrary).find(
      (key) => key.toLowerCase() === title
    );

    if (matchingPlace) {
      // If a match is found, populate the URL field with the corresponding link
      let url = imageLibrary[matchingPlace].link;

      // Clean the URL (removing "-add" or any unwanted part)
      if (url.includes("-add")) {
        url = url.replace("-add", ""); // Remove the unwanted part
      }

      linkInput.value = url; // Set the cleaned URL
    } else {
      linkInput.value = ""; // Clear the URL if no match
    }

    toggleSaveButton(); // Recheck the button state after populating the URL
  });

  function toggleSaveButton() {
    const title = placeInput.value.trim();
    const url = linkInput.value.trim();
    const saveButton = addForm.querySelector(".modal__save-button");

    if (title && isValidUrl(url)) {
      saveButton.disabled = false;
      saveButton.classList.remove("modal__save-button_disabled");
      saveButton.classList.add("modal__button_enabled");
    } else {
      saveButton.disabled = true;
      saveButton.classList.remove("modal__button_enabled");
      saveButton.classList.add("modal__save-button_disabled");
    }
  }

  function checkAndEnableSaveButton(saveButton) {
    const nameChanged =
      nameInput.value.trim() !== profileName.textContent.trim();
    const aboutChanged =
      aboutMeInput.value.trim() !== profileAboutMe.textContent.trim();

    if (nameChanged || aboutChanged) {
      saveButton.disabled = false;
      saveButton.classList.remove("modal__save-button_disabled");
      saveButton.classList.add("modal__button_enabled");
    } else {
      saveButton.disabled = true;
      saveButton.classList.add("modal__save-button_disabled");
      saveButton.classList.remove("modal__button_enabled");
    }
  }

  function validateFormInputs(formEl, saveButton) {
    const inputs = formEl.querySelectorAll(".modal__input");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(formEl, input, config);
        toggleSaveButton(); // Ensure toggleSaveButton is triggered after each input
      });
    });

    toggleSaveButton(); // Initial state check when the modal opens
  }

  function openmodal(modal) {
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

  function isValidUrl(url) {
    try {
      // Use URL constructor to validate
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
});
