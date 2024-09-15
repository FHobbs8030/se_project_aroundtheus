const cardData1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const cardData2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

const cardData3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

const cardData4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

const cardData5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

const cardData6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

const initialCards = [
  cardData1,
  cardData2,
  cardData3,
  cardData4,
  cardData5,
  cardData6,
];

console.log(initialCards);

document.addEventListener("DOMContentLoaded", () => {
  const editModal = document.querySelector("#edit-modal");
  const openEditModalButton = document.querySelector(".profile__edit-button");
  const closeEditModalButton = editModal.querySelector(".modal__close-button");

  openEditModalButton.addEventListener("click", () => {
    editModal.classList.add("modal_opened");
  });

  closeEditModalButton.addEventListener("click", () => {
    editModal.classList.remove("modal_opened");
  });

  const addModal = document.querySelector("#add-modal");
  const openAddModalButton = document.querySelector(".profile__add-button");
  const closeAddModalButton = addModal.querySelector(".modal__close-button");

  openAddModalButton.addEventListener("click", () => {
    addModal.classList.add("modal_opened");
  });

  closeAddModalButton.addEventListener("click", () => {
    addModal.classList.remove("modal_opened");
  });

  window.addEventListener("click", (event) => {
    if (event.target === editModal) {
      editModal.classList.remove("modal_opened");
    }
    if (event.target === addModal) {
      addModal.classList.remove("modal_opened");
    }
  });
});
