const profileeditbutton = document.querySelector('.button_view_edit')
const popup = document.querySelector('.popup')
const editPopup = document.querySelector('#popupeditprofile')

profileeditbutton.addEventListener('click', openEditPopup);

const closeButton = document.querySelectorAll('.button_view_close')

closeButton.forEach(function (closePopup){
    popup.classList.remove('popup_opened')
});

                  
function closePopup (){
    popup.classList.remove('popup_opened')
};

closeButton[0].addEventListener('click', closePopup);
closeButton[1].addEventListener('click', closeAddPopup);
closeButton[2].addEventListener('click', closeImagePopup);

let formElement = document.querySelector('.popup__form')
let profileInfo = document.querySelector('.profile__info')

let nameInput = formElement.querySelector('.popup__input_description_name')
let jobInput = formElement.querySelector('.popup__input_description_profession')
let profileName = profileInfo.querySelector('.profile__name');
let profileProfession = profileInfo.querySelector('.profile__subtitle')




function openEditPopup(event) {
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

let formGalleryElement = document.querySelector('.popup__form_gallery')

let itemInput = document.querySelector('.gallery__item')
let placeInput = formGalleryElement.querySelector('.popup_photo_title')
let galleryDescription = document.querySelector('.gallery__description');



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
const formInput = document.querySelector('.popup__form_gallery')
const link = document.querySelector('.popup__input_description_link');
const photoName = document.querySelector('.popup__input_description_place');
const photoDescription = document.querySelector('.gallery__description');
const popupImageMax = document.querySelector('.popup_image_max');
const picturePopup = document.querySelector('.popup__image');
const subtitlePopup = document.querySelector('.popup__subtitle');

const renderItems = () => {
    initialCards.forEach(renderItem);
}


const renderItem = (place) => {
    const htmlElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);
    htmlElement.querySelector('.gallery__title').textContent = place.name;
    htmlElement.querySelector('.gallery__illustration').src = place.link;
    htmlElement.querySelector('.button_view_like').addEventListener('click' , function (evt){
    evt.target.classList.toggle('button_view_like-active');
});
    htmlElement.querySelector('.button_view_trash').addEventListener('click', function (evt){
 htmlElement.remove();
});
    htmlElement.querySelector('.gallery__illustration').addEventListener('click', function(ent) {
        popupImageMax.classList.add('popup_opened');
        picturePopup.src = place.link;
        subtitlePopup.textContent = place.name;
    });
    
    list.prepend(htmlElement);
};


const addButton = document.querySelector('.button_view_add');
let galleryName = document.querySelector('.gallery__title');
let popupAdd = document.querySelector('#popupaddphoto')

function openAddPopup(event){
    popupAdd.classList.add('popup_opened');
}

function closeAddPopup(event){
    popupAdd.classList.remove('popup_opened');
}

addButton.addEventListener('click', openAddPopup);

function closeImagePopup(event) {
    popupImageMax.classList.remove('popup_opened');
}

const gallerySubmitHandler = (evt) => {
   evt.preventDefault();
   renderItem({name: photoName.value, link: link.value});
    
    closeAddPopup();
}

 formGalleryElement.addEventListener('submit', gallerySubmitHandler);
 


renderItems();




 
