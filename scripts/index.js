const profileeditbutton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')

profileeditbutton.addEventListener('click', (Event) => {
    popup.classList.add('popup_opened')
})

const closebutton = document.querySelector('.popup__close')

closebutton.addEventListener('click', (Event) => {
    popup.classList.remove('popup_opened')
})

const popupSave = document.querySelector('.popup__submit')

let formElement = document.querySelector('.popup__form')
let profileInfo = document.querySelector('.profile__info')

let nameInput = formElement.querySelector('.popup__text_description_name')
let jobInput = formElement.querySelector('.popup__text_description_profession')
let profileName = profileInfo.querySelector('.profile__name');
let profileProfession = profileInfo.querySelector('.profile__subtitle')

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
