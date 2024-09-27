document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector("#cards-container");
  const editModal = document.querySelector("#edit-modal");
  const addModal = document.querySelector("#add-modal");
  const openEditModalButton = document.querySelector(".profile__edit-button");
  const closeEditModalButton = editModal.querySelector(".modal__close-button");
  const saveButton = editModal.querySelector(".modal__button");
  const openAddModalButton = document.querySelector(".profile__add-button");
  const closeAddModalButton = addModal.querySelector(".modal__close-button");
  const addCardButton = addModal.querySelector(".modal__button");
  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about_me");
  const editForm = document.querySelector("#edit-form");
  const addForm = document.querySelector("#add-form");
  const template = document.querySelector("#card-template");
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

    image.src = data.link;
    image.alt = data.name;
    title.textContent = data.name;

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
});
