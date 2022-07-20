const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_view_submit',
    inactiveButtonClass: 'button_view_submit-invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
}

const showInputError = (formPopup, inputsEdit, errorMessage, settings) => {//показать инпут с ошибкой
    const formError = formPopup.querySelector(`#${inputsEdit.id}-error`);
    inputsEdit.classList.add(settings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(settings.errorClass);
}

const hideInputError = (formPopup, inputsEdit, settings) => { //скрыть инпут с ошибкой, если ее нет
    const formError = formPopup.querySelector(`#${inputsEdit.id}-error`);
    inputsEdit.classList.remove(settings.inputErrorClass);
    formError.classList.remove(settings.errorClass);
    formError.textContent = '';
}

const checkInputValidity = (formPopup, inputsEdit, settings) => {  //сообщения об ошибке
    if (inputsEdit.validity.valid) {
        hideInputError(formPopup, inputsEdit, settings);
    } else {
        showInputError(formPopup, inputsEdit, inputsEdit.validationMessage, settings);
    }
}

function hasInvalidInput(inputList) { //валидность импута
    return inputList.some(inputsEdit => {
        return !inputsEdit.validity.valid;
    });
}

function switchButton(inputList, submitButton, settings) { //деактивированный вид кнопки

    if (hasInvalidInput(inputList)) {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add(settings.inactiveButtonClass);

    } else {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove(settings.inactiveButtonClass);
    }
}

const setEventListeners = (formPopup, settings) => { //слушатели

    const inputList = Array.from(formPopup.querySelectorAll(settings.inputSelector));

    const submitButton = formPopup.querySelector(settings.submitButtonSelector);
    switchButton(inputList, submitButton, settings);

    inputList.forEach((inputsEdit) => {
        inputsEdit.addEventListener('input', () => {
            checkInputValidity(formPopup, inputsEdit, settings)

            switchButton(inputList, submitButton, settings);
        });

    });
}


const enableValidation = (settings) => { //валидация формы

    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formPopup) => {
        formPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formPopup, settings);

    });
}
