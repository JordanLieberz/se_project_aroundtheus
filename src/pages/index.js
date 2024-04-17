import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardPopup = new PopupWithForm(
  "#card-add-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const addImagePopup = new PopupWithImage("#view-image-modal");

addImagePopup.setEventListeners();

const userInfo = new UserInfo("#profile-name", "#profile-description");

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
const selector = ".cards__list";

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = getCardElement(cardData);
      // create a new card with cardData
      section.addItem(card);
    },
  },
  selector
);
section.renderItems();

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

function handleProfileEditSubmit(values) {
  userInfo.setUserInfo(values);
  editProfilePopup.close();
}

function handleAddCardFormSubmit(values) {
  const cardNode = getCardElement(values);
  section.addItem(cardNode);
  addCardPopup.close();
}

profileEditButton.addEventListener("click", () => {
  const values = userInfo.getUserInfo();
  profileNameInput.value = values.name;
  profileDescriptionInput.value = values.about;
  profileEditFormValidator.toggleButtonState();
  editProfilePopup.open();
});

profileModalCloseButton.addEventListener("click", () =>
  editProfilePopup.close()
);

const popupImage = document.querySelector(".modal__image");
const popupCaption = document.querySelector(".modal__caption");
const previewPopupNode = document.getElementById("view-image-modal");

function handleCardClick(data) {
  addImagePopup.open(data);
}

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

addNewCardButton.addEventListener("click", () => {
  cardFormValidator.toggleButtonState();
  addCardPopup.open();
});
