export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.removeEventListener("keyup", this.handleEscClose);
    this._popupElement.addEventListener("mousedown", handleOverlayClick);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this.handleEscClose);
    this._popupElement.removeEventListener("mousedown", handleOverlayClick);
  }

  handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventlisteners() {
    // set event listeners
  }
}
