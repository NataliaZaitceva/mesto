const profileeditbutton = document.querySelector('.button_profile_edit')
const popup = document.querySelector('.popup')

profileeditbutton.addEventListener('click', openPopup);

function openPopup(event){
    popup.classList.add('popup_opened')
}

const closeButton = document.querySelector('.button_popup_close')

function closePopup(event){
    popup.classList.remove('popup_opened')
}

closeButton.addEventListener('click', closePopup)
    

let formElement = document.querySelector('.popup__form')
let profileInfo = document.querySelector('.profile__info')
let popupButtonSave = document.querySelector('.button_popup_submit')

function closePopup(event){ 
    popup.classList.remove('popup_opened')
}

function popupSave(event){
 popupButtonSave.addEventListener('click', function
closePopup(event){ 
    popup.classList.remove('popup_opened')
})     
}

popupButtonSave.addEventListener('click', closePopup);

let nameInput = formElement.querySelector('.popup__input_description_name')
let jobInput = formElement.querySelector('.popup__input_description_profession')
let profileName = profileInfo.querySelector('.profile__name');
let profileProfession = profileInfo.querySelector('.profile__subtitle')

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
 function closePopup(event){ 
    popup.classList.remove('popup_opened')
}   
}


formElement.addEventListener('submit', formSubmitHandler);

