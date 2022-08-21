import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector){
        super(popupSelector);
       // this._form = document.querySelector('.popup__form')
        this._popupPicture = document.querySelector('.popup__image');
        this._popupName = document.querySelector(".popup__subtitle")
    }

    open(link, name){
        this._popupPicture.src = link;
        this._popupPicture.alt = name;
        this._popupName.textContent = name;
        super.open();
    }
}