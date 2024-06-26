import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import {
  config,
  profileEditButton,
  addCardModal,
  profileEditModal,
  profileModalCloseButton,
  addCardModalCloseButton,
  profileNameInput,
  profileName,
  profileDescriptionInput,
  profileDescription,
  saveButton,
  addNewCardButton,
  profileEditForm,
  addCardFormElement,
  cardListEl,
  viewImageCloseButton,
  cardTitleInput,
  cardUrlInput,
  profileSubmitButton,
  wrapper,
  avatarElement,
  selector,
} from "../../utils/constants.js";

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

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => {
    console.log(err);
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

const changeProfilePicture = new PopupWithForm(
  "#profile-picture-modal",
  handleAvatarFormSubmit
);
changeProfilePicture.setEventListeners();

const deletePopup = new PopupWithForm("#delete-popup");
deletePopup.setEventListeners();

avatarElement.addEventListener("click", () => {
  changeProfilePicture.open();
});

const cardFormValidator = new FormValidator(config, addCardFormElement);
cardFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

// const avatarFormValidator = new FormValidator(config, changeProfilePicture);
// avatarFormValidator.enableValidation();

function handleProfileEditSubmit(values) {
  // change text to 'saving...'
  editProfilePopup.setLoading(true);
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
      // change text to default
      editProfilePopup.setLoading(false);
      // i think you do use this later in the sprint.  Maybe to close the popup?
    });
}

function handleAddCardFormSubmit(values) {
  addCardPopup.setLoading(true);
  api
    .addCard(values)
    .then((cardData) => {
      const cardNode = getCardElement(cardData);
      section.addItem(cardNode);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // change text to default
      addCardPopup.setLoading(false);
      // i think you do use this later in the sprint.  Maybe to close the popup?
    });
}
function handleAvatarFormSubmit(values) {
  changeProfilePicture.setLoading(true);
  api
    .updateAvatarPhoto(values)
    .then((userData) => {
      userInfo.setAvatar(userData.avatar);
      changeProfilePicture.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeProfilePicture.setLoading(false);
    });
}

profileEditButton.addEventListener("click", () => {
  const values = userInfo.getUserInfo();
  profileNameInput.value = values.name;
  profileDescriptionInput.value = values.about;
  profileEditFormValidator.toggleButtonState();
  editProfilePopup.open();
});

function handleCardClick(data) {
  addImagePopup.open(data);
}

function handleLikeClick(card) {
  api
    .handleLike(card.id, card.isLiked)
    .then((res) => {
      card.updateIsLiked(res.isLiked);
    })
    .catch((err) => {
      console.log(err);
    });
}
function handleDeleteClick(card) {
  deletePopup.open();
  deletePopup.setSubmitAction(() => {
    deletePopup.setLoading(true);
    api
      .handleDeleteCard(card.id)
      .then(() => {
        card.deleteCard();
        deletePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deletePopup.setLoading(false);
      });
  });
}

function getCardElement(data) {
  const card = new Card(
    data,
    "#card-template",
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  );

  return card.getView();
}

addNewCardButton.addEventListener("click", () => {
  cardFormValidator.toggleButtonState();
  addCardPopup.open();
});
