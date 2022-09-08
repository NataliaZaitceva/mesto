export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameInput = document.querySelector(nameSelector);
    this._jobInput = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    
    const profileInfo = {
      name: this._nameInput.textContent,
      about: this._jobInput.textContent,
     
    };
    return profileInfo;
  }

  setAvatar(avatar) {
   if (avatar) {
    this._avatar.src = avatar;
  }
}

  setUserInfo({ name, about }) {
   if(name, about) {
    this._nameInput.textContent = name;
    this._jobInput.textContent = about;
  }
}
}
