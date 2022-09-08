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
  avatar,
} from "../components/components.js";
import { UserInfo } from "../components/UserInfo.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49/",
  headers: {
    authorization: "db606de1-f19c-401a-a943-a6f8ec0f1edc",
  },
});

let userId;

function renderUser(data) {
  api.getInfo(data).then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setAvatar(data.avatar);
    console.log(data);
  });
}

renderUser();

function handlePopupProfile(inputsData) {
  popupNewProfile.loading(true);
  api
    .saveInfo(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupNewProfile.close();
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
  handleSubmit: (name, about) => {
    handlePopupProfile(name, about);
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

const confirmationPopup = new PopupWithConfirmation({
  popupSelector: ".popup__confirmation",
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
            .deleteUserCard(cardId)
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
  formAvatarValidity.enableValidation();
});

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".gallery"
);

popupAddPicture.setEventListeners();

btnPhotoAdd.addEventListener("click", () => {
  popupAddPicture.open();
  profileValidity.enableValidation();
});

api.getInitialCards().then((data) => {
  cardList.renderItems(data);
});

Promise.all([api.getInitialCards(), api.getInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const cardValidity = new FormValidator(validationObject, profilePopup);

const profileValidity = new FormValidator(validationObject, popupAdd);

const formAvatarValidity = new FormValidator(validationObject, avatarPopup);
