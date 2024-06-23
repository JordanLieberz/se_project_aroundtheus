export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    handleDeleteCard
  ) {
    this._name = name;
    this._link = link;
    this.id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this);
        //this._handleLikeIcon();
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
  }

  testMethod() {
    console.log(this.name);
  }

  updateIsLiked(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__title").innerText = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    // set alt text
    // get the card view
    //set event listeners
    // this._cardElement.querySelector("").src = this._link;

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._setEventListeners();
    this._renderLikes();
    return this._cardElement;
  }
}
