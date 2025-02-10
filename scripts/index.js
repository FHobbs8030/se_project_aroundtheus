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

  // Image Library
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
      openmodal(imageModal);
    });

    return cardElement;
  }

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    openmodal(editModal);

    const saveButton = editForm.querySelector(".modal__save-button");
    saveButton.disabled = true;
    saveButton.classList.add("modal__button_disabled");

    validateFormInputs(); 
  });

  openAddModalButton.addEventListener("click", () => {
    openmodal(addModal);

    const saveButton = addForm.querySelector(".modal__save-button");
    saveButton.disabled = true;
    saveButton.classList.add("modal__button_disabled");

    validateAddFormInputs(); 
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

    // Validate the URL
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
    saveButton.classList.add("modal__button_disabled");
    closeModal(addModal);
  });

  function validateAddFormInputs() {
    const inputs = addForm.querySelectorAll(".modal__input");
    const saveButton = addForm.querySelector(".modal__save-button");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(addForm, input, config);
        toggleSaveButtonState(inputs, saveButton, config);
      });
    });

    toggleSaveButtonState(inputs, saveButton, config);
  }

  function checkInputValidity(formEl, inputEl, options) {
    if (inputEl.validity.valid) {
      hideInputError(formEl, inputEl, options);
    } else {
      showInputError(formEl, inputEl, options);
    }
  }

  function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.textContent = inputEl.validationMessage;
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.classList.add(errorClass);
    errorMessageEl.classList.add("visible");
  }

  function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
    errorMessageEl.classList.remove("visible");
  }

  function toggleSaveButtonState(
    inputEls,
    saveButton,
    { inactiveButtonClass }
  ) {
    const isFormValid = Array.from(inputEls).every(
      (inputEl) => inputEl.validity.valid
    );

    if (isFormValid) {
      saveButton.classList.remove(inactiveButtonClass);
      saveButton.disabled = false;
    } else {
      saveButton.classList.add(inactiveButtonClass);
      saveButton.disabled = true;
    }
  }

  function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("Form submitted successfully!");
      });

      setEventListeners(formEl, options);
    });
  }

  const config = {
    formSelector: "#edit-form, #add-form, modal-form",
    inputSelector: ".modal__input",
    saveButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };

  enableValidation(config);

  function openmodal(modal) {
    modal.classList.remove("modal_hidden");
    modal.classList.add("modal_open");

    if (!modal.hasAttribute("data-listener-attached")) {
      document.addEventListener("keydown", closeModalOnEscListener);
      modal.setAttribute("data-listener-attached", "true");
    }
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
});
