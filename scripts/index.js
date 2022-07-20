const profileEditButton = document.querySelector('.button_view_edit');
const editPopup = document.querySelector('#popupeditprofile');
const popups = document.querySelectorAll('.popup');

profileEditButton.addEventListener('click', () => { openPopup(editPopup) });

function openPopup(popups) { //функция открытия попапа
    popups.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscKey);
};

popups.forEach((popups) => { //закрытие попапа по крестику и клику на оверлей
    popups.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popups)
        }
        if (evt.target.classList.contains('button_view_close')) {
            closePopup(popups);
        }
    });
})

function handleEscKey(evt) { //закрытие попапа через esc
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened');
        popupOpen && closePopup(popupOpen);
    }
}


function closePopup(popups) { //закрытие попапов
    popups.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscKey);
};

const formInfoEdit = document.querySelector('.popup__edit-form')
const profileInfo = document.querySelector('.profile__info')
const jobInput = formInfoEdit.querySelector('.popup__input_description_profession')
const nameInput = formInfoEdit.querySelector('.popup__input_description_name')
const profileName = profileInfo.querySelector('.profile__name');
const profileProfession = profileInfo.querySelector('.profile__subtitle');


function openEditPopup() { //открыть попап редактирования профиля
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
    openPopup(editPopup);
}


function handleProfileFormSubmit(evt) { //заполнение формы
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(editPopup);
}

formInfoEdit.addEventListener('submit', handleProfileFormSubmit);

const formGalleryElement = document.querySelector('.popup__gallery-form');

const itemInput = document.querySelector('.gallery__item');
const placeInput = formGalleryElement.querySelector('.popup__capture');
const galleryDescription = document.querySelector('.gallery__description');

const itemTemplate = document.querySelector('.template__card').content;


const title = document.querySelector('.gallery__title');

const list = document.querySelector('.gallery');
const formButton = document.querySelector('addProfileForm')
const formInput = document.querySelector('.popup__photo-container')
const link = document.querySelector('.popup__input_description_link');
const photoName = document.querySelector('.popup__input_description_place');
const photoDescription = document.querySelector('.gallery__description');
const popupImageMax = document.querySelector('.popup_image_max');
const picturePopup = document.querySelector('.popup__image');
const subtitlePopup = document.querySelector('.popup__subtitle');

const addButton = document.querySelector('.button_view_add');
const galleryName = document.querySelector('.gallery__title');
const popupAdd = document.querySelector('#popupaddphoto');

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
]


function createCard(place) { //создание карточек
    const htmlElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);
    const htmlElementTitle = htmlElement.querySelector('.gallery__title');

    htmlElementTitle.textContent = place.name;
    const htmlElementImage = htmlElement.querySelector('.gallery__illustration');

    htmlElementImage.src = place.link;
    htmlElementImage.alt = place.name;

    const htmlElementLike = htmlElement.querySelector('.button_view_like');
    htmlElementLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('button_view_like-active');//лайки
    });

    const htmlElementTrash = htmlElement.querySelector('.button_view_trash');
    htmlElementTrash.addEventListener('click', function (evt) {
        htmlElement.remove();//удаление
    });
    htmlElementImage.addEventListener('click', () => {
        openPopup(popupImageMax);//попап на увеличение
        picturePopup.src = place.link;
        subtitlePopup.textContent = place.name;
        picturePopup.alt = place.name
    });
    return htmlElement;
}


function renderCard(place) {
    list.prepend(createCard(place));
}

function renderItems() {
    initialCards.forEach(renderCard);
}


addButton.addEventListener('click', () => { openPopup(popupAdd) });

function handleSubmitGallery(evt) {
    evt.preventDefault();
    renderCard({ name: photoName.value, link: link.value });
    closePopup(popupAdd);
    evt.target.reset();
    evt.submitter.setAttribute('disabled', true);
}

formGalleryElement.addEventListener('submit', handleSubmitGallery);

renderItems();

enableValidation(validationObject);