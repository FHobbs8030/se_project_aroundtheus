document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector("#cards-container");
  const template = document.querySelector("#card-template");
  const editModal = document.querySelector("#edit-modal");
  const addModal = document.querySelector("#add-modal");
  const openEditModalButton = document.querySelector(".profile__edit-button");
  const closeEditModalButton = editModal.querySelector(".modal__close-button");
  const saveButton = editModal.querySelector(".modal__button");
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

  function getCardElement(data) {
    const cardElement = template.content.cloneNode(true);
    const image = cardElement.querySelector(".cards__image");
    const title = cardElement.querySelector(".cards__title");
    const deleteButton = cardElement.querySelector(".cards__delete-button");

    image.src = data.link;
    image.alt = data.name;
    title.textContent = data.name;

    deleteButton.addEventListener("click", () => {
      const card = deleteButton.closest(".cards__card");
      card.remove(); 
    });

    const heartButton = cardElement.querySelector(".cards__heart");
    const heartImage = cardElement.querySelector(".cards__heart-image");
    heartButton.addEventListener("click", function () {
      if (heartImage.src.includes("heart.svg")) {
        heartImage.src = "./images/black_heart.svg"; 
      } else {
        heartImage.src = "./images/heart.svg"; 
      }
    });

    return cardElement;
  }

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  openEditModalButton.addEventListener("click", () => {
    const originalName = profileName.textContent;
    const originalAboutMe = profileAboutMe.textContent;

    nameInput.value = originalName;
    aboutMeInput.value = originalAboutMe;

    editModal.classList.add("modal_opened");
  });

  closeEditModalButton.addEventListener("click", () => {
    editModal.classList.remove("modal_opened");
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newName = nameInput.value;
    const newAboutMe = aboutMeInput.value;

    profileName.textContent = newName;
    profileAboutMe.textContent = newAboutMe;

    editModal.classList.remove("modal_opened");
  });

  openAddModalButton.addEventListener("click", () => {
    addModal.classList.add("modal_opened");
  });

  closeAddModalButton.addEventListener("click", () => {
    addModal.classList.remove("modal_opened");
  });

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newPlace = {
      name: placeInput.value,
      link: linkInput.value,
    };

    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);

    placeInput.value = "";
    linkInput.value = "";
    addModal.classList.remove("modal_opened");
  });

  const imageModal = document.querySelector("#image-modal");
  const imageElement = imageModal.querySelector(".modal__image");
  const captionElement = imageModal.querySelector(".modal__caption");
  const imageModalClose = document.querySelector("#image-modal-close");

  cardsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("cards__image")) {
      const cardImage = event.target;
      imageElement.src = cardImage.src;
      imageElement.alt = cardImage.alt;
      captionElement.textContent = cardImage.alt;

      imageModal.classList.add("modal_opened");
    }
  });

  imageModalClose.addEventListener("click", () => {
    imageModal.classList.remove("modal_opened");
  });
  
});
