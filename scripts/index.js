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

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", (e) => escClose(e, modal));
  modal.removeEventListener("mousedown", handleOverlayClick);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function renderCard(data, wrapper) {
  const cardElement = getCardElement(data);
  wrapper.prepend(cardElement);
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  e.target.reset();
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", (e) => escClose(e, modal));
  modal.addEventListener("mousedown", handleOverlayClick);
}
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  toggleButtonState(
    [profileNameInput, profileDescriptionInput],
    profileSubmitButton,
    options
  );
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
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.addEventListener("click", () => handleCardClick(data));

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", (event) => {
    event.target.closest(".card").remove();
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}
const cardsWrap = document.querySelector(".cards__list");

initialCards.forEach((data) => renderCard(data, cardsWrap));

addNewCardButton.addEventListener("click", () => {
  // TODO: here we need to find the add card modal form and erase it;
  addCardFormElement.reset();
  openModal(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

modal.addEventListener("mousedown", () => {
  handleOverlayClick();
});

modal.removeEventListener("mousedown", () => {
  handleOverlayClick();
});

function handleOverlayClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
}

function escClose(event, modal) {
  if (event.key === "Escape") {
    closeModal(modal);
  }
}
