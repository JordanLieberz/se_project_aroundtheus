import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__submit-button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // Here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }
  setSubmitAction(handleFormSubmit) {
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
    const inputValues = {};
    this._inputList.forEach((inputEl) => {
      inputValues[inputEl.name] = inputEl.value;
    });
    return inputValues;
  }
  close() {
    this._popupForm.reset();
    super.close();
  }

  setLoading(isLoading, loadingMessage = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingMessage;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}

// const newCardPopup = new PopupWithForm("#card-add-modal", () => {});

// newCardPopup.open() {

// };

// newCardPopup.close();
