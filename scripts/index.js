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
  const editForm = document.querySelector("#edit-form");
  const addForm = document.querySelector("#add-form");
  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");
  const previewImage = document.querySelector("#preview-image");

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

  function toggleModal(modal, open = true) {
    if (open) {
      modal.classList.add("modal_opened");
    } else {
      modal.classList.remove("modal_opened");
    }
  }

  function getCardElement(data) {
    const cardElement = template.content.cloneNode(true);
    const image = cardElement.querySelector(".cards__image");
    const title = cardElement.querySelector(".cards__title");
    const deleteButton = cardElement.querySelector(".cards__delete-button");
    const heartButton = cardElement.querySelector(".cards__heart");
    const heartImage = cardElement.querySelector(".cards__heart-image");

    image.src = data.link;
    image.alt = data.name;
    title.textContent = data.name;

    deleteButton.addEventListener("click", () => {
      deleteButton.closest(".cards__card").remove();
    });

    heartButton.addEventListener("click", () => {
      heartImage.src = heartImage.src.includes("heart.svg")
        ? "./images/black_heart.svg"
        : "./images/heart.svg";
    });

    return cardElement;
  }

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  cardsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("cards__image")) {
      modalImage.src = event.target.src;
      modalImage.alt = event.target.alt;
      modalCaption.textContent = event.target.alt;
      toggleModal(imageModal, true);
    }
  });

  document.querySelector("#image-modal-close").addEventListener("click", () => {
    toggleModal(imageModal, false);
  });

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    toggleModal(editModal, true);
  });

  closeEditModalButton.addEventListener("click", () => {
    editModal.classList.remove("modal_opened");
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
    toggleModal(editModal, false);
  });

  openAddModalButton.addEventListener("click", () =>
    toggleModal(addModal, true)
  );

  closeAddModalButton.addEventListener("click", () => {
    addModal.classList.remove("modal_opened");
  });

  addForm.addEventListener("submit", (event) => {
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
    toggleModal(addModal, false);
  });

  linkInput.addEventListener("input", (event) => {
    const url = event.target.value.trim();
    if (isValidUrl(url)) {
      previewImage.src = url;
      previewImage.style.display = "block";
    } else {
      previewImage.style.display = "none";
    }
  });

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }
});