import "./index.css";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section"
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Api } from "../components/Api.js";
import {
  profileEditButton,
  profilePopup,
  validationObject,
  btnPhotoAdd,
  popupAdd,
  avatarPopup,
  btnEditAvatar,
  btnConfirm,
  nameInput,
  jobInput,
  profileName,
  profileProfession,

  avatar} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";


const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49/",
  headers: {
    authorization: "db606de1-f19c-401a-a943-a6f8ec0f1edc",
  },
});

let userId;

/*function renderUser(data) {
  api.getInfo(data).then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setAvatar(data.avatar);
    console.log(data);
  });
}*/

//renderUser();
const userInfo = new UserInfo({
  nameSelector: ".profile__name", 

  aboutSelector: ".profile__subtitle", 

  avatarSelector: ".profile__avatar", 
});

function handlePopupProfile(inputsEdit) { 

  popupNewProfile.loading(true); 

  api 

    .saveInfo(inputsEdit) 
    .then((data) => { 
      userInfo.setUserInfo(inputsEdit); 
      popupNewProfile.close(); 
console.log (inputsEdit)
    }) 
    .catch((err) => { 
      console.log(`Ошибка: ${err}`); 
    }) 
    .finally(() => { 
      popupNewProfile.loading(false); 
    }); 

} 

 
const popupNewProfile = new PopupWithForm({ 

  popupSelector: "#popupeditprofile", 

  handleSubmit: (inputsEdit) => { 

    handlePopupProfile(inputsEdit); 
console.log(inputsEdit)

   // popupNewProfile.close(); 

  }, 

}); 

 

popupNewProfile.setEventListeners(); 

 

profileEditButton.addEventListener("click", () => { 

  popupNewProfile.open(); 
  nameInput.value = profileName.textContent;
  jobInput.value =  profileProfession.textContent;
 // cardValidity.enableValidation(); 

}); 

 

const imagePopup = new PopupWithImage(".popup_image_max");
imagePopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation({
  popupSelector: ".popup_confirmation",
});

confirmationPopup.setEventListeners();

const createCard = (data) => {
  const newCard = new Card(
    {
      data: data,
      userId: userId,
      handleCardClick: (link, name) => {
        imagePopup.open(link, name);
      },
      handleDeleteUsersCard: (cardId, cardElement) => {
        confirmationPopup.open();
        confirmationPopup.submitCallback(() => {
          api
            .deleteUserCard(cardId, cardElement)
            .then(() => {
              confirmationPopup.close();
              newCard.deleteCard();
              console.log(cardElement);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        });
      },

      handleLikeClick: (cardId, cardElement) => {
        api
          .likedCard(cardId, cardElement)
          .then(() => {
            newCard.handleLikeCard(data.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      },

      handleRemoveLike: (cardId, cardElement) => {
        api
          .dislikedCard(cardId, cardElement)
          .then(() => {
            newCard.handleLikeCard(data.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      },
    },
    "#template__card"
  );
  const cardElement = newCard.generateCard();

  return cardElement;
};
const popupAddPicture = new PopupWithForm({
  popupSelector: "#popupaddphoto",
  handleSubmit: (data) => {
    popupAddPicture.loading(true);
    api
      .addCards(data)
      .then((data) => {
        if (data) cardList.addItem(createCard(data));
        console.log(data);
        popupAddPicture.close()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddPicture.loading(false);
      });
  },
});
btnConfirm.addEventListener("submit", () => handleDeleteUsersCard());

const editAvatarPopup = new PopupWithForm({
  popupSelector: "#popupavatar",
  handleSubmit: (data) => {
    editAvatarPopup.loading(true);
    api
      .updateUserPhoto(data.avatar)
      .then(() => {
        userInfo.setAvatar(data.avatar);
        editAvatarPopup.close();
        
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddPicture.loading(false);
      });
  },
});

editAvatarPopup.setEventListeners();

btnEditAvatar.addEventListener("click", () => {
  editAvatarPopup.open();
 // formAvatarValidity.enableValidation();
});

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItemAppend(createCard(data));
    },
  },
  ".gallery"
);

popupAddPicture.setEventListeners();

btnPhotoAdd.addEventListener("click", () => {
  popupAddPicture.open();
  //profileValidity.enableValidation();
});

/*api.getInitialCards().then((data) => {
  cardList.renderItems(data);
});*/

Promise.all([api.getInfo(), /*api.updateUserPhoto(),*/ api.getInitialCards(), ])
  .then(([userData, initialCards]) => {
  
    
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
      userId = userData._id;
    cardList.renderItems(initialCards);
    
    
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const cardValidity = new FormValidator(validationObject, popupAdd);
cardValidity.enableValidation()

const profileValidity = new FormValidator(validationObject, profilePopup);
profileValidity.enableValidation()

const formAvatarValidity = new FormValidator(validationObject, avatarPopup);
formAvatarValidity.enableValidation()