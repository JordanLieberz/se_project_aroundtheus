export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._wrapper = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._wrapper.prepend(element);
  }
}

// const selector = ".cards__list";

// const section = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       const card = getCardElement(cardData);
//       // create a new card with cardData
//       section.addItem(card);
//     },
//   },
//   selector
// );

// section.renderItems();
