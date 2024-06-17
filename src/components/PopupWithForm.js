import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(values); // here we need to pass arguments (from form)
    });
  }
  _getInputValues() {
    const inputEls = this._popupForm.querySelectorAll(".modal__input");
    const inputValues = {};
    inputEls.forEach((inputEl) => {
      inputValues[inputEl.name] = inputEl.value;
    });
    return inputValues;
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
