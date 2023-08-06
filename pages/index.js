import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const modal = document.querySelector(".modal");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const profileEditButton = document.querySelector("#profile-edit-button");
const addCardModal = document.querySelector("#card-add-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileNameInput = document.querySelector("#name-input");
const profileName = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#about-me");
const profileDescription = document.querySelector("#profile-description");
const saveButton = document.querySelector("#modal-save-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".card__list");
const viewImageCloseButton = document.querySelector("#image-modal-close");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const profileSubmitButton = document.querySelector("#profile-save-button");
const wrapper = document.querySelector(".cards__list");

const cardFormValidator = new FormValidator(config, addCardFormElement);
cardFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleClose);
  modal.removeEventListener("mousedown", handleOverlayClick);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

const renderCard = (card) => {
  wrapper.prepend(card);
};

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  const cardNode = getCardElement({ name, link });
  renderCard(cardNode);
  closeModal(addCardModal);
  e.target.reset();

  const submitButton = addCardModal.querySelector(".modal__submit-button");
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.disabled = true;
  cardFormValidator.toggleButtonState();
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleClose);
  modal.addEventListener("mousedown", handleOverlayClick);
}
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditFormValidator.toggleButtonState();
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

const popupImage = document.querySelector(".modal__image");
const popupCaption = document.querySelector(".modal__caption");
const previewPopupNode = document.getElementById("view-image-modal");

function handleCardClick(data) {
  popupCaption.textContent = data.name;
  popupImage.src = data.link;
  popupImage.alt = data.name;
  openModal(previewPopupNode);
}
viewImageCloseButton.addEventListener("click", () =>
  closeModal(previewPopupNode)
);

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function getCardElement(data) {
  const card = new Card(data, "#card-template", handleCardClick);

  return card.getView();
}
const cardsWrap = document.querySelector(".cards__list");

initialCards.forEach((data) => {
  const cardNode = getCardElement(data);

  renderCard(cardNode);
});

addNewCardButton.addEventListener("click", () => {
  // TODO: here we need to find the add card modal form and erase it;
  openModal(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

function handleOverlayClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
}

function handleClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closeModal(openedPopup);
  }
}
