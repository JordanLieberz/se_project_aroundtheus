export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const profileEditButton = document.querySelector("#profile-edit-button");
export const addCardModal = document.querySelector("#card-add-modal");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
export const addCardModalCloseButton =
  addCardModal.querySelector(".modal__close");
export const profileNameInput = document.querySelector("#name-input");
export const profileName = document.querySelector("#profile-name");
export const profileDescriptionInput = document.querySelector("#about-me");
export const profileDescription = document.querySelector(
  "#profile-description"
);
export const saveButton = document.querySelector("#modal-save-button");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
export const cardListEl = document.querySelector(".card__list");
export const viewImageCloseButton =
  document.querySelector("#image-modal-close");
export const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
export const cardUrlInput = addCardFormElement.querySelector(
  ".modal__input_type_url"
);
export const profileSubmitButton = document.querySelector(
  "#profile-save-button"
);
export const wrapper = document.querySelector(".cards__list");

export const selector = ".cards__list";
export const avatarElement = document.querySelector(".profile__image");
