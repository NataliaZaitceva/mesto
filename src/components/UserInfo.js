export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameInput = document.querySelector(nameSelector);
    this._jobInput = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    //возвращает объект с данными пользователя

    //const inputName = document.querySelector('.popup__input_description_name');
    //const inputProfession = document.querySelector('.popup__input_description_profession')
    const profileInfo = {
      name: this._nameInput.textContent,
      about: this._jobInput.textContent,
      //avatar: this._avatar.src
    };
    return profileInfo;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setUserInfo({ name, about }) {
    this._nameInput.textContent = name;
    this._jobInput.textContent = about;
  }
}
