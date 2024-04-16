export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this.handleEscClose);
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
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
  };
}
