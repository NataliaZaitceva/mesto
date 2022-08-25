
export class FormValidator {
  constructor(settings, formPopup) {
    this._formElement = formPopup;
    (this._formSelector = settings.formSelector),
      (this._inputSelector = settings.inputSelector),
      (this._inputList = settings.formList);
    (this._submitButtonSelector = settings.submitButtonSelector),
      (this._inactiveButtonClass = settings.inactiveButtonClass),
      (this._inputErrorClass = settings.inputErrorClass),
      (this._errorClass = settings.errorClass);
      this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError = (inputsEdit, errorMessage) => {
    //показать инпут с ошибкой

    const formError = this._formElement.querySelector(
      `#${inputsEdit.id}-error`
    );
    inputsEdit.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
  };
  _hideInputError(inputsEdit) {
    //скрыть инпут с ошибкой, если ее нет
    const formError = this._formElement.querySelector(
      `#${inputsEdit.id}-error`
    );
    inputsEdit.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = "";
  };
  _checkInputValidity = (inputsEdit) => {
    //сообщения об ошибке
    if (!inputsEdit.validity.valid) {
      this._showInputError(inputsEdit, inputsEdit.validationMessage);
    } else {
      this._hideInputError(inputsEdit);
    }
  };

  _hasInvalidInput() {
    //валидность импута
    return this._inputList.some((inputsEdit) => {
      return !inputsEdit.validity.valid;
    });
  }

  switchButton() {
    //деактивированный вид кнопки

    
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }
  _setEventListeners() {
    //слушатели

   /* const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );*/
    this.switchButton();

    this._inputList.forEach((inputsEdit) => {
      inputsEdit.addEventListener("input", () => {
        this._checkInputValidity(inputsEdit);

        this.switchButton();
      });
    });
  }

  enableValidation() {
    //валидация формы
    this._setEventListeners();
    /* const formList = Array.from(document.querySelectorAll(this._formSelector));

    this._formList.forEach((formPopup) => {
        this._hideInputError(formPopup)
        });*/
  }
}
