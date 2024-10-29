document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector("#cards-container");
  const template = document.querySelector("#card-template");
  const editModal = document.querySelector("#edit-modal");
  const addModal = document.querySelector("#add-modal");
  const imageModal = document.querySelector("#image-modal");

  const openEditModalButton = document.querySelector(".profile__edit-button");
  const openAddModalButton = document.querySelector(".profile__add-button");

  const closeEditModalButton = editModal.querySelector(".modal__close-button");
  const closeAddModalButton = addModal.querySelector(".modal__close-button");
  const closeImageModalButton = document.querySelector("#image-modal-close");

  const profileForm = document.forms["profile-form"];
  const cardForm = document.forms["card-form"];

  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about_me");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");
  const previewImage = document.querySelector("#preview-image");

  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");

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

  function openPopup(popup) {
    popup.style.display = "flex";
    setTimeout(() => {
      popup.classList.add("modal_opened");
    }, 20);
  }

  function closePopup(popup) {
    popup.classList.remove("modal_opened");
    setTimeout(() => {
      popup.style.display = "none";
    }, 600);
  }

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    openPopup(editModal);
  });

  openAddModalButton.addEventListener("click", () => {
    openPopup(addModal);
  });

  closeEditModalButton.addEventListener("click", () => {
    closePopup(editModal);
  });

  closeAddModalButton.addEventListener("click", () => {
    closePopup(addModal);
  });

  closeImageModalButton.addEventListener("click", () => {
    closePopup(imageModal);
  });

  function getCardElement(data) {
    const cardElement = template.content.cloneNode(true).firstElementChild;

    const image = cardElement.querySelector(".cards__image");
    const title = cardElement.querySelector(".cards__title");
    const deleteButton = cardElement.querySelector(".cards__delete-button");
    const heartButton = cardElement.querySelector(".cards__heart");

    image.src = data.link;
    image.alt = data.name;
    title.textContent = data.name;

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      cardElement.remove();
    });

    heartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      heartButton.classList.toggle("cards__heart__active");
    });

    return cardElement;
  }

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  cardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newPlace = {
      name: placeInput.value || "Grand Canyon",
      link: linkInput.value.trim(),
    };

    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);

    // event.target.reset();
    // previewImage.style.display = "none";
    // closePopup(addModal);
  });

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;

    event.target.reset();
    closePopup(editModal);
  });

  cardsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("cards__image")) {
      const modalImage = imageModal.querySelector(".modal__image");
      const modalCaption = imageModal.querySelector(".modal__caption");

      modalImage.src = event.target.src;
      modalImage.alt = event.target.alt;
      modalCaption.textContent = event.target.alt;
      openPopup(imageModal);
    }
  });
});

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}
