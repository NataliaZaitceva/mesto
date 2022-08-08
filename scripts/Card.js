import {
  openPopup,
  popupImageMax,
  picturePopup,
  subtitlePopup,
} from "./index.js";
export class Card {
  constructor(link, name, cardSelector, openPopup) {
    this._link = link;
    this._name = name;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#template__card")
      .content.querySelector("#item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._photo = this._element.querySelector(".gallery__illustration");
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._title = this._element.querySelector(".gallery__title");
    this._title.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _deleteCard(event) {
    this._element.remove(event);
    this._element = null;
  }

  _likeCard() {
    const bthLike = this._element.querySelector(".button_view_like");
    bthLike.classList.toggle("button_view_like-active");
  }

  _openImageMax() {
    picturePopup.src = this._link;
    picturePopup.alt = this._name;
    subtitlePopup.textContent = this._name;
    this._openPopup(popupImageMax);
  }

  _setEventListeners() {
    this._element
      .querySelector(".button_view_trash")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".button_view_like")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._photo.addEventListener("click", () => {
      this._openImageMax();
    });
  }
}
