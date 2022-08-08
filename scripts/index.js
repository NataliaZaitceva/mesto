import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./utils.js";

const profileEditButton = document.querySelector(".button_view_edit");
const profilePopup = document.querySelector("#popupeditprofile");
const popups = document.querySelectorAll(".popup");

const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_view_submit",
  inactiveButtonClass: "button_view_submit-invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

profileEditButton.addEventListener("click", () => {
  openPopup(profilePopup);
});

function openPopup(popups) {
  //функция открытия попапа
  popups.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}

popups.forEach((popups) => {
  //закрытие попапа по крестику и клику на оверлей
  popups.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popups);
    } else if (evt.target.classList.contains("button_view_close")) {
      closePopup(popups);
    }
  });
});

function handleEscKey(evt) {
  //закрытие попапа через esc
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    popupOpen && closePopup(popupOpen);
  }
}

function closePopup(popups) {
  //закрытие попапов
  popups.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}

const formInfoEdit = document.querySelector(".popup__edit-form");
const profileInfo = document.querySelector(".profile__info");
const jobInput = formInfoEdit.querySelector(
  ".popup__input_description_profession"
);
const nameInput = formInfoEdit.querySelector(".popup__input_description_name");
const profileName = profileInfo.querySelector(".profile__name");
const profileProfession = profileInfo.querySelector(".profile__subtitle");

function openProfilePopup() {
  //открыть попап редактирования профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(profilePopup);
}

function handleProfileFormSubmit(evt) {
  //заполнение формы
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(profilePopup);
}

formInfoEdit.addEventListener("submit", handleProfileFormSubmit);

const formGalleryElement = document.querySelector(".popup__gallery-form");

const itemInput = document.querySelector(".gallery__item");
const placeInput = formGalleryElement.querySelector(".popup__capture");
const galleryDescription = document.querySelector(".gallery__description");

const title = document.querySelector(".gallery__title");

const list = document.querySelector(".gallery");
const formAddButton = document.querySelector("addProfileForm");
const formInput = document.querySelector(".popup__photo-container");
const link = document.querySelector(".popup__input_description_link");
const photoName = document.querySelector(".popup__input_description_place");
const photoDescription = document.querySelector(".gallery__description");
const popupImageMax = document.querySelector(".popup_image_max");
const picturePopup = document.querySelector(".popup__image");
const subtitlePopup = document.querySelector(".popup__subtitle");

const btnPhotoAdd = document.querySelector(".button_view_add");
const galleryName = document.querySelector(".gallery__title");
const popupAdd = document.querySelector("#popupaddphoto");

const cardSelector = ".template__card";

const addCard = (link, name) => {
  const card = new Card(link, name, "#item", openPopup).generateCard();

  list.prepend(card);
};

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    addCard(item.link, item.name, cardSelector);
  });
};

btnPhotoAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

formGalleryElement.addEventListener("submit", handleSubmitGallery);

function handleSubmitGallery(evt) {
  evt.preventDefault();
  addCard(link.value, photoName.value);
  closePopup(popupAdd);
  evt.target.reset();
  evt.submitter.setAttribute("disabled", true);
}

renderInitialCards(initialCards);

//renderItems();

//enableValidation(validationObject);

export {
  openPopup,
  popupImageMax,
  picturePopup,
  subtitlePopup,
  validationObject,
};

const cardValidity = new FormValidator(validationObject, profilePopup);
cardValidity.enableValidation();

const profileValidity = new FormValidator(validationObject, popupAdd);
profileValidity.enableValidation();
