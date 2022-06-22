const profileeditbutton = document.querySelector('.button_view_edit')
const popup = document.querySelector('.popup')

profileeditbutton.addEventListener('click', openPopup);


const closeButton = document.querySelector('.button_view_close')

function closePopup(event){
    popup.classList.remove('popup_opened')
}

closeButton.addEventListener('click', closePopup)
    

let formElement = document.querySelector('.popup__form')
let profileInfo = document.querySelector('.profile__info')

let nameInput = formElement.querySelector('.popup__input_description_name')
let jobInput = formElement.querySelector('.popup__input_description_profession')
let profileName = profileInfo.querySelector('.profile__name');
let profileProfession = profileInfo.querySelector('.profile__subtitle')

function openPopup(event){
nameInput.value = profileName.textContent;
jobInput.value = profileProfession.textContent;
    popup.classList.add('popup_opened')
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
 closePopup()
}


formElement.addEventListener('submit', formSubmitHandler);

