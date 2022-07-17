const validationObject = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.button_view_submit',
        inactiveButtonClass: 'button_view_submit-invalid', 
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error'
    }
    

const showInputError = (formPopup, inputEdit, errorMessage, settings) => {//показать инпут с ошибкой
    const formError = formPopup.querySelector(`#${inputEdit.id}-error`);
    inputEdit.classList.add(settings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(settings.errorClass);
  };

  const hideInputError = (formPopup, inputEdit, settings) => { //скрыть инпут с ошибкой, если ее нет
    const formError = formPopup.querySelector(`#${inputEdit.id}-error`);
   inputEdit.classList.remove(settings.inputErrorClass);
   formError.classList.remove(settings.errorClass);
   formError.textContent = '';
  };
  
  const checkInputValidity = (formPopup, inputEdit, settings) => {  //сообщения об ошибке
    if(inputEdit.validity.valid){
        hideInputError(formPopup, inputEdit, settings);
    } else {
        showInputError(formPopup, inputEdit, inputEdit.validationMessage, settings);
    }
  };

function hasInvalidInput(inputList) { //валидность импута
    return inputList.some(inputEdit => {
        return !inputEdit.validity.valid;
    });
};

function switchButton(inputList, submitButton, settings){ //деактивированный вид кнопки
    
    if(hasInvalidInput(inputList)){
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add(settings.inactiveButtonClass);


    } else {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove(settings.inactiveButtonClass);
    }
};

const setEventListeners = (formPopup, settings) => { //слушатели

    const inputList = Array.from(formPopup.querySelectorAll('.popup__input'));

     const submitButton = formPopup.querySelector('.button_view_submit');
     switchButton(inputList, submitButton, settings);
     
     inputList.forEach((inputEdit) => {
        inputEdit.addEventListener('input', () => {
            checkInputValidity (formPopup, inputEdit, settings)

            switchButton(inputList, submitButton, settings);
        });
    
     });
};

const enableValidation = (settings) => { //валидация формы

    const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
    formList.forEach((formPopup) => {
      formPopup.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
      setEventListeners(formPopup, settings);
    });
  };

   
