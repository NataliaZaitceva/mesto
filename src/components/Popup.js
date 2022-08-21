export class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector);
        this._btnClose = this._popupElement.querySelector(".button_view_close");
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popupElement.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose);
        //this.setEventListeners;
        }

    close(){
     this._popupElement.classList.remove("popup_opened");
document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt){
if (evt.key === "Escape"){
    this.close();
}
    }


    setEventListeners(){

    /*this._btnClose.addEventListener("click", () => 
            this.close()
        );*/
        /*this._btnClose.addEventListener('click', () =>         
                this.close())
            }*/

            this._btnClose.addEventListener('click', () => {
                this.close();
              });
              this._popupElement.addEventListener('mousedown', (event) => {
                if (event.target.classList.contains('popup_opened')) {
                  this.close();
                }
              });
            }
          }