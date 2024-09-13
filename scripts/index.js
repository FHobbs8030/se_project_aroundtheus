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
  const modal = document.querySelector(".modal");
  const openModalButton = document.querySelector(".profile__edit-button");
  const closeModalButton = document.querySelector(".modal__close-button");

  // Open modal when clicking on edit button
  openModalButton.addEventListener("click", () => {
    modal.classList.add("modal_opened");
  });

  // Close modal when clicking on the close button
  closeModalButton.addEventListener("click", () => {
    modal.classList.remove("modal_opened");
  });
});
