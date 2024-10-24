document.addEventListener("DOMContentLoaded", () => {
  // Helper functions
  function openPopup(popup) {
    popup.classList.add("modal_opened");
  }

  function closePopup(popup) {
    popup.classList.remove("modal_opened");
  }

  // Close button handling
  const closeButtons = document.querySelectorAll(".modal__close-button");
  closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closePopup(popup));
  });

  const profileForm = document.forms["profile-form"];
  const cardForm = document.forms["card-form"];
  const cardsContainer = document.querySelector("#cards-container");
  const template = document.querySelector("#card-template");
  const profileName = document.querySelector(".profile__name");
  const profileAboutMe = document.querySelector(".profile__about_me");
  const nameInput = document.querySelector("#name");
  const aboutMeInput = document.querySelector("#about_me");
  const placeInput = document.querySelector("#place");
  const linkInput = document.querySelector("#link");
  const previewImage = document.querySelector("#preview-image");
  const editModal = document.querySelector("#edit-modal");
  const addModal = document.querySelector("#add-modal");
  const imageModal = document.querySelector("#image-modal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  // Ensure cardsContainer and template are found in the DOM
  if (!cardsContainer || !template) {
    console.error("Cards container or template not found in the DOM.");
    return;
  }

  // URL input validation for preview
  linkInput.addEventListener("input", (event) => {
    const url = event.target.value.trim();
    if (isValidUrl(url)) {
      previewImage.src = url;
      previewImage.classList.add("modal__image-preview-img_visible");
    } else {
      previewImage.classList.remove("modal__image-preview-img_visible");
    }
  });

  // Function to create card element
  function getCardElement(data) {
    const cardElement = template.content.cloneNode(true).firstElementChild;

    const image = cardElement.querySelector(".cards__image");
    const title = cardElement.querySelector(".cards__title");
    const deleteButton = cardElement.querySelector(".cards__delete-button");
    const heartButton = cardElement.querySelector(".cards__heart");

    image.src = data.link;
    image.alt = data.name;
    title.textContent = data.name;

    console.log("Creating card:", data);
    console.log("Image source:", image.src);

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("Delete button clicked");
      cardElement.remove();
    });

    heartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("Heart button clicked");
      heartButton.classList.toggle("cards__heart__active");
    });

    return cardElement;
  }

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

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    console.log(cardElement);
    cardsContainer.appendChild(cardElement);
  });

  // Add card form submission
  cardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newPlace = {
      name: placeInput.value || "Grand Canyon",
      link: linkInput.value.trim(),
    };

    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);

    event.target.reset();
    previewImage.style.display = "none";
    closePopup(addModal);
  });

  // Profile edit form submission
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;

    event.target.reset();
    closePopup(editModal);
  });

  // Image modal setup
  cardsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("cards__image")) {
      modalImage.src = event.target.src;
      modalImage.alt = event.target.alt;
      modalCaption.textContent = event.target.alt;
      openPopup(imageModal);
    }
  });

  // Close image modal
  document.querySelector("#image-modal-close").addEventListener("click", () => {
    closePopup(imageModal);
  });

  // Open profile edit modal
  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", () => {
      nameInput.value = profileName.textContent;
      aboutMeInput.value = profileAboutMe.textContent;
      openPopup(editModal);
    });

  // Open add card modal
  document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => {
      openPopup(addModal);
    });
});

// Helper function to check if a URL is valid
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   function openPopup(popup) {
//     popup.classList.add("modal_opened");
//   }

//   function closePopup(popup) {
//     popup.classList.remove("modal_opened");
//   }

//   const closeButtons = document.querySelectorAll(".modal__close-button");
//   closeButtons.forEach((button) => {
//     const popup = button.closest(".modal");
//     button.addEventListener("click", () => closePopup(popup));
//   });

//   const profileForm = document.forms["profile-form"];
//   const cardForm = document.forms["card-form"];
//   const cardsContainer = document.querySelector("#cards-container");
//   const template = document.querySelector("#card-template");
//   const profileName = document.querySelector(".profile__name");
//   const profileAboutMe = document.querySelector(".profile__about_me");
//   const nameInput = document.querySelector("#name");
//   const aboutMeInput = document.querySelector("#about_me");
//   const placeInput = document.querySelector("#place");
//   const linkInput = document.querySelector("#link");
//   const previewImage = document.querySelector("#preview-image");
//   const editModal = document.querySelector("#edit-modal");
//   const addModal = document.querySelector("#add-modal");
//   const imageModal = document.querySelector("#image-modal");
//   const modalImage = imageModal.querySelector(".modal__image");
//   const modalCaption = imageModal.querySelector(".modal__caption");

//   if (!cardsContainer || !template) {
//     console.error("Cards container or template not found in the DOM.");
//     return;
//   }

//   linkInput.addEventListener("input", (event) => {
//     const url = event.target.value.trim();
//     if (isValidUrl(url)) {
//       previewImage.src = url;
//       previewImage.classList.add("modal__image-preview-img_visible");
//     } else {
//       previewImage.classList.remove("modal__image-preview-img_visible");
//     }
//   });

//   function getCardElement(data) {
//     const cardElement = template.content.cloneNode(true).firstElementChild;

//     const image = cardElement.querySelector(".cards__image");
//     const title = cardElement.querySelector(".cards__title");
//     const deleteButton = cardElement.querySelector(".cards__delete-button");
//     const heartButton = cardElement.querySelector(".cards__heart");

//     image.src = data.link;
//     image.alt = data.name;
//     title.textContent = data.name;

//     console.log("Creating card:", data);
//     console.log("Image source:", image.src);

//     deleteButton.addEventListener("click", (event) => {
//       event.stopPropagation();
//       console.log("Delete button clicked");
//       cardElement.remove();
//     });

//     heartButton.addEventListener("click", (event) => {
//       event.stopPropagation();
//       console.log("Heart button clicked");
//       heartButton.classList.toggle("cards__heart__active");
//     });

//     return cardElement;
//   }

//   const initialCards = [
//     {
//       name: "Yosemite Valley",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//     },
//     {
//       name: "Lake Louise",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//     },
//     {
//       name: "Bald Mountains",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//     },
//     {
//       name: "Latemar",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//     },
//     {
//       name: "Vanoise National Park",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//     },
//     {
//       name: "Lago di Braies",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//     },
//   ];

//   initialCards.forEach((cardData) => {
//     const cardElement = getCardElement(cardData);
//     console.log(cardElement);
//     cardsContainer.appendChild(cardElement);
//   });

//   cardForm.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const newPlace = {
//       name: placeInput.value || "Grand Canyon",
//       link: linkInput.value.trim(),
//     };

//     const newCardElement = getCardElement(newPlace);
//     cardsContainer.prepend(newCardElement);

//     event.target.reset();
//     previewImage.style.display = "none";
//     closePopup(addModal);
//   });

//   profileForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     profileName.textContent = nameInput.value;
//     profileAboutMe.textContent = aboutMeInput.value;

//     event.target.reset();
//     closePopup(editModal);
//   });

//   document
//     .querySelector(".profile__edit-button")
//     .addEventListener("click", () => {
//       nameInput.value = profileName.textContent;
//       aboutMeInput.value = profileAboutMe.textContent;
//       openPopup(editModal);
//     });

//   document
//     .querySelector(".profile__add-button")
//     .addEventListener("click", () => {
//       openPopup(addModal);
//     });

//   cardsContainer.addEventListener("click", (event) => {
//     if (event.target.classList.contains("cards__image")) {
//       modalImage.src = event.target.src;
//       modalImage.alt = event.target.alt;
//       modalCaption.textContent = event.target.alt;
//       openPopup(imageModal);
//     }
//   });

//   document.querySelector("#image-modal-close").addEventListener("click", () => {
//     console.log("Image modal close button clicked");
//     closePopup(imageModal);
//   });

//   linkInput.addEventListener("input", (event) => {
//     const url = event.target.value.trim();
//     if (isValidUrl(url)) {
//       previewImage.src = url;
//       previewImage.classList.add("modal__image-preview-img_visible");
//     } else {
//       previewImage.classList.remove("modal__image-preview-img_visible");
//     }
//   });
// });

// function isValidUrl(string) {
//   try {
//     new URL(string);
//     return true;
//   } catch {
//     return false;
//   }
// }
