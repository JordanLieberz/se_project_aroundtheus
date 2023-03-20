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
const addCardModal = document.querySelector("#profile-add-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-close-button"
);
const profileNameInput = document.querySelector("#name-input");
const profileName = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#about-me");
const profileDescription = document.querySelector("#profile-description");
const saveButton = document.querySelector("#save-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".card__list");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
//  function openModal() {
//   profileNameInput.value = profileName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent.trim();
//    profileEditModal.classList.add("modal_opened");
// }
function openModal(modal) {
  modal.classList.add("modal_opened");
}
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

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

initialCards.forEach((data) => {
  cardsWrap.prepend(getCardElement(data));
});
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
