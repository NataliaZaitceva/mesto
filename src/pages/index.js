//import { FormValidator } from " FormValidator.js";
//import { FormValidator } from "./components/FormValidator.js";
//import { Card } from "./components/Card.js";
import './index.css';
import { initialCards } from "../components/utils.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { profileEditButton, profilePopup, popups, validationObject, formInfoEdit, profileInfo, jobInput, nameInput, profileName, profileProfession, 
  itemInput, placeInput, galleryDescription, title, 
  formAddButton, formInput, link, photoName, photoDescription,  
   formGalleryElement, list, popupImageMax, picturePopup, subtitlePopup, 
   btnPhotoAdd, galleryName, popupAdd, cardSelector, cardListSection  } from "../components/components.js";
import { Section } from "../components/Section.js"
import { UserInfo } from "../components/UserInfo.js";
import {FormValidator} from "../components/FormValidator.js"

import { Card } from "../components/Card.js"

//const newPopup = new Popup();

/*profileEditButton.addEventListener("click", () => {
  openPopup(profilePopup);
});*/

/*export function openPopup(popups) {
  //функция открытия попапа
  popups.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}*/

/*const popup = new Popup();
popup.setEventListeners();*/

/*popups.forEach((popups) => {
  //закрытие попапа по крестику и клику на оверлей
  popups.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popups);
    } else if (evt.target.classList.contains("button_view_close")) {
      closePopup(popups);
    }
  });
});*/

/*function handleEscKey(evt) {
  //закрытие попапа через esc
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    popupOpen && closePopup(popupOpen);
  }
}*/

/*function closePopup(popups) {
  //закрытие попапов
  popups.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}*/



/*function openProfilePopup() {
  //открыть попап редактирования профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  profilePopup.open();
}*/

/*function handleProfileFormSubmit(evt) {
  //заполнение формы
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup.close();
}*/




const imagePopup = new PopupWithImage('.popup_image_max');
//popupWithImage.open(link, photoName);

function handleCardClick(link, name){
  //const data = { link: link.value, name: photoName.value};
  //data.open();
  imagePopup.setEventListeners();
  imagePopup.open(link, name)
  
}

const popupAddPicture = new PopupWithForm({ 
  popupSelector: '#popupaddphoto', 
  handleSubmit: () =>{
  //evt.preventDefault();
const newCard = new Card(link.value, photoName.value, '#item', handleCardClick, cardSelector).generateCard();
  //handleSubmitGallery.addItem(newCard)
  cardList.addItem(newCard);
  popupAddPicture.close();
 //evt.target.reset();
 //evt.submitter.setAttribute("disabled", true);
}
});

popupAddPicture.setEventListeners()


btnPhotoAdd.addEventListener("click", () => {
  popupAddPicture.open()
} );


const popupNewProfile = new PopupWithForm({
  popupSelector: '#popupeditprofile', 
  handleSubmit: () =>{
  //profileName.textContent = nameInput.value;
  //profileProfession.textContent = jobInput.value;
  userInfo.setUserInfo({name: nameInput.value, profession:jobInput.value});
  popupNewProfile.close();
}
});

const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__subtitle'});

popupNewProfile.setEventListeners();


profileEditButton.addEventListener("click", () => {
  popupNewProfile.open(userInfo.getUserInfo());
  
});



/*const addCard = (link, name) => {
  const card = new Card(link, name, "#item", openPopup).generateCard();

  list.prepend(card);
};*/

/*const renderInitialCards = () => {
  initialCards.forEach((item) => {
    addCard(item.link, item.name, cardSelector);
  });
};*/

/*btnPhotoAdd.addEventListener("click", () => {
  popupAdd.open();
});*/



/*function  handleSubmitGallery(evt) {
 evt.preventDefault();
  const newCard = new Card(link.value, photoName.value).generateCard();
  //handleSubmitGallery.addItem(newCard)
  cardList.addItem(newCard);
 popupAdd.close();
 evt.target.reset();
 evt.submitter.setAttribute("disabled", true);

}*/
//renderInitialCards(initialCards);

//renderItems();

//enableValidation(validationObject);


//formGalleryElement.addEventListener("submit", handleSubmitGallery);


const cardList = new Section({
  items: initialCards, 
  renderer: (item) => {
const card = new Card (item.link, item.name, '#item', handleCardClick);
const photoElement = card.generateCard()
cardList.addItem(photoElement);

  }
}, 
cardListSection
);

cardList.renderItems();

const cardValidity = new FormValidator(validationObject, profilePopup);
cardValidity.enableValidation();

const profileValidity = new FormValidator(validationObject, popupAdd);
profileValidity.enableValidation();
