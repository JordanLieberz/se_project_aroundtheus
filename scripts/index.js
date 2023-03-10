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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg  ",
  },
];
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileNameInput = document.querySelector("#name-input");
const profileName = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#about-me");
const profileDescription = document.querySelector("#profile-description");
const saveButton = document.querySelector("#save-button");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".card__list");

function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp();
}
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", closePopUp);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}
const cardsWrap = document.querySelector(".cards__list");
for (let i = 0; i < initialCards.length; i++) {
  cardsWrap.prepend(getCardElement(initialCards[i]));
}
let description = document.getElementById("profile-description");
description.innerHTML = description.innerHTML.trim();
