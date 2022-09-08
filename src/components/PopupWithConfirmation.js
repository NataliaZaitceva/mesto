import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }, handleDeleteUsersCard) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");

    // this._btnConfirmation = this._popupElement.querySelector('.button__confirmation')
    this._handleDeleteUsersCard = handleDeleteUsersCard;
  }

  submitCallback(removing) {
    this._handleCardSubmit = removing;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("click", (event) => {
      event.preventDefault();
      this._handleCardSubmit();
    });
  }
}
