class Section {
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

// index.js

const selector = "#card__list";

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = getCardElement(cardData);
      // create a new card with cardData
      section.addItem(card);
    },
  },
  selector
);

section.renderItems();

//section.addItem(card)
