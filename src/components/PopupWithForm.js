import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor({popupSelector, handleSubmit}){
        super(popupSelector);
        this._form = this._popupElement.querySelector('.popup__form')
 //this._popup = document.querySelector(popupSelector);
        this._handleSubmit = handleSubmit;
        this._inputsList = this._form.querySelectorAll(".popup__input");
       
    }
    close(){
        super.close();
        this._form.reset();
    }
     _getInputValues(){
        this._formValues = {};
        this._inputsList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
     }

     setEventListeners = () => {
        super.setEventListeners();
       this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues()) 
            this.close();
        })
     }
   /* open(){
    super.open();
    this._form._getInputValues();
    }*/
}