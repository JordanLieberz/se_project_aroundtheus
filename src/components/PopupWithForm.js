import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.queryselector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

const newCardPopup = new PopupWithForm("#card-add-modal", () => {});
newCardPopup.open();

newCardPopup.close();
