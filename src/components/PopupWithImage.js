import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = document.querySelector(".modal__image");
    this.popupCaption = document.querySelector(".modal__caption");
  }
  open(data) {
    this.popupCaption.textContent = data.name;
    this.popupImage.src = data.link;
    this.popupImage.alt = data.name;
    super.open();
  }
}
