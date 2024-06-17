import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "96d8d88b-e023-4fc5-b12a-b613f7a6a6e2",
    "Content-Type": "application/json",
  },
});

let section; // undefined

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const card = getCardElement(cardData);
          // create a new card with cardData
          section.addItem(card);
        },
      },
      selector
    );
    section.renderItems();
    // render initial cards here
  })
  .catch((err) => {
    console.error(err);
  });

const userInfo = new UserInfo(
  "#profile-name",
  "#profile-description",
  ".profile__image"
);

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData);
});

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

const ChangeProfilePicture = new PopupWithForm(
  "#profile-picture-modal",
  handleAvatarFormSubmit
);
ChangeProfilePicture.setEventListeners();

const avatarElement = document.querySelector(".profile__avatar-container");

avatarElement.addEventListener("click", () => {
  ChangeProfilePicture.open();
});

const selector = ".cards__list";

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
  api
    .updateUserInfo(values)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // i think you do use this later in the sprint.  Maybe to close the popup?
    });
}

function handleAddCardFormSubmit(values) {
  // {name: '', link: ''}
  api.addCard(values).then((cardData) => {
    const cardNode = getCardElement(cardData);
    section.addItem(cardNode);
    addCardPopup.close();
  });
}
function handleAvatarFormSubmit(values) {
  api.updateAvatarPhoto(values).then((userData) => {
    userInfo.setAvatar(userData.avatar);
    ChangeProfilePicture.close();
  });
}

profileEditButton.addEventListener("click", () => {
  const values = userInfo.getUserInfo();
  profileNameInput.value = values.name;
  profileDescriptionInput.value = values.about;
  profileEditFormValidator.toggleButtonState();
  editProfilePopup.open();
});

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
