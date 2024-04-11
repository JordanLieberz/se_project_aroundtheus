import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      this._handleFormSubmit(); // here we need to passs arguments (from form)
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

// const newCardPopup = new PopupWithForm("#card-add-modal", () => {});

// newCardPopup.open() {

// };

// newCardPopup.close();
