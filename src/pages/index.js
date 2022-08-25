
import './index.css'; 
 
import { FormValidator } from "../components/FormValidator.js"
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { initialCards } from "../components/utils.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import {
  profileEditButton,
  profilePopup,
  validationObject,
  btnPhotoAdd,
  popupAdd,
} from "../components/components.js";
import { UserInfo } from "../components/UserInfo.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__subtitle",
});

const popupNewProfile = new PopupWithForm({
  popupSelector: "#popupeditprofile",
  handleSubmit: (name, profession) => {
    userInfo.setUserInfo(name, profession);
    popupNewProfile.close();
  },
});

popupNewProfile.setEventListeners();

profileEditButton.addEventListener("click", () => {
  popupNewProfile.open();
  cardValidity.enableValidation();
});

const imagePopup = new PopupWithImage(".popup_image_max");
imagePopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".gallery"
);

const popupAddPicture = new PopupWithForm(
  {
    popupSelector: "#popupaddphoto",
    handleSubmit: (data) => {
      cardList.addItem(createCard(data));
      popupAddPicture.close();
    },
  },
  '#item"'
);
//console.log(popupAddPicture)

const createCard = (data) => {
  const newCard = new Card(
    {
      data,
      handleCardClick: (link, name) => {
        imagePopup.open(link, name);
      },
    },
    "#template__card"
  );
  const cardElement = newCard.generateCard();

  return cardElement;
};

cardList.renderItems();

popupAddPicture.setEventListeners();

btnPhotoAdd.addEventListener("click", () => {
  popupAddPicture.open();
  profileValidity.enableValidation();
});


const cardValidity = new FormValidator(validationObject, profilePopup);


const profileValidity = new FormValidator(validationObject, popupAdd);

