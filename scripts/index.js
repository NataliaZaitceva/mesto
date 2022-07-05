const profileEditButton = document.querySelector('.button_view_edit');
const popup = document.querySelector('.popup');
const editPopup = document.querySelector('#popupeditprofile');

profileEditButton.addEventListener('click', () => {openPopup(editPopup)});

function openPopup(popup){
    popup.classList.add('popup_opened');
};

const closeButtons = document.querySelectorAll('.button_view_close')

closeButtons.forEach((closeButtons) => {
    const popup = closeButtons.closest('.popup');
    closeButtons.addEventListener('click', () => closePopup(popup));
});

                  
function closePopup(popup){
    popup.classList.remove('popup_opened')
};

const formElement = document.querySelector('.popup__form')
const profileInfo = document.querySelector('.profile__info')
const jobInput = formElement.querySelector('.popup__input_description_profession')
const nameInput = formElement.querySelector('.popup__input_description_name')
const profileName = profileInfo.querySelector('.profile__name');
const profileProfession = profileInfo.querySelector('.profile__subtitle');



function openEditPopup(event) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
    openPopup(editPopup);
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popup);
}

formElement.addEventListener('submit', formSubmitHandler);

const formGalleryElement = document.querySelector('.popup__gallery-form');

const itemInput = document.querySelector('.gallery__item');
const placeInput = formGalleryElement.querySelector('.popup__capture');
const galleryDescription = document.querySelector('.gallery__description');



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const itemTemplate = document.querySelector('.template__card').content;
const itemElement = itemTemplate.querySelector('.gallery__item');

const title = document.querySelector('.gallery__title');
const photoGallery = document.querySelector('.gallery__illustration');

const list = document.querySelector('.gallery');
const formButton = document.querySelector('addProfileForm')
const formInput = document.querySelector('.popup__photo-container')
const link = document.querySelector('.popup__input_description_link');
const photoName = document.querySelector('.popup__input_description_place');
const photoDescription = document.querySelector('.gallery__description');
const popupImageMax = document.querySelector('.popup_image_max');
const picturePopup = document.querySelector('.popup__image');
const subtitlePopup = document.querySelector('.popup__subtitle');

function createCard(place) {
    const htmlElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);
    htmlElement.querySelector('.gallery__title').textContent = place.name;
    htmlElement.querySelector('.gallery__illustration').src = place.link;
    htmlElement.querySelector('.gallery__illustration').alt = place.name;
    htmlElement.querySelector('.button_view_like').addEventListener('click' , function (evt){
    evt.target.classList.toggle('button_view_like-active');
});
    htmlElement.querySelector('.button_view_trash').addEventListener('click', function (evt){
 htmlElement.remove();
});
    htmlElement.querySelector('.gallery__illustration').addEventListener('click', () => {openPopup(popupImageMax);
        picturePopup.src = place.link;
        subtitlePopup.textContent = place.name;
        picturePopup.alt = place.name});
    return htmlElement;
};


function renderCard(place){
    list.prepend(createCard(place));
};
  
function renderItems(){
    initialCards.forEach(renderCard); 
     };


const addButton = document.querySelector('.button_view_add');
const galleryName = document.querySelector('.gallery__title');
const popupAdd = document.querySelector('#popupaddphoto')

addButton.addEventListener('click', () => {openPopup(popupAdd)});

function gallerySubmitHandler(evt){
   evt.preventDefault();
  renderCard({name: photoName.value, link: link.value});  
   closePopup(popupAdd);
 
}

 formGalleryElement.addEventListener('submit', gallerySubmitHandler);
    
renderItems();