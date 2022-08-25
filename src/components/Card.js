//import { openPopup } from "./index.js"
  
export class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._link = data.link;
    this._name =  data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; 
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector("#item")
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

  /*openImageMax() {
    picturePopup.src = this._link;
    picturePopup.alt = this._name;
    subtitlePopup.textContent = this._name;
    this._openPopup(popupImageMax);
  }*/

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
   this._handleCardClick(this._link, this._name)
  })
  }
}
