document.addEventListener("DOMContentLoaded", () => {
  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  const cardsContainer = document.querySelector("#cards-container");
  cardsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("cards__image")) {
      modalImage.src = event.target.src;
      modalImage.alt = event.target.alt || "";
      modalCaption.textContent = event.target.alt || "";

      openPopup(imageModal);
    }
  });

  const template = document.querySelector("#card-template");
  const editModal = document.querySelector("#edit-modal");
  const addModal = document.querySelector("#add-modal");

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

  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");

  const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
      alt: "Yosemite Valley",
    },
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
      alt: "Lake Louise",
    },
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
      alt: "Bald Mountains",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
      alt: "Latemar",
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
      alt: "Vanoise National Park",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
      alt: "Lago di Braies",
    },
  ];

  function openPopup(popup) {
    popup.classList.remove("modal_hidden");
    popup.classList.add("modal_open");
  }

  function closePopup(popup) {
    popup.classList.remove("modal_open");
    popup.classList.add("modal_hidden");
  }

  closeEditModalButton.addEventListener("click", () => {
    closePopup(editModal);
  });

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    openPopup(editModal);
  });

  closeAddModalButton.addEventListener("click", () => {
    placeInput.value = "";
    linkInput.value = "";
    closePopup(addModal);
  });

  openAddModalButton.addEventListener("click", () => {
    placeInput.value = "";
    linkInput.value = "";
    openPopup(addModal);
  });

  closeImageModalButton.addEventListener("click", () => {
    modalImage.src = "";
    modalImage.alt = "";
    modalCaption.textContent = "";
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

  cardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const link = linkInput.value.trim();
    if (!isValidUrl(link)) {
      alert("Please enter a valid URL.");
      return;
    }

    const newPlace = {
      name: placeInput.value || "Grand Canyon",
      link: link,
    };

    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);

    placeInput.value = "";
    linkInput.value = "";
  });

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;

    event.target.reset();
    closePopup(editModal);
  });

  function isValidUrl(string) {
    const pattern =
      /^(https?:\/\/|\/|\.\/|\.\.\/)?[\w\-]+(\.[\w\-]+)*(\.[a-z]+)?(\/[\w\-./?%&=]*)?$/i;
    return pattern.test(string);
  }
});
