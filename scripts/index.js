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

  const closeEditModalButton = editModal.querySelector("#edit-modal-close");
  const closeAddModalButton = addModal.querySelector("#add-modal-close");
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

  // placeInput.addEventListener("input", () => {
  //   const placeName = placeInput.value.trim();
  //   if (imageLibrary[placeName]) {
  //     linkInput.value = imageLibrary[placeName].link;
  //   } else {
  //     linkInput.value = "";
  //   }
  // });

  function openPopup(modal) {
    modal.classList.remove("modal_hidden");
    modal.classList.add("modal_open");
  }

  function closePopup(modal) {
    modal.classList.remove("modal_open");
    modal.classList.add("modal_hidden");
  }

  function resetModal(modal) {
    const form = modal.querySelector("form");
    form.reset(); 

    const errorMessages = modal.querySelectorAll(".modal__input-error");
    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = "";
    });

    const inputs = form.querySelectorAll(".modal__input");
    inputs.forEach((input) => {
      input.classList.remove("popup__input_type_error");
    });

    const saveButton = modal.querySelector(".modal__save-button");
    saveButton.disabled = true;
    saveButton.classList.add("popup__button_disabled");
  }

  closeAddModalButton.addEventListener("click", () => {
    closePopup(addModal);
    resetModal(addModal); 
  });

  closeEditModalButton.addEventListener("click", () => {
    closePopup(editModal);
    // resetModal(editModal); 
  });

  addModal.addEventListener("click", (event) => {
    if (event.target === addModal) {
      closePopup(addModal);
      // resetModal(addModal); 
    }
  });

  editModal.addEventListener("click", (event) => {
    if (event.target === editModal) {
      closePopup(editModal);
      // resetModal(editModal); 
    }
  });

  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      closePopup(imageModal);
    }
  });

  closeImageModalButton.addEventListener("click", () => {
    closePopup(imageModal);
  });

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    openPopup(editModal);

    const saveButton = editForm.querySelector("button[type='submit']");
    saveButton.disabled = true;
    saveButton.classList.add("popup__button_disabled");

    checkInputValidity(editForm, nameInput, config);
    checkInputValidity(editForm, aboutMeInput, config);
  });

  openAddModalButton.addEventListener("click", () => {
    openPopup(addModal);

    // const saveButton = cardForm.querySelector("button[type='submit']");
    // saveButton.disabled = true;
    // saveButton.classList.add("popup__button_disabled");
  });

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

  function closePopupOnEsc(popupEl) {
  }

  closePopupOnEsc(addModal);
  closePopupOnEsc(editModal);
  closePopupOnEsc(imageModal);
});
