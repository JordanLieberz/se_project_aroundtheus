export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.removeEventListener("keyup", this.handleEscClose);
    this._popupElement.addEventListener("mousedown", this.handleOverlayClick);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this.handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this.handleOverlayClick
    );
  }

  handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      this.closeModal(e.target);
    }
  };
}
