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
  const imagePath = "./images/card-images/grand-canyon.jpg";
  document.querySelector("#preview-image").src = imagePath;


  // Listen for input events on the link field
  linkInput.addEventListener("input", (event) => {
    const url = event.target.value.trim();

    // Validate and update the preview image
    if (isValidUrl(url)) {
      previewImage.src = url;
      previewImage.style.display = "block"; // Show the image
    } else {
      previewImage.style.display = "none"; // Hide the image if invalid URL
    }
  });

  // Helper function to validate URLs
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
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
      const card = deleteButton.closest(".cards__card");
      card.remove();
    });

    heartButton.addEventListener("click", () => {
      console.log("Heart clicked!"); // Debugging log
      if (heartImage.src.includes("heart.svg")) {
        heartImage.src = "./images/black_heart.svg"; // Change to black heart
      } else {
        heartImage.src = "./images/heart.svg"; // Revert to regular heart
      }
    });

    return cardElement;
  }

  // Render initial cards
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });

  openEditModalButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    editModal.classList.add("modal_opened");
  });

  closeEditModalButton.addEventListener("click", () => {
    editModal.classList.remove("modal_opened");
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
    editModal.classList.remove("modal_opened");
  });

  openAddModalButton.addEventListener("click", () => {
    addModal.classList.add("modal_opened");
  });

  closeAddModalButton.addEventListener("click", () => {
    addModal.classList.remove("modal_opened");
  });

  // Add form submit logic
  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let imagePath = linkInput.value.trim();

    // Handle local path conversion to a valid URL format
    if (!imagePath.startsWith("http") && !imagePath.startsWith("https")) {
      imagePath = `${window.location.origin}/${imagePath.replace("./", "")}`;
      console.log(`Converted local path to URL: ${imagePath}`);
    }

    const newPlace = {
      name: placeInput.value || "Grand Canyon",
      link: imagePath,
    };

    // Generate the new card and add it to the container
    const newCardElement = getCardElement(newPlace);
    cardsContainer.prepend(newCardElement);

    // Reset the form inputs and hide the preview image
    placeInput.value = "";
    linkInput.value = "";
    previewImage.style.display = "none";
    addModal.classList.remove("modal_opened");
  });
});
