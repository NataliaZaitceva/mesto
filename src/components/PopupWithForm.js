import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);

    this._handleSubmit = handleSubmit;
    console.log(this._handleSubmit);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputsList = this._form.querySelectorAll(".popup__input");
    // console.log (this._inputsList)
    //this._popup = document.querySelector(popupSelector);
    this._btnSubmit = this._form.querySelector(".button_view_submit");
    this._btnSaveText = this._btnSubmit.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(isLoading) {
    if (isLoading) {
      this._btnSubmit.textContent = "Сохранение...";
    } else {
      this._btnSubmit.textContent = this._btnSaveText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());

      this.close();
    });
  }

  /*open(){
    this._form._getInputValues();
    }*/
}