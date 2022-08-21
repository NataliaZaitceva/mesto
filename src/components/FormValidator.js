
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
  _hideInputError = (inputsEdit) => {
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
    if (inputsEdit.validity.valid) {
      this._hideInputError(inputsEdit);
    } else {
      this._showInputError(inputsEdit, inputsEdit.validationMessage);
    }
  };
  _hasInvalidInput(inputList) {
    //валидность импута
    return inputList.some((inputsEdit) => {
      return !inputsEdit.validity.valid;
    });
  }
  _switchButton(inputList, submitButton) {
    //деактивированный вид кнопки

    if (this._hasInvalidInput(inputList)) {
      submitButton.setAttribute("disabled", true);
      submitButton.classList.add(this._inactiveButtonClass);
    } else {
      submitButton.removeAttribute("disabled");
      submitButton.classList.remove(this._inactiveButtonClass);
    }
  }
  _setEventListeners() {
    //слушатели

    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._switchButton(inputList, submitButton);

    inputList.forEach((inputsEdit) => {
      inputsEdit.addEventListener("input", () => {
        this._checkInputValidity(inputsEdit);

        this._switchButton(inputList, submitButton);
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
